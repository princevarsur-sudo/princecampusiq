import React, { useState } from 'react';
import { Opportunity, FocusChecklistItem } from '../types';

interface RadarViewProps {
  opportunities: Opportunity[];
  focusItems: FocusChecklistItem[];
  onToggleFocusItem: (id: string) => void;
  onSelectOpportunity: (opportunity: Opportunity) => void;
  onToggleBookmark?: (id: string) => void;
  onToggleSave?: (id: string, e: React.MouseEvent) => void;
  onOpenApplyModal?: (opportunity: Opportunity) => void;
  onOpenCopilotWithPrompt: (prompt: string) => void;
  onNavigateToDiscover?: () => void;
  onNavigateDiscover?: () => void;
}

export const RadarView: React.FC<RadarViewProps> = ({
  opportunities,
  focusItems,
  onToggleFocusItem,
  onSelectOpportunity,
  onToggleBookmark,
  onToggleSave,
  onOpenApplyModal,
  onOpenCopilotWithPrompt,
  onNavigateToDiscover,
  onNavigateDiscover,
}) => {
  const handleBookmarkClick = (id: string, e: React.MouseEvent) => {
    if (onToggleSave) {
      onToggleSave(id, e);
    } else if (onToggleBookmark) {
      onToggleBookmark(id);
    }
  };

  const handleDiscoverClick = () => {
    if (onNavigateDiscover) {
      onNavigateDiscover();
    } else if (onNavigateToDiscover) {
      onNavigateToDiscover();
    }
  };

  const handleApplyClick = (opp: Opportunity) => {
    if (onOpenApplyModal) {
      onOpenApplyModal(opp);
    } else {
      onSelectOpportunity(opp);
    }
  };
  const [selectedRadarFilter, setSelectedRadarFilter] = useState<string>('All');
  const [activeBlip, setActiveBlip] = useState<string | null>(null);

  const curatedOpportunities = opportunities.slice(0, 4);

  const radarBlips = [
    {
      id: 'internships',
      label: 'Internships (3 live)',
      colorBg: 'bg-sky-400',
      pingColor: 'bg-sky-300/60',
      tagColor: 'text-sky-900 border-sky-100',
      posClass: 'top-[18%] left-[24%]',
      count: 3,
    },
    {
      id: 'hackathons',
      label: 'Hackathons (2 live)',
      colorBg: 'bg-purple-400',
      pingColor: 'bg-purple-300/60',
      tagColor: 'text-purple-900 border-purple-100',
      posClass: 'top-[14%] right-[26%]',
      count: 2,
    },
    {
      id: 'case-comps',
      label: 'Case Comps (4 live)',
      colorBg: 'bg-rose-400',
      pingColor: 'bg-rose-300/60',
      tagColor: 'text-rose-900 border-rose-100',
      posClass: 'top-[48%] right-[8%]',
      count: 4,
    },
    {
      id: 'fellowships',
      label: 'Fellowships (2 live)',
      colorBg: 'bg-emerald-400',
      pingColor: 'bg-emerald-300/60',
      tagColor: 'text-emerald-900 border-emerald-100',
      posClass: 'bottom-[22%] right-[16%]',
      count: 2,
    },
    {
      id: 'scholarships',
      label: 'Scholarships (1 live)',
      colorBg: 'bg-amber-400',
      pingColor: 'bg-amber-300/60',
      tagColor: 'text-amber-900 border-amber-100',
      posClass: 'bottom-[16%] left-[28%]',
      count: 1,
    },
    {
      id: 'jobs',
      label: 'Jobs / Rotational',
      colorBg: 'bg-indigo-400',
      pingColor: 'bg-indigo-300/60',
      tagColor: 'text-indigo-900 border-indigo-100',
      posClass: 'top-[42%] left-[10%]',
      count: 6,
    },
    {
      id: 'certifications',
      label: 'Certifications & Mixer',
      colorBg: 'bg-fuchsia-400',
      pingColor: 'bg-fuchsia-300/60',
      tagColor: 'text-fuchsia-900 border-fuchsia-100',
      posClass: 'bottom-[36%] left-[18%]',
      count: 5,
    },
  ];

  return (
    <div className="w-full max-w-[1360px] mx-auto px-6 lg:px-10 py-8 flex flex-col gap-10">
      {/* Hero Greeting & Executive Status Header */}
      <section className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-2">
        <div className="flex flex-col gap-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-gradient-to-r from-pink-100 to-purple-100 text-purple-800 border border-pink-200/60 font-label-caps text-label-caps uppercase tracking-wider w-fit shadow-xs">
            <span className="w-2 h-2 rounded-full bg-pink-500 animate-pulse" />
            AI Market Scanner Active • Class of 2026
          </div>
          <h1 className="font-headline-lg text-headline-lg text-[#272239] font-extrabold tracking-tight">
            Good afternoon, Prince <span className="inline-block animate-bounce" style={{ animationDuration: '2.5s' }}>🌸</span>
          </h1>
          <p className="font-body-lg text-body-lg text-purple-900/70 max-w-2xl">
            Discover opportunities made for your career. We calibrated{' '}
            <span className="font-bold text-purple-950">12 high-conviction roles</span> matched to your Business Analytics MBA track today.
          </p>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden sm:flex items-center gap-2.5 px-4 py-2.5 rounded-full bg-white/90 border border-purple-100/80 shadow-xs backdrop-blur-md">
            <span className="material-symbols-outlined text-emerald-500 text-[20px]">verified</span>
            <span className="font-label-lg text-label-lg text-[#272239]">
              Target Track: <span className="text-purple-600 font-bold">Strategy &amp; AI Products</span>
            </span>
          </div>
          <button
            onClick={() => {
              const el = document.getElementById('radar-canvas-container');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 text-white font-label-lg text-label-lg font-bold shadow-md shadow-pink-300/40 hover:opacity-95 transition-all transform active:scale-95 cursor-pointer"
            type="button"
          >
            <span className="material-symbols-outlined text-[18px]">radar</span>
            Scan Live Radar
          </button>
        </div>
      </section>

      {/* Interactive Circular Opportunity Radar Canvas Visualizer */}
      <section
        className="relative w-full rounded-3xl bg-white/80 backdrop-blur-xl border border-pink-100/80 shadow-[0_12px_40px_rgba(244,114,182,0.06)] p-6 sm:p-10 overflow-hidden flex flex-col items-center"
        id="radar-canvas-container"
      >
        {/* Ambient Radial Aura Background */}
        <div className="absolute -top-32 -left-32 w-96 h-96 rounded-full bg-pink-200/30 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full bg-purple-200/40 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-sky-100/30 blur-3xl pointer-events-none" />

        <div className="w-full flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4 z-10">
          <div>
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-purple-600 font-extrabold">
              Interactive Telemetry
            </span>
            <h2 className="font-headline-md text-headline-md text-[#272239] font-extrabold tracking-tight flex items-center gap-2">
              Live Opportunity Radar <span className="text-lg font-normal">✨</span>
            </h2>
          </div>
          <div className="flex items-center gap-2 text-purple-800 font-label-caps text-label-caps bg-gradient-to-r from-pink-50 to-purple-50 border border-pink-100 px-3.5 py-1.5 rounded-full shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            Real-time Match Field • 7 Tracks
          </div>
        </div>

        {/* Concentric Radar Projection */}
        <div className="relative w-full max-w-[620px] aspect-square flex items-center justify-center my-4 select-none">
          {/* Dreamy Concentric Pastel Boundary Rings */}
          <div className="absolute inset-0 m-auto w-full h-full rounded-full bg-gradient-to-br from-pink-50/50 via-purple-50/40 to-sky-50/40 border border-pink-100/60 shadow-inner" />
          <div className="absolute inset-0 m-auto w-[82%] h-[82%] rounded-full bg-gradient-to-br from-purple-50/50 to-pink-50/40 border border-purple-100/70" />
          <div className="absolute inset-0 m-auto w-[62%] h-[62%] rounded-full bg-gradient-to-br from-sky-50/60 to-emerald-50/50 border border-sky-100" />
          <div className="absolute inset-0 m-auto w-[42%] h-[42%] rounded-full bg-gradient-to-br from-pink-100/50 to-purple-100/50 border border-pink-200/80" />
          <div className="absolute inset-0 m-auto w-[24%] h-[24%] rounded-full bg-purple-100/60 border border-purple-200" />

          {/* Crosshair Radar Grid Axes */}
          <div className="absolute w-full h-[1px] bg-gradient-to-r from-transparent via-purple-200 to-transparent" />
          <div className="absolute h-full w-[1px] bg-gradient-to-b from-transparent via-purple-200 to-transparent" />
          <div className="absolute w-[80%] h-[1px] rotate-45 bg-gradient-to-r from-transparent via-pink-200/70 to-transparent" />
          <div className="absolute w-[80%] h-[1px] -rotate-45 bg-gradient-to-r from-transparent via-pink-200/70 to-transparent" />

          {/* Sweep Scanner Beam Simulation */}
          <div className="absolute inset-0 m-auto w-full h-full rounded-full overflow-hidden pointer-events-none">
            <div className="w-1/2 h-1/2 origin-bottom-right bg-gradient-to-br from-purple-400/20 via-pink-400/10 to-transparent radar-sweep-beam" />
          </div>

          {/* Center Node Bubble: Cute Milky Glass Disc */}
          <button
            onClick={() => {
              setSelectedRadarFilter('All');
              setActiveBlip(null);
            }}
            className="relative z-20 flex flex-col items-center justify-center w-36 h-36 rounded-full bg-white/95 backdrop-blur-xl border-2 border-purple-200/90 shadow-[0_8px_30px_rgba(168,85,247,0.2)] text-center p-3 transform transition-transform hover:scale-105 cursor-pointer group focus:outline-none"
          >
            <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-purple-300 to-pink-300 blur-sm opacity-60 animate-pulse" />
            <span className="relative material-symbols-outlined text-purple-600 text-[28px] group-hover:rotate-12 transition-transform">
              my_location
            </span>
            <span className="relative font-label-md text-label-md font-extrabold text-purple-950 leading-tight mt-1">
              12 Opportunities
            </span>
            <span className="relative font-label-caps text-label-caps text-pink-600 font-bold">
              Near You 💖
            </span>
          </button>

          {/* Interactive Radar Blips & Clusters */}
          {radarBlips.map((blip) => {
            const isHovered = activeBlip === blip.id;
            return (
              <div
                key={blip.id}
                onMouseEnter={() => setActiveBlip(blip.id)}
                onMouseLeave={() => setActiveBlip(null)}
                onClick={() => {
                  setSelectedRadarFilter(blip.label.split(' ')[0]);
                  handleDiscoverClick();
                }}
                className={`absolute ${blip.posClass} z-20 group cursor-pointer`}
              >
                <div className="relative flex items-center justify-center">
                  <span className={`absolute w-7 h-7 rounded-full ${blip.pingColor} animate-ping`} />
                  <span className={`w-4 h-4 rounded-full ${blip.colorBg} shadow-md ring-2 ring-white`} />
                  <div
                    className={`absolute left-5 top-0 whitespace-nowrap bg-white/95 border ${blip.tagColor} shadow-md px-3 py-1 rounded-full flex items-center gap-1.5 transition-all ${
                      isHovered ? 'opacity-100 scale-105 shadow-lg' : 'opacity-90'
                    }`}
                  >
                    <span className={`w-2 h-2 rounded-full ${blip.colorBg}`} />
                    <span className="font-label-caps text-label-caps font-bold">
                      {blip.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Controls, Pill Filters & Direct Explore Call-To-Action */}
        <div className="w-full flex flex-col md:flex-row items-center justify-between gap-6 pt-4 z-10">
          {/* Interactive Pill Filter Buttons */}
          <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
            {[
              { label: 'All (12)', filterKey: 'All' },
              { label: 'Internships', filterKey: 'Internships', color: 'bg-sky-400' },
              { label: 'Hackathons', filterKey: 'Hackathons', color: 'bg-purple-400' },
              { label: 'Case Comps', filterKey: 'Case', color: 'bg-rose-400' },
              { label: 'Fellowships', filterKey: 'Fellowships', color: 'bg-emerald-400' },
            ].map((f) => {
              const active = selectedRadarFilter === f.filterKey || (f.filterKey === 'All' && selectedRadarFilter === 'All');
              return (
                <button
                  key={f.label}
                  onClick={() => setSelectedRadarFilter(f.filterKey)}
                  className={`px-4 py-1.5 rounded-full font-label-md text-label-md transition-all cursor-pointer flex items-center gap-1.5 ${
                    active
                      ? 'bg-gradient-to-r from-purple-500 to-pink-500 text-white font-bold shadow-xs shadow-pink-200'
                      : 'bg-white/80 text-purple-900 border border-purple-100/80 hover:bg-purple-50 font-semibold'
                  }`}
                  type="button"
                >
                  {f.color && <span className={`w-2 h-2 rounded-full ${f.color}`} />}
                  {f.label}
                </button>
              );
            })}
          </div>

          <button
            onClick={() => {
              const el = document.getElementById('curated-picks');
              if (el) el.scrollIntoView({ behavior: 'smooth' });
            }}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-rose-400 text-white hover:shadow-lg hover:shadow-pink-300/40 transition-all font-label-lg text-label-lg font-bold flex items-center gap-2 shadow-md cursor-pointer transform active:scale-95"
            type="button"
          >
            Explore opportunities
            <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
          </button>
        </div>
      </section>

      {/* Section: Your Week at a Glance (Weekly Brief & Focus Checklist) */}
      <section className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-pink-600 font-extrabold">
              Digest &amp; Priorities
            </span>
            <h2 className="font-headline-md text-headline-md text-[#272239] font-extrabold">
              Your Week at a Glance ✨
            </h2>
          </div>
          <span className="text-purple-700 font-label-caps text-label-caps bg-purple-100/70 border border-purple-200/60 px-3.5 py-1 rounded-full font-bold">
            Week 14 • Fall Recruitment Sprint
          </span>
        </div>

        {/* 4 Pastel Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Metric 1 */}
          <div className="p-6 rounded-[24px] bg-[#fff1f2] border border-pink-200/70 flex flex-col justify-between gap-4 shadow-xs hover:translate-y-[-2px] transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-pink-200 text-pink-700 flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[22px]">alarm</span>
              </div>
              <span className="font-label-caps text-label-caps text-pink-700 bg-pink-100 px-2.5 py-0.5 rounded-full font-extrabold uppercase">
                Priority Alert
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-pink-950 font-black">3</h3>
              <p className="font-body-sm text-body-sm text-pink-900/70 font-medium mt-0.5">
                Deadlines approaching
              </p>
            </div>
          </div>

          {/* Metric 2 */}
          <div className="p-6 rounded-[24px] bg-[#ecfdf5] border border-emerald-200/70 flex flex-col justify-between gap-4 shadow-xs hover:translate-y-[-2px] transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-emerald-200 text-emerald-800 flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[22px]">auto_awesome</span>
              </div>
              <span className="font-label-caps text-label-caps text-emerald-800 bg-emerald-100 px-2.5 py-0.5 rounded-full font-extrabold uppercase">
                Campus Scout
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-emerald-950 font-black">5</h3>
              <p className="font-body-sm text-body-sm text-emerald-900/70 font-medium mt-0.5">
                New opportunities
              </p>
            </div>
          </div>

          {/* Metric 3 */}
          <div className="p-6 rounded-[24px] bg-[#f0f9ff] border border-sky-200/70 flex flex-col justify-between gap-4 shadow-xs hover:translate-y-[-2px] transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-sky-200 text-sky-800 flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[22px]">description</span>
              </div>
              <span className="font-label-caps text-label-caps text-sky-800 bg-sky-100 px-2.5 py-0.5 rounded-full font-extrabold uppercase">
                Review Needed
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-sky-950 font-black">2</h3>
              <p className="font-body-sm text-body-sm text-sky-900/70 font-medium mt-0.5">
                Applications awaiting action
              </p>
            </div>
          </div>

          {/* Metric 4 */}
          <div className="p-6 rounded-[24px] bg-[#faf5ff] border border-purple-200/70 flex flex-col justify-between gap-4 shadow-xs hover:translate-y-[-2px] transition-all">
            <div className="flex items-center justify-between">
              <div className="w-10 h-10 rounded-2xl bg-purple-200 text-purple-800 flex items-center justify-center shadow-inner">
                <span className="material-symbols-outlined text-[22px]">emoji_events</span>
              </div>
              <span className="font-label-caps text-label-caps text-purple-800 bg-purple-100 px-2.5 py-0.5 rounded-full font-extrabold uppercase">
                Showcase
              </span>
            </div>
            <div>
              <h3 className="font-headline-md text-headline-md text-purple-950 font-black">1</h3>
              <p className="font-body-sm text-body-sm text-purple-900/70 font-medium mt-0.5">
                Competition this week
              </p>
            </div>
          </div>
        </div>

        {/* 'Your Focus Today' Sub-Card Checklist */}
        <div className="w-full p-6 rounded-[24px] bg-white/90 backdrop-blur-md border border-purple-100/90 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="flex flex-col gap-1 max-w-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-purple-500 text-[20px]">checklist</span>
              <h4 className="font-headline-sm text-headline-sm text-[#272239] font-extrabold">
                Your Focus Today 🎀
              </h4>
            </div>
            <p className="font-body-sm text-body-sm text-purple-900/70">
              3 prioritized sprint objectives determined by deadline proximity and peer benchmarking.
            </p>
          </div>
          <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-3">
            {focusItems.map((item) => (
              <label
                key={item.id}
                onClick={() => onToggleFocusItem(item.id)}
                className={`flex items-start gap-3 p-3.5 rounded-2xl border transition-all cursor-pointer select-none ${
                  item.completed
                    ? 'bg-rose-50/70 border-rose-100/80 hover:bg-rose-100/60'
                    : 'bg-purple-50/60 border-purple-100/70 hover:bg-purple-100/50'
                }`}
              >
                <input
                  checked={item.completed}
                  onChange={() => {}}
                  className="mt-1 w-4 h-4 rounded text-rose-500 focus:ring-rose-400 accent-rose-500 cursor-pointer"
                  type="checkbox"
                />
                <div className="flex flex-col">
                  <span
                    className={`font-label-lg text-label-lg font-bold leading-snug ${
                      item.completed ? 'text-[#272239] line-through opacity-80' : 'text-[#272239]'
                    }`}
                  >
                    {item.title}
                  </span>
                  <span className="font-label-caps text-label-caps text-rose-600 font-extrabold mt-0.5">
                    {item.subtitle}
                  </span>
                </div>
              </label>
            ))}
          </div>
        </div>
      </section>

      {/* Section: Picked for you ✨ (Curated Grid Cards) */}
      <section className="flex flex-col gap-6" id="curated-picks">
        <div className="flex items-center justify-between">
          <div>
            <span className="font-label-caps text-label-caps uppercase tracking-wider text-purple-600 font-extrabold">
              Curated Matches
            </span>
            <h2 className="font-headline-md text-headline-md text-[#272239] font-extrabold">
              Picked for you ✨
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={handleDiscoverClick}
              className="px-4 py-1.5 rounded-full bg-white border border-pink-100 text-purple-800 text-xs font-bold shadow-xs hover:bg-pink-50 transition-colors cursor-pointer"
            >
              View all 38 matches →
            </button>
          </div>
        </div>

        {/* 4 High-Fidelity Opportunities Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
          {curatedOpportunities.map((opp) => (
            <article
              key={opp.id}
              className="p-6 rounded-[24px] bg-white/95 backdrop-blur-md border border-purple-100/80 shadow-xs hover:shadow-lg hover:shadow-purple-200/20 hover:translate-y-[-4px] transition-all flex flex-col justify-between group"
            >
              <div className="flex flex-col gap-4">
                <div className="flex items-center justify-between">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-purple-100 to-pink-100 border border-purple-200/60 p-1 flex items-center justify-center font-headline-sm text-headline-sm font-extrabold text-purple-800 shadow-xs overflow-hidden">
                    {opp.companyLogo ? (
                      <img
                        src={opp.companyLogo}
                        alt={opp.company}
                        className="w-full h-full object-contain rounded-xl"
                      />
                    ) : (
                      <span>{opp.company.slice(0, 3).toUpperCase()}</span>
                    )}
                  </div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 font-label-caps text-label-caps font-extrabold">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    {opp.matchScore}% Match
                  </span>
                </div>

                <div>
                  <span className="font-label-caps text-label-caps uppercase text-purple-600/80 font-bold">
                    {opp.company}
                  </span>
                  <h3
                    onClick={() => onSelectOpportunity(opp)}
                    className="font-headline-sm text-headline-sm text-[#272239] font-extrabold mt-0.5 line-clamp-1 cursor-pointer group-hover:text-purple-600 transition-colors"
                  >
                    {opp.title}
                  </h3>
                  <div className="inline-block mt-1.5 px-2.5 py-0.5 rounded-full bg-pink-100/80 text-pink-700 font-label-caps text-label-caps font-bold">
                    {opp.categoryBadge || opp.category}
                  </div>
                </div>

                <div className="flex flex-col gap-2 pt-2 text-purple-900/70 font-body-sm text-body-sm">
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-purple-400">event</span>
                      Deadline
                    </span>
                    <span className="font-label-md text-label-md font-bold text-[#272239]">
                      {opp.deadline.split(',')[0]}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-purple-400">payments</span>
                      Prize / Reward
                    </span>
                    <span className="font-label-md text-label-md font-extrabold text-emerald-600 truncate max-w-[140px]">
                      {opp.stipendOrPrize || opp.reward}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="flex items-center gap-1.5">
                      <span className="material-symbols-outlined text-[16px] text-purple-400">location_on</span>
                      Location
                    </span>
                    <span className="font-label-md text-label-md text-[#272239] truncate max-w-[130px]">
                      {opp.location}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 pt-6">
                <button
                  aria-label="Save Opportunity"
                  onClick={(e) => handleBookmarkClick(opp.id, e)}
                  className={`p-2.5 rounded-2xl border transition-colors cursor-pointer ${
                    opp.isSaved
                      ? 'bg-pink-100 border-pink-300 text-pink-600'
                      : 'bg-pink-50/70 border-pink-100 hover:bg-pink-100 text-pink-500'
                  }`}
                  type="button"
                >
                  <span
                    className={`material-symbols-outlined text-[20px] ${
                      opp.isSaved ? 'fill' : ''
                    }`}
                  >
                    bookmark
                  </span>
                </button>
                <button
                  onClick={() => handleApplyClick(opp)}
                  className="flex-1 py-2.5 rounded-2xl bg-gradient-to-r from-purple-500 to-pink-500 text-white font-label-lg text-label-lg font-bold hover:opacity-95 shadow-xs shadow-pink-200 transition-all flex items-center justify-center gap-1 cursor-pointer"
                  type="button"
                >
                  Apply Now
                  <span className="material-symbols-outlined text-[18px]">open_in_new</span>
                </button>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Contextual Intelligence Banner: AI Copilot Prompt Launcher */}
      <section className="w-full p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-purple-100/70 via-pink-100/60 to-purple-50/70 border border-pink-200/60 shadow-xs flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center shadow-md shadow-pink-300/40 flex-shrink-0">
            <span className="material-symbols-outlined text-[26px]">psychology</span>
          </div>
          <div className="flex flex-col gap-1">
            <h3 className="font-headline-sm text-headline-sm text-[#272239] font-extrabold">
              Unsure which opportunity moves your career needle? 🌸
            </h3>
            <p className="font-body-md text-body-md text-purple-900/70 max-w-xl">
              CampusIQ Copilot cross-references your current resume credentials, class schedule, and alumni feedback to calculate effort vs. offer odds.
            </p>
          </div>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <button
            onClick={() => onOpenCopilotWithPrompt('What should I apply for this week?')}
            className="cursor-pointer px-4 py-2.5 rounded-2xl bg-white/90 text-purple-950 hover:bg-white font-label-md text-label-md font-bold transition-all shadow-xs border border-purple-100 text-left"
            type="button"
          >
            💡 “What should I apply for this week?”
          </button>
          <button
            onClick={() => onOpenCopilotWithPrompt('Which deadline should I prioritize?')}
            className="cursor-pointer px-4 py-2.5 rounded-2xl bg-white/90 text-purple-950 hover:bg-white font-label-md text-label-md font-bold transition-all shadow-xs border border-purple-100 text-left"
            type="button"
          >
            🎯 “Which deadline should I prioritize?”
          </button>
        </div>
      </section>
    </div>
  );
};
