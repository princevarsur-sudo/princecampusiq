import React, { useState, useRef, useEffect } from 'react';
import { TabType, NotificationItem, Opportunity } from '../types';
import { USER_PROFILE } from '../data/mockData';

interface HeaderProps {
  currentTab: TabType;
  onSelectTab: (tab: TabType, opportunityId?: string) => void;
  notifications: NotificationItem[];
  onMarkNotificationAsRead?: (id: string) => void;
  onMarkAllNotificationsRead?: () => void;
  onOpenCommandPalette?: () => void;
  onSearchClick?: () => void;
  onOpenProfile?: () => void;
  opportunities?: Opportunity[];
  onSelectOpportunity?: (opportunity: Opportunity) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onSelectTab,
  notifications,
  onMarkNotificationAsRead,
  onMarkAllNotificationsRead,
  onOpenCommandPalette,
  onSearchClick,
  onOpenProfile,
  opportunities,
  onSelectOpportunity,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const notifRef = useRef<HTMLDivElement>(null);

  const unreadCount = notifications.filter((n) => n.unread).length;

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks: { id: TabType; label: string }[] = [
    { id: 'opportunity-radar', label: 'Opportunity Radar' },
    { id: 'discover', label: 'Discover' },
    { id: 'opportunity-detail', label: 'Opportunity Detail' },
    { id: 'my-tracker', label: 'My Tracker' },
    { id: 'calendar', label: 'Calendar' },
    { id: 'profile', label: 'Profile' },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-[#FAF7F2]/85 backdrop-blur-xl border-b border-pink-100/70 shadow-[0_4px_20px_-8px_rgba(244,114,182,0.12)]">
      <div className="h-16 w-full px-6 lg:px-8 flex items-center justify-between gap-4">
        {/* Brand Zone */}
        <div className="flex items-center gap-6">
          <button
            onClick={() => onSelectTab('opportunity-radar')}
            className="flex items-center gap-2 cursor-pointer group text-left focus:outline-none"
          >
            <div className="h-9 w-9 rounded-xl bg-gradient-to-tr from-purple-100 via-pink-100 to-sky-100 border border-purple-200/60 flex items-center justify-center p-1 shadow-sm group-hover:scale-105 transition-transform">
              <img
                alt="CampusIQ Logo"
                className="h-7 w-auto object-contain"
                src="https://lh3.googleusercontent.com/aida/AEtjO1VTSVrLfyEelfHnksY-ErnnZKDCDqG2whUTN675_ABEOOzGGh9pxS9b3l8BMGqxSSkU-NMM29E4YeiJG8t54q59ojF6EukLoIobxc3I_bbWtiBZRFnGKtquyhHVfsdVlr3xY6xMfW79WTK358t4fYdflNDHq5R3lObg4_-dkeAFX_CF_shtk2e07uiktp8e7MRsjXHPnMZ6qtEUPauKUDCpiJRi_McnmsYR6sBvi6_Zr7T-BzVdhXrlZkw"
              />
            </div>
            <span className="font-headline-sm text-headline-sm text-[#272239] font-extrabold tracking-tight">
              Campus<span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-500 to-rose-500">IQ</span>
            </span>
            <span className="px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-700 font-label-caps text-label-caps uppercase font-bold tracking-wider border border-pink-200/60 shadow-xs">
              MBA ✨
            </span>
          </button>

          {/* Desktop Navigation Links */}
          <nav className="hidden xl:flex items-center gap-1 bg-white/70 border border-purple-100/80 p-1 rounded-full shadow-inner">
            {navLinks.map((link) => {
              const isActive = currentTab === link.id;
              return (
                <button
                  key={link.id}
                  onClick={() => onSelectTab(link.id)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 text-white shadow-sm shadow-pink-200'
                      : 'text-purple-900/70 hover:text-purple-950 hover:bg-purple-50/60'
                  }`}
                >
                  {link.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Utilities & Profile Zone */}
        <div className="flex items-center gap-3">
          {/* Quick Search Trigger */}
          <button
            onClick={() => {
              if (onSearchClick) onSearchClick();
              else onSelectTab('discover');
            }}
            className="hidden md:flex items-center bg-white/90 border border-pink-100 hover:border-pink-300 px-4 py-1.5 rounded-full shadow-xs hover:shadow-sm focus:outline-none transition-all cursor-pointer group"
          >
            <span className="material-symbols-outlined text-pink-400 group-hover:text-pink-600 text-[18px] mr-2 transition-colors">
              search
            </span>
            <span className="text-left font-body-sm text-body-sm text-purple-950/60 group-hover:text-purple-950 w-36 lg:w-48 truncate">
              Search roles, alumni...
            </span>
            <span
              onClick={(e) => {
                e.stopPropagation();
                if (onOpenCommandPalette) onOpenCommandPalette();
                else onSelectTab('discover');
              }}
              className="ml-2 px-1.5 py-0.5 bg-pink-50 border border-pink-200/50 rounded-md font-label-caps text-label-caps text-pink-600 font-mono shadow-xs hover:bg-pink-100"
              title="Command Palette"
            >
              ⌘K
            </span>
          </button>

          {/* Notifications Dropdown */}
          <div className="relative" ref={notifRef}>
            <button
              aria-label="Notifications"
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 rounded-full text-purple-700/80 hover:text-pink-600 hover:bg-pink-50 border border-transparent hover:border-pink-100 transition-all cursor-pointer"
              type="button"
            >
              <span className="material-symbols-outlined text-[22px]">notifications</span>
              {unreadCount > 0 && (
                <span className="absolute top-1.5 right-1.5 w-2.5 h-2.5 rounded-full bg-pink-500 ring-2 ring-white animate-pulse" />
              )}
            </button>

            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-white/95 backdrop-blur-xl rounded-2xl border border-pink-100 shadow-[0_16px_36px_-8px_rgba(236,72,153,0.18)] p-3 z-50 transform origin-top-right transition-all">
                <div className="flex items-center justify-between px-3 py-2 border-b border-purple-50">
                  <span className="font-label-lg text-label-lg text-[#272239] font-extrabold">
                    Notifications
                  </span>
                  <span className="font-label-caps text-label-caps px-2.5 py-0.5 rounded-full bg-pink-100 text-pink-600 font-bold border border-pink-200/50">
                    {unreadCount} New 🎀
                  </span>
                </div>
                <div className="divide-y divide-purple-50/60 max-h-72 overflow-y-auto">
                  {notifications.map((notif) => (
                    <div
                      key={notif.id}
                      onClick={() => {
                        if (onMarkNotificationAsRead) {
                          onMarkNotificationAsRead(notif.id);
                        } else if (onMarkAllNotificationsRead) {
                          onMarkAllNotificationsRead();
                        }
                        onSelectTab(notif.targetTab, notif.opportunityId);
                        setShowNotifications(false);
                      }}
                      className={`p-2.5 rounded-xl transition-colors cursor-pointer ${
                        notif.unread
                          ? 'bg-pink-50/50 hover:bg-pink-100/60'
                          : 'hover:bg-purple-50/40 opacity-75'
                      }`}
                    >
                      <p className="font-body-sm text-body-sm text-[#272239] font-medium leading-snug">
                        {notif.title}
                      </p>
                      <span className="font-label-caps text-label-caps text-purple-400 block mt-0.5">
                        {notif.subtitle}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* User Profile Pill button */}
          <button
            onClick={() => {
              if (onOpenProfile) onOpenProfile();
              else onSelectTab('profile');
            }}
            className="flex items-center gap-2 pl-2 hover:opacity-90 transition-opacity cursor-pointer group"
          >
            <img
              alt="Profile"
              className="w-9 h-9 rounded-full object-cover ring-2 ring-pink-300 ring-offset-2 ring-offset-[#FAF7F2] shadow-sm group-hover:ring-pink-400 transition-all"
              src={USER_PROFILE.avatar}
            />
            <div className="hidden sm:flex flex-col text-left">
              <span className="font-label-lg text-label-lg text-[#272239] font-bold leading-tight flex items-center gap-1">
                {USER_PROFILE.shortName} <span className="text-xs">✨</span>
              </span>
              <span className="font-label-caps text-label-caps text-purple-500 font-medium">
                {USER_PROFILE.program}
              </span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
