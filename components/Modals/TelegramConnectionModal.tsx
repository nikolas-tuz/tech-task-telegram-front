'use client';
import { makeStyles } from '@mui/styles';
import { Dialog } from '@mui/material';
import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import TextNeutral from '@/components/Typography/Text/TextNeutral';
import DivContainer from '@/components/UI/DivContainer';
import Input from '@/components/Inputs/Input';
import ErrorMessage from '@/components/Layouts/Info/ErrorMessage';
import Button from '@/components/Buttons/Button';
import SmallBadge from '@/components/Badges/SmallBadge';
import { getAccessToken } from '@/utils/auth/getAccessToken';
import { ErrorResponseType } from '@/utils/types/errorResponse.type';
import SnackbarMUI from '@/components/UI/SnackbarMUI';
import { phoneNumberSchema } from '@/utils/schemas/send-code.schema';
import { setTelegramSession } from '@/utils/auth/telegramSession/setTelegramSession';
import axios from 'axios';
import LoadingSkeleton from '@/components/UI/LoadingSkeleton';

type TelegramConnectionModalType = {
  modalState: { open: boolean; setOpen: Dispatch<SetStateAction<boolean>>; }
  setTelegramConnected: Dispatch<SetStateAction<boolean>>;
  // children: ReactNode;
}


const useStyles = makeStyles({
  backdrop: {
    backdropFilter: 'blur(3px)'
  }
});

type SavedDataType = {
  phoneNumber: string;
  phoneCodeHash: string;
}

type SendCodeResponseType = {
  message: string;
  status: string,
  phone_code_hash: string;
};

type VerifyResponseType = {
  message: string;
  telegram_session: string;
  status: string;
};

export default function TelegramConnectionModal({ modalState, setTelegramConnected }: TelegramConnectionModalType) {
  const [savedData, setSavedData] = useState<SavedDataType>();
  const [stepSelected, setStepSelected] = useState<1 | 2>(1);
  const [errorMessage, setErrorMessage] = useState(``);
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  const classes = useStyles();
  const { setOpen, open } = modalState;
  const handleClose = () => {
    setOpen(() => false);
  };

  async function handleSendCodeSubmission(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as { phoneNumber: string };

    const validatePhoneNumber = phoneNumberSchema.safeParse(results?.phoneNumber?.trim());

    if (!validatePhoneNumber.success) {
      setErrorMessage(validatePhoneNumber.error.errors[0].message || `Please enter international phone number(e.g. +380..)`);
      return;
    }
    setLoading(true);

    try {
      const sendingCodeRes = await
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/telegram/authenticate/send-code`, {
          phone_number: results.phoneNumber.trim()
        }, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`
          }
        }).then(res => res.data as SendCodeResponseType);

      if (sendingCodeRes?.phone_code_hash) {
        setSavedData({
          phoneNumber: results.phoneNumber.trim(),
          phoneCodeHash: sendingCodeRes.phone_code_hash
        });
        setStepSelected(2);
      }

    } catch (e) {
      if ((e as ErrorResponseType).response.data.detail.includes(`Failed to send code: Returned when all available options for this type of number were already used`)) {
        setErrorMessage(`You sent too many requests. Please wait til the limit would be annulled. (To reviewer: in this case you need to delete session_name.session file from backend and 
        restart the process.)`);
        return;
      }
      setErrorMessage(`Failed to send code: ${(e as ErrorResponseType).response.data.detail}`);
    } finally {
      setLoading(false);
    }

  }


  async function handleAuthCompletion(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const currObject = e.currentTarget;
    const formData = new FormData(currObject);
    const results = Object.fromEntries(formData.entries()) as { code: string; password?: string };

    if (!savedData) {
      setErrorMessage('The required data is missing. Please start with the first step. Confirm your phone number first.');
      return;
    }
    setLoading(true);

    try {
      const identityVerification = await
        axios.post(`${process.env.NEXT_PUBLIC_BACKEND_URL}/telegram/authenticate/verify`, {
          phone_number: savedData.phoneNumber,
          phone_code_hash: savedData.phoneCodeHash,
          password: results.password || ``,
          code: Number(results.code)
        }, {
          headers: {
            Authorization: `Bearer ${getAccessToken()}`
          }
        }).then(res => res.data as VerifyResponseType);

      if (identityVerification?.status === `success`) {
        setTelegramSession(identityVerification.telegram_session);
        setOpen(false);
        setSuccess(true);
        setTelegramConnected(true);
      } else {
        setErrorMessage(`Failed to verify user. Please start again.`);
      }
    } catch (e) {
      setErrorMessage(`Failed to verify user: ${(e as ErrorResponseType).response.data.detail}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <SnackbarMUI openSnackbar={success} anchorPosition={{ horizontal: `center`, vertical: `bottom` }}
                   severity={`success`}
                   message={`Telegram Authentication is successful! Huzzah!`} />
      <Dialog
        BackdropProps={{
          classes: {
            root: classes.backdrop
          }
        }}
        maxWidth={`md`} onClose={handleClose} open={open}>
        <div className={`py-9 px-8`}>
          <TextNeutral className={`mb-4 flex items-center gap-2`}>
            <SmallBadge onClick={() => setStepSelected(1)} mode={`green`}>Enter Phone Number</SmallBadge>
            <SmallBadge onClick={() => setStepSelected(2)} mode={`red`}>Confirm by Code</SmallBadge>
          </TextNeutral>

          {stepSelected === 1 && <form onSubmit={handleSendCodeSubmission}>
            <DivContainer className={`w-full flex flex-col gap-3 mb-14`}>
              <DivContainer>
                <Input disabled={loading} onFocus={() => setErrorMessage(``)} invalid={!!errorMessage}
                       name={`phoneNumber`} type={`tel`}
                       placeholder={`Phone Number`} className={`w-full disabled:animate-pulse`} />
              </DivContainer>
              <TextNeutral>Enter the phone number used by Telegram to connect to.</TextNeutral>
              <TextNeutral className={`text-sm text-neutral-500`}>
                You will receive a code on your Telegram account to verify your identity.
              </TextNeutral>
              {errorMessage && <ErrorMessage className={`max-w-xl`}>{errorMessage}</ErrorMessage>}
            </DivContainer>
            <DivContainer className={`w-full flex flex-col gap-3`}>

              <Button disabled={loading} className={`w-full min-h-[77px]`}>
                {!loading && <>Send</>}
                {loading && <> <LoadingSkeleton /></>}
              </Button>

            </DivContainer>
          </form>}

          {stepSelected === 2 && <form onSubmit={handleAuthCompletion}>
            <DivContainer className={`w-full flex flex-col gap-3 mb-14`}>
              <Input disabled={loading} onFocus={() => setErrorMessage(``)} invalid={!!errorMessage} name={`code`}
                     type={`number`}
                     placeholder={`Code`} className={`w-full disabled:animate-pulse`} />
              <Input disabled={loading} required={false} password onFocus={() => setErrorMessage(``)}
                     invalid={!!errorMessage}
                     name={`password`}
                     type={`password`}
                     placeholder={`2FA Password (Optional if not set)`} className={`w-full disabled:animate-pulse`} />
              <TextNeutral className={`max-w-lg`}>Please confirm your identity by specifying the code sent to your
                Telegram
                Account.</TextNeutral>
              <TextNeutral className={`text-sm text-neutral-500 max-w-lg`}>
                If you have 2FA enabled, please enter your password in a corresponding field. Without it
                the authentication fails.
              </TextNeutral>
              {errorMessage && <ErrorMessage className={`max-w-xl`}>{errorMessage}</ErrorMessage>}
            </DivContainer>
            <DivContainer className={`w-full flex flex-col gap-3`}>
              <Button disabled={loading} className={`w-full min-h-[77px]`}>
                {!loading && <>Confirm Authentication</>}
                {loading && <> <LoadingSkeleton /></>}
              </Button>
            </DivContainer>
          </form>
          }
        </div>
      </Dialog>
    </>
  );
}
