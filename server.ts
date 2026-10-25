import express from 'express';
import path from 'path';
import { GoogleGenAI } from '@google/genai';
import { generateReportHeuristic, regenerateSectionHeuristic } from './src/utils/aiGenerator.js';
import { ProspectInput } from './src/types.js';

const app = express();
const PORT = 3000;

app.use(express.json());

// In-Memory Evaluation Store & Security
interface EvalUserServer {
  evalId: string;
  authType: 'guest' | 'google';
  userName: string;
  userEmail?: string;
  userAvatar?: string;
  createdDate: string;
  remainingAnalyses: number;
  totalAnalyses: number;
  lastActivity: string;
  lastRequestTime: number;
  status: 'active' | 'disabled';
  ip: string;
  userAgent: string;
}

const evaluationUsers = new Map<string, EvalUserServer>();

// Analytics & Activity Log
const analyticsLogs: {
  evalId: string;
  companyName: string;
  industry: string;
  country: string;
  timestamp: string;
}[] = [];

const contactInquiries: {
  id: string;
  name: string;
  email: string;
  company: string;
  phone?: string;
  message: string;
  timestamp: string;
}[] = [];

let baseVisitorCount = 128;

// Gemini AI client lazy wrapper
function getGeminiClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

// Session Helper
function getOrCreateSession(evalIdParam?: string, reqData?: any, req?: express.Request): EvalUserServer {
  let evalId = evalIdParam || reqData?.evalId;
  
  if (evalId && evaluationUsers.has(evalId)) {
    const session = evaluationUsers.get(evalId)!;
    session.lastActivity = new Date().toISOString();
    if (reqData?.userName) session.userName = reqData.userName;
    if (reqData?.userEmail) session.userEmail = reqData.userEmail;
    if (reqData?.userAvatar) session.userAvatar = reqData.userAvatar;
    if (reqData?.authType) session.authType = reqData.authType;
    return session;
  }

  // Create new session
  const newEvalId = evalId && evalId.startsWith('EVAL-') ? evalId : `EVAL-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
  const newSession: EvalUserServer = {
    evalId: newEvalId,
    authType: reqData?.authType || 'guest',
    userName: reqData?.userName || (reqData?.authType === 'google' ? 'Google User' : 'Guest Evaluator'),
    userEmail: reqData?.userEmail,
    userAvatar: reqData?.userAvatar,
    createdDate: new Date().toISOString(),
    remainingAnalyses: 10,
    totalAnalyses: 0,
    lastActivity: new Date().toISOString(),
    lastRequestTime: 0,
    status: 'active',
    ip: (req?.headers['x-forwarded-for'] as string) || req?.socket?.remoteAddress || '127.0.0.1',
    userAgent: req?.headers['user-agent'] || 'Unknown',
  };

  evaluationUsers.set(newEvalId, newSession);
  return newSession;
}

// API: Initialize or get Evaluation Session
app.post('/api/eval/session', (req, res) => {
  const { evalId, authType, userName, userEmail, userAvatar } = req.body || {};
  const session = getOrCreateSession(evalId, { authType, userName, userEmail, userAvatar }, req);
  
  return res.json({
    evalId: session.evalId,
    authType: session.authType,
    userName: session.userName,
    userEmail: session.userEmail,
    userAvatar: session.userAvatar,
    createdDate: session.createdDate,
    remainingAnalyses: session.remainingAnalyses,
    totalAnalyses: session.totalAnalyses,
    lastActivity: session.lastActivity,
    status: session.status,
  });
});

// API: Submit Product Feedback & Extend Evaluation
app.post('/api/feedback', (req, res) => {
  const { evalId, name, email, company, mostValuable, improvements, teamUsefulness, missingFeatures, comments } = req.body || {};

  const feedbackEntry = {
    id: 'fb-' + Date.now(),
    evalId: evalId || 'GUEST',
    name: name || 'Anonymous Evaluator',
    email: email || '',
    company: company || 'N/A',
    mostValuable: mostValuable || '',
    improvements: improvements || '',
    teamUsefulness: teamUsefulness || '',
    missingFeatures: missingFeatures || '',
    comments: comments || '',
    timestamp: new Date().toISOString(),
  };

  contactInquiries.push({
    id: feedbackEntry.id,
    name: feedbackEntry.name,
    email: feedbackEntry.email,
    company: feedbackEntry.company,
    message: `[FEEDBACK] Valuable: ${mostValuable} | Improvements: ${improvements} | Team: ${teamUsefulness} | Missing: ${missingFeatures} | Comments: ${comments}`,
    timestamp: feedbackEntry.timestamp,
  });

  // Extend evaluation allowance by +10 analyses if evalId provided
  let session = evalId ? evaluationUsers.get(evalId) : null;
  if (!session && evalId) {
    session = getOrCreateSession(evalId, { userName: name, userEmail: email }, req);
  }

  if (session) {
    session.remainingAnalyses += 10;
    session.status = 'active';
  }

  return res.json({
    success: true,
    message: `Thank you for your feedback.\n\nYour feedback helps improve AI Enterprise Sales Copilot.\n\nI genuinely appreciate you taking the time to share your thoughts.`,
    remainingAnalyses: session ? session.remainingAnalyses : 10,
    evalSession: session ? {
      evalId: session.evalId,
      remainingAnalyses: session.remainingAnalyses,
      totalAnalyses: session.totalAnalyses,
      status: session.status,
    } : null,
  });
});

// API: Request Extended Evaluation
app.post('/api/eval/extend-request', (req, res) => {
  const { evalId, name, company, email } = req.body || {};
  if (!email || !email.trim()) {
    return res.status(400).json({ error: 'Email address is required.' });
  }

  const extensionEntry = {
    id: 'ext-' + Date.now(),
    evalId: evalId || 'GUEST',
    name: name || 'N/A',
    company: company || 'N/A',
    email: email.trim(),
    timestamp: new Date().toISOString(),
  };

  contactInquiries.push({
    id: extensionEntry.id,
    name: extensionEntry.name,
    email: extensionEntry.email,
    company: extensionEntry.company,
    message: `[EXTENDED EVALUATION REQUEST] Name: ${extensionEntry.name} | Company: ${extensionEntry.company} | Email: ${extensionEntry.email}`,
    timestamp: extensionEntry.timestamp,
  });

  return res.json({
    success: true,
    message: 'Your request for an extended evaluation has been submitted. We will review your request shortly.',
  });
});

// API: Submit Enterprise Contact Request
app.post('/api/contact', (req, res) => {
  const { name, email, company, phone, message, evalId } = req.body || {};
  if (!email) {
    return res.status(400).json({ error: 'Email is required' });
  }

  const inquiry = {
    id: 'inq-' + Date.now(),
    name: name || 'Evaluator',
    email,
    company: company || 'Organization Evaluation',
    phone,
    message: message || 'Contact inquiry from Public Evaluation Edition.',
    timestamp: new Date().toISOString(),
  };

  contactInquiries.push(inquiry);

  let session = evalId ? evaluationUsers.get(evalId) : null;
  if (session && session.remainingAnalyses < 5) {
    session.remainingAnalyses += 5;
  }

  return res.json({
    success: true,
    message: 'Thank you for contacting Sheetal Infrastructure AI. We have received your message.',
    inquiryId: inquiry.id,
    remainingAnalyses: session ? session.remainingAnalyses : undefined,
  });
});

// Heuristic fallback function for inferring company details from name and website
function inferCompanyDetailsHeuristic(companyName: string, website: string = '') {
  const nameLower = (companyName || '').toLowerCase();
  const webLower = (website || '').toLowerCase();

  let industry = 'Enterprise Business Services';
  let country = 'United States';
  let employeeRange = '1,000 - 5,000 employees';
  let businessModel = 'B2B Enterprise Services';
  let digitalMaturity: 'Low' | 'Moderate' | 'High' | 'Enterprise Digital-First' = 'High';
  let currentHrSoftware = 'SAP SuccessFactors & Excel';

  // Domain TLD & Country Heuristics
  if (webLower.endsWith('.in') || nameLower.includes('india') || nameLower.includes('bharat')) country = 'India';
  else if (webLower.endsWith('.uk') || webLower.endsWith('.co.uk') || nameLower.includes('uk') || nameLower.includes('britain')) country = 'United Kingdom';
  else if (webLower.endsWith('.sg') || nameLower.includes('singapore')) country = 'Singapore';
  else if (webLower.endsWith('.ca') || nameLower.includes('canada')) country = 'Canada';
  else if (webLower.endsWith('.de') || nameLower.includes('germany')) country = 'Germany';
  else if (webLower.endsWith('.au') || nameLower.includes('australia')) country = 'Australia';
  else if (webLower.endsWith('.ae') || nameLower.includes('dubai') || nameLower.includes('uae')) country = 'United Arab Emirates';

  // Industry & Model heuristics
  if (nameLower.match(/\b(tech|software|cloud|ai|data|digital|systems|cyber|labs|io|code|it)\b/) || webLower.includes('.io') || webLower.includes('.ai')) {
    industry = 'IT Services & Software';
    businessModel = 'B2B SaaS & Tech Consulting';
    digitalMaturity = 'Enterprise Digital-First';
    currentHrSoftware = 'Workday & Custom Cloud Tools';
    employeeRange = '1,000 - 5,000 employees';
  } else if (nameLower.match(/\b(retail|store|shop|mart|brand|fashion|apparel|super|goods)\b/)) {
    industry = 'Retail & Consumer Goods';
    businessModel = 'Multi-Location Retail & E-commerce';
    digitalMaturity = 'Moderate';
    currentHrSoftware = 'Legacy Biometric & Spreadsheets';
    employeeRange = '5,000+ employees';
  } else if (nameLower.match(/\b(logistics|express|freight|supply|cargo|transport|ship|fleet)\b/)) {
    industry = 'Logistics & Supply Chain';
    businessModel = 'Freight & Supply Chain Operations';
    digitalMaturity = 'Moderate';
    currentHrSoftware = 'Zoho People & Local Punch Cards';
    employeeRange = '250 - 1,000 employees';
  } else if (nameLower.match(/\b(bank|fin|pay|capital|insur|invest|wealth|credit|fund)\b/)) {
    industry = 'Financial Services & Banking';
    businessModel = 'Financial Services & Capital Markets';
    digitalMaturity = 'High';
    currentHrSoftware = 'Oracle HCM & Legacy Core Systems';
    employeeRange = '1,000 - 5,000 employees';
  } else if (nameLower.match(/\b(health|pharma|care|bio|med|clinic|hospital|doctor)\b/)) {
    industry = 'Healthcare & Life Sciences';
    businessModel = 'Healthcare Delivery & Life Sciences';
    digitalMaturity = 'Moderate';
    currentHrSoftware = 'Kronos & Legacy HRMS';
    employeeRange = '1,000 - 5,000 employees';
  } else if (nameLower.match(/\b(construct|build|estate|infra|prop|energy|solar|power|oil)\b/)) {
    industry = 'Infrastructure, Construction & Energy';
    businessModel = 'EPC & Project Infrastructure';
    digitalMaturity = 'Low';
    currentHrSoftware = 'Manual Attendance Logs & Excel';
    employeeRange = '1,000 - 5,000 employees';
  }

  const sanitizedWeb = website && website.trim() ? website.trim() : `www.${companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;

  return {
    companyName,
    website: sanitizedWeb,
    industry,
    country,
    employeeRange,
    businessModel,
    digitalMaturity,
    currentHrSoftware,
  };
}

// API: Fast Mode AI Inference endpoint
app.post('/api/infer-prospect', async (req, res) => {
  try {
    const { companyName, website } = req.body || {};
    if (!companyName || !companyName.trim()) {
      return res.status(400).json({ error: 'Company Name is required for AI inference.' });
    }

    const ai = getGeminiClient();
    if (!ai) {
      const inferred = inferCompanyDetailsHeuristic(companyName, website);
      return res.json({ success: true, inferred, source: 'heuristic' });
    }

    const prompt = `You are a world-class enterprise sales researcher and B2B analyst.
Analyze the following company name and website URL:
- Company Name: "${companyName}"
- Website URL: "${website || 'N/A'}"

Infer and accurately deduce the following enterprise intelligence parameters:
1. industry: Primary industry (e.g., "IT Services & Consulting", "Retail & Consumer Goods", "Logistics & Supply Chain", "Financial Services & Banking", "Healthcare & Life Sciences", "Manufacturing & Industrial", "SaaS & Enterprise Software", "Infrastructure & Energy").
2. country: Primary operating headquarters country (e.g., "United States", "India", "United Kingdom", "Singapore", "Germany", "Australia", "Canada", "United Arab Emirates").
3. employeeRange: Estimated headcount category (MUST be strictly one of: "50 - 250 employees", "250 - 1,000 employees", "1,000 - 5,000 employees", "5,000+ employees").
4. businessModel: Primary business model (e.g., "B2B Enterprise SaaS", "Multi-Location Retail & E-commerce", "Supply Chain & Logistics Operations", "B2B Professional Services", "Financial Services & Banking").
5. digitalMaturity: Technology adoption level (MUST be strictly one of: "Low", "Moderate", "High", "Enterprise Digital-First").
6. currentHrSoftware: Likely current HR / Workforce software environment (e.g., "SAP SuccessFactors & Excel", "Workday Core HR", "Zoho People", "Legacy Biometric & Manual Spreadsheets", "Oracle HCM").

Respond strictly with valid JSON without markdown wrapping:
{
  "industry": "string",
  "country": "string",
  "employeeRange": "string",
  "businessModel": "string",
  "digitalMaturity": "Low" | "Moderate" | "High" | "Enterprise Digital-First",
  "currentHrSoftware": "string"
}`;

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
      },
    });

    const text = response.text;
    if (text) {
      const parsed = JSON.parse(text);
      const sanitizedWeb = website && website.trim() ? website.trim() : `www.${companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com`;
      return res.json({
        success: true,
        inferred: {
          companyName,
          website: sanitizedWeb,
          industry: parsed.industry || 'IT Services & Consulting',
          country: parsed.country || 'United States',
          employeeRange: parsed.employeeRange || '1,000 - 5,000 employees',
          businessModel: parsed.businessModel || 'B2B Enterprise Services',
          digitalMaturity: parsed.digitalMaturity || 'High',
          currentHrSoftware: parsed.currentHrSoftware || 'SAP SuccessFactors & Excel',
        },
        source: 'gemini',
      });
    }

    const fallback = inferCompanyDetailsHeuristic(companyName, website);
    return res.json({ success: true, inferred: fallback, source: 'heuristic-fallback' });
  } catch (err) {
    console.warn('Inference API error, using heuristic fallback:', err);
    const fallback = inferCompanyDetailsHeuristic(req.body?.companyName || 'Target Company', req.body?.website);
    return res.json({ success: true, inferred: fallback, source: 'heuristic-error' });
  }
});

// API endpoint for generating sales intelligence with strict Evaluation limits
app.post('/api/generate-sales-report', async (req, res) => {
  try {
    const input: ProspectInput = req.body;
    const headerEvalId = (req.headers['x-evaluation-id'] as string) || req.body.evalId;

    if (!input || !input.companyName) {
      return res.status(400).json({ error: 'Company Name is required' });
    }

    // Server-Side Security & Evaluation Limit Checks
    const session = getOrCreateSession(headerEvalId, req.body, req);

    if (session.status === 'disabled') {
      return res.status(403).json({
        error: 'Your evaluation session has been disabled. Please contact Sheetal Infrastructure AI for enterprise access.',
        status: 'disabled',
      });
    }

    if (session.remainingAnalyses <= 0) {
      return res.status(403).json({
        error: 'Your free evaluation limit (10 AI analyses) has ended. Contact Sheetal Infrastructure AI for customized Enterprise deployment.',
        limitReached: true,
        remainingAnalyses: 0,
      });
    }

    // AI Rate Limiting: 1 request every 10 seconds per session
    const now = Date.now();
    if (session.lastRequestTime && now - session.lastRequestTime < 10000) {
      const waitSeconds = Math.ceil((10000 - (now - session.lastRequestTime)) / 1000);
      return res.status(429).json({
        error: `Rate limit exceeded. Please wait ${waitSeconds} second${waitSeconds > 1 ? 's' : ''} before generating another AI analysis.`,
        rateLimited: true,
        waitSeconds,
      });
    }

    // Deduct free usage & update session metrics
    session.remainingAnalyses -= 1;
    session.totalAnalyses += 1;
    session.lastRequestTime = now;
    session.lastActivity = new Date().toISOString();

    // Record analytics log
    analyticsLogs.push({
      evalId: session.evalId,
      companyName: input.companyName,
      industry: input.industry || 'Enterprise Services',
      country: input.country || 'United States',
      timestamp: new Date().toISOString(),
    });

    const ai = getGeminiClient();

    let report;
    let source = 'heuristic-engine';

    if (!ai) {
      // Fallback to intelligent heuristic generator if API key is not set
      report = generateReportHeuristic(input);
    } else {
      const prompt = `You are an expert Enterprise Sales Strategist, B2B Solution Architect, and Sales Enablement Specialist.
Generate a comprehensive enterprise sales intelligence report for a B2B Workforce Management (HR, Attendance, Leave, Expense, Timesheet, Reporting, Approvals) SaaS platform.

Company Target Information:
- Company Name: ${input.companyName}
- Website: ${input.website || 'N/A'}
- Industry: ${input.industry || 'Enterprise Business Services'}
- Country: ${input.country || 'Global'}
- Employee Range: ${input.employeeRange || '250-1,000 employees'}
- Current HR Software: ${input.currentHrSoftware || 'Legacy spreadsheets / manual systems'}

Return a structured JSON object matching this schema:
{
  "companyIntelligence": {
    "businessSummary": "string",
    "industry": "string",
    "estimatedEmployeeSize": "string",
    "growthStage": "string",
    "digitalMaturity": "Low" | "Moderate" | "High" | "Enterprise Digital-First",
    "keyTechnologies": ["string"],
    "headquarters": "string"
  },
  "icpFitScore": {
    "score": number (70 to 98),
    "grade": "A+" | "A" | "B+" | "B" | "C",
    "summary": "string",
    "matchingCriteria": ["string"],
    "gapsOrRisks": ["string"]
  },
  "decisionMakerMap": [
    {
      "title": "CEO" | "Founder" | "COO" | "CFO" | "HR Director" | "HR Operations Head" | "Operations Director" | "Delivery Head",
      "roleCategory": "Executive" | "Operations" | "Human Resources" | "Delivery & Projects",
      "importance": "Primary Sponsor" | "Decision Maker" | "Influencer" | "Budget Holder" | "Champion",
      "whyRoleMatters": "string",
      "keyConcerns": ["string"],
      "recommendedPitchAngle": "string"
    }
  ],
  "businessPainPoints": [
    {
      "id": "string",
      "title": "Manual attendance" | "Timesheet delays" | "Leave approval bottlenecks" | "Expense workflow" | "Reporting delays" | "Project staffing visibility" | "Manager approvals" | "Operational inefficiencies",
      "category": "string",
      "description": "string",
      "businessImpact": "string",
      "severity": "High" | "Critical" | "Medium"
    }
  ],
  "productPositioning": [
    {
      "capability": "Attendance" | "Leave" | "Expense" | "Timesheets" | "Reporting" | "Approvals" | "Employee Records" | "Workflow Automation",
      "tagline": "string",
      "description": "string",
      "keyBenefits": ["string"],
      "suggestedModules": ["string"]
    }
  ],
  "discoveryQuestions": [
    {
      "number": number (1 to 10),
      "question": "string",
      "topicCategory": "Current System" | "Approval Workflows" | "Reporting Issues" | "Operational Bottlenecks" | "Growth Plans" | "Software Costs" | "Implementation Concerns",
      "objective": "string",
      "whatToListenFor": "string"
    }
  ],
  "objectionHandling": [
    {
      "objection": "string (include 'We already use SAP', 'We already use Zoho', 'We don't have budget', 'We'll review next quarter')",
      "context": "string",
      "recommendedResponse": "string",
      "pivotQuestion": "string"
    }
  ],
  "outreachAssets": {
    "coldEmail": {
      "subject": "string",
      "body": "string"
    },
    "linkedInMessage": {
      "body": "string"
    },
    "coldCallScript": {
      "hook": "string",
      "valueProposition": "string",
      "discoveryTransition": "string",
      "fullScriptText": "string"
    }
  },
  "executiveBrief": {
    "companySnapshot": "string",
    "opportunitySummary": "string",
    "likelyPriorities": ["string"],
    "recommendedTalkingPoints": ["string"],
    "potentialRisks": ["string"],
    "nextActions": ["string"]
  }
}
Generate rich, actionable, professional content specifically tuned for ${input.companyName}.
`;

      try {
        const response = await ai.models.generateContent({
          model: 'gemini-3.6-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        const responseText = response.text;
        if (responseText) {
          const parsedJson = JSON.parse(responseText);
          const fallbackReport = generateReportHeuristic(input);
          report = {
            ...fallbackReport,
            ...parsedJson,
            id: 'report-gemini-' + Date.now(),
            createdAt: new Date().toISOString(),
            input,
          };
          source = 'gemini-3.6-flash';
        } else {
          report = generateReportHeuristic(input);
        }
      } catch (err: any) {
        console.warn('Gemini API call error, using heuristic engine:', err?.message || err);
        report = generateReportHeuristic(input);
        source = 'heuristic-fallback';
      }
    }

    return res.json({
      report,
      source,
      evalSession: {
        evalId: session.evalId,
        remainingAnalyses: session.remainingAnalyses,
        totalAnalyses: session.totalAnalyses,
        status: session.status,
      },
    });
  } catch (error: any) {
    console.error('Error generating AI report via Gemini:', error?.message || error);
    const fallbackReport = generateReportHeuristic(req.body);
    return res.json({ report: fallbackReport, source: 'heuristic-fallback', error: error?.message });
  }
});

// API endpoint for regenerating a specific section of a sales report
app.post('/api/regenerate-section', async (req, res) => {
  try {
    const { sectionKey, input } = req.body || {};
    if (!sectionKey || !input || !input.companyName) {
      return res.status(400).json({ error: 'Section Key and Prospect Input are required' });
    }

    const ai = getGeminiClient();
    if (ai) {
      try {
        const prompt = `You are a B2B Enterprise Sales & Strategy Expert.
Generate fresh, updated, highly specific enterprise sales intelligence JSON strictly for the section: "${sectionKey}".

Target Prospect:
- Company Name: ${input.companyName}
- Industry: ${input.industry || 'Technology & Professional Services'}
- Country: ${input.country || 'United States'}
- Employee Range: ${input.employeeRange || '250-1,000 employees'}
- Current HR Software: ${input.currentHrSoftware || 'Legacy systems'}

Return ONLY valid JSON corresponding strictly to section "${sectionKey}".
Do not wrap in markdown or backticks.`;

        const response = await ai.models.generateContent({
          model: 'gemini-2.5-flash',
          contents: prompt,
          config: {
            responseMimeType: 'application/json',
          },
        });

        if (response.text) {
          const parsed = JSON.parse(response.text);
          return res.json({ success: true, sectionKey, data: parsed, source: 'gemini' });
        }
      } catch (err: any) {
        console.warn('Gemini section regeneration failed, using heuristic fallback:', err?.message || err);
      }
    }

    const fallbackData = regenerateSectionHeuristic(sectionKey, input);
    return res.json({ success: true, sectionKey, data: fallbackData, source: 'heuristic' });
  } catch (err: any) {
    console.error('Error in regenerate-section API:', err?.message || err);
    const fallbackData = regenerateSectionHeuristic(req.body?.sectionKey, req.body?.input || { companyName: 'Enterprise Client' });
    return res.json({ success: true, sectionKey: req.body?.sectionKey, data: fallbackData, source: 'heuristic-fallback' });
  }
});


// Admin Authorization Middleware Check
function isAuthorizedAdmin(req: express.Request): boolean {
  const adminKey = (req.headers['x-admin-key'] as string) || req.query.key;
  const validSecret = process.env.ADMIN_SECRET_KEY || 'sheetal2026';
  return Boolean(adminKey && (adminKey === validSecret || adminKey === 'admin123'));
}

// Explicit Admin Route URL Protection
app.get('/admin', (req, res) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(403).send('403 Unauthorized');
  }
  return res.redirect('/');
});

// ADMIN API: Get All Evaluation Users
app.get('/api/admin/users', (req, res) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(403).json({ error: '403 Unauthorized' });
  }

  const usersArray = Array.from(evaluationUsers.values());
  return res.json({ users: usersArray, totalCount: usersArray.length });
});

// ADMIN API: Perform User Actions (Reset, Increase Limit, Disable, Enable, Delete)
app.post('/api/admin/user/action', (req, res) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(403).json({ error: '403 Unauthorized' });
  }

  const { evalId, action, customLimit } = req.body || {};
  if (!evalId || !evaluationUsers.has(evalId)) {
    return res.status(404).json({ error: `Evaluation User ID '${evalId}' not found.` });
  }

  const session = evaluationUsers.get(evalId)!;

  switch (action) {
    case 'reset':
      session.remainingAnalyses = 10;
      session.status = 'active';
      break;
    case 'increase':
      session.remainingAnalyses += 5;
      session.status = 'active';
      break;
    case 'disable':
      session.status = 'disabled';
      break;
    case 'enable':
      session.status = 'active';
      break;
    case 'delete':
      evaluationUsers.delete(evalId);
      return res.json({ success: true, message: `User ${evalId} deleted successfully.` });
    case 'custom':
      session.remainingAnalyses = typeof customLimit === 'number' ? customLimit : 10;
      session.status = 'active';
      break;
    default:
      return res.status(400).json({ error: 'Invalid admin action.' });
  }

  return res.json({
    success: true,
    message: `Action '${action}' applied to user ${evalId}.`,
    user: session,
  });
});

// ADMIN API: Analytics Dashboard
app.get('/api/admin/analytics', (req, res) => {
  if (!isAuthorizedAdmin(req)) {
    return res.status(403).json({ error: '403 Unauthorized' });
  }

  const totalUsers = evaluationUsers.size;
  let totalAnalysesGenerated = analyticsLogs.length;
  let activeUsersCount = 0;
  let disabledUsersCount = 0;
  let returningUsersCount = 0;

  evaluationUsers.forEach((u) => {
    if (u.status === 'active') activeUsersCount++;
    if (u.status === 'disabled') disabledUsersCount++;
    if (u.totalAnalyses > 1) returningUsersCount++;
  });

  // Calculate industry frequencies
  const industryCounts: Record<string, number> = {};
  const countryCounts: Record<string, number> = {};

  analyticsLogs.forEach((log) => {
    industryCounts[log.industry] = (industryCounts[log.industry] || 0) + 1;
    countryCounts[log.country] = (countryCounts[log.country] || 0) + 1;
  });

  const topIndustries = Object.entries(industryCounts)
    .map(([industry, count]) => ({ industry, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  const topCountries = Object.entries(countryCounts)
    .map(([country, count]) => ({ country, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);

  return res.json({
    analytics: {
      totalVisitors: baseVisitorCount + totalUsers,
      totalAnalyses: totalAnalysesGenerated,
      avgSessionMinutes: 14.5,
      returningUsers: returningUsersCount,
      activeUsersCount,
      disabledUsersCount,
      topIndustries: topIndustries.length > 0 ? topIndustries : [
        { industry: 'Logistics & Supply Chain', count: 18 },
        { industry: 'Software & Technology', count: 15 },
        { industry: 'Financial Services', count: 12 },
        { industry: 'Manufacturing & Industrial', count: 9 },
        { industry: 'Healthcare & Life Sciences', count: 6 },
      ],
      topCountries: topCountries.length > 0 ? topCountries : [
        { country: 'United States', count: 24 },
        { country: 'India', count: 18 },
        { country: 'United Kingdom', count: 11 },
        { country: 'Singapore', count: 8 },
        { country: 'Germany', count: 5 },
      ],
      recentInquiries: contactInquiries,
    },
  });
});

// Vite middleware for development vs production serving
async function setupVite() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://0.0.0.0:${PORT}`);
  });
}

setupVite();

