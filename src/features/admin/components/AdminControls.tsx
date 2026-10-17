import { useEffect, useRef, useState, type ButtonHTMLAttributes, type DragEvent, type InputHTMLAttributes, type ReactNode, type TextareaHTMLAttributes } from 'react'
import { errorMessage } from '@/features/admin/errors'

const controlClass =
  'w-full border border-beige-300 bg-white px-4 py-3 font-serif text-base font-light text-ink outline-none transition-colors placeholder:text-mist focus:border-gold-slide'

const tones = {
  primary: 'bg-ink text-cream hover:bg-charcoal',
  gold: 'bg-gold-slide text-ink hover:bg-gold-highlight',
  ghost: 'border border-beige-300 bg-white text-ink hover:border-gold-slide',
  danger: 'border border-red-200 bg-white text-red-800 hover:bg-red-50',
}

interface AdminButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  tone?: keyof typeof tones
}

export function AdminButton({
  tone = 'primary',
  className = '',
  type = 'button',
  ...props
}: AdminButtonProps) {
  return (
    <button
      type={type}
      className={`inline-flex items-center justify-center px-5 py-3 font-label text-[11px] uppercase tracking-[0.18em] transition-colors disabled:cursor-not-allowed disabled:opacity-40 ${tones[tone]} ${className}`}
      {...props}
    />
  )
}

export function AdminHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow: string
  title: string
  description?: string
  action?: ReactNode
}) {
  return (
    <header className="mb-8 flex flex-col gap-5 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        <p className="slide-label mb-3">{eyebrow}</p>
        <h1 className="font-serif text-4xl font-light text-ink">{title}</h1>
        {description && (
          <p className="mt-3 font-serif text-base font-light leading-relaxed text-slate">{description}</p>
        )}
      </div>
      {action}
    </header>
  )
}

export function Field({
  label,
  hint,
  children,
}: {
  label: string
  hint?: string
  children: ReactNode
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-label text-[10px] uppercase tracking-[0.2em] text-stone">
        {label}
      </span>
      {children}
      {hint && <span className="mt-2 block font-serif text-sm font-light text-stone">{hint}</span>}
    </label>
  )
}

export function TextInput({ className = '', ...props }: InputHTMLAttributes<HTMLInputElement>) {
  return <input className={`${controlClass} ${className}`} {...props} />
}

export function TextArea({ className = '', ...props }: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea className={`${controlClass} ${className}`} {...props} />
}

export function Drawer({
  title,
  onClose,
  children,
}: {
  title: string
  onClose: () => void
  children: ReactNode
}) {
  useEffect(() => {
    function onKey(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose()
    }

    const previous = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = previous
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <button
        type="button"
        aria-label="Cerrar panel"
        className="absolute inset-0 bg-ink/45"
        onClick={onClose}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-label={title}
        className="relative flex h-full w-full max-w-md flex-col border-l border-beige-300 bg-beige-50 shadow-2xl"
      >
        <header className="flex items-center justify-between border-b border-beige-300 px-6 py-5">
          <h2 className="font-serif text-2xl font-light">{title}</h2>
          <button
            type="button"
            onClick={onClose}
            className="font-label text-[10px] uppercase tracking-[0.18em] text-stone"
          >
            Cerrar
          </button>
        </header>
        <div className="flex-1 overflow-y-auto px-6 py-6">{children}</div>
      </div>
    </div>
  )
}

export function ImageField({
  label,
  hint,
  value,
  onChange,
  onUpload,
}: {
  label: string
  hint?: string
  value: string
  onChange: (value: string) => void
  onUpload: (file: File) => Promise<string>
}) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [busy, setBusy] = useState(false)
  const [over, setOver] = useState(false)
  const [failedValue, setFailedValue] = useState<string | null>(null)
  const [uploadError, setUploadError] = useState<string | null>(null)
  const embedded = value.startsWith('data:')
  const broken = Boolean(value) && failedValue === value

  async function handleFile(file: File | undefined) {
    if (!file) return
    setBusy(true)
    setUploadError(null)
    try {
      onChange(await onUpload(file))
    } catch (err) {
      setUploadError(errorMessage(err))
    } finally {
      setBusy(false)
      setOver(false)
    }
  }

  function handleDrop(event: DragEvent<HTMLDivElement>) {
    event.preventDefault()
    void handleFile(event.dataTransfer.files?.[0])
  }

  return (
    <div>
      <span className="mb-2 block font-label text-[10px] uppercase tracking-[0.2em] text-stone">
        {label}
      </span>
      <div
        onDragOver={(event) => {
          event.preventDefault()
          setOver(true)
        }}
        onDragLeave={() => setOver(false)}
        onDrop={handleDrop}
        className={`relative mb-3 aspect-[4/3] overflow-hidden border bg-ink ${
          over ? 'border-gold-slide' : 'border-beige-300'
        }`}
      >
        {value && !broken ? (
          <img
            src={value}
            alt=""
            className="h-full w-full object-cover"
            onError={() => setFailedValue(value)}
          />
        ) : (
          <div className="flex h-full items-center justify-center px-6 text-center font-serif text-sm font-light text-cream-muted">
            {broken ? 'No se puede mostrar esta imagen' : 'Arrastra una imagen o súbela'}
          </div>
        )}
        {busy && (
          <div className="absolute inset-0 grid place-items-center bg-ink/50 font-label text-[10px] uppercase tracking-[0.2em] text-cream">
            Subiendo
          </div>
        )}
      </div>
      <div className="flex flex-wrap gap-3">
        <AdminButton tone="ghost" onClick={() => inputRef.current?.click()} disabled={busy}>
          Subir imagen
        </AdminButton>
        {value && (
          <AdminButton tone="danger" onClick={() => onChange('')} disabled={busy}>
            Quitar
          </AdminButton>
        )}
      </div>
      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        aria-label="Seleccionar imagen"
        className="sr-only"
        onChange={(event) => {
          const file = event.target.files?.[0]
          event.target.value = ''
          void handleFile(file)
        }}
      />
      {embedded ? (
        <p className="mt-3 font-serif text-sm font-light text-stone">
          Imagen cargada en este navegador.
        </p>
      ) : (
        <input
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder="https://… o /images/…"
          className={`${controlClass} mt-3`}
        />
      )}
      {hint && <p className="mt-2 font-serif text-sm font-light text-stone">{hint}</p>}
      {uploadError && (
        <p role="alert" className="mt-2 font-serif text-sm font-light text-red-800">
          {uploadError}
        </p>
      )}
    </div>
  )
}

export function LoadingNote({ label }: { label: string }) {
  return (
    <p className="font-label text-[11px] uppercase tracking-[0.22em] text-stone" aria-live="polite">
      {label}
    </p>
  )
}

export function EmptyNote({ title, children }: { title: string; children?: ReactNode }) {
  return (
    <div className="border border-dashed border-beige-400 bg-white px-6 py-16 text-center">
      <p className="font-serif text-2xl font-light text-ink">{title}</p>
      {children && <div className="mt-3 font-serif text-base font-light text-slate">{children}</div>}
    </div>
  )
}

export function ErrorNote({ message, onRetry }: { message: string; onRetry: () => void }) {
  return (
    <div
      role="alert"
      className="mb-6 flex flex-wrap items-center justify-between gap-4 border border-red-200 bg-white px-4 py-3"
    >
      <p className="font-serif text-sm font-light text-red-900">{message}</p>
      <AdminButton tone="ghost" onClick={onRetry}>
        Reintentar
      </AdminButton>
    </div>
  )
}
