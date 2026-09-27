import React from 'react';
import { TabType } from '../types';
import { USER_PROFILE } from '../data/mockData';

interface SidebarProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ currentTab, onSelectTab }) => {
  const navItems: {
    id: TabType;
    label: string;
    icon: string;
    iconColor: string;
  }[] = [
    {
      id: 'opportunity-radar',
      label: 'Opportunity Radar',
      icon: 'radar',
      iconColor: 'text-[#A78BFA]',
    },
    {
      id: 'discover',
      label: 'Discover Hub',
      icon: 'explore',
      iconColor: 'text-[#F472B6]',
    },
    {
      id: 'opportunity-detail',
      label: 'Opportunity Detail',
      icon: 'domain_verification',
      iconColor: 'text-[#818CF8]',
    },
    {
      id: 'my-tracker',
      label: 'My Tracker',
      icon: 'view_kanban',
      iconColor: 'text-[#38BDF8]',
    },
    {
      id: 'calendar',
      label: 'Recruiting Calendar',
      icon: 'calendar_month',
      iconColor: 'text-[#FB923C]',
    },
    {
      id: 'profile',
      label: 'Student Profile',
      icon: 'badge',
      iconColor: 'text-[#FBBF24]',
    },
  ];

  return (
    <aside className="fixed left-0 top-16 bottom-0 w-64 bg-white/70 backdrop-blur-xl border-r border-pink-100 shadow-[4px_0_24px_rgba(244,114,182,0.04)] z-30 flex flex-col justify-between py-6">
      {/* Top Section */}
      <div className="flex flex-col gap-6 px-4">
        {/* Cohort Header */}
        <div className="px-3.5 py-3 rounded-2xl bg-gradient-to-r from-pink-50/80 via-purple-50/70 to-sky-50/60 border border-pink-100/70 shadow-xs">
          <span className="font-label-caps text-label-caps uppercase text-purple-600/80 tracking-wider font-extrabold block">
            Academic Cohort
          </span>
          <p className="font-headline-sm text-headline-sm text-[#272239] font-extrabold mt-0.5">
            {USER_PROFILE.cohort} 🎓
          </p>
          <div className="flex items-center gap-1.5 mt-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 ring-2 ring-emerald-100 animate-pulse" />
            <span className="font-label-caps text-label-caps text-emerald-700 font-bold">
              Recruiting Sprint Live
            </span>
          </div>
        </div>

        {/* Navigation Items */}
        <nav className="flex flex-col gap-1.5">
          {navItems.map((item) => {
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`flex items-center gap-3 px-3.5 py-2.5 rounded-2xl font-label-lg text-label-lg transition-all cursor-pointer text-left ${
                  isActive
                    ? 'bg-gradient-to-r from-purple-100 via-pink-100 to-rose-50 text-purple-950 font-extrabold border border-purple-200/80 shadow-xs'
                    : 'text-purple-900/70 hover:bg-pink-50/70 hover:text-purple-950 font-semibold'
                }`}
              >
                <span className={`material-symbols-outlined text-[20px] ${item.iconColor}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section */}
      <div className="px-4 flex flex-col gap-3">
        {/* Fit Score Widget */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-br from-pink-50 via-purple-50 to-sky-50 border border-pink-100/80 flex flex-col gap-2 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="font-label-caps text-label-caps text-purple-800 font-bold uppercase tracking-wide">
              Profile Fit IQ
            </span>
            <span className="font-label-md text-label-md text-pink-600 font-extrabold">
              {USER_PROFILE.profileFitScore}% 🌸
            </span>
          </div>
          <div className="w-full h-2 bg-pink-100 rounded-full overflow-hidden p-0.5 border border-pink-200/50">
            <div
              className="h-full bg-gradient-to-r from-purple-400 via-pink-400 to-rose-400 rounded-full transition-all duration-1000 shadow-xs"
              style={{ width: `${USER_PROFILE.profileFitScore}%` }}
            />
          </div>
          <p className="font-label-caps text-label-caps text-purple-600/80 font-medium">
            Analytics &amp; Strategy focus primed
          </p>
        </div>

        {/* Sync Status */}
        <div className="flex items-center justify-between px-3 text-purple-500/80 font-label-caps text-label-caps font-semibold">
          <span className="flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.6)]" />
            Sync Active
          </span>
          <span>v2.4 MBA</span>
        </div>
      </div>
    </aside>
  );
};
