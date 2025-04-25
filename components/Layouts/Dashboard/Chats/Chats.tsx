// 'use client';

import DivContainer from '@/components/UI/DivContainer';
import ChatItem from '@/components/Layouts/Chat/ChatItem';
import { DataType } from '@/hooks/useGetTelegramChats';
import LoadingScreen from '@/components/UI/LoadingScreen';
import { useEffect, useState } from 'react';

type ChatInterfaceType = {
  chats: DataType | null;
  onSelectChat: (id: number) => void;
  activeChatId?: number;
  loading: boolean;
  // children: ReactNode;
}

export default function Chats({ chats, activeChatId, onSelectChat, loading }: ChatInterfaceType) {
  const [triggerNextChatsFetch, setTriggerNextChatsFetch] = useState(false);
  useEffect(() => {
    const target = document.getElementById('trigger-next-chats');
    if (!target) {
      console.error('Target element not found');
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log('Div is observed. Waiting for 5 seconds...');
            setTimeout(() => {
              console.log('5 seconds passed. Triggering action.');
            }, 5000);
          }
        });
      },
      {
        root: null, // Use the viewport as the root
        rootMargin: '0px', // No margin
        threshold: 0 // Trigger as soon as any part is visible
      }
    );

    observer.observe(target);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <>
      <DivContainer className={`text-center flex flex-col mt-8 gap-4 overflow-y-auto max-h-[80lvh]`}>
        {loading && <LoadingScreen spinnerSize={60} />}

        {!loading && chats && chats.chats.map((chat, index) =>
          <ChatItem
            active={activeChatId === chat.id}
            onClick={() => onSelectChat(chat.id)}
            key={index}
            lastMessage={chat.lastMessage}
            name={chat.name}
          />
        )}
        <DivContainer id={`trigger-next-chats`}></DivContainer>
      </DivContainer>
    </>
  );
}
