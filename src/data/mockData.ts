import {
  Opportunity,
  TrackedItem,
  NotificationItem,
  FocusChecklistItem,
  PeerTeammate,
} from '../types';

export const USER_PROFILE = {
  name: 'Prince Varsur',
  shortName: 'Prince',
  cohort: 'Class of 2026',
  program: 'MBA in Business Analytics',
  school: 'Faculty of Management Studies / Top Tier B-School',
  avatar:
    'https://lh3.googleusercontent.com/aida/AEtjO1WXdbQFpyeFVg0W9uvViik1Zkq1yaq9rfJLl9QCgO0MUEFAVv9xplWClFsK6F3U_N8yx1OBaO48xoV5GGJxwTlWhZWlO3VRkHNncHItOlCych_VxA-o34I2uJVerpG-6y4b1YNKxjhOAS3g7ML-3X9NY7DJ29sEuaD0cGQL-7Du3JhJQ8m7sHXQ5ezrFbtm48bhd4r78f_KYQUPgGUaamSjanVm8s5APHJyFbQ90cv-upexIxnOaQcnaZc',
  targetTrack: 'Strategy & AI Products',
  profileFitScore: 94,
  activeWorkflows: 14,
  targetSectors: ['Strategy Consulting', 'Product Management', 'Tech & Venture'],
  skills: [
    { name: 'Python & Analytics', level: 94 },
    { name: 'SQL Query Modeling', level: 92 },
    { name: 'Financial Modeling (LBO/DCF)', level: 88 },
    { name: 'Product Strategy & Wireflow', level: 90 },
    { name: 'Unit Economics & Supply Chain', level: 86 },
  ],
};

export const INITIAL_PEERS: PeerTeammate[] = [
  {
    id: 'peer-1',
    name: 'Ananya Rao',
    role: 'UI/UX • Figma Prototyping',
    background: "MBA '26 • Ex-Dunzo PM",
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCg1cY4zFUp_GdEuzKZ0QfDOeCGfLLuAvlXqv32xnx3u-kDmnBuMXlWdf7_p78HcQUIfZrAgfhe73TabaYulsj4HBf-Lmg80BupfrLjpxBBL8OVZlN92OntxwEU-K_omKEGHCL3qVsBHhEymCbbZb5U-04kqbknh8sLu0_1FLYWwAPQcFfNf00W8hGwUPTdJH99I6-2aFaWirEmXDYv1fHU3Ez9cWVwimXs7yqsddWMKVglDn7oGGMj',
    matchSkills: 'Product Design & User Journeys',
    status: 'connect',
  },
  {
    id: 'peer-2',
    name: 'Devansh Mehta',
    role: 'Financial Modeling (LBO/DCF)',
    background: "MBA '26 • CFA Level II",
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD-XTFmh0uix8NzVo5XkZaVvYopRtJTZRa_XSzR4rHP7sE0wU5prm9kjlZ8FaPUwrYMi0OHhWqD5LcDrP6UMBljAYg9bEolYZ8Bhm_RK6ZvhYlpIogFtqJkaipC7TcGEad3HI8qM90R0e-1ViwjUCaLFoJ_5Mad6B3ogf0OAC0fpW3kTK2ojPF48sqkS3cLTS7g_Z6g1RKxWPO0cklJEJo4z6BHXlnmDCgmWqrHvcHQDMcyHXMZ3M0f',
    matchSkills: 'DCF valuation, CAC:LTV, dark store sensitivity tables',
    status: 'connect',
  },
  {
    id: 'peer-3',
    name: 'Kavya Iyer',
    role: 'Supply Chain • Dark Store Ops',
    background: "MBA '26 • Ex-Amazon Logistics",
    avatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCT1pAe11JE0rRmfWBqIYCU5__Zg8ESsKVCsq6lf9U3n5qEa_yxuMC7PZLLlxm_nfSbYUCmKxFJWk9_A2a1oQdqiT5UyFbg505hpO-Scg8urBX9_qdUmVRALv-9NDoprpny5gmCJtYJlzGR4QL0oeK7mp7IGzz68e5YNkQgiBk2zXagXwgSIUjO9AiYhnPfUZeiM3LbHT1iQW9LpTBEqD0CAB7oZTmzxSDPwgnBDlOkZ2JNjDqv8H2_',
    matchSkills: 'Inventory turnover & last-mile fulfillment algorithms',
    status: 'connect',
  },
];

export const ALL_OPPORTUNITIES: Opportunity[] = [
  {
    id: 'iim-product-wizard-2025',
    title: 'IIM Product Wizard Case Challenge 2025',
    company: 'IIM Bangalore & Flipkart',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCnUCyWNdSeardoMIjkK1q_RT5Obs4zBAptW_AJ02FtOiIyuKxj6eTlQfv7hz9c-EdyoVxzrGHxQ6q54A4AlZl2PpkvYDUJFp3qgZqyKx_BG8OUcEhQZvxkLPRcg7PO-phc1LyJ0D_YEWissGqOCjlkDQk0GHkC1XHH06ReuQ-z7R4EtV2Hdn4jwSgiqWixQ8FUaT5j49tRZQpoYSqVAoPAncy1tHoO9ed0xoNPbjH7kemqmoW_U9wZ',
    category: 'Case Competitions',
    categoryBadge: 'Case Competition',
    matchScore: 92,
    deadline: 'Nov 18, 2025',
    daysLeft: 4,
    location: 'Bengaluru / Hybrid',
    mode: 'Hybrid',
    reward: '$15,000 USD + Summer PPO Interview',
    stipendOrPrize: '$15,000',
    eligibility: 'MBA 1st & 2nd Year',
    difficulty: 'Advanced',
    teamSize: '2–3 Members',
    formatVenue: 'Bengaluru (Rounds 1 & 2 Remote)',
    description:
      'Product roadmap & teardown case for hyper-local quick commerce unit economics and delivery partner retention.',
    trackName: 'Quick-Commerce AI 🛍️',
    problemStatement:
      "India's quick-commerce sector has reached an inflection point where aggressive customer acquisition is giving way to ruthless demands on contribution margin and positive unit economics. The 2025 IIM Bangalore × Flipkart Challenge tasks MBA cohorts with architecting a viable 24-month roadmap for next-generation dark store network efficiency and hyper-personalized discovery.",
    pillars: [
      {
        title: 'Dark Store Unit Economics',
        desc: 'Redesign the pick-pack routing and delivery batching algorithm constraints to compress last-mile fulfillment cost from $1.18 to under $0.74 per basket while preserving strict ≤12 minute delivery SLAs.',
        icon: 'query_stats',
        color: 'purple',
      },
      {
        title: 'AI-Assisted Catalog Search',
        desc: 'Formulate a contextual LLM intent engine capable of handling colloquial, multi-lingual, and substitution queries (e.g., "dinner for 4 keto friendly under 20 mins") without bloating inventory overhead.',
        icon: 'auto_awesome',
        color: 'pink',
      },
    ],
    heroImage:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDqQf_TBSVjH6EJTvshMyYI1zGEyTr6WcwSrXX0YD5QC6GtbUwtJ620aA65CFL23q6AjjsiOf7P-19RkJ7WJPZx8HyFfyfHBIwh89Fy_PPjqNjhu8NiglSEKwg8fwQQmH42jA0h6C7dS4H6dmIHTT1yTQdmoRplklyC_3Q9QMpDmcIm_79JKnv_54WirH5jR9ZGnRHvOwSk5dN67-lAr4OXP440Mu1cbB7ZZZUuBGn7BQ5gJ5NFe3Ke',
    fieldNotice:
      'Operating across 42 metro micro-hubs with average inventory turns under 72 hours.',
    matchBreakdown: [
      { label: 'MBA Background (Analytics Focus)', score: 98, verified: true },
      { label: 'Analytics Skills (Python & SQL Query Modeling)', score: 94, verified: true },
      { label: 'Product Leadership & Prior Case Competitions', score: 88, verified: true },
      { label: 'Cohort Eligibility (MBA Class of 2026)', score: 100, verified: true },
    ],
    deliverables: [
      {
        id: 'del-1',
        title: 'Executive Summary',
        desc: '2-page structured PDF memo highlighting the thesis, unit margins, and quick-win hypothesis.',
        phase: 'Mandatory • Round 1',
        icon: 'picture_as_pdf',
        colorType: 'pink',
      },
      {
        id: 'del-2',
        title: 'Interactive Product Deck',
        desc: 'Figma wireflow or 10-slide strategy deck visualizing the customer discovery journey.',
        phase: 'Mandatory • Round 2',
        icon: 'slideshow',
        colorType: 'blue',
      },
      {
        id: 'del-3',
        title: 'Financial & Unit Model',
        desc: 'Dynamic Excel / Google Sheet with dark store operational sensitivities and CAC:LTV forecast.',
        phase: 'Mandatory • Semifinals',
        icon: 'table_chart',
        colorType: 'mint',
      },
      {
        id: 'del-4',
        title: 'Case Video Teaser',
        desc: '90-second Loom or MP4 team elevator pitch demonstrating presentation presence.',
        phase: 'Optional Bonus Credit ⭐',
        icon: 'videocam',
        colorType: 'lavender',
      },
    ],
    timeline: [
      {
        title: 'Registration Portal Opened',
        date: 'Completed • Oct 25, 2025',
        desc: 'Team formation and verification across top 30 business schools.',
        status: 'Closed',
        badgeText: 'Closed',
      },
      {
        title: 'Round 1 Executive Summary Submission',
        date: 'Immediate Milestone • Nov 18, 2025',
        desc: 'Hard deadline: 11:59 PM IST. Upload 2-page brief to CampusIQ dashboard.',
        status: 'Remaining',
        badgeText: '4 Days Remaining',
      },
      {
        title: 'Semifinalists & Shortlist Announced',
        date: 'Nov 26, 2025',
        desc: 'Top 20 teams paired with Flipkart senior product mentors for 1-on-1 critiques.',
        status: 'Upcoming',
        badgeText: 'Upcoming',
      },
      {
        title: 'National Grand Finale Presentation',
        date: 'Dec 08, 2025',
        desc: 'Live in-person stage pitch at IIM Bangalore campus (all expenses sponsored).',
        status: 'Final',
        badgeText: 'Final 🏆',
      },
    ],
    peers: INITIAL_PEERS,
    pastWinner: {
      award: '1st Place • IIM Ahmedabad 🏆',
      team: 'Team OptiRoute',
      title: '“Micro-Depot Algorithmic Batching in Tier-1 Metro Catchments”',
      summary:
        'Delivered an estimated 19% drop in perishable wastage and received immediate pre-placement interviews with Flipkart’s VP of Supply Chain.',
      slides: 14,
    },
    isSaved: true,
  },
  {
    id: 'goldman-sachs-strategy',
    title: 'Goldman Sachs Global Strategy Challenge',
    company: 'Goldman Sachs',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAyEtBhSQNmGfks8tgJx8WbChUhrWs2S3HAxHL_gikfWq3OcLg3IHtDm7m4V56KdyLMGKlOLQEJloFrIExGW8hIQgl459j0QPEvzy1F3r508aS3erAmH7fR0izpY9M5gjP6BYPyMjeGTwBpqyqSS6FU9hH2DUNwuRICU4_AFxQTTba-NF6mrGr8Nfee4RpS_oW8OcsZIsYgnV2ZmirjQ8JyTLy0SaUCwwJjc4CSiIhlO7aT2tteSDY',
    category: 'Case Competitions',
    categoryBadge: 'Case Competition',
    matchScore: 94,
    deadline: 'Nov 28, 2025',
    daysLeft: 4,
    location: 'New York / Remote',
    mode: 'Remote',
    reward: '$20,000 & Mentorship',
    stipendOrPrize: '$20,000',
    eligibility: 'MBA 1st & 2nd Year',
    difficulty: 'Advanced',
    teamSize: '3 Members',
    description:
      'Develop an ESG portfolio allocation thesis for sovereign wealth funds navigating transition energy markets.',
    isSaved: true,
  },
  {
    id: 'amazon-pathways',
    title: 'Amazon Pathways Operations Leadership',
    company: 'Amazon',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfAQ92OTBNvi8-_wU1ikQWB8Y8_y3RelRI_bB2iwyRooYoZar_0_PnddnJIPePy1rQkJN2OJVflFdS270ujVI-I8nBsO43d53iIPT9iiO8f_fVRueqPUWkvihaf-lx-OphrvfvbqooUWA6Mhu2-l7WO03XOdFPd8hcnCoHEmuyYSbav7w8Llc8D6HG54GSNIjG3blHh3rfOqaszKOXLmGRnEjfRwj6GIta7yzBQykZueT1nOPT8ui0',
    category: 'Internships',
    categoryBadge: 'Internship',
    matchScore: 91,
    deadline: 'Nov 20, 2025',
    daysLeft: 9,
    location: 'Seattle / Hybrid',
    mode: 'Hybrid',
    reward: 'Full-time Conversion + Exec Mentorship',
    stipendOrPrize: 'Competitive MBA Stipend',
    eligibility: 'MBA 1st Year Only',
    difficulty: 'Intermediate',
    description:
      'Accelerated leadership development program for high-potential MBA scholars leading cross-functional fulfillment ops.',
    isSaved: true,
  },
  {
    id: 'mckinsey-ngwl',
    title: 'Next Generation Women Leaders',
    company: 'McKinsey & Company',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB123xFe9wXyB87ViJxAqyBpQCr1I1Yl8hKCTQLMuPMM3nXhL6-0npORqxWBF4_RFfE75yrYKzsIkthuNp1M5Vfx5IKW7m9b5UMIwq78Z9dhfAS7E6lBwB9LzLlDJ3bInqd2QZaG0h2f2WRVGU_3F-xk8pYTjZAlZLv1Ux2Jx13y6TVW_AHWZrUMdT6dUHz9-mmvvDRkt9L7xEHj2RIRhB1C9vWA3Y8Rykyi1Z2pCfnT6iLyerzwfSs',
    category: 'Research',
    categoryBadge: 'Fellowship',
    matchScore: 89,
    deadline: 'Nov 05, 2025',
    daysLeft: 14,
    location: 'Singapore / Remote',
    mode: 'Remote',
    reward: 'Fully Funded Trip + Partner Coaching',
    stipendOrPrize: 'Fully Funded Trip',
    eligibility: 'MBA 1st & 2nd Year',
    difficulty: 'Advanced',
    description:
      'Flagship leadership workshop, problem-solving masterclasses, and executive coaching with global practice directors.',
    isSaved: true,
  },
  {
    id: 'bcg-gamma-challenge',
    title: 'AI Business Analytics Challenge',
    company: 'BCG GAMMA',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAG5DygcWtNTP8FPlNEytm0vWqTsPqyQZq3Iyasn2ShcGEZyYXR0_bT3z4AIInopxbgvT-sVJA-EZtmVgg3jnPvb6WCsKQDZKuBRbQsysXEQ_vmgY2-KXD3KmFClY-8bHiA1moHpXhVFpBykUGiLvVpt90I0DVCOtJsdVkumSjL8E6hcAWh91pDr1AqbnTbB8HQ1U0JF16o9D8F3iF3QCrOnNTGYcj8ZwKWntlnBAsL5TwHTEZSnOJQ',
    category: 'Hackathons',
    categoryBadge: 'Hackathon',
    matchScore: 88,
    deadline: 'Nov 22, 2025',
    daysLeft: 18,
    location: 'London / Hybrid',
    mode: 'Hybrid',
    reward: '$12,000 + BCG Interview fast-track',
    stipendOrPrize: '$12,000',
    eligibility: 'All Postgrads',
    difficulty: 'Advanced',
    description:
      'Build machine learning churn prediction models paired with go-to-market monetization strategy for enterprise SaaS.',
    isSaved: true,
  },
  {
    id: 'wharton-venture-fellowship',
    title: 'Wharton-Penn Venture Fellowship',
    company: 'The Wharton School',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDwcYLkQiAvyDsHm4Qy-FTssB4biaYdu1St6C7VmO4wUM4h0gwVZraHvqQMwGic8RCuI8tSKrSpw3UUMvFxWQWeoSePIy8B6mJlcdT7s155MZoNVQjwT4a5k2VWWzkvDNLPUdqGVHT1Y31MXZw8z6o28NcEt-I9dAaHTwo7M5gXxUJueXqVqyqQbC22sY0Q-YqdmagWWi8D0qWJPud7QuTRKctfL54YrBsYwej0d-3UguMPGJ09vATO',
    category: 'Research',
    categoryBadge: 'Research & Grant',
    matchScore: 85,
    deadline: 'Dec 12, 2025',
    daysLeft: 21,
    location: 'Philadelphia / Remote',
    mode: 'Remote',
    reward: '$10,000 Research Grant',
    stipendOrPrize: '$10,000 Grant',
    eligibility: 'MBA 1st & 2nd Year',
    difficulty: 'Intermediate',
    description:
      'Early-stage venture diligence and market research fellowship for MBA founders and early-stage syndicate analysts.',
    isSaved: true,
  },
  {
    id: 'bain-analytics-challenge',
    title: 'Analytics Challenge',
    company: 'Bain & Company',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAAYgbm9uVKczUU2fSvO7dW-qjFhRVV1N_I02A8o3CpwgcTxzCOP2MnO9fwqS-IO4_T1U8WRA06aU7eqREGSo8Une6yhUlgyM4zK_kgu8FUl09WSKemmzDPe3hG8ojQUlEPX6WMLeS3stE_z1TOyz-DfF3NAAmVOei1aGWDicfCw-n1MZGnFUtMlA5uZFWAQQxQ_Trskix8LJ-7uv8TJuUaVkJYc_Ui_wWcoj1VAnUwX4apseR-TGHK',
    category: 'Case Competitions',
    categoryBadge: 'Case Competition',
    matchScore: 87,
    deadline: 'Nov 22, 2025',
    daysLeft: 5,
    location: 'Mumbai / Remote',
    mode: 'Hybrid',
    reward: 'Fast-track Interview + $10,000',
    stipendOrPrize: 'Fast-track + $10k',
    eligibility: 'MBA 1st & 2nd Year',
    difficulty: 'Advanced',
    description:
      'Develop market entry strategy and customer loyalty modeling for omni-channel retail banking.',
    isSaved: true,
  },
  {
    id: 'google-summer-analyst',
    title: 'Summer Business Analyst Intern',
    company: 'Google India',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7Jez2RcUkQaxKFaWtcj5cAX_hMovsrTgP6h5FkutYCoCMrysX2gfc9a0H6ltoDOgdfFL0kg_DJkLv_sBGlXgKKl_mYfQJKUGyppfejQ0ny7P_txcfxDdiBcjpEUrXHq7aAfFFFHvspFMTKYg571ufxdJ3eq7XEgjI3exd5_Mx8iWTfzFAsUMfC-W9EGv-OeOSAAhvv567Uj3eH9xcuVYgSZXapX6NVSx-WoXFeWCfMKGVTW6HDAr-',
    category: 'Internships',
    categoryBadge: 'Internship',
    matchScore: 95,
    deadline: 'Nov 30, 2025',
    daysLeft: 12,
    location: 'Hyderabad',
    mode: 'In-Person',
    reward: 'Competitive MBA Stipend + PPO Opportunity',
    stipendOrPrize: 'Competitive MBA',
    eligibility: 'MBA 1st Year Only',
    difficulty: 'Intermediate',
    description:
      'Work alongside Google Cloud enterprise go-to-market leadership on TAM sizing and ecosystem partner expansion.',
    isSaved: true,
  },
  {
    id: 'microsoft-ai-innovation',
    title: 'AI Innovation Hackathon',
    company: 'Microsoft',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCBvWrcin2S2gjyyBGMn1HWqFY9g_6A-ZUrntgaRCLuRwjLa2ItmRb2I6Zh9HXjAC400-sKPXGa8WMW98mwacWsOdQP4oBrAjWiIr2Jiwtf_48JguMcVmiFzY7pwcikgHPsfAX3S8a6PIeI2mXGPziBhupn_cFbwG7KVO9hl2OwUdYHR_idz1elVodBDAd4Cb3tWAi0PmOpLwPf_33Ij4qAmISgj0vMdhCpEs54-e2TWVQARHYgldZr',
    category: 'Hackathons',
    categoryBadge: 'Hackathon',
    matchScore: 81,
    deadline: 'Dec 05, 2025',
    daysLeft: 19,
    location: 'Virtual',
    mode: 'Remote',
    reward: '$25,000 + Azure Cloud Grant',
    stipendOrPrize: '$25,000 + Grant',
    eligibility: 'All Postgrads',
    difficulty: 'Advanced',
    description:
      'Prototype multi-modal enterprise AI agents solving healthcare compliance, data sovereignty, and patient triage.',
    isSaved: false,
  },
  {
    id: 'kearney-strategy-cup',
    title: 'Kearney Strategy Cup',
    company: 'Kearney',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIrUPXtWkscrmzpS7gKWOmKltzU8Gu38WR932EWKz5rjI0V79xyhoCwR3msnnyzqjQHXsvkzwbU_g4wsXSYJwppWu3mzoCcB9NmC0Gh1ii24N2gGUycT2Imhi2gc7tHIGyitDVLV-0dqZrv4fsmNYMuAyW0ElZ8JB7RihaLmltIUE5Cv5EeF1b7HemHVJv6eMyF8yePOSY3bxyg3Cbq55xlhzeDfICp6-_ucWa-Xg2QhzbWahJlPRT',
    category: 'Case Competitions',
    categoryBadge: 'Competition',
    matchScore: 90,
    deadline: 'Completed',
    daysLeft: 0,
    location: 'New Delhi',
    mode: 'In-Person',
    reward: '$5,000 USD Grant + Trophy',
    stipendOrPrize: '$5,000 USD',
    eligibility: 'MBA Class of 2026',
    difficulty: 'Advanced',
    description:
      'National finalist competition evaluating supply chain decarbonization in steel manufacturing.',
    isSaved: true,
  },
  {
    id: 'morgan-stanley-quant',
    title: 'Quant & Quantitative Strategy Challenge',
    company: 'Morgan Stanley',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAyEtBhSQNmGfks8tgJx8WbChUhrWs2S3HAxHL_gikfWq3OcLg3IHtDm7m4V56KdyLMGKlOLQEJloFrIExGW8hIQgl459j0QPEvzy1F3r508aS3erAmH7fR0izpY9M5gjP6BYPyMjeGTwBpqyqSS6FU9hH2DUNwuRICU4_AFxQTTba-NF6mrGr8Nfee4RpS_oW8OcsZIsYgnV2ZmirjQ8JyTLy0SaUCwwJjc4CSiIhlO7aT2tteSDY',
    category: 'Hackathons',
    categoryBadge: 'Hackathon',
    matchScore: 89,
    deadline: 'Dec 14, 2025',
    daysLeft: 24,
    location: 'Mumbai / Remote',
    mode: 'Hybrid',
    reward: '$18,000 + Trading desk shadowing',
    stipendOrPrize: '$18,000',
    eligibility: 'MBA 1st & 2nd Year',
    difficulty: 'Advanced',
    description:
      'Algorithmic trading signals and portfolio risk optimization using high-frequency tick data.',
    isSaved: false,
  },
  {
    id: 'stripe-analytics-pm',
    title: 'Stripe Analytics Product Internship',
    company: 'Stripe',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAG5DygcWtNTP8FPlNEytm0vWqTsPqyQZq3Iyasn2ShcGEZyYXR0_bT3z4AIInopxbgvT-sVJA-EZtmVgg3jnPvb6WCsKQDZKuBRbQsysXEQ_vmgY2-KXD3KmFClY-8bHiA1moHpXhVFpBykUGiLvVpt90I0DVCOtJsdVkumSjL8E6hcAWh91pDr1AqbnTbB8HQ1U0JF16o9D8F3iF3QCrOnNTGYcj8ZwKWntlnBAsL5TwHTEZSnOJQ',
    category: 'Jobs',
    categoryBadge: 'Rotational Job',
    matchScore: 94,
    deadline: 'Dec 10, 2025',
    daysLeft: 22,
    location: 'San Francisco / Remote',
    mode: 'Remote',
    reward: 'Competitive MBA Package ($165k base)',
    stipendOrPrize: '$165k Base',
    eligibility: 'MBA Final Year',
    difficulty: 'Advanced',
    description:
      'Build revenue optimization models and fraud detection telemetry for Stripe billing platform.',
    isSaved: true,
  },
  {
    id: 'harvard-vc-cup',
    title: 'Harvard VC Cup Global Pitch',
    company: 'Harvard Business School',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDwcYLkQiAvyDsHm4Qy-FTssB4biaYdu1St6C7VmO4wUM4h0gwVZraHvqQMwGic8RCuI8tSKrSpw3UUMvFxWQWeoSePIy8B6mJlcdT7s155MZoNVQjwT4a5k2VWWzkvDNLPUdqGVHT1Y31MXZw8z6o28NcEt-I9dAaHTwo7M5gXxUJueXqVqyqQbC22sY0Q-YqdmagWWi8D0qWJPud7QuTRKctfL54YrBsYwej0d-3UguMPGJ09vATO',
    category: 'Case Competitions',
    categoryBadge: 'Case Competition',
    matchScore: 84,
    deadline: 'Dec 18, 2025',
    daysLeft: 30,
    location: 'Boston / Virtual',
    mode: 'Hybrid',
    reward: '$50,000 Seed Investment',
    stipendOrPrize: '$50,000 Seed',
    eligibility: 'All Postgrads',
    difficulty: 'Advanced',
    description:
      'International venture pitch competition judged by Bessemer, Sequoia, and General Catalyst partners.',
    isSaved: false,
  },
  {
    id: 'dalberg-development-fellowship',
    title: 'Global Social Impact Fellowship',
    company: 'Dalberg Advisors',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB123xFe9wXyB87ViJxAqyBpQCr1I1Yl8hKCTQLMuPMM3nXhL6-0npORqxWBF4_RFfE75yrYKzsIkthuNp1M5Vfx5IKW7m9b5UMIwq78Z9dhfAS7E6lBwB9LzLlDJ3bInqd2QZaG0h2f2WRVGU_3F-xk8pYTjZAlZLv1Ux2Jx13y6TVW_AHWZrUMdT6dUHz9-mmvvDRkt9L7xEHj2RIRhB1C9vWA3Y8Rykyi1Z2pCfnT6iLyerzwfSs',
    category: 'Scholarships',
    categoryBadge: 'Scholarship',
    matchScore: 86,
    deadline: 'Dec 02, 2025',
    daysLeft: 16,
    location: 'Nairobi / Remote',
    mode: 'Remote',
    reward: '$15,000 Tuition Scholarship',
    stipendOrPrize: '$15,000 Scholarship',
    eligibility: 'MBA 1st & 2nd Year',
    difficulty: 'Intermediate',
    description:
      'Scholarship and advisory immersion on emerging market healthcare and climate finance access.',
    isSaved: false,
  },
  {
    id: 'apple-operations-internship',
    title: 'Global Operations & Analytics Intern',
    company: 'Apple',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfAQ92OTBNvi8-_wU1ikQWB8Y8_y3RelRI_bB2iwyRooYoZar_0_PnddnJIPePy1rQkJN2OJVflFdS270ujVI-I8nBsO43d53iIPT9iiO8f_fVRueqPUWkvihaf-lx-OphrvfvbqooUWA6Mhu2-l7WO03XOdFPd8hcnCoHEmuyYSbav7w8Llc8D6HG54GSNIjG3blHh3rfOqaszKOXLmGRnEjfRwj6GIta7yzBQykZueT1nOPT8ui0',
    category: 'Internships',
    categoryBadge: 'Internship',
    matchScore: 93,
    deadline: 'Dec 08, 2025',
    daysLeft: 20,
    location: 'Cupertino / Austin',
    mode: 'In-Person',
    reward: 'Silicon Valley MBA Stipend + Relocation',
    stipendOrPrize: 'Competitive MBA',
    eligibility: 'MBA 1st Year Only',
    difficulty: 'Advanced',
    description:
      'Manage supply demand forecasting, factory yield analytics, and inventory optimization for next-gen silicon devices.',
    isSaved: false,
  },
  {
    id: 'unilever-future-leaders',
    title: 'Future Leaders Digital Supply Chain',
    company: 'Unilever',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAX2FHTThOXzsVkURhkMehMU3ybLHUoLnMxLBGK884wM6hc9EQrT5O_M0hI7uOv7DMqlG0iEmyqDSk25450qLqFaB0XskD8SZdopq6pMvPLbl5NRSEz-ejVrKxnkzY11BUoNW_OqRdTKiRcDCs8BIPXgEt2MFcA_rGawkV1lQRFBXf_QGXPQgtJFyqNzPJ8M9NdvTEcZQdyFkcK7XcjZ7kuddUvXl0XCU45BKwul24CdpBMkSMqzfJA',
    category: 'Events & Summits',
    categoryBadge: 'Summit',
    matchScore: 82,
    deadline: 'Nov 29, 2025',
    daysLeft: 11,
    location: 'London / Mumbai',
    mode: 'Hybrid',
    reward: 'Pre-MBA Fast track offers',
    stipendOrPrize: 'Fast-track Offers',
    eligibility: 'MBA 1st & 2nd Year',
    difficulty: 'Beginner',
    description:
      'Global FMCG sustainability and procurement summit connecting students with C-suite executives.',
    isSaved: false,
  },
];

export const INITIAL_TRACKED_ITEMS: TrackedItem[] = [
  // SAVED
  {
    id: 'track-1',
    opportunityId: 'goldman-sachs-strategy',
    title: 'Goldman Sachs Strategy',
    company: 'Goldman Sachs',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAkgEtb1jqrtyyWnY52Xw3yFKTHKgbxNkDBoK2b300RkiAqb0wWKZTnrAnp60468Peo46SXYTQ_7Z5QtprARPgsKlu4aX_qjngkS4o0WtDRK90oQgzvlOshVT_nR8PRRdaCpBxWO_skxl-3HgzJS9NQNXH4zlhTJGQBIx1Ts9pMmey6XxqXYkoCn-iqtaQq47K5AGGzJkhgxnMbJ1qzvhkhaOc1QlaGRVe0SIF6kYUuhsWFvMEl-t20',
    category: 'Competition',
    matchScore: 94,
    stage: 'saved',
    dueDate: 'Nov 28',
    nextAction: 'Form team • 2 spots remaining',
    nextActionIcon: 'groups',
    teamSpots: '2 spots left',
    teamAvatars: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAujjNI0QTy5qeO3MGZx6qjw8ERyxtdk9608M38VpSZ80p5H4Pk_laxP2e4Ys0G9sfDNoKzdNoCRLR-CxGJjz8PxsDRz5kmCApkhjVnbFM7OflfYKEPRmIU_V8Gz6cV0KqXE5ubLidspIW0ZPAht69M-Ac1_b3Pv1nEyLBUb4gww7MADnwGNyl2oO8BVPVGZyf8dDU13i2r6sAAKrGYjmCOlyS_eurZp1bVFO4l0FanUKZkyqfPg39r',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDEDOz7wBMxHDhq1LSyGD84PcPyim3MLtA54WRptgI8tMB0LhLJhAruZ77CmZU6_lkZazSyBFB4jSl3IKy3rKN_T1dWttL-DiheCaVbOQuTBPxjEtbgq0iR6r_wmI93eGeekbxLrFBmX_S2R7Ngv18SgKNYyPL1BJ11RTIExpcwTYxTlFIiTBCx0q2RGy1cgKfqaSY5qJ5jl9oJAdrPw_yDawXXL9zZmYJ7KhrznpqLhRg7wFioeH7Y',
    ],
    notes: 'Thesis draft completed. Need a teammate with credit default modeling experience.',
  },
  {
    id: 'track-2',
    opportunityId: 'wharton-venture-fellowship',
    title: 'Wharton Venture Fellowship',
    company: 'Wharton',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDtbkC86-1119RWbZh_xIUjey4JrCeaBQT1dG3mSSUQDKkA5qYNJjiCTd98CECeG_K6rpwUVzQB_nKE_MORbig_yKFGbly3dos3lCDshviNw1sKt-TXsIJ2U_NBQKQv9XM7SFYXaq8ejqb2myNH9LhVa-HyHTtTDd4r6VOqkLYNXzVvQm0JMC4bVo25_f9eiqr8by8LlLOF-u15sfbVsXXtPGqUo1VqBm8ZWt0D1_zXwS6CVX-pnTwR',
    category: 'Fellowship',
    matchScore: 85,
    stage: 'saved',
    dueDate: 'Dec 12',
    nextAction: 'Review essay prompt with mentor',
    nextActionIcon: 'edit_note',
    notes: 'Scheduled quick 15-min call with Professor Rao for recommendation letter.',
  },
  {
    id: 'track-3',
    opportunityId: 'stripe-analytics-pm',
    title: 'Stripe Analytics PM',
    company: 'Stripe',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAG5DygcWtNTP8FPlNEytm0vWqTsPqyQZq3Iyasn2ShcGEZyYXR0_bT3z4AIInopxbgvT-sVJA-EZtmVgg3jnPvb6WCsKQDZKuBRbQsysXEQ_vmgY2-KXD3KmFClY-8bHiA1moHpXhVFpBykUGiLvVpt90I0DVCOtJsdVkumSjL8E6hcAWh91pDr1AqbnTbB8HQ1U0JF16o9D8F3iF3QCrOnNTGYcj8ZwKWntlnBAsL5TwHTEZSnOJQ',
    category: 'Rotational Job',
    matchScore: 94,
    stage: 'saved',
    dueDate: 'Dec 10',
    nextAction: 'Tailor resume bullets using Copilot',
    nextActionIcon: 'bolt',
  },
  {
    id: 'track-4',
    opportunityId: 'apple-operations-internship',
    title: 'Apple Operations Intern',
    company: 'Apple',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfAQ92OTBNvi8-_wU1ikQWB8Y8_y3RelRI_bB2iwyRooYoZar_0_PnddnJIPePy1rQkJN2OJVflFdS270ujVI-I8nBsO43d53iIPT9iiO8f_fVRueqPUWkvihaf-lx-OphrvfvbqooUWA6Mhu2-l7WO03XOdFPd8hcnCoHEmuyYSbav7w8Llc8D6HG54GSNIjG3blHh3rfOqaszKOXLmGRnEjfRwj6GIta7yzBQykZueT1nOPT8ui0',
    category: 'Internship',
    matchScore: 93,
    stage: 'saved',
    dueDate: 'Dec 08',
    nextAction: 'Review alumni profiles in Cupertino',
    nextActionIcon: 'person_search',
  },

  // PREPARING
  {
    id: 'track-5',
    opportunityId: 'iim-product-wizard-2025',
    title: 'IIM Product Wizard',
    company: 'IIM Bangalore',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCnUCyWNdSeardoMIjkK1q_RT5Obs4zBAptW_AJ02FtOiIyuKxj6eTlQfv7hz9c-EdyoVxzrGHxQ6q54A4AlZl2PpkvYDUJFp3qgZqyKx_BG8OUcEhQZvxkLPRcg7PO-phc1LyJ0D_YEWissGqOCjlkDQk0GHkC1XHH06ReuQ-z7R4EtV2Hdn4jwSgiqWixQ8FUaT5j49tRZQpoYSqVAoPAncy1tHoO9ed0xoNPbjH7kemqmoW_U9wZ',
    category: 'Competition',
    matchScore: 92,
    stage: 'preparing',
    dueDate: 'Nov 18',
    deadlineWarning: 'Nov 18 • 2 days left!',
    nextAction: 'Finalize 5-slide strategic deck',
    nextActionIcon: 'priority_high',
    progressPercent: 75,
    assignedPeerAvatar:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDRNFQ4Ug0Cxm6ED-6TI-Jkn-YJ_iL_ekR8w-K4dUFDFdeTiNtDlg8foIIGHRGRK3eLCK9_ETouH6AmfxNhyjY_pNrAzZqkbWGJ9rl--5NZDxZW3VqRf-Dei9ztb49nSscAfd2WUqkP-Lreprf-SF3adSgm91helHyNU61Tx6favQT8pnhZa8dKt23F-SBdo5ptKB8EA6hFZ81_cSh8iPBMsgnYN9_lwxV5tWMaLacvY3dsYsQkquoS',
    assignedPeerNote: 'Deck review assigned',
  },
  {
    id: 'track-6',
    opportunityId: 'bain-analytics-challenge',
    title: 'Bain Analytics Case',
    company: 'Bain & Co',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAAYgbm9uVKczUU2fSvO7dW-qjFhRVV1N_I02A8o3CpwgcTxzCOP2MnO9fwqS-IO4_T1U8WRA06aU7eqREGSo8Une6yhUlgyM4zK_kgu8FUl09WSKemmzDPe3hG8ojQUlEPX6WMLeS3stE_z1TOyz-DfF3NAAmVOei1aGWDicfCw-n1MZGnFUtMlA5uZFWAQQxQ_Trskix8LJ-7uv8TJuUaVkJYc_Ui_wWcoj1VAnUwX4apseR-TGHK',
    category: 'Competition',
    matchScore: 87,
    stage: 'preparing',
    dueDate: 'Nov 22',
    nextAction: 'Run SQL sensitivity model',
    nextActionIcon: 'analytics',
    nextActionSubtext: 'Round 1 Stage',
  },
  {
    id: 'track-7',
    opportunityId: 'bcg-gamma-challenge',
    title: 'BCG X Hackathon Deck',
    company: 'BCG GAMMA',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAG5DygcWtNTP8FPlNEytm0vWqTsPqyQZq3Iyasn2ShcGEZyYXR0_bT3z4AIInopxbgvT-sVJA-EZtmVgg3jnPvb6WCsKQDZKuBRbQsysXEQ_vmgY2-KXD3KmFClY-8bHiA1moHpXhVFpBykUGiLvVpt90I0DVCOtJsdVkumSjL8E6hcAWh91pDr1AqbnTbB8HQ1U0JF16o9D8F3iF3QCrOnNTGYcj8ZwKWntlnBAsL5TwHTEZSnOJQ',
    category: 'Hackathon',
    matchScore: 88,
    stage: 'preparing',
    dueDate: 'Nov 22',
    nextAction: 'Team slide check • 4 slides left',
    nextActionIcon: 'view_carousel',
  },

  // APPLIED
  {
    id: 'track-8',
    opportunityId: 'google-summer-analyst',
    title: 'Google Summer Analyst',
    company: 'Google',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuD7Jez2RcUkQaxKFaWtcj5cAX_hMovsrTgP6h5FkutYCoCMrysX2gfc9a0H6ltoDOgdfFL0kg_DJkLv_sBGlXgKKl_mYfQJKUGyppfejQ0ny7P_txcfxDdiBcjpEUrXHq7aAfFFFHvspFMTKYg571ufxdJ3eq7XEgjI3exd5_Mx8iWTfzFAsUMfC-W9EGv-OeOSAAhvv567Uj3eH9xcuVYgSZXapX6NVSx-WoXFeWCfMKGVTW6HDAr-',
    category: 'Internship',
    matchScore: 95,
    stage: 'applied',
    dueDate: 'Nov 10',
    appId: '#GOOG-9921',
    statusLabel: 'Under Review',
    nextAction: 'Await recruiter screen invite',
  },
  {
    id: 'track-9',
    opportunityId: 'mckinsey-ngwl',
    title: 'McKinsey NGWL',
    company: 'McKinsey',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIrUPXtWkscrmzpS7gKWOmKltzU8Gu38WR932EWKz5rjI0V79xyhoCwR3msnnyzqjQHXsvkzwbU_g4wsXSYJwppWu3mzoCcB9NmC0Gh1ii24N2gGUycT2Imhi2gc7tHIGyitDVLV-0dqZrv4fsmNYMuAyW0ElZ8JB7RihaLmltIUE5Cv5EeF1b7HemHVJv6eMyF8yePOSY3bxyg3Cbq55xlhzeDfICp6-_ucWa-Xg2QhzbWahJlPRT',
    category: 'Fellowship',
    matchScore: 89,
    stage: 'applied',
    dueDate: 'Nov 05',
    statusLabel: 'Confirmation Received',
    nextAction: 'Alumni Referrals (2)',
  },
  {
    id: 'track-10',
    opportunityId: 'dalberg-development-fellowship',
    title: 'Dalberg Impact Fellowship',
    company: 'Dalberg',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuB123xFe9wXyB87ViJxAqyBpQCr1I1Yl8hKCTQLMuPMM3nXhL6-0npORqxWBF4_RFfE75yrYKzsIkthuNp1M5Vfx5IKW7m9b5UMIwq78Z9dhfAS7E6lBwB9LzLlDJ3bInqd2QZaG0h2f2WRVGU_3F-xk8pYTjZAlZLv1Ux2Jx13y6TVW_AHWZrUMdT6dUHz9-mmvvDRkt9L7xEHj2RIRhB1C9vWA3Y8Rykyi1Z2pCfnT6iLyerzwfSs',
    category: 'Scholarship',
    matchScore: 86,
    stage: 'applied',
    dueDate: 'Nov 08',
    statusLabel: 'Review In Progress',
    nextAction: 'Essay score verified',
  },

  // SHORTLISTED
  {
    id: 'track-11',
    opportunityId: 'microsoft-ai-innovation',
    title: 'Microsoft AI Innovation',
    company: 'Microsoft',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCBvWrcin2S2gjyyBGMn1HWqFY9g_6A-ZUrntgaRCLuRwjLa2ItmRb2I6Zh9HXjAC400-sKPXGa8WMW98mwacWsOdQP4oBrAjWiIr2Jiwtf_48JguMcVmiFzY7pwcikgHPsfAX3S8a6PIeI2mXGPziBhupn_cFbwG7KVO9hl2OwUdYHR_idz1elVodBDAd4Cb3tWAi0PmOpLwPf_33Ij4qAmISgj0vMdhCpEs54-e2TWVQARHYgldZr',
    category: 'Competition',
    matchScore: 90,
    stage: 'shortlisted',
    dueDate: 'Nov 25',
    nextAction: 'Round 2 Presentation • Live Pitch',
    nextActionSubtext: 'Evaluator pool ready',
  },
  {
    id: 'track-12',
    opportunityId: 'harvard-vc-cup',
    title: 'Harvard VC Cup Pitch',
    company: 'Harvard VC',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuDwcYLkQiAvyDsHm4Qy-FTssB4biaYdu1St6C7VmO4wUM4h0gwVZraHvqQMwGic8RCuI8tSKrSpw3UUMvFxWQWeoSePIy8B6mJlcdT7s155MZoNVQjwT4a5k2VWWzkvDNLPUdqGVHT1Y31MXZw8z6o28NcEt-I9dAaHTwo7M5gXxUJueXqVqyqQbC22sY0Q-YqdmagWWi8D0qWJPud7QuTRKctfL54YrBsYwej0d-3UguMPGJ09vATO',
    category: 'Competition',
    matchScore: 84,
    stage: 'shortlisted',
    dueDate: 'Nov 27',
    nextAction: 'Deck Q&A rehearsal with cohort',
    nextActionSubtext: 'Top 50 global shortlist',
  },

  // INTERVIEW
  {
    id: 'track-13',
    opportunityId: 'amazon-pathways',
    title: 'Amazon Pathways',
    company: 'Amazon',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCfAQ92OTBNvi8-_wU1ikQWB8Y8_y3RelRI_bB2iwyRooYoZar_0_PnddnJIPePy1rQkJN2OJVflFdS270ujVI-I8nBsO43d53iIPT9iiO8f_fVRueqPUWkvihaf-lx-OphrvfvbqooUWA6Mhu2-l7WO03XOdFPd8hcnCoHEmuyYSbav7w8Llc8D6HG54GSNIjG3blHh3rfOqaszKOXLmGRnEjfRwj6GIta7yzBQykZueT1nOPT8ui0',
    category: 'Leadership Program',
    matchScore: 91,
    stage: 'interview',
    dueDate: 'Nov 20',
    interviewSlot: 'Nov 20, 2:30 PM EST',
    interviewNote: 'Case Analysis + Behavioral Bar Raiser',
    nextAction: 'Prep Deck Ready ✨',
  },

  // SELECTED
  {
    id: 'track-14',
    opportunityId: 'kearney-strategy-cup',
    title: 'Kearney Strategy Cup',
    company: 'Kearney',
    companyLogo:
      'https://lh3.googleusercontent.com/aida-public/AB6AXuAIrUPXtWkscrmzpS7gKWOmKltzU8Gu38WR932EWKz5rjI0V79xyhoCwR3msnnyzqjQHXsvkzwbU_g4wsXSYJwppWu3mzoCcB9NmC0Gh1ii24N2gGUycT2Imhi2gc7tHIGyitDVLV-0dqZrv4fsmNYMuAyW0ElZ8JB7RihaLmltIUE5Cv5EeF1b7HemHVJv6eMyF8yePOSY3bxyg3Cbq55xlhzeDfICp6-_ucWa-Xg2QhzbWahJlPRT',
    category: 'Competition',
    matchScore: 90,
    stage: 'selected',
    dueDate: 'Completed',
    grantWon: '$5,000 USD 🎉',
    statusLabel: '1st Runner Up',
    nextAction: 'Certificate Stored in Profile',
  },
];

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: '🌸 Your saved opportunity closes in 2 days',
    subtitle: 'McKinsey Strategy • 2h ago',
    timeAgo: '2h ago',
    unread: true,
    type: 'deadline',
    targetTab: 'opportunity-detail',
    opportunityId: 'iim-product-wizard-2025',
  },
  {
    id: 'notif-2',
    title: '🚀 New 94% profile match found',
    subtitle: 'Stripe Analytics PM • 5h ago',
    timeAgo: '5h ago',
    unread: true,
    type: 'match',
    targetTab: 'discover',
    opportunityId: 'stripe-analytics-pm',
  },
  {
    id: 'notif-3',
    title: '🎯 A new case competition opened today',
    subtitle: 'Harvard VC Cup • 1d ago',
    timeAgo: '1d ago',
    unread: true,
    type: 'new',
    targetTab: 'discover',
    opportunityId: 'harvard-vc-cup',
  },
  {
    id: 'notif-4',
    title: '⏰ Application deadline tomorrow',
    subtitle: 'Bain Associate • Urgent',
    timeAgo: 'Urgent',
    unread: true,
    type: 'urgent',
    targetTab: 'my-tracker',
  },
];

export const INITIAL_FOCUS_CHECKLIST: FocusChecklistItem[] = [
  {
    id: 'focus-1',
    title: 'McKinsey Strategy Case',
    subtitle: 'Due in 2 days • Final Polish',
    completed: true,
    urgentText: 'Due in 2 days',
    tagColor: 'rose',
  },
  {
    id: 'focus-2',
    title: 'BCG X Hackathon Deck',
    subtitle: 'Team slide check • 4 slides left',
    completed: false,
    tagColor: 'purple',
  },
  {
    id: 'focus-3',
    title: 'Healthcare Analytics Abstract',
    subtitle: 'Faculty review ready • 1.2k words',
    completed: false,
    tagColor: 'emerald',
  },
];

export const COPILOT_KNOWLEDGE_BASE: Record<
  string,
  { response: string; badge?: string }
> = {
  'simulate a mckinsey analytics case prompt': {
    badge: 'McKinsey Case Simulator',
    response: `### 🎯 McKinsey Strategy Simulation: Automated Healthcare Logistics

**Context:**
A tier-1 pan-European pharmacy delivery platform is experiencing a 14% drop in EBIT margins despite a 38% surge in Gross Merchandise Value (GMV).

**Your Objective:**
Diagnose the root causes of the margin erosion across customer cohorts, and determine whether shifting from guaranteed 30-minute delivery to 90-minute batched clustering will restore profitability.

**Key Data Points Provided:**
- Current average basket: €32.50
- Average delivery cost per order: €6.40 (comprising €3.90 rider payout, €1.80 hub picking, €0.70 packaging)
- Churn among high-frequency customers if SLA is relaxed to 60 mins: estimated at 4.2%

**Prompt for Prince:**
How would you structure your first 3 minutes of hypothesis generation? Would you evaluate pricing tiering or fulfillment route density first?`,
  },

  'tailor my resume bullets for stripe pm': {
    badge: 'Stripe PM Alignment',
    response: `### ✨ Tailored Resume Bullets for Stripe Analytics Product Manager

Based on your MBA coursework in predictive modeling and prior operations experience, here are high-impact metric-driven bullet points formatted for Stripe's culture:

1. **Revenue Operations & Pricing Architecture:**
   > *"Architected dynamic payment retry algorithm analyzing 120k+ recurring transaction patterns, reducing involuntary churn by 3.8% and unlocking $1.4M ARR across enterprise tiers."*

2. **Cross-functional API & Telemetry Delivery:**
   > *"Spearheaded cross-functional sprint with 6 core engineers to build automated chargeback dispute telemetry, cutting manual analyst triage turnaround from 48h to 8.5m."*

3. **Data-Informed GTM Strategy:**
   > *"Defined 0-to-1 instrumentation telemetry and north star activation metrics for self-serve merchant onboarding, increasing 14-day cohort retention from 41% to 56%."*

*Tip: Highlight your SQL and python experience in the skills section to clear Stripe's technical PM screening.*`,
  },

  'show alumni connection pathways at bain': {
    badge: 'Bain Alumni Pathways',
    response: `### 🤝 Active Alumni Pathways at Bain & Company

CampusIQ identified **3 verified alumni from your business school cohort** currently staffed in Bain's Digital & Analytics Practice:

1. **Rohan Varma (MBA '23)**
   - *Current Role:* Manager, Advanced Analytics & Private Equity Group, Bain Mumbai
   - *Common Ground:* Co-authored Business Analytics thesis on supply chain stress testing
   - *Best Intro Approach:* Mention your current IIMB × Flipkart quick-commerce case model

2. **Sneha Mukherjee (MBA '24)**
   - *Current Role:* Senior Associate Consultant, Retail & Technology Practice, Bain Singapore
   - *Common Ground:* Winner of the 2024 Harvard VC Cup
   - *Best Intro Approach:* Ask for a 15-minute coffee chat regarding Bain's internal case evaluation rubrics

3. **Arjun Singhania (MBA '22)**
   - *Current Role:* Partner, Bain Digital Delivery (Bengaluru)
   - *Campus Activity:* Frequent guest lecturer in Fall Strategy Sprints`,
  },

  'review your executive summary pitch': {
    badge: 'Flipkart Case Critique',
    response: `### 🔍 AI Pitch Critique: IIM Product Wizard 2025

**Evaluation Against FlipKart Commerce Labs Rubric:**

✅ **Strengths:**
- Strong focus on unit economics rather than pure customer acquisition vanity metrics.
- Good alignment between dark store pick-route compression and the target metric (under $0.74 per basket).

⚠️ **Critical Vulnerabilities to Address Before Nov 18:**
1. **Collateral SLA Risk:** You haven't accounted for surge density during peak evening dinner windows (7 PM – 10 PM) where rider batching typically degrades delivery times from 12 mins to 24 mins.
2. **Catalog Substitution Logic:** Clarify your model's threshold for SKU substitutions when high-margin fresh items are out of stock.

**Recommendation:**
Add a 1-paragraph sensitivity table in your Executive Summary demonstrating the break-even basket size at 3 different delivery fee tiers (€0.50, €0.99, and free for subscribers).`,
  },

  'what should i apply for this week?': {
    badge: 'Sprint Recommendation',
    response: `### 🎯 Prince's High-Conviction Sprints for This Week

Based on your current 94% Profile Fit in Business Analytics and active coursework, here is your prioritized application schedule:

1. **Immediate (Closing in 4 days):**
   - **IIM Product Wizard Case Challenge** (92% Match) — Finalize team submission and 2-page brief.
2. **High Priority (Closing next week):**
   - **Bain Analytics Challenge** (87% Match) — Run SQL sensitivity analysis.
   - **Google Summer Analyst Intern** (95% Match) — Submit application via campus referral link.
3. **Low Effort / High Upside:**
   - **Wharton Venture Fellowship** (85% Match) — Review essay draft with mentor.`,
  },

  'which deadline should i prioritize?': {
    badge: 'Deadline Priority Engine',
    response: `### ⚡ Urgent Deadline Prioritization

**1. Nov 18 (4 Days Left): IIM Product Wizard Case Challenge**
- *Effort required:* ~5 hours (Slide deck polish + 2-page brief)
- *Expected Value:* High ($15,000 USD + Direct VP of Product PPO interview)
- *Odds Score:* **Top 5% candidate** based on your Predictive Analytics coursework

**2. Nov 20 (9 Days Left): Amazon Pathways Leadership Program**
- *Effort required:* 2 hours (Behavioral prep for Bar Raiser interview)
- *Status:* Scheduled slot Nov 20, 2:30 PM EST

**3. Nov 22 (12 Days Left): Bain Analytics Challenge**
- *Effort required:* 4 hours (Financial spreadsheet sensitivity model)`,
  },
};
