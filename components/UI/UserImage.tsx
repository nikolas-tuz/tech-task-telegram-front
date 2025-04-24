// 'use client';

import DivContainer from '@/components/UI/DivContainer';
import { ComponentPropsWithoutRef } from 'react';

type UserImageType = {
  userImage?: string | undefined;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'img'>;

export default function UserImage({ userImage = undefined, className, ...props }: UserImageType) {
  return (
    <>
      {userImage ? (
        <img {...props} className={`rounded-full ${className}`} src={userImage} alt={`User Image`} />
      ) : (
        <DivContainer className={`w-12 h-12 bg-[#27AE60] rounded-full`}></DivContainer>
      )}
    </>
  );
}
