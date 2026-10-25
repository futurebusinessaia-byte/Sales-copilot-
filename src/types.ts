export type NavView =
  | 'dashboard'
  | 'companies'
  | 'buying-committee'
  | 'revenue-intelligence'
  | 'competitors'
  | 'roi-calculator'
  | 'discovery'
  | 'proposal'
  | 'email-studio'
  | 'executive-reports'
  | 'meeting-assistant'
  | 'crm'
  | 'settings';

export interface ProspectInput {
  companyName: string;
  website: string;
  industry: string;
  country: string;
  employeeRange: string;
  currentHrSoftware?: string;
  businessModel?: string;
  digitalMaturity?: string;
}

export interface DetailedCompanyResearch {
  executiveSummary: string;
  companyProfile: string;
  technologyStack: string[];
  businessModel: string;
  recentGrowth: string;
  funding: string;
  digitalMaturity: 'Low' | 'Moderate' | 'High' | 'Enterprise Digital-First';
  buyingSignals: string[];
  aiAdoptionScore: number; // 0-100
  growthOpportunities: string[];
}

export interface BuyingCommitteeMember {
  role: 'CEO' | 'Founder' | 'COO' | 'CFO' | 'CHRO' | 'HR Director' | 'Operations Director' | 'Delivery Head' | 'Finance Head';
  classification: 'Champion' | 'Economic Buyer' | 'Influencer' | 'Technical Buyer' | 'Decision Maker' | 'Blocker';
  namePlaceholder?: string;
  influenceWeight: 'High' | 'Critical' | 'Medium';
  stance: 'Supportive' | 'Neutral' | 'Skeptical' | 'Champion';
  keyPriorities: string[];
  engagementStrategy: string;
}

export interface OpportunityScoreData {
  overallFitScore: number; // 0-100
  dealProbability: number; // % e.g. 78%
  riskScore: number; // 0-100 (lower is better or risk level)
  urgencyScore: number; // 0-100
  revenuePotential: string; // e.g., "$120,000 / yr"
  expansionPotential: string; // e.g., "$45,000 ARR add-on"
  recommendedNextAction: string;
  scoreBreakdown: {
    category: string;
    points: number;
    maxPoints: number;
    notes: string;
  }[];
}

export interface CompetitorComparison {
  competitorName: 'SAP' | 'Oracle' | 'Zoho' | 'Darwinbox' | 'Keka' | 'greytHR' | string;
  marketShareCategory: string;
  strengths: string[];
  weaknesses: string[];
  migrationDifficulty: 'Low' | 'Moderate' | 'High' | 'Complex';
  competitiveAdvantage: string;
  switchingStrategy: string;
}

export interface RoiEngineData {
  implementationCost: number;
  estimatedAnnualSavings: number;
  threeYearRoiPercentage: number;
  paybackPeriodMonths: number;
  productivityGainHoursPerWeek: number;
  managerTimeSavedPercentage: number;
  breakdown: {
    area: string;
    currentWaste: string;
    savingsWithAI: string;
  }[];
}

export interface DiscoveryCoachData {
  meetingAgenda: string[];
  consultativeQuestions: {
    number: number;
    question: string;
    topicCategory: string;
    objective: string;
    whatToListenFor: string;
  }[];
  painPoints: {
    title: string;
    category: string;
    impact: string;
    severity: 'Critical' | 'High' | 'Medium';
  }[];
  discoveryChecklist: string[];
  objectionHandling: {
    objection: string;
    context: string;
    recommendedResponse: string;
    pivotQuestion: string;
  }[];
  closingStrategy: string;
}

export interface ProposalData {
  executiveSummary: string;
  businessChallenges: string[];
  recommendedSolution: string;
  timeline: {
    phase: string;
    duration: string;
    deliverables: string[];
  }[];
  investment: {
    licenseFee: string;
    implementationFee: string;
    trainingAndSupport: string;
    totalYearOne: string;
  };
  roiSummary: string;
  implementationPlan: string[];
  nextSteps: string[];
}

export interface EmailTemplates {
  coldEmail: { subject: string; body: string };
  followUpEmail: { subject: string; body: string };
  meetingConfirmation: { subject: string; body: string };
  proposalFollowUp: { subject: string; body: string };
  renewalReminder: { subject: string; body: string };
  upsellEmail: { subject: string; body: string };
}

export interface ExecutiveReportData {
  revenueForecast: string;
  salesFunnel: { stage: string; count: number; value: string }[];
  dealVelocityDays: number;
  lostDealReasons: { reason: string; percentage: number }[];
  pipelineHeatmap: { sector: string; temperature: 'Hot' | 'Warm' | 'Cold'; dealValue: string }[];
  riskAlerts: { risk: string; severity: 'High' | 'Medium' | 'Low'; mitigation: string }[];
  aiRecommendations: string[];
  qbrSummary: string;
}

export interface MeetingAssistantData {
  voicePrepScript: string;
  keyTalkingPoints: string[];
  liveObjectionCoach: { triggerWord: string; instantRebuttal: string }[];
}

export interface AccountCrmData {
  timeline: { date: string; event: string; actor: string; type: 'Email' | 'Call' | 'Meeting' | 'Proposal' }[];
  healthScore: number;
  csInsights: string[];
}

export interface CompanyIntelligence {
  businessSummary: string;
  industry: string;
  estimatedEmployeeSize: string;
  growthStage: string;
  digitalMaturity: 'Low' | 'Moderate' | 'High' | 'Enterprise Digital-First';
  keyTechnologies?: string[];
  headquarters?: string;
}

export interface IcpFitScore {
  score: number;
  grade: 'A+' | 'A' | 'B+' | 'B' | 'C';
  summary: string;
  matchingCriteria: string[];
  gapsOrRisks: string[];
}

export interface DecisionMaker {
  title: string;
  roleCategory: 'Executive' | 'Operations' | 'Human Resources' | 'Delivery & Projects';
  importance: 'Primary Sponsor' | 'Decision Maker' | 'Influencer' | 'Budget Holder' | 'Champion';
  whyRoleMatters: string;
  keyConcerns: string[];
  recommendedPitchAngle: string;
}

export interface PainPoint {
  id: string;
  title: string;
  category: string;
  description: string;
  businessImpact: string;
  severity: 'High' | 'Critical' | 'Medium';
}

export interface ProductPositioning {
  capability: string;
  tagline: string;
  description: string;
  keyBenefits: string[];
  suggestedModules: string[];
}

export interface DiscoveryQuestion {
  number: number;
  question: string;
  topicCategory: 'Current System' | 'Approval Workflows' | 'Reporting Issues' | 'Operational Bottlenecks' | 'Growth Plans' | 'Software Costs' | 'Implementation Concerns';
  objective: string;
  whatToListenFor: string;
}

export interface ObjectionHandler {
  objection: string;
  context: string;
  recommendedResponse: string;
  pivotQuestion: string;
}

export interface EmailVariation {
  subject: string;
  body: string;
}

export interface LinkedInVariation {
  body: string;
}

export interface OutreachAssets {
  coldEmail: {
    subject: string;
    body: string;
  };
  linkedInMessage: {
    body: string;
  };
  coldCallScript: {
    hook: string;
    valueProposition: string;
    discoveryTransition: string;
    fullScriptText: string;
  };
  emailVariations?: {
    roi: EmailVariation;
    painPoint: EmailVariation;
    executive: EmailVariation;
  };
  linkedInVariations?: {
    roi: LinkedInVariation;
    painPoint: LinkedInVariation;
    executive: LinkedInVariation;
  };
}

export interface ExecutiveBrief {
  companySnapshot: string;
  opportunitySummary: string;
  likelyPriorities: string[];
  recommendedTalkingPoints: string[];
  potentialRisks: string[];
  nextActions: string[];
}

export interface SalesReport {
  id: string;
  createdAt: string;
  input: ProspectInput;
  detailedResearch: DetailedCompanyResearch;
  buyingCommittee: BuyingCommitteeMember[];
  opportunityScore: OpportunityScoreData;
  competitors: CompetitorComparison[];
  roiData: RoiEngineData;
  discoveryCoach: DiscoveryCoachData;
  proposal: ProposalData;
  emailStudio: EmailTemplates;
  executiveReport: ExecutiveReportData;
  meetingAssistant: MeetingAssistantData;
  accountCrm: AccountCrmData;
  // Legacy fields retained for backwards compatibility
  companyIntelligence: CompanyIntelligence;
  icpFitScore: IcpFitScore;
  decisionMakerMap: DecisionMaker[];
  businessPainPoints: PainPoint[];
  productPositioning: ProductPositioning[];
  discoveryQuestions: DiscoveryQuestion[];
  objectionHandling: ObjectionHandler[];
  outreachAssets: OutreachAssets;
  executiveBrief: ExecutiveBrief;
}

export interface SavedProspect {
  id: string;
  savedAt: string;
  companyName: string;
  industry: string;
  country: string;
  employeeRange: string;
  icpScore: number;
  report: SalesReport;
}

export interface EvaluationSession {
  evalId: string;
  authType: 'guest' | 'google';
  userName: string;
  userEmail?: string;
  userAvatar?: string;
  createdDate: string;
  remainingAnalyses: number;
  totalAnalyses: number;
  lastActivity: string;
  status: 'active' | 'disabled';
  ip?: string;
  userAgent?: string;
}

export interface EvaluationAnalytics {
  totalVisitors: number;
  totalAnalyses: number;
  avgSessionMinutes: number;
  returningUsers: number;
  topIndustries: { industry: string; count: number }[];
  topCountries: { country: string; count: number }[];
  activeUsersCount: number;
  disabledUsersCount: number;
}


