import React, { useState, useMemo } from 'react';
import { Opportunity, OpportunityCategory, WorkMode } from '../types';

interface DiscoverHubViewProps {
  opportunities: Opportunity[];
  onSelectOpportunity: (opportunity: Opportunity) => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onTrackOpportunity: (opportunity: Opportunity) => void;
}

const CATEGORIES: ('All' | OpportunityCategory)[] = [
  'All',
  'Case Competitions',
  'Internships',
  'Hackathons',
  'Research',
  'Scholarships',
  'Jobs',
  'Events & Summits',
];

const MODES: WorkMode[] = ['All', 'Remote', 'Hybrid', 'In-Person'];

type SortOption = 'match' | 'deadline' | 'reward';

export const DiscoverHubView: React.FC<DiscoverHubViewProps> = ({
  opportunities,
  onSelectOpportunity,
  onToggleSave,
  onTrackOpportunity,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<'All' | OpportunityCategory>('All');
  const [selectedMode, setSelectedMode] = useState<WorkMode>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('match');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [minMatch, setMinMatch] = useState<number>(0);

  const filteredOpportunities = useMemo(() => {
    return opportunities
      .filter((opp) => {
        if (selectedCategory !== 'All' && opp.category !== selectedCategory) return false;
        if (selectedMode !== 'All' && opp.mode !== selectedMode) return false;
        if (opp.matchScore < minMatch) return false;
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchTitle = opp.title.toLowerCase().includes(q);
          const matchCompany = opp.company.toLowerCase().includes(q);
          const matchDesc = opp.description.toLowerCase().includes(q);
          const matchTrack = opp.trackName?.toLowerCase().includes(q);
          if (!matchTitle && !matchCompany && !matchDesc && !matchTrack) return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'match') return b.matchScore - a.matchScore;
        if (sortBy === 'deadline') return a.daysLeft - b.daysLeft;
        if (sortBy === 'reward') return (b.reward?.length || 0) - (a.reward?.length || 0);
        return 0;
      });
  }, [opportunities, selectedCategory, selectedMode, searchQuery, sortBy, minMatch]);

  return (
    <div className="space-y-6 pb-16">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-rose-50 via-amber-50/60 to-orange-50/40 rounded-3xl p-6 sm:p-8 border border-rose-100/70 shadow-sm relative overflow-hidden">
        <div className="relative z-10 max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/90 backdrop-blur-xs rounded-full border border-rose-200/80 text-rose-800 text-xs font-semibold mb-3 shadow-xs">
            <span className="material-symbols-rounded text-sm text-rose-500 animate-pulse">
              explore
            </span>
            <span>Discovery Engine • 38 Verified MBA Opportunities</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-stone-900 tracking-tight">
            Discover Curated High-Conviction Matches
          </h1>
          <p className="mt-2 text-sm text-stone-600 leading-relaxed">
            AI-vetted case competitions, tier-1 summer internships, and fellowships aligned with
            your Business Analytics & Strategy career roadmap.
          </p>
        </div>

        {/* Decorative corner illustration */}
        <div className="absolute right-0 top-0 bottom-0 w-64 pointer-events-none opacity-20 sm:opacity-30 bg-radial from-rose-300 via-transparent to-transparent flex items-center justify-end pr-8">
          <span className="material-symbols-rounded text-9xl text-rose-400">psychology_alt</span>
        </div>
      </div>

      {/* Filter and Control Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 sm:p-5 shadow-xs space-y-4">
        {/* Search & Top Action row */}
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
          <div className="relative flex-1">
            <span className="material-symbols-rounded absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-lg">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by role, company, track (e.g. Quick-Commerce, BCG, Fintech)..."
              className="w-full pl-10 pr-4 py-2.5 bg-stone-50 hover:bg-stone-100/70 focus:bg-white text-sm text-stone-900 placeholder:text-stone-400 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-stone-400 hover:text-stone-600"
              >
                <span className="material-symbols-rounded text-sm">close</span>
              </button>
            )}
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
            {/* Mode Selector */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl text-xs font-medium text-stone-600">
              {MODES.map((mode) => (
                <button
                  key={mode}
                  onClick={() => setSelectedMode(mode)}
                  className={`px-3 py-1.5 rounded-lg transition ${
                    selectedMode === mode
                      ? 'bg-white text-stone-900 shadow-xs font-semibold'
                      : 'hover:text-stone-900'
                  }`}
                >
                  {mode}
                </button>
              ))}
            </div>

            {/* Sort Dropdown */}
            <div className="relative flex items-center bg-stone-50 border border-stone-200 rounded-xl px-2.5 py-1.5 text-xs text-stone-700">
              <span className="material-symbols-rounded text-base text-stone-400 mr-1.5">
                swap_vert
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort opportunities"
                className="bg-transparent text-xs font-semibold text-stone-800 focus:outline-none cursor-pointer pr-1"
              >
                <option value="match">Highest Match %</option>
                <option value="deadline">Closing Soonest</option>
                <option value="reward">Largest Reward / Prize</option>
              </select>
            </div>

            {/* View Grid/List toggle */}
            <div className="flex items-center bg-stone-100 p-1 rounded-xl text-stone-600">
              <button
                onClick={() => setViewMode('grid')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'grid' ? 'bg-white text-stone-900 shadow-xs' : 'hover:text-stone-900'
                }`}
                title="Grid View"
              >
                <span className="material-symbols-rounded text-base">grid_view</span>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`p-1.5 rounded-lg transition ${
                  viewMode === 'list' ? 'bg-white text-stone-900 shadow-xs' : 'hover:text-stone-900'
                }`}
                title="List View"
              >
                <span className="material-symbols-rounded text-base">view_list</span>
              </button>
            </div>
          </div>
        </div>

        {/* Category Pill Tags */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {CATEGORIES.map((cat) => {
            const isSelected = selectedCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition border ${
                  isSelected
                    ? 'bg-rose-500 text-white border-rose-500 shadow-xs shadow-rose-200'
                    : 'bg-stone-50 hover:bg-stone-100 text-stone-600 border-stone-200/80 hover:text-stone-900'
                }`}
              >
                {cat}
                {cat === 'All'
                  ? ` (${opportunities.length})`
                  : ` (${opportunities.filter((o) => o.category === cat).length})`}
              </button>
            );
          })}
        </div>

        {/* Quick Filter Status Bar */}
        <div className="flex flex-wrap items-center justify-between text-xs text-stone-500 pt-2 border-t border-stone-100">
          <div className="flex items-center gap-2">
            <span className="font-semibold text-stone-800">
              {filteredOpportunities.length} opportunities
            </span>
            <span>found matching your profile criteria</span>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-stone-400">Match threshold:</span>
            <div className="flex items-center gap-1.5">
              {[0, 85, 90].map((score) => (
                <button
                  key={score}
                  onClick={() => setMinMatch(score)}
                  className={`px-2 py-0.5 rounded text-[11px] font-medium transition ${
                    minMatch === score
                      ? 'bg-stone-800 text-white'
                      : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                  }`}
                >
                  {score === 0 ? 'All Matches' : `≥ ${score}%`}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Opportunities List/Grid */}
      {filteredOpportunities.length === 0 ? (
        <div className="bg-white rounded-3xl border border-stone-200 p-12 text-center max-w-lg mx-auto">
          <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-500 mx-auto flex items-center justify-center mb-4">
            <span className="material-symbols-rounded text-3xl">filter_list_off</span>
          </div>
          <h3 className="text-lg font-bold text-stone-800">No opportunities found</h3>
          <p className="text-sm text-stone-500 mt-1">
            Try adjusting your search keywords, clear category filters, or reduce the minimum match threshold.
          </p>
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedMode('All');
              setSearchQuery('');
              setMinMatch(0);
            }}
            className="mt-5 px-4 py-2 bg-stone-900 text-white rounded-xl text-xs font-semibold hover:bg-stone-800 transition"
          >
            Reset All Filters
          </button>
        </div>
      ) : viewMode === 'grid' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              onClick={() => onSelectOpportunity(opp)}
              className="group bg-white rounded-2xl border border-stone-200/90 hover:border-rose-300 shadow-xs hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden cursor-pointer relative"
            >
              {/* Card Header Top */}
              <div className="p-5 pb-3">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={opp.companyLogo}
                      alt={opp.company}
                      className="w-11 h-11 rounded-xl object-cover border border-stone-100 shadow-xs bg-stone-50"
                      onError={(e) => {
                        (e.target as HTMLElement).style.display = 'none';
                      }}
                    />
                    <div>
                      <h4 className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                        {opp.company}
                      </h4>
                      <div className="flex items-center gap-1.5 mt-0.5">
                        <span className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded-md">
                          {opp.category}
                        </span>
                        <span className="text-[11px] font-medium text-stone-500">
                          • {opp.mode}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Bookmark Button */}
                  <button
                    onClick={(e) => onToggleSave(opp.id, e)}
                    className={`p-2 rounded-xl border transition ${
                      opp.isSaved
                        ? 'bg-rose-50 text-rose-600 border-rose-200'
                        : 'bg-stone-50 hover:bg-stone-100 text-stone-400 hover:text-stone-700 border-stone-200/60'
                    }`}
                    title={opp.isSaved ? 'Remove from saved' : 'Save opportunity'}
                  >
                    <span
                      className="material-symbols-rounded text-base"
                      style={{ fontVariationSettings: opp.isSaved ? "'FILL' 1" : "'FILL' 0" }}
                    >
                      bookmark
                    </span>
                  </button>
                </div>

                {/* Title */}
                <h3 className="text-base font-bold text-stone-900 group-hover:text-rose-600 transition leading-snug line-clamp-2">
                  {opp.title}
                </h3>

                {/* Excerpt */}
                <p className="mt-2 text-xs text-stone-600 line-clamp-2 leading-relaxed">
                  {opp.description}
                </p>

                {/* Track Badge if available */}
                {opp.trackName && (
                  <div className="mt-3">
                    <span className="inline-flex items-center text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-100 px-2.5 py-1 rounded-lg">
                      {opp.trackName}
                    </span>
                  </div>
                )}
              </div>

              {/* Card Footer Bottom */}
              <div className="px-5 py-3.5 bg-stone-50/70 border-t border-stone-100 flex items-center justify-between mt-auto">
                <div className="flex items-center gap-2">
                  {/* Match Score */}
                  <div className="flex items-center gap-1 bg-emerald-50 border border-emerald-200/70 px-2 py-1 rounded-lg text-emerald-800 text-xs font-bold">
                    <span className="material-symbols-rounded text-xs text-emerald-600">
                      verified
                    </span>
                    <span>{opp.matchScore}% Match</span>
                  </div>

                  {/* Days left */}
                  <div
                    className={`text-[11px] font-semibold px-2 py-1 rounded-lg ${
                      opp.daysLeft <= 5
                        ? 'bg-amber-50 text-amber-800 border border-amber-200/70'
                        : 'text-stone-500 bg-white border border-stone-200/60'
                    }`}
                  >
                    {opp.daysLeft <= 0 ? 'Closing Today' : `${opp.daysLeft}d left`}
                  </div>
                </div>

                {/* Reward / Stipend */}
                <div className="text-right">
                  <span className="text-[11px] text-stone-400 block">Reward</span>
                  <span className="text-xs font-bold text-stone-800 line-clamp-1 max-w-[120px]">
                    {opp.reward?.split('+')[0] || opp.reward}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-stone-200 divide-y divide-stone-100 shadow-xs overflow-hidden">
          {filteredOpportunities.map((opp) => (
            <div
              key={opp.id}
              onClick={() => onSelectOpportunity(opp)}
              className="p-4 sm:p-5 hover:bg-stone-50/80 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4 cursor-pointer group"
            >
              <div className="flex items-start gap-4">
                <img
                  src={opp.companyLogo}
                  alt={opp.company}
                  className="w-12 h-12 rounded-xl object-cover border border-stone-100 bg-stone-50 shrink-0"
                  onError={(e) => {
                    (e.target as HTMLElement).style.display = 'none';
                  }}
                />
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      {opp.company}
                    </span>
                    <span className="text-[11px] text-stone-400">•</span>
                    <span className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                      {opp.category}
                    </span>
                    <span className="text-[11px] font-medium text-stone-500">{opp.mode}</span>
                  </div>

                  <h3 className="text-sm sm:text-base font-bold text-stone-900 group-hover:text-rose-600 transition mt-0.5">
                    {opp.title}
                  </h3>

                  <p className="text-xs text-stone-500 mt-1 line-clamp-1 max-w-2xl">
                    {opp.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-stone-100">
                <div className="text-left sm:text-right">
                  <div className="text-xs font-bold text-stone-800">
                    {opp.reward?.split('+')[0]}
                  </div>
                  <div className="text-[11px] text-stone-400">Due {opp.deadline}</div>
                </div>

                <div className="flex items-center gap-1.5 bg-emerald-50 text-emerald-800 border border-emerald-200 px-2.5 py-1.5 rounded-lg text-xs font-bold">
                  <span>{opp.matchScore}%</span>
                </div>

                <button
                  onClick={(e) => onToggleSave(opp.id, e)}
                  className={`p-2 rounded-xl border transition ${
                    opp.isSaved
                      ? 'bg-rose-50 text-rose-600 border-rose-200'
                      : 'bg-stone-50 hover:bg-stone-100 text-stone-400 border-stone-200/80'
                  }`}
                >
                  <span
                    className="material-symbols-rounded text-base"
                    style={{ fontVariationSettings: opp.isSaved ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    bookmark
                  </span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
