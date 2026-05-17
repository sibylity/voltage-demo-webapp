'use client';

import { use, useEffect, useState } from 'react';
import Link from 'next/link';
import { Plus, FolderOpen, X } from 'lucide-react';
import { tracker } from '@/lib/tracker';
import { folders, team, currentUser, getFolderStats } from '@/lib/mock-data';
import { Header } from '@/components/layout/Header';

interface FoldersPageProps {
  params: Promise<{ teamSlug: string }>;
}

export default function FoldersPage({ params }: FoldersPageProps) {
  const { teamSlug } = use(params);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [newFolderName, setNewFolderName] = useState('');

  useEffect(() => {
    tracker.page('Folders', { teamSlug, teamId: team.id });
  }, [teamSlug]);

  function handleCreateFolder(e: React.FormEvent) {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    // Demo: in a real app this would POST to the API to create the folder.
    // See the tracker call below for the event schema and expected properties.
    tracker.track('Folder Created', {
      folderId: `folder_${Date.now()}`,
      folderName: newFolderName.trim(),
      teamId: team.id,
      createdByUserId: currentUser.id,
    });

    console.debug('[folders] create folder (demo only):', newFolderName.trim());
    setNewFolderName('');
    setShowCreateModal(false);
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <Header
        title="Folders"
        description="Organize your task lists into folders."
        actions={
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
          >
            <Plus className="h-4 w-4" />
            New folder
          </button>
        }
      />

      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {folders.map((folder) => {
            const stats = getFolderStats(folder.id);
            return (
              <Link
                key={folder.id}
                href={`/${teamSlug}/folders/${folder.id}`}
                className="group rounded-xl border border-zinc-200 bg-white p-5 shadow-sm transition-shadow hover:shadow-md"
              >
                <div className="mb-3 flex items-start justify-between">
                  <span className="text-2xl">{folder.emoji}</span>
                  <FolderOpen className="h-4 w-4 text-zinc-300 transition-colors group-hover:text-indigo-400" />
                </div>
                <h3 className="font-semibold text-zinc-900">{folder.name}</h3>
                <p className="mt-1 text-sm text-zinc-500 line-clamp-2">{folder.description}</p>
                <div className="mt-3 flex gap-4 text-xs text-zinc-400">
                  <span>
                    <strong className="text-zinc-600">{stats.listCount}</strong>{' '}
                    {stats.listCount === 1 ? 'list' : 'lists'}
                  </span>
                  <span>
                    <strong className="text-zinc-600">{stats.taskCount}</strong>{' '}
                    {stats.taskCount === 1 ? 'task' : 'tasks'}
                  </span>
                  <span>
                    <strong className="text-green-600">{stats.completedCount}</strong> done
                  </span>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      {/* Create folder modal */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-zinc-900">Create folder</h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="rounded-lg p-1 text-zinc-400 hover:bg-zinc-100 hover:text-zinc-600"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <form onSubmit={handleCreateFolder} className="space-y-4">
              <div>
                <label htmlFor="folder-name" className="block text-sm font-medium text-zinc-700">
                  Folder name
                </label>
                <input
                  id="folder-name"
                  type="text"
                  autoFocus
                  required
                  value={newFolderName}
                  onChange={(e) => setNewFolderName(e.target.value)}
                  placeholder="e.g. Engineering"
                  className="mt-1.5 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>
              <p className="text-xs text-zinc-400">
                Demo: this form is stubbed — no folder will be persisted.
              </p>
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-lg border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-700"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
