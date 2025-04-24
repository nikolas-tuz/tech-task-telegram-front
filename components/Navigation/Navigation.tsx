'use client';

/*
type NavigationType = {
  // children: ReactNode;
}
*/

import NavContainer from '@/components/UI/NavContainer';
import LogoIcon from '@/components/Icons/LogoIcon';
import Image from 'next/image';
import DivContainer from '@/components/UI/DivContainer';
import { useState } from 'react';
import { TelegramUserType } from '@/utils/types/TelegramUser.type';
import LoginIcon from '@/components/Icons/LoginIcon';
import { useUserData } from '@/hooks/useUserData';
import { Tooltip } from '@mui/material';

export default function Navigation(/*{}: NavigationType*/) {
  const { status } = useUserData();
  const [telegramUser, setTelegramUser] = useState<TelegramUserType>({
    id: 1,
    first_name: `Bob`,
    last_name: `Doe`,
    photo_url: undefined,
    auth_date: 123,
    username: `bob_doe`,
    hash: `123`
  });

  return (
    <NavContainer className={`flex flex-col items-center min-h-lvh pb-14 justify-between`}>
      <DivContainer>
        <DivContainer className={`mb-5`}>
          <LogoIcon className={`m-auto`} />
        </DivContainer>
        <DivContainer>
          {telegramUser && telegramUser?.photo_url ? (
            <Image className={`rounded-full`} width={32} height={32} src={``} alt={`User Image`} />
          ) : (
            <DivContainer className={`w-12 h-12 bg-[#27AE60] rounded-full`}></DivContainer>
          )}
        </DivContainer>
      </DivContainer>
      <DivContainer className={`flex flex-col gap-4`}>
        {telegramUser && (<DivContainer className={`cursor-pointer`}>
          <Tooltip followCursor title={`Click to log out from telegram`}>
            <LoginIcon color={`blue`} className={`w-5 h-5 transition-all duration-200 hover:scale-105`} />
          </Tooltip>
        </DivContainer>)}
        {status && (<DivContainer className={`cursor-pointer`}>
          <Tooltip followCursor title={`Click to log out from the app.`}>
            <LoginIcon color={`green`} className={`w-5 h-5 transition-all duration-200 hover:scale-105`} />
          </Tooltip>
        </DivContainer>)}
      </DivContainer>

    </NavContainer>
  );
}
