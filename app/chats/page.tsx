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
import TelegramConnectionModal from '@/components/Modals/TelegramConnectionModal';
import { removeTelegramSession } from '@/utils/auth/telegramSession/removeTelegramSession';
import { getAccessToken } from '@/utils/auth/getAccessToken';
import { ErrorResponseType } from '@/utils/types/errorResponse.type';
import axios from 'axios';
import BackdropMUI from '@/components/Backdrop/BackdropMUI';

export type MessagesType = {
  chatId: number;
  chatName: string;
  message: string;
  messages: { id: number; text: string; date: string }[]
}

const chatsLimit = 140;

export default function ChatsPage(/*{}: ChatsPageType*/) {
  const [telegramModalState, setTelegramModalState] = useState(false);

  const { data, loading, error, telegramConnected, setTelegramConnected } = useGetTelegramChats(chatsLimit);
  const [loggingOut, setLoggingOut] = useState(false);
  const [loggedOutFromTelegram, setLoggedOutFromTelegram] = useState<boolean>(false);

  const [activeChatId, setActiveChatId] = useState<number | undefined>(undefined);
  const [errorMessage, setErrorMessage] = useState(``);

  async function handleOnSelectChat(id: number) {
    setActiveChatId(id);
  }

  function onTelegramConnect() {
    setTelegramModalState(true);
  }

  async function onTelegramLogout() {
    setLoggedOutFromTelegram(true);
    try {
      const telegramLogout = await axios.delete(`${process.env.NEXT_PUBLIC_BACKEND_URL}/telegram/logout`, {
        headers: {
          Authorization: `Bearer ${getAccessToken()}`
        }
      }).then(res => res.data as { status: string });

      if (telegramLogout?.status === `success`) {
        setTelegramConnected(false);
        removeTelegramSession();
        return;
      }
    } catch (e) {
      setErrorMessage((e as ErrorResponseType).response.data.detail || `Failed to log user out from telegram.`);
      setLoggedOutFromTelegram(false);
    }
  }

  return (
    <>
      <BackdropMUI openState={{ state: loggingOut, setState: setLoggingOut }} />
      <main className={`main-grid-container pt-7 px-8`}>
        <Navigation
          logoutFromApp={{
            active: true, function: () => {
              setLoggingOut(true);
              logOut();
            }
          }}
          logoutFromTelegram={{
            active: telegramConnected, function: () => onTelegramLogout()
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
        <ChatsMessagesContainer loggingOut={loggedOutFromTelegram} loading={loading} activeChatId={activeChatId} />
      </main>
      <TelegramConnectionModal
        setTelegramConnected={setTelegramConnected}
        modalState={{ open: telegramModalState, setOpen: setTelegramModalState }} />

      <SnackbarMUI severity={`error`} message={error || errorMessage || `Failed to load chats. Please try again.`}
                   openSnackbar={!!error || !!errorMessage} />
    </>
  );
}
