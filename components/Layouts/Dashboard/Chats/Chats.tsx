// 'use client';

import DivContainer from '@/components/UI/DivContainer';
import ChatItem from '@/components/Layouts/Chat/ChatItem';
import { DataType } from '@/hooks/useGetTelegramChats';
import LoadingScreen from '@/components/UI/LoadingScreen';
import { useEffect, useRef, useState } from 'react';
import { StringManipulation } from '@/utils/classes/StringManipulation.class';
import { IntersectionClass } from '@/utils/classes/Intersection.class';
import MainHeading from '@/components/Typography/Heading/MainHeading';

type ChatInterfaceType = {
  chats: DataType | null;
  onSelectChat: (id: number, limit: number, skip: number) => Promise<void>;
  activeChatId?: number;
  loading: boolean;
  // children: ReactNode;
}

const messagesLimit = 20;

export default function Chats({ chats, activeChatId, onSelectChat, loading }: ChatInterfaceType) {
  const [skipMessages, setSkipMessages] = useState(0);
  const [triggerNextChatsFetch, setTriggerNextChatsFetch] = useState(false);
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const intersection = new IntersectionClass();
    intersection.triggerWhenIntersected(
      '#trigger-next-chats',
      () => {
        console.log('Fetching next chats...');
        // Your fetch logic here
      },
      { state: triggerNextChatsFetch, setState: setTriggerNextChatsFetch }
    );

    // Cleanup the observer on unmount
    return () => {
      if (observerRef.current) {
        // eslint-disable-next-line react-hooks/exhaustive-deps
        observerRef.current.disconnect();
      }
    };
  }, [triggerNextChatsFetch]);

  return (
    <>
      <DivContainer className={`flex flex-col mt-8 gap-6 overflow-y-auto max-h-[80lvh]`}>
        <DivContainer>
          <MainHeading>Telegram Chats</MainHeading>
        </DivContainer>
        {loading && <LoadingScreen spinnerSize={60} />}

        {!loading && chats && chats.chats.map((chat, index) =>
          <ChatItem
            active={activeChatId === chat.id}
            onClick={() => onSelectChat(chat.id, messagesLimit, skipMessages)}
            key={index}
            lastMessage={chat.lastMessage}
            name={new StringManipulation(chat.name).trimText(30)}
          />
        )}
        <DivContainer id={`trigger-next-chats`}></DivContainer>
      </DivContainer>
    </>
  );
}
