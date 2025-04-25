'use client';

import UserImg from '@/public/stab-imgs/dummy-user.png';
import ImageMessage from '@/public/stab-imgs/img-message.png';

/*
type ChatsPageType = {
  // children: ReactNode;
}
*/
import Navigation from '@/components/Pages/Home/Navigation';
import DivContainer from '@/components/UI/DivContainer';
import ConnectToTelegram from '@/components/Layouts/Dashboard/Auth/ConnectToTelegram';
import ChatsMessagesContainer from '@/components/Pages/Chats/ChatsMessagesContainer';
import { useState } from 'react';
import Chats from '@/components/Layouts/Dashboard/Chats/Chats';
import { logOut } from '@/utils/auth/logOut';

export type TelegramChatsDataType = {
  message: string;
  role: `me` | `participant`
  time: string;
  img?: {
    src: string;
  };
};

export type ChatType = {
  id: number;
  name: string;
  messages: TelegramChatsDataType[];
};

const dummyChatData: ChatType[] = [
  {
    id: 1,
    name: `John Doe`,
    messages: [
      {
        message: `Hello! Have you seen my backpack anywhere in office?`,
        role: `me`,
        time: `14:45`,
        img: undefined
      },
      {
        message: `Not really, maybe check the lounge area?`,
        time: `14:46`,
        role: `participant`,
        img: { src: ImageMessage.src }
      },
      {
        message: `Okay, will do! Thanks!`,
        time: `14:47`,
        role: `me`,
        img: undefined
      }
    ]
  },
  {
    id: 2,
    name: `Jane Doe`,
    messages: [
      {
        message: `Are we still on for the 3 PM meeting?`,
        role: `me`,
        time: `12:30`,
        img: undefined
      },
      {
        message: `Yep! Meet you in the conference room.`,
        role: `participant`,
        time: `12:31`,
        img: undefined
      }
    ]
  },
  {
    id: 3,
    name: `Bob Doe`,
    messages: [
      {
        message: `Happy Birthday! 🎉 Hope you have a great day!`,
        role: `participant`,
        time: `09:00`,
        img: undefined
      },
      {
        message: `Thanks a lot! 😊`,
        role: `me`,
        time: `09:05`,
        img: undefined
      }
    ]
  },
  {
    id: 4,
    name: `Joe Doe`,
    messages: [
      {
        message: `Can you send me the report from yesterday?`,
        role: `participant`,
        time: `10:12`,
        img: undefined
      },
      {
        message: `Sure! Give me a sec.`,
        role: `me`,
        time: `10:13`,
        img: undefined
      },
      {
        message: `Here it is.`,
        role: `me`,
        time: `10:15`,
        img: { src: ImageMessage.src }
      }
    ]
  },
  {
    id: 5,
    name: `Lacy Doe`,
    messages: [
      {
        message: `Let’s grab lunch today?`,
        role: `me`,
        time: `11:50`,
        img: undefined
      },
      {
        message: `Sounds good. 12:30?`,
        role: `participant`,
        time: `11:51`,
        img: undefined
      },
      {
        message: `Perfect.`,
        role: `me`,
        time: `11:52`,
        img: undefined
      }
    ]
  },
  {
    id: 6,
    name: `Conor Doe`,
    messages: [
      {
        message: `Did you watch the game last night? Crazy ending!`,
        role: `participant`,
        time: `08:20`,
        img: undefined
      },
      {
        message: `Absolutely! I couldn’t believe that last goal!`,
        role: `me`,
        time: `08:22`,
        img: undefined
      }
    ]
  },
  {
    id: 7,
    name: `Nancy Doe`,
    messages: [
      {
        message: `Here's the design draft for the new feature.`,
        role: `me`,
        time: `16:10`,
        img: { src: ImageMessage.src }
      },
      {
        message: `Looks clean. Let's discuss it tomorrow.`,
        role: `participant`,
        time: `16:12`,
        img: undefined
      }
    ]
  }
];

export default function ChatsPage(/*{}: ChatsPageType*/) {
  // allow unused vars in eslint
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [telegramData, setTelegramData] = useState<ChatType[] | undefined>(dummyChatData);
  const [telegramConnected, setTelegramConnected] = useState(false);
  const [activeChat, setActiveChat] = useState<ChatType>();

  function handleOnSelectChat(id: number) {
    setActiveChat(dummyChatData.find((chat) => chat.id === id));
  }

  function onTelegramConnect() {
    setTelegramConnected(true);
  }

  return (
    <>
      <main className={`main-grid-container pt-7 px-8`}>
        <Navigation
          logoutFromApp={{
            active: true, function: () => logOut()
          }}
          logoutFromTelegram={{
            active: true, function: () => {
              setTelegramConnected(false);
            }
          }}
          userImage={UserImg.src} />
        {!telegramConnected ?
          <DivContainer className={`pl-5 h-screen flex items-center justify-center`}>
            <ConnectToTelegram onTelegramConnect={onTelegramConnect} />
          </DivContainer> : (
            <>
              <Chats activeChatId={activeChat?.id} onSelectChat={handleOnSelectChat} chats={telegramData} />
            </>
          )
        }
        <ChatsMessagesContainer chat={activeChat} />
      </main>
    </>
  );
}
