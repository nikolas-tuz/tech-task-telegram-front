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
import { useEffect, useState } from 'react';
import Chats from '@/components/Layouts/Dashboard/Chats/Chats';
import { logOut } from '@/utils/auth/logOut';
import { useGetTelegramChats } from '@/hooks/useGetTelegramChats';
import { getAccessToken } from '@/utils/auth/getAccessToken';
import axios from 'axios';
import { DocumentManipulation } from '@/utils/classes/DocumentManipulation.class';
import SnackbarMUI from '@/components/UI/SnackbarMUI';
import { ErrorResponseType } from '@/utils/types/errorResponse.type';

export type MessagesType = {
  chatId: number;
  message: string;
  messages: { id: number; text: string; date: string }[]
}

const chatsLimit = 10;

export default function ChatsPage(/*{}: ChatsPageType*/) {
  const [skipChats, setSkipChats] = useState(0);
  const { data, loading, error, telegramConnected } = useGetTelegramChats(chatsLimit, skipChats);
  const [errorMessage, setErrorMessage] = useState(``);

  const [activeChat, setActiveChat] = useState<MessagesType | null>(null);

  const [skipChatMessages, setSkipChatMessages] = useState(0);

  const [loadingChatMessages, setLoadingChatMessages] = useState(false);

  const [shouldScroll, setShouldScroll] = useState(false);

  useEffect(() => {
    if (shouldScroll) {
      new DocumentManipulation().scrollToElement(`#last-message-div`);
      setShouldScroll(false); // Reset the scroll flag
    }
  }, [shouldScroll]);

  async function handleOnSelectChat(id: number, limit: number, skip: number) {
    try {
      setLoadingChatMessages(true);
      const fetchChatMessages = await axios
        .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/telegram/chats/${id}?limit=${limit}&skip=${skip}`, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`
          }
        })
        .then((res) => res.data as MessagesType);

      if (fetchChatMessages?.chatId) {
        setActiveChat((prevState) => {
          if (prevState) return { ...prevState, ...fetchChatMessages };
          return fetchChatMessages;
        });
        setShouldScroll(true); // Trigger the scroll after state update
      }
    } catch (e) {
      console.error(e);
      setErrorMessage((e as ErrorResponseType).response.data.detail);
    } finally {
      setLoadingChatMessages(false);
    }
  }

  function onTelegramConnect() {
  }

  return (
    <>
      <main className={`main-grid-container pt-7 px-8`}>
        <SnackbarMUI severity={`error`} message={errorMessage} openSnackbar={!!errorMessage} />
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
