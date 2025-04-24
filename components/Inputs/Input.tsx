// 'use client';

import { ComponentPropsWithoutRef } from 'react';

type InputType = {
  invalid?: boolean;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({ required = true, invalid, className, ...props }: InputType) {
  const appliedStyles = !invalid ? `text-[#27AE60] placeholder-[#27AE60] border-[#27AE60]`
    : `text-red placeholder-red-500 border-red-500`;
  return (
    <>
      <input required={required} {...props} className={`${className} ${appliedStyles} px-6 py-3 rounded-full border 
       text-lg transition-all duration-300
      outline-none focus:bg-green-50`} />
    </>
  );
}

