import React from 'react';
import { DocumentStatus } from '../types';
import { Clock, CheckCircle2, AlertTriangle, FileText, CheckCheck, Printer, Archive } from 'lucide-react';

interface DocumentStatusBadgeProps {
  status: DocumentStatus;
  size?: 'sm' | 'md' | 'lg';
}

export const DocumentStatusBadge: React.FC<DocumentStatusBadgeProps> = ({ status, size = 'sm' }) => {
  const getStyle = () => {
    switch (status) {
      case 'Draft':
        return {
          bg: 'bg-slate-100 text-slate-700 border-slate-300',
          icon: <FileText className="w-3 h-3 text-slate-500" />,
        };
      case 'Under Review':
        return {
          bg: 'bg-amber-100 text-amber-800 border-amber-300',
          icon: <Clock className="w-3 h-3 text-amber-600" />,
        };
      case 'Correction Required':
        return {
          bg: 'bg-rose-100 text-rose-800 border-rose-300',
          icon: <AlertTriangle className="w-3 h-3 text-rose-600" />,
        };
      case 'Final':
        return {
          bg: 'bg-blue-100 text-blue-800 border-blue-300',
          icon: <CheckCircle2 className="w-3 h-3 text-blue-600" />,
        };
      case 'Approved':
        return {
          bg: 'bg-emerald-100 text-emerald-800 border-emerald-300',
          icon: <CheckCheck className="w-3 h-3 text-emerald-600" />,
        };
      case 'Printed':
        return {
          bg: 'bg-indigo-100 text-indigo-800 border-indigo-300',
          icon: <Printer className="w-3 h-3 text-indigo-600" />,
        };
      case 'Archived':
        return {
          bg: 'bg-neutral-100 text-neutral-600 border-neutral-300',
          icon: <Archive className="w-3 h-3 text-neutral-500" />,
        };
      default:
        return {
          bg: 'bg-neutral-100 text-neutral-700 border-neutral-300',
          icon: <FileText className="w-3 h-3" />,
        };
    }
  };

  const { bg, icon } = getStyle();
  const textSize = size === 'sm' ? 'text-[11px] px-2 py-0.5' : size === 'lg' ? 'text-xs px-3 py-1 font-bold' : 'text-xs px-2.5 py-0.5';

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-mono font-semibold border ${bg} ${textSize}`}
    >
      {icon}
      <span>{status}</span>
    </span>
  );
};
