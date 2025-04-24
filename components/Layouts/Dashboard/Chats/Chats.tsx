// 'use client';

/*
type ChatInterfaceType = {
  // children: ReactNode;
}
*/

import DivContainer from '@/components/UI/DivContainer';
import ChatItem from '@/components/Layouts/Chat/ChatItem';
// import LoadingScreen from '@/components/UI/LoadingScreen';

export default function Chats(/*{}: ChatInterfaceType*/) {
  return (
    <>
      <DivContainer className={`text-center flex flex-col mt-8 gap-4 overflow-y-auto max-h-[80lvh]`}>
        {/*<LoadingScreen spinnerSize={60} />*/}
        <ChatItem
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
        <ChatItem
          active={true}
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
        <ChatItem
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
        <ChatItem
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
        <ChatItem
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
        <ChatItem
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
        <ChatItem
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
        <ChatItem
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
        <ChatItem
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
        <ChatItem
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
        <ChatItem
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
        <ChatItem
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
        <ChatItem
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
        <ChatItem
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
        <ChatItem
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
        <ChatItem
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
        <ChatItem
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
        <ChatItem
          lastMessage={`Lorem ipsum dolor sit amet, consectetur adipisicing elit. Libero, veritatis?`}
          name={`John Doe`} />
      </DivContainer>
    </>
  );
}
