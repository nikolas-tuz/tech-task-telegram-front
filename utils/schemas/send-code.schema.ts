import { z } from 'zod';
import { parsePhoneNumberFromString } from 'libphonenumber-js';

export const phoneNumberSchema = z.string().refine((value) => {
  const phoneNumber = parsePhoneNumberFromString(value);
  return phoneNumber?.isValid();
}, {
  message: 'Invalid number. Please enter a valid international phone number. e.g. +380..'
});