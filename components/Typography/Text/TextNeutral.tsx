// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type GrayTextType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'p'>;

export default function TextNeutral({ className, ...props }: GrayTextType) {
  return (
    <p {...props} className={`${className} text-neutral-500 font-normal`}>
    </p>
  );
}
