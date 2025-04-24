// 'use client';

import DivContainer from '@/components/UI/DivContainer';
import TextNormal from '@/components/Typography/Text/TextNormal';
import { MessageType } from '@/components/Layouts/Chat/Messages/MessageFromMe';

export default function MessageToMe({ time, img, ...props }: MessageType) {
  return (
    <>
      {img && <DivContainer className={`relative rounded-2xl h-80 w-80`}>
        {/*<img className={`object-cover absolute`} src={img.src} alt="User Image" />*/}
        <img className={`object-cover absolute`} src="./stab-imgs/img-message.png" alt="" />
      </DivContainer>
      }
      <DivContainer className={`px-5 py-3 bg-zinc-200/40 rounded-2xl w-fit ml-auto text-right`}>
        <TextNormal>{props.children}</TextNormal>
        <span className={`text-sm inline-block text-zinc-600 font-light`}>{time}</span>
      </DivContainer>
    </>
  );
}
