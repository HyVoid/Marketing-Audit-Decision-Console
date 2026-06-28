import React from 'react';
import { Settings, Save, RefreshCcw } from 'lucide-react';
import { AuditRuleSetting } from '../types';

interface SettingsTabProps {
  settings: AuditRuleSetting[];
  onUpdateSetting: (key: string, value: number) => void;
  onResetSettings: () => void;
}

export default function SettingsTab({
  settings,
  onUpdateSetting,
  onResetSettings
}: SettingsTabProps) {
  return (
    <div className="card-elevated p-6 animate-fade-up space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[var(--color-border)] gap-4">
        <div>
          <h2 className="text-xl font-heading font-medium tracking-tight text-[var(--color-primary)] uppercase flex items-center gap-2">
            <Settings className="h-5 w-5 text-[var(--color-accent)]" />
            <span>Audit Threshold Rules</span>
          </h2>
          <p className="text-xs text-[var(--color-muted)] font-sans mt-1">
            Define target thresholds, limits, and rules for calculations in the Audit Engine and Waste Filters.
          </p>
        </div>

        <button
          onClick={onResetSettings}
          className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 border border-[var(--color-border)] text-[var(--color-primary)] rounded-md hover:bg-gray-50 active:scale-95 transition-all cursor-pointer"
        >
          <RefreshCcw className="h-3.5 w-3.5" />
          <span>Reset Rules to Default</span>
        </button>
      </div>

      <div className="insight-block">
        <h3 className="text-xs font-bold text-[var(--color-accent)] uppercase tracking-wider mb-1">
          Formula Parameter Logic
        </h3>
        <p className="text-xs text-[var(--color-primary)] leading-relaxed">
          These settings act as live parameters for real-time validation checks across the console.
          Modifying any value triggers immediate recalculations across the <strong>Wastage Scanner</strong>, <strong>Prioritized Actions</strong>, and the <strong>Executive Summary Report</strong>.
        </p>
      </div>

      <div className="overflow-x-auto rounded-lg border border-[var(--color-border)]">
        <table className="w-full border-collapse bg-white text-[13px]">
          <thead>
            <tr className="bg-[var(--table-header-bg)] border-b-2 border-[var(--table-header-sep)] text-[var(--color-primary)] h-[var(--row-height-header)]">
              <th className="px-4 py-2 uppercase font-bold text-xs text-left tracking-[0.06em]">Rule Category</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-left tracking-[0.06em]">Parameter Name</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-left tracking-[0.06em] w-48">Value</th>
              <th className="px-4 py-2 uppercase font-bold text-xs text-left tracking-[0.06em]">Validation / Diagnostic Logic</th>
            </tr>
          </thead>
          <tbody>
            {settings.map((rule, idx) => (
              <tr 
                key={rule.key}
                className={`border-b border-[var(--color-border)] hover:bg-[rgba(5,28,44,0.01)] transition-colors ${
                  idx % 2 === 0 ? 'bg-[var(--color-bg)]/20' : 'bg-white'
                }`}
              >
                <td className="px-4 py-3 whitespace-nowrap font-sans font-medium text-[var(--color-muted)]">
                  <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-wider uppercase bg-gray-100">
                    {rule.category}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap font-sans font-semibold text-[var(--color-primary)]">
                  {rule.name}
                  <div className="text-[10px] font-mono font-normal text-gray-400 mt-0.5">
                    {rule.key}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center gap-1.5">
                    <input
                      type="number"
                      step="any"
                      value={rule.value}
                      onChange={(e) => {
                        const val = e.target.value === '' ? 0 : parseFloat(e.target.value);
                        onUpdateSetting(rule.key, val);
                      }}
                      className="editable-input text-xs font-mono font-bold w-28 text-right bg-[var(--color-input-bg)] pr-3"
                    />
                    <span className="text-xs text-[var(--color-muted)] font-mono">
                      {rule.key.includes('rate') || rule.key.includes('gap') ? 'x100%' : '$'}
                    </span>
                  </div>
                </td>
                <td className="px-4 py-3 text-[12px] text-[var(--color-primary)] leading-relaxed">
                  {rule.validationLogic}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
