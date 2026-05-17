import { z } from 'zod';

export const FolderCreatedSchema = z.object({
  folderId: z.string(),
  folderName: z.string(),
  teamId: z.string(),
  createdByUserId: z.string(),
});

export const FolderRenamedSchema = z.object({
  folderId: z.string(),
  previousName: z.string(),
  newName: z.string(),
  teamId: z.string(),
  renamedByUserId: z.string(),
});

export const FolderDeletedSchema = z.object({
  folderId: z.string(),
  folderName: z.string(),
  teamId: z.string(),
  deletedByUserId: z.string(),
  listCount: z.number().int(),
});

export const schemas = {
  'Folder Created': FolderCreatedSchema,
  'Folder Renamed': FolderRenamedSchema,
  'Folder Deleted': FolderDeletedSchema,
};
