import React, { useState } from 'react';
import { Opportunity } from '../types';

interface CalendarViewProps {
  opportunities: Opportunity[];
  onSelectOpportunity: (opportunity: Opportunity) => void;
}

interface CalendarEvent {
  id: string;
  opportunityId: string;
  day: number;
  month: string;
  title: string;
  company: string;
  type: 'deadline' | 'pitch' | 'interview' | 'announcement';
  time?: string;
  color: string;
}

const EVENTS: CalendarEvent[] = [
  {
    id: 'ev-1',
    opportunityId: 'iim-product-wizard-2025',
    day: 18,
    month: 'Nov',
    title: 'Flipkart Case Challenge Round 1 Deck Due',
    company: 'Flipkart & IIMB',
    type: 'deadline',
    time: '11:59 PM IST',
    color: 'bg-rose-50 border-rose-200 text-rose-800',
  },
  {
    id: 'ev-2',
    opportunityId: 'amazon-pathways',
    day: 20,
    month: 'Nov',
    title: 'Amazon Pathways Bar Raiser Interview',
    company: 'Amazon Operations',
    type: 'interview',
    time: '2:30 PM EST',
    color: 'bg-amber-50 border-amber-200 text-amber-800',
  },
  {
    id: 'ev-3',
    opportunityId: 'bcg-gamma-challenge',
    day: 22,
    month: 'Nov',
    title: 'BCG X Hackathon Final Code Freeze',
    company: 'BCG GAMMA',
    type: 'deadline',
    time: '6:00 PM EST',
    color: 'bg-purple-50 border-purple-200 text-purple-800',
  },
  {
    id: 'ev-4',
    opportunityId: 'microsoft-ai-innovation',
    day: 25,
    month: 'Nov',
    title: 'Microsoft AI Pitch Presentation',
    company: 'Microsoft',
    type: 'pitch',
    time: '10:00 AM PST',
    color: 'bg-blue-50 border-blue-200 text-blue-800',
  },
  {
    id: 'ev-5',
    opportunityId: 'goldman-sachs-strategy',
    day: 28,
    month: 'Nov',
    title: 'Goldman Sachs Team Registration Cutoff',
    company: 'Goldman Sachs',
    type: 'announcement',
    time: '11:59 PM EST',
    color: 'bg-stone-50 border-stone-200 text-stone-800',
  },
  {
    id: 'ev-6',
    opportunityId: 'iim-product-wizard-2025',
    day: 5,
    month: 'Dec',
    title: 'IIMB Grand Finale Campus Pitch',
    company: 'IIM Bangalore',
    type: 'pitch',
    time: '9:00 AM IST',
    color: 'bg-emerald-50 border-emerald-200 text-emerald-800',
  },
  {
    id: 'ev-7',
    opportunityId: 'apple-operations-internship',
    day: 8,
    month: 'Dec',
    title: 'Apple Operations Application Deadline',
    company: 'Apple',
    type: 'deadline',
    time: '5:00 PM PST',
    color: 'bg-rose-50 border-rose-200 text-rose-800',
  },
];

export const CalendarView: React.FC<CalendarViewProps> = ({
  opportunities,
  onSelectOpportunity,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<'Nov' | 'Dec'>('Nov');
  const [filterType, setFilterType] = useState<string>('all');

  const filteredEvents = EVENTS.filter((e) => {
    if (selectedMonth && e.month !== selectedMonth) return false;
    if (filterType !== 'all' && e.type !== filterType) return false;
    return true;
  });

  // Simple November 2025 calendar days (30 days, starting Saturday)
  const daysInNov = Array.from({ length: 30 }, (_, i) => i + 1);
  const startDayNov = 6; // Saturday offset (0 is Sunday, 6 is Saturday)

  return (
    <div className="space-y-6 pb-20">
      {/* Top Banner */}
      <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-rose-50 rounded-full text-xs font-semibold text-rose-700 border border-rose-200/80 mb-2">
            <span className="material-symbols-rounded text-sm">calendar_month</span>
            <span>Recruiting & Submission Schedule</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-stone-900 tracking-tight">
            Opportunity & Interview Calendar
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Synchronized with your 14 tracked workflows, peer deadlines, and presentation slots.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Month switcher */}
          <div className="flex items-center bg-stone-100 p-1 rounded-xl text-xs font-semibold text-stone-600">
            <button
              onClick={() => setSelectedMonth('Nov')}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedMonth === 'Nov' ? 'bg-white text-stone-900 shadow-xs' : 'hover:text-stone-900'
              }`}
            >
              November 2025
            </button>
            <button
              onClick={() => setSelectedMonth('Dec')}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedMonth === 'Dec' ? 'bg-white text-stone-900 shadow-xs' : 'hover:text-stone-900'
              }`}
            >
              December 2025
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid: Calendar Grid & Agenda List */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Calendar Grid (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h2 className="text-base font-bold text-stone-900">
              {selectedMonth === 'Nov' ? 'November 2025' : 'December 2025'}
            </h2>
            <div className="flex items-center gap-2 text-xs text-stone-500">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-rose-500" /> Deadline
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-amber-500" /> Interview
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-blue-500" /> Pitch
              </span>
            </div>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 gap-1 text-center text-xs font-bold text-stone-400 py-2">
            <div>Sun</div>
            <div>Mon</div>
            <div>Tue</div>
            <div>Wed</div>
            <div>Thu</div>
            <div>Fri</div>
            <div>Sat</div>
          </div>

          {/* Days Grid */}
          <div className="grid grid-cols-7 gap-2">
            {/* Empty offset padding for November 2025 (started on Saturday) */}
            {selectedMonth === 'Nov' &&
              Array.from({ length: startDayNov }).map((_, i) => (
                <div
                  key={`empty-${i}`}
                  className="min-h-[80px] p-1.5 bg-stone-50/40 rounded-xl border border-transparent"
                />
              ))}

            {daysInNov.map((d) => {
              const dayEvents = EVENTS.filter((e) => e.month === selectedMonth && e.day === d);
              const isToday = selectedMonth === 'Nov' && d === 14;

              return (
                <div
                  key={d}
                  className={`min-h-[85px] p-2 rounded-xl border transition flex flex-col justify-between ${
                    isToday
                      ? 'bg-rose-50/50 border-rose-300 font-bold'
                      : dayEvents.length > 0
                        ? 'bg-stone-50/80 border-stone-200'
                        : 'bg-white border-stone-100 hover:border-stone-200'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-xs ${
                        isToday
                          ? 'w-5 h-5 rounded-full bg-rose-500 text-white flex items-center justify-center font-bold'
                          : 'text-stone-700'
                      }`}
                    >
                      {d}
                    </span>
                    {dayEvents.length > 0 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-500" />
                    )}
                  </div>

                  <div className="space-y-1 mt-1">
                    {dayEvents.map((ev) => (
                      <div
                        key={ev.id}
                        onClick={() => {
                          const opp = opportunities.find((o) => o.id === ev.opportunityId);
                          if (opp) onSelectOpportunity(opp);
                        }}
                        className={`text-[10px] p-1 rounded-md border font-medium truncate cursor-pointer hover:opacity-80 transition ${ev.color}`}
                        title={`${ev.company}: ${ev.title} (${ev.time})`}
                      >
                        {ev.title}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Upcoming Agenda List (1 col) */}
        <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h3 className="text-base font-bold text-stone-900">Sprint Agenda</h3>
            <span className="text-xs text-rose-600 font-semibold">
              {filteredEvents.length} Events
            </span>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1">
            {['all', 'deadline', 'interview', 'pitch'].map((type) => (
              <button
                key={type}
                onClick={() => setFilterType(type)}
                className={`px-2.5 py-1 rounded-lg text-[11px] font-semibold capitalize transition ${
                  filterType === type
                    ? 'bg-stone-900 text-white'
                    : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
                }`}
              >
                {type}
              </button>
            ))}
          </div>

          {/* Agenda Event Cards */}
          <div className="space-y-3">
            {filteredEvents.map((ev) => {
              const opp = opportunities.find((o) => o.id === ev.opportunityId);
              return (
                <div
                  key={ev.id}
                  onClick={() => {
                    if (opp) onSelectOpportunity(opp);
                  }}
                  className="p-3.5 rounded-2xl border border-stone-200/90 hover:border-rose-300 bg-stone-50/50 hover:bg-white transition cursor-pointer group space-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-rose-600 bg-rose-50 px-2 py-0.5 rounded">
                      {ev.month} {ev.day} • {ev.time}
                    </span>
                    <span className="text-[10px] font-bold text-stone-400 uppercase">
                      {ev.type}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-stone-900 group-hover:text-rose-600 transition">
                    {ev.title}
                  </h4>

                  <div className="flex items-center justify-between text-[11px] text-stone-500 pt-1">
                    <span>{ev.company}</span>
                    <span className="text-rose-500 font-medium flex items-center gap-0.5">
                      <span>View Docket</span>
                      <span className="material-symbols-rounded text-sm">arrow_forward</span>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
