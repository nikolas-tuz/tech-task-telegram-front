// 'use client';

type ChatType = {
  active?: boolean;
  lastMessage: string;
  name: string;
  // children: ReactNode;
}

import DivContainer from '@/components/UI/DivContainer';
import Image from 'next/image';
import DummyUserImg from '@/public/stab-imgs/dummy-user.png';
import TertiaryHeading from '@/components/Typography/Heading/TertiaryHeading';
import TextNeutral from '@/components/Typography/Text/TextNeutral';
import { StringManipulation } from '@/utils/classes/StringManipulation.class';

export default function ChatItem({ active = false, name, lastMessage }: ChatType) {
  const stylesApplied = active ? `bg-zinc-200 ` : ``;
  return (
    <>
      <DivContainer className={`flex items-center gap-3 group transition-all duration-200 rounded-full ${stylesApplied}
      border border-transparent hover:border-green-500 cursor-pointer`}>
        <Image className={`transition-all duration-200 group-hover:rotate-3`} width={50} height={50} src={DummyUserImg}
               alt={`Dummy User Image`} />
        <DivContainer className={`flex flex-col items-baseline`}>
          <TertiaryHeading className={`group-hover:text-[#27AE60]`}>{name}</TertiaryHeading>
          <TextNeutral>{new StringManipulation(lastMessage).trimText(30)}</TextNeutral>
        </DivContainer>
      </DivContainer>
    </>
  );
}
