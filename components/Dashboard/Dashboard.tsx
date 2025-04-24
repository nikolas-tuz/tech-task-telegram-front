'use client';

/*
type DashboardType = {
  // children: ReactNode;
}
*/

import DivContainer from '@/components/UI/DivContainer';
import MainHeading from '@/components/Typography/Heading/MainHeading';
import { useState } from 'react';
import ConnectToTelegram from '@/components/Layouts/Dashboard/Auth/ConnectToTelegram';
import LoginOntoSystem from '@/components/Layouts/Dashboard/Auth/LoginOntoSystem';
import RegisterOntoSystem from '@/components/Layouts/Dashboard/Auth/RegisterOntoSystem';

export type AuthStateType = `login` | `register` | `telegram`;

export default function Dashboard(/*{}: DashboardType*/) {
  const [authState, setAuthState] = useState<AuthStateType>(`login`);
  return (
    <DivContainer className={`pl-5`}>
      <MainHeading className={`mb-28`}>Telegram Chats</MainHeading>
      {authState === `telegram` && <ConnectToTelegram />}
      {authState === `login` && <LoginOntoSystem setAuthState={setAuthState} />}
      {authState === `register` && <RegisterOntoSystem setAuthState={setAuthState} />}
    </DivContainer>
  );
}
