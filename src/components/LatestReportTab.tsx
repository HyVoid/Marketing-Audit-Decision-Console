import React from 'react';
import { ShieldAlert, TrendingUp, Sparkles, CheckCircle2, ChevronRight, FileSpreadsheet } from 'lucide-react';
import { LatestReportSummary } from '../utils/auditCalculator';

interface LatestReportTabProps {
  summary: LatestReportSummary;
}

export default function LatestReportTab({ summary }: LatestReportTabProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const formatPercentage = (val: number) => {
    return `${(val * 100).toFixed(2)}%`;
  };

  const isHighInflationRisk = summary.attributionGap > 0.50;

  return (
    <div className="card-elevated p-8 bg-white space-y-8 animate-fade-up">
      {/* Dashboard Top Branding Section */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[var(--color-border)] gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1 text-[var(--color-accent)] font-bold text-[10px] uppercase tracking-wider">
            <Sparkles className="h-3 w-3" />
            <span>EXECUTIVE DECISION CONSOLE</span>
          </div>
          <h2 className="text-2xl font-display font-bold tracking-tight text-[var(--color-primary)]">
            Financial Authenticity Audit Report
          </h2>
          <p className="text-xs text-[var(--color-muted)] font-sans">
            Consolidated overview comparing marketing platform claims against ground-truth closed CRM sales ledger data.
          </p>
        </div>

        <div className="flex items-center gap-1.5 text-xs text-[var(--color-muted)] font-semibold uppercase tracking-wider bg-[var(--color-bg)] py-1.5 px-3 rounded-md">
          <FileSpreadsheet className="h-4 w-4 text-[var(--color-primary)]" />
          <span>Executive Summary Console</span>
        </div>
      </div>

      {/* Grid of Audit Sections */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Section 1: Traffic & Spend Audit */}
        <div className="space-y-4 p-5 rounded-xl bg-[var(--color-bg)]/35 border border-[var(--color-border)]">
          <div className="border-b border-black/5 pb-2">
            <span className="text-[10px] font-bold tracking-wider text-[var(--color-muted)] uppercase">Spend & Traffic</span>
            <h3 className="text-sm font-semibold text-[var(--color-primary)] mt-0.5">Traffic & Spend Audit</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-wider">Real Ad Spend</p>
              <p className="text-3xl font-display font-extrabold text-[var(--color-primary)]">
                {formatCurrency(summary.realAdSpend)}
              </p>
              <p className="text-[10px] text-[var(--color-muted)]">Actual platform financial outlays</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-wider">Claimed Platform Conversions</p>
              <p className="text-2xl font-display font-bold text-[var(--color-primary)]">
                {summary.reportedConversions.toFixed(0)}
              </p>
              <p className="text-[10px] text-[var(--color-muted)]">Reported by Google Ads pixel events</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-wider">Reported CPA</p>
              <p className="text-lg font-mono font-bold text-[var(--color-primary)]">
                {formatCurrency(summary.reportedCpa)}
              </p>
              <p className="text-[10px] text-[var(--color-muted)]">Cost per lead according to ad platform</p>
            </div>
          </div>
        </div>

        {/* Section 2: Real CRM Booking Audit */}
        <div className="space-y-4 p-5 rounded-xl bg-[var(--color-bg)]/35 border border-[var(--color-border)]">
          <div className="border-b border-black/5 pb-2">
            <span className="text-[10px] font-bold tracking-wider text-[var(--color-muted)] uppercase">Lead Verification</span>
            <h3 className="text-sm font-semibold text-[var(--color-primary)] mt-0.5">Real CRM Booking Audit</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-wider">Audited Real Leads</p>
              <p className="text-3xl font-display font-extrabold text-[var(--color-primary)]">
                {summary.auditedLeads}
              </p>
              <p className="text-[10px] text-[var(--color-muted)]">Unique CRM leads excluding disqualifications</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-wider">CRM Booked Jobs</p>
              <p className="text-2xl font-display font-bold text-[var(--color-primary)]">
                {summary.bookedJobs}
              </p>
              <p className="text-[10px] text-[var(--color-muted)]">Jobs closed successfully in the field</p>
            </div>

            <div className="space-y-1 flex items-center justify-between gap-4">
              <div className="space-y-1">
                <p className="text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-wider">Lead Booking Rate</p>
                <p className="text-lg font-mono font-bold text-[var(--color-primary)]">
                  {formatPercentage(summary.bookingRate)}
                </p>
              </div>
              <div className="space-y-1 text-right">
                <p className="text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-wider">Audited Real CPA</p>
                <p className="text-lg font-mono font-bold text-[var(--color-primary)]">
                  {formatCurrency(summary.auditedRealCpa)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Section 3: Financial Value Loop */}
        <div className="space-y-4 p-5 rounded-xl bg-[var(--color-bg)]/35 border border-[var(--color-border)]">
          <div className="border-b border-black/5 pb-2">
            <span className="text-[10px] font-bold tracking-wider text-[var(--color-muted)] uppercase">Closed ROI Loop</span>
            <h3 className="text-sm font-semibold text-[var(--color-primary)] mt-0.5">Financial Value Loop</h3>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-wider">Closed Real Revenue</p>
              <p className="text-3xl font-display font-extrabold text-[var(--color-accent)]">
                {formatCurrency(summary.totalRevenue)}
              </p>
              <p className="text-[10px] text-[var(--color-muted)]">Closed invoices matched to Campaign IDs</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-wider">Ground-Truth Real ROAS</p>
              <p className="text-2xl font-display font-bold text-[var(--color-accent)]">
                {summary.realRoas.toFixed(2)}x
              </p>
              <p className="text-[10px] text-[var(--color-muted)]">Actual financial return on ad dollar spent</p>
            </div>

            <div className="space-y-1">
              <p className="text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-wider">Attribution Gap %</p>
              <p className={`text-lg font-mono font-bold ${
                isHighInflationRisk ? 'text-[var(--color-negative)] animate-pulse' : 'text-[var(--color-primary)]'
              }`}>
                {formatPercentage(summary.attributionGap)}
              </p>
              <p className="text-[10px] text-[var(--color-muted)]">Mismatch rate between platforms & CRM</p>
            </div>
          </div>
        </div>
      </div>

      {/* Diagnostics Alerts based on attribution gaps */}
      {isHighInflationRisk ? (
        <div className="anomaly-block flex items-start gap-4">
          <ShieldAlert className="h-6 w-6 text-[var(--color-negative)] shrink-0 mt-0.5 animate-bounce" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-negative)]">
              CRITICAL ATTRIBUTION INFLATION WARNING
            </h4>
            <p className="text-xs text-[var(--color-primary)] leading-relaxed">
              Diagnostic Audit Result: <strong>Data is at severe risk of inflation!</strong> Approximately 
              {" "}<strong className="text-[var(--color-negative)]">{formatPercentage(summary.attributionGap)}</strong> of claimed platform conversions 
              do not exist inside your CRM Leads roster. This signals massive spam bot form entries, duplicate tag firings, or conversion hijacking. 
              Review the <strong>Wastage Scanner</strong> immediately to plug budget leaks.
            </p>
          </div>
        </div>
      ) : (
        <div className="insight-block flex items-start gap-4">
          <CheckCircle2 className="h-6 w-6 text-[var(--color-positive)] shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-sm font-bold uppercase tracking-wider text-[var(--color-accent)]">
              PLATFORM DATA SYNCHRONIZATION ALIGNED
            </h4>
            <p className="text-xs text-[var(--color-primary)] leading-relaxed">
              Diagnostic Audit Result: The attribution gap is within a safe margin of tolerance. 
              Conversion tracking feeds match CRM validation points smoothly. Continue regular periodic auditing to preserve tracking health.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
