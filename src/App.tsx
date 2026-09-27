/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { TabType, Opportunity, TrackedItem, FocusChecklistItem, NotificationItem, PeerTeammate } from './types';
import {
  ALL_OPPORTUNITIES,
  INITIAL_TRACKED_ITEMS,
  INITIAL_FOCUS_CHECKLIST,
  INITIAL_NOTIFICATIONS,
  INITIAL_PEERS,
} from './data/mockData';
import { api } from './services/api';
import { Header } from './components/Header';
import { Sidebar } from './components/Sidebar';
import { RadarView } from './components/RadarView';
import { DiscoverHubView } from './components/DiscoverHubView';
import { OpportunityDetailView } from './components/OpportunityDetailView';
import { TrackerView } from './components/TrackerView';
import { CalendarView } from './components/CalendarView';
import { CopilotDrawer } from './components/CopilotDrawer';
import { ProfileModal } from './components/ProfileModal';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('opportunity-radar');
  const [opportunities, setOpportunities] = useState<Opportunity[]>(ALL_OPPORTUNITIES);
  const [trackedItems, setTrackedItems] = useState<TrackedItem[]>(INITIAL_TRACKED_ITEMS);
  const [focusItems, setFocusItems] = useState<FocusChecklistItem[]>(INITIAL_FOCUS_CHECKLIST);
  const [notifications, setNotifications] = useState<NotificationItem[]>(INITIAL_NOTIFICATIONS);
  const [peers, setPeers] = useState<PeerTeammate[]>(INITIAL_PEERS);

  // Selected Opportunity for Detail View
  const [selectedOpportunity, setSelectedOpportunity] = useState<Opportunity>(
    ALL_OPPORTUNITIES[0] || null,
  );

  // Modals & Panels
  const [isCopilotOpen, setIsCopilotOpen] = useState(false);
  const [copilotInitialPrompt, setCopilotInitialPrompt] = useState<string>('');
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  // Toast Notification state
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
  };

  useEffect(() => {
    if (toastMessage) {
      const timer = setTimeout(() => setToastMessage(null), 3500);
      return () => clearTimeout(timer);
    }
  }, [toastMessage]);

  // Initial loading from Node.js Express API
  useEffect(() => {
    async function loadData() {
      try {
        const [loadedOpps, loadedTracked, loadedPeers] = await Promise.all([
          api.getOpportunities(),
          api.getTrackedItems(),
          api.getPeers(),
        ]);
        if (loadedOpps && loadedOpps.length > 0) setOpportunities(loadedOpps);
        if (loadedTracked && loadedTracked.length > 0) setTrackedItems(loadedTracked);
        if (loadedPeers && loadedPeers.length > 0) setPeers(loadedPeers);
      } catch (err) {
        console.warn('API fetch fallback to initial data:', err);
      }
    }
    loadData();
  }, []);

  // Tab switching
  const handleSelectTab = (tab: TabType, opportunityId?: string) => {
    if (tab === 'profile') {
      setIsProfileOpen(true);
      return;
    }

    if (opportunityId) {
      const found = opportunities.find((o) => o.id === opportunityId);
      if (found) {
        setSelectedOpportunity(found);
      }
    }
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Select Opportunity Detail
  const handleSelectOpportunity = (opp: Opportunity) => {
    setSelectedOpportunity(opp);
    setCurrentTab('opportunity-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Toggle Save / Bookmark
  const handleToggleSave = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    api.toggleSave(id);
    setOpportunities((prev) =>
      prev.map((opp) => {
        if (opp.id === id) {
          const nextSaved = !opp.isSaved;
          showToast(
            nextSaved
              ? `Saved "${opp.title}" to your pipeline!`
              : `Removed "${opp.title}" from saved.`,
          );

          // If saving, ensure it exists in tracked items
          if (nextSaved) {
            setTrackedItems((tPrev) => {
              if (tPrev.some((t) => t.opportunityId === id)) return tPrev;
              const newItem: TrackedItem = {
                id: `track-${Date.now()}`,
                opportunityId: opp.id,
                title: opp.title,
                company: opp.company,
                companyLogo: opp.companyLogo,
                category: opp.category,
                matchScore: opp.matchScore,
                stage: 'saved',
                dueDate: opp.deadline,
                nextAction: 'Review case brief & form team',
              };
              api.addTrackedItem(newItem);
              return [newItem, ...tPrev];
            });
          }
          return { ...opp, isSaved: nextSaved };
        }
        return opp;
      }),
    );
  };

  // Add Opportunity directly to Tracker pipeline
  const handleTrackOpportunity = (opp: Opportunity) => {
    setTrackedItems((prev) => {
      if (prev.some((t) => t.opportunityId === opp.id)) {
        showToast(`"${opp.title}" is already in your pipeline!`);
        return prev;
      }
      showToast(`Added "${opp.title}" to In Prep stage!`);
      const newItem: TrackedItem = {
        id: `track-${Date.now()}`,
        opportunityId: opp.id,
        title: opp.title,
        company: opp.company,
        companyLogo: opp.companyLogo,
        category: opp.category,
        matchScore: opp.matchScore,
        stage: 'preparing',
        dueDate: opp.deadline,
        nextAction: 'Round 1 Submission Prep',
      };
      api.addTrackedItem(newItem);
      return [newItem, ...prev];
    });
  };

  // Move stage in Kanban
  const handleMoveStage = (itemId: string, newStage: any) => {
    api.updateStage(itemId, newStage);
    setTrackedItems((prev) =>
      prev.map((item) => {
        if (item.id === itemId) {
          showToast(`Moved "${item.title}" to ${newStage.toUpperCase()}`);
          return { ...item, stage: newStage };
        }
        return item;
      }),
    );
  };

  // Delete tracked item
  const handleDeleteTrackedItem = (itemId: string) => {
    api.deleteTrackedItem(itemId);
    setTrackedItems((prev) => prev.filter((i) => i.id !== itemId));
    showToast('Opportunity removed from pipeline.');
  };

  // Add custom tracked item
  const handleAddTrackedItem = (newItem: Partial<TrackedItem>) => {
    api.addTrackedItem(newItem);
    setTrackedItems((prev) => [newItem as TrackedItem, ...prev]);
    showToast(`Added "${newItem.title}" to pipeline!`);
  };

  // Toggle Focus item
  const handleToggleFocusItem = (id: string) => {
    api.toggleFocusItem(id);
    setFocusItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, completed: !item.completed } : item)),
    );
  };

  // Mark all notifications as read
  const handleMarkNotificationsRead = () => {
    api.markAllNotificationsRead();
    setNotifications((prev) => prev.map((n) => ({ ...n, unread: false })));
  };

  // Open Copilot with prompt
  const handleOpenCopilotWithPrompt = (prompt: string) => {
    setCopilotInitialPrompt(prompt);
    setIsCopilotOpen(true);
  };

  // Connect Peer
  const handleConnectPeer = (peerId: string) => {
    api.connectPeer(peerId);
    setPeers((prev) =>
      prev.map((p) => (p.id === peerId ? { ...p, status: 'connected' } : p)),
    );
    const peer = peers.find((p) => p.id === peerId);
    showToast(`Team invite sent to ${peer?.name || 'teammate'}!`);
  };

  return (
    <div className="min-h-screen bg-[#FAF7F2] text-[#231F20] flex flex-col font-sans antialiased selection:bg-rose-100 selection:text-rose-900">
      {/* Fixed Header */}
      <Header
        currentTab={currentTab}
        onSelectTab={handleSelectTab}
        opportunities={opportunities}
        onSelectOpportunity={handleSelectOpportunity}
        notifications={notifications}
        onMarkAllNotificationsRead={handleMarkNotificationsRead}
        onOpenProfile={() => setIsProfileOpen(true)}
      />

      {/* Main Container with Sidebar + Content */}
      <div className="flex-1 flex pt-16">
        {/* Sticky Left Sidebar (hidden on mobile, visible on lg) */}
        <Sidebar currentTab={currentTab} onSelectTab={handleSelectTab} />

        {/* Content Viewport */}
        <main className="flex-1 min-w-0 px-4 sm:px-6 lg:px-10 py-6 sm:py-8 max-w-7xl mx-auto w-full">
          {currentTab === 'opportunity-radar' && (
            <RadarView
              opportunities={opportunities}
              focusItems={focusItems}
              onToggleFocusItem={handleToggleFocusItem}
              onSelectOpportunity={handleSelectOpportunity}
              onToggleSave={handleToggleSave}
              onOpenCopilotWithPrompt={handleOpenCopilotWithPrompt}
              onNavigateDiscover={() => handleSelectTab('discover')}
            />
          )}

          {currentTab === 'discover' && (
            <DiscoverHubView
              opportunities={opportunities}
              onSelectOpportunity={handleSelectOpportunity}
              onToggleSave={handleToggleSave}
              onTrackOpportunity={handleTrackOpportunity}
            />
          )}

          {currentTab === 'opportunity-detail' && selectedOpportunity && (
            <OpportunityDetailView
              opportunity={selectedOpportunity}
              peers={peers}
              onBack={() => handleSelectTab('opportunity-radar')}
              onToggleSave={handleToggleSave}
              onTrackOpportunity={handleTrackOpportunity}
              onOpenCopilotWithPrompt={handleOpenCopilotWithPrompt}
              onConnectPeer={handleConnectPeer}
            />
          )}

          {currentTab === 'my-tracker' && (
            <TrackerView
              trackedItems={trackedItems}
              onMoveStage={handleMoveStage}
              onSelectItem={(oppId) => {
                const opp = opportunities.find((o) => o.id === oppId);
                if (opp) handleSelectOpportunity(opp);
              }}
              onDeleteItem={handleDeleteTrackedItem}
              onAddItem={handleAddTrackedItem}
            />
          )}

          {currentTab === 'calendar' && (
            <CalendarView
              opportunities={opportunities}
              onSelectOpportunity={handleSelectOpportunity}
            />
          )}
        </main>
      </div>

      {/* Floating CampusIQ Copilot Launcher */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsCopilotOpen(true)}
          className="group relative flex items-center gap-2.5 px-4 py-3 bg-gradient-to-r from-rose-500 via-rose-600 to-amber-500 text-white rounded-full shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-200"
          title="Open CampusIQ Case Copilot"
        >
          <span className="material-symbols-rounded text-xl animate-pulse">auto_awesome</span>
          <span className="text-xs font-extrabold tracking-wide hidden sm:inline">
            CampusIQ Copilot
          </span>

          {/* Pulse ping ring */}
          <span className="absolute -top-1 -right-1 flex h-3.5 w-3.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-3.5 w-3.5 bg-amber-400" />
          </span>
        </button>
      </div>

      {/* Slide-over Copilot Drawer */}
      <CopilotDrawer
        isOpen={isCopilotOpen}
        onClose={() => setIsCopilotOpen(false)}
        initialPrompt={copilotInitialPrompt}
        onClearInitialPrompt={() => setCopilotInitialPrompt('')}
      />

      {/* Profile Modal */}
      <ProfileModal isOpen={isProfileOpen} onClose={() => setIsProfileOpen(false)} />

      {/* Toast Feedback Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <div className="px-4 py-2.5 bg-stone-900 text-white text-xs font-semibold rounded-2xl shadow-xl border border-stone-700 flex items-center gap-2">
            <span className="material-symbols-rounded text-sm text-emerald-400">check_circle</span>
            <span>{toastMessage}</span>
          </div>
        </div>
      )}
    </div>
  );
}
