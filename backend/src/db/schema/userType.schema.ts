import z from 'zod';

export const UserTypeSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1).max(20),
  description: z.string().max(255).nullable(),
});

export type UserType = z.infer<typeof UserTypeSchema>;
