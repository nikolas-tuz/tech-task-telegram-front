'use client';

import { AuthStateType } from '@/components/Pages/Home/Auth';
import DivContainer from '@/components/UI/DivContainer';
import LogoIcon from '@/components/Icons/LogoIcon';
import TextNeutral from '@/components/Typography/Text/TextNeutral';
import Button from '@/components/Buttons/Button';
import TextGreen from '@/components/Typography/Text/TextGreen';
import Input from '@/components/Inputs/Input';
import { ComponentPropsWithoutRef, FormEvent, useState } from 'react';
import { loginSchema } from '@/utils/schemas/login.schema';
import ErrorMessage from '@/components/Layouts/Info/ErrorMessage';

type LoginOntoSystemType = {
  setAuthState: (state: AuthStateType) => void;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export default function LoginOntoSystem({ className, setAuthState, ...props }: LoginOntoSystemType) {
  const [errorMessage, setErrorMessage] = useState(``);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as { email: string; password: string };

    const validate = loginSchema.safeParse({ email: results.email, password: results.password });

    if (!validate.success) {
      setErrorMessage(validate.error.errors[0].message);
      return;
    }

    /* TODO: SEND HTTP REQ TO FAST API BACKED TO VERIFY USER, IF OK, THEN CHANGE UI by using setAuthState */

  }

  function handleAuthState() {
    setAuthState(`register`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <DivContainer {...props} className={`text-center flex flex-col items-center justify-center ${className}`}>
        <LogoIcon className={`h-24 w-40 mb-8`} />

        <TextNeutral className={`mb-4`}>Log in Onto System</TextNeutral>

        <DivContainer className={`w-full flex flex-col gap-3 mb-14`}>
          <Input onFocus={() => setErrorMessage(``)} invalid={!!errorMessage} name={`email`} type={`email`}
                 placeholder={`Email`} />
          <Input onFocus={() => setErrorMessage(``)} invalid={!!errorMessage} name={`password`} type={`password`}
                 placeholder={`Password`} />
          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </DivContainer>

        <DivContainer className={`w-full flex flex-col gap-3`}>
          <Button className={`w-full`}>Log In</Button>


          <button className={`cursor-pointer transition-all duration-200 hover:scale-105`}
                  onClick={handleAuthState}>
            <TextGreen>Or Register</TextGreen>
          </button>
        </DivContainer>
      </DivContainer>
    </form>
  );
}
