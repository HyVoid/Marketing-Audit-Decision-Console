import React, { useState, useEffect, useMemo } from 'react';
import { 
  Layers, 
  Settings, 
  Database, 
  Terminal, 
  Activity, 
  Sparkles, 
  FileSpreadsheet, 
  AlertCircle,
  HelpCircle,
  Github,
  Play
} from 'lucide-react';

import { 
  GAdsSearchTerm, 
  GAdsCampaign, 
  GAdsKeyword, 
  GA4LandingPage, 
  GSCQuery, 
  GSCPage, 
  CRMLead, 
  AuditRuleSetting,
  SystemLog 
} from './types';

import { 
  DEFAULT_SETTINGS, 
  DEFAULT_CAMPAIGNS, 
  DEFAULT_SEARCH_TERMS, 
  DEFAULT_KEYWORDS, 
  DEFAULT_GA4_PAGES, 
  DEFAULT_GSC_QUERIES, 
  DEFAULT_GSC_PAGES, 
  generateDefaultLeads 
} from './data';

import { 
  calculateAuditEngine, 
  calculateNegativeKeywords, 
  calculateTop5Fixes, 
  calculateLatestReportSummary 
} from './utils/auditCalculator';

// Tab rendering components
import ControlPanel from './components/ControlPanel';
import SettingsTab from './components/SettingsTab';
import RawTable, { ColumnConfig } from './components/RawTable';
import AuditEngineTab from './components/AuditEngineTab';
import NegativeKeywordsTab from './components/NegativeKeywordsTab';
import Top5FixesTab from './components/Top5FixesTab';
import LatestReportTab from './components/LatestReportTab';
import LogsTab from './components/LogsTab';
import GitHubSettingsTab from './components/GitHubSettingsTab';

export default function App() {
  // ── CORE WORKBOOK STATE ──
  const [settings, setSettings] = useState<AuditRuleSetting[]>([]);
  const [campaigns, setCampaigns] = useState<GAdsCampaign[]>([]);
  const [searchTerms, setSearchTerms] = useState<GAdsSearchTerm[]>([]);
  const [keywords, setKeywords] = useState<GAdsKeyword[]>([]);
  const [ga4Pages, setGa4Pages] = useState<GA4LandingPage[]>([]);
  const [gscQueries, setGscQueries] = useState<GSCQuery[]>([]);
  const [gscPages, setGscPages] = useState<GSCPage[]>([]);
  const [leads, setLeads] = useState<CRMLead[]>([]);
  const [logs, setLogs] = useState<SystemLog[]>([]);
  
  const [lastSaved, setLastSaved] = useState<string>('');
  const [syncStatus, setSyncStatus] = useState<'SUCCESS' | 'FAILED' | 'RUNNING'>('SUCCESS');
  const [triggerType, setTriggerType] = useState<'MANUAL' | 'AUTO'>('AUTO');
  const [activeTab, setActiveTab] = useState<string>('Control_Panel');

  // Load workbook from localStorage or default mocks on startup
  useEffect(() => {
    try {
      const cachedSettings = localStorage.getItem('madc_settings');
      const cachedCampaigns = localStorage.getItem('madc_campaigns');
      const cachedSearchTerms = localStorage.getItem('madc_searchTerms');
      const cachedKeywords = localStorage.getItem('madc_keywords');
      const cachedGa4Pages = localStorage.getItem('madc_ga4Pages');
      const cachedGscQueries = localStorage.getItem('madc_gscQueries');
      const cachedGscPages = localStorage.getItem('madc_gscPages');
      const cachedLeads = localStorage.getItem('madc_leads');
      const cachedLogs = localStorage.getItem('madc_logs');
      const cachedLastSaved = localStorage.getItem('madc_last_saved');

      if (cachedSettings && cachedCampaigns && cachedLeads) {
        setSettings(JSON.parse(cachedSettings));
        setCampaigns(JSON.parse(cachedCampaigns));
        setSearchTerms(JSON.parse(cachedSearchTerms || '[]'));
        setKeywords(JSON.parse(cachedKeywords || '[]'));
        setGa4Pages(JSON.parse(cachedGa4Pages || '[]'));
        setGscQueries(JSON.parse(cachedGscQueries || '[]'));
        setGscPages(JSON.parse(cachedGscPages || '[]'));
        setLeads(JSON.parse(cachedLeads));
        setLogs(JSON.parse(cachedLogs || '[]'));
        setLastSaved(cachedLastSaved || new Date().toLocaleString());
        addLog('INFO', 'SaaS Workbook parsed successfully from browser localStorage cache.');
      } else {
        resetToDefaults(true);
      }
    } catch (err: any) {
      addLog('ERROR', `Failed to parse local storage cache: ${err.message}. Loading factory defaults.`);
      resetToDefaults(true);
    }
  }, []);

  // System Logging helper
  const addLog = (type: SystemLog['type'], message: string) => {
    const timestamp = new Date().toLocaleString();
    setLogs(prev => [
      ...prev,
      { timestamp, type, message }
    ]);
  };

  // Clear log trace
  const handleClearLogs = () => {
    setLogs([]);
    const timestamp = new Date().toLocaleString();
    setLogs([{ timestamp, type: 'INFO', message: 'Logs trace cleared by operator.' }]);
  };

  // Save changes automatically & update last saved timestamp
  const saveToLocalStorage = (
    updatedSettings = settings,
    updatedCampaigns = campaigns,
    updatedSearchTerms = searchTerms,
    updatedKeywords = keywords,
    updatedGa4Pages = ga4Pages,
    updatedGscQueries = gscQueries,
    updatedGscPages = gscPages,
    updatedLeads = leads,
    updatedLogs = logs
  ) => {
    try {
      const nowStr = new Date().toLocaleString();
      localStorage.setItem('madc_settings', JSON.stringify(updatedSettings));
      localStorage.setItem('madc_campaigns', JSON.stringify(updatedCampaigns));
      localStorage.setItem('madc_searchTerms', JSON.stringify(updatedSearchTerms));
      localStorage.setItem('madc_keywords', JSON.stringify(updatedKeywords));
      localStorage.setItem('madc_ga4Pages', JSON.stringify(updatedGa4Pages));
      localStorage.setItem('madc_gscQueries', JSON.stringify(updatedGscQueries));
      localStorage.setItem('madc_gscPages', JSON.stringify(updatedGscPages));
      localStorage.setItem('madc_leads', JSON.stringify(updatedLeads));
      localStorage.setItem('madc_logs', JSON.stringify(updatedLogs));
      localStorage.setItem('madc_last_saved', nowStr);
      setLastSaved(nowStr);
      setSyncStatus('SUCCESS');
    } catch (err: any) {
      setSyncStatus('FAILED');
      addLog('ERROR', `Auto-save cached block failed: ${err.message}`);
    }
  };

  // Factory Master Reset
  const resetToDefaults = (isSilent = false) => {
    const defaultLeads = generateDefaultLeads();
    const nowStr = new Date().toLocaleString();
    
    setSettings(DEFAULT_SETTINGS);
    setCampaigns(DEFAULT_CAMPAIGNS);
    setSearchTerms(DEFAULT_SEARCH_TERMS);
    setKeywords(DEFAULT_KEYWORDS);
    setGa4Pages(DEFAULT_GA4_PAGES);
    setGscQueries(DEFAULT_GSC_QUERIES);
    setGscPages(DEFAULT_GSC_PAGES);
    setLeads(defaultLeads);
    setLastSaved(nowStr);
    setSyncStatus('SUCCESS');

    const initialLogs: SystemLog[] = [
      { timestamp: nowStr, type: 'SUCCESS', message: 'SaaS workbook factory defaults initialized successfully.' },
      { timestamp: nowStr, type: 'INFO', message: 'Default spreadsheet coordinates absolute links generated.' }
    ];
    setLogs(initialLogs);

    localStorage.setItem('madc_settings', JSON.stringify(DEFAULT_SETTINGS));
    localStorage.setItem('madc_campaigns', JSON.stringify(DEFAULT_CAMPAIGNS));
    localStorage.setItem('madc_searchTerms', JSON.stringify(DEFAULT_SEARCH_TERMS));
    localStorage.setItem('madc_keywords', JSON.stringify(DEFAULT_KEYWORDS));
    localStorage.setItem('madc_ga4Pages', JSON.stringify(DEFAULT_GA4_PAGES));
    localStorage.setItem('madc_gscQueries', JSON.stringify(DEFAULT_GSC_QUERIES));
    localStorage.setItem('madc_gscPages', JSON.stringify(DEFAULT_GSC_PAGES));
    localStorage.setItem('madc_leads', JSON.stringify(defaultLeads));
    localStorage.setItem('madc_logs', JSON.stringify(initialLogs));
    localStorage.setItem('madc_last_saved', nowStr);

    if (!isSilent) {
      addLog('SUCCESS', 'All spreadsheet values reset to default values.');
    }
  };

  // Recalculate pipeline explicitly (Manual trigger button action)
  const handleRunManualAudit = () => {
    setTriggerType('MANUAL');
    setSyncStatus('RUNNING');
    addLog('INFO', 'Triggering complete audit pipeline execution trace...');
    
    setTimeout(() => {
      addLog('SUCCESS', 'Reconciliation math finished. Attribution Gap parsed, Top 5 Fixes prioritizations re-aligned.');
      setSyncStatus('SUCCESS');
      saveToLocalStorage();
    }, 600);
  };

  // ── UPDATE SHEET ROW HANDLERS (CRUD) ──
  const handleUpdateRecord = <T extends { id: string }>(
    sheet: string,
    setFunc: React.Dispatch<React.SetStateAction<T[]>>,
    id: string,
    updatedFields: Partial<T>
  ) => {
    setFunc(prev => {
      const next = prev.map(row => row.id === id ? { ...row, ...updatedFields } : row);
      setTimeout(() => {
        saveToLocalStorage(
          sheet === 'settings' ? undefined : undefined, // Handled individually below to ensure fresh references
          sheet === 'campaigns' ? (next as unknown as GAdsCampaign[]) : undefined,
          sheet === 'searchTerms' ? (next as unknown as GAdsSearchTerm[]) : undefined,
          sheet === 'keywords' ? (next as unknown as GAdsKeyword[]) : undefined,
          sheet === 'ga4Pages' ? (next as unknown as GA4LandingPage[]) : undefined,
          sheet === 'gscQueries' ? (next as unknown as GSCQuery[]) : undefined,
          sheet === 'gscPages' ? (next as unknown as GSCPage[]) : undefined,
          sheet === 'leads' ? (next as unknown as CRMLead[]) : undefined
        );
      }, 0);
      return next;
    });
    addLog('INFO', `Spreadsheet cell updated on sheet [${sheet}], row [${id}]. Recalculating dependants.`);
  };

  const handleDeleteRecord = <T extends { id: string }>(
    sheet: string,
    setFunc: React.Dispatch<React.SetStateAction<T[]>>,
    id: string
  ) => {
    setFunc(prev => {
      const next = prev.filter(row => row.id !== id);
      setTimeout(() => {
        saveToLocalStorage(
          undefined,
          sheet === 'campaigns' ? (next as unknown as GAdsCampaign[]) : undefined,
          sheet === 'searchTerms' ? (next as unknown as GAdsSearchTerm[]) : undefined,
          sheet === 'keywords' ? (next as unknown as GAdsKeyword[]) : undefined,
          sheet === 'ga4Pages' ? (next as unknown as GA4LandingPage[]) : undefined,
          sheet === 'gscQueries' ? (next as unknown as GSCQuery[]) : undefined,
          sheet === 'gscPages' ? (next as unknown as GSCPage[]) : undefined,
          sheet === 'leads' ? (next as unknown as CRMLead[]) : undefined
        );
      }, 0);
      return next;
    });
    addLog('WARNING', `Row index [${id}] deleted on sheet [${sheet}]. Formulas propagated.`);
  };

  const handleAddRecord = <T extends { id: string }>(
    sheet: string,
    setFunc: React.Dispatch<React.SetStateAction<T[]>>,
    newRecord: Omit<T, 'id'>
  ) => {
    const id = `row_${Date.now()}`;
    const fullRecord = { id, ...newRecord } as T;
    setFunc(prev => {
      const next = [...prev, fullRecord];
      setTimeout(() => {
        saveToLocalStorage(
          undefined,
          sheet === 'campaigns' ? (next as unknown as GAdsCampaign[]) : undefined,
          sheet === 'searchTerms' ? (next as unknown as GAdsSearchTerm[]) : undefined,
          sheet === 'keywords' ? (next as unknown as GAdsKeyword[]) : undefined,
          sheet === 'ga4Pages' ? (next as unknown as GA4LandingPage[]) : undefined,
          sheet === 'gscQueries' ? (next as unknown as GSCQuery[]) : undefined,
          sheet === 'gscPages' ? (next as unknown as GSCPage[]) : undefined,
          sheet === 'leads' ? (next as unknown as CRMLead[]) : undefined
        );
      }, 0);
      return next;
    });
    addLog('SUCCESS', `Appended new record to sheet [${sheet}] under UID [${id}]. Array formula updated.`);
  };

  const handleBulkAddRecords = <T extends { id: string }>(
    sheet: string,
    setFunc: React.Dispatch<React.SetStateAction<T[]>>,
    newRecords: Omit<T, 'id'>[]
  ) => {
    const baseId = Date.now();
    const fullRecords = newRecords.map((newRec, idx) => ({
      id: `row_${baseId}_${idx}`,
      ...newRec
    })) as T[];
    setFunc(prev => {
      const next = [...prev, ...fullRecords];
      setTimeout(() => {
        saveToLocalStorage(
          undefined,
          sheet === 'campaigns' ? (next as unknown as GAdsCampaign[]) : undefined,
          sheet === 'searchTerms' ? (next as unknown as GAdsSearchTerm[]) : undefined,
          sheet === 'keywords' ? (next as unknown as GAdsKeyword[]) : undefined,
          sheet === 'ga4Pages' ? (next as unknown as GA4LandingPage[]) : undefined,
          sheet === 'gscQueries' ? (next as unknown as GSCQuery[]) : undefined,
          sheet === 'gscPages' ? (next as unknown as GSCPage[]) : undefined,
          sheet === 'leads' ? (next as unknown as CRMLead[]) : undefined
        );
      }, 0);
      return next;
    });
    addLog('SUCCESS', `Successfully bulk imported ${newRecords.length} records into sheet [${sheet}].`);
  };

  // Custom Settings Row update
  const handleUpdateSetting = (key: string, value: number) => {
    setSettings(prev => {
      const next = prev.map(s => s.key === key ? { ...s, value } : s);
      localStorage.setItem('madc_settings', JSON.stringify(next));
      saveToLocalStorage(next);
      return next;
    });
    addLog('INFO', `Re-evaluating system rules. Rule [${key}] adjusted to ${value}.`);
  };

  // ── BACKUP DIAGNOSTICS HANDLERS ──
  const handleExportBackup = () => {
    const backupObj = {
      settings,
      campaigns,
      searchTerms,
      keywords,
      ga4Pages,
      gscQueries,
      gscPages,
      leads,
      logs,
      lastSaved
    };

    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(backupObj, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `madc_workbook_backup_${Date.now()}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
    addLog('SUCCESS', 'Workbook backup exported safely as JSON document.');
  };

  const handleImportBackup = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const fileReader = new FileReader();
    fileReader.onload = (event) => {
      try {
        const parsed = JSON.parse(event.target?.result as string);
        if (parsed.settings && parsed.campaigns && parsed.leads) {
          setSettings(parsed.settings);
          setCampaigns(parsed.campaigns);
          setSearchTerms(parsed.searchTerms || []);
          setKeywords(parsed.keywords || []);
          setGa4Pages(parsed.ga4Pages || []);
          setGscQueries(parsed.gscQueries || []);
          setGscPages(parsed.gscPages || []);
          setLeads(parsed.leads || []);
          setLogs(parsed.logs || []);
          setLastSaved(parsed.lastSaved || new Date().toLocaleString());
          
          saveToLocalStorage(
            parsed.settings,
            parsed.campaigns,
            parsed.searchTerms,
            parsed.keywords,
            parsed.ga4Pages,
            parsed.gscQueries,
            parsed.gscPages,
            parsed.leads,
            parsed.logs
          );
          addLog('SUCCESS', 'Workbook backup parsed and restored successfully from file.');
        } else {
          addLog('ERROR', 'Invalid backup file schema: Missing critical sheet coordinates.');
        }
      } catch (err: any) {
        addLog('ERROR', `Backup file parsing collapsed: ${err.message}`);
      }
    };
    fileReader.readAsText(file);
  };

  // ── CORE REAL-TIME FORMULA CALCULATIONS (REACTIVE) ──
  const auditEngineRows = useMemo(() => {
    return calculateAuditEngine(campaigns, leads, settings);
  }, [campaigns, leads, settings]);

  const negativeKeywordRows = useMemo(() => {
    return calculateNegativeKeywords(searchTerms, leads, settings);
  }, [searchTerms, leads, settings]);

  const top5FixRows = useMemo(() => {
    return calculateTop5Fixes(auditEngineRows, negativeKeywordRows);
  }, [auditEngineRows, negativeKeywordRows]);

  const latestReportSummary = useMemo(() => {
    return calculateLatestReportSummary(auditEngineRows);
  }, [auditEngineRows]);

  // Sync dashboard metrics
  const dashboardMetrics = useMemo(() => {
    return {
      campaignCount: campaigns.length,
      leadsCount: leads.filter(l => l.leadStatus !== 'Disqualified').length,
      wasteCount: negativeKeywordRows.filter(r => r.wasteStatus === 'CRITICAL WASTE').length,
      criticalIssuesCount: top5FixRows.length
    };
  }, [campaigns, leads, negativeKeywordRows, top5FixRows]);

  // ── SHEET CONFIGURATIONS FOR RAW TABLES ──
  const searchTermsColumns: ColumnConfig<GAdsSearchTerm>[] = [
    { key: 'date', label: 'Date', type: 'date' },
    { key: 'campaignId', label: 'Campaign ID', type: 'text' },
    { key: 'campaignName', label: 'Campaign Name', type: 'text', editable: false },
    { key: 'adGroupId', label: 'Ad Group ID', type: 'text' },
    { key: 'keyword', label: 'Keyword Context', type: 'text' },
    { key: 'searchTerm', label: 'Search Query Input', type: 'text' },
    { key: 'matchType', label: 'Match Type', type: 'select', options: ['EXACT', 'PHRASE', 'BROAD'] },
    { key: 'impressions', label: 'Imps', type: 'number', align: 'right' },
    { key: 'clicks', label: 'Clicks', type: 'number', align: 'right' },
    { key: 'spend', label: 'Spend ($)', type: 'number', align: 'right', format: (v) => `$${Number(v).toFixed(2)}` },
    { key: 'conversions', label: 'Platform Conv', type: 'number', align: 'right' }
  ];

  const campaignsColumns: ColumnConfig<GAdsCampaign>[] = [
    { key: 'campaignId', label: 'Campaign ID', type: 'text' },
    { key: 'campaignName', label: 'Campaign Name', type: 'text' },
    { key: 'status', label: 'Status', type: 'select', options: ['ENABLED', 'PAUSED', 'REMOVED'] },
    { key: 'budget', label: 'Daily Budget ($)', type: 'number', align: 'right', format: (v) => `$${Number(v).toFixed(2)}` },
    { key: 'impressions', label: 'Imps', type: 'number', align: 'right' },
    { key: 'clicks', label: 'Clicks', type: 'number', align: 'right' },
    { key: 'spend', label: 'Total Spend ($)', type: 'number', align: 'right', format: (v) => `$${Number(v).toFixed(2)}` },
    { key: 'conversions', label: 'Platform Conv', type: 'number', align: 'right' }
  ];

  const keywordsColumns: ColumnConfig<GAdsKeyword>[] = [
    { key: 'keywordId', label: 'Keyword ID', type: 'text' },
    { key: 'keywordText', label: 'Keyword Text', type: 'text' },
    { key: 'campaignId', label: 'Campaign ID', type: 'text' },
    { key: 'matchType', label: 'Match Type', type: 'select', options: ['EXACT', 'PHRASE', 'BROAD'] },
    { key: 'qualityScore', label: 'Quality Score (1-10)', type: 'number', align: 'center' },
    { key: 'clicks', label: 'Clicks', type: 'number', align: 'right' },
    { key: 'spend', label: 'Spend ($)', type: 'number', align: 'right', format: (v) => `$${Number(v).toFixed(2)}` }
  ];

  const ga4Columns: ColumnConfig<GA4LandingPage>[] = [
    { key: 'date', label: 'Date', type: 'date' },
    { key: 'landingPagePath', label: 'Landing Page Path', type: 'text' },
    { key: 'sourceMedium', label: 'Source / Medium', type: 'text' },
    { key: 'campaignId', label: 'Campaign ID', type: 'text' },
    { key: 'sessions', label: 'Sessions', type: 'number', align: 'right' },
    { key: 'keyEvents', label: 'Key Events', type: 'number', align: 'right' },
    { key: 'bounceRate', label: 'Bounce Rate (%)', type: 'number', align: 'right', format: (v) => `${(Number(v) * 100).toFixed(2)}%` }
  ];

  const gscQueriesColumns: ColumnConfig<GSCQuery>[] = [
    { key: 'query', label: 'Search Query (SEO)', type: 'text' },
    { key: 'clicks', label: 'Organic Clicks', type: 'number', align: 'right' },
    { key: 'impressions', label: 'Organic Imps', type: 'number', align: 'right' },
    { key: 'position', label: 'Average Position', type: 'number', align: 'right', format: (v) => Number(v).toFixed(1) }
  ];

  const gscPagesColumns: ColumnConfig<GSCPage>[] = [
    { key: 'pageUrl', label: 'SEO Landing Page URL', type: 'text' },
    { key: 'clicks', label: 'Organic Clicks', type: 'number', align: 'right' },
    { key: 'impressions', label: 'Organic Imps', type: 'number', align: 'right' },
    { key: 'position', label: 'Average Position', type: 'number', align: 'right', format: (v) => Number(v).toFixed(1) }
  ];

  const CRMLeadsColumns: ColumnConfig<CRMLead>[] = [
    { key: 'leadId', label: 'Lead ID', type: 'text' },
    { key: 'createdDate', label: 'Created Date', type: 'date' },
    { key: 'gclid', label: 'GCLID / click query', type: 'text' },
    { key: 'utmCampaignId', label: 'UTM Campaign ID', type: 'text' },
    { key: 'leadSource', label: 'Lead Source', type: 'text' },
    { key: 'contactMethod', label: 'Method', type: 'select', options: ['Web_Form', 'Phone_Call', 'Live_Chat'] },
    { key: 'leadStatus', label: 'Lead Status', type: 'select', options: ['New', 'Qualified', 'Booked', 'Completed', 'Disqualified'] },
    { key: 'bookedJob', label: 'Booked Job (1/0)', type: 'number', align: 'center' },
    { key: 'revenue', label: 'CRM Invoice Rev ($)', type: 'number', align: 'right', format: (v) => `$${Number(v).toFixed(2)}` }
  ];

  // SaaS Navigation Categories & Workspace views (No numeric labels, no Excel-like terminology)
  const sheetCategories = [
    {
      group: 'WORKSPACE',
      sheets: [
        { id: 'Control_Panel', label: 'Overview Console', icon: Layers },
        { id: 'Settings', label: 'Audit Rules Settings', icon: Settings }
      ]
    },
    {
      group: 'AUDIT DATA PIPELINES',
      sheets: [
        { id: 'Raw_GAds_SearchTerms', label: 'Ad Search Terms', icon: Database },
        { id: 'Raw_GAds_Campaigns', label: 'Ad Campaigns', icon: Database },
        { id: 'Raw_GAds_Keywords', label: 'Ad Keywords', icon: Database },
        { id: 'Raw_GA4', label: 'Analytics Landing Pages', icon: Database },
        { id: 'Raw_GSC_Queries', label: 'SEO Queries (GSC)', icon: Database },
        { id: 'Raw_GSC_Pages', label: 'SEO Landing Pages (GSC)', icon: Database },
        { id: 'Raw_Leads', label: 'CRM Sales Leads', icon: Database }
      ]
    },
    {
      group: 'DECISION ENGINE',
      sheets: [
        { id: 'Negative_Keyword_Ideas', label: 'Negative Search Queries', icon: Activity },
        { id: 'Top_5_Fixes', label: 'Prioritized Actions', icon: Sparkles },
        { id: 'Latest_Report', label: 'Executive Summary', icon: FileSpreadsheet }
      ]
    },
    {
      group: 'SYSTEM MONITORING',
      sheets: [
        { id: 'Logs', label: 'Console Audit Logs', icon: Terminal }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[var(--color-bg)] flex flex-col text-[var(--color-body-text)]">
      {/* 56px Sticky Top Horizontal Navigation Header */}
      <header className="sticky top-0 z-50 h-[var(--nav-height)] bg-[var(--nav-bg)] border-b border-[var(--nav-border)] shadow-sm px-6 flex items-center justify-between">
        {/* Brand identity */}
        <div className="flex items-center gap-3">
          <div className="bg-[var(--color-primary)] text-white p-1.5 rounded-lg flex items-center justify-center">
            <Layers className="h-4.5 w-4.5" />
          </div>
          <div>
            <span className="font-serif font-bold text-lg text-[var(--color-primary)] tracking-tight">
              LuminaSaaS
            </span>
            <span className="text-[10px] uppercase font-mono tracking-widest text-[var(--color-muted)] block">
              Operational Audit Console
            </span>
          </div>
        </div>

        {/* Sync telemetry info */}
        <div className="flex items-center gap-4 text-xs font-sans">
          <div className="hidden sm:flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-[var(--color-positive)] animate-pulse" />
            <span className="text-[var(--color-muted)]">Local Storage synced:</span>
            <span className="font-mono font-semibold text-[var(--color-primary)]">{lastSaved || 'Initial run'}</span>
          </div>

          <div className="h-4 w-px bg-gray-200" />

          <button
            onClick={handleRunManualAudit}
            className="flex items-center gap-1.5 px-3 py-1 bg-[var(--color-primary)] hover:bg-opacity-90 active:scale-95 text-white text-xs font-semibold rounded cursor-pointer transition-all uppercase tracking-wider"
          >
            <Play className="h-3 w-3 fill-white" />
            <span>Recalc</span>
          </button>
        </div>
      </header>

      {/* Main split-screen container: Side sheet tab navigator + Main interactive spreadsheet display */}
      <div className="flex-1 flex flex-col lg:flex-row max-w-[1440px] w-full mx-auto px-4 lg:px-8 py-6 gap-6">
        {/* Left Side Tab Navigator (Google Sheets tab bar equivalent) */}
        <aside className="w-full lg:w-72 shrink-0 space-y-4">
          <div className="card-elevated p-4 bg-white space-y-4">
            <div className="border-b border-black/5 pb-2">
              <h3 className="text-xs font-extrabold uppercase text-[var(--color-primary)] tracking-wider">
                Console Navigation
              </h3>
              <p className="text-[10px] text-[var(--color-muted)] mt-0.5">Select a view to inspect and audit dimensions.</p>
            </div>

            <nav className="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
              {sheetCategories.map((cat) => (
                <div key={cat.group} className="space-y-1">
                  <span className="text-[10px] font-extrabold uppercase text-[var(--color-muted)] tracking-widest block pl-2 pb-1">
                    {cat.group}
                  </span>
                  
                  <div className="space-y-0.5">
                    {cat.sheets.map((sheet) => {
                      const Icon = sheet.icon;
                      const isActive = activeTab === sheet.id;
                      return (
                        <button
                          key={sheet.id}
                          onClick={() => setActiveTab(sheet.id)}
                          className={`w-full flex items-center gap-2.5 px-3 py-2 text-xs font-medium rounded-md transition-all text-left cursor-pointer scale-100 active:scale-98 ${
                            isActive
                              ? 'bg-[var(--color-primary)] text-white shadow-sm'
                              : 'text-gray-600 hover:bg-gray-100 hover:text-[var(--color-primary)]'
                          }`}
                        >
                          <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                          <span className="truncate">{sheet.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main interactive Workbook sheet viewport */}
        <main className="flex-1 min-w-0">
          {activeTab === 'Control_Panel' && (
            <ControlPanel
              lastSaved={lastSaved}
              triggerType={triggerType}
              syncStatus={syncStatus}
              onRunAudit={handleRunManualAudit}
              onExportBackup={handleExportBackup}
              onImportBackup={handleImportBackup}
              onResetData={resetToDefaults}
              logs={logs}
              metrics={dashboardMetrics}
            />
          )}

          {activeTab === 'Settings' && (
            <SettingsTab
              settings={settings}
              onUpdateSetting={handleUpdateSetting}
              onResetSettings={() => {
                setSettings(DEFAULT_SETTINGS);
                addLog('INFO', 'Audit rules settings reset to defaults.');
                saveToLocalStorage(DEFAULT_SETTINGS);
              }}
            />
          )}

          {activeTab === 'Raw_GAds_SearchTerms' && (
            <RawTable
              title="Ad Search Terms"
              subtitle="Google Ads Search Terms real performance metrics."
              columns={searchTermsColumns}
              data={searchTerms}
              onUpdate={(id, updated) => handleUpdateRecord('searchTerms', setSearchTerms, id, updated)}
              onDelete={(id) => handleDeleteRecord('searchTerms', setSearchTerms, id)}
              onAdd={(newRec) => handleAddRecord('searchTerms', setSearchTerms, newRec)}
              onBulkAdd={(newRecs) => handleBulkAddRecords('searchTerms', setSearchTerms, newRecs)}
              emptyNewRecord={{
                date: new Date().toISOString().split('T')[0],
                campaignId: '1001',
                campaignName: 'US_Plumbing_Emergency_Broad',
                adGroupId: 'ag11',
                keyword: 'emergency plumber near me',
                searchTerm: '',
                matchType: 'BROAD',
                impressions: 0,
                clicks: 0,
                spend: 0,
                conversions: 0
              }}
            />
          )}

          {activeTab === 'Raw_GAds_Campaigns' && (
            <RawTable
              title="Ad Campaigns"
              subtitle="Google Ads Campaign general performance metadata."
              columns={campaignsColumns}
              data={campaigns}
              onUpdate={(id, updated) => handleUpdateRecord('campaigns', setCampaigns, id, updated)}
              onDelete={(id) => handleDeleteRecord('campaigns', setCampaigns, id)}
              onAdd={(newRec) => handleAddRecord('campaigns', setCampaigns, newRec)}
              onBulkAdd={(newRecs) => handleBulkAddRecords('campaigns', setCampaigns, newRecs)}
              emptyNewRecord={{
                campaignId: '',
                campaignName: '',
                status: 'ENABLED',
                budget: 0,
                impressions: 0,
                clicks: 0,
                spend: 0,
                conversions: 0
              }}
            />
          )}

          {activeTab === 'Raw_GAds_Keywords' && (
            <RawTable
              title="Ad Keywords"
              subtitle="Google Ads Keyword quality-scores and spends metadata."
              columns={keywordsColumns}
              data={keywords}
              onUpdate={(id, updated) => handleUpdateRecord('keywords', setKeywords, id, updated)}
              onDelete={(id) => handleDeleteRecord('keywords', setKeywords, id)}
              onAdd={(newRec) => handleAddRecord('keywords', setKeywords, newRec)}
              onBulkAdd={(newRecs) => handleBulkAddRecords('keywords', setKeywords, newRecs)}
              emptyNewRecord={{
                keywordId: '',
                keywordText: '',
                campaignId: '1001',
                matchType: 'EXACT',
                qualityScore: 7,
                clicks: 0,
                spend: 0
              }}
            />
          )}

          {activeTab === 'Raw_GA4' && (
            <RawTable
              title="Analytics Landing Pages"
              subtitle="Google Analytics 4 Landing page traffic acquisition parameters."
              columns={ga4Columns}
              data={ga4Pages}
              onUpdate={(id, updated) => handleUpdateRecord('ga4Pages', setGa4Pages, id, updated)}
              onDelete={(id) => handleDeleteRecord('ga4Pages', setGa4Pages, id)}
              onAdd={(newRec) => handleAddRecord('ga4Pages', setGa4Pages, newRec)}
              onBulkAdd={(newRecs) => handleBulkAddRecords('ga4Pages', setGa4Pages, newRecs)}
              emptyNewRecord={{
                date: new Date().toISOString().split('T')[0],
                landingPagePath: '/',
                sourceMedium: 'google / cpc',
                campaignId: '1001',
                sessions: 0,
                keyEvents: 0,
                bounceRate: 0.40
              }}
            />
          )}

          {activeTab === 'Raw_GSC_Queries' && (
            <RawTable
              title="SEO Queries (GSC)"
              subtitle="Google Search Console Search query impressions and CTRs."
              columns={gscQueriesColumns}
              data={gscQueries}
              onUpdate={(id, updated) => handleUpdateRecord('gscQueries', setGscQueries, id, updated)}
              onDelete={(id) => handleDeleteRecord('gscQueries', setGscQueries, id)}
              onAdd={(newRec) => handleAddRecord('gscQueries', setGscQueries, newRec)}
              onBulkAdd={(newRecs) => handleBulkAddRecords('gscQueries', setGscQueries, newRecs)}
              emptyNewRecord={{
                query: '',
                clicks: 0,
                impressions: 0,
                position: 1.0
              }}
            />
          )}

          {activeTab === 'Raw_GSC_Pages' && (
            <RawTable
              title="SEO Landing Pages (GSC)"
              subtitle="Google Search Console Landing pages Organic traffic metrics."
              columns={gscPagesColumns}
              data={gscPages}
              onUpdate={(id, updated) => handleUpdateRecord('gscPages', setGscPages, id, updated)}
              onDelete={(id) => handleDeleteRecord('gscPages', setGscPages, id)}
              onAdd={(newRec) => handleAddRecord('gscPages', setGscPages, newRec)}
              onBulkAdd={(newRecs) => handleBulkAddRecords('gscPages', setGscPages, newRecs)}
              emptyNewRecord={{
                pageUrl: 'https://',
                clicks: 0,
                impressions: 0,
                position: 1.0
              }}
            />
          )}

          {activeTab === 'Raw_Leads' && (
            <RawTable
              title="CRM Sales Leads"
              subtitle="CRM closed/booked leads master list (Reconciliation Ground Truth)."
              columns={CRMLeadsColumns}
              data={leads}
              onUpdate={(id, updated) => handleUpdateRecord('leads', setLeads, id, updated)}
              onDelete={(id) => handleDeleteRecord('leads', setLeads, id)}
              onAdd={(newRec) => handleAddRecord('leads', setLeads, newRec)}
              onBulkAdd={(newRecs) => handleBulkAddRecords('leads', setLeads, newRecs)}
              emptyNewRecord={{
                leadId: '',
                createdDate: new Date().toISOString().split('T')[0],
                gclid: '',
                utmCampaignId: '1001',
                leadSource: 'Google Ads',
                contactMethod: 'Web_Form',
                leadStatus: 'New',
                bookedJob: 0,
                revenue: 0
              }}
            />
          )}

          {activeTab === 'Negative_Keyword_Ideas' && (
            <NegativeKeywordsTab data={negativeKeywordRows} />
          )}

          {activeTab === 'Top_5_Fixes' && (
            <Top5FixesTab data={top5FixRows} />
          )}

          {activeTab === 'Latest_Report' && (
            <LatestReportTab summary={latestReportSummary} />
          )}

          {activeTab === 'Logs' && (
            <LogsTab logs={logs} onClearLogs={handleClearLogs} />
          )}
        </main>
      </div>
    </div>
  );
}
