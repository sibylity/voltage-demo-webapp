'use client';

import { use, useEffect, useState } from 'react';
import { Save, AlertTriangle } from 'lucide-react';
import { tracker } from '@/lib/tracker';
import { team, currentUser } from '@/lib/mock-data';
import { Header } from '@/components/layout/Header';
import { PlanBadge } from '@/components/ui/Badge';

interface SettingsPageProps {
  params: Promise<{ teamSlug: string }>;
}

const planLimits: Record<string, { folders: number; members: number; lists: number }> = {
  free: { folders: 3, members: 5, lists: 10 },
  pro: { folders: 25, members: 50, lists: 200 },
  enterprise: { folders: -1, members: -1, lists: -1 },
};

export default function SettingsPage({ params }: SettingsPageProps) {
  const { teamSlug } = use(params);

  const [teamName, setTeamName] = useState(team.name);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [showDangerConfirm, setShowDangerConfirm] = useState(false);
  const [deleteConfirmText, setDeleteConfirmText] = useState('');

  useEffect(() => {
    tracker.page('Settings', { teamSlug, teamId: team.id });
  }, [teamSlug]);

  function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!teamName.trim()) return;

    // Demo: in a real app this would PATCH /api/teams/:id with { name: teamName }.
    // The tracker call below fires the Team Updated event (not defined in schemas here,
    // but would be added to team-events.ts in production).
    console.debug('[settings] save team settings (demo only):', teamName.trim());
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 2500);
  }

  function handleDeleteTeam() {
    if (deleteConfirmText !== team.name) {
      alert(`Please type "${team.name}" to confirm.`);
      return;
    }
    // Demo: in a real app this would DELETE /api/teams/:id.
    console.debug('[settings] delete team (demo only):', team.id);
    alert('Demo: team deletion is not implemented. Check the console for the logged action.');
    setShowDangerConfirm(false);
    setDeleteConfirmText('');
  }

  const limits = planLimits[team.plan] ?? planLimits.free;

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <Header title="Team Settings" description="Manage your team's general configuration." />

      <div className="flex-1 p-6">
        <div className="mx-auto max-w-2xl space-y-6">
          {/* General settings */}
          <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
            <div className="border-b border-zinc-100 px-6 py-4">
              <h2 className="text-sm font-semibold text-zinc-900">General</h2>
            </div>
            <form onSubmit={handleSave} className="space-y-4 px-6 py-5">
              <div>
                <label htmlFor="team-name" className="block text-sm font-medium text-zinc-700">
                  Team name
                </label>
                <input
                  id="team-name"
                  type="text"
                  required
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="mt-1.5 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-zinc-700">Team slug</label>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm text-zinc-400">
                    app.taskflow.io/
                  </span>
                  <span className="rounded-lg border border-zinc-200 bg-zinc-50 px-3 py-2 text-sm font-medium text-zinc-700">
                    {team.slug}
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-400">
                  The slug is read-only. Contact support to change it.
                </p>
              </div>

              {saveSuccess && (
                <p className="rounded-lg bg-green-50 px-3 py-2 text-sm text-green-700">
                  Settings saved! (demo only)
                </p>
              )}

              <div className="flex justify-end">
                <button
                  type="submit"
                  className="flex items-center gap-1.5 rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
                >
                  <Save className="h-4 w-4" />
                  Save changes
                </button>
              </div>
            </form>
          </div>

          {/* Plan */}
          <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
            <div className="border-b border-zinc-100 px-6 py-4">
              <h2 className="text-sm font-semibold text-zinc-900">Plan</h2>
            </div>
            <div className="px-6 py-5">
              <div className="flex items-center gap-3">
                <PlanBadge plan={team.plan} />
                <span className="text-sm capitalize text-zinc-500">{team.plan} plan</span>
              </div>
              <dl className="mt-4 grid grid-cols-3 gap-4 text-center">
                {[
                  { label: 'Folders', value: limits.folders < 0 ? 'Unlimited' : limits.folders },
                  { label: 'Members', value: limits.members < 0 ? 'Unlimited' : limits.members },
                  { label: 'Lists', value: limits.lists < 0 ? 'Unlimited' : limits.lists },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-lg border border-zinc-100 bg-zinc-50 px-3 py-3"
                  >
                    <dt className="text-xs text-zinc-500">{item.label}</dt>
                    <dd className="mt-1 text-lg font-semibold text-zinc-900">{item.value}</dd>
                  </div>
                ))}
              </dl>
              <div className="mt-4">
                <button
                  onClick={() => console.debug('[settings] upgrade plan (demo only)')}
                  className="text-sm font-medium text-indigo-600 hover:text-indigo-700"
                >
                  Upgrade plan →
                </button>
              </div>
            </div>
          </div>

          {/* Danger zone */}
          {currentUser.role === 'admin' && (
            <div className="rounded-xl border border-red-200 bg-white shadow-sm">
              <div className="border-b border-red-100 px-6 py-4">
                <div className="flex items-center gap-2">
                  <AlertTriangle className="h-4 w-4 text-red-500" />
                  <h2 className="text-sm font-semibold text-red-700">Danger zone</h2>
                </div>
              </div>
              <div className="px-6 py-5">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-zinc-900">Delete this team</p>
                    <p className="mt-0.5 text-xs text-zinc-500">
                      Permanently delete {team.name} and all of its data. This action cannot be
                      undone.
                    </p>
                  </div>
                  <button
                    onClick={() => setShowDangerConfirm(true)}
                    className="ml-4 shrink-0 rounded-lg border border-red-300 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50"
                  >
                    Delete team
                  </button>
                </div>

                {showDangerConfirm && (
                  <div className="mt-4 rounded-lg border border-red-200 bg-red-50 p-4">
                    <p className="text-sm text-red-700">
                      Type <strong>{team.name}</strong> to confirm:
                    </p>
                    <input
                      type="text"
                      value={deleteConfirmText}
                      onChange={(e) => setDeleteConfirmText(e.target.value)}
                      className="mt-2 w-full rounded-lg border border-red-300 bg-white px-3 py-2 text-sm text-zinc-900 focus:border-red-500 focus:outline-none"
                      placeholder={team.name}
                    />
                    <div className="mt-3 flex gap-2">
                      <button
                        onClick={handleDeleteTeam}
                        className="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-red-700"
                      >
                        I understand, delete team
                      </button>
                      <button
                        onClick={() => {
                          setShowDangerConfirm(false);
                          setDeleteConfirmText('');
                        }}
                        className="rounded-lg border border-zinc-300 px-3 py-1.5 text-xs font-medium text-zinc-600 hover:bg-zinc-50"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
