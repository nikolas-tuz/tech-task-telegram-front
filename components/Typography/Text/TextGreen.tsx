// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type GreenTextType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'p'>;

export default function TextGreen({ className, ...props }: GreenTextType) {
  return (
    <p {...props} className={`${className} text-[#27AE60] font-medium`}>
    </p>
  );
}