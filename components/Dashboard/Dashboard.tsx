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
import Chats from '@/components/Layouts/Dashboard/Chats/Chats';

export type AuthStateType = `login` | `register` | `telegram` | `telegram-authorized` | `chat-opened`;

export default function Dashboard(/*{}: DashboardType*/) {
  const [authState, setAuthState] = useState<AuthStateType>(`telegram-authorized`);

  return (
    <DivContainer className={`pl-5`}>
      <MainHeading className={``}>Telegram Chats</MainHeading>
      {authState === `telegram` && <ConnectToTelegram className={`mt-24`} />}
      {authState === `login` && <LoginOntoSystem className={`mt-24`} setAuthState={setAuthState} />}
      {authState === `register` && <RegisterOntoSystem className={`mt-24`} setAuthState={setAuthState} />}
      {authState === `telegram-authorized` && <Chats />}
    </DivContainer>
  );
}
