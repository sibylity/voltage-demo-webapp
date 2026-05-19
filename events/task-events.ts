import { z } from 'zod';

export const TaskCreatedSchema = z.object({
  taskId: z.string(),
  taskTitle: z.string(),
  listId: z.string(),
  folderId: z.string(),
  teamId: z.string(),
  createdByUserId: z.string(),
  assigneeId: z.string().optional(),
  priority: z.enum(['low', 'medium', 'high']).optional(),
  dueDate: z.string().optional(),
});

export const TaskUpdatedSchema = z.object({
  taskId: z.string(),
  taskTitle: z.string(),
  listId: z.string(),
  folderId: z.string(),
  teamId: z.string(),
  updatedByUserId: z.string(),
  updatedFields: z.array(z.string()),
});

export const TaskCompletedSchema = z.object({
  taskId: z.string(),
  taskTitle: z.string(),
  listId: z.string(),
  folderId: z.string(),
  teamId: z.string(),
  completedByUserId: z.string(),
  timeToCompleteMs: z.number().optional(),
  wasOverdue: z.boolean().optional(),
});

export const TaskReopenedSchema = z.object({
  taskId: z.string(),
  taskTitle: z.string(),
  listId: z.string(),
  folderId: z.string(),
  teamId: z.string(),
  reopenedByUserId: z.string(),
});

export const TaskDeletedSchema = z.object({
  taskId: z.string(),
  taskTitle: z.string(),
  listId: z.string(),
  folderId: z.string(),
  teamId: z.string(),
  deletedByUserId: z.string(),
});

export const TaskAssignedSchema = z.object({
  taskId: z.string(),
  taskTitle: z.string(),
  listId: z.string(),
  folderId: z.string(),
  teamId: z.string(),
  assignedByUserId: z.string(),
  assigneeId: z.string(),
  previousAssigneeId: z.string().optional(),
});

export const TaskListFilteredSchema = z.object({
  listId: z.string(),
  folderId: z.string(),
  teamId: z.string(),
  filterType: z.enum(['status', 'priority', 'assignee']),
  filterValue: z.string(),
  resultCount: z.number().int(),
});

export const schemas = {
  'Task Created': TaskCreatedSchema,
  'Task Updated': TaskUpdatedSchema,
  'Task Completed': TaskCompletedSchema,
  'Task Reopened': TaskReopenedSchema,
  'Task Deleted': TaskDeletedSchema,
  'Task Assigned': TaskAssignedSchema,
  'Task List Filtered': TaskListFilteredSchema,
};
