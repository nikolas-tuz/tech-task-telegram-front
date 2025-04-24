// 'use client';

import { ComponentPropsWithoutRef } from 'react';
import DivContainer from '@/components/UI/DivContainer';

type MessagesContainerType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export default function MessagesContainer({ className, ...props }: MessagesContainerType) {
  return (
    <DivContainer {...props} className={`flex flex-col pt-3 pl-12 w-full gap-2 ${className}`}>
      {props.children}
    </DivContainer>
  );
}
