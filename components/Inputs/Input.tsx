// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type InputType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({ required = true, className, ...props }: InputType) {
  return (
    <>
      <input required={required} {...props} className={`${className}  px-6 py-3 rounded-full border border-[#27AE60]
      text-[#27AE60] placeholder-[#27AE60] text-lg transition-all duration-300
      outline-none focus:bg-green-50`} />
    </>
  );
}

