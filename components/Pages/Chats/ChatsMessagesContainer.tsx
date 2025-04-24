'use client';

import { TelegramChatsDataType } from '@/app/chats/page';
import DivContainer from '@/components/UI/DivContainer';
import { useState } from 'react';
import TextNeutral from '@/components/Typography/Text/TextNeutral';
import UserImage from '@/components/UI/UserImage';
import SecondaryHeading from '@/components/Typography/Heading/SecondaryHeading';
import UserImg from '@/public/stab-imgs/dummy-user.png';
import MessagesContainer from '@/components/Layouts/Chat/Messages/MessagesContainer';
import MessageFromMe from '@/components/Layouts/Chat/Messages/MessageFromMe';
import MessageToMe from '@/components/Layouts/Chat/Messages/MessageToMe';

type ChatsContainerType = {
  messages: TelegramChatsDataType[];
  // children: ReactNode;
}

export default function ChatsMessagesContainer({ messages }: ChatsContainerType) {
  const [showMessages, setShowMessages] = useState(true);
  return (
    <DivContainer className={``}>
      {/*<DivContainer className={`flex items-center justify-center h-screen`}>
        <TextNeutral>Click to any chat to see the messages （〃｀ 3′〃）!</TextNeutral>
      </DivContainer>*/}
      {/*<LoadingScreen spinnerSize={80} />*/}
      {showMessages && (
        <DivContainer className={`pt-2 overflow-y-auto max-h-[90lvh]`}>
          <DivContainer className={`flex items-center gap-4 w-full border-b border-b-neutral-100 pb-2 fixed
          bg-white z-30 top-0 pt-4`}>
            <UserImage className={`w-16 h-16`} userImage={UserImg.src} />
            <SecondaryHeading className={`font-semibold`}>John Doe</SecondaryHeading>
          </DivContainer>
          <MessagesContainer className={`mt-16 pb-4`}>
            <MessageFromMe time={`14:45`}>Hello! Have you seen my backpack anywhere in office?</MessageFromMe>
            <MessageFromMe img={{ src: `` }} time={`14:45`}>Hello! Have you seen my backpack anywhere in
              office?</MessageFromMe>
            <MessageToMe time={`14:47`}>Hello! Have you seen my backpack anywhere in office?</MessageToMe>
            <MessageFromMe time={`14:45`}>Hello! Have you seen my backpack anywhere in office?</MessageFromMe>
            <MessageFromMe img={{ src: `` }} time={`14:45`}>Hello! Have you seen my backpack anywhere in
              office?</MessageFromMe>
            <MessageToMe time={`14:47`}>Hello! Have you seen my backpack anywhere in office?</MessageToMe>
            <MessageFromMe time={`14:45`}>Hello! Have you seen my backpack anywhere in office?</MessageFromMe>
            <MessageFromMe img={{ src: `` }} time={`14:45`}>Hello! Have you seen my backpack anywhere in
              office?</MessageFromMe>
            <MessageToMe time={`14:47`}>Hello! Have you seen my backpack anywhere in office?</MessageToMe>
            <MessageFromMe time={`14:45`}>Hello! Have you seen my backpack anywhere in office?</MessageFromMe>
            <MessageFromMe img={{ src: `` }} time={`14:45`}>Hello! Have you seen my backpack anywhere in
              office?</MessageFromMe>
            <MessageToMe time={`14:47`}>Hello! Have you seen my backpack anywhere in office?</MessageToMe>
            <MessageFromMe time={`14:45`}>Hello! Have you seen my backpack anywhere in office?</MessageFromMe>
            <MessageFromMe img={{ src: `` }} time={`14:45`}>Hello! Have you seen my backpack anywhere in
              office?</MessageFromMe>
            <MessageToMe time={`14:47`}>Hello! Have you seen my backpack anywhere in office?</MessageToMe>
          </MessagesContainer>
        </DivContainer>
      )}
    </DivContainer>
  );
}
