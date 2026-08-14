export type ViewMode = 'grid' | 'list';

export type ActivePage = 'home' | 'events' | 'rent-lease' | 'list-yours' | 'event-detail' | 'rental-detail';

export interface EventItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  date: string; // e.g. "2026-09-12"
  displayDate: string; // e.g. "Saturday, Sep 12, 2026 • 7:00 PM"
  venue: string;
  location: string;
  category: string;
  description: string;
  photos: string[];
  bannerImage: string;
  contact: {
    organizer?: string;
    phone?: string;
    email?: string;
    website?: string;
  };
  disclaimer: string;
  isNew?: boolean;
  timeframeCategory?: 'weekend' | 'this-week' | 'this-month' | 'upcoming';
  rawMarkdown?: string;
}

export interface RentalItem {
  id: string;
  slug: string;
  title: string;
  tagline: string;
  location: string;
  areaSft: number;
  propertyType: 'Commercial' | 'Office' | 'Retail' | 'Industrial' | 'Creative Studio' | 'Residential';
  price: string;
  description: string;
  photos: string[];
  contact: {
    agentName?: string;
    phone?: string;
    email?: string;
  };
  features?: string[];
  rawMarkdown?: string;
}

export interface BannerSlide {
  id: string;
  title: string;
  tagline: string;
  imageUrl: string;
  targetType: 'event' | 'rental' | 'page';
  targetId: string;
  categoryBadge: string;
}
