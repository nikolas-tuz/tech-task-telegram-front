import type { Metadata } from 'next';
import './globals.css';
import DivContainer from '@/components/UI/DivContainer';

export const metadata: Metadata = {
  title: 'Tech Task for Neuro Track: Telegram Chats',
  description: 'This app was built by Nikolas Tuz as tech task from Neuro Track.The design I appropriated from Figma Templates.'
};

export default function RootLayout({
                                     children
                                   }: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
    <body
      className={`antialiased container m-auto`}
    >
    <DivContainer id={`snackbar-container`}></DivContainer>
    {children}
    </body>
    </html>
  );
}
