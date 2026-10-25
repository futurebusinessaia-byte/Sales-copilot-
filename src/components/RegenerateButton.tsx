import React from 'react';
import { RefreshCw, Loader2 } from 'lucide-react';

interface RegenerateButtonProps {
  onRegenerate?: () => void;
  isRegenerating?: boolean;
  label?: string;
  className?: string;
}

export const RegenerateButton: React.FC<RegenerateButtonProps> = ({
  onRegenerate,
  isRegenerating = false,
  label = 'Regenerate',
  className = '',
}) => {
  if (!onRegenerate) return null;

  return (
    <button
      type="button"
      onClick={(e) => {
        e.stopPropagation();
        onRegenerate();
      }}
      disabled={isRegenerating}
      className={`inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-blue-950/50 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 border border-slate-200 dark:border-slate-700 hover:border-blue-300 dark:hover:border-blue-800 transition disabled:opacity-60 cursor-pointer shadow-2xs ${className}`}
      title={label}
    >
      {isRegenerating ? (
        <>
          <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-600 dark:text-blue-400" />
          <span className="text-blue-600 dark:text-blue-400 font-bold">Regenerating...</span>
        </>
      ) : (
        <>
          <RefreshCw className="w-3.5 h-3.5 text-blue-500" />
          <span>{label}</span>
        </>
      )}
    </button>
  );
};
