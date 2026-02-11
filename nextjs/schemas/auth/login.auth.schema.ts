import z from 'zod';

export const AuthLoginSchema = z.object({
  email: z.email(),
  password: z.string().min(8),
});

export type AuthLoginSchema = z.infer<typeof AuthLoginSchema>;
