'use client';

import ChatImg from '@/public/stab-imgs/dummy-user.png';

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
import { logOut } from '@/utils/auth/logOut';
import { useGetTelegramChats } from '@/hooks/useGetTelegramChats';
import SnackbarMUI from '@/components/UI/SnackbarMUI';

export type MessagesType = {
  chatId: number;
  chatName: string;
  message: string;
  messages: { id: number; text: string; date: string }[]
}

const chatsLimit = 140;

export default function ChatsPage(/*{}: ChatsPageType*/) {
  const { data, loading, error, telegramConnected } = useGetTelegramChats(chatsLimit);
  const [activeChatId, setActiveChatId] = useState<number | undefined>(undefined);

  async function handleOnSelectChat(id: number) {
    setActiveChatId(id);
  }

  function onTelegramConnect() {
  }

  return (
    <>
      <main className={`main-grid-container pt-7 px-8`}>
        <Navigation
          logoutFromApp={{
            active: true, function: () => logOut()
          }}
          logoutFromTelegram={{
            active: telegramConnected, function: () => {
            }
          }}
          userImage={ChatImg.src} />

        {(!loading && !telegramConnected) ?
          <DivContainer className={`pl-5 h-screen flex items-center justify-center`}>
            <ConnectToTelegram onTelegramConnect={onTelegramConnect} />
          </DivContainer> : (
            <Chats loading={loading} activeChatId={activeChatId} onSelectChat={handleOnSelectChat}
                   chats={data} />
          )
        }
        <ChatsMessagesContainer loading={loading} activeChatId={activeChatId} />
      </main>
      <SnackbarMUI severity={`error`} message={error || `Failed to load chats. Please try again.`}
                   openSnackbar={!!error} />
    </>
  );
}
