'use client';

import { Alert, Snackbar } from '@mui/material';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

type SnackbarMUISeverity = `success` | `error` | `info`;

type SnackbarMUIType = {
  severity: SnackbarMUISeverity;
  openSnackbar: boolean;
  message: string;
  autoHideDurationInMSecs?: number;
};

export default function
  SnackbarMUI({
                severity,
                openSnackbar,
                message,
                autoHideDurationInMSecs = 5000
              }: SnackbarMUIType) {
  const [open, setOpen] = useState(openSnackbar);
  const [container, setContainer] = useState<HTMLElement | null>(null);

  useEffect(() => {
    // Ensure the container exists in the DOM
    setContainer(document.getElementById('snackbar-container'));
  }, []);

  useEffect(() => {
    setOpen(openSnackbar);
  }, [openSnackbar]);

  // Render only if the container exists
  if (!container) return null;

  return createPortal(
    <Snackbar open={open} autoHideDuration={autoHideDurationInMSecs} onClose={() => setOpen(false)}>
      <Alert
        onClose={() => setOpen(false)}
        severity={severity}
        variant="filled"
        sx={{ width: '100%' }}
      >
        {message}
      </Alert>
    </Snackbar>,
    container
  );
}