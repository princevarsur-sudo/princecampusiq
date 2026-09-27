import {
  Opportunity,
  TrackedItem,
  FocusChecklistItem,
  NotificationItem,
  PeerTeammate,
  TrackerStage,
} from '../types';
import {
  ALL_OPPORTUNITIES,
  INITIAL_TRACKED_ITEMS,
  INITIAL_FOCUS_CHECKLIST,
  INITIAL_NOTIFICATIONS,
  INITIAL_PEERS,
  USER_PROFILE,
  COPILOT_KNOWLEDGE_BASE,
} from '../data/mockData';

const BASE_URL = '/api';

export const api = {
  // Opportunities
  async getOpportunities(params?: {
    category?: string;
    mode?: string;
    search?: string;
  }): Promise<Opportunity[]> {
    try {
      const query = new URLSearchParams();
      if (params?.category && params.category !== 'All') query.append('category', params.category);
      if (params?.mode && params.mode !== 'All') query.append('mode', params.mode);
      if (params?.search) query.append('search', params.search);

      const res = await fetch(`${BASE_URL}/opportunities?${query.toString()}`);
      if (!res.ok) throw new Error('Failed to fetch opportunities from server');
      const data = await res.json();
      return data.opportunities;
    } catch {
      // Fallback gracefully
      return ALL_OPPORTUNITIES;
    }
  },

  async getOpportunity(id: string): Promise<Opportunity | null> {
    try {
      const res = await fetch(`${BASE_URL}/opportunities/${id}`);
      if (!res.ok) throw new Error('Not found');
      return await res.json();
    } catch {
      return ALL_OPPORTUNITIES.find((o) => o.id === id) || null;
    }
  },

  async toggleSave(id: string): Promise<{ isSaved: boolean }> {
    try {
      const res = await fetch(`${BASE_URL}/opportunities/${id}/save`, { method: 'POST' });
      if (!res.ok) throw new Error('Save error');
      return await res.json();
    } catch {
      return { isSaved: true };
    }
  },

  // Pipeline Tracker
  async getTrackedItems(): Promise<TrackedItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/tracker`);
      if (!res.ok) throw new Error('Failed to fetch tracker');
      const data = await res.json();
      return data.items;
    } catch {
      return INITIAL_TRACKED_ITEMS;
    }
  },

  async addTrackedItem(item: Partial<TrackedItem>): Promise<TrackedItem> {
    try {
      const res = await fetch(`${BASE_URL}/tracker`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(item),
      });
      if (!res.ok) throw new Error('Failed to add item');
      return await res.json();
    } catch {
      return item as TrackedItem;
    }
  },

  async updateStage(itemId: string, newStage: TrackerStage): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/tracker/${itemId}/stage`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ stage: newStage }),
      });
      return res.ok;
    } catch {
      return true;
    }
  },

  async deleteTrackedItem(itemId: string): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/tracker/${itemId}`, { method: 'DELETE' });
      return res.ok;
    } catch {
      return true;
    }
  },

  // Peers
  async getPeers(): Promise<PeerTeammate[]> {
    try {
      const res = await fetch(`${BASE_URL}/peers`);
      if (!res.ok) throw new Error('Failed to fetch peers');
      const data = await res.json();
      return data.peers;
    } catch {
      return INITIAL_PEERS;
    }
  },

  async connectPeer(peerId: string): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/peers/${peerId}/connect`, { method: 'POST' });
      return res.ok;
    } catch {
      return true;
    }
  },

  // Focus Checklist
  async getFocusItems(): Promise<FocusChecklistItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/focus-checklist`);
      if (!res.ok) throw new Error('Failed to fetch focus items');
      const data = await res.json();
      return data.items;
    } catch {
      return INITIAL_FOCUS_CHECKLIST;
    }
  },

  async toggleFocusItem(id: string): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/focus-checklist/${id}`, { method: 'PATCH' });
      return res.ok;
    } catch {
      return true;
    }
  },

  // Notifications
  async getNotifications(): Promise<NotificationItem[]> {
    try {
      const res = await fetch(`${BASE_URL}/notifications`);
      if (!res.ok) throw new Error('Failed to fetch notifications');
      const data = await res.json();
      return data.notifications;
    } catch {
      return INITIAL_NOTIFICATIONS;
    }
  },

  async markAllNotificationsRead(): Promise<boolean> {
    try {
      const res = await fetch(`${BASE_URL}/notifications/read-all`, { method: 'POST' });
      return res.ok;
    } catch {
      return true;
    }
  },

  // Profile
  async getProfile(): Promise<typeof USER_PROFILE> {
    try {
      const res = await fetch(`${BASE_URL}/profile`);
      if (!res.ok) throw new Error('Failed to fetch profile');
      return await res.json();
    } catch {
      return USER_PROFILE;
    }
  },

  // AI Copilot
  async chatWithCopilot(
    prompt: string,
  ): Promise<{ response: string; badge: string; source: 'gemini' | 'knowledge_base' }> {
    try {
      const res = await fetch(`${BASE_URL}/copilot/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });
      if (!res.ok) throw new Error('Copilot API error');
      return await res.json();
    } catch {
      // Local fallback
      const lower = prompt.toLowerCase();
      for (const [key, val] of Object.entries(COPILOT_KNOWLEDGE_BASE)) {
        if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
          return { response: val.response, badge: val.badge || 'Case Intelligence', source: 'knowledge_base' };
        }
      }
      return {
        response: `Strategic analysis for "${prompt}": Aligned with your MBA '26 Business Analytics focus. Recommend scheduling time to polish the submission before the upcoming deadline.`,
        badge: 'CampusIQ Advisor',
        source: 'knowledge_base',
      };
    }
  },
};
