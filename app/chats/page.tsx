'use client';

import UserImg from '@/public/stab-imgs/dummy-user.png';

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
import { getAccessToken } from '@/utils/auth/getAccessToken';
import axios from 'axios';

export type MessagesType = {
  chatId: number;
  message: string;
  messages: { id: number; text: string; date: string }[]
}

const limit = 10;

export default function ChatsPage(/*{}: ChatsPageType*/) {
  const [activeChat, setActiveChat] = useState<MessagesType | null>(null);
  const [skipChats, setSkipChats] = useState(0);
  const [skipChatMessages, setSkipChatMessages] = useState(0);
  const { data, loading, error, telegramConnected } = useGetTelegramChats(limit, skipChats);

  const [loadingChatMessages, setLoadingChatMessages] = useState(false);

  async function handleOnSelectChat(id: number) {
    setLoadingChatMessages(true);
    try {
      const fetchChatMessages = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/telegram/chats/${id}?limit=${limit}&skip=${skipChatMessages}`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      }).then(res => res.data as MessagesType);

      if (fetchChatMessages.chatId) {
        setActiveChat(fetchChatMessages);
      }
    } catch (e) {
    } finally {
      setLoadingChatMessages(false);
    }
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
          userImage={UserImg.src} />

        {(!loading && !telegramConnected) ?
          <DivContainer className={`pl-5 h-screen flex items-center justify-center`}>
            <ConnectToTelegram onTelegramConnect={onTelegramConnect} />
          </DivContainer> : (
            <>
              <Chats loading={loading} activeChatId={activeChat?.chatId} onSelectChat={handleOnSelectChat}
                     chats={data} />
            </>
          )
        }
        <ChatsMessagesContainer loading={loading || loadingChatMessages} chat={activeChat} />
      </main>
    </>
  );
}
