import express, { Request, Response } from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

import {
  ALL_OPPORTUNITIES,
  INITIAL_TRACKED_ITEMS,
  INITIAL_PEERS,
  USER_PROFILE,
  COPILOT_KNOWLEDGE_BASE,
  INITIAL_FOCUS_CHECKLIST,
  INITIAL_NOTIFICATIONS,
} from './src/data/mockData.ts';
import { Opportunity, TrackedItem, PeerTeammate, FocusChecklistItem, NotificationItem } from './src/types.ts';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json());

// In-memory application state
let opportunities: Opportunity[] = [...ALL_OPPORTUNITIES];
let trackedItems: TrackedItem[] = [...INITIAL_TRACKED_ITEMS];
let peers: PeerTeammate[] = [...INITIAL_PEERS];
let userProfile = { ...USER_PROFILE };
let focusChecklist: FocusChecklistItem[] = [...INITIAL_FOCUS_CHECKLIST];
let notifications: NotificationItem[] = [...INITIAL_NOTIFICATIONS];

// ================= API ENDPOINTS =================

// Health check
app.get('/api/health', (_req: Request, res: Response) => {
  res.json({
    status: 'ok',
    engine: 'Node.js Express + React Vite',
    nodeVersion: process.version,
    timestamp: new Date().toISOString(),
  });
});

// Opportunities list with filtering
app.get('/api/opportunities', (req: Request, res: Response) => {
  const { category, mode, search } = req.query;
  let results = [...opportunities];

  if (category && typeof category === 'string' && category !== 'All') {
    results = results.filter((o) => o.category === category);
  }

  if (mode && typeof mode === 'string' && mode !== 'All') {
    results = results.filter((o) => o.mode === mode);
  }

  if (search && typeof search === 'string' && search.trim()) {
    const q = search.toLowerCase();
    results = results.filter(
      (o) =>
        o.title.toLowerCase().includes(q) ||
        o.company.toLowerCase().includes(q) ||
        o.description.toLowerCase().includes(q) ||
        (o.trackName && o.trackName.toLowerCase().includes(q)),
    );
  }

  res.json({ count: results.length, opportunities: results });
});

// Single Opportunity by ID
app.get('/api/opportunities/:id', (req: Request, res: Response) => {
  const opp = opportunities.find((o) => o.id === req.params.id);
  if (!opp) {
    res.status(404).json({ error: 'Opportunity not found' });
    return;
  }
  res.json(opp);
});

// Toggle save/bookmark opportunity
app.post('/api/opportunities/:id/save', (req: Request, res: Response) => {
  const opp = opportunities.find((o) => o.id === req.params.id);
  if (!opp) {
    res.status(404).json({ error: 'Opportunity not found' });
    return;
  }
  opp.isSaved = !opp.isSaved;

  // Sync to tracker
  if (opp.isSaved && !trackedItems.some((t) => t.opportunityId === opp.id)) {
    trackedItems.unshift({
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
    });
  }

  res.json({ id: opp.id, isSaved: opp.isSaved });
});

// Tracker - Get all tracked items
app.get('/api/tracker', (_req: Request, res: Response) => {
  res.json({ items: trackedItems });
});

// Tracker - Add new item
app.post('/api/tracker', (req: Request, res: Response) => {
  const body = req.body;
  const newItem: TrackedItem = {
    id: body.id || `track-${Date.now()}`,
    opportunityId: body.opportunityId || 'custom-opp',
    title: body.title || 'Untitled Opportunity',
    company: body.company || 'External Organization',
    companyLogo:
      body.companyLogo ||
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCnUCyWNdSeardoMIjkK1q_RT5Obs4zBAptW_AJ02FtOiIyuKxj6eTlQfv7hz9c-EdyoVxzrGHxQ6q54A4AlZl2PpkvYDUJFp3qgZqyKx_BG8OUcEhQZvxkLPRcg7PO-phc1LyJ0D_YEWissGqOCjlkDQk0GHkC1XHH06ReuQ-z7R4EtV2Hdn4jwSgiqWixQ8FUaT5j49tRZQpoYSqVAoPAncy1tHoO9ed0xoNPbjH7kemqmoW_U9wZ',
    category: body.category || 'Case Competition',
    matchScore: body.matchScore || 90,
    stage: body.stage || 'saved',
    dueDate: body.dueDate || 'Dec 15',
    nextAction: body.nextAction || 'Initial review scheduled',
  };

  trackedItems.unshift(newItem);
  res.status(201).json(newItem);
});

// Tracker - Update stage
app.patch('/api/tracker/:id/stage', (req: Request, res: Response) => {
  const item = trackedItems.find((t) => t.id === req.params.id);
  if (!item) {
    res.status(404).json({ error: 'Tracked item not found' });
    return;
  }
  item.stage = req.body.stage;
  res.json(item);
});

// Tracker - Delete item
app.delete('/api/tracker/:id', (req: Request, res: Response) => {
  trackedItems = trackedItems.filter((t) => t.id !== req.params.id);
  res.json({ success: true });
});

// Peers list
app.get('/api/peers', (_req: Request, res: Response) => {
  res.json({ peers });
});

// Connect with peer
app.post('/api/peers/:id/connect', (req: Request, res: Response) => {
  const peer = peers.find((p) => p.id === req.params.id);
  if (!peer) {
    res.status(404).json({ error: 'Peer not found' });
    return;
  }
  peer.status = 'connected';
  res.json(peer);
});

// Focus Checklist
app.get('/api/focus-checklist', (_req: Request, res: Response) => {
  res.json({ items: focusChecklist });
});

app.patch('/api/focus-checklist/:id', (req: Request, res: Response) => {
  const item = focusChecklist.find((i) => i.id === req.params.id);
  if (!item) {
    res.status(404).json({ error: 'Item not found' });
    return;
  }
  item.completed = !item.completed;
  res.json(item);
});

// Notifications
app.get('/api/notifications', (_req: Request, res: Response) => {
  res.json({ notifications });
});

app.post('/api/notifications/read-all', (_req: Request, res: Response) => {
  notifications = notifications.map((n) => ({ ...n, unread: false }));
  res.json({ success: true });
});

// User Profile
app.get('/api/profile', (_req: Request, res: Response) => {
  res.json(userProfile);
});

app.put('/api/profile', (req: Request, res: Response) => {
  userProfile = { ...userProfile, ...req.body };
  res.json(userProfile);
});

// AI Copilot Endpoint (Gemini 3.8 Flash with Knowledge Base Fallback)
app.post('/api/copilot/chat', async (req: Request, res: Response) => {
  const { prompt } = req.body;
  if (!prompt || typeof prompt !== 'string') {
    res.status(400).json({ error: 'Prompt is required' });
    return;
  }

  const apiKey = process.env.GEMINI_API_KEY;

  if (apiKey) {
    try {
      const ai = new GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build',
          },
        },
      });

      const response = await ai.models.generateContent({
        model: 'gemini-3.8-flash',
        contents: prompt,
        config: {
          systemInstruction: `You are CampusIQ Copilot, an elite MBA Career, Case Competition & Recruiting Mentor for Prince Varsur (MBA Class of 2026, Business Analytics & Strategy).
Your mission: Provide rigorous, structured, executive-ready consulting advice, case frameworks, teardowns, and actionable career guidance.
Current active high-priority opportunity: Flipkart Commerce Labs Case Challenge (IIM Bangalore) on Quick Commerce Dark Store Unit Economics, catalog search AI, and routing.
Other target tracks: McKinsey, BCG GAMMA, Bain, Amazon Pathways, Apple Operations.
Keep your response concise, structured with Markdown headers and bullet points, and highly professional.`,
        },
      });

      if (response.text) {
        res.json({
          response: response.text,
          badge: 'Gemini 3.8 Flash AI',
          source: 'gemini',
        });
        return;
      }
    } catch (err) {
      console.warn('Gemini API call failed, falling back to local intelligence:', err);
    }
  }

  // Graceful Fallback using MBA Domain Knowledge Base
  const lower = prompt.toLowerCase();
  for (const [key, val] of Object.entries(COPILOT_KNOWLEDGE_BASE)) {
    if (lower.includes(key.toLowerCase()) || key.toLowerCase().includes(lower)) {
      res.json({
        response: val.response,
        badge: val.badge || 'Case Intelligence',
        source: 'knowledge_base',
      });
      return;
    }
  }

  if (lower.includes('quick commerce') || lower.includes('flipkart') || lower.includes('dark store')) {
    res.json({
      badge: 'Flipkart Commerce Labs Docket',
      source: 'knowledge_base',
      response: `### 📦 Quick-Commerce Optimization Framework

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
   - Combine your analytics model with **Kavya Iyer's** supply chain routing expertise for maximum jury scoring.`,
    });
    return;
  }

  res.json({
    badge: 'CampusIQ Advisor',
    source: 'knowledge_base',
    response: `### 💡 CampusIQ Strategic Guidance

Regarding **"${prompt}"**:

- **Alignment:** Strongly matches your MBA '26 Business Analytics focus.
- **Actionable Next Step:** Schedule 2 hours to finalize your slide narrative before the **Nov 18 deadline**.
- **Peer Synergy:** Reach out to **Devansh Mehta** (CFA Level II) to validate the financial sensitivity tables before submitting to the portal.`,
  });
});

// ================= VITE DEV MIDDLEWARE / STATIC ASSETS =================

async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    // Development mode: Vite middleware handles client code with fast module reloading
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        host: '0.0.0.0',
        port,
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    // Production mode: Serve built static assets from dist
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.resolve(distPath, 'index.html'));
    });
  }

  app.listen(port, '0.0.0.0', () => {
    console.log(`🚀 CampusIQ Node.js + React Full-Stack Server listening on http://0.0.0.0:${port}`);
  });
}

startServer();
