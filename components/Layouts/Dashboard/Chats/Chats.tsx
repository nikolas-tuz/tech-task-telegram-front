// 'use client';

import { ChatType } from '@/app/chats/page';
import DivContainer from '@/components/UI/DivContainer';
import ChatItem from '@/components/Layouts/Chat/ChatItem';

type ChatInterfaceType = {
  chats: ChatType[] | undefined;
  onSelectChat: (id: number) => void;
  activeChatId?: number;
  // children: ReactNode;
}

// import LoadingScreen from '@/components/UI/LoadingScreen';

export default function Chats({ chats, activeChatId, onSelectChat }: ChatInterfaceType) {
  return (
    <>
      <DivContainer className={`text-center flex flex-col mt-8 gap-4 overflow-y-auto max-h-[80lvh]`}>
        {/*<LoadingScreen spinnerSize={60} />*/}
        {chats.map((chat, index) =>
          <ChatItem
            active={activeChatId === chat.id}
            onClick={() => onSelectChat(chat.id)}
            key={index}
            lastMessage={chat.messages.length > 0 ? chat.messages[0].message : undefined}
            name={chat.name}
          />
        )}
      </DivContainer>
    </>
  );
}
