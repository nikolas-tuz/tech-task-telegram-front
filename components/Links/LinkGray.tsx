// 'use client';

import { ComponentPropsWithoutRef } from 'react';
import Link from 'next/link';

type GrayTextType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'a'>;

export default function LinkGray({ className, href = `#`, target = `_blank`, ...props }: GrayTextType) {
  return (
    <Link target={target} href={href} {...props} className={`${className} text-neutral-600 font-normal underline`}>
      {props.children}
    </Link>
  );
}