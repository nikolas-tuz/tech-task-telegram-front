// 'use client';

import { ComponentPropsWithoutRef } from 'react';
import DivContainer from '@/components/UI/DivContainer';
import CircularProgress from '@mui/material/CircularProgress';
import { Tooltip } from '@mui/material';

type LoadingSkeletonType = {
  tooltip?: string;
  // children: ReactNode;
} & ComponentPropsWithoutRef<'div'>;

export default function LoadingSkeleton({ tooltip = `Loading data.. Please wait..`, ...props }: LoadingSkeletonType) {
  return (
    <>
      <Tooltip title={tooltip}>
        <DivContainer {...props}>
          <CircularProgress
            size={30} className={`text-neutral-100`} color="inherit" />
        </DivContainer>
      </Tooltip>
    </>
  );
}
