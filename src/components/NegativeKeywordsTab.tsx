import React from 'react';
import { AlertOctagon, HelpCircle, ShieldX } from 'lucide-react';
import { NegativeKeywordRow } from '../types';

interface NegativeKeywordsTabProps {
  data: NegativeKeywordRow[];
}

export default function NegativeKeywordsTab({ data }: NegativeKeywordsTabProps) {
  const maxSpend = Math.max(...data.map(r => r.totalSpend), 1);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  return (
    <div className="card-elevated p-6 animate-fade-up space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-[var(--color-border)]">
        <h2 className="text-xl font-heading font-medium tracking-tight text-[var(--color-primary)] uppercase flex items-center gap-2">
          <AlertOctagon className="h-5 w-5 text-[var(--color-negative)] animate-pulse" />
          <span>Negative Keyword Ideas (Wastage Scanner)</span>
        </h2>
        <p className="text-xs text-[var(--color-muted)] font-sans mt-1">
          Scans and flags expensive ad-words and queries failing to generate actual CRM lead records.
        </p>
      </div>

      {/* Logic Card */}
      <div className="anomaly-block">
        <h3 className="text-xs font-bold text-[var(--color-negative)] uppercase tracking-wider mb-1">
          Wastage Scanner Logic & Setting Rule
        </h3>
        <p className="text-xs text-[var(--color-primary)] leading-relaxed">
          The console automatically audits search queries that spent over <strong>Max Search Term Waste ($50.00)</strong> with zero leads. 
          These terms leak massive ad spend and must be added directly as <strong>Negative Exact keywords</strong> inside your Google Ads account to stop the bleed.
        </p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
        <table className="w-full border-collapse bg-white text-[13px]">
          <thead>
            <tr className="bg-[var(--table-header-bg)] border-b-2 border-[var(--table-header-sep)] text-[var(--color-primary)] h-[var(--row-height-header)]">
              <th className="px-4 py-2 uppercase font-bold text-xs text-left tracking-[0.06em]">Flagged Search Term</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-left tracking-[0.06em]">Associated Campaign</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-right tracking-[0.06em]">Clicks</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-right tracking-[0.06em] w-48">Total Spend</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-right tracking-[0.06em]">Audited CRM Leads</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-right tracking-[0.06em]">Booked Sales</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-center tracking-[0.06em]">Wastage Class</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-left tracking-[0.06em]">Action Recommendation</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => {
              const spendPercentage = (row.totalSpend / maxSpend) * 100;
              const isCritical = row.wasteStatus === 'CRITICAL WASTE' || row.wasteStatus === 'SUSPECT';

              return (
                <tr 
                  key={row.searchTerm}
                  className={`border-b border-[var(--color-border)] hover:bg-[rgba(5,28,44,0.01)] transition-colors ${
                    idx % 2 === 0 ? 'bg-[var(--color-bg)]/20' : 'bg-white'
                  }`}
                >
                  {/* Query text */}
                  <td className="px-4 py-3 font-mono font-medium text-[var(--color-primary)]">
                    &ldquo;{row.searchTerm}&rdquo;
                  </td>

                  {/* Campaign */}
                  <td className="px-4 py-3 font-sans text-[var(--color-muted)]">
                    {row.associatedCampaign}
                  </td>

                  {/* Clicks */}
                  <td className="px-4 py-3 text-right font-mono text-[var(--color-primary)]">
                    {row.clicks}
                  </td>

                  {/* Total Spend with inline bar */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-end gap-1">
                      <span className="font-mono font-bold text-[var(--color-primary)]">
                        {formatCurrency(row.totalSpend)}
                      </span>
                      <div className="w-full h-1 bg-[rgba(34,81,255,0.1)] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-500"
                          style={{ width: `${spendPercentage}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Leads */}
                  <td className={`px-4 py-3 text-right font-mono font-bold ${
                    row.matchedRealLeads === 0 ? 'text-[var(--color-negative)]' : 'text-[var(--color-primary)]'
                  }`}>
                    {row.matchedRealLeads}
                  </td>

                  {/* Booked Jobs */}
                  <td className="px-4 py-3 text-right font-mono text-[var(--color-primary)]">
                    {row.realBookedJobs}
                  </td>

                  {/* Waste status pill */}
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                      row.wasteStatus === 'CRITICAL WASTE'
                        ? 'bg-red-150 text-[var(--color-negative)] bg-red-100' 
                        : row.wasteStatus === 'SUSPECT'
                        ? 'bg-red-100 text-[var(--color-negative)]'
                        : 'bg-gray-100 text-[var(--color-muted)]'
                    }`}>
                      {row.wasteStatus}
                    </span>
                  </td>

                  {/* Advice text */}
                  <td className={`px-4 py-3 font-sans text-xs font-semibold ${
                    isCritical ? 'text-[var(--color-negative)]' : 'text-[var(--color-muted)]'
                  }`}>
                    {row.actionRecommendation}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
