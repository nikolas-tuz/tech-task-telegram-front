'use client';

import { ComponentPropsWithoutRef, useState } from 'react';
import DivContainer from '@/components/UI/DivContainer';
import SmallBadge from '@/components/Badges/SmallBadge';

type InputType = {
  invalid?: boolean;
  password?: boolean;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'input'>;

export default function Input({ required = true, invalid, type, password, className, ...props }: InputType) {
  const [passwordSeen, setPasswordSeen] = useState(false);

  const appliedStyles = !invalid ? `text-[#27AE60] placeholder-[#27AE60] border-[#27AE60]`
    : `text-red placeholder-red-500 border-red-500`;

  return (
    <DivContainer className={`flex justify-center relative`}>
      <input type={password && passwordSeen ? `text` : password && !passwordSeen ? `password` : type}
             required={required} {...props} className={`${className} ${appliedStyles} px-6 py-3 rounded-full border text-lg transition-all duration-300 placeholder-inherit
      outline-none focus:bg-green-50 active:bg-green-50 `} />
      {password && !passwordSeen && (
        <SmallBadge className={`absolute top-1/2 -translate-y-1/2 right-4 `} mode={`green`}
                    onClick={() => setPasswordSeen(true)}>See</SmallBadge>
      )}

      {password && passwordSeen && (
        <SmallBadge className={`absolute top-1/2 -translate-y-1/2 right-4 `} mode={`red`}
                    onClick={() => setPasswordSeen(false)}>Hide</SmallBadge>
      )}
    </DivContainer>
  );
}

