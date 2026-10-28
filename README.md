# Karimnagar4You (`karimnagar4u.github.io`)

A hyper-local community discovery web portal for **Karimnagar City**, featuring an **Events Directory**, a **Rent & Lease Marketplace**, and a dedicated **Listing Submission Portal** (`/post.html`).

Hosted 100% free on **GitHub Pages** using a **Zero-Backend Engine** (Google Forms $\rightarrow$ Google Sheets $\rightarrow$ Published CSV $\rightarrow$ Client-Side Fetch & Render).

---

## 🔗 Live Connected Endpoints

| Resource | Status | URL / Identifier |
| :--- | :--- | :--- |
| **Events Google Form** | ✅ Connected | `https://docs.google.com/forms/d/e/1FAIpQLSe6VrWCxLJ4tVaZXqeccoa8jFRmIhEW_pcVmzu1kvPV7JaAUw/viewform` |
| **Rentals Google Form** | ✅ Connected | `https://docs.google.com/forms/d/e/1FAIpQLSf902rT0Bk58SobD9UNZp-HEe58RUq5yH9HRbVv6HXqsxvPpQ/viewform` |
| **Events Published CSV** | ✅ Connected | GID: `239794758` |
| **Rentals Published CSV** | ✅ Connected | GID: `939137964` |
| **Instagram** | ✅ Connected | `https://www.instagram.com/karimnagar4u/` |
| **YouTube** | ✅ Connected | `https://www.youtube.com/@karimnagar4u` |
| **Contact Email** | ✅ Connected | `soumith@dbydxmedia.com` |

---

## 📁 Repository Structure

```
karimnagar4u.github.io/
├── _config.yml               # Jekyll settings, live CSV links & form URLs
├── _includes/
│   ├── head.html             # Google Fonts, Tailwind CDN, meta tags & config injection
│   ├── navbar.html           # Sticky glass header, section switcher, theme switch, "+ List Yours"
│   ├── banner.html           # Hero Carousel with editorial typography
│   ├── filters.html          # Live search input, dynamic locality dropdown, type dropdown, view toggle
│   ├── event_card.html       # Card template for events
│   ├── rental_card.html      # Card template for rentals
│   ├── detail_modal.html     # Popup modal for full listing details
│   ├── submit_modal.html     # Modal linking to event & rental submissions
│   └── footer.html           # Editorial footer with social channels, status badge, and dynamic copyright
├── _layouts/
│   └── default.html          # Main HTML layout wrapper with dark mode script
├── assets/
│   ├── css/
│   │   └── style.css         # Custom typography and animations
│   ├── js/
│   │   ├── app.js            # Zero-backend engine: CSV fetch, header normalization, reactive filters
│   │   └── theme.js          # Dark/Light mode switcher with localStorage persistence
│   └── images/
│       ├── logo.svg          # Karimnagar4You emblem
│       └── placeholder.svg   # Fallback placeholder image
├── index.html                # Main homepage (Events & Rentals directory)
├── post.html                 # Dedicated Form-Style Landing Page for Events & Rentals
├── preview.html              # Standalone local preview (double-click to test locally)
├── instructions.md           # Original project specification
└── README.md                 # Complete documentation
```

---

## 🚀 How to Deploy to GitHub Pages

Since your GitHub username is **`karimnagar4u`** and your repository is named **`karimnagar4u.github.io`**:

### Option 1: GitHub Web Upload (Fastest)
1. Go to your repository on GitHub: `https://github.com/karimnagar4u/karimnagar4u.github.io`
2. Click **Add file** $\rightarrow$ **Upload files**.
3. Drag and drop all the files and folders from this folder (`_config.yml`, `_includes/`, `_layouts/`, `assets/`, `index.html`, `post.html`, etc.).
4. Commit the changes directly to `main` (or `master`).
5. Go to **Settings** $\rightarrow$ **Pages**:
   - Source: **Deploy from a branch**
   - Branch: **main** (or **master**) / **/(root)**
   - Click **Save**.
6. GitHub Pages will build the site automatically at **`https://karimnagar4u.github.io`**.

### Option 2: Git Command Line
```bash
git init
git remote add origin https://github.com/karimnagar4u/karimnagar4u.github.io.git
git add .
git commit -m "Deploy Karimnagar4You portal with live Google Sheets & dedicated form page"
git branch -M main
git push -u origin main
```

---

## 🛡️ Moderation: How to Make a Submission Live

1. A user visits your site and clicks **"+ List Yours Free"** $\rightarrow$ opens the dedicated **`/post.html`** submission landing page.
2. They fill out Form A (Event) or Form B (Rental).
3. The response is automatically logged into your Google Sheet (`Events` or `Rentals` tab).
4. **To make it appear on the website:**
   - Open your Google Sheet.
   - Go to the new row and find the **`Status`** column.
   - Type **`Approved`** into that cell.
5. That listing will immediately appear live on **`https://karimnagar4u.github.io`** when users refresh or visit the page!
