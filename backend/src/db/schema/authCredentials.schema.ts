import z from 'zod';

export const AuthCredentialsSchema = z.object({
  id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  secret_hash: z.string().min(1).max(255),
  created_at: z.date(),
  updated_at: z.date(),
});

export type AuthCredentialsType = z.infer<typeof AuthCredentialsSchema>;
