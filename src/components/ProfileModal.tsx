import React, { useState } from 'react';
import { USER_PROFILE } from '../data/mockData';

interface ProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ProfileModal: React.FC<ProfileModalProps> = ({ isOpen, onClose }) => {
  const [profile, setProfile] = useState(USER_PROFILE);
  const [activeTab, setActiveTab] = useState<'profile' | 'skills' | 'resume'>('profile');
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    setSavedSuccess(true);
    setTimeout(() => {
      setSavedSuccess(false);
      onClose();
    }, 900);
  };

  return (
    <div className="fixed inset-0 z-50 bg-stone-900/40 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="bg-[#FAF7F2] rounded-3xl border border-stone-200 max-w-2xl w-full max-h-[90vh] overflow-y-auto shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="p-6 bg-white border-b border-stone-200 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <img
              src={profile.avatar}
              alt={profile.name}
              className="w-14 h-14 rounded-2xl object-cover border-2 border-rose-200 shadow-xs"
            />
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-lg font-bold text-stone-900">{profile.name}</h2>
                <span className="text-[11px] font-semibold text-rose-700 bg-rose-50 border border-rose-100 px-2.5 py-0.5 rounded-full">
                  {profile.cohort}
                </span>
              </div>
              <p className="text-xs text-stone-500 font-medium">
                {profile.program} • {profile.school}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-stone-400 hover:text-stone-700 rounded-xl hover:bg-stone-100 transition"
          >
            <span className="material-symbols-rounded">close</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center gap-2 px-6 pt-4 border-b border-stone-200/80 bg-stone-100/40">
          {[
            { id: 'profile', label: 'Candidate Preferences', icon: 'person' },
            { id: 'skills', label: 'Skills & Fit Gauges', icon: 'equalizer' },
            { id: 'resume', label: 'Resume & ATS Intelligence', icon: 'description' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`flex items-center gap-2 px-4 py-2.5 text-xs font-semibold rounded-t-xl transition border-b-2 ${
                activeTab === tab.id
                  ? 'border-rose-500 text-rose-600 bg-white'
                  : 'border-transparent text-stone-500 hover:text-stone-800'
              }`}
            >
              <span className="material-symbols-rounded text-base">{tab.icon}</span>
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Body */}
        <div className="p-6 space-y-5 flex-1">
          {activeTab === 'profile' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                    Target Career Track
                  </label>
                  <p className="text-xs font-bold text-stone-800">{profile.targetTrack}</p>
                </div>

                <div className="bg-white p-4 rounded-2xl border border-stone-200 space-y-1">
                  <label className="text-[11px] font-bold uppercase tracking-wider text-stone-400 block">
                    Profile Intelligence Fit
                  </label>
                  <p className="text-xs font-bold text-emerald-600">
                    {profile.profileFitScore}% Alignment (Top Decile)
                  </p>
                </div>
              </div>

              {/* Target Sectors */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                  Target Recruiting Sectors
                </h4>
                <div className="flex flex-wrap gap-2">
                  {profile.targetSectors.map((sec, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1 bg-stone-100 border border-stone-200 text-stone-800 rounded-xl text-xs font-semibold flex items-center gap-1.5"
                    >
                      <span className="material-symbols-rounded text-sm text-rose-500">check</span>
                      <span>{sec}</span>
                    </span>
                  ))}
                </div>
              </div>

              {/* Preferences */}
              <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-3">
                <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                  Location & Compensation Filters
                </h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <span className="text-stone-400 block text-[11px]">Preferred Locations:</span>
                    <span className="font-semibold text-stone-800">
                      Bengaluru, Mumbai, Singapore, NYC (Hybrid/Remote)
                    </span>
                  </div>
                  <div className="p-3 bg-stone-50 rounded-xl border border-stone-100">
                    <span className="text-stone-400 block text-[11px]">Target Compensation:</span>
                    <span className="font-semibold text-stone-800">
                      $160k+ USD / ₹32+ LPA CTC (Summer Stipend: ₹2.5L/mo)
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'skills' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-stone-900 uppercase tracking-wide">
                    Evaluated Skill Matrix
                  </h4>
                  <span className="text-[11px] text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded-full">
                    Verified via Coursework
                  </span>
                </div>

                <div className="space-y-3.5">
                  {profile.skills.map((skill, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex justify-between text-xs font-semibold">
                        <span className="text-stone-800">{skill.name}</span>
                        <span className="text-emerald-700 font-bold">{skill.level}%</span>
                      </div>
                      <div className="w-full h-2.5 bg-stone-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full"
                          style={{ width: `${skill.level}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-4 bg-rose-50 border border-rose-200 rounded-2xl text-xs text-rose-800 space-y-1">
                <span className="font-bold block">💡 Match Optimization Insight</span>
                <p className="leading-relaxed">
                  Your Python, SQL, and Product Strategy scores exceed 90%. For case competitions
                  like IIM Product Wizard, partner with teammates proficient in Supply Chain and
                  Operations to cover all rubric parameters.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'resume' && (
            <div className="space-y-4">
              <div className="bg-white p-5 rounded-2xl border border-stone-200 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 rounded-xl bg-rose-50 text-rose-600 flex items-center justify-center">
                      <span className="material-symbols-rounded text-xl">picture_as_pdf</span>
                    </span>
                    <div>
                      <h4 className="text-xs font-bold text-stone-900">
                        Prince_Varsur_MBA_Resume_2026.pdf
                      </h4>
                      <span className="text-[11px] text-stone-400">
                        Updated 3 days ago • Verified for ATS
                      </span>
                    </div>
                  </div>

                  <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-lg border border-emerald-200">
                    94% ATS Score
                  </span>
                </div>

                <div className="p-4 bg-stone-50 rounded-xl border border-stone-200/80 text-xs text-stone-700 space-y-2">
                  <span className="font-bold text-stone-900 block">Identified Strengths:</span>
                  <ul className="list-disc pl-4 space-y-1 text-stone-600">
                    <li>Strong quantified business impact metrics in top consulting formats.</li>
                    <li>
                      Accreditation in Predictive Analytics, Financial Modeling, and Product
                      Teardowns.
                    </li>
                    <li>Direct keywords matching Google, Flipkart, BCG, and Bain requirements.</li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 bg-white border-t border-stone-200 flex items-center justify-between">
          <span className="text-xs text-stone-400">Class of 2026 • CampusIQ Intelligence</span>
          <div className="flex items-center gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded-xl text-xs font-semibold text-stone-600 hover:bg-stone-100 transition"
            >
              Close
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-bold transition shadow-xs"
            >
              {savedSuccess ? 'Preferences Saved ✓' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
