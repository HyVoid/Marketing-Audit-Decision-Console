export interface GAdsSearchTerm {
  id: string;
  date: string;
  campaignId: string;
  campaignName: string;
  adGroupId: string;
  keyword: string;
  searchTerm: string;
  matchType: 'EXACT' | 'PHRASE' | 'BROAD';
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
}

export interface GAdsCampaign {
  id: string;
  campaignId: string;
  campaignName: string;
  status: 'ENABLED' | 'PAUSED' | 'REMOVED';
  budget: number;
  impressions: number;
  clicks: number;
  spend: number;
  conversions: number;
}

export interface GAdsKeyword {
  id: string;
  keywordId: string;
  keywordText: string;
  campaignId: string;
  matchType: 'EXACT' | 'PHRASE' | 'BROAD';
  qualityScore: number;
  clicks: number;
  spend: number;
}

export interface GA4LandingPage {
  id: string;
  date: string;
  landingPagePath: string;
  sourceMedium: string;
  campaignId: string;
  sessions: number;
  keyEvents: number;
  bounceRate: number; // as percentage, e.g. 0.45 for 45%
}

export interface GSCQuery {
  id: string;
  query: string;
  clicks: number;
  impressions: number;
  position: number;
}

export interface GSCPage {
  id: string;
  pageUrl: string;
  clicks: number;
  impressions: number;
  position: number;
}

export interface CRMLead {
  id: string;
  leadId: string;
  createdDate: string;
  gclid: string; // matches SearchTerm or clicks
  utmCampaignId: string; // Campaign ID for attribution
  leadSource: string; // e.g., 'Google Ads', 'SEO', 'Direct'
  contactMethod: 'Web_Form' | 'Phone_Call' | 'Live_Chat';
  leadStatus: 'New' | 'Qualified' | 'Booked' | 'Completed' | 'Disqualified';
  bookedJob: number; // 1 or 0
  revenue: number;
}

export interface AuditRuleSetting {
  category: 'ROI_Thresholds' | 'Waste_Filters';
  key: string;
  name: string;
  value: number;
  validationLogic: string;
}

export interface AuditEngineRow {
  campaignId: string;
  campaignName: string;
  totalSpend: number;
  reportedConversions: number;
  reportedCpa: number;
  matchedRealLeads: number;
  realBookedJobs: number;
  realRevenue: number;
  realCpa: number;
  realRoas: number;
  bookingRate: number;
  attributionGap: number;
  campaignHealth: 'Critical Action Required' | 'High CPA Alert' | 'Excellent' | 'Normal';
}

export interface NegativeKeywordRow {
  searchTerm: string;
  associatedCampaign: string;
  clicks: number;
  totalSpend: number;
  matchedRealLeads: number;
  realBookedJobs: number;
  wasteStatus: 'CRITICAL WASTE' | 'SUSPECT' | 'MONITOR';
  actionRecommendation: string;
}

export interface Top5FixRow {
  id: number;
  type: 'Negative_Keyword_Exclusion' | 'Budget_Redistribution';
  issue: string;
  recommendation: string;
  potentialSaving: number;
}

export interface SystemLog {
  timestamp: string;
  type: 'INFO' | 'WARNING' | 'SUCCESS' | 'ERROR';
  message: string;
}
