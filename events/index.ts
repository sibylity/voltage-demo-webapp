import * as UserEvents from './user-events';
import * as TeamEvents from './team-events';
import * as FolderEvents from './folder-events';
import * as ListEvents from './list-events';
import * as TaskEvents from './task-events';

// Re-export individual schemas (excluding the `schemas` barrel object to avoid name collisions).
export {
  UserSignedUpSchema,
  UserSignedInSchema,
  UserSignedOutSchema,
  UserProfileUpdatedSchema,
} from './user-events';

export {
  TeamCreatedSchema,
  TeamMemberInvitedSchema,
  TeamMemberJoinedSchema,
  TeamMemberRemovedSchema,
  TeamMemberRoleChangedSchema,
} from './team-events';

export {
  FolderCreatedSchema,
  FolderRenamedSchema,
  FolderDeletedSchema,
} from './folder-events';

export {
  ListCreatedSchema,
  ListRenamedSchema,
  ListDeletedSchema,
} from './list-events';

export {
  TaskCreatedSchema,
  TaskUpdatedSchema,
  TaskCompletedSchema,
  TaskReopenedSchema,
  TaskDeletedSchema,
  TaskAssignedSchema,
  TaskListFilteredSchema,
} from './task-events';

// Central registry: maps event name → Zod schema
export const EventSchemas = {
  ...UserEvents.schemas,
  ...TeamEvents.schemas,
  ...FolderEvents.schemas,
  ...ListEvents.schemas,
  ...TaskEvents.schemas,
} as const;

export type EventName = keyof typeof EventSchemas;
