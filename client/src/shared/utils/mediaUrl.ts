/**
 * Utility to resolve static media URLs served from the Express backend
 * or external sources.
 */
const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';
const BACKEND_BASE = API_BASE.replace(/\/api\/?$/, '');

export function getMediaUrl(url: string | undefined | null): string {
  if (!url) return '';
  if (
    url.startsWith('http://') ||
    url.startsWith('https://') ||
    url.startsWith('data:') ||
    url.startsWith('blob:')
  ) {
    return url;
  }

  // Prepend backend base if it's an uploaded asset path
  if (url.startsWith('/uploads')) {
    return `${BACKEND_BASE}${url}`;
  }

  return url;
}
