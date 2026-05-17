import { redirect } from 'next/navigation';

/**
 * Root route — redirects to the demo team dashboard.
 * In a real app this would redirect to the user's most-recently-visited team
 * or a team picker if the user belongs to multiple teams.
 */
export default function RootPage() {
  redirect('/acme');
}
