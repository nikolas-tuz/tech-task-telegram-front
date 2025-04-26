import { windowDefined } from '@/utils/window/windowDefined';

export function setTelegramSession(session: string) {
  if (windowDefined()) {
    window.localStorage.setItem('telegram_session', session);
  }
}