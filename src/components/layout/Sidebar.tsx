'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { FolderOpen, Users, Settings, LogOut } from 'lucide-react';
import { currentUser, team } from '@/lib/mock-data';
import { Avatar } from '@/components/ui/Avatar';
import { PlanBadge } from '@/components/ui/Badge';

interface SidebarProps {
  teamSlug: string;
}

interface NavItem {
  label: string;
  href: string;
  icon: React.ElementType;
}

export function Sidebar({ teamSlug }: SidebarProps) {
  const pathname = usePathname();

  const navItems: NavItem[] = [
    { label: 'Folders', href: `/${teamSlug}/folders`, icon: FolderOpen },
    { label: 'Members', href: `/${teamSlug}/members`, icon: Users },
    { label: 'Settings', href: `/${teamSlug}/settings`, icon: Settings },
  ];

  function isActive(href: string): boolean {
    if (href === `/${teamSlug}/folders`) {
      return pathname.startsWith(`/${teamSlug}/folders`);
    }
    return pathname === href;
  }

  function handleSignOut() {
    // Demo: in a real app this would clear the session/JWT and redirect to /login.
    console.debug('[sidebar] sign out clicked');
    window.location.href = '/login';
  }

  return (
    <aside className="flex h-full w-56 flex-col bg-zinc-900 text-zinc-100">
      {/* Team header */}
      <div className="border-b border-zinc-800 px-4 py-4">
        <Link href={`/${teamSlug}`} className="flex items-center gap-2.5 hover:opacity-80">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-600 text-sm font-bold text-white">
            {team.name.charAt(0)}
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-white">{team.name}</p>
            <PlanBadge plan={team.plan} />
          </div>
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-3">
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);
            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-2.5 rounded-md px-3 py-2 text-sm font-medium transition-colors ${
                    active
                      ? 'bg-indigo-600 text-white'
                      : 'text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
                  }`}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Current user */}
      <div className="border-t border-zinc-800 px-3 py-3">
        <div className="flex items-center justify-between">
          <div className="flex min-w-0 items-center gap-2.5">
            <Avatar name={currentUser.name} color={currentUser.avatarColor} size="sm" />
            <div className="min-w-0">
              <p className="truncate text-xs font-medium text-zinc-200">{currentUser.name}</p>
              <p className="truncate text-xs text-zinc-500">{currentUser.email}</p>
            </div>
          </div>
          <button
            onClick={handleSignOut}
            className="ml-1 rounded p-1 text-zinc-500 transition-colors hover:bg-zinc-800 hover:text-zinc-200"
            title="Sign out"
          >
            <LogOut className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
