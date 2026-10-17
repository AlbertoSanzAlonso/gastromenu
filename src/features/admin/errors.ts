interface QueryError {
  message?: string
  code?: string
}

export function errorMessage(error: unknown) {
  if (error instanceof Error && error.message) return error.message

  if (error && typeof error === 'object') {
    const queryError = error as QueryError
    const message = queryError.message ?? ''
    const code = queryError.code ?? ''
    const lower = message.toLowerCase()

    if (code === '23505' || lower.includes('duplicate')) {
      return 'Ya existe un registro con ese identificador.'
    }

    if (code === '42501' || lower.includes('row-level security')) {
      return 'La base de datos ha rechazado el cambio. Entra con un usuario autorizado y aplica las políticas de administración.'
    }

    if (lower.includes('bucket') || lower.includes('not found')) {
      return 'No se pudo usar el almacén de imágenes. Pega una URL o crea el bucket «media» en Supabase.'
    }

    if (message) return message
  }

  return 'No se pudo completar la operación.'
}

export function translateAuthError(message: string) {
  const lower = message.toLowerCase()
  if (lower.includes('invalid login')) return 'Correo o contraseña incorrectos.'
  if (lower.includes('email not confirmed')) return 'Confirma el correo antes de entrar.'
  if (lower.includes('failed to fetch') || lower.includes('network')) {
    return 'No se ha podido conectar con Supabase.'
  }
  return 'No se ha podido iniciar sesión.'
}
