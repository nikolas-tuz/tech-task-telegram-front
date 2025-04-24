'use client';

import UserImg from '@/public/stab-imgs/dummy-user.png';
import ImageMessage from '@/public/stab-imgs/img-message.png';

/*
type ChatsPageType = {
  // children: ReactNode;
}
*/
import Navigation from '@/components/Pages/Home/Navigation';
import DivContainer from '@/components/UI/DivContainer';
import ConnectToTelegram from '@/components/Layouts/Dashboard/Auth/ConnectToTelegram';
import ChatsMessagesContainer from '@/components/Pages/Chats/ChatsMessagesContainer';
import { useState } from 'react';
import Chats from '@/components/Layouts/Dashboard/Chats/Chats';

export type TelegramChatsDataType = {
  message: string;
  role: `me` | `participant`
  time: string;
  img?: {
    src: string;
  };
};

const dummyChatData: TelegramChatsDataType[] = [
  {
    message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, quo!`,
    role: `me`,
    time: `14:45`,
    img: undefined
  },
  {
    message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, quo!`,
    time: `14:45`,
    role: `participant`,
    img: { src: ImageMessage.src }
  },
  {
    message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, quo!`,
    time: `14:45`,
    role: `participant`,
    img: undefined
  },
  {
    message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, quo!`,
    time: `14:45`,
    role: `me`,
    img: undefined
  },
  {
    message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, quo!`,
    time: `14:45`,
    role: `me`,
    img: undefined
  },
  {
    message: `Lorem ipsum dolor sit amet, consectetur adipisicing elit. Cupiditate, quo!`,
    time: `14:45`,
    role: `participant`,
    img: undefined
  }
];

export default function ChatsPage(/*{}: ChatsPageType*/) {
  const [telegramData, setTelegramData] = useState<TelegramChatsDataType[]>(dummyChatData);

  return (
    <>

      <main className={`main-grid-container pt-7 px-8`}>
        <Navigation
          logoutFromApp={{
            active: !!telegramData, function: () => {
            }
          }}
          logoutFromTelegram={{
            active: !!telegramData, function: () => {
            }
          }}
          userImage={UserImg.src} />
        {!telegramData ?
          <DivContainer className={`pl-5 h-screen flex items-center justify-center`}>
            <ConnectToTelegram />
          </DivContainer> : (
            <>
              <Chats />
            </>
          )
        }

        <ChatsMessagesContainer messages={telegramData} />
      </main>
    </>
  );
}
