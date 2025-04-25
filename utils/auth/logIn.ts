import { windowDefined } from '@/utils/window/windowDefined';

export function logIn(accessToken: string) {
  if (windowDefined()) {
    document.cookie = `access_token=${accessToken}; path=/; max-age=3600;`;
    window.location.href = `/chats`;
  }
}