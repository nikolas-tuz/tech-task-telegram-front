import { z } from 'zod';

export const loginSchema = z.object({
  email: z.string({ message: `Please enter a valid email!` }).email(`Please enter a valid email!`).nonempty(),
  password: z.string({ message: `Please enter valid password!` }).nonempty(`Password should not be empty.`)
});