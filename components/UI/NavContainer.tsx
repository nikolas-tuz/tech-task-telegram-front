// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type NavContainerType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'nav'>;

export default function NavContainer({ ...props }: NavContainerType) {
  return (
    <nav {...props}>
      {props.children}
    </nav>
  );
}
