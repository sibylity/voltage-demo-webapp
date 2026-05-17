'use client';

import { use, useEffect, useState } from 'react';
import { UserPlus } from 'lucide-react';
import { tracker } from '@/lib/tracker';
import { members as initialMembers, team, currentUser, type Member, type Role } from '@/lib/mock-data';
import { Header } from '@/components/layout/Header';
import { Avatar } from '@/components/ui/Avatar';
import { RoleBadge } from '@/components/ui/Badge';

interface MembersPageProps {
  params: Promise<{ teamSlug: string }>;
}

export default function MembersPage({ params }: MembersPageProps) {
  const { teamSlug } = use(params);

  const [members, setMembers] = useState<Member[]>(initialMembers);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteRole, setInviteRole] = useState<Role>('editor');
  const [inviteSuccess, setInviteSuccess] = useState(false);

  useEffect(() => {
    tracker.page('Members', { teamSlug, teamId: team.id });
  }, [teamSlug]);

  function handleRoleChange(memberId: string, newRole: Role) {
    const member = members.find((m) => m.id === memberId);
    if (!member || member.role === newRole) return;

    tracker.track('Team Member Role Changed', {
      teamId: team.id,
      targetUserId: memberId,
      changedByUserId: currentUser.id,
      previousRole: member.role,
      newRole,
    });

    // Demo: in a real app this would PATCH /api/teams/:id/members/:memberId with { role: newRole }.
    // See the tracker call above for the event schema and properties.
    setMembers((prev) => prev.map((m) => (m.id === memberId ? { ...m, role: newRole } : m)));
    console.debug('[members] role change (demo only):', memberId, newRole);
  }

  function handleRemoveMember(memberId: string) {
    const member = members.find((m) => m.id === memberId);
    if (!member) return;
    if (member.id === currentUser.id) {
      alert('You cannot remove yourself.');
      return;
    }

    tracker.track('Team Member Removed', {
      teamId: team.id,
      removedUserId: memberId,
      removedByUserId: currentUser.id,
    });

    // Demo: in a real app this would DELETE /api/teams/:id/members/:memberId.
    // See the tracker call above for the event schema and properties.
    setMembers((prev) => prev.filter((m) => m.id !== memberId));
    console.debug('[members] remove member (demo only):', memberId);
  }

  function handleInvite(e: React.FormEvent) {
    e.preventDefault();
    if (!inviteEmail.trim()) return;

    tracker.track('Team Member Invited', {
      teamId: team.id,
      invitedByUserId: currentUser.id,
      inviteeEmail: inviteEmail.trim(),
      role: inviteRole,
    });

    // Demo: in a real app this would POST /api/teams/:id/invitations with { email, role }.
    // See the tracker call above for the event schema and properties.
    console.debug('[members] invite (demo only):', inviteEmail.trim(), inviteRole);
    setInviteEmail('');
    setInviteSuccess(true);
    setTimeout(() => setInviteSuccess(false), 3000);
  }

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <Header
        title="Members"
        description={`${members.length} ${members.length === 1 ? 'member' : 'members'} in ${team.name}.`}
      />

      <div className="flex-1 p-6">
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Member table */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-zinc-100">
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                      Member
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                      Role
                    </th>
                    <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-zinc-400">
                      Joined
                    </th>
                    <th className="px-5 py-3" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {members.map((member) => (
                    <tr key={member.id} className="hover:bg-zinc-50">
                      <td className="px-5 py-3.5">
                        <div className="flex items-center gap-3">
                          <Avatar name={member.name} color={member.avatarColor} size="md" />
                          <div>
                            <p className="font-medium text-zinc-900">
                              {member.name}
                              {member.id === currentUser.id && (
                                <span className="ml-1.5 text-xs text-zinc-400">(you)</span>
                              )}
                            </p>
                            <p className="text-xs text-zinc-400">{member.email}</p>
                          </div>
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        {currentUser.role === 'admin' && member.id !== currentUser.id ? (
                          <select
                            value={member.role}
                            onChange={(e) => handleRoleChange(member.id, e.target.value as Role)}
                            className="rounded-md border border-zinc-200 bg-white px-2 py-1 text-xs text-zinc-700 focus:border-indigo-500 focus:outline-none"
                          >
                            <option value="admin">Admin</option>
                            <option value="editor">Editor</option>
                          </select>
                        ) : (
                          <RoleBadge role={member.role} />
                        )}
                      </td>
                      <td className="px-5 py-3.5 text-xs text-zinc-400">{member.createdAt}</td>
                      <td className="px-5 py-3.5 text-right">
                        {currentUser.role === 'admin' && member.id !== currentUser.id && (
                          <button
                            onClick={() => handleRemoveMember(member.id)}
                            className="text-xs text-zinc-400 hover:text-red-600"
                          >
                            Remove
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Invite form */}
          <div>
            <div className="rounded-xl border border-zinc-200 bg-white p-5 shadow-sm">
              <div className="mb-4 flex items-center gap-2">
                <UserPlus className="h-4 w-4 text-indigo-600" />
                <h2 className="text-sm font-semibold text-zinc-900">Invite member</h2>
              </div>

              {inviteSuccess && (
                <div className="mb-3 rounded-lg bg-green-50 px-3 py-2 text-xs text-green-700">
                  Invitation sent! (demo only — no email was actually sent)
                </div>
              )}

              <form onSubmit={handleInvite} className="space-y-3">
                <div>
                  <label
                    htmlFor="invite-email"
                    className="block text-xs font-medium text-zinc-700"
                  >
                    Email address
                  </label>
                  <input
                    id="invite-email"
                    type="email"
                    required
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                    placeholder="colleague@company.com"
                    className="mt-1 w-full rounded-lg border border-zinc-300 px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  />
                </div>
                <div>
                  <label
                    htmlFor="invite-role"
                    className="block text-xs font-medium text-zinc-700"
                  >
                    Role
                  </label>
                  <select
                    id="invite-role"
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value as Role)}
                    className="mt-1 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-700 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                  >
                    <option value="editor">Editor</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
                <button
                  type="submit"
                  className="w-full rounded-lg bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-700"
                >
                  Send invite
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
