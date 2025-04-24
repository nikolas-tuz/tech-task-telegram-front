'use client';

/*
type ContentType = {
  // children: ReactNode;
}
*/

import DivContainer from '@/components/UI/DivContainer';
import { useState } from 'react';
import { AuthStateType } from '@/components/Dashboard/Dashboard';
import TextNeutral from '@/components/Typography/Text/TextNeutral';
import UserImage from '@/components/UI/UserImage';
import DummyUserImg from '@/public/stab-imgs/dummy-user.png';
import SecondaryHeading from '@/components/Typography/Heading/SecondaryHeading';
import MessageFromMe from '@/components/Layouts/Chat/Messages/MessageFromMe';
import MessagesContainer from '@/components/Layouts/Chat/Messages/MessagesContainer';
import MessageToMe from '@/components/Layouts/Chat/Messages/MessageToMe';

export default function Content(/*{}: ContentType*/) {
  const [authState, setAuthState] = useState<AuthStateType>(`chat-opened`);
  const [showMessages, setShowMessages] = useState(false);
  return (
    <DivContainer className={``}>
      {(authState === `login` || authState === `register`) &&
        <DivContainer className={`flex items-center justify-center h-screen`}>
          <TextNeutral>This app was built by Nikolas Tuz as tech task from Neuro Track.
            The design I stole appropriated from Figma Templates.</TextNeutral>
        </DivContainer>
      }
      {(authState === `telegram` && !showMessages) &&
        <DivContainer className={`flex items-center justify-center h-screen`}>
          <TextNeutral>Click to any chat to see the messages （〃｀ 3′〃）!</TextNeutral>
        </DivContainer>
      }
      {authState === `chat-opened` && (
        <DivContainer className={`pt-2 overflow-y-auto max-h-[90lvh]`}>
          <DivContainer className={`flex items-center gap-4 w-full border-b border-b-neutral-100 pb-2 fixed
          bg-white z-30 top-0 pt-4`}>
            <UserImage className={`w-16 h-16`} userImage={DummyUserImg.src} />
            <SecondaryHeading className={`font-semibold`}>John Doe</SecondaryHeading>
          </DivContainer>
          <MessagesContainer className={`mt-16`}>
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
