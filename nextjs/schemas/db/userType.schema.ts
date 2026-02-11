import z from 'zod';

export const UserTypeSchema = z.object({
  id: z.number().int().positive(),
  code: z.string().min(1).max(20),
  name: z.string().min(1).max(255),
});

export type UserType = z.infer<typeof UserTypeSchema>;
