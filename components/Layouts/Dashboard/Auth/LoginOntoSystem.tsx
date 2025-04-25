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
import axios from 'axios';
import { logIn } from '@/utils/auth/logIn';
import { ErrorResponseType } from '@/utils/types/errorResponse.type';
import BackdropMUI from '@/components/Backdrop/BackdropMUI';

type LoginOntoSystemType = {
  setAuthState: (state: AuthStateType) => void;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export default function LoginOntoSystem({ className, setAuthState, ...props }: LoginOntoSystemType) {
  const [backdropState, setBackdropState] = useState(false);
  const [errorMessage, setErrorMessage] = useState(``);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as { email: string; password: string };

    const validate = loginSchema.safeParse({ email: results.email, password: results.password });

    if (!validate.success) {
      setErrorMessage(validate.error.errors[0].message);
      return;
    }
    setBackdropState(true);

    try {
      const loginUser = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`, {
        email: results.email,
        password: results.password
        // allow use of any es-lint
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }).then(res => res.data as any);

      if (loginUser?.user?.email) {
        logIn(loginUser.access_token, loginUser.user.telegram_session);
      }
    } catch (e) {
      setBackdropState(false);
      setErrorMessage(`Operation failed. ${(e as ErrorResponseType).response?.data?.detail || `Please try again later.`}`);
    }

  }

  function handleAuthState() {
    setAuthState(`register`);
  }

  return (
    <form onSubmit={handleSubmit}>
      <BackdropMUI openState={{ state: backdropState, setState: setBackdropState }} />
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
