'use client';

import { MessagesType } from '@/app/chats/page';
import DivContainer from '@/components/UI/DivContainer';
import UserImage from '@/components/UI/UserImage';
import SecondaryHeading from '@/components/Typography/Heading/SecondaryHeading';
import UserImg from '@/public/stab-imgs/dummy-user.png';
import MessagesContainer from '@/components/Layouts/Chat/Messages/MessagesContainer';
import TextNeutral from '@/components/Typography/Text/TextNeutral';
import LoadingScreen from '@/components/UI/LoadingScreen';
import MessageToMe from '@/components/Layouts/Chat/Messages/MessageToMe';

type ChatsContainerType = {
  chat: MessagesType | null;
  loading: boolean;
  // children: ReactNode;
}

export default function ChatsMessagesContainer({ chat, loading }: ChatsContainerType) {
  return (
    <DivContainer>
      {!loading && chat?.chatId === undefined && <DivContainer className={`flex items-center justify-center h-screen`}>
        <TextNeutral>Click to any chat to see the messages （〃｀ 3′〃）!</TextNeutral>
      </DivContainer>}

      {loading && <LoadingScreen spinnerSize={80} />}

      <DivContainer className={`pt-2 overflow-y-auto max-h-[90lvh]`}>
        <DivContainer className={`flex items-center gap-4 w-full border-b border-b-neutral-100 pb-2 fixed
          bg-white z-30 top-0 pt-4`}>
          <UserImage className={`w-16 h-16`} userImage={UserImg.src} />
          <SecondaryHeading className={`font-semibold`}>John Doe</SecondaryHeading>
        </DivContainer>
        <MessagesContainer className={`mt-16 pb-4`}>
          {!loading && chat && chat.messages.length > 0 && chat.messages.map((message, index) => {
            return <MessageToMe key={index} time={message.date}>{message.text}</MessageToMe>;
            // if (message.role === `me`)
            //   return <MessageFromMe key={index} time={message.time}>{message.message}</MessageFromMe>;
            // else
            //   return <MessageToMe key={index} time={message.time}>{message.message}</MessageToMe>;
          })}
        </MessagesContainer>
      </DivContainer>
    </DivContainer>
  );
}
