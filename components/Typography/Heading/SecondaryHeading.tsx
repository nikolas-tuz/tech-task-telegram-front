// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type MainHeadingType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'h2'>;

export default function SecondaryHeading({ className, ...props }: MainHeadingType) {
  return (
    <h2 className={`${className} text-lg`} {...props}>
      {props.children}
    </h2>
  );
}