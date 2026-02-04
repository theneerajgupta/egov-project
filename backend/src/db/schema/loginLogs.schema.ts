import { z } from 'zod';

export const LoginLogsSchema = z.object({
  id: z.number().int().positive(),
  user_id: z.number().int().positive().nullable(),
  ip_address: z.string().min(1).max(40),
  attempted_email: z.string().min(1).max(100),
  success: z.boolean(),
  failure_reason: z.string().max(2000).nullable(),
  created_at: z.date(),
});

export type LoginLogsType = z.infer<typeof LoginLogsSchema>;
