import { useState } from 'react';
import { RentalItem } from '../types';
import Markdown from 'react-markdown';
import {
  MapPin,
  Maximize2,
  Mail,
  Phone,
  Building,
  Share2,
  ArrowLeft,
  FileCode2,
  X,
  CheckCircle2,
  Send,
  CalendarCheck,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
} from 'lucide-react';

interface RentalDetailPageProps {
  rental: RentalItem;
  onBackToRentals: () => void;
  onOpenMarkdownModal: (title: string, markdown: string) => void;
}

export function RentalDetailPage({
  rental,
  onBackToRentals,
  onOpenMarkdownModal,
}: RentalDetailPageProps) {
  const [selectedPhotoIndex, setSelectedPhotoIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryForm, setInquiryForm] = useState({
    name: '',
    email: '',
    phone: '',
    intendedUse: '',
    moveInDate: '',
    message: '',
  });

  const handleShare = () => {
    navigator.clipboard?.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleInquirySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setInquirySubmitted(true);
    setTimeout(() => {
      setInquirySubmitted(false);
      setInquiryForm({
        name: '',
        email: '',
        phone: '',
        intendedUse: '',
        moveInDate: '',
        message: '',
      });
    }, 4000);
  };

  return (
    <article id="rental-detail-page" className="max-w-6xl mx-auto space-y-10">
      {/* Back button & markdown inspection */}
      <div className="flex items-center justify-between">
        <button
          id="rental-back-btn"
          onClick={onBackToRentals}
          className="inline-flex items-center gap-2 text-sm font-semibold text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white px-3 py-1.5 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Rent / Lease Listings</span>
        </button>

        <div className="flex items-center gap-2">
          <button
            id="rental-share-btn"
            onClick={handleShare}
            className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-lg border border-neutral-300 dark:border-neutral-700 hover:bg-neutral-50 dark:hover:bg-neutral-800 text-neutral-700 dark:text-neutral-300"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Copied Link!' : 'Share'}</span>
          </button>

          <button
            id="rental-view-md-btn"
            onClick={() => onOpenMarkdownModal(rental.title, rental.rawMarkdown || '')}
            className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 text-emerald-900 dark:text-emerald-300 hover:bg-emerald-100 transition-colors"
            title="Inspect Jekyll Markdown source"
          >
            <FileCode2 className="w-3.5 h-3.5" />
            <span>_rentals/{rental.slug}.md</span>
          </button>
        </div>
      </div>

      {/* 1. Title & Tag Line matching Wireframe 6 */}
      <div className="space-y-3">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-flex items-center gap-1 px-3 py-1 rounded-md text-xs font-bold bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900">
            <Building className="w-3.5 h-3.5" />
            {rental.propertyType}
          </span>
          <span className="text-xs font-mono font-bold bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 px-2.5 py-1 rounded border border-neutral-200 dark:border-neutral-700">
            {rental.price}
          </span>
        </div>

        <h1 className="text-3xl sm:text-5xl font-black font-serif text-neutral-900 dark:text-white tracking-tight">
          {rental.title}
        </h1>

        <p className="text-base sm:text-xl text-neutral-600 dark:text-neutral-300 font-medium">
          {rental.tagline}
        </p>
      </div>

      {/* 2. Location, Area, Contact Specifications matching Wireframe 6 */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 bg-neutral-50 dark:bg-neutral-800/60 rounded-xl p-6 border border-neutral-200 dark:border-neutral-700">
        {/* Location */}
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 shadow-sm">
            <MapPin className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
              Location:
            </span>
            <p className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
              {rental.location}
            </p>
          </div>
        </div>

        {/* Area */}
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 shadow-sm">
            <Maximize2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
              Area (SFT):
            </span>
            <p className="text-base font-bold text-neutral-900 dark:text-white mt-0.5">
              {rental.areaSft.toLocaleString()} Square Feet
            </p>
          </div>
        </div>

        {/* Contact */}
        <div className="flex items-start gap-3">
          <div className="p-2.5 rounded-lg bg-white dark:bg-neutral-700 text-neutral-800 dark:text-neutral-200 shadow-sm">
            <Phone className="w-5 h-5 text-emerald-600 dark:text-emerald-400" />
          </div>
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 block">
              Direct Contact:
            </span>
            <p className="text-xs font-bold text-neutral-900 dark:text-white mt-0.5">
              {rental.contact.agentName || 'Leasing Desk'}
            </p>
            {rental.contact.phone && (
              <p className="text-xs text-neutral-600 dark:text-neutral-400 font-mono">
                {rental.contact.phone}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* 3. Pictures section (4 in grid) matching Wireframe 6 */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold font-serif uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
            Pictures:
          </h2>
          <span className="text-xs text-neutral-500 dark:text-neutral-400">
            Click any picture for high-res preview
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {rental.photos.map((photo, index) => (
            <div
              key={index}
              id={`rental-photo-${index}`}
              onClick={() => setSelectedPhotoIndex(index)}
              className="group cursor-pointer relative aspect-square rounded-xl overflow-hidden border border-neutral-300 dark:border-neutral-700 bg-neutral-100 dark:bg-neutral-800 shadow-sm hover:scale-[1.02] transition-transform"
            >
              <img
                src={photo}
                alt={`${rental.title} photo ${index + 1}`}
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover group-hover:brightness-105 transition-all"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                <span className="text-xs font-bold text-white bg-black/60 px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  View Photo {index + 1}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Description & Features */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold font-serif uppercase tracking-wider text-neutral-900 dark:text-neutral-100">
          Property Description:
        </h2>
        <div className="prose dark:prose-invert max-w-none text-neutral-700 dark:text-neutral-300 text-sm sm:text-base leading-relaxed">
          <Markdown>{rental.description}</Markdown>
        </div>

        {rental.features && rental.features.length > 0 && (
          <div className="pt-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-2">
              Key Features & Inclusions:
            </h3>
            <div className="flex flex-wrap gap-2">
              {rental.features.map((feature, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-xs font-semibold bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                  {feature}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Wireframe Divider */}
      <hr className="border-neutral-300 dark:border-neutral-700" />

      {/* 4. "List Yours / Inquire" Form Container matching Wireframe 6 */}
      <div id="rental-inquiry-section" className="space-y-4">
        <div>
          <h2 className="text-2xl font-bold font-serif text-neutral-900 dark:text-white">
            Inquire About This Space / Schedule a Tour
          </h2>
          <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
            Send an inquiry directly to the leasing representative or request a private walkthrough.
          </p>
        </div>

        <div className="bg-white dark:bg-neutral-800/90 rounded-2xl border-2 border-neutral-900 dark:border-neutral-700 p-6 sm:p-8 shadow-sm">
          {inquirySubmitted ? (
            <div className="p-8 text-center space-y-3 bg-emerald-50 dark:bg-emerald-950/40 rounded-xl border border-emerald-200 dark:border-emerald-800">
              <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
              <h3 className="text-lg font-bold text-neutral-900 dark:text-white">
                Inquiry Transmitted Successfully!
              </h3>
              <p className="text-sm text-neutral-600 dark:text-neutral-300 max-w-md mx-auto">
                The leasing agent has received your request and will reach out to you via email/phone shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    Your Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Alex Morgan"
                    value={inquiryForm.name}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="alex@company.com"
                    value={inquiryForm.email}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={inquiryForm.phone}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, phone: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                    Target Move-In Date
                  </label>
                  <input
                    type="date"
                    value={inquiryForm.moveInDate}
                    onChange={(e) => setInquiryForm({ ...inquiryForm, moveInDate: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-neutral-700 dark:text-neutral-300 uppercase tracking-wider mb-1">
                  Message or Scheduling Preference
                </label>
                <textarea
                  rows={3}
                  placeholder="Tell us about your business or space requirements..."
                  value={inquiryForm.message}
                  onChange={(e) => setInquiryForm({ ...inquiryForm, message: e.target.value })}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:outline-none focus:ring-2 focus:ring-neutral-900 dark:focus:ring-neutral-100"
                />
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-neutral-500 dark:text-neutral-400">
                  <CalendarCheck className="w-4 h-4 text-emerald-600" />
                  <span>Free inspection & no commitment required</span>
                </div>

                <button
                  type="submit"
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold text-sm shadow hover:opacity-90 transition-opacity"
                >
                  <Send className="w-4 h-4" />
                  <span>Submit Inquiry</span>
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* Lightbox modal */}
      {selectedPhotoIndex !== null && (
        <div
          id="rental-lightbox-modal"
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
              src={rental.photos[selectedPhotoIndex]}
              alt={`Photo ${selectedPhotoIndex + 1}`}
              className="max-h-[75vh] w-auto object-contain rounded-lg border border-neutral-700 shadow-2xl"
            />
            <div className="flex items-center justify-between w-full mt-4 text-white text-sm">
              <span>
                Picture {selectedPhotoIndex + 1} of {rental.photos.length}
              </span>
              <div className="flex gap-2">
                <button
                  onClick={() =>
                    setSelectedPhotoIndex((prev) =>
                      prev !== null && prev > 0 ? prev - 1 : rental.photos.length - 1
                    )
                  }
                  className="p-2 rounded bg-neutral-800 hover:bg-neutral-700"
                >
                  <ChevronLeft className="w-4 h-4" />
                </button>
                <button
                  onClick={() =>
                    setSelectedPhotoIndex((prev) =>
                      prev !== null ? (prev + 1) % rental.photos.length : 0
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
