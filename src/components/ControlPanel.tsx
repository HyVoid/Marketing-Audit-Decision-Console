import React from 'react';
import { Play, Download, Upload, RotateCcw, ShieldCheck, Database, Calendar, AlertTriangle } from 'lucide-react';
import { SystemLog } from '../types';

interface ControlPanelProps {
  lastSaved: string;
  triggerType: 'MANUAL' | 'AUTO';
  syncStatus: 'SUCCESS' | 'FAILED' | 'RUNNING';
  onRunAudit: () => void;
  onExportBackup: () => void;
  onImportBackup: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onResetData: () => void;
  logs: SystemLog[];
  metrics: {
    campaignCount: number;
    leadsCount: number;
    wasteCount: number;
    criticalIssuesCount: number;
  };
}

export default function ControlPanel({
  lastSaved,
  triggerType,
  syncStatus,
  onRunAudit,
  onExportBackup,
  onImportBackup,
  onResetData,
  logs,
  metrics
}: ControlPanelProps) {
  const fileInputRef = React.useRef<HTMLInputElement>(null);

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Hero Welcome banner */}
      <div className="card-elevated p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative overflow-hidden bg-gradient-to-br from-[var(--color-surface)] to-[var(--color-bg)]/30">
        <div className="space-y-2 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--insight-bg)] text-[var(--color-accent)] text-[10px] font-bold uppercase tracking-wider">
            <ShieldCheck className="h-3.5 w-3.5" />
            <span>Operational Audit Active</span>
          </div>
          <h1 className="text-3xl font-display font-bold tracking-tight text-[var(--color-primary)]">
            Marketing Audit Decision Console
          </h1>
          <p className="text-sm text-[var(--color-muted)] font-sans">
            Cross-reference live Google Ads, GA4, and Search Console pipelines against CRM Lead realities. 
            Identify marketing ROI authenticity, eliminate conversion inflation, and plug budget leakages automatically.
          </p>
        </div>

        <button
          onClick={onRunAudit}
          className="flex items-center gap-2 bg-[var(--color-accent)] hover:bg-opacity-90 text-white font-bold py-3 px-6 rounded-lg text-sm shadow-md hover:translate-y-[-2px] active:scale-95 transition-all duration-200 cursor-pointer text-center whitespace-nowrap"
        >
          <Play className="h-4 w-4 fill-white" />
          <span>RUN ROBUST AUDIT</span>
        </button>
      </div>

      {/* Grid Status Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="card-resting card-hover p-5 bg-white space-y-2">
          <div className="flex items-center justify-between text-[var(--color-muted)]">
            <span className="text-[10px] uppercase font-bold tracking-wider">Campaigns Analyzed</span>
            <Database className="h-4 w-4 text-[var(--color-accent)]" />
          </div>
          <p className="text-3xl font-display font-bold text-[var(--color-primary)]">
            {metrics.campaignCount}
          </p>
          <p className="text-[10px] text-[var(--color-muted)]">Active tracking dimensions</p>
        </div>

        <div className="card-resting card-hover p-5 bg-white space-y-2">
          <div className="flex items-center justify-between text-[var(--color-muted)]">
            <span className="text-[10px] uppercase font-bold tracking-wider">CRM Lead Pool</span>
            <ShieldCheck className="h-4 w-4 text-[var(--color-positive)]" />
          </div>
          <p className="text-3xl font-display font-bold text-[var(--color-primary)]">
            {metrics.leadsCount}
          </p>
          <p className="text-[10px] text-[var(--color-muted)]">Reconciled ground-truth pool</p>
        </div>

        <div className="card-resting card-hover p-5 bg-white space-y-2">
          <div className="flex items-center justify-between text-[var(--color-muted)]">
            <span className="text-[10px] uppercase font-bold tracking-wider">Waste Queries</span>
            <AlertTriangle className="h-4 w-4 text-[var(--color-negative)]" />
          </div>
          <p className="text-3xl font-display font-bold text-[var(--color-negative)]">
            {metrics.wasteCount}
          </p>
          <p className="text-[10px] text-[var(--color-muted)]">Zero-conversion cash leaks</p>
        </div>

        <div className="card-resting card-hover p-5 bg-white space-y-2">
          <div className="flex items-center justify-between text-[var(--color-muted)]">
            <span className="text-[10px] uppercase font-bold tracking-wider">Weekly Tasks</span>
            <Calendar className="h-4 w-4 text-[var(--color-accent)]" />
          </div>
          <p className="text-3xl font-display font-bold text-[var(--color-primary)]">
            {metrics.criticalIssuesCount}
          </p>
          <p className="text-[10px] text-[var(--color-muted)]">Top Fix actions suggested</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Core Controls Console */}
        <div className="card-elevated p-6 bg-white space-y-6 lg:col-span-2">
          <div>
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)] mb-1">
              Data Pipeline & Backup Controls
            </h3>
            <p className="text-xs text-[var(--color-muted)]">
              Perform configuration export/import diagnostics, trigger raw data sync, or reset the local sandbox cache.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Status overview list */}
            <div className="p-4 bg-[var(--color-bg)] rounded-lg space-y-3 text-xs border border-[var(--color-border)]">
              <div className="flex justify-between items-center py-1 border-b border-black/5">
                <span className="font-medium text-[var(--color-muted)] uppercase text-[10px] tracking-wider">Audit Sync Status</span>
                <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                  syncStatus === 'SUCCESS' ? 'bg-green-100 text-[var(--color-positive)]' : 'bg-red-100 text-[var(--color-negative)]'
                }`}>
                  {syncStatus}
                </span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-black/5">
                <span className="font-medium text-[var(--color-muted)] uppercase text-[10px] tracking-wider">Trigger Method</span>
                <span className="font-mono text-[var(--color-primary)] font-semibold">{triggerType}</span>
              </div>
              <div className="flex justify-between items-center py-1 border-b border-black/5">
                <span className="font-medium text-[var(--color-muted)] uppercase text-[10px] tracking-wider">Last Saved Cache</span>
                <span className="font-mono text-[var(--color-primary)] font-semibold">{lastSaved}</span>
              </div>
              <div className="flex justify-between items-center py-1">
                <span className="font-medium text-[var(--color-muted)] uppercase text-[10px] tracking-wider">Storage Target</span>
                <span className="font-mono text-[var(--color-accent)] font-semibold">LOCALSTORAGE</span>
              </div>
            </div>

            {/* Storage Actions */}
            <div className="space-y-3">
              <button
                onClick={onExportBackup}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white hover:bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md text-xs font-semibold text-[var(--color-primary)] transition-all cursor-pointer active:scale-[0.98]"
              >
                <Download className="h-4 w-4 text-[var(--color-accent)]" />
                <span>Export System Backup</span>
              </button>

              <button
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-white hover:bg-[var(--color-bg)] border border-[var(--color-border)] rounded-md text-xs font-semibold text-[var(--color-primary)] transition-all cursor-pointer active:scale-[0.98]"
              >
                <Upload className="h-4 w-4 text-[var(--color-accent)]" />
                <span>Import System Backup</span>
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept=".json"
                onChange={onImportBackup}
                className="hidden"
              />

              <button
                onClick={onResetData}
                className="flex items-center justify-center gap-2 w-full py-2.5 px-4 bg-red-50 hover:bg-red-100 border border-red-200 rounded-md text-xs font-semibold text-[var(--color-negative)] transition-all cursor-pointer active:scale-[0.98]"
              >
                <RotateCcw className="h-4 w-4" />
                <span>Reset System to Default</span>
              </button>
            </div>
          </div>

          <div className="insight-block">
            <h4 className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider mb-1">
              Audit Insight: Ground-Truth Principle
            </h4>
            <p className="text-xs text-[var(--color-primary)] leading-relaxed">
              Ad networks rely on client-side JS tags which are highly prone to tag duplicate triggers, bot leads, and testing submissions.
              This SaaS console cross-references clicks with <strong>CRM Sales Records</strong> (actual revenue & Qualified status)
              to reveal the genuine ROI and isolate exactly where your hard budgets are leaking.
            </p>
          </div>
        </div>

        {/* Sync System Log Output */}
        <div className="card-elevated p-6 bg-white flex flex-col h-full max-h-[380px]">
          <div className="mb-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[var(--color-primary)] mb-1">
              System Audit Stream
            </h3>
            <p className="text-[10px] text-[var(--color-muted)]">
              Real-time calculations execution trace.
            </p>
          </div>

          <div className="flex-1 bg-gray-950 text-gray-200 p-3 rounded-lg font-mono text-[11px] overflow-y-auto space-y-2 select-text">
            {logs.slice(-10).map((log, i) => (
              <div key={i} className="leading-5">
                <span className="text-gray-500 mr-2">[{log.timestamp.slice(11, 19)}]</span>
                <span className={`font-bold mr-1 ${
                  log.type === 'ERROR' ? 'text-red-400' :
                  log.type === 'WARNING' ? 'text-yellow-400' :
                  log.type === 'SUCCESS' ? 'text-emerald-400' : 'text-sky-400'
                }`}>
                  {log.type}
                </span>
                <span className="text-gray-300">{log.message}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
