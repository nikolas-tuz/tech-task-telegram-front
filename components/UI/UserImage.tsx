// 'use client';

import DivContainer from '@/components/UI/DivContainer';
import Image from 'next/image';

type UserImageType = {
  userImage?: string | undefined;
  // children: ReactNode;
}

export default function UserImage({ userImage = undefined }: UserImageType) {
  return (
    <>
      {userImage ? (
        <Image className={`rounded-full`} width={32} height={32} src={``} alt={`User Image`} />
      ) : (
        <DivContainer className={`w-12 h-12 bg-[#27AE60] rounded-full`}></DivContainer>
      )}
    </>
  );
}
