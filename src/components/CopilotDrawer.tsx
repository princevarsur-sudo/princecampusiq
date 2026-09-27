import React, { useState, useRef, useEffect } from 'react';
import { CopilotMessage } from '../types';
import { COPILOT_KNOWLEDGE_BASE, USER_PROFILE } from '../data/mockData';

interface CopilotDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  initialPrompt?: string;
  onClearInitialPrompt?: () => void;
}

const INITIAL_MESSAGES: CopilotMessage[] = [
  {
    id: 'msg-1',
    sender: 'copilot',
    timestamp: 'Just now',
    badge: 'CampusIQ Intelligence',
    text: `Hello ${USER_PROFILE.shortName}! 👋 I am your MBA Career & Case Copilot.

I have indexed your Class of 2026 profile (94% fit in Business Analytics), your 14 tracked pipeline workflows, and the active IIM Bangalore × Flipkart docket.

How can I accelerate your recruiting preparation today?`,
  },
];

export const CopilotDrawer: React.FC<CopilotDrawerProps> = ({
  isOpen,
  onClose,
  initialPrompt,
  onClearInitialPrompt,
}) => {
  const [messages, setMessages] = useState<CopilotMessage[]>(INITIAL_MESSAGES);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Handle external trigger with initialPrompt
  useEffect(() => {
    if (initialPrompt && isOpen) {
      handleSendMessage(initialPrompt);
      if (onClearInitialPrompt) onClearInitialPrompt();
    }
  }, [initialPrompt, isOpen]);

  // Scroll to bottom on new messages
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  const handleSendMessage = (textToSend?: string) => {
    const text = (textToSend || inputValue).trim();
    if (!text) return;

    const userMsg: CopilotMessage = {
      id: `usr-${Date.now()}`,
      sender: 'user',
      text,
      timestamp: 'Just now',
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputValue('');
    setIsTyping(true);

    setTimeout(() => {
      // Find answer in knowledge base or generate contextual MBA response
      const lower = text.toLowerCase();
      let matchedReply = '';
      let matchedBadge = 'Case Intelligence';

      for (const [key, val] of Object.entries(COPILOT_KNOWLEDGE_BASE)) {
        if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
          matchedReply = val.response;
          matchedBadge = val.badge || matchedBadge;
          break;
        }
      }

      if (!matchedReply) {
        if (lower.includes('quick commerce') || lower.includes('flipkart') || lower.includes('dark store')) {
          matchedBadge = 'Flipkart Commerce Labs Docket';
          matchedReply = `### 📦 Quick-Commerce Optimization Framework

Here is a 4-pillar strategic teardown tailored for the IIMB Flipkart challenge:

1. **Dark Store Route Compression:**
   - Compress picker travel path using batch clustering based on heatmaps of top 200 SKUs.
   - Target: Reduce fulfillment cost per basket from $1.18 to $0.72.

2. **Dynamic Delivery Fee Tiers:**
   - Surge hours (7 PM – 10 PM): Shift non-perishable delivery windows by offering 50 loyalty points.
   - Retain ≤12 min SLA for impulse grocery items.

3. **Catalog Personalization via Contextual Search:**
   - Natural language queries like *"quick dinner for 4 under 20 mins"* should bundle recipes into 1-click cart additions.

4. **Team Recommendation:**
   - Combine your analytics model with **Kavya Iyer's** supply chain routing expertise for maximum jury scoring.`;
        } else if (lower.includes('resume') || lower.includes('bullets')) {
          matchedBadge = 'Resume Tailoring Engine';
          matchedReply = `### 📄 Resume Optimization for ${USER_PROFILE.targetTrack}

Your current profile scores **94% ATS alignment**. Here are recommended impact bullets to add:

- *"Modeled SQL-driven dark store capacity constraints, resulting in a 14% simulated reduction in last-mile dispatch latency."*
- *"Architected predictive unit economics dashboard evaluating CAC:LTV across 40,000 simulated quick-commerce transactions."*
- *"Synthesized cross-functional product roadmap for AI search intent engine, cutting catalog bounce rates by 22%."*`;
        } else {
          matchedBadge = 'CampusIQ Advisor';
          matchedReply = `### 💡 CampusIQ Strategic Guidance

Regarding **"${text}"**:

- **Alignment:** Strongly matches your MBA '26 Business Analytics focus.
- **Actionable Next Step:** Schedule 2 hours to finalize your slide narrative before the **Nov 18 deadline**.
- **Peer Synergy:** Reach out to **Devansh Mehta** (CFA Level II) to validate the financial sensitivity tables before submitting to the portal.`;
        }
      }

      const botMsg: CopilotMessage = {
        id: `bot-${Date.now()}`,
        sender: 'copilot',
        text: matchedReply,
        timestamp: 'Just now',
        badge: matchedBadge,
      };

      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 700);
  };

  const handleCopyText = (content: string) => {
    navigator.clipboard.writeText(content);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-stone-900/30 backdrop-blur-2xs transition-opacity"
        onClick={onClose}
      />

      {/* Slide-over panel */}
      <div className="relative w-full max-w-lg bg-[#FAF7F2] border-l border-stone-200/90 shadow-2xl flex flex-col h-full z-10 animate-in slide-in-from-right duration-200">
        {/* Drawer Header */}
        <div className="p-4 sm:p-5 bg-white border-b border-stone-200 flex items-center justify-between shadow-2xs">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center shadow-xs">
              <span className="material-symbols-rounded text-lg">auto_awesome</span>
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-bold text-stone-900">CampusIQ Copilot</h3>
                <span className="text-[10px] font-semibold text-rose-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded-full">
                  AI Active
                </span>
              </div>
              <p className="text-[11px] text-stone-500">
                MBA Recruiting, Case Decks & Teammate Advice
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setMessages(INITIAL_MESSAGES)}
              className="p-2 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-100 transition"
              title="Reset conversation"
            >
              <span className="material-symbols-rounded text-lg">restart_alt</span>
            </button>
            <button
              onClick={onClose}
              className="p-2 text-stone-400 hover:text-stone-600 rounded-lg hover:bg-stone-100 transition"
              title="Close panel"
            >
              <span className="material-symbols-rounded text-lg">close</span>
            </button>
          </div>
        </div>

        {/* Quick Suggestion Chips */}
        <div className="px-4 py-3 bg-stone-100/60 border-b border-stone-200/60 overflow-x-auto flex items-center gap-2 scrollbar-none">
          {[
            'Review your executive summary pitch',
            'What should I apply for this week?',
            'Which deadline should I prioritize?',
            'Find peers who worked at Bain or BCG',
          ].map((prompt, idx) => (
            <button
              key={idx}
              onClick={() => handleSendMessage(prompt)}
              className="px-3 py-1.5 rounded-full bg-white hover:bg-rose-50 border border-stone-200 hover:border-rose-200 text-stone-700 hover:text-rose-700 text-xs font-medium whitespace-nowrap transition shadow-2xs shrink-0"
            >
              {prompt}
            </button>
          ))}
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
          {messages.map((msg) => {
            const isBot = msg.sender === 'copilot';

            return (
              <div
                key={msg.id}
                className={`flex gap-3 ${isBot ? 'items-start' : 'items-start flex-row-reverse'}`}
              >
                {/* Avatar */}
                {isBot ? (
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-rose-500 to-amber-500 text-white flex items-center justify-center text-xs shrink-0 shadow-2xs">
                    <span className="material-symbols-rounded text-sm">psychology</span>
                  </div>
                ) : (
                  <img
                    src={USER_PROFILE.avatar}
                    alt={USER_PROFILE.name}
                    className="w-8 h-8 rounded-xl object-cover border border-stone-200 shrink-0"
                  />
                )}

                {/* Message Body */}
                <div
                  className={`max-w-[85%] rounded-2xl p-4 text-xs leading-relaxed space-y-2 ${
                    isBot
                      ? 'bg-white border border-stone-200/90 text-stone-800 shadow-2xs'
                      : 'bg-stone-900 text-white shadow-2xs'
                  }`}
                >
                  {isBot && msg.badge && (
                    <div className="flex items-center justify-between border-b border-stone-100 pb-2 mb-2">
                      <span className="text-[10px] font-bold text-rose-600 uppercase tracking-wider flex items-center gap-1">
                        <span className="material-symbols-rounded text-xs">auto_awesome</span>
                        {msg.badge}
                      </span>
                      <button
                        onClick={() => handleCopyText(msg.text)}
                        className="text-stone-400 hover:text-stone-700 text-[10px] flex items-center gap-0.5"
                        title="Copy response"
                      >
                        <span className="material-symbols-rounded text-xs">content_copy</span>
                        <span>Copy</span>
                      </button>
                    </div>
                  )}

                  <div className="whitespace-pre-line font-normal">{msg.text}</div>

                  <span
                    className={`text-[10px] block text-right pt-1 ${
                      isBot ? 'text-stone-400' : 'text-stone-400'
                    }`}
                  >
                    {msg.timestamp}
                  </span>
                </div>
              </div>
            );
          })}

          {isTyping && (
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-rose-500 text-white flex items-center justify-center text-xs shadow-2xs">
                <span className="material-symbols-rounded text-sm animate-spin">sync</span>
              </div>
              <div className="bg-white rounded-2xl border border-stone-200 px-4 py-3 shadow-2xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce" />
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce [animation-delay:0.2s]" />
                <span className="w-2 h-2 rounded-full bg-rose-400 animate-bounce [animation-delay:0.4s]" />
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <div className="p-4 bg-white border-t border-stone-200">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="flex items-center gap-2"
          >
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask about case frameworks, deck structure, peer matching..."
              className="flex-1 px-4 py-2.5 bg-stone-50 focus:bg-white text-xs text-stone-900 placeholder:text-stone-400 rounded-xl border border-stone-200 focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-400 transition"
            />
            <button
              type="submit"
              disabled={!inputValue.trim()}
              className="p-2.5 bg-stone-900 hover:bg-stone-800 disabled:opacity-40 disabled:hover:bg-stone-900 text-white rounded-xl transition shadow-xs flex items-center justify-center"
            >
              <span className="material-symbols-rounded text-lg">arrow_upward</span>
            </button>
          </form>
          <div className="mt-2 flex items-center justify-between text-[11px] text-stone-400 px-1">
            <span>Powered by CampusIQ AI Intelligence Engine</span>
            <span>Class of 2026</span>
          </div>
        </div>
      </div>
    </div>
  );
};
