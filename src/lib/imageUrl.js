/**
 * URL base da API — usada para resolver paths relativos retornados pelo backend
 * (ex: Active Storage blobs do Rails)
 */
export const API_BASE_URL = 'http://localhost:3000';

/**
 * Resolve um path relativo da API para uma URL absoluta.
 * Se já for uma URL absoluta (http/https), retorna como está.
 * Se for null/undefined/vazio, retorna null.
 *
 * @param {string|null|undefined} path
 * @returns {string|null}
 *
 * @example
 * resolveImageUrl('/rails/active_storage/blobs/redirect/...')
 * // => 'http://localhost:3000/rails/active_storage/blobs/redirect/...'
 *
 * resolveImageUrl('https://cdn.example.com/image.jpg')
 * // => 'https://cdn.example.com/image.jpg'
 *
 * resolveImageUrl(null)
 * // => null
 */
export function resolveImageUrl(path) {
  if (!path) return null;
  if (path.startsWith('http://') || path.startsWith('https://')) return path;
  return `${API_BASE_URL}${path}`;
}
