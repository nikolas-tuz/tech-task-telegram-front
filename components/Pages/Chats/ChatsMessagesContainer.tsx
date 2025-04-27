'use client';

import { MessagesType } from '@/app/chats/page';
import DivContainer from '@/components/UI/DivContainer';
import UserImage from '@/components/UI/UserImage';
import SecondaryHeading from '@/components/Typography/Heading/SecondaryHeading';
import UserImg from '@/public/stab-imgs/dummy-user.png';
import MessagesContainer from '@/components/Layouts/Chat/Messages/MessagesContainer';
import TextNeutral from '@/components/Typography/Text/TextNeutral';
import LoadingScreen from '@/components/UI/LoadingScreen';
import { StringManipulation } from '@/utils/classes/StringManipulation.class';
import Message from '@/components/Layouts/Chat/Messages/Message';
import axios from 'axios';
import { getAccessToken } from '@/utils/auth/getAccessToken';
import { ErrorResponseType } from '@/utils/types/errorResponse.type';
import { useEffect, useState } from 'react';
import { DocumentManipulation } from '@/utils/classes/DocumentManipulation.class';
import SnackbarMUI from '@/components/UI/SnackbarMUI';

type ChatsContainerType = {
  loading: boolean;
  activeChatId?: number;
  loggingOut: boolean;
  // children: ReactNode;
}


const messagesLimit = 80;

export default function ChatsMessagesContainer({ loading, activeChatId, loggingOut }: ChatsContainerType) {
  const [loadingChatMessages, setLoadingChatMessages] = useState(false);
  const [chatMessages, setChatMessages] = useState<MessagesType>();
  const [shouldScroll, setShouldScroll] = useState(false);
  const [errorMessage, setErrorMessage] = useState(``);


  useEffect(() => {
    if (shouldScroll) {
      new DocumentManipulation().scrollToElement(`#last-message-div`, false);
      setShouldScroll(false); // Reset the scroll flag
    }
  }, [shouldScroll]);

  useEffect(() => {
    if (!activeChatId) return;

    setLoadingChatMessages(true);

    async function fetchMessages() {
      try {
        const fetchChatMessages = await axios
          .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/telegram/chats/${activeChatId}?limit=${messagesLimit}`, {
            headers: {
              Authorization: `Bearer ${getAccessToken()}`
            }
          })
          .then((res) => res.data as MessagesType);

        if (fetchChatMessages?.chatId) {
          setChatMessages((prevState) => {
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

    fetchMessages().then();
  }, [activeChatId]);

  return (
    <DivContainer>
      <SnackbarMUI openSnackbar={!!errorMessage} anchorPosition={{ horizontal: `center`, vertical: `bottom` }}
                   severity={`error`}
                   message={errorMessage} />
      {!loading && !loadingChatMessages && !chatMessages &&
        <DivContainer className={`flex items-center justify-center h-screen`}>
          <TextNeutral>Click to any chat to see the messages （〃｀ 3′〃）!</TextNeutral>
        </DivContainer>}

      <DivContainer>
        {loading && <LoadingScreen spinnerSize={80} />}
        {loadingChatMessages && <LoadingScreen spinnerSize={80} />}
      </DivContainer>

      {!loading && !loadingChatMessages &&
        <DivContainer className={`pt-2 overflow-y-auto max-h-[90lvh]`}>
          <DivContainer className={`flex items-center gap-4 w-full border-b border-b-neutral-100 pb-2 fixed
          bg-white z-30 top-0 pt-4`}>
            <UserImage className={`w-16 h-16`} userImage={UserImg.src} />
            <SecondaryHeading className={`font-semibold`}>ChatId({activeChatId})</SecondaryHeading>
          </DivContainer>
          {loggingOut &&
            <MessagesContainer className={`mt-16 pb-4 overflow-x-hidden`}>
              <DivContainer className={`text-center overflow-y-hidden flex items-center justify-center h-[70vh]`}>
                <TextNeutral>Logged out.</TextNeutral>
              </DivContainer>
            </MessagesContainer>
          }
          {!loggingOut &&
            <MessagesContainer className={`mt-16 pb-4 overflow-x-hidden`}>
              {chatMessages?.messages.length === 0 &&
                <DivContainer className={`text-center overflow-y-hidden flex items-center justify-center h-[70vh]`}>
                  <TextNeutral>No textual messages detected.</TextNeutral>
                </DivContainer>
              }
              {chatMessages && chatMessages.messages.length > 0 &&
                chatMessages.messages.map((message, index) => {
                  return <Message isFromMe={false} className={`max-w-2xl`} key={index}
                                  time={new StringManipulation(message.date).formatDate()}>{message.text}</Message>;
                })}
              <DivContainer id={`last-message-div`}></DivContainer>
            </MessagesContainer>
          }
        </DivContainer>
      }
    </DivContainer>
  );
}
