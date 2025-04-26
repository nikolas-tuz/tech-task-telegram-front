// 'use client';

import { ComponentPropsWithoutRef } from 'react';
import DivContainer from '@/components/UI/DivContainer';
import TextNormal from '@/components/Typography/Text/TextNormal';

export type MessageProps = {
  time: string;
  img?: {
    src: string;
  };
  isFromMe?: boolean; // Determines if the message is from the user or to the user
  className?: string; // Additional class names for customization
} & ComponentPropsWithoutRef<'div'>;

export default function Message({ time, img, isFromMe = true, className, ...props }: MessageProps) {
  const containerStyles = isFromMe
    ? 'bg-blue-200/40 ml-auto text-right'
    : 'bg-zinc-200/40 mr-auto text-left';

  return (
    <>
      {img && (
        <DivContainer className="relative rounded-2xl h-80 w-80">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="object-cover absolute" src={img.src || './stab-imgs/img-message.png'} alt="Media Image" />
        </DivContainer>
      )}

      <DivContainer
        {...props}
        className={`px-5 py-3 rounded-2xl w-fit ${containerStyles} ${className}`}
      >
        <TextNormal>{props.children}</TextNormal>
        <span className="text-sm text-zinc-600 font-light">{time}</span>
      </DivContainer>
    </>
  );
}