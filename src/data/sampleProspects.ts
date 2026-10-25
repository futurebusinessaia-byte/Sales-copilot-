import { ProspectInput, SalesReport } from '../types';
import { generateReportHeuristic } from '../utils/aiGenerator';

export const SAMPLE_PROSPECTS: { label: string; input: ProspectInput; report: SalesReport }[] = [
  {
    label: 'AstraTech Global (IT Services)',
    input: {
      companyName: 'AstraTech Global',
      website: 'www.astratech-global.com',
      industry: 'IT Services & Consulting',
      country: 'United States',
      employeeRange: '1,000 - 5,000 employees',
      currentHrSoftware: 'SAP SuccessFactors & Excel'
    },
    get report() {
      return generateReportHeuristic(this.input);
    }
  },
  {
    label: 'Apex Retail Group (Multi-Location Retail)',
    input: {
      companyName: 'Apex Retail Group',
      website: 'www.apexretailgroup.com',
      industry: 'Retail & Consumer Goods',
      country: 'United Kingdom',
      employeeRange: '5,000+ employees',
      currentHrSoftware: 'Legacy Biometric & Manual Spreadsheets'
    },
    get report() {
      return generateReportHeuristic(this.input);
    }
  },
  {
    label: 'LogisticsX Supply Chain (Logistics)',
    input: {
      companyName: 'LogisticsX Supply Chain',
      website: 'www.logisticsx.io',
      industry: 'Logistics & Transportation',
      country: 'Singapore',
      employeeRange: '250 - 1,000 employees',
      currentHrSoftware: 'Zoho People'
    },
    get report() {
      return generateReportHeuristic(this.input);
    }
  },
  {
    label: 'FinServe International (Financial Services)',
    input: {
      companyName: 'FinServe International',
      website: 'www.finserve-intl.com',
      industry: 'Financial Services & Banking',
      country: 'Canada',
      employeeRange: '1,000 - 5,000 employees',
      currentHrSoftware: 'Workday Core HR'
    },
    get report() {
      return generateReportHeuristic(this.input);
    }
  }
];
