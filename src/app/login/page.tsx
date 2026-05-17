'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogIn } from 'lucide-react';
import { tracker } from '@/lib/tracker';
import { team, members } from '@/lib/mock-data';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('alice@acme.com');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    tracker.page('Login');
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Demo: simulate a network request delay.
    // In a real app, this would POST to /api/auth/login and receive a JWT.
    await new Promise((resolve) => setTimeout(resolve, 600));

    // Demo: accept any password for the known demo users.
    const user = members.find((m) => m.email === email.toLowerCase().trim());
    if (!user || password.length < 1) {
      setError('Invalid email or password. Try alice@acme.com with any password.');
      setIsLoading(false);
      return;
    }

    // Track sign-in event with validated schema.
    tracker.identify(user.id, {
      email: user.email,
      name: user.name,
      role: user.role,
      teamId: team.id,
      teamName: team.name,
      createdAt: user.createdAt,
    });

    tracker.group(team.id, {
      teamId: team.id,
      name: team.name,
      plan: team.plan,
      memberCount: members.length,
      createdAt: team.createdAt,
    });

    tracker.track('User Signed In', {
      email: user.email,
      method: 'email',
    });

    // Demo: in a real app this would store the JWT and redirect to the last-visited page.
    router.push(`/${team.slug}`);
  }

  return (
    <div className="flex min-h-full items-center justify-center bg-zinc-50 px-4 py-12">
      <div className="w-full max-w-sm">
        {/* Logo / brand */}
        <div className="mb-8 text-center">
          <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 shadow-md">
            <LogIn className="h-6 w-6 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-zinc-900">TaskFlow</h1>
          <p className="mt-1 text-sm text-zinc-500">Sign in to your team workspace</p>
        </div>

        {/* Form card */}
        <div className="rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-zinc-700">
                Work email
              </label>
              <input
                id="email"
                type="email"
                required
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="you@company.com"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-zinc-700">
                Password
              </label>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1.5 w-full rounded-lg border border-zinc-300 bg-white px-3 py-2 text-sm text-zinc-900 placeholder-zinc-400 shadow-sm transition-colors focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20"
                placeholder="••••••••"
              />
            </div>

            {error && (
              <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full rounded-lg bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition-colors hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isLoading ? 'Signing in…' : 'Sign in'}
            </button>
          </form>

          <p className="mt-4 text-center text-xs text-zinc-400">
            Demo: use <strong>alice@acme.com</strong> with any password
          </p>
        </div>
      </div>
    </div>
  );
}
