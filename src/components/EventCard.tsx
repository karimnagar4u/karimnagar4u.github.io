import { EventItem, ViewMode } from '../types';
import { Calendar, MapPin, ArrowRight, Tag, Clock } from 'lucide-react';

interface EventCardProps {
  event: EventItem;
  viewMode: ViewMode;
  onSelect: (event: EventItem) => void;
}

export function EventCard({ event, viewMode, onSelect }: EventCardProps) {
  if (viewMode === 'list') {
    return (
      <div
        id={`event-list-card-${event.id}`}
        onClick={() => onSelect(event)}
        className="group cursor-pointer w-full bg-white dark:bg-neutral-800/80 rounded-xl border border-neutral-200 dark:border-neutral-700 p-4 sm:p-5 hover:border-neutral-900 dark:hover:border-white shadow-sm hover:shadow-md transition-all flex flex-col sm:flex-row gap-4 sm:gap-6 items-start sm:items-center justify-between"
      >
        {/* Left: Thumbnail & details */}
        <div className="flex items-start sm:items-center gap-4 w-full sm:w-auto">
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-lg overflow-hidden shrink-0 bg-neutral-100 dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-700">
            <img
              src={event.bannerImage || event.photos[0]}
              alt={event.title}
              referrerPolicy="no-referrer"
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
            {event.isNew && (
              <span className="absolute top-1 left-1 bg-amber-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded tracking-wide">
                NEW
              </span>
            )}
          </div>

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/50 px-2 py-0.5 rounded-md border border-amber-200 dark:border-amber-900/40">
                <Tag className="w-3 h-3" />
                {event.category}
              </span>
              <span className="inline-flex items-center gap-1 text-xs text-neutral-500 dark:text-neutral-400 font-mono">
                <Clock className="w-3 h-3" />
                {event.date}
              </span>
            </div>

            <h3 className="text-base sm:text-lg font-bold font-serif text-neutral-900 dark:text-neutral-100 group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1">
              {event.title}
            </h3>

            <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-1">
              {event.tagline}
            </p>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-neutral-500 dark:text-neutral-400 pt-1">
              <span className="flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-neutral-400" />
                <span className="font-medium text-neutral-700 dark:text-neutral-300">{event.displayDate}</span>
              </span>
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-neutral-400" />
                <span>{event.venue}, <strong>{event.location}</strong></span>
              </span>
            </div>
          </div>
        </div>

        {/* Right: Action button */}
        <div className="shrink-0 w-full sm:w-auto pt-2 sm:pt-0 flex justify-end border-t sm:border-t-0 border-neutral-100 dark:border-neutral-700">
          <button
            type="button"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-neutral-100 dark:bg-neutral-700 group-hover:bg-neutral-900 group-hover:text-white dark:group-hover:bg-white dark:group-hover:text-neutral-900 text-neutral-900 dark:text-white transition-all shadow-sm"
          >
            <span>View Event</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    );
  }

  // Grid view card
  return (
    <div
      id={`event-grid-card-${event.id}`}
      onClick={() => onSelect(event)}
      className="group cursor-pointer flex flex-col bg-white dark:bg-neutral-800/90 rounded-2xl border border-neutral-200 dark:border-neutral-700/80 overflow-hidden hover:border-neutral-900 dark:hover:border-neutral-300 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
    >
      {/* Photo Container */}
      <div className="relative aspect-[16/10] w-full overflow-hidden bg-neutral-100 dark:bg-neutral-900">
        <img
          src={event.bannerImage || event.photos[0]}
          alt={event.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

        {/* Badges on Top */}
        <div className="absolute top-3 left-3 right-3 flex items-center justify-between">
          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-white bg-neutral-900/80 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/20">
            {event.category}
          </span>
          {event.isNew && (
            <span className="bg-amber-500 text-white text-[11px] font-bold px-2 py-0.5 rounded-full shadow">
              NEW
            </span>
          )}
        </div>

        {/* Date on Bottom overlay */}
        <div className="absolute bottom-2.5 left-3 right-3 flex items-center gap-1.5 text-xs font-semibold text-white">
          <Calendar className="w-3.5 h-3.5 text-amber-300 shrink-0" />
          <span className="truncate">{event.displayDate}</span>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex-1 flex flex-col justify-between space-y-3">
        <div>
          <h3 className="text-lg font-bold font-serif text-neutral-900 dark:text-white group-hover:text-amber-600 dark:group-hover:text-amber-400 transition-colors line-clamp-1 leading-snug">
            {event.title}
          </h3>
          <p className="mt-1 text-xs sm:text-sm text-neutral-600 dark:text-neutral-300 line-clamp-2">
            {event.tagline}
          </p>
        </div>

        <div className="pt-2 border-t border-neutral-100 dark:border-neutral-700/60 flex items-center justify-between text-xs text-neutral-500 dark:text-neutral-400">
          <div className="flex items-center gap-1 truncate pr-2">
            <MapPin className="w-3.5 h-3.5 text-neutral-400 shrink-0" />
            <span className="truncate font-medium text-neutral-700 dark:text-neutral-300">
              {event.location} • {event.venue}
            </span>
          </div>
          <span className="shrink-0 font-bold text-neutral-900 dark:text-neutral-100 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1 text-[11px]">
            Details <ArrowRight className="w-3 h-3" />
          </span>
        </div>
      </div>
    </div>
  );
}
