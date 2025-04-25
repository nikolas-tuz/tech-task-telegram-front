'use client';

/*
type DashboardType = {
  // children: ReactNode;
}
*/

import DivContainer from '@/components/UI/DivContainer';
import MainHeading from '@/components/Typography/Heading/MainHeading';
import { useEffect, useState } from 'react';
import LoginOntoSystem from '@/components/Layouts/Dashboard/Auth/LoginOntoSystem';
import RegisterOntoSystem from '@/components/Layouts/Dashboard/Auth/RegisterOntoSystem';
import SnackbarMUI from '@/components/UI/SnackbarMUI';

export type AuthStateType = `login` | `register`;

export default function Auth(/*{}: DashboardType*/) {
  const [authState, setAuthState] = useState<AuthStateType>(`login`);
  const [errorMessage, setErrorMessage] = useState(``);

  useEffect(() => {
    if (typeof window !== `undefined`) {
      const params = new URLSearchParams(window.location.search);
      const error = params.get('error');

      if (error) setErrorMessage(error);
      // cleanse query
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, []);

  return (
    <DivContainer className={`pl-5`}>
      <SnackbarMUI severity={`error`} message={errorMessage} openSnackbar={!!errorMessage} />
      <MainHeading>Telegram Chats</MainHeading>
      {authState === `login` && <LoginOntoSystem className={`mt-20`} setAuthState={setAuthState} />}
      {authState === `register` && <RegisterOntoSystem className={`mt-20`} setAuthState={setAuthState} />}
    </DivContainer>
  );
}
