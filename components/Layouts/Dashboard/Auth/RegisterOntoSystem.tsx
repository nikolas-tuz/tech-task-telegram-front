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
import axios from 'axios';
import { logIn } from '@/utils/auth/logIn';
import BackdropMUI from '@/components/Backdrop/BackdropMUI';
import { ErrorResponseType } from '@/utils/types/errorResponse.type';
import { getTelegramSession } from '@/utils/auth/telegramSession/getTelegramSession';

type RegisterOntoSystemType = {
  setAuthState: (state: AuthStateType) => void;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export default function RegisterOntoSystem({ className, setAuthState, ...props }: RegisterOntoSystemType) {
  const [loading, setLoading] = useState(false);
  const [backdropState, setBackdropState] = useState(false);
  const [errorMessage, setErrorMessage] = useState(``);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
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
    setBackdropState(true);
    setLoading(true);

    try {
      const registerUser = await axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/users/register`, {
        email: results.email,
        password: results.password
        // allow use of any es-lint
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
      }).then(res => res.data as any);

      if (registerUser?.user?.email) {
        logIn(registerUser.access_token, getTelegramSession());
      }
    } catch (e) {
      setBackdropState(false);
      setErrorMessage(`Operation failed. ${(e as ErrorResponseType).response?.data?.detail || `Please try again later.`}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <BackdropMUI openState={{ state: backdropState, setState: setBackdropState }} />
      <DivContainer {...props} className={`text-center flex flex-col items-center justify-center ${className}`}>
        <LogoIcon className={`h-24 w-40 mb-8`} />
        <TextNeutral className={`mb-4`}>Register Onto System</TextNeutral>
        <DivContainer className={`w-full flex flex-col gap-3 mb-14`}>
          <Input disabled={loading} onFocus={() => setErrorMessage(``)} invalid={!!errorMessage} name={`email`}
                 type={`email`}
                 placeholder={`Email`} className={`w-full`} />
          <Input disabled={loading} password onFocus={() => setErrorMessage(``)} invalid={!!errorMessage}
                 name={`password`}
                 type={`password`}
                 placeholder={`Password`} className={`w-full`} />
          <Input disabled={loading} onFocus={() => setErrorMessage(``)} invalid={!!errorMessage}
                 name={`confirmPassword`} type={`password`}
                 placeholder={`Confirm Password`} className={`w-full`} />

          {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
        </DivContainer>
        <DivContainer className={`w-full flex flex-col gap-3`}>
          <Button disabled={loading} className={`w-full disabled:animate-pulse`}>Register</Button>

          <button disabled={loading}
                  className={`cursor-pointer transition-all duration-200 hover:scale-105 disabled:animate-pulse`}
                  onClick={() => setAuthState(`login`)}>
            <TextGreen>Or Login</TextGreen>
          </button>
        </DivContainer>
      </DivContainer>
    </form>
  );
}
