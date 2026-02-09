import z from 'zod';

export const RegisterReqSchema = z.object({
  name: z.string().min(1).max(200),
  email: z
    .email()
    .max(100)
    .transform((val) => val.toLowerCase().trim()),
  phone: z.string().max(15).optional(),
  user_type: z.string().max(20),
  password: z
    .string()
    .min(8, 'Password must be alteast 8 characters')
    .max(32)
    .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/\d/, 'Password must contain at least one digit')
    .regex(
      /[!@#$%^&*(),.?":{}|<>_\-\\[\]\/~`+=;]/,
      'Password must contain at least one special character',
    ),
});

export type RegisterReqType = z.infer<typeof RegisterReqSchema>;
