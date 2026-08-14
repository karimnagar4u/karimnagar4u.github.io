import { ArrowUpRight } from 'lucide-react';

interface FooterProps {
  onNavigateTab: (tab: 'home' | 'events' | 'rent-lease' | 'list-yours') => void;
}

export function Footer({ onNavigateTab }: FooterProps) {
  return (
    <footer
      id="global-footer"
      className="w-full bg-neutral-100 dark:bg-neutral-900 border-t border-neutral-200 dark:border-neutral-800 transition-colors duration-200 mt-20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Left / Info */}
          <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 text-center sm:text-left">
            <div className="w-9 h-9 rounded-lg bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-black text-sm">
              K4U
            </div>
            <div>
              <p className="text-sm font-semibold text-neutral-900 dark:text-neutral-100 font-serif">
                KARIMNAGAR4U
              </p>
              <p className="text-xs text-neutral-500 dark:text-neutral-400 mt-0.5 font-mono">
                Events & Rent/Lease Hub
              </p>
            </div>
          </div>

          {/* Quick links in footer */}
          <div className="flex items-center gap-5 text-xs font-medium text-neutral-600 dark:text-neutral-400">
            <button
              onClick={() => onNavigateTab('events')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Events Directory
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigateTab('rent-lease')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Rent / Lease
            </button>
            <span>•</span>
            <button
              onClick={() => onNavigateTab('list-yours')}
              className="hover:text-neutral-900 dark:hover:text-white transition-colors"
            >
              Submit Listing
            </button>
          </div>

          {/* Right Side Social Media Links: YouTube and Instagram as requested */}
          <div id="footer-social-links" className="flex items-center gap-3">
            <span className="text-xs text-neutral-400 dark:text-neutral-500 font-medium hidden md:inline">
              Follow Us:
            </span>

            {/* Instagram */}
            <a
              id="footer-social-instagram"
              href="https://instagram.com/karimnagar4u/"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2.5 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:scale-110 transition-transform flex items-center justify-center"
              aria-label="Instagram"
              title="Follow us on Instagram"
            >
              {/* Instagram Vector Icon */}
              <svg
                className="w-5 h-5 transition-colors text-[#E4405F]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
              </svg>
            </a>

            {/* YouTube */}
            <a
              id="footer-social-youtube"
              href="https://youtube.com/@karimnagar4u"
              target="_blank"
              rel="noopener noreferrer"
              className="group p-2.5 rounded-full bg-white dark:bg-neutral-800 border border-neutral-200 dark:border-neutral-700 shadow-sm hover:scale-110 transition-transform flex items-center justify-center"
              aria-label="YouTube"
              title="Watch on YouTube"
            >
              {/* YouTube Vector Icon */}
              <svg
                className="w-5 h-5 transition-colors text-[#FF0000]"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
              </svg>
            </a>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-neutral-200 dark:border-neutral-800 flex flex-col sm:flex-row items-center justify-between text-xs text-neutral-500 dark:text-neutral-400 gap-3">
          <p>© {new Date().getFullYear()} Events & Rent/Lease Hub. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-1 text-[11px] font-mono bg-neutral-200 dark:bg-neutral-800 px-2 py-0.5 rounded text-neutral-700 dark:text-neutral-300">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Jekyll Mode: Ready
            </span>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-0.5 hover:underline"
            >
              <span>GitHub Pages Repo</span>
              <ArrowUpRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
