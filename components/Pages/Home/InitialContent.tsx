'use client';

/*
type ContentType = {
  // children: ReactNode;
}
*/

import DivContainer from '@/components/UI/DivContainer';
import TextNeutral from '@/components/Typography/Text/TextNeutral';
import LinkGray from '@/components/Links/LinkGray';
import { LINKS } from '@/utils/links/links';

export default function InitialContent(/*{}: ContentType*/) {
  const { myLinkedin, neuroTrackURL, figmaDesignURL } = LINKS;
  return (
    <DivContainer className={`flex items-center justify-center h-screen`}>
      <TextNeutral>This app was built by <LinkGray href={myLinkedin}>Nikolas
        Tuz</LinkGray> as tech task from <LinkGray href={neuroTrackURL}>Neuro Track.</LinkGray>
        The design I <span className={`text-neutral-300 line-through`}>stole</span>
       &nbsp;appropriated from <LinkGray href={figmaDesignURL}>Figma Templates.</LinkGray></TextNeutral>
    </DivContainer>
  );
}
