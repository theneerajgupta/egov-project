import { z } from 'zod';

export const UserStatusEnum = z.enum(['ACTIVE', 'DISABLED', 'DELETED']);

export const UserSchema = z.object({
  id: z.number().int().positive(),
  user_type_id: z.number().int().positive(),
  email: z.string().email().max(100),
  phone: z.string().max(15).nullable(),
  display_name: z.string().min(1).max(200),
  status: UserStatusEnum,
  created_at: z.date(),
  updated_at: z.date(),
});

export type UserSchemaType = z.infer<typeof UserSchema>;
