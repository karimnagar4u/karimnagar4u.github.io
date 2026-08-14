import { useState } from 'react';
import { EventItem } from '../types';
import Markdown from 'react-markdown';
import {
  Calendar,
  MapPin,
  Mail,
  Phone,
  Globe,
  Share2,
  AlertCircle,
  ArrowLeft,
  FileCode2,
  X,
  ExternalLink,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { EventCard } from './EventCard';

interface EventDetailPageProps {
  event: EventItem;
  allEvents: EventItem[];
  onSelectEvent: (event: EventItem) => void;
  onBackToEvents: () => void;
  onOpenMarkdownModal: (title: string, markdown: string) => void;
}

export function EventDetailPage({
  event,
  allEvents,
  onSelectEvent,
  onBackToEvents,
  onOpenMarkdownModal,
}: EventDetailPageProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);

  const otherEvents = allEvents
    .filter((e) => e.id !== event.id)
    .slice(0, 4);

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <article id="event-detail-page" className="max-w-6xl mx-auto space-y-10">
      {/* Back button & quick tools */}
      <div className="flex items-center justify-between">
        <button
          id="event-back-btn"
          onClick={onBackToEvents}
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Events</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            id="event-share-btn"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied Link!' : 'Share'}</span>
          </button>

          <button
            id="event-view-md-btn"
            onClick={() => onOpenMarkdownModal(event.title, event.rawMarkdown || '')}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/60 border border-amber-300 dark:border-amber-800 text-amber-900 dark:text-amber-300 hover:bg-amber-100 transition-colors"
            title="Inspect Jekyll Markdown source"
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>_events/{event.slug}.md</span>
          </button>
        </div>
      </div>

      {/* 1. Banner Image matching Wireframe */}
      <div className="relative w-full rounded-2xl overflow-hidden border-2 border-neutral-900 dark:border-neutral-700 aspect-[21/9] min-h-[260px] sm:min-h-[360px] bg-neutral-900 shadow-md">
        <img
          src={event.bannerImage}
          alt={event.title}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 rounded-full bg-neutral-900/80 text-white text-xs font-bold backdrop-blur-sm border border-white/20">
            {event.category}
          </span>
        </div>
      </div>

      {/* 2. Title & Tag Line matching Wireframe */}
      <div className="text-center space-y-2 pt-2">
        <h1 className="text-3xl sm:text-5xl font-black font-serif text-neutral-900 dark:text-white tracking-tight">
          {event.title}
        </h1>
        <p className="text-base sm:text-xl text-neutral-600 dark:text-neutral-300 font-medium max-w-3xl mx-auto">
          {event.tagline}
        </p>
      </div>

      {/* Wireframe Divider */}
      <hr className="border-neutral-300 dark:border-neutral-700" />

      {/* 3. Date & Venue strip matching Wireframe */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-300">
            <Calendar className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
              Date & Time:
            </span>
            <p className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
              {event.displayDate}
            </p>
          </div>
        </div>

        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
              Venue & Location:
            </span>
            <p className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
              {event.venue}
            </p>
            <p className="text-xs text-neutral-600 dark:text-neutral-400">
              {event.location}
            </p>
          </div>
        </div>
      </div>

      {/* 4. Description matching Wireframe */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold font-serif uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
          Description:
        </h2>
        <div className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
          <Markdown>{event.description}</Markdown>
        </div>
      </div>

      {/* 5. Photos — 3–4 arranged in a grid matching Wireframe */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-serif uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            Photos ({event.photos.length}):
          </h2>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Click any photo to enlarge
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {event.photos.map((photo, index) => (
            <div
              key={index}
              id={`event-photo-${index}`}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group cursor-pointer relative aspect-square rounded-xl overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 shadow-sm hover:scale-[1.02] transition-transform"
            >
              <img
                src={photo}
                alt={`${event.title} photo ${index + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:brightness-105 transition-all"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-xs font-bold text-white bg-black/60 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  Photo {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. Contact Info matching Wireframe */}
      <div className="space-y-3">
        <h2 className="text-lg font-bold font-serif uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
          Contact Info:
        </h2>
        <div className="bg-white dark:bg-neutral-800/80 rounded-xl p-5 border border-neutral-200 dark:border-neutral-700 flex flex-wrap gap-6 items-center">
          {event.contact.organizer && (
            <div className="text-sm">
              <span className="text-xs text-neutral-500 dark:text-neutral-400 block font-medium">Organizer</span>
              <strong className="text-neutral-900 dark:text-white">{event.contact.organizer}</strong>
            </div>
          )}
          {event.contact.phone && (
            <a
              href={`tel:${event.contact.phone}`}
              className="inline-flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-200 hover:text-amber-600 dark:hover:text-amber-400"
            >
              <Phone className="w-4 h-4 text-neutral-400" />
              <span>{event.contact.phone}</span>
            </a>
          )}
          {event.contact.email && (
            <a
              href={`mailto:${event.contact.email}`}
              className="inline-flex items-center gap-2 text-sm text-neutral-700 dark:text-neutral-200 hover:text-amber-600 dark:hover:text-amber-400"
            >
              <Mail className="w-4 h-4 text-neutral-400" />
              <span>{event.contact.email}</span>
            </a>
          )}
          {event.contact.website && (
            <a
              href={event.contact.website}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber-700 dark:text-amber-400 hover:underline ml-auto"
            >
              <Globe className="w-4 h-4" />
              <span>Official Event Page</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>
      </div>

      {/* Wireframe Divider */}
      <hr className="border-neutral-300 dark:border-neutral-700" />

      {/* 7. Disclaimer matching Wireframe */}
      <div className="space-y-2 bg-amber-50/60 dark:bg-neutral-800/50 p-5 rounded-xl border border-amber-200/80 dark:border-neutral-700">
        <div className="flex items-center gap-2 text-amber-800 dark:text-amber-400 font-bold text-sm">
          <AlertCircle className="w-4 h-4 shrink-0" />
          <span>Disclaimer:</span>
        </div>
        <p className="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 leading-relaxed pl-6">
          {event.disclaimer}
        </p>
      </div>

      {/* 8. Other Events section at the bottom (grid view) matching Wireframe */}
      <div className="space-y-5 pt-8 border-t border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center justify-between">
          <h2 className="text-2xl font-bold font-serif text-neutral-900 dark:text-white">
            Other Events:
          </h2>
          <button
            onClick={onBackToEvents}
            className="text-xs font-semibold text-neutral-600 dark:text-neutral-300 hover:underline"
          >
            View All ({allEvents.length}) →
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {otherEvents.map((otherEvent) => (
            <EventCard
              key={otherEvent.id}
              event={otherEvent}
              viewMode="grid"
              onSelect={onSelectEvent}
            />
          ))}
        </div>
      </div>

      {/* Lightbox photo modal */}
      {selectedPhotoIndex !== null && (
        <div
          id="photo-lightbox-modal"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setSelectedPhotoIndex(null)}
        >
          <button
            onClick={() => setSelectedPhotoIndex(null)}
            className="absolute top-5 right-5 text-white p-2 rounded-full bg-neutral-800/80 hover:bg-neutral-700"
            aria-label="Close Lightbox"
          >
            <X className="w-6 h-6" />
          </button>

          <div
            className="relative max-w-4xl max-h-[85vh] flex flex-col items-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={event.photos[selectedPhotoIndex]}
              alt={`Photo ${selectedPhotoIndex + 1}`}
              className="max-h-[75vh] w-auto object-contain rounded-lg border border-neutral-700 shadow-2xl"
            />
            <div className="flex items-center justify-between w-full mt-4 text-white text-sm">
              <span>
                Photo {selectedPhotoIndex + 1} of {event.photos.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setSelectedPhotoIndex((prev) =>
                      prev !== null && prev > 0 ? prev - 1 : event.photos.length - 1
                    )
                  }
                  className="p-2 rounded bg-neutral-800 hover:bg-neutral-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setSelectedPhotoIndex((prev) =>
                      prev !== null ? (prev + 1) % event.photos.length : 0
                    )
                  }
                  className="p-2 rounded bg-neutral-800 hover:bg-neutral-700"
                >
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </article>
  );
}
