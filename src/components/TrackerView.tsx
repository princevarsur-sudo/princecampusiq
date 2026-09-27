import React, { useState, useMemo } from 'react';
import { TrackedItem, TrackerStage } from '../types';

interface TrackerViewProps {
  trackedItems: TrackedItem[];
  onMoveStage: (itemId: string, newStage: TrackerStage) => void;
  onSelectItem: (opportunityId: string) => void;
  onDeleteItem: (itemId: string) => void;
  onAddItem: (item: Partial<TrackedItem>) => void;
}

const STAGES: { id: TrackerStage; label: string; countBadgeColor: string; dotColor: string }[] = [
  { id: 'saved', label: 'Saved / Scouting', countBadgeColor: 'bg-stone-100 text-stone-700', dotColor: 'bg-stone-400' },
  { id: 'preparing', label: 'In Prep / Round 1', countBadgeColor: 'bg-rose-100 text-rose-800', dotColor: 'bg-rose-500' },
  { id: 'applied', label: 'Applied / In Review', countBadgeColor: 'bg-blue-100 text-blue-800', dotColor: 'bg-blue-500' },
  { id: 'shortlisted', label: 'Shortlisted / Round 2', countBadgeColor: 'bg-purple-100 text-purple-800', dotColor: 'bg-purple-500' },
  { id: 'interview', label: 'Final Interview', countBadgeColor: 'bg-amber-100 text-amber-800', dotColor: 'bg-amber-500' },
  { id: 'selected', label: 'Offers / Selected', countBadgeColor: 'bg-emerald-100 text-emerald-800', dotColor: 'bg-emerald-500' },
];

export const TrackerView: React.FC<TrackerViewProps> = ({
  trackedItems,
  onMoveStage,
  onSelectItem,
  onDeleteItem,
  onAddItem,
}) => {
  const [selectedFilter, setSelectedFilter] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'kanban' | 'list'>('kanban');
  const [isExporting, setIsExporting] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  // New Item State for custom entry
  const [newTitle, setNewTitle] = useState('');
  const [newCompany, setNewCompany] = useState('');
  const [newCategory, setNewCategory] = useState('Case Competition');
  const [newDueDate, setNewDueDate] = useState('');
  const [newStage, setNewStage] = useState<TrackerStage>('saved');

  const filteredItems = useMemo(() => {
    return trackedItems.filter((item) => {
      if (selectedFilter !== 'All' && !item.category.toLowerCase().includes(selectedFilter.toLowerCase())) {
        return false;
      }
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = item.title.toLowerCase().includes(q);
        const matchesCompany = item.company.toLowerCase().includes(q);
        const matchesNext = item.nextAction.toLowerCase().includes(q);
        if (!matchesTitle && !matchesCompany && !matchesNext) return false;
      }
      return true;
    });
  }, [trackedItems, selectedFilter, searchQuery]);

  const handleExportCSV = () => {
    setIsExporting(true);
    const headers = ['Title', 'Company', 'Category', 'Stage', 'Match Score', 'Due Date', 'Next Action'];
    const rows = filteredItems.map((item) => [
      `"${item.title.replace(/"/g, '""')}"`,
      `"${item.company.replace(/"/g, '""')}"`,
      `"${item.category}"`,
      `"${item.stage}"`,
      `"${item.matchScore}%"`,
      `"${item.dueDate}"`,
      `"${item.nextAction.replace(/"/g, '""')}"`,
    ]);
    const csvContent = [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.setAttribute('href', url);
    link.setAttribute('download', `CampusIQ_Career_Tracker_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setTimeout(() => setIsExporting(false), 1200);
  };

  const handleCreateNewItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newCompany.trim()) return;

    onAddItem({
      id: `custom-${Date.now()}`,
      opportunityId: 'iim-product-wizard-2025',
      title: newTitle.trim(),
      company: newCompany.trim(),
      companyLogo:
        'https://lh3.googleusercontent.com/aida-public/AB6AXuCnUCyWNdSeardoMIjkK1q_RT5Obs4zBAptW_AJ02FtOiIyuKxj6eTlQfv7hz9c-EdyoVxzrGHxQ6q54A4AlZl2PpkvYDUJFp3qgZqyKx_BG8OUcEhQZvxkLPRcg7PO-phc1LyJ0D_YEWissGqOCjlkDQk0GHkC1XHH06ReuQ-z7R4EtV2Hdn4jwSgiqWixQ8FUaT5j49tRZQpoYSqVAoPAncy1tHoO9ed0xoNPbjH7kemqmoW_U9wZ',
      category: newCategory,
      matchScore: 92,
      stage: newStage,
      dueDate: newDueDate || 'Nov 30',
      nextAction: 'Initial review scheduled',
    });

    setNewTitle('');
    setNewCompany('');
    setNewDueDate('');
    setShowAddModal(false);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner & Sprint Metrics */}
      <div className="bg-gradient-to-r from-stone-900 via-stone-850 to-stone-900 text-white rounded-3xl p-6 sm:p-7 shadow-sm border border-stone-800">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-rose-300 border border-white/10 mb-2">
              <span className="material-symbols-rounded text-sm">dashboard</span>
              <span>MBA Application & Competition Pipeline</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Recruiting & Case Challenge Cockpit
            </h1>
            <p className="text-xs sm:text-sm text-stone-300 mt-1 max-w-2xl">
              Track deadlines, deck milestones, team assignments, and interview slots across all 6
              stages.
            </p>
          </div>

          <div className="flex items-center gap-2 self-start md:self-auto">
            <button
              onClick={() => setShowAddModal(true)}
              className="px-3.5 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition flex items-center gap-1.5 shadow-xs"
            >
              <span className="material-symbols-rounded text-sm">add</span>
              <span>Add Custom Opportunity</span>
            </button>

            <button
              onClick={handleExportCSV}
              disabled={isExporting}
              className="px-3.5 py-2 bg-white/10 hover:bg-white/20 text-white border border-white/15 rounded-xl text-xs font-semibold transition flex items-center gap-1.5"
            >
              <span className="material-symbols-rounded text-sm">
                {isExporting ? 'hourglass_top' : 'download'}
              </span>
              <span>{isExporting ? 'Exporting...' : 'Export Tracker (CSV)'}</span>
            </button>
          </div>
        </div>

        {/* Live Sprint Metrics Ribbon */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-6 pt-6 border-t border-white/10">
          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <span className="text-[11px] text-stone-400 font-medium block">Active Workflows</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-black text-white">
                {trackedItems.length}
              </span>
              <span className="text-[11px] text-rose-400 font-semibold">+3 this month</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <span className="text-[11px] text-stone-400 font-medium block">Deadlines Due ≤ 7d</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-black text-amber-400">3</span>
              <span className="text-[11px] text-amber-300 font-semibold">Urgent Sprints</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <span className="text-[11px] text-stone-400 font-medium block">Potential Prize Pool</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-black text-emerald-400">$35,000+</span>
              <span className="text-[11px] text-emerald-300 font-semibold">5 Finalists</span>
            </div>
          </div>

          <div className="bg-white/5 rounded-2xl p-3 border border-white/5">
            <span className="text-[11px] text-stone-400 font-medium block">Avg Profile Match</span>
            <div className="flex items-baseline gap-2 mt-1">
              <span className="text-xl sm:text-2xl font-black text-white">91.4%</span>
              <span className="text-[11px] text-emerald-400 font-semibold">High Conviction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Control Filter Bar */}
      <div className="bg-white rounded-2xl border border-stone-200 p-4 shadow-xs flex flex-col md:flex-row gap-3 items-stretch md:items-center justify-between">
        <div className="relative flex-1">
          <span className="material-symbols-rounded absolute left-3.5 top-1/2 -translate-y-1/2 text-stone-400 text-base">
            search
          </span>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search tracked opportunities, notes, or next action..."
            className="w-full pl-9 pr-4 py-2 bg-stone-50 focus:bg-white text-xs text-stone-900 placeholder:text-stone-400 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition"
          />
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-1 md:pb-0">
          {/* Quick Filters */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl text-xs font-medium text-stone-600">
            {['All', 'Competition', 'Internship', 'Fellowship'].map((category) => (
              <button
                key={category}
                onClick={() => setSelectedFilter(category)}
                className={`px-3 py-1 rounded-lg transition ${
                  selectedFilter === category
                    ? 'bg-white text-stone-900 shadow-xs font-semibold'
                    : 'hover:text-stone-900'
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Kanban / List Toggle */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl text-stone-600">
            <button
              onClick={() => setViewMode('kanban')}
              className={`p-1.5 rounded-lg transition ${
                viewMode === 'kanban' ? 'bg-white text-stone-900 shadow-xs' : 'hover:text-stone-900'
              }`}
              title="Kanban Board View"
            >
              <span className="material-symbols-rounded text-base">view_column</span>
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

      {/* Kanban Board View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4 items-start overflow-x-auto pb-4">
          {STAGES.map((col) => {
            const itemsInStage = filteredItems.filter((item) => item.stage === col.id);

            return (
              <div
                key={col.id}
                className="bg-stone-100/70 rounded-2xl p-3 border border-stone-200/80 flex flex-col min-w-[270px] xl:min-w-0"
              >
                {/* Stage Header */}
                <div className="flex items-center justify-between pb-3 px-1 border-b border-stone-200/60 mb-3">
                  <div className="flex items-center gap-2">
                    <span className={`w-2.5 h-2.5 rounded-full ${col.dotColor}`} />
                    <h3 className="text-xs font-bold text-stone-800 tracking-tight">{col.label}</h3>
                  </div>
                  <span
                    className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${col.countBadgeColor}`}
                  >
                    {itemsInStage.length}
                  </span>
                </div>

                {/* Items in Column */}
                <div className="space-y-3 min-h-[150px]">
                  {itemsInStage.length === 0 ? (
                    <div className="p-4 rounded-xl border border-dashed border-stone-300 text-center text-xs text-stone-400">
                      No opportunities
                    </div>
                  ) : (
                    itemsInStage.map((item) => (
                      <div
                        key={item.id}
                        className="group bg-white rounded-xl border border-stone-200/90 hover:border-rose-300 shadow-2xs hover:shadow-xs transition p-3.5 space-y-2.5"
                      >
                        {/* Top: Company Logo + Title */}
                        <div className="flex items-start justify-between gap-2">
                          <div className="flex items-center gap-2">
                            <img
                              src={item.companyLogo}
                              alt={item.company}
                              className="w-7 h-7 rounded-lg object-cover border border-stone-100 bg-stone-50 shrink-0"
                              onError={(e) => {
                                (e.target as HTMLElement).style.display = 'none';
                              }}
                            />
                            <div>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-stone-400 block line-clamp-1">
                                {item.company}
                              </span>
                              <h4
                                onClick={() => onSelectItem(item.opportunityId)}
                                className="text-xs font-bold text-stone-900 hover:text-rose-600 transition cursor-pointer line-clamp-1"
                              >
                                {item.title}
                              </h4>
                            </div>
                          </div>

                          <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                            {item.matchScore}%
                          </span>
                        </div>

                        {/* Due Date & Warning */}
                        <div className="flex items-center justify-between text-[11px]">
                          <div className="flex items-center gap-1 text-stone-500">
                            <span className="material-symbols-rounded text-xs text-stone-400">
                              schedule
                            </span>
                            <span>Due {item.dueDate}</span>
                          </div>

                          {item.deadlineWarning && (
                            <span className="text-[10px] font-bold text-rose-600 bg-rose-50 px-1.5 py-0.5 rounded">
                              {item.deadlineWarning}
                            </span>
                          )}

                          {item.grantWon && (
                            <span className="text-[10px] font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded">
                              {item.grantWon}
                            </span>
                          )}
                        </div>

                        {/* Next Action Box */}
                        <div className="p-2 bg-stone-50 rounded-lg border border-stone-100/90 text-[11px] text-stone-700 space-y-1">
                          <div className="flex items-center gap-1 font-semibold text-stone-800">
                            <span className="material-symbols-rounded text-xs text-rose-500">
                              {item.nextActionIcon || 'arrow_circle_right'}
                            </span>
                            <span className="line-clamp-1">{item.nextAction}</span>
                          </div>
                          {item.nextActionSubtext && (
                            <p className="text-[10px] text-stone-400 pl-4">
                              {item.nextActionSubtext}
                            </p>
                          )}
                        </div>

                        {/* Team Avatars or Notes if present */}
                        {item.teamAvatars && item.teamAvatars.length > 0 && (
                          <div className="flex items-center justify-between pt-1">
                            <div className="flex -space-x-1.5">
                              {item.teamAvatars.map((av, idx) => (
                                <img
                                  key={idx}
                                  src={av}
                                  alt="teammate"
                                  className="w-5 h-5 rounded-full border border-white object-cover"
                                />
                              ))}
                            </div>
                            <span className="text-[10px] font-semibold text-stone-500">
                              {item.teamSpots}
                            </span>
                          </div>
                        )}

                        {/* Stage Progress Dropdown Control */}
                        <div className="flex items-center justify-between pt-1 border-t border-stone-100 text-[11px]">
                          <select
                            value={item.stage}
                            onChange={(e) => onMoveStage(item.id, e.target.value as TrackerStage)}
                            aria-label={`Change stage for ${item.title}`}
                            className="bg-transparent text-[10px] font-semibold text-stone-500 hover:text-stone-900 cursor-pointer focus:outline-none"
                          >
                            <option value="saved">Stage: Saved</option>
                            <option value="preparing">Stage: In Prep</option>
                            <option value="applied">Stage: Applied</option>
                            <option value="shortlisted">Stage: Shortlisted</option>
                            <option value="interview">Stage: Interview</option>
                            <option value="selected">Stage: Selected</option>
                          </select>

                          <button
                            onClick={() => onDeleteItem(item.id)}
                            className="opacity-0 group-hover:opacity-100 transition text-stone-400 hover:text-rose-600 p-0.5"
                            title="Remove from tracker"
                          >
                            <span className="material-symbols-rounded text-sm">delete</span>
                          </button>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* List View */
        <div className="bg-white rounded-2xl border border-stone-200 overflow-hidden shadow-xs divide-y divide-stone-100">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="p-4 sm:p-5 hover:bg-stone-50/80 transition flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="flex items-start gap-4">
                <img
                  src={item.companyLogo}
                  alt={item.company}
                  className="w-10 h-10 rounded-xl object-cover border border-stone-100 bg-stone-50 shrink-0"
                />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold text-stone-500 uppercase tracking-wider">
                      {item.company}
                    </span>
                    <span className="text-[11px] text-stone-300">•</span>
                    <span className="text-[11px] font-medium text-stone-600 bg-stone-100 px-2 py-0.5 rounded">
                      {item.category}
                    </span>
                  </div>
                  <h4
                    onClick={() => onSelectItem(item.opportunityId)}
                    className="text-sm font-bold text-stone-900 hover:text-rose-600 transition cursor-pointer mt-0.5"
                  >
                    {item.title}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-stone-500 mt-1">
                    <span className="font-semibold text-rose-600">Next:</span>
                    <span>{item.nextAction}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-4 self-end sm:self-auto">
                <div className="text-right text-xs">
                  <span className="font-bold text-stone-800 block">Due {item.dueDate}</span>
                  <span className="text-[11px] text-emerald-600 font-semibold">
                    {item.matchScore}% Match
                  </span>
                </div>

                <select
                  value={item.stage}
                  onChange={(e) => onMoveStage(item.id, e.target.value as TrackerStage)}
                  aria-label={`Change stage for ${item.title}`}
                  className="px-3 py-1.5 rounded-xl border border-stone-200 bg-stone-50 text-xs font-semibold text-stone-800 focus:outline-none"
                >
                  <option value="saved">Saved</option>
                  <option value="preparing">In Prep</option>
                  <option value="applied">Applied</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview">Interview</option>
                  <option value="selected">Selected</option>
                </select>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Custom Opportunity Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-stone-100">
              <h3 className="text-base font-bold text-stone-900">Add Opportunity to Pipeline</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-stone-400 hover:text-stone-600"
              >
                <span className="material-symbols-rounded">close</span>
              </button>
            </div>

            <form onSubmit={handleCreateNewItem} className="space-y-3.5">
              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Opportunity Title *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bain True North Case Challenge"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Company / Host Organization *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Bain & Company"
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full px-3 py-2 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-900 focus:bg-white focus:outline-none focus:ring-2 focus:ring-rose-500/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Category
                  </label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none"
                  >
                    <option value="Case Competition">Case Competition</option>
                    <option value="Summer Internship">Summer Internship</option>
                    <option value="Hackathon">Hackathon</option>
                    <option value="Fellowship">Fellowship</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-semibold text-stone-700 block mb-1">
                    Due Date
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Dec 05"
                    value={newDueDate}
                    onChange={(e) => setNewDueDate(e.target.value)}
                    className="w-full px-3 py-2 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-stone-700 block mb-1">
                  Initial Stage
                </label>
                <select
                  value={newStage}
                  onChange={(e) => setNewStage(e.target.value as TrackerStage)}
                  className="w-full px-3 py-2 bg-stone-50 rounded-xl border border-stone-200 text-xs text-stone-900 focus:outline-none"
                >
                  <option value="saved">Saved / Scouting</option>
                  <option value="preparing">In Prep / Round 1</option>
                  <option value="applied">Applied / In Review</option>
                  <option value="shortlisted">Shortlisted</option>
                  <option value="interview">Final Interview</option>
                </select>
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-rose-500 hover:bg-rose-600 text-white rounded-xl text-xs font-bold transition shadow-xs"
                >
                  Save to Pipeline
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
