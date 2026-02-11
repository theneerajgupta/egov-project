import z from 'zod';

export const AuthSchema = z.object({
  id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  secret_hash: z.string().min(1).max(255),
  created_at: z.date(),
  updated_at: z.date(),
});

export type AuthType = z.infer<typeof AuthSchema>;
