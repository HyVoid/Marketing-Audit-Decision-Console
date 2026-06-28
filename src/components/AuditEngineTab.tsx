import React from 'react';
import { Play, TrendingUp, HelpCircle, Activity } from 'lucide-react';
import { AuditEngineRow } from '../types';

interface AuditEngineTabProps {
  data: AuditEngineRow[];
}

export default function AuditEngineTab({ data }: AuditEngineTabProps) {
  // Find max values for inline data bar relative calculations
  const maxSpend = Math.max(...data.map(r => r.totalSpend), 1);
  const maxRevenue = Math.max(...data.map(r => r.realRevenue), 1);

  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const formatPercentage = (val: number) => {
    return `${(val * 100).toFixed(2)}%`;
  };

  return (
    <div className="card-elevated p-6 animate-fade-up space-y-6">
      {/* Header */}
      <div className="pb-6 border-b border-[var(--color-border)]">
        <h2 className="text-xl font-heading font-medium tracking-tight text-[var(--color-primary)] uppercase flex items-center gap-2">
          <Activity className="h-5 w-5 text-[var(--color-accent)]" />
          <span>10_Audit_Engine (Formula Calculation Sheet)</span>
        </h2>
        <p className="text-xs text-[var(--color-muted)] font-sans mt-1">
          Ground-truth attribution bridging active Campaign IDs, ad network claimed conversions, and CRM closed bookings.
        </p>
      </div>

      {/* Sheet Logic Description */}
      <div className="insight-block">
        <h3 className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider mb-1">
          Dynamic Array Formula & Calculation Rules
        </h3>
        <p className="text-xs text-[var(--color-primary)] leading-relaxed">
          All calculated cells in this sheet are powered by Excel-compliant <strong>365 array mapping</strong>. 
          When raw CRM details or Campaign Spends change, dependencies propagate dynamically to recalculate CPA, attribution gaps, 
          and diagnostic ratings instantly:
        </p>
        <ul className="list-disc pl-5 mt-2 space-y-1 text-xs text-[var(--color-primary)]">
          <li><strong>Real CPA</strong> = Total Spend / Matched Real Leads (excl. CRM Disqualified entries).</li>
          <li><strong>Real ROAS</strong> = CRM Financial Revenue / Total Spend (the true ultimate ROI).</li>
          <li><strong>Attribution Gap %</strong> = (Claimed Conversions - CRM Leads) / Claimed Conversions.</li>
        </ul>
      </div>

      {/* Primary Calculated Grid */}
      <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
        <table className="w-full border-collapse bg-white text-[13px]">
          <thead>
            <tr className="bg-[var(--table-header-bg)] border-b-2 border-[var(--table-header-sep)] text-[var(--color-primary)] h-[var(--row-height-header)]">
              <th className="px-4 py-2 uppercase font-bold text-xs text-left tracking-[0.06em]">Campaign Name</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-right tracking-[0.06em] w-52">Total Spend</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-right tracking-[0.06em]">Reported Conv.</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-right tracking-[0.06em]">Reported CPA</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-right tracking-[0.06em]">CRM Real Leads</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-right tracking-[0.06em]">Real CPA</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-right tracking-[0.06em] w-52">CRM Real Revenue</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-right tracking-[0.06em]">Real ROAS</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-right tracking-[0.06em]">Attribution Gap</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-center tracking-[0.06em]">Health Status</th>
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => {
              const spendPercentage = (row.totalSpend / maxSpend) * 100;
              const revenuePercentage = (row.realRevenue / maxRevenue) * 100;
              const isHighGap = row.attributionGap > 0.5;

              return (
                <tr 
                  key={row.campaignId}
                  className={`border-b border-[var(--color-border)] hover:bg-[rgba(5,28,44,0.01)] transition-colors ${
                    idx % 2 === 0 ? 'bg-[var(--color-bg)]/20' : 'bg-white'
                  }`}
                >
                  {/* Name */}
                  <td className="px-4 py-3 font-semibold text-[var(--color-primary)]">
                    {row.campaignName}
                    <div className="text-[10px] text-[var(--color-muted)] font-mono font-normal">
                      ID: {row.campaignId}
                    </div>
                  </td>

                  {/* Total Spend (Inline Data Bar) */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="font-mono font-bold text-[var(--color-primary)]">
                        {formatCurrency(row.totalSpend)}
                      </span>
                      {/* Accent-colored inline data bar */}
                      <div className="w-full h-1.5 bg-[rgba(34,81,255,0.1)] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-500"
                          style={{ width: `${spendPercentage}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Reported Conv */}
                  <td className="px-4 py-3 text-right font-mono font-medium text-[var(--color-primary)]">
                    {row.reportedConversions.toFixed(0)}
                  </td>

                  {/* Reported CPA */}
                  <td className="px-4 py-3 text-right font-mono text-[var(--color-muted)]">
                    {formatCurrency(row.reportedCpa)}
                  </td>

                  {/* CRM Real Leads */}
                  <td className="px-4 py-3 text-right font-mono font-bold text-[var(--color-primary)]">
                    {row.matchedRealLeads}
                  </td>

                  {/* Real CPA */}
                  <td className="px-4 py-3 text-right font-mono font-bold text-[var(--color-primary)]">
                    {formatCurrency(row.realCpa)}
                  </td>

                  {/* CRM Real Revenue (Inline Data Bar) */}
                  <td className="px-4 py-3">
                    <div className="flex flex-col items-end gap-1.5">
                      <span className="font-mono font-bold text-[var(--color-primary)]">
                        {formatCurrency(row.realRevenue)}
                      </span>
                      <div className="w-full h-1.5 bg-[rgba(34,81,255,0.1)] rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-[var(--color-accent)] rounded-full transition-all duration-500"
                          style={{ width: `${revenuePercentage}%` }}
                        />
                      </div>
                    </div>
                  </td>

                  {/* Real ROAS */}
                  <td className="px-4 py-3 text-right font-mono font-bold text-[var(--color-primary)]">
                    {row.realRoas.toFixed(2)}x
                  </td>

                  {/* Attribution Gap */}
                  <td className={`px-4 py-3 text-right font-mono font-bold ${
                    isHighGap ? 'text-[var(--color-negative)]' : 'text-[var(--color-muted)]'
                  }`}>
                    {formatPercentage(row.attributionGap)}
                  </td>

                  {/* Health Status Pill Badge */}
                  <td className="px-4 py-3 text-center whitespace-nowrap">
                    <span className={`inline-flex px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${
                      row.campaignHealth === 'Excellent' 
                        ? 'bg-green-100 text-[var(--color-positive)]' 
                        : row.campaignHealth === 'High CPA Alert' || row.campaignHealth === 'Critical Action Required'
                        ? 'bg-red-100 text-[var(--color-negative)]' 
                        : 'bg-gray-100 text-[var(--color-muted)]'
                    }`}>
                      {row.campaignHealth}
                    </span>
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
