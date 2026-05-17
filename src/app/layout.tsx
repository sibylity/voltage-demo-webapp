import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'TaskFlow — Team Task Manager',
  description: 'A team-based task management application.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full">
      <body className="h-full bg-zinc-50 text-zinc-900 antialiased">{children}</body>
    </html>
  );
}
