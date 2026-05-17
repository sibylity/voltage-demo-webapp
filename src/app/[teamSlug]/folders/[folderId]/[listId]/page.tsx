'use client';

import { use, useEffect, useState, useMemo } from 'react';
import Link from 'next/link';
import { ArrowLeft, Plus, Check, Pencil, Trash2, X } from 'lucide-react';
import { tracker } from '@/lib/tracker';
import {
  team,
  currentUser,
  members,
  getFolderById,
  getListById,
  getTasksByListId,
  getMemberById,
  type Task,
  type TaskStatus,
  type TaskPriority,
} from '@/lib/mock-data';
import { Header } from '@/components/layout/Header';
import { PriorityBadge, StatusBadge } from '@/components/ui/Badge';
import { Avatar } from '@/components/ui/Avatar';

interface TaskListPageProps {
  params: Promise<{ teamSlug: string; folderId: string; listId: string }>;
}

type StatusFilter = 'all' | TaskStatus;
type PriorityFilter = 'all' | TaskPriority;

export default function TaskListPage({ params }: TaskListPageProps) {
  const { teamSlug, folderId, listId } = use(params);

  const folder = getFolderById(folderId);
  const list = getListById(listId);
  const initialTasks = getTasksByListId(listId);

  // Local task state to allow optimistic checkbox toggles.
  const [taskStates, setTaskStates] = useState<Record<string, TaskStatus>>(() =>
    Object.fromEntries(initialTasks.map((t) => [t.id, t.status])),
  );

  // Filters
  const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
  const [priorityFilter, setPriorityFilter] = useState<PriorityFilter>('all');
  const [assigneeFilter, setAssigneeFilter] = useState<string>('all');

  // Inline task creation
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [isAddingTask, setIsAddingTask] = useState(false);

  // Edit / delete
  const [editingTaskId, setEditingTaskId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const [deletedTaskIds, setDeletedTaskIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    tracker.page('Task List', { teamSlug, teamId: team.id, folderId, listId });
  }, [teamSlug, folderId, listId]);

  const filteredTasks = useMemo(() => {
    return initialTasks.filter((task) => {
      if (deletedTaskIds.has(task.id)) return false;
      const effectiveStatus = taskStates[task.id] ?? task.status;
      if (statusFilter !== 'all' && effectiveStatus !== statusFilter) return false;
      if (priorityFilter !== 'all' && task.priority !== priorityFilter) return false;
      if (assigneeFilter !== 'all' && task.assigneeId !== assigneeFilter) return false;
      return true;
    });
  }, [initialTasks, taskStates, statusFilter, priorityFilter, assigneeFilter, deletedTaskIds]);

  function handleToggleTask(task: Task) {
    const currentStatus = taskStates[task.id] ?? task.status;
    const newStatus: TaskStatus = currentStatus === 'done' ? 'todo' : 'done';

    // Optimistic update
    setTaskStates((prev) => ({ ...prev, [task.id]: newStatus }));

    if (newStatus === 'done') {
      tracker.track('Task Completed', {
        taskId: task.id,
        taskTitle: task.title,
        listId: task.listId,
        folderId: task.folderId,
        teamId: task.teamId,
        completedByUserId: currentUser.id,
      });
    } else {
      tracker.track('Task Reopened', {
        taskId: task.id,
        taskTitle: task.title,
        listId: task.listId,
        folderId: task.folderId,
        teamId: task.teamId,
        reopenedByUserId: currentUser.id,
      });
    }

    // Demo: in a real app this would PATCH /api/tasks/:id with { status: newStatus }.
    console.debug('[task-list] toggle task status (demo only):', task.id, newStatus);
  }

  function handleAddTask(e: React.FormEvent) {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;

    const taskId = `task_${Date.now()}`;
    tracker.track('Task Created', {
      taskId,
      taskTitle: newTaskTitle.trim(),
      listId,
      folderId,
      teamId: team.id,
      createdByUserId: currentUser.id,
    });

    // Demo: in a real app this would POST to /api/tasks to persist the new task.
    // See the tracker call above for the event schema and properties.
    console.debug('[task-list] create task (demo only):', newTaskTitle.trim());
    setNewTaskTitle('');
    setIsAddingTask(false);
  }

  function handleStartEdit(task: Task) {
    setEditingTaskId(task.id);
    setEditingTitle(task.title);
  }

  function handleSaveEdit(task: Task) {
    const trimmed = editingTitle.trim();
    if (!trimmed || trimmed === task.title) {
      setEditingTaskId(null);
      return;
    }
    tracker.track('Task Updated', {
      taskId: task.id,
      taskTitle: trimmed,
      listId: task.listId,
      folderId: task.folderId,
      teamId: task.teamId,
      updatedByUserId: currentUser.id,
      updatedFields: ['title'],
    });
    // Demo: in a real app this would PATCH /api/tasks/:id with { title: trimmed }.
    console.debug('[task-list] update task title (demo only):', task.id, trimmed);
    setEditingTaskId(null);
  }

  function handleDeleteTask(task: Task) {
    setDeletedTaskIds((prev) => new Set(prev).add(task.id));
    tracker.track('Task Deleted', {
      taskId: task.id,
      taskTitle: task.title,
      listId: task.listId,
      folderId: task.folderId,
      teamId: task.teamId,
      deletedByUserId: currentUser.id,
    });
    // Demo: in a real app this would DELETE /api/tasks/:id.
    console.debug('[task-list] delete task (demo only):', task.id);
  }

  if (!folder || !list) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-zinc-500">Task list not found.</p>
      </div>
    );
  }

  const isDone = (task: Task) => (taskStates[task.id] ?? task.status) === 'done';

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <Header
        title={list.name}
        description={`${folder.emoji} ${folder.name}`}
        actions={
          <Link
            href={`/${teamSlug}/folders/${folderId}`}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
          >
            <ArrowLeft className="h-4 w-4" />
            {folder.name}
          </Link>
        }
      />

      {/* Filter bar */}
      <div className="flex items-center gap-2 border-b border-zinc-200 bg-white px-6 py-3">
        <span className="text-xs font-medium text-zinc-500">Filter:</span>

        <select
          value={statusFilter}
          onChange={(e) => {
            const value = e.target.value as StatusFilter;
            setStatusFilter(value);
            const resultCount = initialTasks.filter((t) => {
              const s = taskStates[t.id] ?? t.status;
              if (value !== 'all' && s !== value) return false;
              if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
              if (assigneeFilter !== 'all' && t.assigneeId !== assigneeFilter) return false;
              return true;
            }).length;
            tracker.track('Task List Filtered', {
              listId,
              folderId,
              teamId: team.id,
              filterType: 'status',
              filterValue: value,
              resultCount,
            });
          }}
          className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-700 focus:border-indigo-500 focus:outline-none"
        >
          <option value="all">All statuses</option>
          <option value="todo">To Do</option>
          <option value="in_progress">In Progress</option>
          <option value="done">Done</option>
        </select>

        <select
          value={priorityFilter}
          onChange={(e) => {
            const value = e.target.value as PriorityFilter;
            setPriorityFilter(value);
            const resultCount = initialTasks.filter((t) => {
              const s = taskStates[t.id] ?? t.status;
              if (statusFilter !== 'all' && s !== statusFilter) return false;
              if (value !== 'all' && t.priority !== value) return false;
              if (assigneeFilter !== 'all' && t.assigneeId !== assigneeFilter) return false;
              return true;
            }).length;
            tracker.track('Task List Filtered', {
              listId,
              folderId,
              teamId: team.id,
              filterType: 'priority',
              filterValue: value,
              resultCount,
            });
          }}
          className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-700 focus:border-indigo-500 focus:outline-none"
        >
          <option value="all">All priorities</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>

        <select
          value={assigneeFilter}
          onChange={(e) => {
            const value = e.target.value;
            setAssigneeFilter(value);
            const resultCount = initialTasks.filter((t) => {
              const s = taskStates[t.id] ?? t.status;
              if (statusFilter !== 'all' && s !== statusFilter) return false;
              if (priorityFilter !== 'all' && t.priority !== priorityFilter) return false;
              if (value !== 'all' && t.assigneeId !== value) return false;
              return true;
            }).length;
            tracker.track('Task List Filtered', {
              listId,
              folderId,
              teamId: team.id,
              filterType: 'assignee',
              filterValue: value,
              resultCount,
            });
          }}
          className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-700 focus:border-indigo-500 focus:outline-none"
        >
          <option value="all">All assignees</option>
          {members.map((m) => (
            <option key={m.id} value={m.id}>
              {m.name}
            </option>
          ))}
        </select>

        <span className="ml-auto text-xs text-zinc-400">
          {filteredTasks.length} {filteredTasks.length === 1 ? 'task' : 'tasks'}
        </span>
      </div>

      <div className="flex-1 overflow-auto p-6">
        <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
          {/* Task rows */}
          <ul className="divide-y divide-zinc-100">
            {filteredTasks.map((task) => {
              const done = isDone(task);
              const assignee = task.assigneeId ? getMemberById(task.assigneeId) : undefined;
              const isOverdue =
                !done && task.dueDate && task.dueDate < new Date().toISOString().split('T')[0];

              return (
                <li
                  key={task.id}
                  className="flex items-start gap-3 px-4 py-3.5 transition-colors hover:bg-zinc-50"
                >
                  {/* Checkbox */}
                  <button
                    onClick={() => handleToggleTask(task)}
                    className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded border-2 transition-colors ${
                      done
                        ? 'border-green-500 bg-green-500 text-white'
                        : 'border-zinc-300 hover:border-indigo-400'
                    }`}
                    aria-label={done ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {done && <Check className="h-3 w-3" strokeWidth={3} />}
                  </button>

                  {/* Title + meta */}
                  <div className="min-w-0 flex-1">
                    {editingTaskId === task.id ? (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          handleSaveEdit(task);
                        }}
                        className="flex items-center gap-2"
                      >
                        <input
                          autoFocus
                          type="text"
                          value={editingTitle}
                          onChange={(e) => setEditingTitle(e.target.value)}
                          className="flex-1 rounded border border-indigo-400 px-2 py-0.5 text-sm text-zinc-900 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                        />
                        <button
                          type="submit"
                          className="rounded bg-indigo-600 px-2 py-0.5 text-xs font-semibold text-white hover:bg-indigo-700"
                        >
                          Save
                        </button>
                        <button
                          type="button"
                          onClick={() => setEditingTaskId(null)}
                          className="text-zinc-400 hover:text-zinc-600"
                          aria-label="Cancel edit"
                        >
                          <X className="h-4 w-4" />
                        </button>
                      </form>
                    ) : (
                      <p
                        className={`text-sm font-medium ${
                          done ? 'text-zinc-400 line-through' : 'text-zinc-900'
                        }`}
                      >
                        {task.title}
                      </p>
                    )}
                    {task.description && editingTaskId !== task.id && (
                      <p className="mt-0.5 text-xs text-zinc-400 line-clamp-1">
                        {task.description}
                      </p>
                    )}
                    {editingTaskId !== task.id && (
                      <div className="mt-1.5 flex flex-wrap items-center gap-1.5">
                        <PriorityBadge priority={task.priority} />
                        <StatusBadge status={taskStates[task.id] ?? task.status} />
                        {task.dueDate && (
                          <span
                            className={`text-xs ${
                              isOverdue ? 'font-medium text-red-600' : 'text-zinc-400'
                            }`}
                          >
                            Due {task.dueDate}
                            {isOverdue ? ' (overdue)' : ''}
                          </span>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Assignee + actions */}
                  <div className="flex shrink-0 items-center gap-2">
                    {assignee && (
                      <div title={assignee.name}>
                        <Avatar name={assignee.name} color={assignee.avatarColor} size="sm" />
                      </div>
                    )}
                    {editingTaskId !== task.id && (
                      <>
                        <button
                          onClick={() => handleStartEdit(task)}
                          className="text-zinc-300 hover:text-indigo-500 transition-colors"
                          aria-label="Edit task"
                        >
                          <Pencil className="h-3.5 w-3.5" />
                        </button>
                        <button
                          onClick={() => handleDeleteTask(task)}
                          className="text-zinc-300 hover:text-red-500 transition-colors"
                          aria-label="Delete task"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </>
                    )}
                  </div>
                </li>
              );
            })}

            {filteredTasks.length === 0 && (
              <li className="px-4 py-8 text-center text-sm text-zinc-400">
                No tasks match the current filters.
              </li>
            )}
          </ul>

          {/* Inline task creation */}
          <div className="border-t border-zinc-100 px-4 py-3">
            {isAddingTask ? (
              <form onSubmit={handleAddTask} className="flex items-center gap-2">
                <input
                  autoFocus
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="Task title…"
                  className="flex-1 rounded-lg border border-zinc-300 px-3 py-1.5 text-sm text-zinc-900 placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-indigo-700"
                >
                  Add
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setIsAddingTask(false);
                    setNewTaskTitle('');
                  }}
                  className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
                >
                  Cancel
                </button>
              </form>
            ) : (
              <button
                onClick={() => setIsAddingTask(true)}
                className="flex items-center gap-1.5 text-sm text-zinc-400 hover:text-indigo-600"
              >
                <Plus className="h-4 w-4" />
                Add task
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
