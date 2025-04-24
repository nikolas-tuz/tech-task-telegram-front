// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type ButtonType = {
  // children: ReactNode;
} & ComponentPropsWithoutRef<'button'>;

export default function Button({ className, ...props }: ButtonType) {
  return (
    <button {...props} className={`${className} bg-[#27AE60] py-5 px-10 rounded-full text-xl text-white
    border border-transparent transition-all duration-300 hover:bg-white hover:border-green-500
    hover:text-[#27AE60] cursor-pointer`}>
      {props.children}
    </button>
  );
}
