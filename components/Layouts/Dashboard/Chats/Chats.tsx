// 'use client';

import DivContainer from '@/components/UI/DivContainer';
import ChatItem from '@/components/Layouts/Chat/ChatItem';
import { DataType } from '@/hooks/useGetTelegramChats';
import LoadingScreen from '@/components/UI/LoadingScreen';
import { StringManipulation } from '@/utils/classes/StringManipulation.class';
import MainHeading from '@/components/Typography/Heading/MainHeading';

type ChatInterfaceType = {
  chats: DataType | null;
  onSelectChat: (id: number) => void;
  activeChatId?: number;
  loading: boolean;
  // children: ReactNode;
}

export default function Chats({ chats, activeChatId, onSelectChat, loading }: ChatInterfaceType) {
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
            onClick={() => onSelectChat(chat.id)}
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
