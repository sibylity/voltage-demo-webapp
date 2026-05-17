'use client';

import type { TaskPriority, TaskStatus, Role } from '@/lib/mock-data';

// ─── Priority Badge ────────────────────────────────────────────────────────────

const priorityStyles: Record<TaskPriority, string> = {
  low: 'bg-zinc-100 text-zinc-600',
  medium: 'bg-amber-100 text-amber-700',
  high: 'bg-red-100 text-red-700',
};

const priorityLabels: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
};

export function PriorityBadge({ priority }: { priority: TaskPriority }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${priorityStyles[priority]}`}
    >
      {priorityLabels[priority]}
    </span>
  );
}

// ─── Status Badge ──────────────────────────────────────────────────────────────

const statusStyles: Record<TaskStatus, string> = {
  todo: 'bg-zinc-100 text-zinc-600',
  in_progress: 'bg-blue-100 text-blue-700',
  done: 'bg-green-100 text-green-700',
};

const statusLabels: Record<TaskStatus, string> = {
  todo: 'To Do',
  in_progress: 'In Progress',
  done: 'Done',
};

export function StatusBadge({ status }: { status: TaskStatus }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${statusStyles[status]}`}
    >
      {statusLabels[status]}
    </span>
  );
}

// ─── Role Badge ────────────────────────────────────────────────────────────────

const roleStyles: Record<Role, string> = {
  admin: 'bg-indigo-100 text-indigo-700',
  editor: 'bg-zinc-100 text-zinc-600',
};

const roleLabels: Record<Role, string> = {
  admin: 'Admin',
  editor: 'Editor',
};

export function RoleBadge({ role }: { role: Role }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${roleStyles[role]}`}
    >
      {roleLabels[role]}
    </span>
  );
}

// ─── Plan Badge ────────────────────────────────────────────────────────────────

const planStyles: Record<string, string> = {
  free: 'bg-zinc-100 text-zinc-600',
  pro: 'bg-indigo-100 text-indigo-700',
  enterprise: 'bg-violet-100 text-violet-700',
};

export function PlanBadge({ plan }: { plan: string }) {
  return (
    <span
      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-semibold uppercase tracking-wide ${planStyles[plan] ?? 'bg-zinc-100 text-zinc-600'}`}
    >
      {plan}
    </span>
  );
}
