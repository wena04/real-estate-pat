/**
 * Prefix root-relative public paths with Vite `base` (e.g. `/real-estate-pat/`) so JSON
 * paths like `/assets/...` resolve correctly on GitHub Pages subpath deploys.
 */
export function publicUrl(path) {
  if (path == null || path === '') return path;
  if (/^https?:\/\//i.test(path)) return path;
  const base = import.meta.env.BASE_URL || '/';
  const trimmed = path.startsWith('/') ? path.slice(1) : path;
  return `${base}${trimmed}`;
}
