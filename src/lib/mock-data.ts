/**
 * Mock data for the Voltage demo task manager.
 * In a real app, this data would come from a database via API calls.
 */

// ─── Types ────────────────────────────────────────────────────────────────────

export type Role = 'admin' | 'editor';
export type Plan = 'free' | 'pro' | 'enterprise';
export type TaskStatus = 'todo' | 'in_progress' | 'done';
export type TaskPriority = 'low' | 'medium' | 'high';

export interface Team {
  id: string;
  name: string;
  slug: string;
  plan: Plan;
  createdAt: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  role: Role;
  avatarColor: string;
  createdAt: string;
}

export interface Folder {
  id: string;
  teamId: string;
  name: string;
  emoji: string;
  description: string;
  createdAt: string;
  createdByUserId: string;
}

export interface TaskList {
  id: string;
  folderId: string;
  teamId: string;
  name: string;
  createdAt: string;
  createdByUserId: string;
}

export interface Task {
  id: string;
  listId: string;
  folderId: string;
  teamId: string;
  title: string;
  description?: string;
  status: TaskStatus;
  priority: TaskPriority;
  assigneeId?: string;
  dueDate?: string;
  createdAt: string;
  createdByUserId: string;
  completedAt?: string;
}

export interface ActivityItem {
  id: string;
  userId: string;
  action: string;
  target: string;
  targetType: 'task' | 'list' | 'folder' | 'member';
  timestamp: string;
}

// ─── Team ─────────────────────────────────────────────────────────────────────

export const team: Team = {
  id: 'team_acme',
  name: 'Acme Corp',
  slug: 'acme',
  plan: 'pro',
  createdAt: '2024-01-15',
};

// ─── Members ──────────────────────────────────────────────────────────────────

export const members: Member[] = [
  {
    id: 'user_alice',
    name: 'Alice Chen',
    email: 'alice@acme.com',
    role: 'admin',
    avatarColor: '#6366f1',
    createdAt: '2024-01-15',
  },
  {
    id: 'user_bob',
    name: 'Bob Martinez',
    email: 'bob@acme.com',
    role: 'editor',
    avatarColor: '#10b981',
    createdAt: '2024-02-01',
  },
  {
    id: 'user_carol',
    name: 'Carol Kim',
    email: 'carol@acme.com',
    role: 'editor',
    avatarColor: '#f59e0b',
    createdAt: '2024-02-14',
  },
  {
    id: 'user_david',
    name: 'David Lee',
    email: 'david@acme.com',
    role: 'editor',
    avatarColor: '#ef4444',
    createdAt: '2024-03-01',
  },
  {
    id: 'user_emily',
    name: 'Emily Johnson',
    email: 'emily@acme.com',
    role: 'admin',
    avatarColor: '#8b5cf6',
    createdAt: '2024-03-15',
  },
];

/** The currently authenticated user (Alice Chen, admin). */
export const currentUser: Member = members[0];

// ─── Folders ──────────────────────────────────────────────────────────────────

export const folders: Folder[] = [
  {
    id: 'folder_engineering',
    teamId: 'team_acme',
    name: 'Engineering',
    emoji: '⚙️',
    description: 'Sprint planning, bug tracking, and technical debt management.',
    createdAt: '2024-01-15',
    createdByUserId: 'user_alice',
  },
  {
    id: 'folder_marketing',
    teamId: 'team_acme',
    name: 'Marketing',
    emoji: '📣',
    description: 'Campaign planning, social media, and analytics.',
    createdAt: '2024-01-20',
    createdByUserId: 'user_emily',
  },
  {
    id: 'folder_product',
    teamId: 'team_acme',
    name: 'Product',
    emoji: '🗺️',
    description: 'Roadmap planning, user research, and feature requests.',
    createdAt: '2024-01-22',
    createdByUserId: 'user_alice',
  },
  {
    id: 'folder_design',
    teamId: 'team_acme',
    name: 'Design',
    emoji: '🎨',
    description: 'UI components, brand assets, and design systems.',
    createdAt: '2024-02-01',
    createdByUserId: 'user_carol',
  },
];

// ─── Task Lists ───────────────────────────────────────────────────────────────

export const taskLists: TaskList[] = [
  // Engineering
  {
    id: 'list_sprint23',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    name: 'Sprint 23 Backlog',
    createdAt: '2024-04-01',
    createdByUserId: 'user_alice',
  },
  {
    id: 'list_bugs',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    name: 'Bug Tracker',
    createdAt: '2024-01-15',
    createdByUserId: 'user_alice',
  },
  {
    id: 'list_techdebt',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    name: 'Tech Debt',
    createdAt: '2024-02-10',
    createdByUserId: 'user_bob',
  },
  // Marketing
  {
    id: 'list_q2_campaigns',
    folderId: 'folder_marketing',
    teamId: 'team_acme',
    name: 'Q2 Campaigns',
    createdAt: '2024-03-01',
    createdByUserId: 'user_emily',
  },
  {
    id: 'list_social',
    folderId: 'folder_marketing',
    teamId: 'team_acme',
    name: 'Social Media Calendar',
    createdAt: '2024-03-01',
    createdByUserId: 'user_carol',
  },
  {
    id: 'list_analytics',
    folderId: 'folder_marketing',
    teamId: 'team_acme',
    name: 'Analytics Tasks',
    createdAt: '2024-03-15',
    createdByUserId: 'user_emily',
  },
  // Product
  {
    id: 'list_q3_roadmap',
    folderId: 'folder_product',
    teamId: 'team_acme',
    name: 'Q3 Roadmap',
    createdAt: '2024-03-20',
    createdByUserId: 'user_alice',
  },
  {
    id: 'list_user_research',
    folderId: 'folder_product',
    teamId: 'team_acme',
    name: 'User Research',
    createdAt: '2024-03-20',
    createdByUserId: 'user_alice',
  },
  {
    id: 'list_feature_requests',
    folderId: 'folder_product',
    teamId: 'team_acme',
    name: 'Feature Requests',
    createdAt: '2024-02-15',
    createdByUserId: 'user_bob',
  },
  // Design
  {
    id: 'list_ui_components',
    folderId: 'folder_design',
    teamId: 'team_acme',
    name: 'UI Component Library',
    createdAt: '2024-02-10',
    createdByUserId: 'user_carol',
  },
  {
    id: 'list_brand_refresh',
    folderId: 'folder_design',
    teamId: 'team_acme',
    name: 'Brand Refresh',
    createdAt: '2024-03-01',
    createdByUserId: 'user_carol',
  },
];

// ─── Tasks ────────────────────────────────────────────────────────────────────

// Helper: today relative dates for realistic due dates
const today = new Date();
const dateOffset = (days: number) => {
  const d = new Date(today);
  d.setDate(d.getDate() + days);
  return d.toISOString().split('T')[0];
};

export const tasks: Task[] = [
  // Sprint 23 Backlog
  {
    id: 'task_s23_1',
    listId: 'list_sprint23',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    title: 'Implement OAuth 2.0 login flow',
    description: 'Add Google and GitHub OAuth providers using the existing auth abstraction layer.',
    status: 'in_progress',
    priority: 'high',
    assigneeId: 'user_bob',
    dueDate: dateOffset(2),
    createdAt: '2024-04-01',
    createdByUserId: 'user_alice',
  },
  {
    id: 'task_s23_2',
    listId: 'list_sprint23',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    title: 'Migrate database to PostgreSQL 16',
    description: 'Upgrade from PostgreSQL 14. Run full test suite after migration.',
    status: 'todo',
    priority: 'high',
    assigneeId: 'user_alice',
    dueDate: dateOffset(5),
    createdAt: '2024-04-01',
    createdByUserId: 'user_alice',
  },
  {
    id: 'task_s23_3',
    listId: 'list_sprint23',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    title: 'Add pagination to the activity feed API',
    status: 'done',
    priority: 'medium',
    assigneeId: 'user_bob',
    dueDate: dateOffset(-2),
    createdAt: '2024-04-01',
    createdByUserId: 'user_alice',
    completedAt: dateOffset(-1),
  },
  {
    id: 'task_s23_4',
    listId: 'list_sprint23',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    title: 'Write unit tests for the billing module',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'user_david',
    dueDate: dateOffset(7),
    createdAt: '2024-04-02',
    createdByUserId: 'user_alice',
  },
  {
    id: 'task_s23_5',
    listId: 'list_sprint23',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    title: 'Set up Redis caching for search results',
    status: 'in_progress',
    priority: 'medium',
    assigneeId: 'user_bob',
    dueDate: dateOffset(3),
    createdAt: '2024-04-02',
    createdByUserId: 'user_bob',
  },
  {
    id: 'task_s23_6',
    listId: 'list_sprint23',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    title: 'Refactor notification service interface',
    status: 'done',
    priority: 'low',
    assigneeId: 'user_david',
    createdAt: '2024-04-03',
    createdByUserId: 'user_alice',
    completedAt: dateOffset(-3),
  },
  {
    id: 'task_s23_7',
    listId: 'list_sprint23',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    title: 'Investigate slow query on the reports endpoint',
    status: 'todo',
    priority: 'high',
    assigneeId: 'user_alice',
    dueDate: dateOffset(0),
    createdAt: '2024-04-04',
    createdByUserId: 'user_alice',
  },

  // Bug Tracker
  {
    id: 'task_bug_1',
    listId: 'list_bugs',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    title: 'Fix race condition in the webhook processor',
    description: 'Two simultaneous pushes occasionally trigger duplicate page generation.',
    status: 'in_progress',
    priority: 'high',
    assigneeId: 'user_bob',
    dueDate: dateOffset(1),
    createdAt: '2024-04-05',
    createdByUserId: 'user_alice',
  },
  {
    id: 'task_bug_2',
    listId: 'list_bugs',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    title: 'Avatar upload silently fails on Safari',
    description: "File input change event doesn't fire on Safari 16.x — need a workaround.",
    status: 'todo',
    priority: 'medium',
    assigneeId: 'user_carol',
    dueDate: dateOffset(4),
    createdAt: '2024-04-06',
    createdByUserId: 'user_carol',
  },
  {
    id: 'task_bug_3',
    listId: 'list_bugs',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    title: 'Dark mode flash on hard reload',
    description: 'The anti-FOUC script is loading after hydration in some edge cases.',
    status: 'done',
    priority: 'low',
    assigneeId: 'user_david',
    createdAt: '2024-04-07',
    createdByUserId: 'user_david',
    completedAt: dateOffset(-4),
  },
  {
    id: 'task_bug_4',
    listId: 'list_bugs',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    title: 'Sidebar collapses unexpectedly on mobile',
    status: 'todo',
    priority: 'medium',
    dueDate: dateOffset(-1),
    createdAt: '2024-04-08',
    createdByUserId: 'user_alice',
  },
  {
    id: 'task_bug_5',
    listId: 'list_bugs',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    title: 'JWT refresh token not persisted after SSO login',
    status: 'in_progress',
    priority: 'high',
    assigneeId: 'user_alice',
    dueDate: dateOffset(0),
    createdAt: '2024-04-09',
    createdByUserId: 'user_emily',
  },
  {
    id: 'task_bug_6',
    listId: 'list_bugs',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    title: 'Export CSV button doesn\'t work for empty results',
    status: 'done',
    priority: 'low',
    assigneeId: 'user_bob',
    createdAt: '2024-04-10',
    createdByUserId: 'user_bob',
    completedAt: dateOffset(-2),
  },

  // Tech Debt
  {
    id: 'task_td_1',
    listId: 'list_techdebt',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    title: 'Replace deprecated `createReactClass` usage',
    status: 'todo',
    priority: 'low',
    dueDate: dateOffset(30),
    createdAt: '2024-02-10',
    createdByUserId: 'user_bob',
  },
  {
    id: 'task_td_2',
    listId: 'list_techdebt',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    title: 'Upgrade Prisma to v6 and run migration tests',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'user_alice',
    dueDate: dateOffset(14),
    createdAt: '2024-03-01',
    createdByUserId: 'user_alice',
  },
  {
    id: 'task_td_3',
    listId: 'list_techdebt',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    title: 'Remove dead code in the legacy importer module',
    status: 'done',
    priority: 'low',
    assigneeId: 'user_david',
    createdAt: '2024-03-10',
    createdByUserId: 'user_david',
    completedAt: dateOffset(-7),
  },
  {
    id: 'task_td_4',
    listId: 'list_techdebt',
    folderId: 'folder_engineering',
    teamId: 'team_acme',
    title: 'Consolidate duplicate utility functions across lib/helpers',
    status: 'in_progress',
    priority: 'low',
    assigneeId: 'user_bob',
    dueDate: dateOffset(10),
    createdAt: '2024-03-15',
    createdByUserId: 'user_bob',
  },

  // Q2 Campaigns
  {
    id: 'task_mkt_1',
    listId: 'list_q2_campaigns',
    folderId: 'folder_marketing',
    teamId: 'team_acme',
    title: 'Launch email re-engagement campaign',
    description: 'Target churned users from Q1 with a "what\'s new" sequence.',
    status: 'in_progress',
    priority: 'high',
    assigneeId: 'user_emily',
    dueDate: dateOffset(3),
    createdAt: '2024-03-01',
    createdByUserId: 'user_emily',
  },
  {
    id: 'task_mkt_2',
    listId: 'list_q2_campaigns',
    folderId: 'folder_marketing',
    teamId: 'team_acme',
    title: 'Write copy for Google Ads A/B test',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'user_carol',
    dueDate: dateOffset(6),
    createdAt: '2024-03-05',
    createdByUserId: 'user_emily',
  },
  {
    id: 'task_mkt_3',
    listId: 'list_q2_campaigns',
    folderId: 'folder_marketing',
    teamId: 'team_acme',
    title: 'Set up UTM tracking for all campaign links',
    status: 'done',
    priority: 'high',
    assigneeId: 'user_emily',
    createdAt: '2024-03-05',
    createdByUserId: 'user_emily',
    completedAt: dateOffset(-5),
  },
  {
    id: 'task_mkt_4',
    listId: 'list_q2_campaigns',
    folderId: 'folder_marketing',
    teamId: 'team_acme',
    title: 'Brief design team on landing page refresh',
    status: 'done',
    priority: 'medium',
    assigneeId: 'user_emily',
    createdAt: '2024-03-08',
    createdByUserId: 'user_emily',
    completedAt: dateOffset(-8),
  },
  {
    id: 'task_mkt_5',
    listId: 'list_q2_campaigns',
    folderId: 'folder_marketing',
    teamId: 'team_acme',
    title: 'Negotiate influencer partnerships for product launch',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'user_carol',
    dueDate: dateOffset(12),
    createdAt: '2024-03-10',
    createdByUserId: 'user_emily',
  },

  // Social Media Calendar
  {
    id: 'task_social_1',
    listId: 'list_social',
    folderId: 'folder_marketing',
    teamId: 'team_acme',
    title: 'Schedule 3 LinkedIn posts for product launch week',
    status: 'todo',
    priority: 'high',
    assigneeId: 'user_carol',
    dueDate: dateOffset(2),
    createdAt: '2024-03-20',
    createdByUserId: 'user_carol',
  },
  {
    id: 'task_social_2',
    listId: 'list_social',
    folderId: 'folder_marketing',
    teamId: 'team_acme',
    title: 'Design Twitter/X announcement graphics',
    status: 'in_progress',
    priority: 'medium',
    assigneeId: 'user_carol',
    dueDate: dateOffset(4),
    createdAt: '2024-03-20',
    createdByUserId: 'user_carol',
  },
  {
    id: 'task_social_3',
    listId: 'list_social',
    folderId: 'folder_marketing',
    teamId: 'team_acme',
    title: 'Respond to pending customer DMs',
    status: 'done',
    priority: 'low',
    assigneeId: 'user_emily',
    createdAt: '2024-03-21',
    createdByUserId: 'user_emily',
    completedAt: dateOffset(-1),
  },

  // Analytics Tasks
  {
    id: 'task_analytics_1',
    listId: 'list_analytics',
    folderId: 'folder_marketing',
    teamId: 'team_acme',
    title: 'Set up conversion funnel tracking in PostHog',
    status: 'todo',
    priority: 'high',
    assigneeId: 'user_emily',
    dueDate: dateOffset(0),
    createdAt: '2024-03-15',
    createdByUserId: 'user_emily',
  },
  {
    id: 'task_analytics_2',
    listId: 'list_analytics',
    folderId: 'folder_marketing',
    teamId: 'team_acme',
    title: 'Create Q1 performance report for exec team',
    status: 'done',
    priority: 'high',
    assigneeId: 'user_emily',
    createdAt: '2024-03-20',
    createdByUserId: 'user_emily',
    completedAt: dateOffset(-6),
  },
  {
    id: 'task_analytics_3',
    listId: 'list_analytics',
    folderId: 'folder_marketing',
    teamId: 'team_acme',
    title: 'Identify top landing pages by bounce rate',
    status: 'in_progress',
    priority: 'medium',
    assigneeId: 'user_carol',
    dueDate: dateOffset(5),
    createdAt: '2024-03-25',
    createdByUserId: 'user_emily',
  },

  // Q3 Roadmap
  {
    id: 'task_roadmap_1',
    listId: 'list_q3_roadmap',
    folderId: 'folder_product',
    teamId: 'team_acme',
    title: 'Define success metrics for the Q3 roadmap',
    status: 'done',
    priority: 'high',
    assigneeId: 'user_alice',
    createdAt: '2024-03-20',
    createdByUserId: 'user_alice',
    completedAt: dateOffset(-10),
  },
  {
    id: 'task_roadmap_2',
    listId: 'list_q3_roadmap',
    folderId: 'folder_product',
    teamId: 'team_acme',
    title: 'Write PRD for the self-serve onboarding flow',
    status: 'in_progress',
    priority: 'high',
    assigneeId: 'user_alice',
    dueDate: dateOffset(4),
    createdAt: '2024-03-22',
    createdByUserId: 'user_alice',
  },
  {
    id: 'task_roadmap_3',
    listId: 'list_q3_roadmap',
    folderId: 'folder_product',
    teamId: 'team_acme',
    title: 'Scope the in-app notification center feature',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'user_alice',
    dueDate: dateOffset(9),
    createdAt: '2024-03-25',
    createdByUserId: 'user_alice',
  },
  {
    id: 'task_roadmap_4',
    listId: 'list_q3_roadmap',
    folderId: 'folder_product',
    teamId: 'team_acme',
    title: 'Compile competitive analysis for document generation market',
    status: 'todo',
    priority: 'low',
    assigneeId: 'user_bob',
    dueDate: dateOffset(14),
    createdAt: '2024-03-28',
    createdByUserId: 'user_alice',
  },
  {
    id: 'task_roadmap_5',
    listId: 'list_q3_roadmap',
    folderId: 'folder_product',
    teamId: 'team_acme',
    title: 'Schedule roadmap review with engineering leads',
    status: 'done',
    priority: 'medium',
    assigneeId: 'user_alice',
    createdAt: '2024-04-01',
    createdByUserId: 'user_alice',
    completedAt: dateOffset(-3),
  },

  // User Research
  {
    id: 'task_research_1',
    listId: 'list_user_research',
    folderId: 'folder_product',
    teamId: 'team_acme',
    title: 'Conduct 5 user interviews on the new onboarding flow',
    status: 'in_progress',
    priority: 'high',
    assigneeId: 'user_alice',
    dueDate: dateOffset(7),
    createdAt: '2024-03-28',
    createdByUserId: 'user_alice',
  },
  {
    id: 'task_research_2',
    listId: 'list_user_research',
    folderId: 'folder_product',
    teamId: 'team_acme',
    title: 'Synthesize survey results from Q1 NPS campaign',
    status: 'done',
    priority: 'high',
    assigneeId: 'user_alice',
    createdAt: '2024-03-15',
    createdByUserId: 'user_alice',
    completedAt: dateOffset(-9),
  },
  {
    id: 'task_research_3',
    listId: 'list_user_research',
    folderId: 'folder_product',
    teamId: 'team_acme',
    title: 'Set up Maze prototype test for the settings redesign',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'user_carol',
    dueDate: dateOffset(11),
    createdAt: '2024-04-02',
    createdByUserId: 'user_alice',
  },

  // Feature Requests
  {
    id: 'task_fr_1',
    listId: 'list_feature_requests',
    folderId: 'folder_product',
    teamId: 'team_acme',
    title: 'CSV export for task lists',
    description: 'Requested by 12 enterprise customers in the last quarter.',
    status: 'todo',
    priority: 'high',
    dueDate: dateOffset(20),
    createdAt: '2024-02-15',
    createdByUserId: 'user_bob',
  },
  {
    id: 'task_fr_2',
    listId: 'list_feature_requests',
    folderId: 'folder_product',
    teamId: 'team_acme',
    title: 'Recurring task support',
    description: 'Daily, weekly, monthly recurrence patterns with end dates.',
    status: 'todo',
    priority: 'medium',
    createdAt: '2024-02-20',
    createdByUserId: 'user_alice',
  },
  {
    id: 'task_fr_3',
    listId: 'list_feature_requests',
    folderId: 'folder_product',
    teamId: 'team_acme',
    title: 'Keyboard shortcut for quick task creation',
    status: 'done',
    priority: 'low',
    assigneeId: 'user_david',
    createdAt: '2024-03-01',
    createdByUserId: 'user_david',
    completedAt: dateOffset(-5),
  },
  {
    id: 'task_fr_4',
    listId: 'list_feature_requests',
    folderId: 'folder_product',
    teamId: 'team_acme',
    title: 'Bulk-assign tasks to a team member',
    status: 'in_progress',
    priority: 'medium',
    assigneeId: 'user_bob',
    dueDate: dateOffset(8),
    createdAt: '2024-03-10',
    createdByUserId: 'user_alice',
  },

  // UI Component Library
  {
    id: 'task_ui_1',
    listId: 'list_ui_components',
    folderId: 'folder_design',
    teamId: 'team_acme',
    title: 'Design the data table component variants',
    description: 'Sortable columns, pagination controls, and empty states.',
    status: 'in_progress',
    priority: 'high',
    assigneeId: 'user_carol',
    dueDate: dateOffset(3),
    createdAt: '2024-02-10',
    createdByUserId: 'user_carol',
  },
  {
    id: 'task_ui_2',
    listId: 'list_ui_components',
    folderId: 'folder_design',
    teamId: 'team_acme',
    title: 'Finalize color token documentation in Figma',
    status: 'done',
    priority: 'medium',
    assigneeId: 'user_carol',
    createdAt: '2024-02-15',
    createdByUserId: 'user_carol',
    completedAt: dateOffset(-6),
  },
  {
    id: 'task_ui_3',
    listId: 'list_ui_components',
    folderId: 'folder_design',
    teamId: 'team_acme',
    title: 'Create tooltip and popover component specs',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'user_carol',
    dueDate: dateOffset(10),
    createdAt: '2024-02-20',
    createdByUserId: 'user_carol',
  },
  {
    id: 'task_ui_4',
    listId: 'list_ui_components',
    folderId: 'folder_design',
    teamId: 'team_acme',
    title: 'Design skeleton loading states for all card types',
    status: 'todo',
    priority: 'low',
    dueDate: dateOffset(15),
    createdAt: '2024-03-01',
    createdByUserId: 'user_carol',
  },
  {
    id: 'task_ui_5',
    listId: 'list_ui_components',
    folderId: 'folder_design',
    teamId: 'team_acme',
    title: 'Audit existing icons and replace non-standard ones',
    status: 'done',
    priority: 'low',
    assigneeId: 'user_carol',
    createdAt: '2024-03-05',
    createdByUserId: 'user_carol',
    completedAt: dateOffset(-4),
  },

  // Brand Refresh
  {
    id: 'task_brand_1',
    listId: 'list_brand_refresh',
    folderId: 'folder_design',
    teamId: 'team_acme',
    title: 'Create new logo variations (light, dark, icon only)',
    status: 'done',
    priority: 'high',
    assigneeId: 'user_carol',
    createdAt: '2024-03-01',
    createdByUserId: 'user_emily',
    completedAt: dateOffset(-12),
  },
  {
    id: 'task_brand_2',
    listId: 'list_brand_refresh',
    folderId: 'folder_design',
    teamId: 'team_acme',
    title: 'Define updated typography scale',
    status: 'done',
    priority: 'high',
    assigneeId: 'user_carol',
    createdAt: '2024-03-05',
    createdByUserId: 'user_carol',
    completedAt: dateOffset(-8),
  },
  {
    id: 'task_brand_3',
    listId: 'list_brand_refresh',
    folderId: 'folder_design',
    teamId: 'team_acme',
    title: 'Update all marketing site screenshots and hero images',
    status: 'in_progress',
    priority: 'medium',
    assigneeId: 'user_carol',
    dueDate: dateOffset(6),
    createdAt: '2024-03-10',
    createdByUserId: 'user_emily',
  },
  {
    id: 'task_brand_4',
    listId: 'list_brand_refresh',
    folderId: 'folder_design',
    teamId: 'team_acme',
    title: 'Publish updated brand guidelines to Notion',
    status: 'todo',
    priority: 'medium',
    assigneeId: 'user_carol',
    dueDate: dateOffset(9),
    createdAt: '2024-03-15',
    createdByUserId: 'user_emily',
  },
];

// ─── Activity Feed ─────────────────────────────────────────────────────────────

export const recentActivity: ActivityItem[] = [
  {
    id: 'act_1',
    userId: 'user_bob',
    action: 'completed',
    target: 'Add pagination to the activity feed API',
    targetType: 'task',
    timestamp: new Date(Date.now() - 1000 * 60 * 25).toISOString(),
  },
  {
    id: 'act_2',
    userId: 'user_carol',
    action: 'created',
    target: 'Design the data table component variants',
    targetType: 'task',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
  {
    id: 'act_3',
    userId: 'user_emily',
    action: 'started',
    target: 'Launch email re-engagement campaign',
    targetType: 'task',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4).toISOString(),
  },
  {
    id: 'act_4',
    userId: 'user_alice',
    action: 'created',
    target: 'Q3 Roadmap',
    targetType: 'list',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString(),
  },
  {
    id: 'act_5',
    userId: 'user_david',
    action: 'completed',
    target: 'Remove dead code in the legacy importer module',
    targetType: 'task',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
  },
  {
    id: 'act_6',
    userId: 'user_alice',
    action: 'created',
    target: 'Design',
    targetType: 'folder',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48).toISOString(),
  },
  {
    id: 'act_7',
    userId: 'user_emily',
    action: 'invited',
    target: 'david@acme.com',
    targetType: 'member',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72).toISOString(),
  },
];

// ─── Computed Helpers ─────────────────────────────────────────────────────────

/** Returns a folder by ID, or undefined. */
export function getFolderById(id: string): Folder | undefined {
  return folders.find((f) => f.id === id);
}

/** Returns a task list by ID, or undefined. */
export function getListById(id: string): TaskList | undefined {
  return taskLists.find((l) => l.id === id);
}

/** Returns all tasks for a given list ID. */
export function getTasksByListId(listId: string): Task[] {
  return tasks.filter((t) => t.listId === listId);
}

/** Returns all task lists for a given folder ID. */
export function getListsByFolderId(folderId: string): TaskList[] {
  return taskLists.filter((l) => l.folderId === folderId);
}

/** Returns a member by ID, or undefined. */
export function getMemberById(id: string): Member | undefined {
  return members.find((m) => m.id === id);
}

/** Returns aggregate stats for a folder. */
export function getFolderStats(folderId: string): {
  listCount: number;
  taskCount: number;
  completedCount: number;
} {
  const lists = getListsByFolderId(folderId);
  const folderTasks = tasks.filter((t) => t.folderId === folderId);
  return {
    listCount: lists.length,
    taskCount: folderTasks.length,
    completedCount: folderTasks.filter((t) => t.status === 'done').length,
  };
}

/** Returns aggregate stats for a task list. */
export function getListStats(listId: string): {
  taskCount: number;
  completedCount: number;
  percentage: number;
} {
  const listTasks = getTasksByListId(listId);
  const completedCount = listTasks.filter((t) => t.status === 'done').length;
  return {
    taskCount: listTasks.length,
    completedCount,
    percentage: listTasks.length === 0 ? 0 : Math.round((completedCount / listTasks.length) * 100),
  };
}

/** Returns high-level stats for the team dashboard. */
export function getDashboardStats(): {
  dueTodayCount: number;
  overdueCount: number;
  completedThisWeekCount: number;
  totalMembers: number;
} {
  const todayStr = dateOffset(0);
  const weekAgoStr = dateOffset(-7);

  const dueTodayCount = tasks.filter(
    (t) => t.status !== 'done' && t.dueDate === todayStr,
  ).length;

  const overdueCount = tasks.filter(
    (t) => t.status !== 'done' && t.dueDate !== undefined && t.dueDate < todayStr,
  ).length;

  const completedThisWeekCount = tasks.filter(
    (t) => t.status === 'done' && t.completedAt !== undefined && t.completedAt >= weekAgoStr,
  ).length;

  return {
    dueTodayCount,
    overdueCount,
    completedThisWeekCount,
    totalMembers: members.length,
  };
}

/** Returns a human-readable relative time string for an ISO timestamp. */
export function formatRelativeTime(isoTimestamp: string): string {
  const now = Date.now();
  const then = new Date(isoTimestamp).getTime();
  const diffMs = now - then;
  const diffMin = Math.floor(diffMs / (1000 * 60));
  const diffHr = Math.floor(diffMs / (1000 * 60 * 60));
  const diffDay = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffMin < 1) return 'just now';
  if (diffMin < 60) return `${diffMin}m ago`;
  if (diffHr < 24) return `${diffHr}h ago`;
  return `${diffDay}d ago`;
}
