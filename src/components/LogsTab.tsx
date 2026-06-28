import React, { useState } from 'react';
import { Terminal, Trash2, Search, ArrowDownCircle, RefreshCw } from 'lucide-react';
import { SystemLog } from '../types';

interface LogsTabProps {
  logs: SystemLog[];
  onClearLogs: () => void;
}

export default function LogsTab({ logs, onClearLogs }: LogsTabProps) {
  const [filterType, setFilterType] = useState<string>('ALL');
  const [search, setSearch] = useState('');

  const filteredLogs = logs.filter(log => {
    const matchesType = filterType === 'ALL' || log.type === filterType;
    const matchesSearch = log.message.toLowerCase().includes(search.toLowerCase());
    return matchesType && matchesSearch;
  });

  return (
    <div className="card-elevated p-6 animate-fade-up space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-[var(--color-border)] gap-4">
        <div>
          <h2 className="text-xl font-heading font-medium tracking-tight text-[var(--color-primary)] uppercase flex items-center gap-2">
            <Terminal className="h-5 w-5 text-[var(--color-accent)]" />
            <span>Console Audit Logs (Operational Calculation Trace)</span>
          </h2>
          <p className="text-xs text-[var(--color-muted)] font-sans mt-1">
            Examine low-level mathematical reconciliation, raw data parsing, and GCLID attribution mapping streams.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={onClearLogs}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border border-red-200 text-[var(--color-negative)] rounded-md hover:bg-red-50 transition-all cursor-pointer"
          >
            <Trash2 className="h-4 w-4" />
            <span>Clear Trace Log</span>
          </button>
        </div>
      </div>

      {/* Filters bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 bg-[var(--color-bg)] rounded-lg border border-[var(--color-border)]">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold uppercase text-[var(--color-primary)] tracking-wider whitespace-nowrap">Filter Severity</span>
          <select
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
            className="text-xs p-1.5 border border-[var(--color-border)] rounded bg-white font-sans focus:outline-none focus:border-[var(--color-accent)] cursor-pointer"
          >
            <option value="ALL">All Levels</option>
            <option value="INFO">INFO Only</option>
            <option value="SUCCESS">SUCCESS Only</option>
            <option value="WARNING">WARNING Only</option>
            <option value="ERROR">ERROR Only</option>
          </select>
        </div>

        <div className="relative w-full sm:w-72">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
            <Search className="h-4 w-4" />
          </span>
          <input
            type="text"
            placeholder="Search log messages..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 pr-4 py-1.5 w-full text-xs bg-white border border-[var(--color-border)] rounded-md focus:border-[var(--color-accent)] focus:outline-none transition-all"
          />
        </div>
      </div>

      {/* Console Viewer */}
      <div className="bg-gray-950 text-gray-200 rounded-lg p-4 font-mono text-[12px] h-[450px] overflow-y-auto flex flex-col-reverse">
        <div className="space-y-2">
          {filteredLogs.length === 0 ? (
            <div className="text-center py-10 text-gray-500">
              No console log statements match the filter criteria.
            </div>
          ) : (
            filteredLogs.map((log, idx) => (
              <div 
                key={idx}
                className="hover:bg-white/5 py-1 px-2 rounded transition-colors flex items-start gap-3 border-b border-white/5"
              >
                <span className="text-gray-500 shrink-0 select-none">
                  [{log.timestamp}]
                </span>
                <span className={`font-bold shrink-0 select-none text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded ${
                  log.type === 'ERROR' ? 'bg-red-950/40 text-red-400' :
                  log.type === 'WARNING' ? 'bg-yellow-950/40 text-yellow-400' :
                  log.type === 'SUCCESS' ? 'bg-emerald-950/40 text-emerald-400' : 'bg-sky-950/40 text-sky-400'
                }`}>
                  {log.type}
                </span>
                <span className="text-gray-300 break-all select-text">
                  {log.message}
                </span>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
