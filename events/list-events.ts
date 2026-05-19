import { z } from 'zod';

export const ListCreatedSchema = z.object({
  listId: z.string(),
  listName: z.string(),
  folderId: z.string(),
  teamId: z.string(),
  createdByUserId: z.string(),
});

export const ListRenamedSchema = z.object({
  listId: z.string(),
  previousName: z.string(),
  newName: z.string(),
  folderId: z.string(),
  teamId: z.string(),
  renamedByUserId: z.string(),
});

export const ListDeletedSchema = z.object({
  listId: z.string(),
  listName: z.string(),
  folderId: z.string(),
  teamId: z.string(),
  deletedByUserId: z.string(),
  taskCount: z.number().int(),
});

export const schemas = {
  'List Created': ListCreatedSchema,
  'List Renamed': ListRenamedSchema,
  'List Deleted': ListDeletedSchema,
};
