// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type MainHeadingType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'h2'>;

export default function TertiaryHeading({ className, ...props }: MainHeadingType) {
  return (
    <h2 className={`${className} text-[15px] font-medium`} {...props}>
      {props.children}
    </h2>
  );
}