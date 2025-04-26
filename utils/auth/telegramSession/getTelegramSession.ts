import { windowDefined } from '@/utils/window/windowDefined';

export function getTelegramSession() {
  if (windowDefined()) {
    return window.localStorage.getItem('telegram_session') || null;
  }
  return null;
}