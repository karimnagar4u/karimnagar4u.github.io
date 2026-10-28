/**
 * Karimnagar4You — Main Client-Side Controller
 * Zero-Backend Architecture: Google Sheets CSV -> PapaParse -> Reactive Filter Engine
 */

// Initial State
const state = {
  activeTab: 'events', // 'events' | 'rentals'
  viewMode: 'grid', // 'grid' | 'list'
  searchQuery: '',
  selectedArea: '',
  selectedCategory: '',
  sortBy: 'newest',
  events: [],
  rentals: [],
  isLoading: true,
  currentCarouselIndex: 0,
  carouselTimer: null,
  activeDetailItem: null
};

// Default Realistic Mock Data (used when Google Sheet has no approved rows yet)
const MOCK_EVENTS = [
  {
    Title: "Karimnagar Handloom & Craft Expo 2026",
    Category: "Expo",
    StartDate: "2026-11-05",
    EndDate: "2026-11-12",
    Timing: "10:30 AM - 09:30 PM",
    StreetAddress: "Near Circus Ground, Collectorate Road",
    Area: "Mukarrampur",
    Landmark: "Opposite Arts College Ground",
    OrganizerName: "Telangana Weavers Guild & Tourism Board",
    ContactPhone: "9848012345",
    TicketPrice: "Free Entry",
    PhotoLink: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1000&q=80",
    Description: "Grand state-level exhibition showcasing authentic Pochampally sarees, Gadwal silks, Karimnagar Silver Filigree handicrafts, brassware, and live loom demonstrations. Food stalls and cultural evenings included.",
    Status: "Approved"
  },
  {
    Title: "Lower Manair Dam Cultural Night & Food Festival",
    Category: "Festival",
    StartDate: "2026-11-14",
    EndDate: "2026-11-16",
    Timing: "04:00 PM - 11:00 PM",
    StreetAddress: "Lakefront Promenade, LMD View Point",
    Area: "Manair Riverfront",
    Landmark: "Adjacent to Deer Park",
    OrganizerName: "Karimnagar Youth Cultural Club",
    ContactPhone: "9440156789",
    TicketPrice: "INR 50",
    PhotoLink: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1000&q=80",
    Description: "Enjoy lakeside winter breezes with live acoustic Telugu music, fusion food trucks featuring famous Telangana spicy delicacies, boat rides, and laser light shows across the dam waters.",
    Status: "Approved"
  },
  {
    Title: "Karimnagar IT & Tech Career Workshop",
    Category: "Workshop",
    StartDate: "2026-11-20",
    EndDate: "2026-11-20",
    Timing: "09:30 AM - 02:00 PM",
    StreetAddress: "IT Tower Auditorium, Bypass Road",
    Area: "Kothirampur",
    Landmark: "Near IT Tower Karimnagar",
    OrganizerName: "Telangana Academy for Skill & Knowledge (TASK)",
    ContactPhone: "9701234567",
    TicketPrice: "Free Entry",
    PhotoLink: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=80",
    Description: "Hands-on session for freshers and engineering students on Full Stack Engineering, AI Tooling, and interview preparation by tech leads from Hyderabad and Bangalore.",
    Status: "Approved"
  },
  {
    Title: "Karimnagar Premier Box Cricket Championship",
    Category: "Sports",
    StartDate: "2026-11-28",
    EndDate: "2026-11-29",
    Timing: "06:00 AM - 08:00 PM",
    StreetAddress: "Strike Arena Box Turf, Vavilalapally",
    Area: "Vavilalapally",
    Landmark: "Beside Geetha Bhavan Hotel",
    OrganizerName: "Karimnagar Sports Association",
    ContactPhone: "9123456780",
    TicketPrice: "Free for Viewers",
    PhotoLink: "https://images.unsplash.com/photo-1531415074868-036b107e775a?auto=format&fit=crop&w=1000&q=80",
    Description: "Inter-district corporate & college box cricket tournament with 32 teams competing for the Karimnagar Trophy 2026. Refreshments and live match streaming available.",
    Status: "Approved"
  },
  {
    Title: "Annual Book & Stationery Fair",
    Category: "Sale",
    StartDate: "2026-12-01",
    EndDate: "2026-12-05",
    Timing: "10:00 AM - 08:30 PM",
    StreetAddress: "Town Hall Premises, Tower Circle Road",
    Area: "Tower Circle",
    Landmark: "Historic Clock Tower Complex",
    OrganizerName: "National Book Trust Partners",
    ContactPhone: "9866543210",
    TicketPrice: "Free Entry",
    PhotoLink: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?auto=format&fit=crop&w=1000&q=80",
    Description: "Over 50,000 regional and English books across competitive exams, literature, kids stories, and philosophy at up to 40% discount.",
    Status: "Approved"
  }
];

const MOCK_RENTALS = [
  {
    Title: "Prime Commercial Shutter on Main Collectorate Road",
    PropertyType: "Commercial Shutter",
    RentAmount: "INR 35,000/mo",
    BuiltUpArea: "450 SFT",
    StreetAddress: "Shop No. 4, Ground Floor, Sri Rama Arcade",
    Area: "Mukarrampur",
    Landmark: "Opposite Collectorate Main Gate",
    OwnerName: "R. Venkateshwar Rao",
    ContactPhone: "9849022334",
    PhotoLink: "https://images.unsplash.com/photo-1582037928769-181f2644ecb7?auto=format&fit=crop&w=1000&q=80",
    KeyFeatures: "High Footfall, 3-Phase Power, Glass Frontage, Attached Washroom, Dedicated Customer Parking",
    Description: "Ideal for Pharmacy, Diagnostics Centre, Optical showroom, or Branded Bakery. Prime visibility on 100ft road with continuous vehicular movement. 3 months advance deposit.",
    Status: "Approved"
  },
  {
    Title: "Brand New 2 BHK East-Facing Flat with Modular Kitchen",
    PropertyType: "2 BHK",
    RentAmount: "INR 14,500/mo",
    BuiltUpArea: "1,180 SFT",
    StreetAddress: "Flat 202, Venkateshwara Residency",
    Area: "Vavilalapally",
    Landmark: "Near Geetha Bhavan / Police Kalyana Mandapam",
    OwnerName: "K. Sreedhar",
    ContactPhone: "9440188776",
    PhotoLink: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=1000&q=80",
    KeyFeatures: "Covered Car Parking, 24/7 Manjeera & Bore Water, Lift with Power Backup, 100% Vaastu Compliant",
    Description: "Well-ventilated semi-furnished 2 BHK flat with false ceiling, complete woodwork, wardrobe cupboards in both bedrooms, balconies overlooking greenery, quiet residential colony.",
    Status: "Approved"
  },
  {
    Title: "Plug & Play Modern Office Space in IT Corridor",
    PropertyType: "Office Space",
    RentAmount: "INR 60,000/mo",
    BuiltUpArea: "1,850 SFT",
    StreetAddress: "3rd Floor, Tech Horizon Complex",
    Area: "Kothirampur",
    Landmark: "Near IT Tower Karimnagar",
    OwnerName: "Nexus Realty Infra",
    ContactPhone: "9988776655",
    PhotoLink: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80",
    KeyFeatures: "25 Workstations, Conference Room with Projector, MD Cabin, Reception Desk, Server Room, AC Installed",
    Description: "Ready-to-occupy fully furnished corporate space suitable for IT service firms, chartered accountants, educational consultancies, or regional banking back offices.",
    Status: "Approved"
  },
  {
    Title: "Spacious 3 BHK Luxury Independent Floor",
    PropertyType: "3 BHK",
    RentAmount: "INR 22,000/mo",
    BuiltUpArea: "1,750 SFT",
    StreetAddress: "Plot 88, Green Meadows Colony",
    Area: "Kashmirgadda",
    Landmark: "Near Sacred Heart School",
    OwnerName: "Dr. Anjaneyulu",
    ContactPhone: "9876501234",
    PhotoLink: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1000&q=80",
    KeyFeatures: "Independent Terrace Access, Solar Water Heater, 2 Covered Car Parks, Modular Chimney, Peaceful Area",
    Description: "Executive standard 3 bedroom home with attached bathrooms, separate puja room, utility balcony, and high security CCTV monitoring. Preferred for doctors or corporate executives.",
    Status: "Approved"
  },
  {
    Title: "Compact 1 BHK Ground Floor House for Small Family / Bachelors",
    PropertyType: "1 BHK",
    RentAmount: "INR 6,800/mo",
    BuiltUpArea: "600 SFT",
    StreetAddress: "H.No 3-4-12, Gandhi Road",
    Area: "Mankammathota",
    Landmark: "Beside Old Head Post Office",
    OwnerName: "B. Mohan",
    ContactPhone: "9000123456",
    PhotoLink: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?auto=format&fit=crop&w=1000&q=80",
    KeyFeatures: "Separate Electricity Meter, 24/7 Water, Two-Wheeler Parking, Nearby Market & Hospital",
    Description: "Affordable and tidy 1 BHK unit with hall, bedroom, kitchen, and bathroom. Just 5 minutes walkable to market, bus stand, and hospital.",
    Status: "Approved"
  },
  {
    Title: "Prime Commercial Open Land / Yard for Lease",
    PropertyType: "Open Land",
    RentAmount: "INR 45,000/mo",
    BuiltUpArea: "600 Sq. Yards",
    StreetAddress: "Near Bypass Junction, Jagtial Road",
    Area: "Bypass Road",
    Landmark: "Near Indian Oil Petrol Station",
    OwnerName: "T. Raji Reddy",
    ContactPhone: "9848123987",
    PhotoLink: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1000&q=80",
    KeyFeatures: "Fenced Perimeter, Wide Gate, Heavy Vehicle Truck Access, Borewell Connection, Commercial Zone",
    Description: "Suitable for building materials yard, automobile service center, marble/granite depot, or nursery. Long-term registered lease agreement available.",
    Status: "Approved"
  }
];

// Helper: Convert Google Drive Link or free upload link to direct thumbnail URL
function formatDriveImage(url, fallbackDesc) {
  let cleanUrl = (url || '').trim();

  // If no direct PhotoLink column, check if a photo link is included in Description
  if (!cleanUrl && fallbackDesc && typeof fallbackDesc === 'string') {
    const descMatch = fallbackDesc.match(/https?:\/\/[^\s"'<>]+\.(?:jpg|jpeg|png|webp|gif)/i) || fallbackDesc.match(/https?:\/\/files\.catbox\.moe\/[^\s"'<>]+/i);
    if (descMatch) {
      cleanUrl = descMatch[0];
    }
  }

  if (!cleanUrl) {
    return 'assets/images/placeholder.svg';
  }

  const match = cleanUrl.match(/\/d\/([a-zA-Z0-9_-]+)/) || cleanUrl.match(/id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return cleanUrl;
}

// Helper: WhatsApp URL Generator
function getWhatsAppUrl(phone, title) {
  const cleanPhone = (phone || '').replace(/\D/g, '');
  const finalPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;
  const message = encodeURIComponent(`Yes, I saw a listing on Karimnagar4You website for: "${title}". Is it still available?`);
  return `https://wa.me/${finalPhone}?text=${message}`;
}

// Helper: Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Normalizes arbitrary Google Sheet column headers
function normalizeRow(raw) {
  const normalized = {};
  for (const [key, val] of Object.entries(raw)) {
    const cleanKey = (key || '').trim().toLowerCase();
    const cleanVal = (val || '').trim();

    if (cleanKey.startsWith('title')) {
      normalized.Title = cleanVal;
    } else if (cleanKey.startsWith('category')) {
      normalized.Category = cleanVal;
    } else if (cleanKey.startsWith('start date') || cleanKey.startsWith('startdate')) {
      normalized.StartDate = cleanVal;
    } else if (cleanKey.startsWith('end date') || cleanKey.startsWith('enddate')) {
      normalized.EndDate = cleanVal;
    } else if (cleanKey.startsWith('timing')) {
      normalized.Timing = cleanVal;
    } else if (cleanKey.startsWith('street address') || cleanKey.startsWith('streetaddress')) {
      normalized.StreetAddress = cleanVal;
    } else if (cleanKey.startsWith('area')) {
      if (!cleanKey.includes('built')) {
        normalized.Area = cleanVal;
      }
    } else if (cleanKey.startsWith('landmark')) {
      normalized.Landmark = cleanVal;
    } else if (cleanKey.startsWith('organizer')) {
      normalized.OrganizerName = cleanVal;
    } else if (cleanKey.startsWith('owner')) {
      normalized.OwnerName = cleanVal;
    } else if (cleanKey.startsWith('contact') || cleanKey.startsWith('phone')) {
      normalized.ContactPhone = cleanVal;
    } else if (cleanKey.startsWith('ticket') || cleanKey.startsWith('price')) {
      normalized.TicketPrice = cleanVal;
    } else if (cleanKey.startsWith('photo') || cleanKey.startsWith('poster') || cleanKey.startsWith('image')) {
      normalized.PhotoLink = cleanVal;
    } else if (cleanKey.startsWith('description')) {
      normalized.Description = cleanVal;
    } else if (cleanKey.startsWith('status')) {
      normalized.Status = cleanVal;
    } else if (cleanKey.startsWith('property type') || cleanKey.startsWith('propertytype')) {
      normalized.PropertyType = cleanVal;
    } else if (cleanKey.startsWith('rent amount') || cleanKey.startsWith('rent')) {
      normalized.RentAmount = cleanVal;
    } else if (cleanKey.startsWith('built up area') || cleanKey.startsWith('built') || cleanKey.startsWith('builtup')) {
      normalized.BuiltUpArea = cleanVal;
    } else if (cleanKey.startsWith('key features') || cleanKey.startsWith('key') || cleanKey.startsWith('feature')) {
      normalized.KeyFeatures = cleanVal;
    }
  }
  return normalized;
}

// Fetch CSV from Google Sheets with normalization and graceful fallback
async function fetchSheetData(csvUrl, fallbackData) {
  if (!csvUrl || csvUrl.trim() === '') {
    return fallbackData;
  }

  return new Promise((resolve) => {
    if (typeof Papa === 'undefined') {
      console.warn("PapaParse not loaded, falling back to mock data");
      resolve(fallbackData);
      return;
    }

    Papa.parse(csvUrl, {
      download: true,
      header: true,
      skipEmptyLines: true,
      complete: function (results) {
        if (results && results.data && results.data.length > 0) {
          const normalizedRows = results.data.map(normalizeRow);

          const approved = normalizedRows.filter(row => {
            const status = (row.Status || '').toLowerCase();
            return status === 'approved';
          });

          if (approved.length > 0) {
            resolve(approved);
          } else {
            console.info("Google Sheet loaded, but no row with Status='Approved' found. Showing realistic preview listings.");
            resolve(fallbackData);
          }
        } else {
          resolve(fallbackData);
        }
      },
      error: function (err) {
        console.warn("Could not fetch CSV:", err, "Using fallback data.");
        resolve(fallbackData);
      }
    });
  });
}

// Populate Area Dropdown dynamically
function populateAreaFilter(items) {
  const areaSelect = document.getElementById('area-filter');
  if (!areaSelect) return;

  const currentVal = state.selectedArea;
  const uniqueAreas = [...new Set(items.map(item => (item.Area || '').trim()).filter(Boolean))].sort();

  areaSelect.innerHTML = '<option value="">All Localities in Karimnagar</option>';
  uniqueAreas.forEach(area => {
    const opt = document.createElement('option');
    opt.value = area;
    opt.textContent = area;
    if (area === currentVal) opt.selected = true;
    areaSelect.appendChild(opt);
  });
}

// Populate Category Dropdown based on active tab
function populateCategoryFilter(activeTab) {
  const catSelect = document.getElementById('category-filter');
  if (!catSelect) return;

  catSelect.innerHTML = '';

  if (activeTab === 'events') {
    const categories = ['All Categories', 'Expo', 'Festival', 'Workshop', 'Sale', 'Sports', 'Community'];
    categories.forEach(cat => {
      const val = cat === 'All Categories' ? '' : cat;
      const opt = document.createElement('option');
      opt.value = val;
      opt.textContent = cat;
      if (val === state.selectedCategory) opt.selected = true;
      catSelect.appendChild(opt);
    });
  } else {
    const types = ['All Property Types', 'Commercial Shutter', 'Office Space', '1 BHK', '2 BHK', '3 BHK', 'Open Land', 'Community Space'];
    types.forEach(t => {
      const val = t === 'All Property Types' ? '' : t;
      const opt = document.createElement('option');
      opt.value = val;
      opt.textContent = t;
      if (val === state.selectedCategory) opt.selected = true;
      catSelect.appendChild(opt);
    });
  }
}

// Filter and sort items
function getFilteredItems() {
  const dataset = state.activeTab === 'events' ? state.events : state.rentals;

  return dataset.filter(item => {
    if (state.searchQuery) {
      const q = state.searchQuery.toLowerCase();
      const title = (item.Title || '').toLowerCase();
      const area = (item.Area || '').toLowerCase();
      const landmark = (item.Landmark || '').toLowerCase();
      const desc = (item.Description || '').toLowerCase();
      const person = ((item.OrganizerName || item.OwnerName) || '').toLowerCase();
      const typeOrCat = ((item.Category || item.PropertyType) || '').toLowerCase();

      const matches = title.includes(q) || area.includes(q) || landmark.includes(q) || desc.includes(q) || person.includes(q) || typeOrCat.includes(q);
      if (!matches) return false;
    }

    if (state.selectedArea && (item.Area || '').trim() !== state.selectedArea) {
      return false;
    }

    if (state.selectedCategory) {
      const itemCat = state.activeTab === 'events' ? item.Category : item.PropertyType;
      if ((itemCat || '').trim().toLowerCase() !== state.selectedCategory.toLowerCase()) {
        return false;
      }
    }

    return true;
  });
}

// Render Event Card
function createEventCard(event, isList = false) {
  const imgUrl = formatDriveImage(event.PhotoLink, event.Description);
  const waUrl = getWhatsAppUrl(event.ContactPhone, event.Title);
  const telUrl = `tel:+91${(event.ContactPhone || '').replace(/\D/g, '')}`;
  const dateStr = event.StartDate ? (event.EndDate && event.EndDate !== event.StartDate ? `${event.StartDate} to ${event.EndDate}` : event.StartDate) : 'Upcoming';
  const price = event.TicketPrice || 'Free Entry';

  if (isList) {
    return `
      <article class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 card-hover-effect flex flex-col md:flex-row gap-5 items-start md:items-center justify-between shadow-sm">
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full md:w-auto flex-1">
          <div class="relative w-full sm:w-44 h-36 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0">
            <img src="${imgUrl}" alt="${escapeHtml(event.Title)}" class="w-full h-full object-cover" loading="lazy" onerror="this.src='assets/images/placeholder.svg';">
            <span class="absolute top-2 left-2 px-2.5 py-0.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold bg-amber-500 text-white shadow-sm">
              ${escapeHtml(event.Category || 'Event')}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-1.5">
              <span class="font-mono text-xs uppercase tracking-wider px-2 py-0.5 rounded-md bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50">
                ${escapeHtml(dateStr)}
              </span>
              <span class="font-mono text-xs uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                ${escapeHtml(event.Area || 'Karimnagar')}
              </span>
              <span class="font-mono text-xs uppercase tracking-wider font-bold text-neutral-900 dark:text-white ml-auto sm:ml-0">
                ${escapeHtml(price)}
              </span>
            </div>
            <h3 class="font-serif text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1 hover:text-amber-600 transition-colors line-clamp-1 cursor-pointer" onclick="openDetailModal('events', '${escapeHtml(event.Title)}')">
              ${escapeHtml(event.Title)}
            </h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-2">
              ${escapeHtml(event.Description || '')}
            </p>
            <p class="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-500">
              ${escapeHtml(event.StreetAddress || '')} ${event.Landmark ? `(Near ${escapeHtml(event.Landmark)})` : ''}
            </p>
          </div>
        </div>
        <div class="flex sm:flex-row md:flex-col gap-2 w-full md:w-36 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100 dark:border-neutral-800">
          <button onclick="openDetailModal('events', '${escapeHtml(event.Title)}')" class="flex-1 py-2 px-3 font-sans font-medium text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-center">
            Details
          </button>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 py-2 px-3 font-sans font-medium text-xs rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm">
            <span>WhatsApp</span>
          </a>
          <a href="${telUrl}" class="flex-1 py-2 px-3 font-sans font-medium text-xs rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1.5 shadow-sm">
            <span>Call</span>
          </a>
        </div>
      </article>
    `;
  }

  return `
    <article class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm card-hover-effect flex flex-col justify-between">
      <div>
        <div class="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800 cursor-pointer" onclick="openDetailModal('events', '${escapeHtml(event.Title)}')">
          <img src="${imgUrl}" alt="${escapeHtml(event.Title)}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" onerror="this.src='assets/images/placeholder.svg';">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
          <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full font-mono text-xs uppercase tracking-wider font-bold bg-amber-500 text-white shadow-md">
            ${escapeHtml(event.Category || 'Event')}
          </span>
          <div class="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white font-mono text-xs uppercase tracking-wider">
            <span class="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md">
              ${escapeHtml(event.Area || 'Karimnagar')}
            </span>
            <span class="bg-neutral-900/80 backdrop-blur-md px-2 py-0.5 rounded-md font-bold text-amber-300">
              ${escapeHtml(price)}
            </span>
          </div>
        </div>

        <div class="p-4 sm:p-5">
          <div class="flex items-center gap-2 mb-2">
            <span class="font-mono text-xs uppercase tracking-wider text-amber-800 dark:text-amber-400 bg-amber-50 dark:bg-amber-950/40 px-2 py-0.5 rounded border border-amber-200/80 dark:border-amber-900/50">
              ${escapeHtml(dateStr)}
            </span>
            ${event.Timing ? `<span class="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">${escapeHtml(event.Timing)}</span>` : ''}
          </div>

          <h3 class="font-serif text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-1 hover:text-amber-600 transition-colors cursor-pointer" onclick="openDetailModal('events', '${escapeHtml(event.Title)}')">
            ${escapeHtml(event.Title)}
          </h3>

          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-4 leading-relaxed">
            ${escapeHtml(event.Description || '')}
          </p>

          <div class="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-800/80 pt-3 flex items-center justify-between">
            <span class="truncate max-w-[200px]">${escapeHtml(event.StreetAddress || event.Area || '')}</span>
            ${event.OrganizerName ? `<span class="truncate max-w-[120px] text-neutral-400">${escapeHtml(event.OrganizerName)}</span>` : ''}
          </div>
        </div>
      </div>

      <div class="p-4 sm:p-5 pt-0 grid grid-cols-3 gap-2">
        <button onclick="openDetailModal('events', '${escapeHtml(event.Title)}')" class="py-2 px-2 font-sans font-medium text-xs rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-center">
          Details
        </button>
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="py-2 px-2 font-sans font-medium text-xs rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors text-center flex items-center justify-center gap-1 shadow-sm">
          <span>WhatsApp</span>
        </a>
        <a href="${telUrl}" class="py-2 px-2 font-sans font-medium text-xs rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors text-center flex items-center justify-center gap-1 shadow-sm">
          <span>Call</span>
        </a>
      </div>
    </article>
  `;
}

// Render Rental Card
function createRentalCard(rental, isList = false) {
  const imgUrl = formatDriveImage(rental.PhotoLink, rental.Description);
  const waUrl = getWhatsAppUrl(rental.ContactPhone, rental.Title);
  const telUrl = `tel:+91${(rental.ContactPhone || '').replace(/\D/g, '')}`;
  const price = rental.RentAmount || 'Contact for Rent';
  const areaSq = rental.BuiltUpArea || 'Spacious';

  if (isList) {
    return `
      <article class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-4 sm:p-5 card-hover-effect flex flex-col md:flex-row gap-5 items-start md:items-center justify-between shadow-sm">
        <div class="flex flex-col sm:flex-row gap-4 items-start sm:items-center w-full md:w-auto flex-1">
          <div class="relative w-full sm:w-44 h-36 rounded-xl overflow-hidden bg-neutral-100 dark:bg-neutral-800 flex-shrink-0">
            <img src="${imgUrl}" alt="${escapeHtml(rental.Title)}" class="w-full h-full object-cover" loading="lazy" onerror="this.src='assets/images/placeholder.svg';">
            <span class="absolute top-2 left-2 px-2.5 py-0.5 rounded-full font-mono text-xs uppercase tracking-wider font-bold bg-emerald-600 text-white shadow-sm">
              ${escapeHtml(rental.PropertyType || 'Rental')}
            </span>
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex flex-wrap items-center gap-2 mb-1.5">
              <span class="font-mono text-xs uppercase tracking-wider font-bold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50">
                ${escapeHtml(price)}
              </span>
              <span class="font-mono text-xs uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                ${escapeHtml(areaSq)}
              </span>
              <span class="font-mono text-xs uppercase tracking-wider px-2 py-0.5 rounded-md bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                ${escapeHtml(rental.Area || 'Karimnagar')}
              </span>
            </div>
            <h3 class="font-serif text-lg sm:text-xl font-bold text-neutral-900 dark:text-neutral-100 mb-1 hover:text-emerald-600 transition-colors line-clamp-1 cursor-pointer" onclick="openDetailModal('rentals', '${escapeHtml(rental.Title)}')">
              ${escapeHtml(rental.Title)}
            </h3>
            <p class="text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-2">
              ${escapeHtml(rental.Description || '')}
            </p>
            <p class="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-500">
              Features: ${escapeHtml(rental.KeyFeatures || 'Direct Owner Listing')}
            </p>
          </div>
        </div>
        <div class="flex sm:flex-row md:flex-col gap-2 w-full md:w-36 flex-shrink-0 pt-2 md:pt-0 border-t md:border-t-0 border-neutral-100 dark:border-neutral-800">
          <button onclick="openDetailModal('rentals', '${escapeHtml(rental.Title)}')" class="flex-1 py-2 px-3 font-sans font-medium text-xs rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-center">
            Details
          </button>
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 py-2 px-3 font-sans font-medium text-xs rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-1.5 shadow-sm">
            <span>WhatsApp</span>
          </a>
          <a href="${telUrl}" class="flex-1 py-2 px-3 font-sans font-medium text-xs rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors flex items-center justify-center gap-1.5 shadow-sm">
            <span>Call</span>
          </a>
        </div>
      </article>
    `;
  }

  return `
    <article class="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm card-hover-effect flex flex-col justify-between">
      <div>
        <div class="relative aspect-[16/10] overflow-hidden bg-neutral-100 dark:bg-neutral-800 cursor-pointer" onclick="openDetailModal('rentals', '${escapeHtml(rental.Title)}')">
          <img src="${imgUrl}" alt="${escapeHtml(rental.Title)}" class="w-full h-full object-cover transition-transform duration-500 hover:scale-105" loading="lazy" onerror="this.src='assets/images/placeholder.svg';">
          <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent"></div>
          <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full font-mono text-xs uppercase tracking-wider font-bold bg-emerald-600 text-white shadow-md">
            ${escapeHtml(rental.PropertyType || 'Rental')}
          </span>
          <div class="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white font-mono text-xs uppercase tracking-wider">
            <span class="bg-black/60 backdrop-blur-md px-2 py-0.5 rounded-md">
              ${escapeHtml(rental.Area || 'Karimnagar')}
            </span>
            <span class="bg-neutral-900/80 backdrop-blur-md px-2 py-0.5 rounded-md font-bold text-emerald-300">
              ${escapeHtml(areaSq)}
            </span>
          </div>
        </div>

        <div class="p-4 sm:p-5">
          <div class="flex items-center justify-between mb-2">
            <span class="font-mono text-xs uppercase tracking-wider font-bold text-emerald-800 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-1 rounded border border-emerald-200/80 dark:border-emerald-900/50">
              ${escapeHtml(price)}
            </span>
            <span class="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400">
              ${rental.Landmark ? `Near ${escapeHtml(rental.Landmark)}` : 'Verified Area'}
            </span>
          </div>

          <h3 class="font-serif text-lg font-bold text-neutral-900 dark:text-neutral-100 mb-2 line-clamp-1 hover:text-emerald-600 transition-colors cursor-pointer" onclick="openDetailModal('rentals', '${escapeHtml(rental.Title)}')">
            ${escapeHtml(rental.Title)}
          </h3>

          <p class="text-xs sm:text-sm text-neutral-600 dark:text-neutral-400 line-clamp-2 mb-3 leading-relaxed">
            ${escapeHtml(rental.Description || '')}
          </p>

          <div class="font-mono text-xs uppercase tracking-wider text-neutral-500 dark:text-neutral-400 border-t border-neutral-100 dark:border-neutral-800/80 pt-3 flex items-center justify-between">
            <span class="truncate max-w-[180px]">${escapeHtml(rental.StreetAddress || rental.Area || '')}</span>
            <span class="truncate max-w-[120px] text-neutral-400">${rental.OwnerName ? `Owner: ${escapeHtml(rental.OwnerName)}` : 'Verified Owner'}</span>
          </div>
        </div>
      </div>

      <div class="p-4 sm:p-5 pt-0 grid grid-cols-3 gap-2">
        <button onclick="openDetailModal('rentals', '${escapeHtml(rental.Title)}')" class="py-2 px-2 font-sans font-medium text-xs rounded-xl bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition-colors text-center">
          Details
        </button>
        <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="py-2 px-2 font-sans font-medium text-xs rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white transition-colors text-center flex items-center justify-center gap-1 shadow-sm">
          <span>WhatsApp</span>
        </a>
        <a href="${telUrl}" class="py-2 px-2 font-sans font-medium text-xs rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors text-center flex items-center justify-center gap-1 shadow-sm">
          <span>Call</span>
        </a>
      </div>
    </article>
  `;
}

// Render Listings Container
function renderListings() {
  const container = document.getElementById('listings-container');
  const countEl = document.getElementById('listings-count');
  if (!container) return;

  const items = getFilteredItems();

  if (countEl) {
    countEl.textContent = `Showing ${items.length} verified ${state.activeTab === 'events' ? 'events' : 'properties'}`;
  }

  if (items.length === 0) {
    container.className = 'w-full py-16 text-center';
    container.innerHTML = `
      <div class="max-w-md mx-auto p-8 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 shadow-sm">
        <div class="w-14 h-14 mx-auto mb-4 rounded-full bg-neutral-100 dark:bg-neutral-800 flex items-center justify-center font-mono text-xs uppercase tracking-wider font-bold text-neutral-500">
          NULL
        </div>
        <h3 class="font-serif text-xl font-bold text-neutral-900 dark:text-white mb-2">No Listings Found</h3>
        <p class="text-sm text-neutral-600 dark:text-neutral-400 mb-6">
          No matches found for your current filter or search term. Try resetting your search filters or check another category.
        </p>
        <button onclick="resetFilters()" class="px-5 py-2.5 rounded-xl bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 font-sans font-medium text-sm hover:opacity-90 transition-opacity">
          Reset All Filters
        </button>
      </div>
    `;
    return;
  }

  const isList = state.viewMode === 'list';
  if (isList) {
    container.className = 'flex flex-col gap-4';
  } else {
    container.className = 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6';
  }

  const html = items.map(item => {
    return state.activeTab === 'events' ? createEventCard(item, isList) : createRentalCard(item, isList);
  }).join('');

  container.innerHTML = html;
}

// Reset Filters
window.resetFilters = function () {
  state.searchQuery = '';
  state.selectedArea = '';
  state.selectedCategory = '';

  const searchInput = document.getElementById('search-input');
  const areaSelect = document.getElementById('area-filter');
  const catSelect = document.getElementById('category-filter');

  if (searchInput) searchInput.value = '';
  if (areaSelect) areaSelect.value = '';
  if (catSelect) catSelect.value = '';

  renderListings();
};

// Switch Active Tab (Events vs Rentals)
window.switchTab = function (tabName) {
  if (state.activeTab === tabName) return;
  state.activeTab = tabName;
  state.selectedCategory = '';

  const eventTabBtn = document.getElementById('tab-events-btn');
  const rentalTabBtn = document.getElementById('tab-rentals-btn');

  if (tabName === 'events') {
    if (eventTabBtn) {
      eventTabBtn.className = "px-5 py-2 rounded-xl font-sans font-medium text-sm bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md transition-all flex items-center gap-2";
    }
    if (rentalTabBtn) {
      rentalTabBtn.className = "px-5 py-2 rounded-xl font-sans font-medium text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all flex items-center gap-2";
    }
  } else {
    if (rentalTabBtn) {
      rentalTabBtn.className = "px-5 py-2 rounded-xl font-sans font-medium text-sm bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 shadow-md transition-all flex items-center gap-2";
    }
    if (eventTabBtn) {
      eventTabBtn.className = "px-5 py-2 rounded-xl font-sans font-medium text-sm text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-white transition-all flex items-center gap-2";
    }
  }

  const dataset = tabName === 'events' ? state.events : state.rentals;
  populateAreaFilter(dataset);
  populateCategoryFilter(tabName);

  renderListings();
};

// Switch View Mode (Grid vs List)
window.switchViewMode = function (mode) {
  state.viewMode = mode;
  const gridBtn = document.getElementById('view-grid-btn');
  const listBtn = document.getElementById('view-list-btn');

  if (mode === 'grid') {
    if (gridBtn) gridBtn.className = "p-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white transition-colors";
    if (listBtn) listBtn.className = "p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors";
  } else {
    if (listBtn) listBtn.className = "p-2 rounded-lg bg-neutral-200 dark:bg-neutral-700 text-neutral-900 dark:text-white transition-colors";
    if (gridBtn) gridBtn.className = "p-2 rounded-lg text-neutral-500 hover:bg-neutral-100 dark:hover:bg-neutral-800 transition-colors";
  }

  renderListings();
};

// Hero Carousel Manager
function initHeroCarousel() {
  const carouselEl = document.getElementById('hero-carousel');
  const dotsContainer = document.getElementById('carousel-dots');
  if (!carouselEl) return;

  const featured = [
    {
      title: "Discover Karimnagar: Expo, Cultural Fests & City Events",
      subtitle: "Explore live exhibitions, music nights, and community gatherings across Karimnagar.",
      image: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?auto=format&fit=crop&w=1600&q=80",
      badge: "FEATURED EVENTS",
      tagColor: "bg-amber-500",
      tabTarget: "events"
    },
    {
      title: "Commercial Shutters, Office Spaces & Homes for Rent",
      subtitle: "Direct contact with verified owners across Mukarrampur, Collectorate Road, Vavilalapally & Kothirampur.",
      image: "https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80",
      badge: "VERIFIED RENTALS",
      tagColor: "bg-emerald-600",
      tabTarget: "rentals"
    },
    {
      title: "Karimnagar Handloom & Craft Expo 2026",
      subtitle: "Telangana Handloom Weavers & Silver Filigree artisans showcase at Circus Ground.",
      image: "https://images.unsplash.com/photo-1607604276583-eef5d076aa5f?auto=format&fit=crop&w=1600&q=80",
      badge: "HAPPENING THIS MONTH",
      tagColor: "bg-amber-500",
      tabTarget: "events"
    }
  ];

  function renderCarouselSlide(idx) {
    const item = featured[idx];
    carouselEl.innerHTML = `
      <div class="relative w-full h-full min-h-[280px] sm:min-h-[360px] md:min-h-[420px] rounded-2xl overflow-hidden carousel-slide">
        <img src="${item.image}" alt="${escapeHtml(item.title)}" class="w-full h-full object-cover">
        <div class="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/65 to-neutral-950/20"></div>
        
        <div class="absolute inset-0 p-6 sm:p-10 md:p-14 flex flex-col justify-end max-w-3xl">
          <span class="inline-block px-3 py-1 mb-3 rounded-full font-mono text-xs uppercase tracking-wider font-bold text-white ${item.tagColor} w-max shadow-md">
            ${item.badge}
          </span>
          <h2 class="font-serif font-black tracking-tight text-2xl sm:text-4xl md:text-5xl text-white leading-tight mb-3">
            ${escapeHtml(item.title)}
          </h2>
          <p class="text-sm sm:text-base text-neutral-300 mb-5 leading-relaxed line-clamp-2">
            ${escapeHtml(item.subtitle)}
          </p>
          <div class="flex flex-wrap gap-3">
            <button onclick="switchTab('${item.tabTarget}')" class="px-5 py-2.5 rounded-xl font-sans font-medium text-xs sm:text-sm bg-white text-neutral-900 hover:bg-neutral-100 transition-colors shadow-lg">
              Explore ${item.tabTarget === 'events' ? 'Events' : 'Rentals'} &rarr;
            </button>
            <a href="post.html" class="px-5 py-2.5 rounded-xl font-sans font-medium text-xs sm:text-sm bg-neutral-900/80 hover:bg-neutral-900 text-white border border-neutral-700/80 backdrop-blur-md transition-colors shadow-lg">
              + Post Your Listing Free
            </a>
          </div>
        </div>
      </div>
    `;

    if (dotsContainer) {
      dotsContainer.innerHTML = featured.map((_, i) => `
        <button onclick="setCarouselSlide(${i})" class="h-2 rounded-full transition-all duration-300 ${i === idx ? 'w-8 bg-white' : 'w-2 bg-white/40 hover:bg-white/70'}" aria-label="Slide ${i + 1}"></button>
      `).join('');
    }
  }

  window.setCarouselSlide = function (idx) {
    state.currentCarouselIndex = idx;
    renderCarouselSlide(idx);
    resetCarouselTimer();
  };

  window.nextCarouselSlide = function () {
    state.currentCarouselIndex = (state.currentCarouselIndex + 1) % featured.length;
    renderCarouselSlide(state.currentCarouselIndex);
    resetCarouselTimer();
  };

  window.prevCarouselSlide = function () {
    state.currentCarouselIndex = (state.currentCarouselIndex - 1 + featured.length) % featured.length;
    renderCarouselSlide(state.currentCarouselIndex);
    resetCarouselTimer();
  };

  function resetCarouselTimer() {
    if (state.carouselTimer) clearInterval(state.carouselTimer);
    state.carouselTimer = setInterval(() => {
      state.currentCarouselIndex = (state.currentCarouselIndex + 1) % featured.length;
      renderCarouselSlide(state.currentCarouselIndex);
    }, 6000);
  }

  renderCarouselSlide(0);
  resetCarouselTimer();
}

// Detail Modal Controller
window.openDetailModal = function (type, title) {
  const dataset = type === 'events' ? state.events : state.rentals;
  const item = dataset.find(i => i.Title === title);
  if (!item) return;

  const modal = document.getElementById('detail-modal');
  const body = document.getElementById('detail-modal-body');
  if (!modal || !body) return;

  const isEvent = type === 'events';
  const imgUrl = formatDriveImage(item.PhotoLink, item.Description);
  const waUrl = getWhatsAppUrl(item.ContactPhone, item.Title);
  const telUrl = `tel:+91${(item.ContactPhone || '').replace(/\D/g, '')}`;

  body.innerHTML = `
    <div class="relative aspect-[16/9] w-full bg-neutral-900 rounded-2xl overflow-hidden mb-6">
      <img src="${imgUrl}" alt="${escapeHtml(item.Title)}" class="w-full h-full object-cover" onerror="this.src='assets/images/placeholder.svg';">
      <span class="absolute top-4 left-4 px-3 py-1 rounded-full font-mono text-xs uppercase tracking-wider font-bold text-white ${isEvent ? 'bg-amber-500' : 'bg-emerald-600'} shadow-lg">
        ${escapeHtml((isEvent ? item.Category : item.PropertyType) || 'Listing')}
      </span>
      <div class="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white font-mono text-xs uppercase tracking-wider">
        <span class="bg-black/70 backdrop-blur-md px-3 py-1 rounded-lg">
          ${escapeHtml(item.Area || 'Karimnagar')}
        </span>
        <span class="bg-neutral-900/90 backdrop-blur-md px-3 py-1 rounded-lg font-bold ${isEvent ? 'text-amber-300' : 'text-emerald-300'}">
          ${isEvent ? escapeHtml(item.TicketPrice || 'Free Entry') : escapeHtml(item.RentAmount || 'Contact for Rent')}
        </span>
      </div>
    </div>

    <div class="space-y-4">
      <h2 class="font-serif font-black tracking-tight text-2xl sm:text-3xl text-neutral-900 dark:text-white leading-tight">
        ${escapeHtml(item.Title)}
      </h2>

      <div class="flex flex-wrap gap-2 pt-1 pb-3 border-b border-neutral-100 dark:border-neutral-800">
        ${isEvent ? `
          <div class="font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200 dark:border-amber-900/50">
            <strong>Dates:</strong> ${escapeHtml(item.StartDate || '')} ${item.EndDate ? `to ${escapeHtml(item.EndDate)}` : ''}
          </div>
          ${item.Timing ? `
            <div class="font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
              <strong>Timing:</strong> ${escapeHtml(item.Timing)}
            </div>
          ` : ''}
        ` : `
          <div class="font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-900/50">
            <strong>Built-up Area:</strong> ${escapeHtml(item.BuiltUpArea || 'N/A')}
          </div>
          <div class="font-mono text-xs uppercase tracking-wider px-3 py-1.5 rounded-lg bg-neutral-100 dark:bg-neutral-800 text-neutral-700 dark:text-neutral-300">
            <strong>Type:</strong> ${escapeHtml(item.PropertyType || 'Rental')}
          </div>
        `}
      </div>

      <div class="p-4 rounded-xl bg-neutral-50 dark:bg-neutral-800/60 border border-neutral-200 dark:border-neutral-700/60 space-y-1.5 text-xs sm:text-sm">
        <p class="text-neutral-900 dark:text-neutral-100 font-medium">
          <strong>Full Address:</strong> ${escapeHtml(item.StreetAddress || 'Karimnagar City')}
        </p>
        <p class="text-neutral-600 dark:text-neutral-400">
          <strong>Locality / Area:</strong> ${escapeHtml(item.Area || 'Karimnagar')}
        </p>
        ${item.Landmark ? `
          <p class="text-neutral-600 dark:text-neutral-400">
            <strong>Key Landmark:</strong> ${escapeHtml(item.Landmark)}
          </p>
        ` : ''}
        ${!isEvent && item.KeyFeatures ? `
          <p class="text-emerald-700 dark:text-emerald-400 font-medium pt-1">
            <strong>Features:</strong> ${escapeHtml(item.KeyFeatures)}
          </p>
        ` : ''}
      </div>

      <div>
        <h3 class="font-mono text-xs uppercase tracking-wider text-neutral-400 font-semibold mb-2">Description & Details</h3>
        <p class="text-sm sm:text-base text-neutral-700 dark:text-neutral-300 leading-relaxed whitespace-pre-line">
          ${escapeHtml(item.Description || 'No description provided.')}
        </p>
      </div>

      <div class="pt-4 border-t border-neutral-100 dark:border-neutral-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <span class="font-mono text-xs uppercase tracking-wider text-neutral-400 block">${isEvent ? 'Event Organizer' : 'Property Contact / Owner'}</span>
          <span class="font-semibold text-neutral-900 dark:text-white text-sm sm:text-base">
            ${escapeHtml((isEvent ? item.OrganizerName : item.OwnerName) || 'Verified Contact')}
          </span>
          <span class="font-mono text-xs block text-neutral-500">${escapeHtml(item.ContactPhone || '')}</span>
        </div>
        <div class="flex gap-2 w-full sm:w-auto">
          <a href="${waUrl}" target="_blank" rel="noopener noreferrer" class="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-sans font-medium text-xs sm:text-sm bg-emerald-600 hover:bg-emerald-700 text-white transition-colors flex items-center justify-center gap-2 shadow-sm">
            <span>Chat on WhatsApp</span>
          </a>
          <a href="${telUrl}" class="flex-1 sm:flex-none px-5 py-2.5 rounded-xl font-sans font-medium text-xs sm:text-sm bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 hover:bg-neutral-800 dark:hover:bg-neutral-100 transition-colors flex items-center justify-center gap-2 shadow-sm">
            <span>Call Now</span>
          </a>
        </div>
      </div>
    </div>
  `;

  modal.classList.remove('hidden');
  document.body.style.overflow = 'hidden';
};

window.closeDetailModal = function () {
  const modal = document.getElementById('detail-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

// Submit Modal ("+ List Yours")
window.openSubmitModal = function () {
  const modal = document.getElementById('submit-modal');
  if (modal) {
    modal.classList.remove('hidden');
    document.body.style.overflow = 'hidden';
  }
};

window.closeSubmitModal = function () {
  const modal = document.getElementById('submit-modal');
  if (modal) {
    modal.classList.add('hidden');
    document.body.style.overflow = '';
  }
};

// Event Listeners on DOM Ready
document.addEventListener('DOMContentLoaded', async () => {
  const eventsCsvUrl = (window.SITE_CONFIG && window.SITE_CONFIG.eventsCsvUrl) || '';
  const rentalsCsvUrl = (window.SITE_CONFIG && window.SITE_CONFIG.rentalsCsvUrl) || '';

  initHeroCarousel();

  try {
    const [eventsData, rentalsData] = await Promise.all([
      fetchSheetData(eventsCsvUrl, MOCK_EVENTS),
      fetchSheetData(rentalsCsvUrl, MOCK_RENTALS)
    ]);

    state.events = eventsData;
    state.rentals = rentalsData;
  } catch (err) {
    console.error("Error loading data:", err);
    state.events = MOCK_EVENTS;
    state.rentals = MOCK_RENTALS;
  } finally {
    state.isLoading = false;
  }

  populateAreaFilter(state.events);
  populateCategoryFilter('events');

  renderListings();

  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value.trim();
      renderListings();
    });
  }

  const areaSelect = document.getElementById('area-filter');
  if (areaSelect) {
    areaSelect.addEventListener('change', (e) => {
      state.selectedArea = e.target.value;
      renderListings();
    });
  }

  const catSelect = document.getElementById('category-filter');
  if (catSelect) {
    catSelect.addEventListener('change', (e) => {
      state.selectedCategory = e.target.value;
      renderListings();
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeDetailModal();
      closeSubmitModal();
    }
  });

  const detailModal = document.getElementById('detail-modal');
  if (detailModal) {
    detailModal.addEventListener('click', (e) => {
      if (e.target === detailModal) closeDetailModal();
    });
  }

  const submitModal = document.getElementById('submit-modal');
  if (submitModal) {
    submitModal.addEventListener('click', (e) => {
      if (e.target === submitModal) closeSubmitModal();
    });
  }
});
