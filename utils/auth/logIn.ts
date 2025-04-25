import { windowDefined } from '@/utils/window/windowDefined';

export function logIn(accessToken: string, telegramSession: string | null) {
  if (windowDefined()) {
    document.cookie = `access_token=${accessToken}; path=/; max-age=3600;`;
    window.location.href = `/chats`;

    if (telegramSession) window.localStorage.setItem('telegram_session', telegramSession);
  }
}