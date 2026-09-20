export function getSafeReturnTo(value: string | null): string {
  if (!value || !value.startsWith('/') || value.startsWith('//')) {
    return '/account'
  }

  return value
}

export function getLoginUrl(): string {
  const returnTo = `${window.location.pathname}${window.location.search}`

  return `/login?returnTo=${encodeURIComponent(returnTo)}`
}

export function getAuthSwitchUrl(
  path: '/login' | '/register',
): string {
  const params = new URLSearchParams(window.location.search)
  const returnTo = getSafeReturnTo(params.get('returnTo'))

  if (returnTo === '/account') {
    return path
  }

  return `${path}?returnTo=${encodeURIComponent(returnTo)}`
}
