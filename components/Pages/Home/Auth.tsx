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
import LogoIcon from '@/components/Icons/LogoIcon';

export type AuthStateType = `login` | `register`;

export default function Auth(/*{}: DashboardType*/) {
  const [authState, setAuthState] = useState<AuthStateType>(`login`);

  return (
    <DivContainer className={`pl-5`}>
      <MainHeading className={`flex items-center gap-2`}><LogoIcon />Telegram Chats</MainHeading>
      {authState === `login` && <LoginOntoSystem className={`mt-20`} setAuthState={setAuthState} />}
      {authState === `register` && <RegisterOntoSystem className={`mt-20`} setAuthState={setAuthState} />}
    </DivContainer>
  );
}
