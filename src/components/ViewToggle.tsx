import { ViewMode } from '../types';
import { LayoutGrid, List } from 'lucide-react';

interface ViewToggleProps {
  viewMode: ViewMode;
  onViewModeChange: (mode: ViewMode) => void;
  idPrefix?: string;
}

export function ViewToggle({ viewMode, onViewModeChange, idPrefix = 'view' }: ViewToggleProps) {
  return (
    <div
      id={`${idPrefix}-toggle-container`}
      className="inline-flex items-center rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 p-1 shadow-sm"
      role="group"
      aria-label="View mode toggle"
    >
      <button
        id={`${idPrefix}-toggle-grid-btn`}
        type="button"
        onClick={() => onViewModeChange('grid')}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
          viewMode === 'grid'
            ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
        }`}
        title="Grid View"
      >
        <LayoutGrid className="w-4 h-4" />
        <span className="hidden sm:inline">Grid</span>
      </button>

      <button
        id={`${idPrefix}-toggle-list-btn`}
        type="button"
        onClick={() => onViewModeChange('list')}
        className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-md transition-all ${
          viewMode === 'list'
            ? 'bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 shadow-sm'
            : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-200'
        }`}
        title="List View"
      >
        <List className="w-4 h-4" />
        <span className="hidden sm:inline">List</span>
      </button>
    </div>
  );
}
