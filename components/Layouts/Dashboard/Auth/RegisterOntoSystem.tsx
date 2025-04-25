'use client';

import { AuthStateType } from '@/components/Pages/Home/Auth';
import DivContainer from '@/components/UI/DivContainer';
import LogoIcon from '@/components/Icons/LogoIcon';
import TextNeutral from '@/components/Typography/Text/TextNeutral';
import Input from '@/components/Inputs/Input';
import Button from '@/components/Buttons/Button';
import TextGreen from '@/components/Typography/Text/TextGreen';
import { ComponentPropsWithoutRef, FormEvent, useState } from 'react';
import { registerSchema } from '@/utils/schemas/register.schema';
import ErrorMessage from '@/components/Layouts/Info/ErrorMessage';

type RegisterOntoSystemType = {
  setAuthState: (state: AuthStateType) => void;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export default function RegisterOntoSystem({ className, setAuthState, ...props }: RegisterOntoSystemType) {
  const [errorMessage, setErrorMessage] = useState(``);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as {
      email: string;
      password: string;
      confirmPassword: string
    };

    const validate = registerSchema.safeParse({
      email: results.email, password: results.password,
      confirmPassword: results.confirmPassword
    });

    if (!validate.success) {
      setErrorMessage(validate.error.errors[0].message);
      return;
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <DivContainer {...props} className={`text-center flex flex-col items-center justify-center ${className}`}>
        <LogoIcon className={`h-24 w-40 mb-8`} />
        <TextNeutral className={`mb-4`}>Register Onto System</TextNeutral>
        <DivContainer className={`w-full flex flex-col gap-3 mb-14`}>
          <Input onFocus={() => setErrorMessage(``)} invalid={!!errorMessage} name={`email`} type={`email`}
                 placeholder={`Email`} />
          <Input onFocus={() => setErrorMessage(``)} invalid={!!errorMessage} name={`password`} type={`password`}
                 placeholder={`Password`} />
          <Input onFocus={() => setErrorMessage(``)} invalid={!!errorMessage} name={`confirmPassword`} type={`password`}
                 placeholder={`Confirm Password`} />

          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </DivContainer>
        <DivContainer className={`w-full flex flex-col gap-3`}>
          <Button className={`w-full`}>Register</Button>

          <button className={`cursor-pointer transition-all duration-200 hover:scale-105`}
                  onClick={() => setAuthState(`login`)}>
            <TextGreen>Or Login</TextGreen>
          </button>
        </DivContainer>
      </DivContainer>
    </form>
  );
}
