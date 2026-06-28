import { 
  GAdsSearchTerm, 
  GAdsCampaign, 
  GAdsKeyword, 
  GA4LandingPage, 
  GSCQuery, 
  GSCPage, 
  CRMLead, 
  AuditRuleSetting 
} from './types';

export const DEFAULT_SETTINGS: AuditRuleSetting[] = [
  {
    category: 'ROI_Thresholds',
    key: 'min_roas',
    name: 'Minimum Target ROAS',
    value: 2.5,
    validationLogic: 'ROAS below this threshold flags a critical alarm.'
  },
  {
    category: 'ROI_Thresholds',
    key: 'min_booked_rate',
    name: 'Minimum Lead Booked Rate',
    value: 0.10,
    validationLogic: 'CRM booking percentage below this flags sales leakage.'
  },
  {
    category: 'ROI_Thresholds',
    key: 'max_cpa',
    name: 'Maximum Tolerated Real CPA ($)',
    value: 150.00,
    validationLogic: 'Real CPA (Spend / Audited Leads) above this triggers budget warnings.'
  },
  {
    category: 'Waste_Filters',
    key: 'max_keyword_waste',
    name: 'Max Search Term Waste ($)',
    value: 50.00,
    validationLogic: 'Spend on zero-lead search terms before they are classified as wasteful.'
  },
  {
    category: 'Waste_Filters',
    key: 'attribution_gap_alert',
    name: 'Attribution Gap Alert Threshold',
    value: 0.50,
    validationLogic: 'Warn when more than 50% of conversions reported on Ad networks do not exist in the CRM.'
  }
];

export const DEFAULT_CAMPAIGNS: GAdsCampaign[] = [
  {
    id: 'c1',
    campaignId: '1001',
    campaignName: 'US_Plumbing_Emergency_Broad',
    status: 'ENABLED',
    budget: 300.00,
    impressions: 48500,
    clicks: 1250,
    spend: 7500.00,
    conversions: 250.00
  },
  {
    id: 'c2',
    campaignId: '1002',
    campaignName: 'US_Plumbing_LeakRepair_Exact',
    status: 'ENABLED',
    budget: 150.00,
    impressions: 21200,
    clicks: 680,
    spend: 4200.00,
    conversions: 120.00
  },
  {
    id: 'c3',
    campaignId: '1003',
    campaignName: 'US_Plumbing_Commercial_Search',
    status: 'ENABLED',
    budget: 100.00,
    impressions: 12300,
    clicks: 410,
    spend: 2843.50,
    conversions: 60.00
  },
  {
    id: 'c4',
    campaignId: '1004',
    campaignName: 'US_Plumbing_DrainCleaning_Phrase',
    status: 'PAUSED',
    budget: 50.00,
    impressions: 8900,
    clicks: 220,
    spend: 1300.00,
    conversions: 50.00
  }
];

export const DEFAULT_SEARCH_TERMS: GAdsSearchTerm[] = [
  // Campaign 1001 (US_Plumbing_Emergency_Broad) - high waste
  {
    id: 'st1',
    date: '2026-06-20',
    campaignId: '1001',
    campaignName: 'US_Plumbing_Emergency_Broad',
    adGroupId: 'ag11',
    keyword: 'emergency plumber near me',
    searchTerm: 'free plumbing inspection online help',
    matchType: 'BROAD',
    impressions: 1200,
    clicks: 55,
    spend: 285.50,
    conversions: 12
  },
  {
    id: 'st2',
    date: '2026-06-21',
    campaignId: '1001',
    campaignName: 'US_Plumbing_Emergency_Broad',
    adGroupId: 'ag11',
    keyword: 'emergency plumber near me',
    searchTerm: 'cheap DIY plumbing tools youtube',
    matchType: 'BROAD',
    impressions: 1500,
    clicks: 62,
    spend: 340.00,
    conversions: 8
  },
  {
    id: 'st3',
    date: '2026-06-22',
    campaignId: '1001',
    campaignName: 'US_Plumbing_Emergency_Broad',
    adGroupId: 'ag11',
    keyword: 'emergency plumber near me',
    searchTerm: 'plumber salary career jobs',
    matchType: 'BROAD',
    impressions: 980,
    clicks: 40,
    spend: 195.00,
    conversions: 2
  },
  {
    id: 'st4',
    date: '2026-06-23',
    campaignId: '1001',
    campaignName: 'US_Plumbing_Emergency_Broad',
    adGroupId: 'ag12',
    keyword: '24 hour plumber',
    searchTerm: '24 hour emergency plumber',
    matchType: 'PHRASE',
    impressions: 8200,
    clicks: 340,
    spend: 2150.00,
    conversions: 90
  },
  {
    id: 'st5',
    date: '2026-06-24',
    campaignId: '1001',
    campaignName: 'US_Plumbing_Emergency_Broad',
    adGroupId: 'ag12',
    keyword: '24 hour plumber',
    searchTerm: 'plumbing course certification cost',
    matchType: 'BROAD',
    impressions: 1100,
    clicks: 38,
    spend: 210.00,
    conversions: 0
  },
  // Campaign 1002 (US_Plumbing_LeakRepair_Exact) - efficient
  {
    id: 'st6',
    date: '2026-06-20',
    campaignId: '1002',
    campaignName: 'US_Plumbing_LeakRepair_Exact',
    adGroupId: 'ag21',
    keyword: '[leak repair]',
    searchTerm: 'leak repair expert plumber',
    matchType: 'EXACT',
    impressions: 4200,
    clicks: 210,
    spend: 1400.00,
    conversions: 45
  },
  {
    id: 'st7',
    date: '2026-06-21',
    campaignId: '1002',
    campaignName: 'US_Plumbing_LeakRepair_Exact',
    adGroupId: 'ag21',
    keyword: '[water pipe fix]',
    searchTerm: 'water pipe fix service',
    matchType: 'EXACT',
    impressions: 5500,
    clicks: 240,
    spend: 1600.00,
    conversions: 55
  },
  // Campaign 1003 (US_Plumbing_Commercial_Search) - high value
  {
    id: 'st8',
    date: '2026-06-20',
    campaignId: '1003',
    campaignName: 'US_Plumbing_Commercial_Search',
    adGroupId: 'ag31',
    keyword: 'commercial plumbing contractor',
    searchTerm: 'commercial plumbing contractor near me',
    matchType: 'PHRASE',
    impressions: 3100,
    clicks: 150,
    spend: 1120.00,
    conversions: 28
  },
  // Campaign 1004 (US_Plumbing_DrainCleaning_Phrase) - average
  {
    id: 'st9',
    date: '2026-06-20',
    campaignId: '1004',
    campaignName: 'US_Plumbing_DrainCleaning_Phrase',
    adGroupId: 'ag41',
    keyword: 'drain cleaning services',
    searchTerm: 'clogged toilet drain cleaning services',
    matchType: 'PHRASE',
    impressions: 2200,
    clicks: 95,
    spend: 580.00,
    conversions: 22
  }
];

export const DEFAULT_KEYWORDS: GAdsKeyword[] = [
  { id: 'k1', keywordId: 'kw101', keywordText: 'emergency plumber near me', campaignId: '1001', matchType: 'BROAD', qualityScore: 5, clicks: 810, spend: 4600.00 },
  { id: 'k2', keywordId: 'kw102', keywordText: '24 hour plumber', campaignId: '1001', matchType: 'PHRASE', qualityScore: 6, clicks: 440, spend: 2900.00 },
  { id: 'k3', keywordId: 'kw201', keywordText: '[leak repair]', campaignId: '1002', matchType: 'EXACT', qualityScore: 9, clicks: 420, spend: 2600.00 },
  { id: 'k4', keywordId: 'kw202', keywordText: '[water pipe fix]', campaignId: '1002', matchType: 'EXACT', qualityScore: 8, clicks: 260, spend: 1600.00 },
  { id: 'k5', keywordId: 'kw301', keywordText: 'commercial plumbing contractor', campaignId: '1003', matchType: 'PHRASE', qualityScore: 8, clicks: 410, spend: 2843.50 },
  { id: 'k6', keywordId: 'kw401', keywordText: 'drain cleaning services', campaignId: '1004', matchType: 'PHRASE', qualityScore: 7, clicks: 220, spend: 1300.00 }
];

export const DEFAULT_GA4_PAGES: GA4LandingPage[] = [
  { id: 'g1', date: '2026-06-20', landingPagePath: '/emergency-plumber/', sourceMedium: 'google / cpc', campaignId: '1001', sessions: 1120, keyEvents: 220, bounceRate: 0.68 },
  { id: 'g2', date: '2026-06-21', landingPagePath: '/leak-repair/', sourceMedium: 'google / cpc', campaignId: '1002', sessions: 650, keyEvents: 110, bounceRate: 0.35 },
  { id: 'g3', date: '2026-06-20', landingPagePath: '/commercial/', sourceMedium: 'google / cpc', campaignId: '1003', sessions: 390, keyEvents: 55, bounceRate: 0.28 },
  { id: 'g4', date: '2026-06-20', landingPagePath: '/drain-cleaning/', sourceMedium: 'google / cpc', campaignId: '1004', sessions: 210, keyEvents: 45, bounceRate: 0.42 },
  { id: 'g5', date: '2026-06-22', landingPagePath: '/emergency-plumber/', sourceMedium: 'google / organic', campaignId: '', sessions: 1500, keyEvents: 85, bounceRate: 0.45 }
];

export const DEFAULT_GSC_QUERIES: GSCQuery[] = [
  { id: 'q1', query: 'emergency plumber new york', clicks: 125, impressions: 2100, position: 2.1 },
  { id: 'q2', query: 'drain cleaning price', clicks: 84, impressions: 1600, position: 3.4 },
  { id: 'q3', query: 'how to fix leaking water pipe DIY', clicks: 15, impressions: 4500, position: 8.2 },
  { id: 'q4', query: 'commercial kitchen pipe burst', clicks: 42, impressions: 800, position: 1.5 },
  { id: 'q5', query: 'free plumbing help online chat', clicks: 8, impressions: 2200, position: 11.4 }
];

export const DEFAULT_GSC_PAGES: GSCPage[] = [
  { id: 'gp1', pageUrl: 'https://example.com/emergency-plumber/', clicks: 450, impressions: 8200, position: 2.3 },
  { id: 'gp2', pageUrl: 'https://example.com/leak-repair/', clicks: 320, impressions: 5900, position: 3.1 },
  { id: 'gp3', pageUrl: 'https://example.com/diy-leak-repair/', clicks: 65, impressions: 12000, position: 7.8 },
  { id: 'gp4', pageUrl: 'https://example.com/commercial-contractor/', clicks: 110, impressions: 1800, position: 1.9 }
];

// CRM Leads - Ground Truth base
// Generates exactly 95 active (not Disqualified) leads and 24 booked jobs across campaigns.
// Distributes leads carefully to campaigns:
// Campaign 1001: 30 leads (New/Qualified/Booked/Completed, where Booked Job = 1 for 3 leads), plus 15 'Disqualified' leads.
// Campaign 1002: 42 leads (where Booked Job = 1 for 12 leads), plus 4 'Disqualified' leads.
// Campaign 1003: 15 leads (where Booked Job = 1 for 5 leads), plus 1 'Disqualified' lead.
// Campaign 1004: 8 leads (where Booked Job = 1 for 4 leads), plus 1 'Disqualified' lead.
// Total Leads across campaigns = 30 + 42 + 15 + 8 = 95 active leads!
// Total Booked Jobs = 3 + 12 + 5 + 4 = 24 booked jobs!
// Total Revenue = 4500 (A) + 22500 (B) + 16250 (C) + 5000 (D) = $48,250.00!
export const generateDefaultLeads = (): CRMLead[] => {
  const leads: CRMLead[] = [];
  
  // Auxiliary function to generate unique GCLIDs
  let leadCounter = 1;

  // --- Campaign 1001 (US_Plumbing_Emergency_Broad) ---
  // 30 valid leads, 3 booked jobs (revenue $1,500 each, total $4,500), 15 Disqualified leads
  for (let i = 1; i <= 30; i++) {
    const isBooked = i <= 3;
    leads.push({
      id: `lead_${leadCounter++}`,
      leadId: `CRM-E10${i}`,
      createdDate: `2026-06-${10 + (i % 15)}`,
      gclid: `GCLID_EMERGENCY_BROAD_${i}`,
      utmCampaignId: '1001',
      leadSource: 'Google Ads',
      contactMethod: i % 3 === 0 ? 'Phone_Call' : i % 3 === 1 ? 'Web_Form' : 'Live_Chat',
      leadStatus: isBooked ? 'Completed' : i % 2 === 0 ? 'Qualified' : 'New',
      bookedJob: isBooked ? 1 : 0,
      revenue: isBooked ? 1500.00 : 0.00
    });
  }
  for (let i = 1; i <= 15; i++) {
    leads.push({
      id: `lead_${leadCounter++}`,
      leadId: `CRM-E10-DISQ-${i}`,
      createdDate: `2026-06-${12 + (i % 12)}`,
      gclid: `GCLID_EMERGENCY_BROAD_DISQ_${i}`,
      utmCampaignId: '1001',
      leadSource: 'Google Ads',
      contactMethod: 'Web_Form',
      leadStatus: 'Disqualified',
      bookedJob: 0,
      revenue: 0.00
    });
  }

  // --- Campaign 1002 (US_Plumbing_LeakRepair_Exact) ---
  // 42 valid leads, 12 booked jobs (revenue $1,875 each, total $22,500), 4 Disqualified leads
  for (let i = 1; i <= 42; i++) {
    const isBooked = i <= 12;
    leads.push({
      id: `lead_${leadCounter++}`,
      leadId: `CRM-L20${i}`,
      createdDate: `2026-06-${10 + (i % 15)}`,
      gclid: `GCLID_LEAK_EXACT_${i}`,
      utmCampaignId: '1002',
      leadSource: 'Google Ads',
      contactMethod: i % 2 === 0 ? 'Phone_Call' : 'Web_Form',
      leadStatus: isBooked ? 'Completed' : i % 3 === 0 ? 'Booked' : 'Qualified',
      bookedJob: isBooked ? 1 : 0,
      revenue: isBooked ? 1875.00 : 0.00
    });
  }
  for (let i = 1; i <= 4; i++) {
    leads.push({
      id: `lead_${leadCounter++}`,
      leadId: `CRM-L20-DISQ-${i}`,
      createdDate: `2026-06-${15 + i}`,
      gclid: `GCLID_LEAK_EXACT_DISQ_${i}`,
      utmCampaignId: '1002',
      leadSource: 'Google Ads',
      contactMethod: 'Live_Chat',
      leadStatus: 'Disqualified',
      bookedJob: 0,
      revenue: 0.00
    });
  }

  // --- Campaign 1003 (US_Plumbing_Commercial_Search) ---
  // 15 valid leads, 5 booked jobs (revenue $3,250 each, total $16,250), 1 Disqualified lead
  for (let i = 1; i <= 15; i++) {
    const isBooked = i <= 5;
    leads.push({
      id: `lead_${leadCounter++}`,
      leadId: `CRM-C30${i}`,
      createdDate: `2026-06-${12 + (i % 10)}`,
      gclid: `GCLID_COMM_PHRASE_${i}`,
      utmCampaignId: '1003',
      leadSource: 'Google Ads',
      contactMethod: 'Phone_Call',
      leadStatus: isBooked ? 'Completed' : 'Qualified',
      bookedJob: isBooked ? 1 : 0,
      revenue: isBooked ? 3250.00 : 0.00
    });
  }
  leads.push({
    id: `lead_${leadCounter++}`,
    leadId: `CRM-C30-DISQ-1`,
    createdDate: `2026-06-18`,
    gclid: `GCLID_COMM_PHRASE_DISQ_1`,
    utmCampaignId: '1003',
    leadSource: 'Google Ads',
    contactMethod: 'Web_Form',
    leadStatus: 'Disqualified',
    bookedJob: 0,
    revenue: 0.00
  });

  // --- Campaign 1004 (US_Plumbing_DrainCleaning_Phrase) ---
  // 8 valid leads, 4 booked jobs (revenue $1,250 each, total $5,000), 1 Disqualified lead
  for (let i = 1; i <= 8; i++) {
    const isBooked = i <= 4;
    leads.push({
      id: `lead_${leadCounter++}`,
      leadId: `CRM-D40${i}`,
      createdDate: `2026-06-${14 + (i % 5)}`,
      gclid: `GCLID_DRAIN_PHRASE_${i}`,
      utmCampaignId: '1004',
      leadSource: 'Google Ads',
      contactMethod: 'Web_Form',
      leadStatus: isBooked ? 'Completed' : 'New',
      bookedJob: isBooked ? 1 : 0,
      revenue: isBooked ? 1250.00 : 0.00
    });
  }
  leads.push({
    id: `lead_${leadCounter++}`,
    leadId: `CRM-D40-DISQ-1`,
    createdDate: `2026-06-20`,
    gclid: `GCLID_DRAIN_PHRASE_DISQ_1`,
    utmCampaignId: '1004',
    leadSource: 'Google Ads',
    contactMethod: 'Phone_Call',
    leadStatus: 'Disqualified',
    bookedJob: 0,
    revenue: 0.00
  });

  // Also push some Organic/SEO Leads for GA4/SEO comparison (not attributed to our Campaign IDs)
  for (let i = 1; i <= 20; i++) {
    leads.push({
      id: `lead_${leadCounter++}`,
      leadId: `CRM-SEO-${i}`,
      createdDate: `2026-06-${10 + (i % 15)}`,
      gclid: '',
      utmCampaignId: '',
      leadSource: 'SEO',
      contactMethod: i % 2 === 0 ? 'Web_Form' : 'Phone_Call',
      leadStatus: i % 4 === 0 ? 'Completed' : 'Qualified',
      bookedJob: i % 4 === 0 ? 1 : 0,
      revenue: i % 4 === 0 ? 950.00 : 0.00
    });
  }

  return leads;
};
