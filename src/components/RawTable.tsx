import React, { useState, useRef, useEffect } from 'react';
import { Search, Plus, Trash2, ArrowUpDown, Upload, X, Check, AlertCircle, FileText } from 'lucide-react';

export interface ColumnConfig<T> {
  key: keyof T;
  label: string;
  type: 'text' | 'number' | 'select' | 'date';
  options?: string[];
  editable?: boolean;
  align?: 'left' | 'right' | 'center';
  format?: (val: any) => string;
}

interface RawTableProps<T extends { id: string }> {
  title: string;
  subtitle: string;
  columns: ColumnConfig<T>[];
  data: T[];
  onUpdate: (id: string, updatedFields: Partial<T>) => void;
  onDelete: (id: string) => void;
  onAdd: (newRecord: Omit<T, 'id'>) => void;
  onBulkAdd?: (newRecords: Omit<T, 'id'>[]) => void;
  emptyNewRecord: Omit<T, 'id'>;
}

export default function RawTable<T extends { id: string }>({
  title,
  subtitle,
  columns,
  data,
  onUpdate,
  onDelete,
  onAdd,
  onBulkAdd,
  emptyNewRecord
}: RawTableProps<T>) {
  const [searchTerm, setSearchTerm] = useState('');
  const [newRecord, setNewRecord] = useState<Omit<T, 'id'>>(emptyNewRecord);
  const [showAddRow, setShowAddRow] = useState(false);
  const [sortKey, setSortKey] = useState<keyof T | null>(null);
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  // CSV Bulk Import states
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [showImportModal, setShowImportModal] = useState(false);
  const [importedFileName, setImportedFileName] = useState('');
  const [rawCsvLines, setRawCsvLines] = useState<string[][]>([]);
  const [hasHeaders, setHasHeaders] = useState(true);
  const [columnMappings, setColumnMappings] = useState<Record<string, number>>({});
  const [importError, setImportError] = useState('');

  // Handle changes for existing records inline
  const handleCellChange = (id: string, key: keyof T, val: any, type: 'text' | 'number' | 'select' | 'date') => {
    let parsedVal = val;
    if (type === 'number') {
      parsedVal = val === '' ? 0 : parseFloat(val);
      if (isNaN(parsedVal)) parsedVal = 0;
    }
    onUpdate(id, { [key]: parsedVal } as unknown as Partial<T>);
  };

  // Handle changes for the Add Row form
  const handleNewRecordChange = (key: keyof T, val: any, type: 'text' | 'number' | 'select' | 'date') => {
    let parsedVal = val;
    if (type === 'number') {
      parsedVal = val === '' ? 0 : parseFloat(val);
      if (isNaN(parsedVal)) parsedVal = 0;
    }
    setNewRecord(prev => ({ ...prev, [key]: parsedVal }));
  };

  const handleAddSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newRecord);
    setNewRecord(emptyNewRecord);
    setShowAddRow(false);
  };

  // Toggle Sorting
  const handleSort = (key: keyof T) => {
    if (sortKey === key) {
      setSortDirection(prev => (prev === 'asc' ? 'desc' : 'asc'));
    } else {
      setSortKey(key);
      setSortDirection('asc');
    }
  };

  // Filter & Sort Data
  const filteredData = data.filter(row => {
    return Object.values(row).some(val => 
      String(val).toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedData = [...filteredData].sort((a, b) => {
    if (!sortKey) return 0;
    const valA = a[sortKey];
    const valB = b[sortKey];
    
    if (typeof valA === 'number' && typeof valB === 'number') {
      return sortDirection === 'asc' ? valA - valB : valB - valA;
    }
    
    const strA = String(valA).toLowerCase();
    const strB = String(valB).toLowerCase();
    if (strA < strB) return sortDirection === 'asc' ? -1 : 1;
    if (strA > strB) return sortDirection === 'asc' ? 1 : -1;
    return 0;
  });

  // ── CSV PARSER & IMPORTER UTILITIES ──
  const parseCSV = (text: string): string[][] => {
    const lines: string[][] = [];
    let row: string[] = [];
    let inQuotes = false;
    let currentValue = '';

    for (let i = 0; i < text.length; i++) {
      const char = text[i];
      const nextChar = text[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          currentValue += '"';
          i++; // skip next quote
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === ',' && !inQuotes) {
        row.push(currentValue.trim());
        currentValue = '';
      } else if ((char === '\r' || char === '\n') && !inQuotes) {
        if (char === '\r' && nextChar === '\n') {
          i++;
        }
        row.push(currentValue.trim());
        lines.push(row);
        row = [];
        currentValue = '';
      } else {
        currentValue += char;
      }
    }
    if (currentValue || row.length > 0) {
      row.push(currentValue.trim());
      lines.push(row);
    }
    return lines.filter(r => r.length > 0 && r.some(cell => cell !== ''));
  };

  const detectInitialMappings = (headers: string[], cols: ColumnConfig<T>[]) => {
    const initialMappings: Record<string, number> = {};
    const norm = (str: string) => str.toLowerCase().replace(/[^a-z0-9]/g, '');
    
    cols.forEach((col) => {
      if (col.key === 'id') return;
      const colKeyNorm = norm(String(col.key));
      const colLabelNorm = norm(col.label);
      
      const matchedIdx = headers.findIndex(h => {
        const hNorm = norm(h);
        return hNorm === colKeyNorm || hNorm === colLabelNorm || hNorm.includes(colKeyNorm) || colKeyNorm.includes(hNorm);
      });
      
      if (matchedIdx !== -1) {
        initialMappings[String(col.key)] = matchedIdx;
      } else {
        const nonIdCols = cols.filter(c => c.key !== 'id');
        const nonIdColIdx = nonIdCols.indexOf(col);
        if (nonIdColIdx < headers.length && nonIdColIdx >= 0) {
          initialMappings[String(col.key)] = nonIdColIdx;
        } else {
          initialMappings[String(col.key)] = 0;
        }
      }
    });
    return initialMappings;
  };

  const handleTriggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setImportedFileName(file.name);
    setImportError('');

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = parseCSV(text);
        
        if (parsed.length === 0) {
          setImportError('The selected CSV file appears to be empty or has an invalid structure.');
          setShowImportModal(true);
          return;
        }

        setRawCsvLines(parsed);
        const headers = parsed[0] || [];
        const detected = detectInitialMappings(headers, columns);
        setColumnMappings(detected);
        setHasHeaders(true);
        setShowImportModal(true);
      } catch (err: any) {
        setImportError(`Failed to parse file: ${err.message}`);
        setShowImportModal(true);
      }
    };
    reader.readAsText(file);
  };

  useEffect(() => {
    if (rawCsvLines.length === 0) return;
    
    if (hasHeaders) {
      const headers = rawCsvLines[0] || [];
      const detected = detectInitialMappings(headers, columns);
      setColumnMappings(detected);
    } else {
      const cols = columns.filter(c => c.key !== 'id');
      const newMap: Record<string, number> = {};
      cols.forEach((col, idx) => {
        newMap[String(col.key)] = idx < rawCsvLines[0].length ? idx : 0;
      });
      setColumnMappings(newMap);
    }
  }, [hasHeaders, rawCsvLines]);

  const getMappedData = () => {
    const dataLines = hasHeaders ? rawCsvLines.slice(1) : rawCsvLines;
    return dataLines.map((csvRow) => {
      const record: any = {};
      columns.forEach((col) => {
        if (col.key === 'id') return;
        
        const mappedIdx = columnMappings[String(col.key)];
        let val = (mappedIdx !== undefined && mappedIdx < csvRow.length) ? csvRow[mappedIdx] : undefined;
        
        if (val === undefined || val === '') {
          record[col.key] = (emptyNewRecord as any)[col.key];
        } else {
          if (col.type === 'number') {
            const normalized = val.replace(/[^0-9.-]/g, '');
            const parsed = parseFloat(normalized);
            record[col.key] = isNaN(parsed) ? 0 : parsed;
          } else {
            record[col.key] = val;
          }
        }
      });
      return record;
    });
  };

  const handleConfirmImport = () => {
    const mapped = getMappedData();
    if (onBulkAdd) {
      onBulkAdd(mapped);
    } else {
      mapped.forEach(row => onAdd(row));
    }
    setShowImportModal(false);
    setRawCsvLines([]);
  };

  const csvColumnsCount = rawCsvLines[0]?.length || 0;
  const dataRowsCount = hasHeaders ? Math.max(0, rawCsvLines.length - 1) : rawCsvLines.length;
  const mappedPreviewRows = getMappedData().slice(0, 3);

  return (
    <div className="card-elevated p-6 animate-fade-up">
      {/* Hidden input for CSV */}
      <input 
        type="file" 
        ref={fileInputRef} 
        onChange={handleFileChange} 
        accept=".csv" 
        className="hidden" 
      />

      {/* Header Controls */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-[var(--color-border)] gap-4">
        <div>
          <h2 className="text-xl font-heading font-medium tracking-tight text-[var(--color-primary)] uppercase">
            {title}
          </h2>
          <p className="text-xs text-[var(--color-muted)] font-sans mt-1">
            {subtitle} ({data.length} total entries)
          </p>
        </div>

        <div className="flex items-center gap-3">
          {/* Search bar */}
          <div className="relative">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-gray-400">
              <Search className="h-4 w-4" />
            </span>
            <input
              type="text"
              placeholder="Search workbook..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9 pr-4 py-1.5 w-60 text-xs bg-[var(--color-surface)] border border-[var(--color-border)] rounded-md focus:border-[var(--color-accent)] focus:outline-none transition-all"
            />
          </div>

          {/* Bulk CSV Import Button */}
          <button
            onClick={handleTriggerFileInput}
            className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-md hover:bg-black/[0.03] active:scale-95 transition-all cursor-pointer"
            title="Import raw csv sheet data in bulk"
          >
            <Upload className="h-3.5 w-3.5" />
            <span>Import CSV</span>
          </button>

          {/* Toggle Add form */}
          <button
            onClick={() => setShowAddRow(!showAddRow)}
            className="flex items-center gap-1 text-xs font-semibold px-3 py-1.5 bg-[var(--color-primary)] text-white rounded-md hover:bg-opacity-90 active:scale-95 transition-all cursor-pointer"
          >
            <Plus className="h-3.5 w-3.5" />
            <span>Add Row</span>
          </button>
        </div>
      </div>

      {/* Add New Row Form */}
      {showAddRow && (
        <form onSubmit={handleAddSubmit} className="bg-[var(--color-bg)] p-4 rounded-lg my-4 border border-[var(--color-border)] animate-fade-up">
          <h3 className="text-xs font-bold uppercase text-[var(--color-primary)] mb-3 tracking-wider">
            Insert New Record (Append to Spreadsheet)
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {columns.map(col => {
              if (col.key as string === 'id') return null;
              return (
                <div key={String(col.key)} className="flex flex-col gap-1">
                  <label className="text-[10px] uppercase font-bold text-[var(--color-muted)] tracking-wider">
                    {col.label}
                  </label>
                  {col.type === 'select' ? (
                    <select
                      value={String(newRecord[col.key] || '')}
                      onChange={(e) => handleNewRecordChange(col.key, e.target.value, 'select')}
                      className="text-xs p-1.5 border border-[var(--color-border)] rounded bg-white"
                      required
                    >
                      <option value="">-- Choose --</option>
                      {col.options?.map(opt => (
                        <option key={opt} value={opt}>{opt}</option>
                      ))}
                    </select>
                  ) : (
                    <input
                      type={col.type === 'number' ? 'number' : col.type === 'date' ? 'date' : 'text'}
                      step="any"
                      value={String(newRecord[col.key] ?? '')}
                      onChange={(e) => handleNewRecordChange(col.key, e.target.value, col.type)}
                      className="text-xs p-1.5 border border-[var(--color-border)] rounded bg-white"
                      placeholder={`Enter ${col.label.toLowerCase()}`}
                      required
                    />
                  )}
                </div>
              );
            })}
          </div>
          <div className="flex justify-end gap-2 mt-4">
            <button
              type="button"
              onClick={() => setShowAddRow(false)}
              className="text-xs font-semibold px-3 py-1.5 border border-[var(--color-border)] rounded-md hover:bg-gray-100 transition-all cursor-pointer"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="text-xs font-semibold px-4 py-1.5 bg-[var(--color-accent)] text-white rounded-md hover:bg-opacity-90 active:scale-95 transition-all cursor-pointer"
            >
              Save Record
            </button>
          </div>
        </form>
      )}

      {/* Interactive Spreadsheet Data Table */}
      <div className="overflow-x-auto mt-4 rounded-lg border border-[var(--color-border)]">
        <table className="w-full border-collapse bg-[var(--color-surface)] text-[13px]">
          <thead>
            <tr className="bg-[var(--table-header-bg)] border-b-2 border-[var(--table-header-sep)] text-[var(--color-primary)] h-[var(--row-height-header)]">
              {columns.map(col => (
                <th
                  key={String(col.key)}
                  onClick={() => handleSort(col.key)}
                  className={`px-4 py-2 uppercase font-bold text-xs tracking-[0.06em] select-none cursor-pointer hover:bg-black/5 transition-all text-${
                    col.align || 'left'
                  }`}
                >
                  <div className={`flex items-center gap-1 ${col.align === 'right' ? 'justify-end' : col.align === 'center' ? 'justify-center' : ''}`}>
                    <span>{col.label}</span>
                    <ArrowUpDown className="h-3 w-3 text-gray-400 shrink-0" />
                  </div>
                </th>
              ))}
              <th className="px-4 py-2 uppercase font-bold text-xs text-right w-16 tracking-[0.06em]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr className="h-20 text-center">
                <td colSpan={columns.length + 1} className="text-sm text-[var(--color-muted)] font-sans">
                  No matching entries found in this sheet.
                </td>
              </tr>
            ) : (
              sortedData.map((row, index) => (
                <tr
                  key={row.id}
                  className={`border-b border-[var(--color-border)] hover:bg-[rgba(5,28,44,0.01)] transition-colors ${
                    index % 2 === 0 ? 'bg-[var(--color-bg)]/20' : 'bg-white'
                  }`}
                >
                  {columns.map(col => {
                    const isEditable = col.editable !== false;
                    const value = row[col.key];

                    return (
                      <td
                        key={String(col.key)}
                        className={`px-4 py-2 whitespace-nowrap text-${col.align || 'left'} font-sans`}
                      >
                        {isEditable ? (
                          col.type === 'select' ? (
                            <select
                              value={String(value || '')}
                              onChange={(e) => handleCellChange(row.id, col.key, e.target.value, 'select')}
                              className="editable-input text-xs font-medium w-full min-w-[100px]"
                            >
                              {col.options?.map(opt => (
                                <option key={opt} value={opt}>{opt}</option>
                              ))}
                            </select>
                          ) : (
                            <input
                              type={col.type === 'number' ? 'number' : col.type === 'date' ? 'date' : 'text'}
                              step="any"
                              value={String(value ?? '')}
                              onChange={(e) => handleCellChange(row.id, col.key, e.target.value, col.type)}
                              className={`editable-input text-xs font-medium text-${col.align || 'left'} ${
                                col.type === 'number' ? 'max-w-[100px]' : 'max-w-[180px]'
                              }`}
                            />
                          )
                        ) : (
                          <span className={col.type === 'number' ? 'font-mono' : ''}>
                            {col.format ? col.format(value) : String(value ?? '-')}
                          </span>
                        )}
                      </td>
                    );
                  })}
                  <td className="px-4 py-2 text-right">
                    <button
                      onClick={() => onDelete(row.id)}
                      className="text-[var(--color-negative)] hover:bg-red-50 p-1.5 rounded-full transition-all cursor-pointer scale-100 active:scale-95"
                      title="Delete Record"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* ── INTERACTIVE BULK CSV MAPPING & PREVIEW MODAL ── */}
      {showImportModal && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/50 backdrop-blur-xs p-4 animate-fade-in">
          <div className="bg-white rounded-xl shadow-xl border border-[var(--color-border)] w-full max-w-2xl flex flex-col max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-5 border-b border-[var(--color-border)] bg-[var(--color-bg)]/20">
              <div className="flex items-center gap-2">
                <FileText className="h-5 w-5 text-[var(--color-accent)]" />
                <div>
                  <h3 className="text-sm font-bold text-[var(--color-primary)] uppercase tracking-wider">
                    CSV Batch Import Preview
                  </h3>
                  <p className="text-[11px] text-[var(--color-muted)]">
                    File: <span className="font-semibold text-[var(--color-primary)]">{importedFileName}</span>
                  </p>
                </div>
              </div>
              <button 
                onClick={() => setShowImportModal(false)}
                className="text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 p-5 overflow-y-auto space-y-5">
              {importError ? (
                <div className="bg-red-50 border border-red-200 text-red-700 p-4 rounded-lg flex items-start gap-3">
                  <AlertCircle className="h-5 w-5 shrink-0 mt-0.5" />
                  <div>
                    <h4 className="font-semibold text-xs">Import Conflict Detected</h4>
                    <p className="text-xs mt-1">{importError}</p>
                  </div>
                </div>
              ) : (
                <>
                  {/* CSV General Configurations */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between bg-[var(--color-bg)]/30 p-3 rounded-lg border border-[var(--color-border)] text-xs gap-3">
                    <div className="flex items-center gap-1.5 text-[var(--color-primary)]">
                      <Check className="h-4 w-4 text-[var(--color-positive)]" />
                      <span>Found <strong>{dataRowsCount} data rows</strong> (Total columns parsed: {csvColumnsCount})</span>
                    </div>

                    <label className="flex items-center gap-2 font-medium cursor-pointer select-none text-[var(--color-primary)]">
                      <input 
                        type="checkbox" 
                        checked={hasHeaders} 
                        onChange={(e) => setHasHeaders(e.target.checked)}
                        className="rounded border-[var(--color-border)] text-[var(--color-accent)] focus:ring-[var(--color-accent)]"
                      />
                      <span>First row contains headers</span>
                    </label>
                  </div>

                  {/* Header Column Mapping Controls */}
                  <div className="space-y-2.5">
                    <h4 className="text-[11px] uppercase font-bold text-[var(--color-primary)] tracking-wider">
                      Verify & Adjust Column Mappings
                    </h4>
                    <p className="text-[10px] text-[var(--color-muted)]">
                      We've automatically matched your CSV columns to the spreadsheet fields. Adjust any mismatched dropdown below:
                    </p>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 bg-gray-50/50 p-4 rounded-lg border border-[var(--color-border)] max-h-56 overflow-y-auto">
                      {columns.map(col => {
                        if (col.key === 'id') return null;
                        const currentMappedIdx = columnMappings[String(col.key)];
                        
                        return (
                          <div key={String(col.key)} className="flex items-center justify-between text-xs gap-2 py-1.5 border-b border-gray-100 last:border-b-0">
                            <span className="font-medium text-[var(--color-primary)] truncate max-w-[180px]">
                              {col.label} <span className="text-[10px] text-[var(--color-muted)] font-mono">({String(col.key)})</span>
                            </span>
                            <select
                              value={currentMappedIdx ?? ''}
                              onChange={(e) => setColumnMappings(prev => ({ ...prev, [String(col.key)]: parseInt(e.target.value) }))}
                              className="text-[11px] border border-[var(--color-border)] bg-white rounded-md px-2 py-1 focus:outline-none focus:border-[var(--color-accent)] min-w-[130px]"
                            >
                              {hasHeaders ? (
                                rawCsvLines[0]?.map((hdr, idx) => (
                                  <option key={idx} value={idx}>
                                    {hdr ? `"${hdr}"` : `Col ${idx + 1}`} (Col {idx + 1})
                                  </option>
                                ))
                              ) : (
                                Array.from({ length: csvColumnsCount }).map((_, idx) => (
                                  <option key={idx} value={idx}>
                                    Column {idx + 1}
                                  </option>
                                ))
                              )}
                              <option value="-1">-- Default Value --</option>
                            </select>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {/* Batch Preview Row Section */}
                  <div className="space-y-2">
                    <h4 className="text-[11px] uppercase font-bold text-[var(--color-primary)] tracking-wider">
                      Batch Preview (First 3 Rows)
                    </h4>
                    <div className="overflow-x-auto border border-[var(--color-border)] rounded-lg">
                      <table className="w-full text-left border-collapse text-[11px] bg-white">
                        <thead>
                          <tr className="bg-[var(--color-bg)] text-[var(--color-primary)] border-b border-[var(--color-border)] font-semibold">
                            {columns.map(col => {
                              if (col.key === 'id') return null;
                              return (
                                <th key={String(col.key)} className="px-3 py-1.5">
                                  {col.label}
                                </th>
                              );
                            })}
                          </tr>
                        </thead>
                        <tbody>
                          {mappedPreviewRows.map((row, rIdx) => (
                            <tr key={rIdx} className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50/50">
                              {columns.map(col => {
                                if (col.key === 'id') return null;
                                const val = row[col.key];
                                return (
                                  <td key={String(col.key)} className="px-3 py-1.5 whitespace-nowrap text-gray-700">
                                    {col.format ? col.format(val) : String(val ?? '')}
                                  </td>
                                );
                              })}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-[var(--color-border)] bg-[var(--color-bg)]/20 flex items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setShowImportModal(false)}
                className="text-xs font-semibold px-4 py-2 border border-[var(--color-border)] rounded-md hover:bg-gray-100 transition-all cursor-pointer text-gray-600 bg-white"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={!!importError || rawCsvLines.length === 0}
                onClick={handleConfirmImport}
                className="text-xs font-semibold px-5 py-2 bg-[var(--color-accent)] text-white rounded-md hover:bg-opacity-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all cursor-pointer shadow-sm"
              >
                Confirm and Append {dataRowsCount} Rows
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
