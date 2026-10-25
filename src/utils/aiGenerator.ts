import { SalesReport, ProspectInput, DecisionMaker, PainPoint, ProductPositioning, DiscoveryQuestion, ObjectionHandler } from '../types';

export function generateReportHeuristic(input: ProspectInput): SalesReport {
  const company = input.companyName.trim() || 'Enterprise Client';
  const industry = input.industry.trim() || 'Technology & Professional Services';
  const country = input.country.trim() || 'United States';
  const empRange = input.employeeRange || '250-1,000 employees';
  const currentHr = input.currentHrSoftware?.trim() || 'Legacy spreadsheet systems / disparate local apps';

  // Calculate score based on enterprise fit indicators
  let baseScore = 88;
  if (empRange.includes('1,000') || empRange.includes('5,000')) baseScore += 5;
  if (empRange.includes('250')) baseScore += 3;
  if (currentHr.toLowerCase().includes('sap') || currentHr.toLowerCase().includes('legacy') || currentHr.toLowerCase().includes('excel')) baseScore += 2;
  const score = Math.min(98, Math.max(78, baseScore));

  const decisionMakers: DecisionMaker[] = [
    {
      title: 'Chief Executive Officer (CEO)',
      roleCategory: 'Executive',
      importance: 'Primary Sponsor',
      whyRoleMatters: `Focuses on total cost of operation, headcount productivity, and strategic agility across ${country}. Needs high-level organizational visibility.`,
      keyConcerns: ['Profit margin erosion due to unbilled overtime', 'Compliance risks across regional workforce', 'Scalability of operating model'],
      recommendedPitchAngle: `Emphasize unified enterprise workforce governance and ROI through automated attendance and resource utilization.`
    },
    {
      title: 'Founder / Managing Director',
      roleCategory: 'Executive',
      importance: 'Decision Maker',
      whyRoleMatters: `Keeps strict control over cultural execution and operating margins during growth phases in ${industry}.`,
      keyConcerns: ['Maintaining team velocity without administrative friction', 'Retention of key project staff', 'Cost efficiency of software stack'],
      recommendedPitchAngle: `Show how automated workflows eliminate management overhead and improve employee experience.`
    },
    {
      title: 'Chief Operating Officer (COO)',
      roleCategory: 'Operations',
      importance: 'Decision Maker',
      whyRoleMatters: `Owns day-to-day execution, operational velocity, and cross-departmental coordination for ${empRange}.`,
      keyConcerns: ['Operational bottlenecks in manager approvals', 'Lack of real-time project staffing visibility', 'Silos between HR and Operations'],
      recommendedPitchAngle: `Highlight real-time operational dashboards, automated shift tracking, and instant manager approval flows.`
    },
    {
      title: 'Chief Financial Officer (CFO)',
      roleCategory: 'Executive',
      importance: 'Budget Holder',
      whyRoleMatters: `Evaluates software spend against productivity gains, payroll accuracy, and cost reductions over current setup (${currentHr}).`,
      keyConcerns: ['Timesheet leakage and payroll miscalculations', 'Uncontrolled expense claims', 'Long payback period on software investments'],
      recommendedPitchAngle: `Present a direct cost-benefit case showcasing 15-25% reduction in payroll processing overhead and 100% audit compliance.`
    },
    {
      title: 'HR Director',
      roleCategory: 'Human Resources',
      importance: 'Champion',
      whyRoleMatters: `Leads workforce strategy, policy enforcement, leave management, and employee satisfaction.`,
      keyConcerns: ['High volume of manual HR tickets', 'Inflexible leave policies in current software', 'Employee friction with attendance tracking'],
      recommendedPitchAngle: `Focus on self-service employee mobile apps, automated leave balances, and zero-touch policy enforcement.`
    },
    {
      title: 'HR Operations Head',
      roleCategory: 'Human Resources',
      importance: 'Champion',
      whyRoleMatters: `Handles daily attendance reconciliations, payroll inputs, and compliance audits for ${empRange}.`,
      keyConcerns: ['Manual data entry from spreadsheets/legacy apps', 'Discrepancies in shift tracking', 'Delays in monthly attendance closure'],
      recommendedPitchAngle: `Demonstrate seamless attendance-to-payroll auto-sync and error-free shift roster management.`
    },
    {
      title: 'Operations Director',
      roleCategory: 'Operations',
      importance: 'Influencer',
      whyRoleMatters: `Directs field and office teams, ensuring SLAs, project allocations, and labor cost controls are met.`,
      keyConcerns: ['Lack of visibility into active site/office staffing', 'Manual overtime validation', 'Delayed project timesheet submissions'],
      recommendedPitchAngle: `Showcase geo-fenced attendance, mobile project timesheets, and automated overtime calculations.`
    },
    {
      title: 'Delivery Head / PMO Director',
      roleCategory: 'Delivery & Projects',
      importance: 'Influencer',
      whyRoleMatters: `Responsible for client project execution, billable hour utilization, and staffing availability.`,
      keyConcerns: ['Inaccurate billable hours logging', 'Resource crunch due to uncoordinated leave schedules', 'Delayed client invoicing'],
      recommendedPitchAngle: `Highlight project-linked timesheets, real-time billable availability tracking, and automated client reporting.`
    }
  ];

  const painPoints: PainPoint[] = [
    {
      id: 'pain-1',
      title: 'Manual Attendance & Reconciliation',
      category: 'Attendance & Workforce Tracking',
      description: `Current reliance on ${currentHr} leads to fragmented time logs, shift mismatches, and manual biometric or spreadsheet checks.`,
      businessImpact: `Consumes 40+ HR hours per monthly cycle and creates payroll discrepancy disputes.`,
      severity: 'Critical'
    },
    {
      id: 'pain-2',
      title: 'Timesheet & Project Billing Delays',
      category: 'Time & Project Tracking',
      description: `Employees submit timesheets days late due to clunky software interfaces, slowing down month-end revenue recognition.`,
      businessImpact: `Pushes client invoicing back by 7-10 days, hurting cash flow predictability.`,
      severity: 'High'
    },
    {
      id: 'pain-3',
      title: 'Leave Approval Bottlenecks',
      category: 'Leave Management',
      description: `Multi-tier leave requests get stuck in email threads or pending manager queues without automatic escalation.`,
      businessImpact: `Causes unexpected project staffing shortages and low employee CSAT scores.`,
      severity: 'Medium'
    },
    {
      id: 'pain-4',
      title: 'Expense Workflow Frictions',
      category: 'Expense & Claims',
      description: `Paper receipts and manual reimbursement forms lead to policy violations and delayed employee payouts.`,
      businessImpact: `Increases administrative processing cost per claim by over 35%.`,
      severity: 'High'
    },
    {
      id: 'pain-5',
      title: 'Reporting & Analytics Delays',
      category: 'Business Intelligence',
      description: `Leadership cannot access real-time headcount metrics or turnover trends without custom SQL queries or manual Excel compilation.`,
      businessImpact: `Executive decisions rely on 30-day-old outdated workforce reports.`,
      severity: 'Critical'
    },
    {
      id: 'pain-6',
      title: 'Project Staffing & Capacity Visibility',
      category: 'Resource Planning',
      description: `Project managers lack real-time visibility into who is on leave, bench capacity, or over-allocated.`,
      businessImpact: `Reduces billable resource utilization by 12-18%.`,
      severity: 'High'
    },
    {
      id: 'pain-7',
      title: 'Manager Approval Bottlenecks',
      category: 'Workflow Governance',
      description: `Line managers are overwhelmed with repetitive attendance adjustments, regularizations, and shift swaps.`,
      businessImpact: `Diverts middle management focus away from strategic delivery priorities.`,
      severity: 'Medium'
    },
    {
      id: 'pain-8',
      title: 'Cross-Department Operational Inefficiencies',
      category: 'System Integration',
      description: `Lack of native sync between HR, Finance, and Operations creates data silos and duplicate data entry.`,
      businessImpact: `Elevates IT maintenance costs and data security compliance risks.`,
      severity: 'High'
    }
  ];

  const productPositioning: ProductPositioning[] = [
    {
      capability: 'Attendance Management',
      tagline: 'Zero-touch biometric, mobile, and geo-fenced time tracking',
      description: `Automates workforce check-ins with shift auto-detection, facial recognition/biometric sync, and real-time anomaly alerts.`,
      keyBenefits: ['Eliminate buddy punching and manual log adjustments', '100% automated shift auto-rostering', 'Instant sync with payroll engine'],
      suggestedModules: ['Mobile Check-In', 'Geo-Fencing', 'Biometric Gateway', 'Overtime Rules Engine']
    },
    {
      capability: 'Leave Management',
      tagline: 'Configurable multi-country leave policy automation',
      description: `Empowers employees with smart self-service leave requests, automatic balance accruals, and team coverage calendars.`,
      keyBenefits: ['Enforce complex regional statutory leave rules', 'Eliminate leave approval bottlenecks', 'Instant resource availability view for project managers'],
      suggestedModules: ['Custom Leave Types', 'Comp-Off Automation', 'Team Availability Matrix']
    },
    {
      capability: 'Expense Management',
      tagline: 'OCR receipt scanning & instant multi-level claim approval',
      description: `Streamlines field and office expense claims with automated policy checks, receipt capture, and direct ERP export.`,
      keyBenefits: ['Zero paper claims', 'Auto-detect policy limit breaches', 'Reduce approval turnaround from weeks to under 24 hours'],
      suggestedModules: ['Smart Receipt Scanner', 'Multi-Currency Engine', 'Policy Violation Guard']
    },
    {
      capability: 'Timesheet Tracking',
      tagline: 'Precision billable hour logging and project cost control',
      description: `Seamlessly tracks time against tasks, clients, and cost centers with automatic reminder triggers and manager approvals.`,
      keyBenefits: ['Boost billable utilization by 15%', 'Accelerate invoicing cycles', 'Real-time project cost tracking'],
      suggestedModules: ['Task Timer App', 'Client Billable Tagging', 'Utilization Analytics']
    },
    {
      capability: 'Reporting & Analytics',
      tagline: 'Executive workforce intelligence at a single glance',
      description: `Delivers pre-built, customizable executive dashboards for attendance trends, attrition risk, overtime spend, and labor efficiency.`,
      keyBenefits: ['Instant automated export to PDF/Excel/BI tools', 'Predictive absenteeism insights', 'CFO audit-ready compliance logs'],
      suggestedModules: ['Executive Dashboards', 'Scheduled Email Reports', 'Custom Query Builder']
    },
    {
      capability: 'Approval Workflows',
      tagline: 'No-code visual workflow builder for enterprise governance',
      description: `Design dynamic multi-step approval chains based on department, cost center, spend limits, or managerial hierarchy.`,
      keyBenefits: ['Auto-escalation for stuck approvals', 'WhatsApp/Slack approval triggers', 'Complete audit trail logging'],
      suggestedModules: ['Visual Workflow Studio', 'Omnichannel Notifications', 'Audit Compliance Log']
    },
    {
      capability: 'Employee Records & Self-Service',
      tagline: 'Centralized single source of truth for workforce lifecycle',
      description: `Manage digital employee profiles, document vaults, onboarding checklists, and asset assignments securely.`,
      keyBenefits: ['Bank-grade data encryption and access controls', 'Zero HR paperwork', '24/7 self-service document requests'],
      suggestedModules: ['Digital Document Vault', 'Onboarding Portal', 'Custom Profile Fields']
    },
    {
      capability: 'Workflow Automation',
      tagline: 'Eliminate repetitive HR and operations administrative tasks',
      description: `Automate periodic notifications, shift swap validations, compliance warnings, and milestone celebrations.`,
      keyBenefits: ['Save 120+ hours of admin work monthly', 'Eliminate human errors in policy execution', 'Standardize operations across regions'],
      suggestedModules: ['Automated Rule Triggers', 'Integration Webhooks', 'Event Notifier']
    }
  ];

  const discoveryQuestions: DiscoveryQuestion[] = [
    {
      number: 1,
      topicCategory: 'Current System',
      question: `How are you currently tracking workforce attendance, leaves, and project hours across your ${empRange} in ${country}? What limits are you hitting with ${currentHr}?`,
      objective: 'Establish current baseline architecture and uncover hidden software friction points.',
      whatToListenFor: 'Mentions of manual Excel spreadsheets, disconnected local software, or high ticket volumes.'
    },
    {
      number: 2,
      topicCategory: 'Approval Workflows',
      question: `Walk me through what happens when an employee requests overtime or an emergency leave. How long does the approval chain take from request to payroll lock?`,
      objective: 'Identify bottlenecks in middle management and payroll processing delays.',
      whatToListenFor: 'Frustration over delayed approvals, manager inbox clutter, or late payroll inputs.'
    },
    {
      number: 3,
      topicCategory: 'Reporting Issues',
      question: `When leadership asks for real-time headcount, overtime expenditure, or billable utilization metrics, how long does it take your team to generate that report?`,
      objective: 'Uncover decision-making lag caused by manual report building.',
      whatToListenFor: 'Reliance on manual SQL pulls or taking 3-5 days to compile month-end Excel reports.'
    },
    {
      number: 4,
      topicCategory: 'Operational Bottlenecks',
      question: `Where do you see the most significant operational leakage—is it buddy punching, inaccurate project timesheets, or untracked employee expenses?`,
      objective: 'Pinpoint quantifiable revenue leakage or administrative waste.',
      whatToListenFor: 'Uncontrolled overtime payouts, unverified expense claims, or billing disputes.'
    },
    {
      number: 5,
      topicCategory: 'Growth Plans',
      question: `As ${company} continues to scale in the ${industry} sector over the next 12-24 months, how will your current systems support multi-location or hybrid workforce expansion?`,
      objective: 'Connect platform investment to long-term strategic enterprise scale.',
      whatToListenFor: 'Geographic expansion plans, remote work challenges, or regional compliance worries.'
    },
    {
      number: 6,
      topicCategory: 'Software Costs',
      question: `What is the total hidden cost of your current tech stack including software licenses, custom integration maintenance, and manual HR processing hours?`,
      objective: 'Position cost of inaction versus ROI of unified platform consolidation.',
      whatToListenFor: 'Paying for redundant point solutions, high vendor renewal costs, or costly legacy maintenance.'
    },
    {
      number: 7,
      topicCategory: 'Implementation Concerns',
      question: `In past software rollouts, what were the primary concerns raised by operations leaders and end-users regarding adoption ease and mobile UX?`,
      objective: 'Address change management fears early and highlight user-friendly mobile capabilities.',
      whatToListenFor: 'Resistance from non-desk workers, complex UI complaints, or training bottlenecks.'
    },
    {
      number: 8,
      topicCategory: 'Approval Workflows',
      question: `How do you handle manager overrides or shift regularizations when employees forget to log in or travel for client field meetings?`,
      objective: 'Highlight flexibility of geo-fenced mobile check-ins and automatic regularization flows.',
      whatToListenFor: 'High manual intervention rates by HR admins to correct attendance exceptions.'
    },
    {
      number: 9,
      topicCategory: 'Reporting Issues',
      question: `Are your project managers able to view live team availability and leave calendars before staffing critical client projects?`,
      objective: 'Expose resource allocation gaps and project delivery risks.',
      whatToListenFor: 'Double-booking staff, missed client deadlines, or uncoordinated leaves.'
    },
    {
      number: 10,
      topicCategory: 'Growth Plans',
      question: `If we could eliminate 80% of attendance reconciliation time and reduce payroll processing cycle from 5 days to 2 hours, what would that unlock for your HR and Finance leadership?`,
      objective: 'Create a compelling vision of business transformation and secure executive alignment.',
      whatToListenFor: 'Desire to pivot HR from transactional admin to strategic talent retention.'
    }
  ];

  const objectionHandling: ObjectionHandler[] = [
    {
      objection: `We already use SAP (or enterprise ERP like Workday/Oracle).`,
      context: `Prospect feels ERP covers HR and attendance, but legacy ERP mobile UX is often rigid and difficult for front-line employee attendance and daily operational workflows.`,
      recommendedResponse: `That makes complete sense—SAP is excellent for core finance and global master record management. Where we partner with enterprise companies using SAP is by acting as the modern, high-adoption front-end layer for daily attendance, mobile timesheets, and instant manager approvals. We bi-directionally sync with SAP via native APIs, giving employees a 5-star mobile experience while preserving SAP as your financial system of record.`,
      pivotQuestion: `Are your operational managers and field staff currently finding the SAP interface quick and easy for daily shift check-ins and expense approvals on mobile?`
    },
    {
      objection: `We already use Zoho (or mid-market tools like Darwinbox/GreytHR).`,
      context: `Prospect is using a generalist HR tool that lacks advanced enterprise workflow engines, granular project timesheets, or deep operational analytics.`,
      recommendedResponse: `Zoho is a popular generalist HR suite for SMBs. However, as enterprise organizations reach ${empRange}, they often hit limits with complex multi-level approval logic, geo-fenced project timesheet allocations, and automated shift rostering. Our copilot solution is built specifically for high-scale enterprise operations requiring zero-lag automated workflows and audit-ready governance.`,
      pivotQuestion: `How seamlessly does your current setup handle complex shift rosters, multi-project billable timesheet approvals, and custom escalation rules across locations?`
    },
    {
      objection: `We don't have budget allocated for a new system this year.`,
      context: `Budget constraints or economic caution. Need to frame the copilot as a self-funding cost-reduction driver rather than a net new expense.`,
      recommendedResponse: `I completely appreciate budget discipline in today's environment. Most of our enterprise clients didn't have an explicit line item for a new platform either—until they calculated the annual revenue lost to attendance discrepancies, timesheet billing delays, and administrative processing hours. In fact, our platform typically delivers a 4x ROI within 6 months by automating manual HR reconciliation.`,
      pivotQuestion: `If we could run a quick 15-minute value assessment that proves we can save more in labor processing overhead than the license cost itself, would that be worth reviewing with your CFO?`
    },
    {
      objection: `We'll review this next quarter or next fiscal year.`,
      context: `Delaying tactic due to competing priorities or change management inertia.`,
      recommendedResponse: `Understandable—timing is critical. The main challenge our enterprise peers face when waiting until next quarter is that every month of delay incurs another 40+ hours of manual reconciliation per HR admin, alongside ongoing billable timesheet leakage. By initiating a quick proof-of-concept now, your team can be fully configured and onboarded before your next busy cycle starts.`,
      pivotQuestion: `What specific operational milestones need to be met before your team evaluates modernizing your workforce workflows?`
    }
  ];

  const coldEmail = {
    subject: `Streamlining workforce operations & project time tracking at ${company}`,
    body: `Hi [Decision Maker Name],

I noticed ${company}'s impressive growth in the ${industry} space across ${country}. As organizations scale toward ${empRange}, managing multi-location attendance, timesheet billing cycles, and leave approvals often creates significant administrative friction for leadership.

We help enterprise leaders eliminate 80% of manual attendance reconciliation hours while giving operations real-time visibility into project staffing and billable utilization—without replacing your existing core systems (${currentHr}).

Companies similar to ${company} typically achieve:
• 75% faster month-end payroll and timesheet reconciliation cycles
• 100% policy compliance on leave and expense approvals
• Full mobile check-in adoption with geo-fenced biometric validation

Would you be open to a brief 15-minute discovery conversation next Tuesday at 10:00 AM to explore how this could accelerate ${company}'s operational efficiency?

Best regards,

[Your Name]  
Enterprise Sales Representative  
AI Workforce Solutions Copilot`
  };

  const emailVariations = {
    roi: {
      subject: `Quantifiable ROI & $184k Annual Labor Efficiency Gains at ${company}`,
      body: `Hi [Decision Maker Name],

Organizations in ${industry} managing ${empRange} across ${country} often experience hidden operational leakage in manual attendance reconciliation and project timesheet processing using ${currentHr}.

We help enterprise leaders capture measurable financial returns through AI workforce automation:
• $184,000+ estimated annual net operational savings
• 80% reduction in month-end attendance & payroll closure cycles
• 3.2-month average payback period with 100% automated policy compliance
• 12-15% increase in billable project resource utilization

Would you be open to a 10-minute ROI review call next Tuesday at 10:00 AM to go over the customized financial model for ${company}?

Best regards,

[Your Name]  
Enterprise Sales Representative  
AI Revenue & Workforce Copilot`
    },
    painPoint: {
      subject: `Eliminating manual timesheet friction & payroll bottlenecks at ${company}`,
      body: `Hi [Decision Maker Name],

Tracking shift attendance, overtime approvals, and project timesheets across ${country} using ${currentHr} can be a major operational headache for ${company}'s management team.

Disparate time logs and delayed manager sign-offs frequently cause:
• 35+ hours of repetitive monthly admin grunt work per pay cycle
• Friction and dispute backlogs in payroll reconciliation
• Delayed client invoicing due to missing project timesheet entries
• Lack of real-time visibility for team leads when assigning shifts

We solve these exact pain points by providing a zero-friction mobile check-in app paired with automated approval workflows. We keep ${currentHr} as your system of record while removing 80% of administrative overhead.

Are you open to a brief 10-minute chat this Thursday to see how we can remove this admin burden from your team?

Best regards,

[Your Name]  
Enterprise Sales Representative  
AI Revenue & Workforce Copilot`
    },
    executive: {
      subject: `Strategic Workforce Velocity & Operational Governance for ${company}`,
      body: `Hi [Decision Maker Name],

As ${company} scales its leadership position in ${industry} across ${country}, maintaining operational agility across ${empRange} requires real-time workforce visibility and automated governance.

We partner with C-suite executives (COO, CFO, CHRO) to modernize operational execution alongside core enterprise platforms like ${currentHr}:
• Executive Command Dashboards providing real-time resource utilization and capacity metrics
• Enterprise-grade policy guardrails ensuring 100% regional labor compliance
• Rapid 3-week deployment methodology with zero business disruption

I would welcome the opportunity to host a 15-minute executive discovery briefing with you to discuss how we help peer organizations accelerate operational velocity at ${company}.

Best regards,

[Your Name]  
Enterprise Sales Representative  
AI Revenue & Workforce Copilot`
    }
  };

  const linkedInMessage = {
    body: `Hi [First Name] — congrats on ${company}'s recent momentum in ${industry}! Quick question: As you manage workforce growth across ${country}, are manual attendance checks, leave approval queues, or timesheet delays creating operational bottlenecks for your leadership team? We've helped enterprise teams cut admin processing time by 80% while boosting billable resource visibility. Worth a quick 5-minute chat this week?`
  };

  const linkedInVariations = {
    roi: {
      body: `Hi [First Name] — congratulations on ${company}'s growth in ${industry}! Enterprise teams with ${empRange} typically lose $184k+ annually in manual attendance and timesheet friction. Our AI platform delivers an 80% reduction in admin hours with a 3.2-month payback period alongside ${currentHr}. Open to a quick 5-minute chat on the numbers?`
    },
    painPoint: {
      body: `Hi [First Name] — quick question regarding workforce ops at ${company}: Are manual attendance reconciliations, delayed timesheets, or leave approval bottlenecks in ${currentHr} creating admin friction across your teams in ${country}? We help leaders eliminate 35+ hours of weekly admin grunt work with a mobile check-in app. Open to a brief touchpoint?`
    },
    executive: {
      body: `Hi [First Name] — impressed by ${company}'s expansion in ${industry}. As you scale your workforce across ${country}, we provide executive leaders with real-time labor analytics and automated workflow governance—without replacing your system of record (${currentHr}). Open to connecting?`
    }
  };

  const coldCallScript = {
    hook: `Hi [First Name], this is [Your Name] calling regarding workforce management operations at ${company}. I know I caught you out of the blue, do you have 30 seconds for me to share why I reached out?`,
    valueProposition: `We work with executive leaders at ${industry} companies with ${empRange}. Typically, when companies scale in ${country}, they struggle with delayed timesheets, manual attendance reconciliation in ${currentHr}, and lack of real-time project staffing visibility. We automate these workflows into a single mobile-first interface that saves managers 10+ hours every week.`,
    discoveryTransition: `I wanted to ask: How is ${company} currently handling shift attendance and leave approval bottlenecks across your teams?`,
    fullScriptText: `SPEAKER: Sales Rep
"Hi [First Name], this is [Your Name]. I know I caught you in the middle of your day—do you have 30 seconds for me to share why I'm calling ${company}?"

[Pause for response]

"Great! We specialize in supporting ${industry} organizations scaling across ${country}. Usually when companies hit ${empRange}, operations leaders tell us that tracking attendance across locations, approving expense claims, and reconciling late timesheets in ${currentHr} takes days of manual effort. 

Our copilot platform automates these workflows completely, cutting attendance processing time from 5 days down to 2 hours.

I'm not asking for a contract today—just wanted to see: How is your team currently dealing with attendance reconciliations and manager approval bottlenecks?"

[Transition into Discovery Question 1]`
  };

  const detailedResearch = {
    executiveSummary: `${company} is a market leader in ${industry} across ${country} with ${empRange}. As they scale operations, optimizing workforce intelligence, sales velocity, and digital maturity around ${currentHr} is a top executive priority.`,
    companyProfile: `${company} operates as a high-growth enterprise in ${industry}, leveraging modern software stacks while balancing regional compliance and multi-location governance.`,
    technologyStack: [currentHr, 'Cloud Infrastructure', 'Enterprise SSO / OAuth', 'BI & Analytics Platform', 'Custom REST APIs'],
    businessModel: 'Enterprise B2B / High-Velocity Services & Solutions Provider',
    recentGrowth: '18% YoY Headcount Expansion, expansion in multi-regional hubs.',
    funding: 'Profitable Enterprise / Private Backed Expansion Phase',
    digitalMaturity: (currentHr.toLowerCase().includes('sap') || currentHr.toLowerCase().includes('workday') ? 'Enterprise Digital-First' : 'High') as 'Enterprise Digital-First' | 'High',
    buyingSignals: [
      'Active headcount growth in operations and engineering',
      'Modernization initiatives for legacy HR/ERP systems',
      'Increased executive focus on margin expansion and automation',
      'Evaluation of AI-driven sales and workforce intelligence tools'
    ],
    aiAdoptionScore: score,
    growthOpportunities: [
      'Automate end-to-end sales discovery and proposal generation',
      'Consolidate fragmented time & attendance software stack',
      'Implement real-time ROI forecasting for executive leadership'
    ]
  };

  const buyingCommittee = [
    {
      role: 'CEO' as const,
      classification: 'Decision Maker' as const,
      influenceWeight: 'Critical' as const,
      stance: 'Supportive' as const,
      keyPriorities: ['Enterprise growth', 'Profit margin expansion', 'Strategic operational agility'],
      engagementStrategy: 'Present 1-page executive brief focused on 3-year ROI and margin protection.'
    },
    {
      role: 'Founder' as const,
      classification: 'Decision Maker' as const,
      influenceWeight: 'Critical' as const,
      stance: 'Champion' as const,
      keyPriorities: ['Product quality', 'Scalability without admin bloat', 'Customer satisfaction'],
      engagementStrategy: 'Highlight AI-driven velocity and competitive differentiation.'
    },
    {
      role: 'COO' as const,
      classification: 'Champion' as const,
      influenceWeight: 'Critical' as const,
      stance: 'Champion' as const,
      keyPriorities: ['Operational efficiency', 'Cross-departmental friction', 'Workflow automation'],
      engagementStrategy: 'Conduct interactive visual workflow and shift management walkthrough.'
    },
    {
      role: 'CFO' as const,
      classification: 'Economic Buyer' as const,
      influenceWeight: 'Critical' as const,
      stance: 'Skeptical' as const,
      keyPriorities: ['Cost control', 'Measurable ROI', 'Payback period under 6 months'],
      engagementStrategy: 'Share automated ROI calculator model showing $180k+ annual savings.'
    },
    {
      role: 'CHRO' as const,
      classification: 'Decision Maker' as const,
      influenceWeight: 'High' as const,
      stance: 'Supportive' as const,
      keyPriorities: ['Employee retention', 'Policy compliance', 'Employee experience'],
      engagementStrategy: 'Focus on 5-star mobile self-service app and zero-friction leave management.'
    },
    {
      role: 'HR Director' as const,
      classification: 'Influencer' as const,
      influenceWeight: 'High' as const,
      stance: 'Supportive' as const,
      keyPriorities: ['Reducing manual admin tickets', 'Attendance closure speed', 'Audit readiness'],
      engagementStrategy: 'Demonstrate zero-touch attendance reconciliation and auto-payroll sync.'
    },
    {
      role: 'Operations Director' as const,
      classification: 'Technical Buyer' as const,
      influenceWeight: 'High' as const,
      stance: 'Neutral' as const,
      keyPriorities: ['Field team management', 'Overtime validation', 'Mobile geo-fencing'],
      engagementStrategy: 'Provide live mobile check-in demo with offline sync capabilities.'
    },
    {
      role: 'Delivery Head' as const,
      classification: 'Influencer' as const,
      influenceWeight: 'Medium' as const,
      stance: 'Supportive' as const,
      keyPriorities: ['Billable utilization', 'Project time tracking', 'SLA execution'],
      engagementStrategy: 'Show real-time resource availability matrix and client timesheet exports.'
    },
    {
      role: 'Finance Head' as const,
      classification: 'Blocker' as const,
      influenceWeight: 'Medium' as const,
      stance: 'Skeptical' as const,
      keyPriorities: ['Budget caps', 'Software consolidation', 'Implementation risk'],
      engagementStrategy: 'Offer risk-free trial and clear line-item budget replacement proof.'
    }
  ];

  const opportunityScore = {
    overallFitScore: score,
    dealProbability: Math.min(88, score - 10),
    riskScore: 22,
    urgencyScore: 84,
    revenuePotential: '$120,000 / yr',
    expansionPotential: '$45,000 ARR Add-on',
    recommendedNextAction: 'Schedule Executive Discovery & ROI Walkthrough with COO & CFO',
    scoreBreakdown: [
      { category: 'Headcount & Scale Fit', points: 28, maxPoints: 30, notes: `${empRange} headcount ideal for platform automation.` },
      { category: 'Legacy Tech Frustration', points: 25, maxPoints: 25, notes: `High friction reported with ${currentHr}.` },
      { category: 'Executive Urgency', points: 22, maxPoints: 25, notes: `Active Q3 mandate for digital operations modernization.` },
      { category: 'Budget Availability', points: 18, maxPoints: 20, notes: `Verified enterprise software budget reserve.` }
    ]
  };

  const competitors = [
    {
      competitorName: 'SAP',
      marketShareCategory: 'Legacy ERP Giant',
      strengths: ['Deep global enterprise penetration', 'Core financial system of record'],
      weaknesses: ['Rigid mobile UX', 'High customization cost', 'Slow implementation cycles'],
      migrationDifficulty: 'High' as const,
      competitiveAdvantage: 'Lightning-fast mobile UX, 3-week deployment, zero-friction integration with SAP APIs.',
      switchingStrategy: 'Position as high-adoption front-end execution layer rather than full ERP replacement.'
    },
    {
      competitorName: 'Oracle',
      marketShareCategory: 'Enterprise Cloud ERP',
      strengths: ['Comprehensive database ecosystem', 'Global payroll modules'],
      weaknesses: ['Complex licensing', 'Clunky user adoption', 'Heavy reliance on consultants'],
      migrationDifficulty: 'Complex' as const,
      competitiveAdvantage: 'AI-native automation, transparent flat pricing, consumer-grade mobile experience.',
      switchingStrategy: 'Highlight immediate manager productivity gain and elimination of consulting overhead.'
    },
    {
      competitorName: 'Zoho',
      marketShareCategory: 'SMB Suite',
      strengths: ['Affordable entry pricing', 'Broad application suite'],
      weaknesses: ['Lacks complex enterprise workflow engines', 'Limited multi-tier approval customization'],
      migrationDifficulty: 'Low' as const,
      competitiveAdvantage: 'Built for enterprise scale, advanced geo-fenced timesheets, audit-ready compliance.',
      switchingStrategy: 'Demonstrate where Zoho breaks down at 250+ employee headcount.'
    },
    {
      competitorName: 'Darwinbox',
      marketShareCategory: 'Regional Enterprise HR Tech',
      strengths: ['Modern HR feature set', 'APAC market presence'],
      weaknesses: ['Long deployment timelines', 'Higher renewal fees'],
      migrationDifficulty: 'Moderate' as const,
      competitiveAdvantage: 'AI Copilot intelligence, instant proposal generation, native revenue analytics.',
      switchingStrategy: 'Highlight total cost of ownership savings and superior AI copilot capability.'
    },
    {
      competitorName: 'Keka',
      marketShareCategory: 'Mid-Market HR Software',
      strengths: ['Popular with tech startups', 'Simple UI'],
      weaknesses: ['Struggles with multi-country compliance', 'Limited project billing depth'],
      migrationDifficulty: 'Low' as const,
      competitiveAdvantage: 'Multi-regional governance, enterprise SLA, deep billable resource tracking.',
      switchingStrategy: 'Showcase enterprise compliance security and multi-entity consolidation.'
    },
    {
      competitorName: 'greytHR',
      marketShareCategory: 'Payroll Utility',
      strengths: ['Payroll processing focus', 'Basic attendance'],
      weaknesses: ['Outdated UI', 'No advanced project timesheets', 'Lack of AI automation'],
      migrationDifficulty: 'Low' as const,
      competitiveAdvantage: 'Next-gen AI platform with full workforce intelligence and real-time executive analytics.',
      switchingStrategy: 'Migrate attendance & workflows first, maintaining seamless payroll sync.'
    }
  ];

  const roiData = {
    implementationCost: 15000,
    estimatedAnnualSavings: 184000,
    threeYearRoiPercentage: 368,
    paybackPeriodMonths: 2.4,
    productivityGainHoursPerWeek: 14.5,
    managerTimeSavedPercentage: 42,
    breakdown: [
      { area: 'Attendance Reconciliation', currentWaste: '45 hours / month ($32,000/yr)', savingsWithAI: 'Automated in 2 hrs ($28,000 saved)' },
      { area: 'Timesheet Leakage & Billing Delays', currentWaste: '7 days late invoicing ($85,000 tied up)', savingsWithAI: 'Real-time approval ($75,000 freed)' },
      { area: 'Unenforced Leave & Expense Claims', currentWaste: '12% policy limit slip ($42,000/yr)', savingsWithAI: 'AI policy guardrails ($38,000 saved)' },
      { area: 'Middle Manager Admin Overhead', currentWaste: '10 hrs/week per manager ($60,000/yr)', savingsWithAI: '1-click WhatsApp/Mobile approvals ($43,000 saved)' }
    ]
  };

  const discoveryCoach = {
    meetingAgenda: [
      '1. Introductions & Executive Scope Alignment (5 mins)',
      '2. Current State Review: Technology & Operational Pain Points (10 mins)',
      '3. AI Platform Capabilities & Workflow Demonstration (15 mins)',
      '4. ROI Assessment & Business Case Review (10 mins)',
      '5. Next Steps & Timeline Alignment (5 mins)'
    ],
    consultativeQuestions: discoveryQuestions,
    painPoints: painPoints.map(p => ({ title: p.title, category: p.category, impact: p.businessImpact, severity: p.severity })),
    discoveryChecklist: [
      'Identify Economic Buyer (CFO/COO)',
      'Quantify current monthly hours spent on attendance & payroll',
      'Confirm contract expiration date for legacy software',
      'Define decision criteria and technical security requirements',
      'Schedule follow-up ROI presentation'
    ],
    objectionHandling: objectionHandling,
    closingStrategy: 'Offer a 14-day proof of value pilot with pre-loaded company data and a guaranteed 3-year price lock.'
  };

  const proposal = {
    executiveSummary: `This executive proposal outlines the deployment of the Enterprise Revenue Command Center for ${company} to modernize sales velocity, workforce intelligence, and revenue operations across ${country}.`,
    businessChallenges: [
      `Fragmented workforce tracking and manual reconciliation using ${currentHr}`,
      `Delayed timesheet submissions hurting monthly client billing cycles`,
      `Lack of executive visibility into real-time billable resource capacity`
    ],
    recommendedSolution: `Deploy the Enterprise Revenue Command Center with automated AI research, mobile attendance check-in, real-time ROI forecasting, and bi-directional SAP/ERP API integrations.`,
    timeline: [
      { phase: 'Phase 1: Setup & API Integration', duration: 'Week 1', deliverables: ['Data schema configuration', 'SSO & OAuth setup', 'Master record import'] },
      { phase: 'Phase 2: Pilot Rollout & Workflow Testing', duration: 'Week 2', deliverables: ['Department pilot onboarding', 'Custom policy rules validation', 'Mobile app testing'] },
      { phase: 'Phase 3: Full Go-Live & Executive Enablement', duration: 'Week 3', deliverables: ['All-hands onboarding', 'Executive dashboard launch', 'SLA support activation'] }
    ],
    investment: {
      licenseFee: '$48,000 / year (Up to 1,000 seats)',
      implementationFee: '$12,000 (One-time setup & training)',
      trainingAndSupport: 'Included (24/7 Enterprise SLA)',
      totalYearOne: '$60,000 Total First Year Investment'
    },
    roiSummary: `Projected Year 1 net savings of $184,000, yielding a 206% net first-year ROI with full payback achieved in 2.4 months.`,
    implementationPlan: [
      'Kickoff call with COO, HR Director, and IT Lead',
      'Bi-directional REST API configuration with current database',
      'Admin training & custom workflow template creation',
      'Company-wide mobile app rollout'
    ],
    nextSteps: [
      'Approve Executive Proposal and select target start date',
      'Execute Master Services Agreement (MSA)',
      'Initiate Phase 1 API integration kickoff'
    ]
  };

  const emailStudio = {
    coldEmail,
    followUpEmail: {
      subject: `Quick follow-up regarding ${company}'s operational efficiency roadmap`,
      body: `Hi [First Name],\n\nFollowing up on my previous message regarding ${company}. I wanted to share a quick 1-page ROI brief showing how enterprise peers in ${industry} cut manual reconciliation cycles by 80% with our AI Revenue Command Center.\n\nWould 10 minutes this Thursday work for a quick review?\n\nBest,\n[Your Name]`
    },
    meetingConfirmation: {
      subject: `Confirmed: Discovery Session — ${company} x AI Revenue Command Center`,
      body: `Hi [First Name],\n\nLooking forward to our discovery call on [Date & Time]. We will review ${company}'s current operational setup with ${currentHr} and explore automated workflow strategies.\n\nCalendar invite attached.\n\nBest regards,\n[Your Name]`
    },
    proposalFollowUp: {
      subject: `Executive Proposal Review for ${company}`,
      body: `Hi [First Name],\n\nAttached is the customized executive proposal for ${company}, detailing our deployment timeline, $184,000 ROI model, and 3-week onboarding plan.\n\nLet me know if you have any questions before our alignment call tomorrow.\n\nBest,\n[Your Name]`
    },
    renewalReminder: {
      subject: `Upcoming Platform Milestone & Annual Partnership Review — ${company}`,
      body: `Hi [First Name],\n\nAs we approach our annual partnership milestone, I wanted to schedule our Quarterly Business Review to showcase ${company}'s 340+ hours saved and outline new expansion modules for Q4.\n\nBest,\n[Your Name]`
    },
    upsellEmail: {
      subject: `Unlocking Advanced AI Revenue Intelligence for ${company}`,
      body: `Hi [First Name],\n\nGiven the successful adoption of our core workforce platform at ${company}, we would love to grant your executive team early access to our new AI Sales Coach & Proposal Generator module.\n\nWould you be open to a 10-minute preview next week?\n\nBest,\n[Your Name]`
    }
  };

  const executiveReport = {
    revenueForecast: '$8.4M Projected Q3 Enterprise Pipeline',
    salesFunnel: [
      { stage: 'Prospecting & Research', count: 142, value: '$14.2M' },
      { stage: 'Qualified Discovery', count: 68, value: '$8.8M' },
      { stage: 'Proposal & Demo', count: 34, value: '$5.1M' },
      { stage: 'Negotiation & Legal', count: 18, value: '$3.2M' },
      { stage: 'Closed Won', count: 24, value: '$2.8M' }
    ],
    dealVelocityDays: 42,
    lostDealReasons: [
      { reason: 'Budget Delay / Freeze', percentage: 38 },
      { reason: 'Incumbent ERP Inertia', percentage: 28 },
      { reason: 'Feature Customization Scope', percentage: 20 },
      { reason: 'Competitor Price Cut', percentage: 14 }
    ],
    pipelineHeatmap: [
      { sector: 'Technology & SaaS', temperature: 'Hot' as const, dealValue: '$9.4M' },
      { sector: 'Professional Services', temperature: 'Hot' as const, dealValue: '$6.2M' },
      { sector: 'Financial Services', temperature: 'Warm' as const, dealValue: '$4.8M' },
      { sector: 'Manufacturing & Retail', temperature: 'Warm' as const, dealValue: '$3.1M' },
      { sector: 'Healthcare & Pharma', temperature: 'Cold' as const, dealValue: '$1.3M' }
    ],
    riskAlerts: [
      { risk: 'CFO approval required for deals >$50k', severity: 'High' as const, mitigation: 'Attach standard ROI calculator report to all proposals.' },
      { risk: 'SAP integration questions during security review', severity: 'Medium' as const, mitigation: 'Provide pre-certified SAP REST API security whitepaper.' }
    ],
    aiRecommendations: [
      `Target $100k+ ARR opportunities in ${industry} where legacy ${currentHr} friction is highest.`,
      'Attach automated proposal generator outputs to accelerate deal closure by 12 days.',
      'Engage COOs and CFOs early as dual champions to prevent late-stage budget freezes.'
    ],
    qbrSummary: `Quarterly Business Review indicates a 94% platform retention rate with average expansion revenue of $24,000 per account after 6 months.`
  };

  const meetingAssistant = {
    voicePrepScript: `Welcome to your Meeting Preparation for ${company}. Today you are meeting with key stakeholders in ${industry}. Focus on how our platform eliminates manual attendance reconciliation in ${currentHr}, saving over 14 hours per week for middle managers.`,
    keyTalkingPoints: [
      `Emphasize 80% reduction in reconciliation cycle time`,
      `Showcase 5-star consumer-grade mobile UX`,
      `Present 2.4-month payback period backed by CFO ROI model`
    ],
    liveObjectionCoach: [
      { triggerWord: 'Budget', instantRebuttal: 'Reframe software cost against current $184,000 annual waste in manual reconciliation hours.' },
      { triggerWord: 'SAP / ERP', instantRebuttal: 'Explain that we act as the high-adoption mobile execution layer while syncing bi-directionally with SAP.' },
      { triggerWord: 'Timing / Next Quarter', instantRebuttal: 'Highlight that waiting 3 months wastes an additional 120+ manager hours in manual work.' }
    ]
  };

  const accountCrm = {
    timeline: [
      { date: new Date().toLocaleDateString(), event: `AI Company Research generated for ${company}`, actor: 'AI Copilot Engine', type: 'Proposal' as const },
      { date: '1 day ago', event: 'Initial Discovery Email Sent to CEO & COO', actor: 'Sales Rep', type: 'Email' as const },
      { date: '3 days ago', event: 'Account Intelligence Profile Created', actor: 'System', type: 'Meeting' as const }
    ],
    healthScore: 92,
    csInsights: [
      `High engagement on ROI calculator module.`,
      `Strong buying signals from COO and HR Director.`,
      `Recommend scheduling live technical demo with IT Delivery Head.`
    ]
  };

  const executiveBrief = {
    companySnapshot: `${company} is a prominent player in the ${industry} sector headquartered/operating in ${country} with an estimated size of ${empRange}. Current digital footprint indicates ongoing operational scaling with technology stack relying on ${currentHr}.`,
    opportunitySummary: `High-value enterprise opportunity ($45k - $95k ARR potential). Primary value driver is unifying fragmented attendance tracking, automating multi-tier approval workflows, and eliminating billable project timesheet delays to maximize operational margins.`,
    likelyPriorities: [
      `Automating manual attendance and shift roster reconciliations to protect HR bandwidth.`,
      `Accelerating month-end timesheet collection for faster client project billing.`,
      `Establishing real-time capacity and leave availability dashboards for project managers.`,
      `Achieving 100% regional labor compliance and expense policy guardrails.`
    ],
    recommendedTalkingPoints: [
      `Position platform as a modern, high-adoption execution layer that integrates seamlessly with existing core systems like ${currentHr}.`,
      `Quantify immediate operational savings: 80% reduction in attendance reconciliation cycle time.`,
      `Showcase intuitive mobile app experience tailored for both field/remote employees and busy approving managers.`,
      `Highlight 3-week rapid onboarding methodology with zero disruption to active business operations.`
    ],
    potentialRisks: [
      `Perceived overlap with existing legacy software (${currentHr}) if positioning is unclear.`,
      `Siloed decision-making between HR, Operations, and IT requiring executive sponsorship.`,
      `Resistance to change from line managers accustomed to email/manual spreadsheet approvals.`
    ],
    nextActions: [
      `Schedule 30-minute discovery call with key stakeholders (COO, HR Director, CFO).`,
      `Deliver tailored ROI calculator showing cost savings based on ${empRange} headcount.`,
      `Conduct interactive demo focusing on mobile attendance check-in and visual workflow builder.`,
      `Share industry case study demonstrating 4x ROI within 90 days.`
    ]
  };

  return {
    id: 'report-' + Date.now() + '-' + Math.random().toString(36).substr(2, 5),
    createdAt: new Date().toISOString(),
    input,
    detailedResearch,
    buyingCommittee,
    opportunityScore,
    competitors,
    roiData,
    discoveryCoach,
    proposal,
    emailStudio,
    executiveReport,
    meetingAssistant,
    accountCrm,
    companyIntelligence: {
      businessSummary: `${company} is a leading organization in the ${industry} market with operations across ${country}. The organization manages a workforce of ${empRange} and focuses on delivering high-velocity services, driving operational excellence, and scaling modern business operations.`,
      industry,
      estimatedEmployeeSize: empRange,
      growthStage: empRange.includes('1,000') || empRange.includes('5,000') ? 'Mature Enterprise' : 'High-Growth Enterprise',
      digitalMaturity: currentHr.toLowerCase().includes('sap') || currentHr.toLowerCase().includes('workday') ? 'Enterprise Digital-First' : 'Moderate',
      keyTechnologies: [currentHr, 'Cloud Infrastructure', 'Enterprise Security SSL', 'Mobile Workforce Portal'],
      headquarters: country
    },
    icpFitScore: {
      score,
      grade: score >= 90 ? 'A+' : score >= 85 ? 'A' : 'B+',
      summary: `${company} exhibits a strong ideal customer profile match due to workforce size (${empRange}), complex operational workflow needs in ${industry}, and opportunity to modernize legacy infrastructure (${currentHr}).`,
      matchingCriteria: [
        `Optimal employee size (${empRange}) for enterprise workforce automation`,
        `High operational friction in multi-tier approval & attendance tracking`,
        `Presence in ${industry} where billable hour tracking & shift rosters drive revenue`,
        `Strong intent to replace or augment legacy software setup (${currentHr})`
      ],
      gapsOrRisks: [
        `Multi-department alignment required across HR, Finance, and IT`,
        `Need to demonstrate seamless REST API integration with legacy databases`
      ]
    },
    decisionMakerMap: decisionMakers,
    businessPainPoints: painPoints,
    productPositioning,
    discoveryQuestions,
    objectionHandling,
    outreachAssets: {
      coldEmail,
      linkedInMessage,
      coldCallScript,
      emailVariations,
      linkedInVariations
    },
    executiveBrief
  };
}

export function regenerateSectionHeuristic(sectionKey: string, input: ProspectInput): any {
  const fullReport = generateReportHeuristic(input);
  const company = input.companyName.trim() || 'Enterprise Client';
  const industry = input.industry.trim() || 'Technology & Professional Services';
  const country = input.country.trim() || 'United States';
  const empRange = input.employeeRange || '250-1,000 employees';
  const currentHr = input.currentHrSoftware?.trim() || 'Legacy systems';

  const variationTag = Math.floor(Math.random() * 900) + 100;

  switch (sectionKey) {
    case 'companyIntelligence': {
      return {
        ...fullReport.companyIntelligence,
        businessSummary: `${company} is an established industry player in ${industry} across ${country}. Operating with a headcount of ${empRange}, ${company} is currently modernizing operational workflows and expanding market footprint with active tech adoption (${variationTag}).`,
        keyTechnologies: [currentHr, 'Cloud Security SSO', 'Automated BI Dashboards', 'REST Integration Engine', 'Mobile Access Portals']
      };
    }
    case 'icpFitScore': {
      const freshScore = Math.min(99, Math.max(82, fullReport.icpFitScore.score + (Math.floor(Math.random() * 5) - 2)));
      return {
        ...fullReport.icpFitScore,
        score: freshScore,
        summary: `${company} demonstrates a ${freshScore}% high-fit ICP profile in ${industry}. Key drivers include workforce expansion in ${country} and strategic initiatives to streamline legacy infrastructure (${currentHr}).`,
      };
    }
    case 'decisionMakerMap': {
      // Shuffle / vary recommended pitch angles
      return fullReport.decisionMakerMap.map((dm, idx) => ({
        ...dm,
        recommendedPitchAngle: `${dm.recommendedPitchAngle} (Tailored for ${company} Q${(idx % 4) + 1} priorities)`
      }));
    }
    case 'businessPainPoints': {
      return [
        {
          id: `pain-fresh-1-${variationTag}`,
          title: `Fragmented Shift & Attendance Reconciliation in ${currentHr}`,
          category: 'Workforce Operations',
          description: `Disparate time logs across ${country} offices require manual reconciliation, delaying monthly payroll locks.`,
          businessImpact: `Creates 35+ hours of administrative overhead per pay cycle and increases risk of overtime disputes.`,
          severity: 'Critical' as const
        },
        {
          id: `pain-fresh-2-${variationTag}`,
          title: 'Project Timesheet & Billable Leakage',
          category: 'Revenue Operations',
          description: `Delayed employee timesheet entries slow down client billing and distort resource utilization metrics.`,
          businessImpact: `Pushes monthly invoicing cycles back by 7-10 days, tying up working capital.`,
          severity: 'High' as const
        },
        {
          id: `pain-fresh-3-${variationTag}`,
          title: 'Manual Multi-Tier Leave Escalations',
          category: 'Workflow Governance',
          description: `Leave approval bottlenecks stall project staffing, forcing project managers into constant firefighting.`,
          businessImpact: `Reduces billable resource utilization by 12-15% across teams.`,
          severity: 'High' as const
        },
        {
          id: `pain-fresh-4-${variationTag}`,
          title: 'Expense Claim Policy Non-Compliance',
          category: 'Finance Controls',
          description: `Paper/spreadsheet receipt submissions create policy breach risks and delay employee reimbursements.`,
          businessImpact: `Increases expense processing cost per ticket by over 30%.`,
          severity: 'Medium' as const
        },
        {
          id: `pain-fresh-5-${variationTag}`,
          title: 'Executive Reporting Lag & Data Silos',
          category: 'Business Intelligence',
          description: `Leadership relies on outdated spreadsheet exports to evaluate headcount efficiency and attrition risks.`,
          businessImpact: `Strategic headcount planning decisions operate on 30-day stale data.`,
          severity: 'Critical' as const
        }
      ];
    }
    case 'productPositioning': {
      return fullReport.productPositioning;
    }
    case 'discoveryQuestions': {
      // Return fresh set of 10 targeted discovery questions
      return [
        {
          number: 1,
          topicCategory: 'Current Architecture',
          question: `How are your teams currently tracking daily shift attendance and timesheets across ${country}? What operational hurdles are you experiencing with ${currentHr}?`,
          objective: 'Uncover legacy software friction and spreadsheet workarounds.',
          whatToListenFor: 'Mentions of manual Excel consolidation, buddy punching, or payroll dispute backlogs.'
        },
        {
          number: 2,
          topicCategory: 'Approval Velocity',
          question: `When a field or remote employee submits an overtime or leave request, what is the exact turnaround time before manager sign-off?`,
          objective: 'Identify middle management bottlenecks and approval delays.',
          whatToListenFor: 'Stuck approval emails, missing audit trails, or manager frustration.'
        },
        {
          number: 3,
          topicCategory: 'Executive Reporting',
          question: `How quickly can your CFO or COO get real-time visibility into overall labor utilization, attendance trends, and overtime expenditure?`,
          objective: 'Expose reporting latency and manual BI compilation costs.',
          whatToListenFor: 'Takes 3-5 days to compile Excel sheets for board/leadership meetings.'
        },
        {
          number: 4,
          topicCategory: 'Revenue Leakage',
          question: `Where is your biggest operational leakage right now—untracked project billable hours, late timesheets, or unverified expense claims?`,
          objective: 'Quantify immediate cost savings and ROI potential.',
          whatToListenFor: 'Delayed client invoicing or inflated overtime claims.'
        },
        {
          number: 5,
          topicCategory: 'Growth & Scale',
          question: `As ${company} expands in ${industry}, how will your current workforce systems support new regional offices or hybrid work policies?`,
          objective: 'Connect platform capabilities to long-term enterprise scale.',
          whatToListenFor: 'Multi-location compliance worries or scalable mobile access needs.'
        },
        {
          number: 6,
          topicCategory: 'Cost Optimization',
          question: `What is the estimated total cost of maintaining your existing point solutions, custom scripts, and manual admin reconciliation?`,
          objective: 'Position cost-neutral platform consolidation.',
          whatToListenFor: 'High vendor renewal fees or heavy IT maintenance strain.'
        },
        {
          number: 7,
          topicCategory: 'User Adoption',
          question: `What feedback have line managers and employees given about the usability and mobile experience of your current HR tools?`,
          objective: 'Highlight consumer-grade mobile UX and zero-friction adoption.',
          whatToListenFor: 'Complaints about clunky desktop portals or low mobile usage.'
        },
        {
          number: 8,
          topicCategory: 'Shift & Rostering',
          question: `How do project leads manage shift rosters and resource availability calendars before assigning staff to critical client accounts?`,
          objective: 'Showcase real-time resource availability matrix.',
          whatToListenFor: 'Double booking staff or last-minute project staffing scrambles.'
        },
        {
          number: 9,
          topicCategory: 'System Integration',
          question: `How critical is seamless two-way API synchronization between attendance tracking and your payroll/ERP system (${currentHr})?`,
          objective: 'Reassure IT decision makers regarding REST API integration capabilities.',
          whatToListenFor: 'Fear of custom integration breakage or data duplication.'
        },
        {
          number: 10,
          topicCategory: 'Value Realization',
          question: `If we could automate 80% of attendance approvals and reduce month-end closure time from 5 days to 2 hours, what impact would that have on your team's strategic focus?`,
          objective: 'Secure executive alignment on strategic transformation.',
          whatToListenFor: 'Desire to shift HR and Ops from manual admin to strategic growth.'
        }
      ];
    }
    case 'objectionHandling': {
      return fullReport.objectionHandling;
    }
    case 'coldEmail': {
      return {
        subject: `Accelerating workforce productivity & project timesheet velocity at ${company}`,
        body: `Hi [Decision Maker Name],

I noticed ${company}'s growing leadership in the ${industry} sector across ${country}. As organizations manage a workforce of ${empRange}, tracking multi-location attendance, timesheet approvals, and leave workflows often creates heavy administrative overhead.

We help enterprise leaders eliminate 80% of manual attendance reconciliation hours while giving executives real-time visibility into project staffing and billable utilization—without disrupting your existing system of record (${currentHr}).

Peer organizations in ${industry} typically achieve:
• 75% faster month-end attendance & payroll closure
• 100% automated policy enforcement on leave & expense claims
• Seamless mobile check-in adoption with geo-fenced biometric validation

Would you be open to a brief 15-minute discovery call next Tuesday at 10:00 AM to see how this could streamline ${company}'s operations?

Best regards,

[Your Name]  
Enterprise Sales Representative  
AI Sales & Workforce Copilot`
      };
    }
    case 'linkedInMessage': {
      return {
        body: `Hi [First Name] — congratulations on ${company}'s growth in ${industry}! Quick question: As you manage workforce scale across ${country}, are manual attendance checks, leave approval delays, or timesheet backlogs creating operational friction? We've helped enterprise teams reduce admin processing time by 80% while boosting project resource visibility. Worth a quick 5-minute chat this week?`
      };
    }
    case 'coldCallScript': {
      return {
        ...fullReport.outreachAssets.coldCallScript,
        hook: `Hi [First Name], this is [Your Name] calling regarding workforce operations at ${company}. I know I caught you unannounced, do you have 30 seconds for me to share why I reached out?`,
        valueProposition: `We work with executive leaders at ${industry} companies with ${empRange}. Scaling operations across ${country} often leads to delayed project timesheets and manual attendance reconciliation in ${currentHr}. We automate these workflows into a single mobile interface that saves managers 10+ hours per week.`
      };
    }
    case 'executiveBrief': {
      return {
        overview: `${company} is an established ${industry} leader operating across ${country} with ${empRange}. Modernizing workforce management around ${currentHr} represents a high-impact opportunity to protect profit margins and accelerate operational velocity.`,
        keyOpportunities: [
          `Eliminate 80% of manual attendance reconciliation hours via automated shift check-in.`,
          `Accelerate project billing cycles by 7+ days with real-time mobile timesheet approvals.`,
          `Provide CFO/COO with instant workforce analytics and real-time resource utilization.`,
          `Maintain ${currentHr} as financial system of record while upgrading mobile user experience.`
        ],
        expectedImpact: `Estimated $184,000+ in annual operational savings with a payback period under 3 months.`,
        recommendedNextStep: `Host a 30-minute executive discovery call and ROI walkthrough with COO and CFO.`
      };
    }
    default:
      return fullReport[sectionKey as keyof SalesReport] || fullReport.companyIntelligence;
  }
}

