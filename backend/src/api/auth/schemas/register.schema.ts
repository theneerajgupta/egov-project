import z from 'zod';

export const RegisterRequestSchema = z.object({
  name: z.string().min(1).max(200),
  email: z
    .email()
    .max(100)
    .transform((val) => val.toLowerCase().trim()),
  phone: z.string().max(15).optional(),
  user_type: z.string().max(20),
  password: z.string().max(32),
});

export type RegisterRequestType = z.infer<typeof RegisterRequestSchema>;
