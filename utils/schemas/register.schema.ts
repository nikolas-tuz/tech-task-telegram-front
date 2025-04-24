import { z } from 'zod';

export const registerSchema = z.object({
  email: z.string({ message: `Please enter a valid email!` }).trim().email(`Please enter a valid email!`).nonempty(),
  password: z.string({ message: `Please enter valid password!` }).trim().min(5).max(3000),
  confirmPassword: z.string({ message: `Please enter valid password!` }).trim().nonempty(`Confirm Password should not be empty.`)
}).refine(({ password, confirmPassword }) => {
  return password.length >= 5 && password === confirmPassword;
});
