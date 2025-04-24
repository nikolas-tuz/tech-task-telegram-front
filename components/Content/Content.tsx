'use client';

/*
type ContentType = {
  // children: ReactNode;
}
*/

import DivContainer from '@/components/UI/DivContainer';
import { useState } from 'react';
import { AuthStateType } from '@/components/Dashboard/Dashboard';
import TextNeutral from '@/components/Typography/Text/TextNeutral';

export default function Content(/*{}: ContentType*/) {
  const [authState, setAuthState] = useState<AuthStateType>(`login`);
  const [showMessages, setShowMessages] = useState(false);
  return (
    <DivContainer className={``}>
      {(authState === `login` || authState === `register`) &&
        <DivContainer className={`flex items-center justify-center h-screen`}>
          <TextNeutral>This app was built by Nikolas Tuz as tech task from Neuro Track.
            The design I stole appropriated from Figma Templates.</TextNeutral>
        </DivContainer>
      }
      {(authState === `telegram` && !showMessages) &&
        <DivContainer className={`flex items-center justify-center h-screen`}>
          <TextNeutral>Click to any chat to see the messages （〃｀ 3′〃）!</TextNeutral>
        </DivContainer>
      }
    </DivContainer>
  );
}
