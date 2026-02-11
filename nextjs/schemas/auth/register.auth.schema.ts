import z from 'zod';

export const AuthRegisterSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.email(),
  phone: z.string().max(15).optional(),
  password: z.string().min(8),
  user_type: z.string().min(1),
});

export type AuthRegisterInput = z.infer<typeof AuthRegisterSchema>;
