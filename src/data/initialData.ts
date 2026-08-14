import { EventItem, RentalItem, BannerSlide } from '../types';

export const INITIAL_BANNERS: BannerSlide[] = [
  {
    id: 'b1',
    title: 'Neon Nights Jazz & Culinary Festival',
    tagline: 'An electric evening of live brass, artisan street food, and waterfront rooftop vibes.',
    imageUrl: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1600&q=80',
    targetType: 'event',
    targetId: 'jazz-culinary-festival-2026',
    categoryBadge: 'Featured Event',
  },
  {
    id: 'b2',
    title: 'Harbor View Creative Tech Loft',
    tagline: '3,800 SFT premium open-plan commercial headquarters with floor-to-ceiling glass.',
    imageUrl: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
    targetType: 'rental',
    targetId: 'harbor-creative-tech-loft',
    categoryBadge: 'Commercial Lease',
  },
  {
    id: 'b3',
    title: 'AI & Sustainable Urban Design Summit',
    tagline: 'Connecting 500+ civic innovators, venture architects, and green energy leaders.',
    imageUrl: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1600&q=80',
    targetType: 'event',
    targetId: 'urban-design-summit',
    categoryBadge: 'What’s New',
  },
];

export const INITIAL_EVENTS: EventItem[] = [
  {
    id: 'e1',
    slug: 'jazz-culinary-festival-2026',
    title: 'Neon Nights Jazz & Culinary Festival',
    tagline: 'Live brass quartets, craft mixology, and gourmet pop-ups under the stars.',
    date: '2026-09-12',
    displayDate: 'Saturday, Sep 12, 2026 • 6:30 PM - 11:30 PM',
    venue: 'Waterfront Amphitheatre & Pier 4',
    location: 'Harbor Bay',
    category: 'Music & Concerts',
    isNew: true,
    timeframeCategory: 'weekend',
    bannerImage: 'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1400&q=80',
    photos: [
      'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=800&q=80',
    ],
    contact: {
      organizer: 'Harbor Arts & Culture Guild',
      phone: '+1 (555) 234-8901',
      email: 'events@harborartsguild.org',
      website: 'https://harbornightsfestival.example.com',
    },
    disclaimer: 'Age 21+ only after 9:00 PM. No outside beverages or oversized backpacks permitted. In case of inclement weather, the performance stages will relocate to the sheltered Pavilion West.',
    description: `Join us for the 6th Annual **Neon Nights Jazz & Culinary Festival**! Experience three stages of world-class neo-soul, contemporary jazz fusion, and Brazilian bossa nova paired with over 20 artisanal tasting stations curated by top regional chefs.

### Event Highlights:
- **Main Stage:** Headline performances by *The Velvet Brass Quintet* and Grammy-nominee *Aria Vance*.
- **Culinary Row:** Small plates featuring wood-fired tapas, farm-to-table seafood ceviche, and vegan patisserie.
- **Mixology Lounge:** Curated wine pairings and botanic mocktail tasting flights.
- **Visual Installations:** Interactive neon sculpture garden and live muralists.`,
  },
  {
    id: 'e2',
    slug: 'urban-design-summit',
    title: 'AI & Sustainable Urban Design Summit',
    tagline: 'Pioneering smart city frameworks, clean grids, and modern civic architecture.',
    date: '2026-09-18',
    displayDate: 'Friday, Sep 18, 2026 • 9:00 AM - 5:30 PM',
    venue: 'Metropolitan Innovation Center, Hall A',
    location: 'Innovation Hub',
    category: 'Tech & Startup',
    isNew: true,
    timeframeCategory: 'this-month',
    bannerImage: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1400&q=80',
    photos: [
      'https://images.unsplash.com/photo-1505373877841-8d25f7d46678?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1515187029135-18ee286d815b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?auto=format&fit=crop&w=800&q=80',
    ],
    contact: {
      organizer: 'NextCity Forum & AI Urban Labs',
      phone: '+1 (555) 890-4412',
      email: 'summit@nextcityforum.org',
      website: 'https://summit.nextcityforum.org',
    },
    disclaimer: 'Badge pickup starts at 8:00 AM. Advance registration is required; security checkpoints will verify photo identification matching delegate credentials.',
    description: `A one-day intensive conference gathering city planners, civic technologists, and venture capitalists to explore how intelligent algorithms, renewable microgrids, and mass timber building methods are transforming 21st-century cities.

### Key Tracks:
- **Decarbonizing Commercial Districts:** Retrofitting urban cores with geothermal and distributed solar.
- **Autonomous Mobility Networks:** Safe multi-modal transit integration.
- **Generative AI in Urban Planning:** Predictive zoning simulations and population load balancing.`,
  },
  {
    id: 'e3',
    slug: 'contemporary-ceramics-sculpture-expo',
    title: 'Contemporary Ceramics & Sculpture Expo',
    tagline: 'Handmade stoneware, porcelain vessels, and monumental clay installations.',
    date: '2026-09-05',
    displayDate: 'Saturday - Sunday, Sep 5-6, 2026 • 11:00 AM - 6:00 PM',
    venue: 'The Foundry Glasshouse & Courtyard',
    location: 'Arts Quarter',
    category: 'Art & Culture',
    isNew: false,
    timeframeCategory: 'weekend',
    bannerImage: 'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=1400&q=80',
    photos: [
      'https://images.unsplash.com/photo-1578749556568-bc2c40e68b61?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1565193566173-7a0ee3dbe261?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1525909002-1b05e0c869d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=800&q=80',
    ],
    contact: {
      organizer: 'Arts Quarter Studio Collective',
      phone: '+1 (555) 771-3329',
      email: 'hello@foundryarts.io',
      website: 'https://foundryarts.io/ceramics-expo',
    },
    disclaimer: 'Fragile artworks on display. Strollers must be parked at the designated cloakroom near entrance 2. Photography is welcomed without flash.',
    description: `Featuring 45 international and resident ceramicists showcasing rare wood-fired raku pottery, architectural porcelain sculptures, and functional dining sets.

### Schedule of Demonstrations:
- **1:00 PM:** Wheel throwing masterclass by master potter Kenzo Mori.
- **3:30 PM:** Natural ash glaze chemistry workshop.
- **All Day:** Collector auction & meet-the-artist tea ceremony.`,
  },
  {
    id: 'e4',
    slug: 'downtown-farmers-artisanal-bazaar',
    title: 'Downtown Organic Farmers & Artisanal Bazaar',
    tagline: 'Fresh organic harvests, sourdough bakery popups, and heirloom honey tastings.',
    date: '2026-09-20',
    displayDate: 'Every Sunday • 8:30 AM - 2:00 PM',
    venue: 'Civic Plaza Green Promenade',
    location: 'Downtown',
    category: 'Community & Wellness',
    isNew: false,
    timeframeCategory: 'weekend',
    bannerImage: 'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1400&q=80',
    photos: [
      'https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506617420156-8e4536971650?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=800&q=80',
    ],
    contact: {
      organizer: 'Downtown Civic Farmers Alliance',
      phone: '+1 (555) 432-1100',
      email: 'market@downtownfarmers.org',
      website: 'https://downtownfarmers.org',
    },
    disclaimer: 'Pet-friendly on leash. Please bring reusable tote bags to support zero-waste market initiatives. Parking is validated for 2 hours at City Hall Garage.',
    description: `A weekly celebration of local growers, small-batch cheese makers, hand-poured candle artisans, and organic cold-pressed orchards.

- **Over 60 Verified Local Vendors**
- **Live acoustic bluegrass and folk music on the lawn**
- **Free compost drop-off and plant doctor clinic**`,
  },
  {
    id: 'e5',
    slug: 'indie-game-developer-showcase',
    title: 'Indie Game Developers Autumn Showcase',
    tagline: 'Play unreleased indie titles, VR experiments, and meet passionate game makers.',
    date: '2026-10-03',
    displayDate: 'Saturday, Oct 3, 2026 • 10:00 AM - 7:00 PM',
    venue: 'Arcadia Digital Arena',
    location: 'West End',
    category: 'Tech & Startup',
    isNew: true,
    timeframeCategory: 'upcoming',
    bannerImage: 'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=1400&q=80',
    photos: [
      'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1550745165-9bc0b252726f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80',
    ],
    contact: {
      organizer: 'IndiePlay Guild',
      phone: '+1 (555) 901-7788',
      email: 'showcase@indieplayguild.com',
      website: 'https://indieplayguild.com',
    },
    disclaimer: 'Headsets are sanitized between VR play sessions. Seating for developer keynotes is on a first-come, first-served basis.',
    description: `Get hands-on experience with over 30 unreleased independent video games across PC, console, mobile, and mixed reality platforms.

### Features:
- Playable game demos across retro pixel art, narrative RPGs, and puzzle simulators.
- Game audio design panels and speed-pitching sessions for indie studios seeking publisher backing.`,
  },
  {
    id: 'e6',
    slug: 'harvest-moon-wine-dine',
    title: 'Harvest Moon Wine & Dining Gala',
    tagline: 'Five-course sommelier pairing dinner in a historic barrel room.',
    date: '2026-10-15',
    displayDate: 'Thursday, Oct 15, 2026 • 7:00 PM - 10:30 PM',
    venue: 'Heritage Cellars Estate',
    location: 'North District',
    category: 'Food & Drink',
    isNew: false,
    timeframeCategory: 'upcoming',
    bannerImage: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1400&q=80',
    photos: [
      'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506377247377-2a5b3b417ebb?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528605248644-14dd04022da1?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
    ],
    contact: {
      organizer: 'Heritage Cellars Sommelier Guild',
      phone: '+1 (555) 345-6712',
      email: 'reservations@heritagecellars.com',
      website: 'https://heritagecellars.com/harvest-gala',
    },
    disclaimer: 'Black-tie optional. Dietary substitutions must be submitted 72 hours prior to the event date.',
    description: `An exclusive autumn banquet showcasing reserve vintages alongside heritage meats, wild foraged mushrooms, and artisan cheeses curated by master sommeliers.`,
  },
];

export const INITIAL_RENTALS: RentalItem[] = [
  {
    id: 'r1',
    slug: 'harbor-creative-tech-loft',
    title: 'Harbor Creative Tech Loft & Headquarters',
    tagline: 'High-ceiling open plan office with expansive panoramic bay views.',
    location: 'Harbor Bay',
    areaSft: 3800,
    propertyType: 'Commercial',
    price: '$12,500 / month (Triple Net)',
    description: `A stunning, newly refurbished commercial floor occupying the 4th level of the historic Pierpoint Building. Features exposed heavy timber trusses, polished concrete floors, modern acoustic baffle pods, and direct freight elevator access.

### Property Features:
- **3,800 SFT usable floor area** with zoning for up to 45 workstations
- **2 Executive Boardrooms** with integrated 4K video conferencing wiring
- **Full Gourmet Kitchenette** with marble island, dishwasher, and espresso bar
- **Dedicated fiber-optic internet connection** (dual redundant 10Gbps uplinks)
- **4 Reserved secure underground parking spaces** included in the lease`,
    photos: [
      'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
    ],
    contact: {
      agentName: 'Marcus Vance, Senior Broker',
      phone: '+1 (555) 782-9900',
      email: 'm.vance@harborcommercialre.com',
    },
    features: ['High-Speed Fiber', '24/7 Security Access', 'Private Terrace', 'HVAC Air Filtration', 'Freight Elevator'],
  },
  {
    id: 'r2',
    slug: 'downtown-corner-retail-boutique',
    title: 'Downtown High-Footfall Corner Retail Storefront',
    tagline: 'Triple-aspect glass facade directly opposite the Central Metro Station.',
    location: 'Downtown',
    areaSft: 1850,
    propertyType: 'Retail',
    price: '$7,200 / month',
    description: `Prime street-level retail showroom with over 60 linear feet of window display frontage on the busiest pedestrian thoroughfare in the financial district. Suitable for fashion, luxury lifestyle, apothecary, or concept cafe.

### Key Highlights:
- **1,850 SFT** ground-level retail plus 600 SFT dry basement inventory storage
- ADA-compliant entrance and modern customer restroom
- Heavy electrical supply (3-phase 200A) suitable for specialty food & beverage machinery
- High daily foot traffic exceeding 18,000 passersby on weekdays`,
    photos: [
      'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1528698827591-e19ccd7bc23d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1472851294608-062f824d29cc?auto=format&fit=crop&w=800&q=80',
    ],
    contact: {
      agentName: 'Elena Rostova, Retail Leasing Director',
      phone: '+1 (555) 440-1288',
      email: 'elena@downtownproperties.com',
    },
    features: ['Corner Exposure', 'Basement Storage', 'Heavy Foot Traffic', 'Custom Lighting Rig', 'Grease Trap Ready'],
  },
  {
    id: 'r3',
    slug: 'arts-district-photo-film-studio',
    title: 'Arts District Daylight Photo & Film Production Studio',
    tagline: 'North-facing industrial skylights with seamless cyclorama wall.',
    location: 'Arts Quarter',
    areaSft: 2600,
    propertyType: 'Creative Studio',
    price: '$5,900 / month',
    description: `Purpose-built production sanctuary with 20ft ceiling height, 180-degree infinity cove cyclorama, and sound-dampened acoustic ceiling insulation. Ideal for creative agencies, fashion photography, or podcast broadcasting.

### Amenities:
- **2,600 SFT** open floor space with rolling equipment partitions
- Dedicated hair, makeup & green room with styling stations
- High-amperage studio power drops and overhead grid rigging
- Roll-up garage door for easy vehicle entry and large set loading`,
    photos: [
      'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1586023492125-27b2c045efd7?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    ],
    contact: {
      agentName: 'Julian Hayes, Studio Manager',
      phone: '+1 (555) 678-2231',
      email: 'spaces@artsdistrictcreatives.com',
    },
    features: ['20ft Ceilings', 'Cyclorama Wall', 'Drive-In Access', 'Styling Green Room', 'Sound Insulation'],
  },
  {
    id: 'r4',
    slug: 'innovation-hub-coworking-suite',
    title: 'Innovation Hub Executive Private Team Suite',
    tagline: 'Fully furnished turn-key office suite for teams of 10–25 people.',
    location: 'Innovation Hub',
    areaSft: 1200,
    propertyType: 'Office',
    price: '$4,400 / month (All-Inclusive)',
    description: `Turn-key workspace featuring ergonomic sit-stand desks, soundproof acoustic phone booths, high-speed encrypted Wi-Fi, and access to campus auditoriums and rooftop gardens.

### Inclusions:
- Monthly conference room credits
- Daily janitorial sanitization and mail handling
- Unlimited craft coffee, sparkling water, and kombucha taps`,
    photos: [
      'https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1527192491265-7e15c55b1ed2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=800&q=80',
    ],
    contact: {
      agentName: 'Sarah Lin, Community Director',
      phone: '+1 (555) 902-8877',
      email: 'memberships@innovationhub.co',
    },
    features: ['Furnished', 'Flexible Terms', 'Phone Booths', 'Rooftop Access', 'Meeting Rooms'],
  },
  {
    id: 'r5',
    slug: 'west-end-logistics-distribution-depot',
    title: 'West End Clean Logistics & Light Industrial Depot',
    tagline: '6,400 SFT modern facility with dual loading docks and high-bay racking.',
    location: 'West End',
    areaSft: 6400,
    propertyType: 'Industrial',
    price: '$8,800 / month',
    description: `Modern distribution warehouse located 3 minutes from the interstate interchange. High clearance 24-foot clear height, 2 exterior truck wells with hydraulic dock levelers, ESFR sprinkler system, and 800 SFT air-conditioned dispatch office.`,
    photos: [
      'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1587293852726-70cdb56c2866?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1578575437130-527eed3abbec?auto=format&fit=crop&w=800&q=80',
    ],
    contact: {
      agentName: 'David K., Logistics Brokerage',
      phone: '+1 (555) 332-9011',
      email: 'd.k@westendlogistics.com',
    },
    features: ['24ft Clear Height', 'Dual Loading Docks', 'ESFR Sprinklers', 'Dispatch Office', 'Easy Highway Access'],
  },
  {
    id: 'r6',
    slug: 'uptown-panoramic-luxury-penthouse-suite',
    title: 'Uptown Skyview Residential Loft Suite',
    tagline: 'Architect-designed split-level loft with wraparound terrace and city skyline panorama.',
    location: 'North District',
    areaSft: 2200,
    propertyType: 'Residential',
    price: '$6,500 / month',
    description: `Unsurpassed luxury living featuring custom Italian walnut cabinetry, Sub-Zero appliances, private elevator vestibule, and double-height floor-to-ceiling glass framing stunning sunset views.`,
    photos: [
      'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    ],
    contact: {
      agentName: 'Sophia Sterling, Private Residences',
      phone: '+1 (555) 612-4099',
      email: 'sophia@sterlingresidences.com',
    },
    features: ['Wraparound Terrace', 'Private Elevator', 'Sub-Zero Appliances', 'Concierge', 'Wine Cellar'],
  },
];

// Helper to generate Jekyll-compliant Markdown frontmatter file format
export function generateEventMarkdown(event: EventItem): string {
  return `---
layout: event
title: "${event.title.replace(/"/g, '\\"')}"
tagline: "${event.tagline.replace(/"/g, '\\"')}"
date: ${event.date}
display_date: "${event.displayDate.replace(/"/g, '\\"')}"
venue: "${event.venue.replace(/"/g, '\\"')}"
location: "${event.location.replace(/"/g, '\\"')}"
category: "${event.category.replace(/"/g, '\\"')}"
banner_image: "${event.bannerImage}"
photos:
${event.photos.map((p) => `  - "${p}"`).join('\n')}
contact:
  organizer: "${event.contact.organizer || ''}"
  phone: "${event.contact.phone || ''}"
  email: "${event.contact.email || ''}"
  website: "${event.contact.website || ''}"
disclaimer: "${event.disclaimer.replace(/"/g, '\\"')}"
---

${event.description}
`;
}

export function generateRentalMarkdown(rental: RentalItem): string {
  return `---
layout: rental
title: "${rental.title.replace(/"/g, '\\"')}"
tagline: "${rental.tagline.replace(/"/g, '\\"')}"
location: "${rental.location.replace(/"/g, '\\"')}"
area_sft: ${rental.areaSft}
property_type: "${rental.propertyType}"
price: "${rental.price.replace(/"/g, '\\"')}"
photos:
${rental.photos.map((p) => `  - "${p}"`).join('\n')}
contact:
  agent_name: "${rental.contact.agentName || ''}"
  phone: "${rental.contact.phone || ''}"
  email: "${rental.contact.email || ''}"
features:
${(rental.features || []).map((f) => `  - "${f}"`).join('\n')}
---

${rental.description}
`;
}
