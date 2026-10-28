# Karimnagar4You — Complete Project Specification & AI Generator Instructions

> **Project Name:** Karimnagar4You (`karimnagar4you.github.io`)  
> **Platform & Engine:** Jekyll Static Site Generator hosted on GitHub Pages  
> **Backend Architecture:** Zero-Backend (Google Forms → Google Sheets → Published CSV → Client-side Fetch & Render)  
> **Design Philosophy:** Editorial-Clean, High-Contrast Typography, Dual-Mode (Light/Dark), Mobile-First Directory  

---

## 1. Executive Summary & Purpose

**Karimnagar4You** is a hyper-local community discovery web portal for the city of **Karimnagar**. It serves two primary public needs:
1. **Events Directory:** Local expos, cultural fests, exhibitions, workshops, fairs, and community gatherings.
2. **Rent & Lease Marketplace:** Commercial shops/shutters, office spaces, residential rentals (1 BHK, 2 BHK, 3 BHK), open land, and shared community spaces.

The site is 100% free to operate, hosted natively via **GitHub Pages**, styled with **Tailwind CSS**, and uses **Google Sheets as a live database** so the site owner can moderate listings on mobile without touching code or Git.

---

## 2. Architecture & Data Flow (Zero-Backend Engine)

```
[ Visitor on Website ]
         │
         ├──> Reads Listings (Instant client-side fetch from Google Sheet CSV)
         └──> Clicks "Post an Event" or "Post a Rental"
                    │
                    ▼
         [ 2 Separate Google Forms ]
         ├── Form A: Event Submission Form
         └── Form B: Rental/Lease Submission Form
                    │
                    ▼ (Auto-logged)
         [ Single Master Google Spreadsheet ]
         ├── Tab 1: "Events" Sheet
         └── Tab 2: "Rentals" Sheet
                    │
                    ▼ (Admin checks row & sets Status = "Approved")
         [ Google Sheets "Publish to Web" as CSV ]
                    │
                    ▼ (Public CSV Links)
         [ Jekyll Website (Client-Side JS Fetch) ]
         ├── Parses CSV via PapaParse or Vanilla JS
         ├── Auto-extracts dynamic Area / Locality filters
         ├── Live search & category filters (0ms lag)
         └── Draws responsive Grid / List Cards
```

---

## 3. Data Schema & Google Forms Structure

The project uses **two separate Google Forms** feeding into **two sheets/tabs within the same Google Spreadsheet**.

### Form A: "Post an Event" (Tab: `Events`)
| Column Header | Field Type | Description / Example |
| :--- | :--- | :--- |
| `Timestamp` | Auto | Submission date/time |
| `Title` | Short Text | e.g. *Karimnagar Handloom & Craft Expo 2026* |
| `Category` | Dropdown | `Expo`, `Festival`, `Workshop`, `Sale`, `Sports`, `Community` |
| `StartDate` | Date | `YYYY-MM-DD` |
| `EndDate` | Date | `YYYY-MM-DD` |
| `Timing` | Short Text | e.g. `10:00 AM - 9:00 PM` |
| `StreetAddress` | Short Text | e.g. *Near Circus Ground, Collectorate Road* |
| `Area` | Short Text | e.g. *Mukarrampur*, *Kothirampur*, *Mankammathota* |
| `Landmark` | Short Text | e.g. *Opposite Arts College Ground* |
| `OrganizerName` | Short Text | Name of company/individual |
| `ContactPhone` | Short Text | 10-digit Indian mobile number (e.g. `9876543210`) |
| `TicketPrice` | Short Text | `Free` or amount in INR (e.g. `₹50`) |
| `PhotoLink` | Short Text | Google Drive shareable link / direct image URL |
| `Description` | Long Text | Event overview, highlights, entry terms |
| `Status` | Admin Text | **`Approved`** (only rows marked `Approved` show on the site) |

---

### Form B: "Post a Rental / Lease Space" (Tab: `Rentals`)
| Column Header | Field Type | Description / Example |
| :--- | :--- | :--- |
| `Timestamp` | Auto | Submission date/time |
| `Title` | Short Text | e.g. *Spacious 2 BHK East Facing Flat* or *Commercial Shutter on Main Road* |
| `PropertyType` | Dropdown | `Commercial Shutter`, `Office Space`, `1 BHK`, `2 BHK`, `3 BHK`, `Open Land`, `Community Space` |
| `RentAmount` | Short Text | Monthly rent or lease price (e.g. `₹12,000/mo` or `₹50,000/lease`) |
| `BuiltUpArea` | Short Text | e.g. `1,200 SFT` or `200 Sq. Yards` |
| `StreetAddress` | Short Text | e.g. *H.No 4-2-105, Bypass Road* |
| `Area` | Short Text | e.g. *Kashmirgadda*, *Vavilalapally*, *Jyothinagar* |
| `Landmark` | Short Text | e.g. *Behind Geetha Bhavan* |
| `OwnerName` | Short Text | Name of property owner/broker |
| `ContactPhone` | Short Text | 10-digit Indian mobile number |
| `PhotoLink` | Short Text | Google Drive shareable link / direct image URL |
| `KeyFeatures` | Short Text | e.g. `Car Parking, 24/7 Bore Water, Lift` |
| `Description` | Long Text | Full details, advance deposit requirements, restrictions |
| `Status` | Admin Text | **`Approved`** (only rows marked `Approved` show on the site) |

---

## 4. Design System & Visual Specification

Incorporated from `design.md` and `design_system.md`:

### 4.1 Typography Strategy
* **Editorial Headlines (`font-serif font-black tracking-tight`):**
  * Brand Logo (*Karimnagar4You*), Hero Carousel Display Titles, Section Headings (`H2`), and Card Titles (`H3`).
  * Fonts: *Playfair Display*, *Cinzel*, or *Merriweather* (via Google Fonts).
* **Modern Body (`font-sans`):**
  * Navigation links, descriptions, filter inputs, modal text.
  * Fonts: *Inter* or *Plus Jakarta Sans*.
* **Precision Badges & Metrics (`font-mono`):**
  * Dates (`2026-10-25`), prices (`₹15,000`), square footage (`1,500 SFT`), and badges.
  * Fonts: *JetBrains Mono* or *Fira Code*.

### 4.2 Light / Dark Color Tokens
* **Page Canvas:** `bg-neutral-50` (Light) $\leftrightarrow$ `dark:bg-neutral-950` (Dark)
* **Surfaces & Cards:** `bg-white border-neutral-200` $\leftrightarrow$ `dark:bg-neutral-800/90 dark:border-neutral-700/80`
* **Sticky Navbar:** `bg-white/85 dark:bg-neutral-900/85 backdrop-blur-md`
* **Semantic Badges:**
  * **Events:** `text-amber-800 bg-amber-50 border-amber-200` $\leftrightarrow$ `dark:text-amber-300 dark:bg-amber-950/50`
  * **Rentals:** `text-emerald-800 bg-emerald-50 border-emerald-200` $\leftrightarrow$ `dark:text-emerald-300 dark:bg-emerald-950/50`
  * **"NEW" Badge:** Solid amber pill (`bg-amber-500 text-white font-bold text-[10px]`)
* **Primary Buttons:** High-contrast inverse buttons:
  * Light: `bg-neutral-900 text-white hover:bg-neutral-800`
  * Dark: `dark:bg-white dark:text-neutral-900 dark:hover:bg-neutral-100`

---

## 5. UI Components & Layout Structure

### 5.1 Sticky Header (`_includes/navbar.html`)
* **Left:** Brand Icon + Title (`Karimnagar4You`) + micro subtitle (`Events & Rental Portal`).
* **Center:** Section Switcher Tabs:
  * `Events` pill
  * `Rent & Lease` pill
* **Right Controls:**
  * **Light/Dark Toggle Button:** Sun/Moon icon toggle reading/persisting `localStorage.theme`.
  * **"+ List Yours" CTA Button:** Opens a modal allowing user to choose "Post Event" or "Post Rental".
  * **Mobile Hamburger:** Smooth slide-down menu for phones.

### 5.2 Hero Carousel Banner (`_includes/banner.html`)
* Aspect ratio: `aspect-[21/9] min-h-[260px] sm:min-h-[340px] md:min-h-[400px]`.
* Border & Shadow: `rounded-2xl border-2 border-neutral-900 dark:border-neutral-700 shadow-xl overflow-hidden`.
* Dark vignette overlay: `bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/20`.
* Cycles through featured approved events and premium rentals with pagination pill dots.

### 5.3 Filter & Live Search Bar (`_includes/filters.html`)
* **Live Search Input:** Full-width input with search icon, filtering across Title, Area, Landmark, and Description.
* **Auto-Generated Area Filter Dropdown:** 
  * Automatically scans approved rows from the CSV, extracts unique `Area` values, and populates the dropdown dynamically (e.g. *All Areas*, *Mukarrampur*, *Kothirampur*, *Collectorate Road*, *Vavilalapally*).
* **Category / Type Dropdown:**
  * In Events mode: *All Categories*, *Expo*, *Festival*, *Workshop*, etc.
  * In Rentals mode: *All Types*, *Commercial Shutter*, *Office Space*, *1 BHK*, *2 BHK*, *3 BHK*, *Land*.
* **Segmented View Mode Toggle:** Switch between **Grid View** (3 columns) and **List View** (horizontal rows).
* **Live Counter:** Text display (e.g., *"Showing 8 verified listings"*).

### 5.4 Card Components & Direct Contact Actions
Each card (Grid or List) includes:
1. **Photo Display:** Displays Google Drive image via thumbnail converter with a clean fallback placeholder if empty.
2. **Badge Tags:** Category badge (Amber for Event, Emerald for Rental) + Area tag.
3. **Price / Date Overlay:** Prominent monospace display.
4. **Owner Direct Action Buttons:**
   * **Call Button:** `<a href="tel:+91XXXXXXXXXX">` with phone icon.
   * **WhatsApp Chat Button:** Opens WhatsApp with a pre-formatted message:
     ```
     https://wa.me/91XXXXXXXXXX?text=Yes,%20I%20saw%20a%20listing%20on%20Karimnagar4You%20website.
     ```
5. **"View Details" Modal Trigger:** Opens full popup modal with full address, landmark, complete description, and full-resolution photo.

### 5.5 Submission Modal ("+ List Yours")
* Modal presents two clear options:
  * **Option 1: "Post an Event"** $\rightarrow$ Opens Google Form A in a clean modal/embed or direct link.
  * **Option 2: "Post a Rental or Lease"** $\rightarrow$ Opens Google Form B.
* Clear notice: *"Your listing will be reviewed by our team and will appear live once verified."*

### 5.6 Global Footer (`_includes/footer.html`)
* Logo + 2-line mission description for Karimnagar city.
* Navigation links with bullet dot separators.
* Social media pill links (Instagram `#E4405F`, YouTube `#FF0000`).
* Dynamic copyright year + Live status badge: Pulsing emerald dot (`Jekyll Mode: Ready`).

---

## 6. Technical Implementation Details for AI Generator

### 6.1 Google Drive Image Link Converter (JavaScript)
Visitors will paste standard Google Drive links like:
`https://drive.google.com/file/d/FILE_ID/view?usp=sharing` or `https://drive.google.com/open?id=FILE_ID`

The client-side JavaScript must normalize these into direct image URLs:
```javascript
function formatDriveImage(url) {
  if (!url || typeof url !== 'string') return '/assets/images/placeholder.jpg';
  const match = url.match(/\/d\/([a-zA-Z0-9_-]+)/) || url.match(/id=([a-zA-Z0-9_-]+)/);
  if (match && match[1]) {
    return `https://lh3.googleusercontent.com/d/${match[1]}`;
  }
  return url;
}
```

### 6.2 Pre-Configured WhatsApp Link Generator
```javascript
function getWhatsAppUrl(phone, title) {
  const cleanPhone = phone.replace(/\D/g, '');
  const finalPhone = cleanPhone.length === 10 ? '91' + cleanPhone : cleanPhone;
  const message = encodeURIComponent(`Yes, I saw a listing on Karimnagar4You website for: "${title}". Is it still available?`);
  return `https://wa.me/${finalPhone}?text=${message}`;
}
```

### 6.3 Dynamic Filter Builder
```javascript
function populateAreaFilter(items) {
  const areas = [...new Set(items.map(i => i.Area).filter(Boolean))].sort();
  const select = document.getElementById('area-filter');
  select.innerHTML = '<option value="">All Localities in Karimnagar</option>';
  areas.forEach(area => {
    const opt = document.createElement('option');
    opt.value = area;
    opt.textContent = area;
    select.appendChild(opt);
  });
}
```

---

## 7. Recommended Jekyll Repository File Structure

```
karimnagar4you.github.io/
├── _config.yml               # Jekyll site settings, title, baseurl, Google Sheet CSV URLs
├── _includes/
│   ├── head.html             # Google Fonts, Tailwind CDN / styles, meta tags
│   ├── navbar.html           # Frosted glass header, theme toggle, "+ List Yours" button
│   ├── banner.html           # Featured Hero Carousel with editorial typography
│   ├── filters.html          # Search input, dynamic area dropdown, type dropdown, view toggle
│   ├── event_card.html       # Grid & List card template for events
│   ├── rental_card.html      # Grid & List card template for rentals
│   ├── detail_modal.html     # Popup modal for full listing details
│   ├── submit_modal.html     # Modal linking to Google Form A and Form B
│   └── footer.html           # Editorial footer with social links & live status badge
├── _layouts/
│   └── default.html          # Main HTML layout wrapper with dark mode script
├── assets/
│   ├── css/
│   │   └── style.css         # Tailwind directives / custom typography styles
│   ├── js/
│   │   ├── app.js            # Main controller: fetch CSV, filter, search, render
│   │   └── theme.js          # Dark/Light mode switcher with localStorage persistence
│   └── images/
│       ├── logo.svg          # Karimnagar4You emblem
│       └── placeholder.jpg   # Default fallback banner/card image
└── index.html                # Main single-page application (Events & Rentals tabs)
```

---

## 8. Step-by-Step Launch Checklist for the User

1. **Create the Google Forms:**
   - Create Form A (Events) and Form B (Rentals) with the exact column questions listed in Section 3.
2. **Link to Google Sheet:**
   - In both forms, choose the same destination spreadsheet. Form A writes to Tab 1 (`Events`), Form B writes to Tab 2 (`Rentals`).
3. **Add the `Status` Column:**
   - Add a column named `Status` to each tab. Type `Approved` for any test rows you want visible.
4. **Publish to Web (CSV):**
   - Click **File → Share → Publish to web**.
   - Publish Sheet Tab 1 as **CSV**, copy URL $\rightarrow$ paste into `_config.yml` as `events_csv_url`.
   - Publish Sheet Tab 2 as **CSV**, copy URL $\rightarrow$ paste into `_config.yml` as `rentals_csv_url`.
5. **Push Code to GitHub:**
   - Push repository to `https://github.com/yourusername/yourusername.github.io`.
   - GitHub Pages will build and deploy automatically at `https://yourusername.github.io`.
