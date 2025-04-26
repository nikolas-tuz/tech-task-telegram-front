import { windowDefined } from '@/utils/window/windowDefined';

export function getAccessToken() {
  if (windowDefined()) {
    // get access token from cookie
    const cookies = document.cookie.split(`; `);
    const accessToken = cookies.find((cookie) => cookie.startsWith(`access_token=`));
    if (accessToken) {
      return accessToken.split(`=`)[1];
    }
    return null;

  }
}