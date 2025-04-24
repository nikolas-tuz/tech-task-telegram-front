// 'use client';

import { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';

type GrayTextType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'a'>;

export default function LinkGreen({ className, href = `#`, ...props }: GrayTextType) {
  return (
    <Link href={href} {...props} className={`${className} text-[#27AE60] font-medium`}>
    </Link>
  );
}