// 'use client';

import CircularProgress from '@mui/material/CircularProgress';
import { Tooltip } from '@mui/material';
import DivContainer from '@/components/UI/DivContainer';

type LoadingScreenType = {
  spinnerSize: number;
  hScreen?: boolean;
  // children: ReactNode;
}

export default function LoadingScreen({ spinnerSize, hScreen = true }: LoadingScreenType) {
  const appliedHeight = hScreen ? `h-screen` : ``;
  return (
    <DivContainer className={`${appliedHeight} flex items-center justify-center`}>
      <Tooltip title={`Loading data.. Please wait..`}>
        <CircularProgress size={spinnerSize} className={`text-[#27AE60]`} color="inherit" />
      </Tooltip>
    </DivContainer>
  );
}
