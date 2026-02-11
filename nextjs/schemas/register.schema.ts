import z from 'zod';

export const RegisterSchema = z.object({
  name: z.string().min(1).max(200),
  email: z.email(),
  phone: z.string().max(15).optional(),
  password: z.string().min(8),
  user_type: z.string().min(1),
});

export type RegisterInput = z.infer<typeof RegisterSchema>;
