'use client';

/*
type DashboardType = {
  // children: ReactNode;
}
*/

import DivContainer from '@/components/UI/DivContainer';
import MainHeading from '@/components/Typography/Heading/MainHeading';
import { useState } from 'react';
import LoginOntoSystem from '@/components/Layouts/Dashboard/Auth/LoginOntoSystem';
import RegisterOntoSystem from '@/components/Layouts/Dashboard/Auth/RegisterOntoSystem';

export type AuthStateType = `login` | `register`;

export default function Auth(/*{}: DashboardType*/) {
  const [authState, setAuthState] = useState<AuthStateType>(`login`);

  return (
    <DivContainer className={`pl-5`}>
      <MainHeading>Telegram Chats</MainHeading>
      {authState === `login` && <LoginOntoSystem className={`mt-20`} setAuthState={setAuthState} />}
      {authState === `register` && <RegisterOntoSystem className={`mt-20`} setAuthState={setAuthState} />}
    </DivContainer>
  );
}
