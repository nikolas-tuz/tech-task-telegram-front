import { windowDefined } from '@/utils/window/windowDefined';

export function logOut() {
  if (windowDefined()) {
    document.cookie = `access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;`;
    // Redirect to login page
    window.location.href = '/';
  }
}