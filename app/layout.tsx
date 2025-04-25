import type { Metadata } from 'next';
import './globals.css';

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
    {children}
    </body>
    </html>
  );
}
