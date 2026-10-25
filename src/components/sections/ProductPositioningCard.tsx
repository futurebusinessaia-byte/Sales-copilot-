import React from 'react';
import { ProductPositioning } from '../../types';
import { Layers, CheckCircle2, Zap } from 'lucide-react';
import { RegenerateButton } from '../RegenerateButton';

interface ProductPositioningCardProps {
  data: ProductPositioning[];
  companyName: string;
  onRegenerate?: () => void;
  isRegenerating?: boolean;
}

export const ProductPositioningCard: React.FC<ProductPositioningCardProps> = ({
  data,
  companyName,
  onRegenerate,
  isRegenerating = false,
}) => {
  return (
    <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200/80 dark:border-slate-800 p-6 sm:p-8 shadow-sm hover:shadow-md transition">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 mb-6 border-b border-slate-100 dark:border-slate-800 gap-3">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center font-bold">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Section 5
            </span>
            <h3 className="text-xl font-bold text-slate-900 dark:text-white">
              Suggested Product Positioning & Key Capabilities
            </h3>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            {data.length} Capabilities
          </span>
          {onRegenerate && (
            <RegenerateButton
              onRegenerate={onRegenerate}
              isRegenerating={isRegenerating}
              label="Regenerate Product Positioning"
            />
          )}
        </div>
      </div>

      <p className="text-sm text-slate-600 dark:text-slate-300 mb-6">
        Recommended workforce management capabilities to emphasize during discovery with {companyName}:
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.map((item, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-slate-50/70 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1.5">
                  <Zap className="w-3.5 h-3.5 text-blue-500" />
                  Capability #{idx + 1}
                </span>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  Recommended
                </span>
              </div>

              <h4 className="text-lg font-bold text-slate-900 dark:text-white mb-1">
                {item.capability}
              </h4>
              <p className="text-xs font-semibold text-blue-700 dark:text-blue-300 italic mb-3">
                "{item.tagline}"
              </p>

              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed mb-4">
                {item.description}
              </p>

              <div className="space-y-2 mb-4">
                <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                  Key Value Drivers:
                </span>
                {item.keyBenefits.map((benefit, bIdx) => (
                  <div key={bIdx} className="flex items-start space-x-2 text-xs text-slate-700 dark:text-slate-300">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Modules */}
            <div className="pt-3 border-t border-slate-200/60 dark:border-slate-700/60">
              <div className="flex flex-wrap gap-1.5">
                {item.suggestedModules.map((mod, mIdx) => (
                  <span
                    key={mIdx}
                    className="px-2 py-0.5 rounded-md bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-[10px] font-medium text-slate-600 dark:text-slate-300"
                  >
                    {mod}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
