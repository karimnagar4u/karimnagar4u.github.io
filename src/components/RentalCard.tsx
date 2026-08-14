import { RentalItem, ViewMode } from '../types';
import { MapPin, Maximize2, Building, ArrowRight, DollarSign } from 'lucide-react';

interface RentalCardProps {
  rental: RentalItem;
  viewMode: ViewMode;
  onSelect: (rental: RentalItem) => void;
}

export function RentalCard({ rental, viewMode, onSelect }: RentalCardProps) {
  if (viewMode === 'list') {
    return (
      <div
        id={`rental-list-card-${rental.id}`}
        onClick={() => onSelect(rental)}
        className="group cursor-pointer w-full bg-white dark:bg-neutral-800/80 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 sm:p-5 hover:border-neutral-900 dark:hover:border-white shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between"
      >
        <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
          {/* Thumbnail */}
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
            <img
              src={rental.photos[0]}
              alt={rental.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <span className="absolute bottom-1 right-1 bg-neutral-900/80 text-white text-[10px] font-mono px-1.5 py-0.5 rounded">
              {rental.photos.length} Photos
            </span>
          </div>

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-emerald-800 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-md border border-emerald-200 dark:border-emerald-900/40">
                <Building className="w-3 h-3" />
                {rental.propertyType}
              </span>
              <span className="inline-flex items-center gap-1 text-xs font-mono font-bold text-neutral-800 dark:text-neutral-200 bg-neutral-100 dark:bg-neutral-700/60 px-2 py-0.5 rounded">
                <Maximize2 className="w-3 h-3 text-neutral-500" />
                {rental.areaSft.toLocaleString()} SFT
              </span>
              <span className="text-xs font-bold text-neutral-900 dark:text-neutral-100 ml-auto sm:ml-0">
                {rental.price}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold font-serif text-neutral-900 dark:text-neutral-100 group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1">
              {rental.title}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-1">
              {rental.tagline}
            </p>

            <div className="flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 pt-0.5">
              <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
              <span>Location: <strong>{rental.location}</strong></span>
            </div>
          </div>
        </div>

        <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0 flex justify-end border-t sm:border-t-0 border-neutral-100 dark:border-neutral-700">
          <button
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-neutral-100 dark:bg-neutral-700 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 text-neutral-900 dark:text-white transition-all shadow-sm"
          >
            <span>View Space</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Grid view card
  return (
    <div
      id={`rental-grid-card-${rental.id}`}
      onClick={() => onSelect(rental)}
      className="group cursor-pointer flex flex-col bg-white dark:bg-neutral-800/90 rounded-2xl border border-neutral-200 dark:border-neutral-700/80 overflow-hidden hover:border-neutral-900 dark:hover:border-neutral-300 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Property Image Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <img
          src={rental.photos[0]}
          alt={rental.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-black/10" />

        {/* Top Chips */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-neutral-900/85 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            {rental.propertyType}
          </span>
          <span className="bg-emerald-600 text-white text-[11px] font-mono font-bold px-2.5 py-1 rounded-full shadow">
            {rental.areaSft.toLocaleString()} SFT
          </span>
        </div>

        {/* Price on image bottom */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
          <span className="text-sm font-black font-sans tracking-tight drop-shadow">
            {rental.price}
          </span>
          <span className="text-[11px] opacity-90 font-mono">
            {rental.photos.length} Photos
          </span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-lg font-bold font-serif text-neutral-900 dark:text-white group-hover:text-emerald-600 dark:group-hover:text-emerald-400 transition-colors line-clamp-1 leading-snug">
            {rental.title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
            {rental.tagline}
          </p>
        </div>

        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1 truncate pr-2">
            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate font-medium text-neutral-700 dark:text-neutral-300">
              {rental.location}
            </span>
          </div>
          <span className="shrink-0 font-bold text-neutral-900 dark:text-neutral-100 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-[11px]">
            Inquire <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}
