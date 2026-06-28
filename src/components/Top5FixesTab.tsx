import React from 'react';
import { Award, ArrowRight, ShieldAlert, Sparkles, AlertCircle } from 'lucide-react';
import { Top5FixRow } from '../types';

interface Top5FixesTabProps {
  data: Top5FixRow[];
}

export default function Top5FixesTab({ data }: Top5FixesTabProps) {
  const formatCurrency = (val: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(val);
  };

  const totalSavings = data.reduce((sum, item) => sum + item.potentialSaving, 0);

  return (
    <div className="space-y-6 animate-fade-up">
      {/* Overview Block */}
      <div className="card-elevated p-6 bg-gradient-to-r from-[var(--color-primary)] to-[#0A2E47] text-white flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(34,81,255,0.2)] text-[#91A7FF] text-[10px] font-bold uppercase tracking-wider">
            <Sparkles className="h-3.5 w-3.5" />
            <span>AI-Driven Action Priority</span>
          </div>
          <h2 className="text-2xl font-display font-bold tracking-tight">
            Prioritized Actions (Weekly Optimization Playbook)
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed max-w-2xl">
            This module dynamically sorts all system inefficiencies (zero-conversion search queries, underperforming campaigns, and budget discrepancies) 
            to surface the prioritized actions that will plug the most ad-spend leakages immediately.
          </p>
        </div>

        <div className="p-4 bg-white/5 rounded-lg border border-white/10 text-right shrink-0">
          <p className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Potential Salvage</p>
          <p className="text-3xl font-display font-extrabold text-[var(--color-positive)] mt-1">
            {formatCurrency(totalSavings)}
          </p>
          <p className="text-[9px] text-gray-400 mt-0.5">Instant waste exclusion savings</p>
        </div>
      </div>

      {/* Recommended actions list */}
      <div className="space-y-4">
        {data.length === 0 ? (
          <div className="card-resting p-8 text-center text-gray-500 bg-white">
            <Award className="h-10 w-10 text-[var(--color-positive)] mx-auto mb-3" />
            <h3 className="font-heading font-bold text-lg text-[var(--color-primary)]">System Status: Pristine</h3>
            <p className="text-xs text-[var(--color-muted)] mt-1">
              All campaigns exceed target ROAS and zero-conversion search keyword leakages are within tolerated limits. Great job!
            </p>
          </div>
        ) : (
          data.map((item, idx) => {
            const isNegativeExclude = item.type === 'Negative_Keyword_Exclusion';

            return (
              <div 
                key={item.id}
                className="card-resting card-hover bg-white p-6 flex flex-col md:flex-row items-start gap-6 border-l-4 border-[var(--color-accent)]"
              >
                {/* Ranking indicator */}
                <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-[var(--color-bg)] shrink-0 select-none">
                  <span className="text-2xl font-display font-extrabold text-[var(--color-primary)]">
                    #0{idx + 1}
                  </span>
                </div>

                {/* Fix description and issue */}
                <div className="flex-1 space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase ${
                      isNegativeExclude 
                        ? 'bg-red-100 text-[var(--color-negative)]' 
                        : 'bg-blue-100 text-[var(--color-accent)]'
                    }`}>
                      {item.type.replace(/_/g, ' ')}
                    </span>
                    <span className="text-[10px] text-[var(--color-muted)] uppercase font-semibold">Priority Action</span>
                  </div>

                  <div className="space-y-1">
                    <h4 className="text-sm font-semibold text-[var(--color-primary)] flex items-start gap-1.5">
                      <AlertCircle className="h-4 w-4 text-[var(--color-negative)] shrink-0 mt-0.5" />
                      <span>{item.issue}</span>
                    </h4>
                    <p className="text-xs text-[var(--color-muted)] leading-relaxed pl-5">
                      {item.recommendation}
                    </p>
                  </div>
                </div>

                {/* Potential Saving Salvage badge */}
                <div className="p-4 bg-[var(--color-bg)] rounded-lg border border-[var(--color-border)] text-right w-full md:w-48 shrink-0">
                  <p className="text-[9px] uppercase font-bold text-[var(--color-muted)] tracking-wider">Potential Salvage</p>
                  <p className="text-lg font-mono font-bold text-[var(--color-primary)] mt-0.5">
                    {formatCurrency(item.potentialSaving)}
                  </p>
                  <div className="inline-flex items-center gap-1 text-[10px] text-[var(--color-accent)] font-semibold mt-1">
                    <span>Fix In Google Ads</span>
                    <ArrowRight className="h-3 w-3" />
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
