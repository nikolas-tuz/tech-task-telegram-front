import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import axios from 'axios';
import { getAccessToken } from '@/utils/auth/getAccessToken';
import { getTelegramSession } from '@/utils/auth/telegramSession/getTelegramSession';

export type DataType = {
  message: string;
  chats: { name: string; id: number, lastMessage: { text: string; media: boolean }; }[]
}

export type useGetTelegramChatsType = {
  data: DataType | null;
  loading: boolean;
  error: string | null;
  telegramConnected: boolean;
  setTelegramConnected: Dispatch<SetStateAction<boolean>>;
};

export function useGetTelegramChats(
  limit: number
): useGetTelegramChatsType {
  const telegramSession = getTelegramSession(),
    [data, setData] = useState<DataType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [telegramConnected, setTelegramConnected] = useState<boolean>(false);


  useEffect(() => {
    if (!telegramSession) {
      setTelegramConnected(false);
      setLoading(false);
      return;
    }

    const fetchTelegramChats = async () => {
      // Get the access token
      const token = getAccessToken();
      if (!token) {
        throw new Error('Access token is missing');
      }
      try {
        setLoading(true);
        const response = await axios.get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/telegram/chats?limit=${limit}`, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          }
        ).then(res => res.data);

        setData(response as DataType);
        setError(null);
        setTelegramConnected(true);
      } catch (err) {
        setError('Failed to fetch Telegram chats.');
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTelegramChats();
  }, [telegramSession, limit, telegramConnected]);

  return { data, loading, error, telegramConnected, setTelegramConnected };
}