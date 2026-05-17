import { z } from 'zod';

export const UserSignedUpSchema = z.object({
  email: z.string().email(),
  method: z.enum(['email', 'google', 'github']),
  invitedByUserId: z.string().optional(),
});

export const UserSignedInSchema = z.object({
  email: z.string().email(),
  method: z.enum(['email', 'google', 'github']),
});

export const UserSignedOutSchema = z.object({
  userId: z.string(),
});

export const UserProfileUpdatedSchema = z.object({
  userId: z.string(),
  updatedFields: z.array(z.string()),
});

export const schemas = {
  'User Signed Up': UserSignedUpSchema,
  'User Signed In': UserSignedInSchema,
  'User Signed Out': UserSignedOutSchema,
  'User Profile Updated': UserProfileUpdatedSchema,
};
