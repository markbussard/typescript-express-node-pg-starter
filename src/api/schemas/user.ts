import { z } from 'zod';

export const createUserSchema = z.object({
  body: z.object({
    id: z.string({
      required_error: 'id is required'
    }),
    firstName: z
      .string({
        required_error: 'firstName is required'
      })
      .max(100, 'firstName is too long'),
    lastName: z
      .string({
        required_error: 'lastName is required'
      })
      .max(100, 'lastName is too long'),
    email: z
      .string({
        required_error: 'email is required'
      })
      .email('Invalid email')
      .max(100, 'email is too long')
  })
});
