import { Search, RotateCcw, Filter } from 'lucide-react';

export interface EventFilterState {
  search: string;
  location: string;
  time: string;
  category: string;
}

export interface RentalFilterState {
  search: string;
  location: string;
  sftRange: string;
  propertyType: string;
}

interface EventFiltersBarProps {
  filters: EventFilterState;
  onFilterChange: (filters: EventFilterState) => void;
  availableLocations: string[];
  availableCategories: string[];
  totalResults: number;
}

export function EventFiltersBar({
  filters,
  onFilterChange,
  availableLocations,
  availableCategories,
  totalResults,
}: EventFiltersBarProps) {
  const hasActiveFilters =
    filters.search !== '' ||
    filters.location !== 'all' ||
    filters.time !== 'all' ||
    filters.category !== 'all';

  const resetFilters = () => {
    onFilterChange({
      search: '',
      location: 'all',
      time: 'all',
      category: 'all',
    });
  };

  return (
    <div
      id="events-filters-bar"
      className="w-full bg-white dark:bg-neutral-800/90 rounded-xl border border-neutral-200 dark:border-neutral-700/80 p-4 shadow-sm mb-6 space-y-4"
    >
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search input */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            id="event-search-input"
            type="text"
            placeholder="Search events by title, keyword, or venue..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
          />
        </div>

        {/* Results Counter & Reset */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span>
            Showing <strong className="text-neutral-900 dark:text-neutral-100">{totalResults}</strong> events
          </span>
          {hasActiveFilters && (
            <button
              id="event-reset-filters-btn"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-700/60 rounded-md hover:bg-neutral-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* 3 Dropdown Filters matching Wireframe: Location, Time, What's New */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-neutral-100 dark:border-neutral-700/60">
        {/* Location Dropdown */}
        <div>
          <label htmlFor="event-filter-location" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
            Location
          </label>
          <select
            id="event-filter-location"
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            className="w-full px-3 py-2 text-xs font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 cursor-pointer"
          >
            <option value="all">All Locations</option>
            {availableLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Time Dropdown */}
        <div>
          <label htmlFor="event-filter-time" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
            Time
          </label>
          <select
            id="event-filter-time"
            value={filters.time}
            onChange={(e) => onFilterChange({ ...filters, time: e.target.value })}
            className="w-full px-3 py-2 text-xs font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 cursor-pointer"
          >
            <option value="all">All Dates & Times</option>
            <option value="weekend">This Weekend</option>
            <option value="this-month">This Month (September)</option>
            <option value="upcoming">Upcoming (October+)</option>
          </select>
        </div>

        {/* What's New / Category Dropdown */}
        <div>
          <label htmlFor="event-filter-category" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
            What's New & Category
          </label>
          <select
            id="event-filter-category"
            value={filters.category}
            onChange={(e) => onFilterChange({ ...filters, category: e.target.value })}
            className="w-full px-3 py-2 text-xs font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 cursor-pointer"
          >
            <option value="all">All Categories</option>
            <option value="new-only">★ What's New (Recently Added)</option>
            {availableCategories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}

interface RentalFiltersBarProps {
  filters: RentalFilterState;
  onFilterChange: (filters: RentalFilterState) => void;
  availableLocations: string[];
  availableTypes: string[];
  totalResults: number;
}

export function RentalFiltersBar({
  filters,
  onFilterChange,
  availableLocations,
  availableTypes,
  totalResults,
}: RentalFiltersBarProps) {
  const hasActiveFilters =
    filters.search !== '' ||
    filters.location !== 'all' ||
    filters.sftRange !== 'all' ||
    filters.propertyType !== 'all';

  const resetFilters = () => {
    onFilterChange({
      search: '',
      location: 'all',
      sftRange: 'all',
      propertyType: 'all',
    });
  };

  return (
    <div
      id="rentals-filters-bar"
      className="w-full bg-white dark:bg-neutral-800/90 rounded-xl border border-neutral-200 dark:border-neutral-700/80 p-4 shadow-sm mb-6 space-y-4"
    >
      <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-neutral-400" />
          <input
            id="rental-search-input"
            type="text"
            placeholder="Search spaces by name, keywords, features..."
            value={filters.search}
            onChange={(e) => onFilterChange({ ...filters, search: e.target.value })}
            className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
          />
        </div>

        {/* Counter & Reset */}
        <div className="flex items-center justify-between md:justify-end gap-3 text-xs text-neutral-500 dark:text-neutral-400">
          <span>
            Showing <strong className="text-neutral-900 dark:text-neutral-100">{totalResults}</strong> listings
          </span>
          {hasActiveFilters && (
            <button
              id="rental-reset-filters-btn"
              onClick={resetFilters}
              className="inline-flex items-center gap-1 px-2.5 py-1 text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white bg-neutral-100 dark:bg-neutral-700/60 rounded-md hover:bg-neutral-200 transition-colors"
            >
              <RotateCcw className="w-3 h-3" />
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* 3 Dropdown Filters matching Wireframe: Location, Square Footage (SFT), Commercial or Real Estate Type */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-neutral-100 dark:border-neutral-700/60">
        {/* Location */}
        <div>
          <label htmlFor="rental-filter-location" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
            Location
          </label>
          <select
            id="rental-filter-location"
            value={filters.location}
            onChange={(e) => onFilterChange({ ...filters, location: e.target.value })}
            className="w-full px-3 py-2 text-xs font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 cursor-pointer"
          >
            <option value="all">All Locations</option>
            {availableLocations.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>

        {/* Square footage (SFT) */}
        <div>
          <label htmlFor="rental-filter-sft" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
            Square Footage (SFT)
          </label>
          <select
            id="rental-filter-sft"
            value={filters.sftRange}
            onChange={(e) => onFilterChange({ ...filters, sftRange: e.target.value })}
            className="w-full px-3 py-2 text-xs font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 cursor-pointer"
          >
            <option value="all">All Square Footage</option>
            <option value="under-1500">Under 1,500 SFT</option>
            <option value="1500-3000">1,500 - 3,000 SFT</option>
            <option value="3000-5000">3,000 - 5,000 SFT</option>
            <option value="5000-plus">5,000+ SFT</option>
          </select>
        </div>

        {/* Commercial or Real Estate type */}
        <div>
          <label htmlFor="rental-filter-type" className="block text-[11px] font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-1">
            Commercial / Real Estate Type
          </label>
          <select
            id="rental-filter-type"
            value={filters.propertyType}
            onChange={(e) => onFilterChange({ ...filters, propertyType: e.target.value })}
            className="w-full px-3 py-2 text-xs font-medium rounded-lg border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100 cursor-pointer"
          >
            <option value="all">All Property Types</option>
            {availableTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
}
