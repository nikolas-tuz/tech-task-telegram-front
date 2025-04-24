// 'use client';

import { ComponentPropsWithoutRef } from 'react';
import DivContainer from '@/components/UI/DivContainer';
import LogoIcon from '@/components/Icons/LogoIcon';
import TextNeutral from '@/components/Typography/Text/TextNeutral';
import Button from '@/components/Buttons/Button';

type ConnectToTelegramType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export default function ConnectToTelegram({ className, ...props }: ConnectToTelegramType) {
  return (
    <>
      <DivContainer {...props} className={`text-center flex flex-col items-center justify-center ${className}`}>
        <LogoIcon className={`h-24 w-40 mb-8`} />
        <TextNeutral className={`mb-4`}>Login to see your chats</TextNeutral>
        <DivContainer className={`w-full`}>
          <Button className={`w-full`}>Log In Onto Telegram</Button>
        </DivContainer>
      </DivContainer>
    </>
  );
}
