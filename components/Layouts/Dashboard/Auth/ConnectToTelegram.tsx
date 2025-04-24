// 'use client';

/*
type ConnectToTelegramType = {
  // children: ReactNode;
}
*/

import DivContainer from '@/components/UI/DivContainer';
import LogoIcon from '@/components/Icons/LogoIcon';
import TextNeutral from '@/components/Typography/Text/TextNeutral';
import Button from '@/components/Buttons/Button';

export default function ConnectToTelegram(/*{}: ConnectToTelegramType*/) {
  return (
    <>
      <DivContainer className={`text-center flex flex-col items-center justify-center`}>
        <LogoIcon className={`h-24 w-40 mb-8`} />
        <TextNeutral className={`mb-4`}>Login to see your chats</TextNeutral>
        <DivContainer className={`w-full`}>
          <Button className={`w-full`}>Log In Onto Telegram</Button>
        </DivContainer>
      </DivContainer>
    </>
  );
}
