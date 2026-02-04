import z from 'zod';

export const RegisterRequestSchema = z.object({
  display_name: z.string().min(1).max(200),
  email: z
    .email()
    .max(100)
    .transform((val) => val.toLowerCase().trim()),
  phone: z.string().max(15).optional(),
  password: z.string().min(8, 'Password must be atleast 8 characters').max(100),
  user_type: z.string().min(1).max(50),
});

export type RegisterRequestType = z.infer<typeof RegisterRequestSchema>;
