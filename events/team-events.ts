import { z } from 'zod';

export const TeamCreatedSchema = z.object({
  teamId: z.string(),
  teamName: z.string(),
  plan: z.enum(['free', 'pro', 'enterprise']),
  createdByUserId: z.string(),
});

export const TeamMemberInvitedSchema = z.object({
  teamId: z.string(),
  invitedByUserId: z.string(),
  inviteeEmail: z.string().email(),
  role: z.enum(['admin', 'editor']),
});

export const TeamMemberJoinedSchema = z.object({
  teamId: z.string(),
  userId: z.string(),
  joinedVia: z.enum(['invite', 'link']),
  role: z.enum(['admin', 'editor']),
});

export const TeamMemberRemovedSchema = z.object({
  teamId: z.string(),
  removedUserId: z.string(),
  removedByUserId: z.string(),
});

export const TeamMemberRoleChangedSchema = z.object({
  teamId: z.string(),
  targetUserId: z.string(),
  changedByUserId: z.string(),
  previousRole: z.enum(['admin', 'editor']),
  newRole: z.enum(['admin', 'editor']),
});

export const schemas = {
  'Team Created': TeamCreatedSchema,
  'Team Member Invited': TeamMemberInvitedSchema,
  'Team Member Joined': TeamMemberJoinedSchema,
  'Team Member Removed': TeamMemberRemovedSchema,
  'Team Member Role Changed': TeamMemberRoleChangedSchema,
};
