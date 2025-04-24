export type TelegramUserType = {
  id: number; // Unique Telegram user ID
  first_name: string;
  last_name?: string; // Optional
  username?: string; // Optional
  photo_url?: string; // Optional profile photo URL
  auth_date: number; // Unix timestamp of auth time
  hash: string; // Signature for verification
};
