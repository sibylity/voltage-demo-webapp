'use client';

import { use, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, ListChecks } from 'lucide-react';
import { tracker } from '@/lib/tracker';
import { team, getFolderById, getListsByFolderId, getListStats } from '@/lib/mock-data';
import { Header } from '@/components/layout/Header';

interface FolderDetailPageProps {
  params: Promise<{ teamSlug: string; folderId: string }>;
}

export default function FolderDetailPage({ params }: FolderDetailPageProps) {
  const { teamSlug, folderId } = use(params);

  const folder = getFolderById(folderId);
  const lists = getListsByFolderId(folderId);

  useEffect(() => {
    tracker.page('Folder Detail', { teamSlug, teamId: team.id, folderId });
  }, [teamSlug, folderId]);

  if (!folder) {
    return (
      <div className="flex flex-1 items-center justify-center p-8">
        <p className="text-zinc-500">Folder not found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <Header
        title={`${folder.emoji} ${folder.name}`}
        description={folder.description}
        actions={
          <Link
            href={`/${teamSlug}/folders`}
            className="flex items-center gap-1.5 rounded-lg border border-zinc-300 px-3 py-2 text-sm font-medium text-zinc-600 transition-colors hover:bg-zinc-50"
          >
            <ArrowLeft className="h-4 w-4" />
            All folders
          </Link>
        }
      />

      <div className="flex-1 p-6">
        {lists.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-zinc-300 bg-white py-16 text-center">
            <ListChecks className="mb-3 h-8 w-8 text-zinc-300" />
            <p className="text-sm font-medium text-zinc-500">No task lists yet</p>
            <p className="mt-1 text-xs text-zinc-400">Create a task list to get started.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
            {lists.map((list) => {
              const stats = getListStats(list.id);
              const progressPercent = stats.percentage;

              return (
                <Link
                  key={list.id}
                  href={`/${teamSlug}/folders/${folderId}/${list.id}`}
                  className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
                >
                  <div className="mb-1 flex items-start justify-between">
                    <h3 className="font-semibold text-zinc-900 group-hover:text-indigo-600">
                      {list.name}
                    </h3>
                    <ListChecks className="h-4 w-4 shrink-0 text-zinc-300 transition-colors group-hover:text-indigo-400" />
                  </div>

                  <p className="text-xs text-zinc-400">
                    {stats.completedCount} / {stats.taskCount}{' '}
                    {stats.taskCount === 1 ? 'task' : 'tasks'} completed
                  </p>

                  {/* Progress bar */}
                  <div className="mt-3">
                    <div className="h-1.5 w-full overflow-hidden rounded-full bg-zinc-100">
                      <div
                        className="h-full rounded-full bg-indigo-500 transition-all"
                        style={{ width: `${progressPercent}%` }}
                      />
                    </div>
                    <p className="mt-1 text-right text-xs text-zinc-400">{progressPercent}%</p>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
