// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type MainHeadingType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'h2'>;

export default function MainHeading({ className, ...props }: MainHeadingType) {
  return (
    <h2 className={`${className} text-2xl font-bold`} {...props}>
      {props.children}
    </h2>
  );
}
