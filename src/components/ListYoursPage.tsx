import { useState } from 'react';
import { EventItem, RentalItem } from '../types';
import { generateEventMarkdown, generateRentalMarkdown } from '../data/initialData';
import {
  Sparkles,
  Calendar,
  Building2,
  FileCode2,
  CheckCircle2,
  ExternalLink,
  Copy,
  Download,
  Plus,
  Trash2,
  Info,
} from 'lucide-react';

interface ListYoursPageProps {
  onAddEvent: (newEvent: EventItem) => void;
  onAddRental: (newRental: RentalItem) => void;
  onNavigateToEvent: (event: EventItem) => void;
  onNavigateToRental: (rental: RentalItem) => void;
}

export function ListYoursPage({
  onAddEvent,
  onAddRental,
  onNavigateToEvent,
  onNavigateToRental,
}: ListYoursPageProps) {
  const [submissionType, setSubmissionType] = useState<'event' | 'rental'>('event');
  const [googleFormUrl] = useState('https://forms.google.com');
  const [copiedMd, setCopiedMd] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState<string | null>(null);

  // Event Form State
  const [eventForm, setEventForm] = useState({
    title: '',
    tagline: '',
    date: new Date().toISOString().split('T')[0],
    timeStr: '7:00 PM - 10:00 PM',
    venue: '',
    location: 'Downtown',
    category: 'Music & Concerts',
    bannerImage: 'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1200&q=80',
    photos: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    ],
    organizer: '',
    phone: '',
    email: '',
    website: '',
    disclaimer: 'Admission subject to venue rules. All sales are final.',
    description: `### About This Event
Experience a curated gathering featuring local performers, artisans, and community connections.

- **Complimentary welcome beverage upon arrival**
- **Networking & open lounge area**`,
  });

  // Rental Form State
  const [rentalForm, setRentalForm] = useState({
    title: '',
    tagline: '',
    location: 'Downtown',
    areaSft: 2000,
    propertyType: 'Commercial' as RentalItem['propertyType'],
    price: '$5,500 / month',
    photos: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    ],
    agentName: '',
    phone: '',
    email: '',
    features: ['High-Speed Internet', '24/7 Security Access', 'HVAC Climate Control'],
    description: `### Property Overview
High-specification commercial property with versatile zoning. Features generous ceiling height, natural illumination, and premium modern fixtures.`,
  });

  // Compute live markdown preview
  const liveSlug = (submissionType === 'event' ? eventForm.title : rentalForm.title)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '') || 'new-listing';

  const mockLiveEvent: EventItem = {
    id: `custom-event-${Date.now()}`,
    slug: liveSlug,
    title: eventForm.title || 'Untitled Event',
    tagline: eventForm.tagline || 'Event Tagline goes here',
    date: eventForm.date,
    displayDate: `${eventForm.date} • ${eventForm.timeStr}`,
    venue: eventForm.venue || 'Civic Center',
    location: eventForm.location,
    category: eventForm.category,
    bannerImage: eventForm.bannerImage,
    photos: eventForm.photos.filter((p) => p.trim() !== ''),
    contact: {
      organizer: eventForm.organizer,
      phone: eventForm.phone,
      email: eventForm.email,
      website: eventForm.website,
    },
    disclaimer: eventForm.disclaimer,
    description: eventForm.description,
  };

  const mockLiveRental: RentalItem = {
    id: `custom-rental-${Date.now()}`,
    slug: liveSlug,
    title: rentalForm.title || 'Untitled Property Space',
    tagline: rentalForm.tagline || 'Property Tagline goes here',
    location: rentalForm.location,
    areaSft: Number(rentalForm.areaSft) || 1000,
    propertyType: rentalForm.propertyType,
    price: rentalForm.price || '$3,000 / month',
    photos: rentalForm.photos.filter((p) => p.trim() !== ''),
    contact: {
      agentName: rentalForm.agentName,
      phone: rentalForm.phone,
      email: rentalForm.email,
    },
    features: rentalForm.features,
    description: rentalForm.description,
  };

  const currentMarkdown =
    submissionType === 'event'
      ? generateEventMarkdown(mockLiveEvent)
      : generateRentalMarkdown(mockLiveRental);

  const handleCopyMarkdown = () => {
    navigator.clipboard?.writeText(currentMarkdown);
    setCopiedMd(true);
    setTimeout(() => setCopiedMd(false), 2000);
  };

  const handleDownloadMarkdown = () => {
    const filename =
      submissionType === 'event'
        ? `_events/${eventForm.date}-${liveSlug}.md`
        : `_rentals/${liveSlug}.md`;
    const element = document.createElement('a');
    const file = new Blob([currentMarkdown], { type: 'text/markdown' });
    element.href = URL.createObjectURL(file);
    element.download = filename.replace(/^.*\//, '');
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (submissionType === 'event') {
      if (!eventForm.title) return;
      const newEv: EventItem = {
        ...mockLiveEvent,
        rawMarkdown: currentMarkdown,
        isNew: true,
      };
      onAddEvent(newEv);
      setSubmittedSuccess(`Event "${newEv.title}" was published!`);
      setTimeout(() => {
        onNavigateToEvent(newEv);
      }, 1200);
    } else {
      if (!rentalForm.title) return;
      const newRent: RentalItem = {
        ...mockLiveRental,
        rawMarkdown: currentMarkdown,
      };
      onAddRental(newRent);
      setSubmittedSuccess(`Listing "${newRent.title}" was published!`);
      setTimeout(() => {
        onNavigateToRental(newRent);
      }, 1200);
    }
  };

  return (
    <div id="list-yours-page" className="max-w-5xl mx-auto space-y-8">
      {/* Header info */}
      <div className="text-center space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 text-xs font-bold uppercase tracking-wider mb-2">
          <Sparkles className="w-3.5 h-3.5" />
          <span>Publish & Contribute</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-serif text-neutral-900 dark:text-white">
          List Yours
        </h1>
        <p className="text-sm sm:text-base text-neutral-600 dark:text-neutral-400 max-w-2xl mx-auto">
          Submit your Event or Commercial/Real Estate space to the directory. This form generates a GitHub Pages Jekyll <code className="text-xs bg-neutral-100 dark:bg-neutral-800 px-1 py-0.5 rounded font-mono">.md</code> file automatically.
        </p>
      </div>

      {/* Google Form integration notification box as requested */}
      <div
        id="google-form-banner"
        className="bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-xl p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
      >
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300">
            <Info className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-neutral-900 dark:text-neutral-100">
              External Google Form Submission Option
            </h2>
            <p className="text-xs text-neutral-600 dark:text-neutral-300 mt-0.5">
              Prefer filling out via Google Forms? You can submit responses directly through our questionnaire.
            </p>
          </div>
        </div>
        <a
          id="google-form-external-link"
          href={googleFormUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition-colors shrink-0"
        >
          <span>Open Google Form</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>

      {/* Selector: Event vs Rent/Lease */}
      <div className="flex justify-center">
        <div className="inline-flex p-1 rounded-xl bg-neutral-100 dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700">
          <button
            id="tab-submit-event"
            type="button"
            onClick={() => setSubmissionType('event')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              submissionType === 'event'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Calendar className="w-4 h-4" />
            <span>List an Event</span>
          </button>

          <button
            id="tab-submit-rental"
            type="button"
            onClick={() => setSubmissionType('rental')}
            className={`flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold transition-all ${
              submissionType === 'rental'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-sm'
                : 'text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white'
            }`}
          >
            <Building2 className="w-4 h-4" />
            <span>List a Rent / Lease Space</span>
          </button>
        </div>
      </div>

      {/* Submission Success Alert */}
      {submittedSuccess && (
        <div className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-xl flex items-center gap-3 text-emerald-800 dark:text-emerald-200 text-sm font-medium">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>{submittedSuccess} Redirecting to detail view...</span>
        </div>
      )}

      {/* Main Form Box matching Wireframe 4 "Form" */}
      <div className="bg-white dark:bg-neutral-800/90 rounded-2xl border-2 border-neutral-900 dark:border-neutral-700 p-6 sm:p-10 shadow-sm">
        <form onSubmit={handleSubmit} className="space-y-6">
          {submissionType === 'event' ? (
            /* EVENT FORM FIELDS */
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Event Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Waterfront Autumn Jazz & Food Showcase"
                    value={eventForm.title}
                    onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Short Tagline *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. A celebration of live music, culinary pairings, and waterfront views."
                    value={eventForm.tagline}
                    onChange={(e) => setEventForm({ ...eventForm, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Date *
                  </label>
                  <input
                    type="date"
                    required
                    value={eventForm.date}
                    onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Time String
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. 6:00 PM - 10:30 PM"
                    value={eventForm.timeStr}
                    onChange={(e) => setEventForm({ ...eventForm, timeStr: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Venue Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Civic Auditorium, Pier 4"
                    value={eventForm.venue}
                    onChange={(e) => setEventForm({ ...eventForm, venue: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Location / Neighborhood *
                  </label>
                  <select
                    value={eventForm.location}
                    onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none cursor-pointer"
                  >
                    <option value="Downtown">Downtown</option>
                    <option value="Harbor Bay">Harbor Bay</option>
                    <option value="Arts Quarter">Arts Quarter</option>
                    <option value="Innovation Hub">Innovation Hub</option>
                    <option value="West End">West End</option>
                    <option value="North District">North District</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Category *
                  </label>
                  <select
                    value={eventForm.category}
                    onChange={(e) => setEventForm({ ...eventForm, category: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none cursor-pointer"
                  >
                    <option value="Music & Concerts">Music & Concerts</option>
                    <option value="Tech & Startup">Tech & Startup</option>
                    <option value="Art & Culture">Art & Culture</option>
                    <option value="Food & Drink">Food & Drink</option>
                    <option value="Community & Wellness">Community & Wellness</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Banner Photo URL
                  </label>
                  <input
                    type="url"
                    value={eventForm.bannerImage}
                    onChange={(e) => setEventForm({ ...eventForm, bannerImage: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Photo URLs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    Gallery Photos (3–4 Photos)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setEventForm({
                        ...eventForm,
                        photos: [...eventForm.photos, 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80'],
                      })
                    }
                    className="text-xs text-amber-600 dark:text-amber-400 font-semibold inline-flex items-center gap-1 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Photo
                  </button>
                </div>
                <div className="space-y-2">
                  {eventForm.photos.map((photoUrl, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="url"
                        value={photoUrl}
                        onChange={(e) => {
                          const updated = [...eventForm.photos];
                          updated[idx] = e.target.value;
                          setEventForm({ ...eventForm, photos: updated });
                        }}
                        className="flex-1 px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-mono"
                        placeholder={`Photo URL #${idx + 1}`}
                      />
                      {eventForm.photos.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = eventForm.photos.filter((_, i) => i !== idx);
                            setEventForm({ ...eventForm, photos: updated });
                          }}
                          className="p-2 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description Markdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Detailed Event Description (Markdown Supported)
                </label>
                <textarea
                  rows={5}
                  value={eventForm.description}
                  onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm font-mono focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none"
                />
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-neutral-100 dark:border-neutral-700">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    Organizer Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. City Arts Guild"
                    value={eventForm.organizer}
                    onChange={(e) => setEventForm({ ...eventForm, organizer: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={eventForm.phone}
                    onChange={(e) => setEventForm({ ...eventForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    placeholder="contact@organizer.org"
                    value={eventForm.email}
                    onChange={(e) => setEventForm({ ...eventForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
              </div>

              {/* Disclaimer */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                  Disclaimer Text
                </label>
                <input
                  type="text"
                  value={eventForm.disclaimer}
                  onChange={(e) => setEventForm({ ...eventForm, disclaimer: e.target.value })}
                  className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                />
              </div>
            </>
          ) : (
            /* RENT / LEASE FORM FIELDS */
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Property Title *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Modern High-Clearance Creative Tech Headquarters"
                    value={rentalForm.title}
                    onChange={(e) => setRentalForm({ ...rentalForm, title: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>

                <div className="sm:col-span-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Short Tagline *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sunlit corner building with private boardroom and elevator access."
                    value={rentalForm.tagline}
                    onChange={(e) => setRentalForm({ ...rentalForm, tagline: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Location / District *
                  </label>
                  <select
                    value={rentalForm.location}
                    onChange={(e) => setRentalForm({ ...rentalForm, location: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none cursor-pointer"
                  >
                    <option value="Downtown">Downtown</option>
                    <option value="Harbor Bay">Harbor Bay</option>
                    <option value="Arts Quarter">Arts Quarter</option>
                    <option value="Innovation Hub">Innovation Hub</option>
                    <option value="West End">West End</option>
                    <option value="North District">North District</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Square Footage (SFT) *
                  </label>
                  <input
                    type="number"
                    required
                    min={100}
                    max={100000}
                    value={rentalForm.areaSft}
                    onChange={(e) => setRentalForm({ ...rentalForm, areaSft: Number(e.target.value) })}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Property Type *
                  </label>
                  <select
                    value={rentalForm.propertyType}
                    onChange={(e) =>
                      setRentalForm({
                        ...rentalForm,
                        propertyType: e.target.value as RentalItem['propertyType'],
                      })
                    }
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none cursor-pointer"
                  >
                    <option value="Commercial">Commercial</option>
                    <option value="Office">Office Space</option>
                    <option value="Retail">Retail Storefront</option>
                    <option value="Creative Studio">Creative Studio</option>
                    <option value="Industrial">Industrial & Logistics</option>
                    <option value="Residential">Residential Loft</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                    Price / Lease Terms *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. $8,500 / month (Triple Net)"
                    value={rentalForm.price}
                    onChange={(e) => setRentalForm({ ...rentalForm, price: e.target.value })}
                    className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none"
                  />
                </div>
              </div>

              {/* Photo URLs */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300">
                    Property Photos (3–4 Pictures)
                  </label>
                  <button
                    type="button"
                    onClick={() =>
                      setRentalForm({
                        ...rentalForm,
                        photos: [...rentalForm.photos, 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80'],
                      })
                    }
                    className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold inline-flex items-center gap-1 hover:underline"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    Add Picture
                  </button>
                </div>
                <div className="space-y-2">
                  {rentalForm.photos.map((photoUrl, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="url"
                        value={photoUrl}
                        onChange={(e) => {
                          const updated = [...rentalForm.photos];
                          updated[idx] = e.target.value;
                          setRentalForm({ ...rentalForm, photos: updated });
                        }}
                        className="flex-1 px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 font-mono"
                        placeholder={`Photo URL #${idx + 1}`}
                      />
                      {rentalForm.photos.length > 1 && (
                        <button
                          type="button"
                          onClick={() => {
                            const updated = rentalForm.photos.filter((_, i) => i !== idx);
                            setRentalForm({ ...rentalForm, photos: updated });
                          }}
                          className="p-2 text-neutral-400 hover:text-red-500 rounded-lg hover:bg-neutral-100 dark:hover:bg-neutral-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* Description Markdown */}
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1.5">
                  Detailed Property Description (Markdown Supported)
                </label>
                <textarea
                  rows={5}
                  value={rentalForm.description}
                  onChange={(e) => setRentalForm({ ...rentalForm, description: e.target.value })}
                  className="w-full px-4 py-2.5 rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100 text-sm font-mono focus:ring-2 focus:ring-neutral-900 dark:focus:ring-white focus:outline-none"
                />
              </div>

              {/* Contact Info */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-neutral-100 dark:border-neutral-700">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    Agent / Owner Name
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Elena Rostova"
                    value={rentalForm.agentName}
                    onChange={(e) => setRentalForm({ ...rentalForm, agentName: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    Contact Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="+1 (555) 000-0000"
                    value={rentalForm.phone}
                    onChange={(e) => setRentalForm({ ...rentalForm, phone: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-neutral-700 dark:text-neutral-300 mb-1">
                    Contact Email
                  </label>
                  <input
                    type="email"
                    placeholder="leasing@company.com"
                    value={rentalForm.email}
                    onChange={(e) => setRentalForm({ ...rentalForm, email: e.target.value })}
                    className="w-full px-3 py-2 text-xs rounded-lg border border-neutral-300 dark:border-neutral-700 bg-neutral-50 dark:bg-neutral-900 text-neutral-900 dark:text-neutral-100"
                  />
                </div>
              </div>
            </>
          )}

          {/* Action Row */}
          <div className="pt-6 border-t border-neutral-200 dark:border-neutral-700 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleCopyMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                title="Copy Jekyll Markdown frontmatter"
              >
                <Copy className="w-3.5 h-3.5" />
                <span>{copiedMd ? 'Copied .md!' : 'Copy Markdown'}</span>
              </button>

              <button
                type="button"
                onClick={handleDownloadMarkdown}
                className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg border border-neutral-300 dark:border-neutral-700 text-xs font-semibold text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-700 transition-colors"
                title="Download .md file for GitHub Pages repository"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Download .md</span>
              </button>
            </div>

            <button
              id="submit-listing-btn"
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3 rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-bold text-sm shadow hover:opacity-90 transition-opacity"
            >
              <Sparkles className="w-4 h-4" />
              <span>Publish to Directory</span>
            </button>
          </div>
        </form>
      </div>

      {/* Live Markdown file preview showing Jekyll structure */}
      <div className="bg-neutral-900 text-neutral-100 rounded-2xl p-6 border border-neutral-800 space-y-3 font-mono text-xs shadow-lg">
        <div className="flex items-center justify-between pb-3 border-b border-neutral-800">
          <div className="flex items-center gap-2">
            <FileCode2 className="w-4 h-4 text-amber-400" />
            <span className="font-bold text-amber-400">
              Live Jekyll Markdown Generator ({submissionType === 'event' ? `_events/${eventForm.date}-${liveSlug}.md` : `_rentals/${liveSlug}.md`})
            </span>
          </div>
          <span className="text-[11px] text-neutral-400">GitHub Pages Compatible</span>
        </div>
        <pre className="overflow-x-auto text-neutral-300 leading-relaxed max-h-60 p-2">
          {currentMarkdown}
        </pre>
      </div>
    </div>
  );
}
