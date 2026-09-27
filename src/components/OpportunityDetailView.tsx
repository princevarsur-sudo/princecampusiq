import React, { useState } from 'react';
import { Opportunity, PeerTeammate } from '../types';

interface OpportunityDetailViewProps {
  opportunity: Opportunity;
  peers: PeerTeammate[];
  onBack: () => void;
  onToggleSave: (id: string, e: React.MouseEvent) => void;
  onTrackOpportunity: (opportunity: Opportunity) => void;
  onOpenCopilotWithPrompt: (prompt: string) => void;
  onConnectPeer: (peerId: string) => void;
}

export const OpportunityDetailView: React.FC<OpportunityDetailViewProps> = ({
  opportunity,
  peers,
  onBack,
  onToggleSave,
  onTrackOpportunity,
  onOpenCopilotWithPrompt,
  onConnectPeer,
}) => {
  const [activeTab, setActiveTab] = useState<'overview' | 'deliverables' | 'timeline' | 'peers'>(
    'overview',
  );
  const [isTracked, setIsTracked] = useState(false);
  const [connectedPeers, setConnectedPeers] = useState<Record<string, boolean>>({});

  const handleConnect = (peerId: string) => {
    setConnectedPeers((prev) => ({ ...prev, [peerId]: true }));
    onConnectPeer(peerId);
  };

  const handleTrackClick = () => {
    setIsTracked(true);
    onTrackOpportunity(opportunity);
  };

  return (
    <div className="space-y-6 pb-20">
      {/* Navigation Breadcrumb */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="inline-flex items-center gap-2 text-xs font-semibold text-stone-600 hover:text-stone-900 bg-white hover:bg-stone-50 border border-stone-200/80 px-3 py-1.5 rounded-xl transition shadow-2xs"
        >
          <span className="material-symbols-rounded text-base">arrow_back</span>
          <span>Back to Opportunities</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            onClick={(e) => onToggleSave(opportunity.id, e)}
            className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl border text-xs font-semibold transition ${
              opportunity.isSaved
                ? 'bg-rose-50 text-rose-700 border-rose-200'
                : 'bg-white text-stone-700 border-stone-200 hover:bg-stone-50'
            }`}
          >
            <span
              className="material-symbols-rounded text-base"
              style={{ fontVariationSettings: opportunity.isSaved ? "'FILL' 1" : "'FILL' 0" }}
            >
              bookmark
            </span>
            <span>{opportunity.isSaved ? 'Saved to Tracker' : 'Bookmark'}</span>
          </button>

          <button
            onClick={handleTrackClick}
            disabled={isTracked}
            className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-semibold shadow-xs transition ${
              isTracked
                ? 'bg-emerald-600 text-white cursor-default'
                : 'bg-stone-900 text-white hover:bg-stone-800'
            }`}
          >
            <span className="material-symbols-rounded text-base">
              {isTracked ? 'check_circle' : 'playlist_add'}
            </span>
            <span>{isTracked ? 'Added to My Pipeline' : 'Track in Pipeline'}</span>
          </button>
        </div>
      </div>

      {/* Hero Header Card */}
      <div className="bg-white rounded-3xl border border-stone-200/90 p-6 sm:p-8 shadow-xs relative overflow-hidden">
        {/* Subtle accent backdrop */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-rose-100/40 via-amber-50/30 to-transparent rounded-bl-full pointer-events-none" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="flex items-start gap-5">
            <img
              src={opportunity.companyLogo}
              alt={opportunity.company}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl object-cover border border-stone-200 shadow-xs bg-stone-50 shrink-0"
              onError={(e) => {
                (e.target as HTMLElement).style.display = 'none';
              }}
            />

            <div className="space-y-2">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  {opportunity.company}
                </span>
                <span className="text-stone-300">•</span>
                <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-rose-50 text-rose-700 border border-rose-100">
                  {opportunity.category}
                </span>
                {opportunity.trackName && (
                  <span className="px-2.5 py-0.5 rounded-md text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-100">
                    {opportunity.trackName}
                  </span>
                )}
                <span className="px-2 py-0.5 rounded-md text-[11px] font-medium bg-stone-100 text-stone-600">
                  {opportunity.mode}
                </span>
              </div>

              <h1 className="text-xl sm:text-2xl lg:text-3xl font-black text-stone-900 tracking-tight leading-tight max-w-3xl">
                {opportunity.title}
              </h1>

              <div className="flex flex-wrap items-center gap-y-2 gap-x-4 text-xs text-stone-600 pt-1">
                <div className="flex items-center gap-1">
                  <span className="material-symbols-rounded text-base text-stone-400">
                    location_on
                  </span>
                  <span>{opportunity.location}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-rounded text-base text-stone-400">
                    payments
                  </span>
                  <span className="font-semibold text-stone-900">{opportunity.reward}</span>
                </div>
                <div className="flex items-center gap-1">
                  <span className="material-symbols-rounded text-base text-stone-400">
                    hourglass_bottom
                  </span>
                  <span className="font-semibold text-rose-600">
                    Due {opportunity.deadline} ({opportunity.daysLeft} days remaining)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Match Score Badge */}
          <div className="bg-gradient-to-br from-emerald-50 to-teal-50/50 border border-emerald-200/80 rounded-2xl p-4 sm:p-5 flex lg:flex-col items-center justify-between lg:justify-center text-center shrink-0 min-w-[160px] shadow-2xs">
            <div className="relative flex items-center justify-center">
              <div className="w-16 h-16 rounded-full border-4 border-emerald-500/20 border-t-emerald-600 flex items-center justify-center bg-white shadow-xs">
                <span className="text-xl font-black text-emerald-700">
                  {opportunity.matchScore}%
                </span>
              </div>
            </div>
            <div className="text-left lg:text-center mt-0 lg:mt-2">
              <span className="text-xs font-bold text-emerald-900 block">Candidate Fit</span>
              <span className="text-[11px] text-emerald-600 font-medium">Top 5% Profile Match</span>
            </div>
          </div>
        </div>

        {/* Tab Navigation in Detail View */}
        <div className="flex items-center gap-2 border-t border-stone-100 mt-6 pt-4 overflow-x-auto">
          {[
            { id: 'overview', label: 'Executive Overview', icon: 'description' },
            { id: 'deliverables', label: 'Deliverables & Rounds', icon: 'assignment' },
            { id: 'timeline', label: 'Key Milestones', icon: 'event' },
            { id: 'peers', label: 'Team Formation Match', icon: 'group_add' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition ${
                activeTab === tab.id
                  ? 'bg-rose-50 text-rose-800 border border-rose-200/80 shadow-2xs'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-50'
              }`}
            >
              <span className="material-symbols-rounded text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols) */}
        <div className="lg:col-span-2 space-y-6">
          {/* Problem Statement Card */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-rose-50 text-rose-600 flex items-center justify-center">
                  <span className="material-symbols-rounded text-lg">lightbulb</span>
                </span>
                <h2 className="text-lg font-bold text-stone-900">Problem Statement & Scope</h2>
              </div>
              <span className="text-[11px] font-semibold text-stone-500 bg-stone-100 px-2.5 py-1 rounded-md">
                Official Case Docket
              </span>
            </div>

            <p className="text-sm text-stone-700 leading-relaxed font-normal">
              {opportunity.problemStatement || opportunity.description}
            </p>

            {/* Strategic Pillars */}
            {opportunity.pillars && opportunity.pillars.length > 0 && (
              <div className="pt-2">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-400 mb-3">
                  Core Problem Pillars to Address
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                  {opportunity.pillars.map((pillar, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-2xl bg-stone-50/80 border border-stone-200/70 hover:border-rose-200 transition space-y-2"
                    >
                      <div className="flex items-center gap-2.5">
                        <span className="w-7 h-7 rounded-lg bg-rose-100/70 text-rose-700 flex items-center justify-center text-sm">
                          <span className="material-symbols-rounded text-base">{pillar.icon}</span>
                        </span>
                        <h4 className="text-xs font-bold text-stone-900">{pillar.title}</h4>
                      </div>
                      <p className="text-xs text-stone-600 leading-relaxed">{pillar.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Deliverables & Submission Formats */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 sm:p-7 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                  <span className="material-symbols-rounded text-lg">folder_zip</span>
                </span>
                <h2 className="text-lg font-bold text-stone-900">Deliverables & Format</h2>
              </div>
              <span className="text-xs text-stone-500 font-medium">3 Submission Phases</span>
            </div>

            <div className="space-y-3">
              {(
                opportunity.deliverables || [
                  {
                    id: 'del-1',
                    phase: 'Round 1: Strategy Deck',
                    title: 'Executive Summary Brief (2-Page PDF)',
                    desc: 'Synthesize the dark store pick-route compression thesis, unit economics model, and operational bottleneck mitigations.',
                    icon: 'article',
                    colorType: 'pink',
                  },
                  {
                    id: 'del-2',
                    phase: 'Round 2: Teardown Presentation',
                    title: '10-Slide Deck + Financial Sensitivity Model',
                    desc: 'Detailed financial forecast including CAC, average order value expansion, and catalog substitution machine learning flow.',
                    icon: 'co_present',
                    colorType: 'blue',
                  },
                  {
                    id: 'del-3',
                    phase: 'Round 3: Grand Finale',
                    title: 'Live Pitch to Flipkart Commerce Labs Jury',
                    desc: '15-minute presentation in Bengaluru followed by 10 minutes of grueling defense against VP of Product.',
                    icon: 'record_voice_over',
                    colorType: 'mint',
                  },
                ]
              ).map((del, idx) => (
                <div
                  key={del.id || idx}
                  className="p-4 rounded-2xl border border-stone-200/80 bg-stone-50/50 flex items-start gap-4"
                >
                  <span className="w-8 h-8 rounded-xl bg-white border border-stone-200 text-stone-700 flex items-center justify-center shrink-0 shadow-2xs">
                    <span className="material-symbols-rounded text-base">{del.icon}</span>
                  </span>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-bold uppercase tracking-wider text-rose-600">
                        {del.phase}
                      </span>
                    </div>
                    <h4 className="text-sm font-bold text-stone-900">{del.title}</h4>
                    <p className="text-xs text-stone-600 leading-relaxed">{del.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Past Winning Submissions Showcase */}
          <div className="bg-gradient-to-r from-stone-900 to-stone-800 rounded-3xl p-6 sm:p-7 text-white shadow-sm space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-8 h-8 rounded-lg bg-amber-400/20 text-amber-300 flex items-center justify-center">
                  <span className="material-symbols-rounded text-lg">military_tech</span>
                </span>
                <div>
                  <h3 className="text-base font-bold text-white">
                    Past Winning Case Blueprint (2024 Winner)
                  </h3>
                  <p className="text-xs text-stone-300">
                    Deconstructed winning submission from IIM Ahmedabad
                  </p>
                </div>
              </div>
              <span className="text-xs font-semibold text-amber-300 bg-amber-400/10 px-3 py-1 rounded-full border border-amber-400/20">
                1st Place Winner
              </span>
            </div>

            <div className="p-4 rounded-2xl bg-white/5 border border-white/10 space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-stone-100">
                  Team Catalyst • "The 8-Minute Dark Store Fulfillment Algorithmic Mesh"
                </h4>
                <span className="text-xs text-stone-400 font-mono">14 Slides • PDF</span>
              </div>
              <p className="text-xs text-stone-300 leading-relaxed">
                Focused on micro-hub slot replenishment and delivery partner route bundling. Judges
                specifically praised the dynamic delivery pricing model that balanced peak dinner
                windows.
              </p>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <button
                onClick={() =>
                  onOpenCopilotWithPrompt(
                    'Summarize the key winning insights from the 2024 IIM Flipkart winning case deck and how I can differentiate my submission.',
                  )
                }
                className="px-4 py-2 bg-white text-stone-900 rounded-xl text-xs font-bold hover:bg-stone-100 transition inline-flex items-center gap-1.5 shadow-xs"
              >
                <span className="material-symbols-rounded text-sm text-rose-500">auto_awesome</span>
                <span>Ask Copilot to Deconstruct Winning Deck</span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column (1 col): Match breakdown, peers, timeline */}
        <div className="space-y-6">
          {/* Candidate Fit Breakdown */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <span className="material-symbols-rounded text-emerald-600 text-lg">tune</span>
              <span>Your Profile Alignment</span>
            </h3>

            <div className="space-y-3">
              {[
                { label: 'Python & Analytics', score: 94, verified: true },
                { label: 'SQL Query Modeling', score: 92, verified: true },
                { label: 'Financial Modeling (LBO/DCF)', score: 88, verified: false },
                { label: 'Product Strategy & Teardown', score: 90, verified: true },
                { label: 'Dark Store Ops / Supply Chain', score: 86, gap: true },
              ].map((item, idx) => (
                <div key={idx} className="space-y-1">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-stone-700">{item.label}</span>
                    <span
                      className={
                        item.gap ? 'text-amber-600 font-bold' : 'text-emerald-700 font-bold'
                      }
                    >
                      {item.score}% {item.gap ? '(Team Match Gap)' : ''}
                    </span>
                  </div>
                  <div className="w-full h-2 bg-stone-100 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        item.gap ? 'bg-amber-400' : 'bg-emerald-500'
                      }`}
                      style={{ width: `${item.score}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>

            <div className="p-3 bg-amber-50/80 rounded-2xl border border-amber-200/70 text-xs text-amber-900 space-y-1">
              <div className="flex items-center gap-1.5 font-bold text-amber-800">
                <span className="material-symbols-rounded text-base">info</span>
                <span>Recommended Team Composition</span>
              </div>
              <p className="text-[11px] leading-relaxed text-amber-800">
                You excel at analytics and product strategy. Adding a teammate with Supply Chain or
                Operations background will maximize your probability of shortlisting.
              </p>
            </div>
          </div>

          {/* Recommended Teammates / Peer Matchmaking */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
                <span className="material-symbols-rounded text-rose-500 text-lg">group</span>
                <span>Recommended Teammates</span>
              </h3>
              <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full">
                3 Peers Ready
              </span>
            </div>

            <div className="space-y-3">
              {peers.map((peer) => {
                const isConnected = connectedPeers[peer.id] || peer.status === 'connected';
                return (
                  <div
                    key={peer.id}
                    className="p-3.5 rounded-2xl border border-stone-200/90 bg-stone-50/50 hover:bg-stone-50 transition space-y-2"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <img
                          src={peer.avatar}
                          alt={peer.name}
                          className="w-10 h-10 rounded-xl object-cover border border-stone-200 shadow-2xs"
                        />
                        <div>
                          <h4 className="text-xs font-bold text-stone-900">{peer.name}</h4>
                          <span className="text-[11px] text-stone-500 block">
                            {peer.background}
                          </span>
                        </div>
                      </div>

                      <button
                        onClick={() => handleConnect(peer.id)}
                        disabled={isConnected}
                        className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                          isConnected
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-rose-500 hover:bg-rose-600 text-white shadow-2xs'
                        }`}
                      >
                        {isConnected ? 'Invite Sent' : 'Invite'}
                      </button>
                    </div>

                    <div className="text-[11px] text-stone-600 bg-white p-2 rounded-xl border border-stone-100 font-medium">
                      <span className="text-stone-400">Match Skill: </span>
                      {peer.role}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Key Dates & Timeline */}
          <div className="bg-white rounded-3xl border border-stone-200 p-6 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-stone-900 flex items-center gap-2">
              <span className="material-symbols-rounded text-blue-500 text-lg">schedule</span>
              <span>Important Dates</span>
            </h3>

            <div className="space-y-3 text-xs">
              {[
                { date: 'Nov 04', label: 'Registrations & Docket Open', status: 'Closed' },
                {
                  date: 'Nov 18',
                  label: 'Round 1 Submission Due (11:59 PM)',
                  status: 'Remaining (4d)',
                  highlight: true,
                },
                { date: 'Nov 25', label: 'Top 20 Teams Shortlist Announced', status: 'Upcoming' },
                { date: 'Dec 05', label: 'Grand Finale at IIMB Campus', status: 'Final' },
              ].map((m, idx) => (
                <div
                  key={idx}
                  className={`p-3 rounded-xl border flex items-center justify-between ${
                    m.highlight
                      ? 'bg-rose-50/80 border-rose-200 text-rose-900 font-bold'
                      : 'bg-stone-50 border-stone-200/70 text-stone-700'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="font-mono text-stone-500">{m.date}</span>
                    <span className="text-xs">{m.label}</span>
                  </div>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full ${
                      m.highlight
                        ? 'bg-rose-600 text-white'
                        : 'bg-stone-200 text-stone-600 font-semibold'
                    }`}
                  >
                    {m.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Copilot Action Shortcuts */}
          <div className="bg-gradient-to-br from-rose-50 to-orange-50 border border-rose-200 rounded-3xl p-5 space-y-3">
            <div className="flex items-center gap-2">
              <span className="w-6 h-6 rounded-lg bg-rose-500 text-white flex items-center justify-center text-xs">
                <span className="material-symbols-rounded text-sm">auto_awesome</span>
              </span>
              <h4 className="text-xs font-bold text-rose-900 uppercase tracking-wide">
                CampusIQ Case Copilot
              </h4>
            </div>
            <p className="text-xs text-rose-800 leading-relaxed">
              Instant AI assistance for this specific Flipkart & IIM Bangalore case challenge.
            </p>
            <div className="space-y-2 pt-1">
              {[
                'Review your executive summary pitch',
                'Simulate judge Q&A on dark store unit economics',
                'Generate 4-slide strategy framework for Quick Commerce',
              ].map((prompt, idx) => (
                <button
                  key={idx}
                  onClick={() => onOpenCopilotWithPrompt(prompt)}
                  className="w-full text-left p-2.5 bg-white/90 hover:bg-white rounded-xl border border-rose-200/80 text-xs font-semibold text-stone-800 hover:text-rose-700 transition flex items-center justify-between group shadow-2xs"
                >
                  <span className="line-clamp-1">{prompt}</span>
                  <span className="material-symbols-rounded text-sm text-stone-400 group-hover:text-rose-600 transition">
                    chevron_right
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
