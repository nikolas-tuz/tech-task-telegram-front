import { windowDefined } from '@/utils/window/windowDefined';

export function removeTelegramSession() {
  if (windowDefined()) {
    window.localStorage.removeItem('telegram_session');
  }
}