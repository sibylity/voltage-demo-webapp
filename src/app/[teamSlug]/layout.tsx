'use client';

import { use } from 'react';
import { Sidebar } from '@/components/layout/Sidebar';

interface TeamLayoutProps {
  children: React.ReactNode;
  params: Promise<{ teamSlug: string }>;
}

export default function TeamLayout({ children, params }: TeamLayoutProps) {
  // Demo: in a real app, params would be awaited and the team data would be
  // fetched from the API to verify the slug is valid and the user has access.
  const { teamSlug } = use(params);

  return (
    <div className="flex h-full">
      <Sidebar teamSlug={teamSlug} />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">{children}</div>
    </div>
  );
}
