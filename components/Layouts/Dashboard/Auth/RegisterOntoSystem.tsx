// 'use client';

import { AuthStateType } from '@/components/Pages/Home/Auth';
import DivContainer from '@/components/UI/DivContainer';
import LogoIcon from '@/components/Icons/LogoIcon';
import TextNeutral from '@/components/Typography/Text/TextNeutral';
import Input from '@/components/Inputs/Input';
import Button from '@/components/Buttons/Button';
import TextGreen from '@/components/Typography/Text/TextGreen';
import { ComponentPropsWithoutRef } from 'react';

type RegisterOntoSystemType = {
  setAuthState: (state: AuthStateType) => void;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export default function RegisterOntoSystem({ className, setAuthState, ...props }: RegisterOntoSystemType) {
  return (
    <>
      <DivContainer {...props} className={`text-center flex flex-col items-center justify-center ${className}`}>
        <LogoIcon className={`h-24 w-40 mb-8`} />
        <TextNeutral className={`mb-4`}>Register Onto System</TextNeutral>
        <DivContainer className={`w-full flex flex-col gap-3 mb-14`}>
          <Input type={`email`} placeholder={`Email`} />
          <Input type={`password`} placeholder={`Password`} />
          <Input type={`password`} placeholder={`Confirm Password`} />
        </DivContainer>
        <DivContainer className={`w-full flex flex-col gap-3`}>
          <Button className={`w-full`}>Register</Button>

          <button className={`cursor-pointer transition-all duration-200 hover:scale-105`}
                  onClick={() => setAuthState(`login`)}>
            <TextGreen>Or Login</TextGreen>
          </button>
        </DivContainer>
      </DivContainer>
    </>
  );
}
