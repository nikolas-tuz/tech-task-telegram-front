// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type TextNormalType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'p'>;

export default function TextNormal({ className, ...props }: TextNormalType) {
  return (
    <p {...props} className={`${className} text-zinc-800 font-normal`}>
      {props.children}
    </p>
  );
}
