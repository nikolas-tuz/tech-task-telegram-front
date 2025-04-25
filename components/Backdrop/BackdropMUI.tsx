'use client';

import * as React from 'react';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import { createPortal } from 'react-dom';

type BackdropMUIType = {
  openState: { state: boolean; setState: Dispatch<SetStateAction<boolean>> };
}


export default function BackdropMUI({ openState: { state, setState } }: BackdropMUIType) {
  const [container, setContainer] = useState<HTMLElement>();
  const handleClose = () => {
    setState(false);
  };

  useEffect(() => {
    setContainer(document.getElementById(`backdrop-container`)!);
  }, []);

  if (!container) {
    return;
  }

  return createPortal(
    <Backdrop
      sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })}
      open={state}
      onClick={handleClose}
    >
      <CircularProgress color="inherit" />
    </Backdrop>, container
  );
}