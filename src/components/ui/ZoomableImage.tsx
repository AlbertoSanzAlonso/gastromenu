import { useCallback, useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type PointerEvent, type TransitionEvent } from 'react'

const MIN_SCALE = 1
const MAX_SCALE = 4
const MOVE_THRESHOLD = 8
const TAP_SLOP = 22

interface ZoomableImageProps {
  src: string
  alt: string
  zoomInLabel: string
  zoomOutLabel: string
  onZoomedChange?: (zoomed: boolean) => void
}

interface Transform {
  scale: number
  x: number
  y: number
}

interface PinchGesture {
  distance: number
  scale: number
  imageX: number
  imageY: number
}

interface FlipMotion {
  x: number
  y: number
  scale: number
  animate: boolean
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value))
}

export function ZoomableImage({
  src,
  alt,
  zoomInLabel,
  zoomOutLabel,
  onZoomedChange,
}: ZoomableImageProps) {
  const viewportRef = useRef<HTMLDivElement>(null)
  const imageRef = useRef<HTMLImageElement>(null)
  const transformRef = useRef<Transform>({ scale: 1, x: 0, y: 0 })
  const pointersRef = useRef(new Map<number, { x: number; y: number }>())
  const pinchRef = useRef<PinchGesture | null>(null)
  const panRef = useRef<{ x: number; y: number; tx: number; ty: number } | null>(null)
  const movedRef = useRef(false)
  const tapOriginRef = useRef<{ x: number; y: number } | null>(null)
  const enlargedRef = useRef(false)
  const onZoomedChangeRef = useRef(onZoomedChange)
  const pendingRect = useRef<DOMRect | null>(null)
  const [transform, setTransform] = useState<Transform>({ scale: 1, x: 0, y: 0 })
  const [smooth, setSmooth] = useState(true)
  const [enlarged, setEnlarged] = useState(false)
  const [motion, setMotion] = useState<FlipMotion | null>(null)
  const zoomed = enlarged || transform.scale > 1.01

  onZoomedChangeRef.current = onZoomedChange

  const publishZoom = useCallback((scale: number, isEnlarged: boolean) => {
    onZoomedChangeRef.current?.(isEnlarged || scale > 1.01)
  }, [])

  const rememberFrame = useCallback(() => {
    const image = imageRef.current
    if (!image || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return
    pendingRect.current = image.getBoundingClientRect()
  }, [])

  const enlarge = useCallback(() => {
    if (enlargedRef.current) return
    rememberFrame()
    enlargedRef.current = true
    setEnlarged(true)
    publishZoom(transformRef.current.scale, true)
  }, [publishZoom, rememberFrame])

  const apply = useCallback((scale: number, x: number, y: number, animated: boolean) => {
    const viewport = viewportRef.current
    const image = imageRef.current
    const nextScale = clamp(scale, MIN_SCALE, MAX_SCALE)
    const snapped = nextScale <= 1.01 ? 1 : nextScale
    let next = { x: 0, y: 0 }

    if (snapped > 1 && viewport && image) {
      const maxX = Math.max(0, (image.offsetWidth * snapped - viewport.clientWidth) / 2)
      const maxY = Math.max(0, (image.offsetHeight * snapped - viewport.clientHeight) / 2)
      next = { x: clamp(x, -maxX, maxX), y: clamp(y, -maxY, maxY) }
    }

    const resolved = { scale: snapped, ...next }
    transformRef.current = resolved
    setSmooth(animated)
    setTransform(resolved)
    publishZoom(snapped, enlargedRef.current)
  }, [publishZoom])

  const zoomAt = useCallback(
    (clientX: number, clientY: number, nextScale: number, animated: boolean) => {
      const viewport = viewportRef.current
      if (!viewport) return
      const rect = viewport.getBoundingClientRect()
      const current = transformRef.current
      const ox = clientX - rect.left - rect.width / 2
      const oy = clientY - rect.top - rect.height / 2
      const imageX = (ox - current.x) / current.scale
      const imageY = (oy - current.y) / current.scale
      apply(nextScale, ox - imageX * nextScale, oy - imageY * nextScale, animated)
    },
    [apply],
  )

  const collapse = useCallback(() => {
    rememberFrame()
    enlargedRef.current = false
    setEnlarged(false)
    apply(1, 0, 0, true)
  }, [apply, rememberFrame])

  useLayoutEffect(() => {
    const before = pendingRect.current
    const image = imageRef.current
    pendingRect.current = null
    if (!before || !image) return
    const after = image.getBoundingClientRect()
    if (after.width < 1 || after.height < 1) return
    const sx = before.width / after.width
    const sy = before.height / after.height
    const scale = Math.abs(sx - sy) < 0.04 ? (sx + sy) / 2 : sy
    const x = before.left + before.width / 2 - (after.left + after.width / 2)
    const y = before.top + before.height / 2 - (after.top + after.height / 2)
    if (Math.abs(x) < 0.5 && Math.abs(y) < 0.5 && Math.abs(scale - 1) < 0.01) return
    setMotion({ x, y, scale, animate: false })
  }, [enlarged])

  useLayoutEffect(() => {
    if (!motion || motion.animate) return
    let second = 0
    const first = requestAnimationFrame(() => {
      second = requestAnimationFrame(() => {
        setMotion({ x: 0, y: 0, scale: 1, animate: true })
      })
    })
    return () => {
      cancelAnimationFrame(first)
      cancelAnimationFrame(second)
    }
  }, [motion])

  useEffect(() => {
    const node = viewportRef.current
    if (!node) return

    function onWheel(event: WheelEvent) {
      event.preventDefault()
      if (!enlargedRef.current) {
        if (event.deltaY < 0) enlarge()
        return
      }
      const current = transformRef.current.scale
      const next = event.deltaY < 0 ? current * 1.12 : current / 1.12
      if (next <= 1.01) {
        apply(1, 0, 0, false)
        return
      }
      zoomAt(event.clientX, event.clientY, next, false)
    }

    node.addEventListener('wheel', onWheel, { passive: false })
    return () => node.removeEventListener('wheel', onWheel)
  }, [apply, enlarge, zoomAt])

  function beginPinch() {
    const viewport = viewportRef.current
    const points = [...pointersRef.current.values()]
    if (!viewport || points.length < 2) return
    const [a, b] = points
    const midX = (a.x + b.x) / 2
    const midY = (a.y + b.y) / 2
    const rect = viewport.getBoundingClientRect()
    const ox = midX - rect.left - rect.width / 2
    const oy = midY - rect.top - rect.height / 2
    const current = transformRef.current
    pinchRef.current = {
      distance: Math.hypot(a.x - b.x, a.y - b.y) || 1,
      scale: current.scale,
      imageX: (ox - current.x) / current.scale,
      imageY: (oy - current.y) / current.scale,
    }
    panRef.current = null
  }

  function onPointerDown(event: PointerEvent<HTMLDivElement>) {
    try {
      event.currentTarget.setPointerCapture(event.pointerId)
    } catch {
      // El gesto sigue en el elemento aunque el navegador no permita capturar el puntero.
    }
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })
    if (pointersRef.current.size === 1) {
      movedRef.current = false
      tapOriginRef.current = { x: event.clientX, y: event.clientY }
    } else {
      tapOriginRef.current = null
    }

    if (pointersRef.current.size >= 2) {
      movedRef.current = true
      beginPinch()
      return
    }

    if (transformRef.current.scale > 1) {
      panRef.current = {
        x: event.clientX,
        y: event.clientY,
        tx: transformRef.current.x,
        ty: transformRef.current.y,
      }
    }
  }

  function onPointerMove(event: PointerEvent<HTMLDivElement>) {
    const previous = pointersRef.current.get(event.pointerId)
    if (!previous) return
    const origin = tapOriginRef.current
    const fromOrigin = origin ? Math.hypot(event.clientX - origin.x, event.clientY - origin.y) : 0
    const fromLast = Math.hypot(event.clientX - previous.x, event.clientY - previous.y)
    if (fromOrigin > TAP_SLOP || (fromLast > MOVE_THRESHOLD && transformRef.current.scale > 1)) {
      movedRef.current = true
    }
    pointersRef.current.set(event.pointerId, { x: event.clientX, y: event.clientY })

    const viewport = viewportRef.current
    if (pointersRef.current.size >= 2 && viewport) {
      if (!enlargedRef.current) {
        enlarge()
        pinchRef.current = null
        return
      }
      if (!pinchRef.current) {
        beginPinch()
        return
      }
      const pinch = pinchRef.current
      const [a, b] = [...pointersRef.current.values()]
      const midX = (a.x + b.x) / 2
      const midY = (a.y + b.y) / 2
      const distance = Math.hypot(a.x - b.x, a.y - b.y) || 1
      const rect = viewport.getBoundingClientRect()
      const ox = midX - rect.left - rect.width / 2
      const oy = midY - rect.top - rect.height / 2
      const nextScale = pinch.scale * (distance / pinch.distance)
      apply(nextScale, ox - pinch.imageX * nextScale, oy - pinch.imageY * nextScale, false)
      return
    }

    const pan = panRef.current
    if (!pan || transformRef.current.scale <= 1) return
    apply(
      transformRef.current.scale,
      pan.tx + (event.clientX - pan.x),
      pan.ty + (event.clientY - pan.y),
      false,
    )
  }

  function endPointer(event: PointerEvent<HTMLDivElement>) {
    pointersRef.current.delete(event.pointerId)
    if (pointersRef.current.size >= 2) {
      beginPinch()
      return
    }
    if (pointersRef.current.size === 1 && transformRef.current.scale > 1) {
      const [remaining] = [...pointersRef.current.values()]
      pinchRef.current = null
      panRef.current = {
        x: remaining.x,
        y: remaining.y,
        tx: transformRef.current.x,
        ty: transformRef.current.y,
      }
      return
    }
    pinchRef.current = null
    panRef.current = null
    tapOriginRef.current = null
  }

  function onClick() {
    if (movedRef.current) {
      movedRef.current = false
      return
    }
    if (transformRef.current.scale > 1.01) {
      apply(1, 0, 0, true)
      return
    }
    if (enlargedRef.current) {
      collapse()
      return
    }
    enlarge()
  }

  function onKeyDown(event: KeyboardEvent<HTMLDivElement>) {
    if (event.key !== 'Enter' && event.key !== ' ') return
    event.preventDefault()
    if (transformRef.current.scale > 1.01) {
      apply(1, 0, 0, true)
      return
    }
    if (enlargedRef.current) {
      collapse()
      return
    }
    enlarge()
  }

  function onTransformEnd(event: TransitionEvent<HTMLImageElement>) {
    if (event.propertyName !== 'transform' || event.target !== event.currentTarget) return
    setMotion((current) => (current?.animate ? null : current))
  }

  const flip = motion ? `translate(${motion.x}px, ${motion.y}px) scale(${motion.scale}) ` : ''

  return (
    <div
      ref={viewportRef}
      role="button"
      tabIndex={0}
      aria-pressed={zoomed}
      aria-label={zoomed ? zoomOutLabel : zoomInLabel}
      onPointerDown={onPointerDown}
      onPointerMove={onPointerMove}
      onPointerUp={endPointer}
      onPointerCancel={endPointer}
      onClick={onClick}
      onKeyDown={onKeyDown}
      onContextMenu={(event) => event.preventDefault()}
      className={`flex w-full touch-none items-center justify-center select-none outline-none focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-gold-light ${
        transform.scale > 1.01 ? 'overflow-hidden' : 'overflow-visible'
      } ${zoomed ? 'cursor-zoom-out active:cursor-grabbing' : 'cursor-zoom-in'}`}
      style={{ WebkitTouchCallout: 'none' }}
    >
      <img
        ref={imageRef}
        src={src}
        alt={alt}
        draggable={false}
        decoding="async"
        onLoad={() => {
          const current = transformRef.current
          apply(current.scale, current.x, current.y, false)
        }}
        onTransitionEnd={onTransformEnd}
        className={`pointer-events-none mx-auto block h-auto w-auto max-w-full object-contain ${
          enlarged ? 'max-h-[calc(100dvh-3.5rem)] md:max-h-[calc(100dvh-6.75rem)]' : 'max-h-[68vh] md:max-h-[62vh]'
        }`}
        style={{
          transform: `${flip}translate3d(${transform.x}px, ${transform.y}px, 0) scale(${transform.scale})`,
          transition: motion ? (motion.animate ? 'transform 500ms var(--ease-premium)' : 'none') : smooth ? 'transform 320ms var(--ease-premium)' : 'none',
        }}
      />
    </div>
  )
}
