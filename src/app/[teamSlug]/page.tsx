'use client';

import { use, useEffect } from 'react';
import Link from 'next/link';
import { CheckSquare, AlertCircle, TrendingUp, Users, FolderOpen, ArrowRight } from 'lucide-react';
import { tracker } from '@/lib/tracker';
import {
  team,
  members,
  folders,
  recentActivity,
  getDashboardStats,
  getMemberById,
  formatRelativeTime,
} from '@/lib/mock-data';
import { Header } from '@/components/layout/Header';
import { StatCard } from '@/components/ui/StatCard';
import { Avatar } from '@/components/ui/Avatar';

interface DashboardPageProps {
  params: Promise<{ teamSlug: string }>;
}

export default function DashboardPage({ params }: DashboardPageProps) {
  const { teamSlug } = use(params);
  const stats = getDashboardStats();

  useEffect(() => {
    tracker.page('Dashboard', { teamSlug, teamId: team.id });
  }, [teamSlug]);

  return (
    <div className="flex flex-1 flex-col overflow-auto">
      <Header
        title={`${team.name} Dashboard`}
        description="Overview of your team's task activity."
      />

      <div className="flex-1 p-6">
        {/* Stat cards */}
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
          <StatCard
            icon={CheckSquare}
            label="Due Today"
            value={stats.dueTodayCount}
            accentColor="bg-indigo-50 text-indigo-600"
            trend={{ direction: 'neutral', label: 'across all lists' }}
          />
          <StatCard
            icon={AlertCircle}
            label="Overdue"
            value={stats.overdueCount}
            accentColor="bg-red-50 text-red-600"
            trend={
              stats.overdueCount > 0
                ? { direction: 'down', label: 'need attention' }
                : { direction: 'up', label: 'all on track' }
            }
          />
          <StatCard
            icon={TrendingUp}
            label="Completed This Week"
            value={stats.completedThisWeekCount}
            accentColor="bg-green-50 text-green-600"
            trend={{ direction: 'up', label: 'last 7 days' }}
          />
          <StatCard
            icon={Users}
            label="Team Members"
            value={stats.totalMembers}
            accentColor="bg-violet-50 text-violet-600"
          />
        </div>

        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Recent activity */}
          <div className="lg:col-span-2">
            <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
              <div className="border-b border-zinc-100 px-5 py-4">
                <h2 className="text-sm font-semibold text-zinc-900">Recent Activity</h2>
              </div>
              <ul className="divide-y divide-zinc-50">
                {recentActivity.map((item) => {
                  const actor = getMemberById(item.userId);
                  return (
                    <li key={item.id} className="flex items-start gap-3 px-5 py-3.5">
                      {actor && (
                        <Avatar name={actor.name} color={actor.avatarColor} size="sm" />
                      )}
                      <div className="min-w-0 flex-1">
                        <p className="text-sm text-zinc-700">
                          <span className="font-medium text-zinc-900">
                            {actor?.name ?? 'Someone'}
                          </span>{' '}
                          {item.action}{' '}
                          <span className="font-medium text-zinc-800">{item.target}</span>
                        </p>
                        <p className="mt-0.5 text-xs text-zinc-400">
                          {formatRelativeTime(item.timestamp)}
                        </p>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>

          {/* Quick links */}
          <div className="flex flex-col gap-4">
            {/* Folders quick links */}
            <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
              <div className="border-b border-zinc-100 px-5 py-4">
                <h2 className="text-sm font-semibold text-zinc-900">Folders</h2>
              </div>
              <ul className="divide-y divide-zinc-50">
                {folders.map((folder) => (
                  <li key={folder.id}>
                    <Link
                      href={`/${teamSlug}/folders/${folder.id}`}
                      className="flex items-center justify-between px-5 py-3 text-sm hover:bg-zinc-50"
                    >
                      <span className="flex items-center gap-2 text-zinc-700">
                        <span>{folder.emoji}</span>
                        <span>{folder.name}</span>
                      </span>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-400" />
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="border-t border-zinc-100 px-5 py-3">
                <Link
                  href={`/${teamSlug}/folders`}
                  className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                  <FolderOpen className="h-3.5 w-3.5" />
                  View all folders
                </Link>
              </div>
            </div>

            {/* Team members quick view */}
            <div className="rounded-xl border border-zinc-200 bg-white shadow-sm">
              <div className="border-b border-zinc-100 px-5 py-4">
                <h2 className="text-sm font-semibold text-zinc-900">Team</h2>
              </div>
              <div className="px-5 py-3">
                <div className="flex flex-wrap gap-2">
                  {members.map((member) => (
                    <Avatar
                      key={member.id}
                      name={member.name}
                      color={member.avatarColor}
                      size="md"
                    />
                  ))}
                </div>
              </div>
              <div className="border-t border-zinc-100 px-5 py-3">
                <Link
                  href={`/${teamSlug}/members`}
                  className="flex items-center gap-1 text-xs font-medium text-indigo-600 hover:text-indigo-700"
                >
                  <Users className="h-3.5 w-3.5" />
                  Manage members
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
