// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type SmallBadgeType = {
  mode: `red` | `green`
  // children: ReactNode;
} & ComponentPropsWithoutRef<'span'>;

export default function SmallBadge({ className, mode, ...props }: SmallBadgeType) {
  const appliedStyles = mode === `red` ? `bg-red-200 text-red-600` : `bg-green-200  text-green-600`;
  return (
    <>
        <span {...props} className={`absolute top-1/2 -translate-y-1/2 right-4 ${className} ${appliedStyles}
        text-sm rounded-full px-2 py-0.5 transition-all duration-200 hover:scale-105 cursor-pointer`}>{props.children}</span>
    </>
  );
}
