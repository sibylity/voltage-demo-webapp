/**
 * Analytics tracker — stubbed for this demo codebase.
 * In production, swap the console.debug calls for your analytics
 * provider (Segment, Amplitude, Mixpanel, PostHog, etc.).
 *
 * Event schemas in events/ are validated with Zod before being
 * forwarded to the provider, catching mismatches at the call site.
 */
import { z } from 'zod';
import { EventSchemas, type EventName } from '../../events';

export interface UserTraits {
  email: string;
  name: string;
  role: 'admin' | 'editor';
  teamId: string;
  teamName: string;
  createdAt: string;
}

export interface TeamTraits {
  teamId: string;
  name: string;
  plan: 'free' | 'pro' | 'enterprise';
  memberCount: number;
  createdAt: string;
}

const style = {
  label: 'color: #6366f1; font-weight: 700;',
  dim: 'color: #71717a;',
};

export const tracker = {
  /** Set the current user's identity and traits. Call on sign-in and whenever traits change. */
  identify(userId: string, traits: UserTraits): void {
    // TODO: analytics.identify(userId, traits);
    console.log('%c[tracker] identify %c' + userId, style.label, style.dim, traits);
  },

  /** Associate the current user with a team. Call after identify() and on team switch. */
  group(teamId: string, traits: TeamTraits): void {
    // TODO: analytics.group(teamId, traits);
    console.log('%c[tracker] group %c' + teamId, style.label, style.dim, traits);
  },

  /** Emit a named event. Properties are validated against the Zod schema before emission. */
  track<E extends EventName>(event: E, properties: z.infer<(typeof EventSchemas)[E]>): void {
    const schema = EventSchemas[event];
    const result = schema.safeParse(properties);
    if (!result.success) {
      console.error('%c[tracker] invalid event properties', style.label, {
        event,
        errors: result.error.flatten(),
      });
      return;
    }
    // TODO: analytics.track(event, result.data);
    console.log('%c[tracker] track %c' + event, style.label, style.dim, result.data);
  },

  /** Track a page view. Call on route change. */
  page(name: string, properties?: Record<string, unknown>): void {
    // TODO: analytics.page(name, properties);
    console.log('%c[tracker] page %c' + name, style.label, style.dim, properties ?? {});
  },
};
