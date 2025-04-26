// 'use client';

import { Tooltip } from '@mui/material';
import NavContainer from '@/components/UI/NavContainer';
import LogoIcon from '@/components/Icons/LogoIcon';
import DivContainer from '@/components/UI/DivContainer';
import LoginIcon from '@/components/Icons/LoginIcon';
import ChatImg from '@/public/stab-imgs/dummy-user.png';
import UserImage from '@/components/UI/UserImage';

type LogoutType = {
  active: boolean;
  function: () => void;
}

type NavigationType = {
  logoutFromTelegram?: LogoutType;
  logoutFromApp?: LogoutType;
  userImage?: string;
  // children: ReactNode;
}

export default function Navigation({ logoutFromTelegram, logoutFromApp }: NavigationType) {
  return (
    <NavContainer className={`flex flex-col items-center min-h-lvh gap-14 pt-8`}>
      <DivContainer>
        <DivContainer className={`mb-5`}>
          <LogoIcon className={`m-auto`} />
        </DivContainer>
        <DivContainer>
          <UserImage userImage={ChatImg.src} />
        </DivContainer>
      </DivContainer>
      <DivContainer className={`flex flex-col gap-4`}>
        {logoutFromTelegram?.active && (<DivContainer className={`cursor-pointer`}>
          <Tooltip onClick={() => logoutFromTelegram.function()} followCursor title={`Click to log out from telegram`}>
            <LoginIcon color={`blue`} className={`w-5 h-5 transition-all duration-200 hover:scale-105`} />
          </Tooltip>
        </DivContainer>)}
        {logoutFromApp?.active && (<DivContainer className={`cursor-pointer`}>
          <Tooltip onClick={() => logoutFromApp.function()} followCursor title={`Click to log out from the app.`}>
            <LoginIcon color={`green`} className={`w-5 h-5 transition-all duration-200 hover:scale-105`} />
          </Tooltip>
        </DivContainer>)}
      </DivContainer>
    </NavContainer>
  )
    ;
}
