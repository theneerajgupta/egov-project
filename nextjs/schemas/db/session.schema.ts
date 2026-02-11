import { z } from 'zod';

export const SessionSchema = z.object({
  id: z.number().int().positive(),
  user_id: z.number().int().positive(),
  token_hash: z.string().min(1).max(260),
  expires_at: z.date(),
  revoked_at: z.date().nullable(),
  created_at: z.date(),
});

export type SessionType = z.infer<typeof SessionSchema>;
