// 'use client';

import { ComponentPropsWithoutRef } from 'react';
import DivContainer from '@/components/UI/DivContainer';
import TextNormal from '@/components/Typography/Text/TextNormal';

export type MessageType = {
  time: string;
  img?: {
    src: string;
  };
  // children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export default function MessageFromMe({ time, className, img, ...props }: MessageType) {
  return (
    <>

      {img && <DivContainer className={`relative rounded-2xl h-80 w-80`}>
        {/*<img className={`object-cover absolute`} src={img.src} alt="User Image" />*/}
        <img className={`object-cover absolute`} src="./stab-imgs/img-message.png" alt="" />
      </DivContainer>
      }

      <DivContainer {...props} className={`px-5 py-3 bg-blue-200/40 rounded-2xl w-fit ${className}`}>
        <TextNormal>{props.children}</TextNormal>
        <span className={`text-sm text-zinc-600 font-light`}>{time}</span>
      </DivContainer>
    </>
  );
}
