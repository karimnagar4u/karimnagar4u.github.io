import { useState, useEffect, useMemo } from 'react';
import {
  ActivePage,
  ViewMode,
  EventItem,
  RentalItem,
  BannerSlide,
} from './types';
import {
  INITIAL_BANNERS,
  INITIAL_EVENTS,
  INITIAL_RENTALS,
  generateEventMarkdown,
  generateRentalMarkdown,
} from './data/initialData';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { Banner } from './components/Banner';
import { ViewToggle } from './components/ViewToggle';
import { EventCard } from './components/EventCard';
import { RentalCard } from './components/RentalCard';
import {
  EventFiltersBar,
  RentalFiltersBar,
  EventFilterState,
  RentalFilterState,
} from './components/FiltersBar';
import { EventDetailPage } from './components/EventDetailPage';
import { RentalDetailPage } from './components/RentalDetailPage';
import { ListYoursPage } from './components/ListYoursPage';
import { MarkdownModal } from './components/MarkdownModal';
import { ArrowRight, Sparkles } from 'lucide-react';

export default function App() {
  // Theme state
  const [isDark, setIsDark] = useState<boolean>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('hub_theme');
      if (saved) return saved === 'dark';
      return window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('hub_theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('hub_theme', 'light');
    }
  }, [isDark]);

  const toggleTheme = () => setIsDark((prev) => !prev);

  // Navigation State
  const [activePage, setActivePage] = useState<ActivePage>('home');
  const [selectedEvent, setSelectedEvent] = useState<EventItem | null>(null);
  const [selectedRental, setSelectedRental] = useState<RentalItem | null>(null);

  // View modes
  const [homeEventViewMode, setHomeEventViewMode] = useState<ViewMode>('grid');
  const [eventsPageViewMode, setEventsPageViewMode] = useState<ViewMode>('grid');
  const [rentalsPageViewMode, setRentalsPageViewMode] = useState<ViewMode>('grid');

  // Items State (populated with markdown fields)
  const [events, setEvents] = useState<EventItem[]>(() => {
    const saved = localStorage.getItem('hub_events');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_EVENTS.map((e) => ({
      ...e,
      rawMarkdown: generateEventMarkdown(e),
    }));
  });

  const [rentals, setRentals] = useState<RentalItem[]>(() => {
    const saved = localStorage.getItem('hub_rentals');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch {
        // fallback
      }
    }
    return INITIAL_RENTALS.map((r) => ({
      ...r,
      rawMarkdown: generateRentalMarkdown(r),
    }));
  });

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('hub_events', JSON.stringify(events));
  }, [events]);

  useEffect(() => {
    localStorage.setItem('hub_rentals', JSON.stringify(rentals));
  }, [rentals]);

  // Markdown Modal Inspection State
  const [markdownModalState, setMarkdownModalState] = useState<{
    isOpen: boolean;
    title: string;
    markdown: string;
  }>({
    isOpen: false,
    title: '',
    markdown: '',
  });

  // Filter States
  const [eventFilters, setEventFilters] = useState<EventFilterState>({
    search: '',
    location: 'all',
    time: 'all',
    category: 'all',
  });

  const [rentalFilters, setRentalFilters] = useState<RentalFilterState>({
    search: '',
    location: 'all',
    sftRange: 'all',
    propertyType: 'all',
  });

  // Filter options
  const eventLocations = useMemo(() => {
    return Array.from(new Set(events.map((e) => e.location))).sort();
  }, [events]);

  const eventCategories = useMemo(() => {
    return Array.from(new Set(events.map((e) => e.category))).sort();
  }, [events]);

  const rentalLocations = useMemo(() => {
    return Array.from(new Set(rentals.map((r) => r.location))).sort();
  }, [rentals]);

  const rentalTypes = useMemo(() => {
    return Array.from(new Set(rentals.map((r) => r.propertyType))).sort();
  }, [rentals]);

  // Filtered Events
  const filteredEvents = useMemo(() => {
    return events.filter((e) => {
      // Search
      if (eventFilters.search.trim()) {
        const query = eventFilters.search.toLowerCase();
        const matchesTitle = e.title.toLowerCase().includes(query);
        const matchesTagline = e.tagline.toLowerCase().includes(query);
        const matchesVenue = e.venue.toLowerCase().includes(query);
        const matchesCategory = e.category.toLowerCase().includes(query);
        if (!matchesTitle && !matchesTagline && !matchesVenue && !matchesCategory) {
          return false;
        }
      }

      // Location
      if (eventFilters.location !== 'all' && e.location !== eventFilters.location) {
        return false;
      }

      // Time
      if (eventFilters.time !== 'all') {
        if (eventFilters.time === 'weekend' && e.timeframeCategory !== 'weekend') return false;
        if (eventFilters.time === 'this-month' && e.timeframeCategory !== 'this-month' && e.timeframeCategory !== 'weekend') return false;
        if (eventFilters.time === 'upcoming' && e.timeframeCategory !== 'upcoming') return false;
      }

      // Category / What's New
      if (eventFilters.category !== 'all') {
        if (eventFilters.category === 'new-only') {
          if (!e.isNew) return false;
        } else if (e.category !== eventFilters.category) {
          return false;
        }
      }

      return true;
    });
  }, [events, eventFilters]);

  // Filtered Rentals
  const filteredRentals = useMemo(() => {
    return rentals.filter((r) => {
      // Search
      if (rentalFilters.search.trim()) {
        const query = rentalFilters.search.toLowerCase();
        const matchesTitle = r.title.toLowerCase().includes(query);
        const matchesTagline = r.tagline.toLowerCase().includes(query);
        const matchesLocation = r.location.toLowerCase().includes(query);
        const matchesType = r.propertyType.toLowerCase().includes(query);
        if (!matchesTitle && !matchesTagline && !matchesLocation && !matchesType) {
          return false;
        }
      }

      // Location
      if (rentalFilters.location !== 'all' && r.location !== rentalFilters.location) {
        return false;
      }

      // Square Footage (SFT)
      if (rentalFilters.sftRange !== 'all') {
        if (rentalFilters.sftRange === 'under-1500' && r.areaSft >= 1500) return false;
        if (
          rentalFilters.sftRange === '1500-3000' &&
          (r.areaSft < 1500 || r.areaSft > 3000)
        )
          return false;
        if (
          rentalFilters.sftRange === '3000-5000' &&
          (r.areaSft < 3000 || r.areaSft > 5000)
        )
          return false;
        if (rentalFilters.sftRange === '5000-plus' && r.areaSft <= 5000) return false;
      }

      // Property Type
      if (
        rentalFilters.propertyType !== 'all' &&
        r.propertyType !== rentalFilters.propertyType
      ) {
        return false;
      }

      return true;
    });
  }, [rentals, rentalFilters]);

  // Handlers
  const handleSelectEvent = (event: EventItem) => {
    setSelectedEvent(event);
    setActivePage('event-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectRental = (rental: RentalItem) => {
    setSelectedRental(rental);
    setActivePage('rental-detail');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBannerClick = (slide: BannerSlide) => {
    if (slide.targetType === 'event') {
      const match = events.find((e) => e.slug === slide.targetId || e.id === slide.targetId);
      if (match) {
        handleSelectEvent(match);
      } else {
        setActivePage('events');
      }
    } else if (slide.targetType === 'rental') {
      const match = rentals.find((r) => r.slug === slide.targetId || r.id === slide.targetId);
      if (match) {
        handleSelectRental(match);
      } else {
        setActivePage('rent-lease');
      }
    }
  };

  const handleAddEvent = (newEvent: EventItem) => {
    setEvents((prev) => [newEvent, ...prev]);
  };

  const handleAddRental = (newRental: RentalItem) => {
    setRentals((prev) => [newRental, ...prev]);
  };

  const openGlobalMarkdownModal = () => {
    const summaryMd = `---
# Jekyll Architecture Overview
# Host on GitHub Pages by adding Markdown files to the corresponding folders:

folders:
  - _events/   # Contains event markdown files
  - _rentals/  # Contains commercial & residential listings
  - _layouts/  # default.html, event.html, rental.html
---

# Events & Rent/Lease Hub (.MD + Jekyll)

Every event and property is driven entirely by simple Markdown files with YAML frontmatter.

### Example Event File (\`_events/2026-09-12-jazz-culinary-festival.md\`)
\`\`\`yaml
---
layout: event
title: "Neon Nights Jazz & Culinary Festival"
tagline: "Live brass quartets, craft mixology, and gourmet pop-ups under the stars."
date: 2026-09-12
venue: "Waterfront Amphitheatre & Pier 4"
location: "Harbor Bay"
category: "Music & Concerts"
banner_image: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819"
photos:
  - "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4"
  - "https://images.unsplash.com/photo-1470225620780-dba8ba36b745"
---
Join us for the 6th Annual Neon Nights Jazz Festival!
\`\`\`

### Example Rental File (\`_rentals/harbor-creative-tech-loft.md\`)
\`\`\`yaml
---
layout: rental
title: "Harbor Creative Tech Loft & Headquarters"
location: "Harbor Bay"
area_sft: 3800
property_type: "Commercial"
price: "$12,500 / month"
photos:
  - "https://images.unsplash.com/photo-1497366216548-37526070297c"
---
A stunning, newly refurbished commercial floor occupying the 4th level.
\`\`\`
`;
    setMarkdownModalState({
      isOpen: true,
      title: 'Jekyll Site Architecture & Markdown Schema',
      markdown: summaryMd,
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100 transition-colors duration-200 selection:bg-amber-200 dark:selection:bg-amber-900">
      {/* Global Navigation Bar */}
      <Navbar
        activePage={activePage}
        onNavigate={(page) => {
          setActivePage(page);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        isDark={isDark}
        onToggleTheme={toggleTheme}
        onOpenMarkdownModal={openGlobalMarkdownModal}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
        {/* ========================================================
            PAGE 1: HOMEPAGE (Matching Wireframe 1)
            - Banner below menu bar
            - Dots indicator "..."
            - Divider line
            - Events section under banner (List / Grid toggle)
            - Grid of events
           ======================================================== */}
        {activePage === 'home' && (
          <div id="homepage-view" className="space-y-8 sm:space-y-10">
            {/* Banner below the menu bar */}
            <Banner slides={INITIAL_BANNERS} onSelectSlide={handleBannerClick} />

            {/* Wireframe Divider */}
            <hr className="border-neutral-300 dark:border-neutral-800" />

            {/* Events Section under the banner */}
            <section id="homepage-events-section" className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <h2 className="text-2xl sm:text-3xl font-black font-serif text-neutral-900 dark:text-white">
                    Events
                  </h2>
                  <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-0.5">
                    Curated local experiences, live music, conferences, and community gatherings.
                  </p>
                </div>

                {/* View Toggle on Right matching Wireframe 1 */}
                <div className="flex items-center gap-3 self-start sm:self-auto">
                  <ViewToggle
                    idPrefix="home-events"
                    viewMode={homeEventViewMode}
                    onViewModeChange={setHomeEventViewMode}
                  />

                  <button
                    onClick={() => setActivePage('events')}
                    className="inline-flex items-center gap-1 text-xs font-bold text-neutral-700 dark:text-neutral-300 hover:text-neutral-950 dark:hover:text-white hover:underline"
                  >
                    <span>View All Events ({events.length})</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Events in Selected View Mode */}
              {homeEventViewMode === 'grid' ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {events.slice(0, 4).map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      viewMode="grid"
                      onSelect={handleSelectEvent}
                    />
                  ))}
                </div>
              ) : (
                <div className="space-y-3">
                  {events.slice(0, 4).map((event) => (
                    <EventCard
                      key={event.id}
                      event={event}
                      viewMode="list"
                      onSelect={handleSelectEvent}
                    />
                  ))}
                </div>
              )}
            </section>

            {/* Featured Rent / Lease Highlight Section */}
            <section id="homepage-rentals-section" className="pt-8 border-t border-neutral-200 dark:border-neutral-800 space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1 text-[11px] font-bold uppercase tracking-wider text-emerald-700 dark:text-emerald-400 mb-1">
                    <Sparkles className="w-3 h-3" />
                    Commercial & Creative Real Estate
                  </div>
                  <h2 className="text-2xl sm:text-3xl font-black font-serif text-neutral-900 dark:text-white">
                    Rent / Lease Spaces
                  </h2>
                </div>

                <button
                  onClick={() => setActivePage('rent-lease')}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-700 dark:text-emerald-400 hover:underline self-start sm:self-auto"
                >
                  <span>Explore All Spaces ({rentals.length})</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {rentals.slice(0, 3).map((rental) => (
                  <RentalCard
                    key={rental.id}
                    rental={rental}
                    viewMode="grid"
                    onSelect={handleSelectRental}
                  />
                ))}
              </div>
            </section>
          </div>
        )}

        {/* ========================================================
            PAGE 2: EVENTS PAGE (Matching Wireframe 2)
            - Retains global nav (logo, menu)
            - List / Grid view toggle for events
            - Dropdown filters to aggregate events by:
                * Location
                * Time
                * What's New
            - Events displayed in selected view format
           ======================================================== */}
        {activePage === 'events' && (
          <div id="events-directory-page" className="space-y-6">
            {/* Header with Title & View Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black font-serif text-neutral-900 dark:text-white tracking-tight">
                  Events
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  Discover upcoming music performances, tech summits, food bazaars, and community showcases.
                </p>
              </div>

              {/* List / Grid view toggle matching wireframe 2 */}
              <ViewToggle
                idPrefix="events-page"
                viewMode={eventsPageViewMode}
                onViewModeChange={setEventsPageViewMode}
              />
            </div>

            {/* Dropdown filters to aggregate events by: Location, Time, What's New */}
            <EventFiltersBar
              filters={eventFilters}
              onFilterChange={setEventFilters}
              availableLocations={eventLocations}
              availableCategories={eventCategories}
              totalResults={filteredEvents.length}
            />

            {/* Display in selected format */}
            {filteredEvents.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8">
                <p className="text-base font-bold text-neutral-800 dark:text-neutral-200">
                  No events found matching your filter criteria.
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Try clearing your search terms or picking another location.
                </p>
                <button
                  onClick={() =>
                    setEventFilters({
                      search: '',
                      location: 'all',
                      time: 'all',
                      category: 'all',
                    })
                  }
                  className="mt-4 px-4 py-2 text-xs font-bold rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                >
                  Reset All Filters
                </button>
              </div>
            ) : eventsPageViewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    viewMode="grid"
                    onSelect={handleSelectEvent}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredEvents.map((event) => (
                  <EventCard
                    key={event.id}
                    event={event}
                    viewMode="list"
                    onSelect={handleSelectEvent}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            PAGE 3: RENT / LEASE PAGE (Matching Wireframe 3)
            - Similar layout to Events page
            - Filter options for:
                * Location
                * Square footage (SFT)
                * Commercial or Real Estate type
            - List / Grid view toggle
           ======================================================== */}
        {activePage === 'rent-lease' && (
          <div id="rentals-directory-page" className="space-y-6">
            {/* Header with Title & View Toggle */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-2">
              <div>
                <h1 className="text-3xl sm:text-4xl font-black font-serif text-neutral-900 dark:text-white tracking-tight">
                  Rent / Lease
                </h1>
                <p className="text-xs sm:text-sm text-neutral-500 dark:text-neutral-400 mt-1">
                  Explore prime commercial headquarters, retail boutiques, creative film studios, and residential lofts.
                </p>
              </div>

              {/* List / Grid view toggle matching wireframe 3 */}
              <ViewToggle
                idPrefix="rentals-page"
                viewMode={rentalsPageViewMode}
                onViewModeChange={setRentalsPageViewMode}
              />
            </div>

            {/* Dropdown filters for: Location, Square footage (SFT), Commercial or Real Estate type */}
            <RentalFiltersBar
              filters={rentalFilters}
              onFilterChange={setRentalFilters}
              availableLocations={rentalLocations}
              availableTypes={rentalTypes}
              totalResults={filteredRentals.length}
            />

            {/* Display in selected format */}
            {filteredRentals.length === 0 ? (
              <div className="text-center py-16 bg-white dark:bg-neutral-900 rounded-2xl border border-neutral-200 dark:border-neutral-800 p-8">
                <p className="text-base font-bold text-neutral-800 dark:text-neutral-200">
                  No property listings found matching your search.
                </p>
                <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-1">
                  Try adjusting square footage or selecting all property types.
                </p>
                <button
                  onClick={() =>
                    setRentalFilters({
                      search: '',
                      location: 'all',
                      sftRange: 'all',
                      propertyType: 'all',
                    })
                  }
                  className="mt-4 px-4 py-2 text-xs font-bold rounded-lg bg-neutral-900 text-white dark:bg-white dark:text-neutral-900"
                >
                  Reset All Filters
                </button>
              </div>
            ) : rentalsPageViewMode === 'grid' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredRentals.map((rental) => (
                  <RentalCard
                    key={rental.id}
                    rental={rental}
                    viewMode="grid"
                    onSelect={handleSelectRental}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredRentals.map((rental) => (
                  <RentalCard
                    key={rental.id}
                    rental={rental}
                    viewMode="list"
                    onSelect={handleSelectRental}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* ========================================================
            PAGE 4: LIST YOURS (Matching Wireframe 4)
            - A form page
            - Will be linked to a Google Form at a later stage
            - Live Markdown + Jekyll generator
           ======================================================== */}
        {activePage === 'list-yours' && (
          <ListYoursPage
            onAddEvent={handleAddEvent}
            onAddRental={handleAddRental}
            onNavigateToEvent={handleSelectEvent}
            onNavigateToRental={handleSelectRental}
          />
        )}

        {/* ========================================================
            PAGE 5: INDIVIDUAL EVENT LAYOUT (Matching Wireframe 5)
            - Banner
            - Title + Tagline
            - Date, Description, Venue
            - Photos — 3–4 arranged in a grid
            - Contact info
            - Disclaimer
            - Other Events section at the bottom (grid view)
           ======================================================== */}
        {activePage === 'event-detail' && selectedEvent && (
          <EventDetailPage
            event={selectedEvent}
            allEvents={events}
            onSelectEvent={handleSelectEvent}
            onBackToEvents={() => setActivePage('events')}
            onOpenMarkdownModal={(title, markdown) => {
              setMarkdownModalState({
                isOpen: true,
                title,
                markdown,
              });
            }}
          />
        )}

        {/* ========================================================
            PAGE 6: INDIVIDUAL RENT/LEASE LAYOUT (Matching Wireframe 6)
            - Title + Tagline
            - Location
            - Area (SFT)
            - Contact info
            - Pictures (4 photos in grid)
            - Inquire / List Yours form at bottom
           ======================================================== */}
        {activePage === 'rental-detail' && selectedRental && (
          <RentalDetailPage
            rental={selectedRental}
            onBackToRentals={() => setActivePage('rent-lease')}
            onOpenMarkdownModal={(title, markdown) => {
              setMarkdownModalState({
                isOpen: true,
                title,
                markdown,
              });
            }}
          />
        )}
      </main>

      {/* Global Footer with YouTube & Instagram icons on right */}
      <Footer
        onNavigateTab={(tab) => {
          setActivePage(tab);
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
      />

      {/* Jekyll Markdown Source Inspection Modal */}
      <MarkdownModal
        isOpen={markdownModalState.isOpen}
        onClose={() => setMarkdownModalState({ ...markdownModalState, isOpen: false })}
        title={markdownModalState.title}
        markdownContent={markdownModalState.markdown}
      />
    </div>
  );
}
