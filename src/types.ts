export type TabType =
  | 'opportunity-radar'
  | 'discover'
  | 'opportunity-detail'
  | 'my-tracker'
  | 'calendar'
  | 'profile';

export type OpportunityCategory =
  | 'Internships'
  | 'Hackathons'
  | 'Case Competitions'
  | 'Research'
  | 'Scholarships'
  | 'Jobs'
  | 'Events & Summits';

export type WorkMode = 'All' | 'Remote' | 'Hybrid' | 'In-Person';

export interface PeerTeammate {
  id: string;
  name: string;
  role: string;
  background: string;
  avatar: string;
  matchSkills: string;
  status?: 'connect' | 'pending' | 'connected';
}

export interface MatchBreakdownItem {
  label: string;
  score: number;
  verified?: boolean;
}

export interface DeliverableItem {
  id: string;
  title: string;
  desc: string;
  phase: string;
  icon: string;
  colorType: 'pink' | 'blue' | 'mint' | 'lavender';
}

export interface TimelineMilestone {
  title: string;
  date: string;
  desc: string;
  status: 'Closed' | 'Remaining' | 'Upcoming' | 'Final';
  badgeText: string;
}

export interface Opportunity {
  id: string;
  title: string;
  company: string;
  companyLogo: string;
  category: OpportunityCategory;
  categoryBadge: string;
  matchScore: number;
  deadline: string;
  daysLeft: number;
  location: string;
  mode: WorkMode;
  reward: string;
  stipendOrPrize?: string;
  eligibility: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  teamSize?: string;
  formatVenue?: string;
  description: string;
  problemStatement?: string;
  trackName?: string;
  pillars?: {
    title: string;
    desc: string;
    icon: string;
    color: string;
  }[];
  heroImage?: string;
  fieldNotice?: string;
  matchBreakdown?: MatchBreakdownItem[];
  deliverables?: DeliverableItem[];
  timeline?: TimelineMilestone[];
  peers?: PeerTeammate[];
  pastWinner?: {
    award: string;
    team: string;
    title: string;
    summary: string;
    slides: number;
  };
  isSaved?: boolean;
}

export type TrackerStage =
  | 'saved'
  | 'preparing'
  | 'applied'
  | 'shortlisted'
  | 'interview'
  | 'selected';

export interface TrackedItem {
  id: string;
  opportunityId: string;
  title: string;
  company: string;
  companyLogo: string;
  category: string;
  matchScore: number;
  stage: TrackerStage;
  dueDate: string;
  deadlineWarning?: string;
  nextAction: string;
  nextActionIcon?: string;
  nextActionSubtext?: string;
  progressPercent?: number;
  assignedPeerAvatar?: string;
  assignedPeerNote?: string;
  interviewSlot?: string;
  interviewNote?: string;
  grantWon?: string;
  appId?: string;
  statusLabel?: string;
  teamSpots?: string;
  teamAvatars?: string[];
  notes?: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  subtitle: string;
  timeAgo: string;
  unread: boolean;
  type: 'urgent' | 'match' | 'new' | 'deadline';
  targetTab: TabType;
  opportunityId?: string;
}

export interface FocusChecklistItem {
  id: string;
  title: string;
  subtitle: string;
  completed: boolean;
  urgentText?: string;
  tagColor?: string;
}

export interface CopilotMessage {
  id: string;
  sender: 'copilot' | 'user';
  text: string;
  timestamp: string;
  badge?: string;
  actionPrompt?: string;
}
