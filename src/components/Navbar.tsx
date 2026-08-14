import { useState } from 'react';
import { ActivePage } from '../types';
import { Sun, Moon, Menu, X, FileCode2, Sparkles, Building2, Calendar } from 'lucide-react';

interface NavbarProps {
  activePage: ActivePage;
  onNavigate: (page: ActivePage) => void;
  isDark: boolean;
  onToggleTheme: () => void;
  onOpenMarkdownModal?: () => void;
}

export function Navbar({
  activePage,
  onNavigate,
  isDark,
  onToggleTheme,
  onOpenMarkdownModal,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNav = (page: ActivePage) => {
    onNavigate(page);
    setMobileMenuOpen(false);
  };

  return (
    <header
      id="global-navbar"
      className="sticky top-0 z-40 w-full bg-white/95 dark:bg-neutral-900/95 backdrop-blur-md border-b border-neutral-200 dark:border-neutral-800 transition-colors duration-200"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo on Top Left */}
          <div className="flex items-center gap-3">
            <button
              id="logo-brand-btn"
              onClick={() => handleNav('home')}
              className="flex items-center gap-2.5 group text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-neutral-900 dark:focus-visible:ring-neutral-100 rounded-md"
            >
              <div className="w-10 h-10 rounded-xl bg-neutral-900 dark:bg-white text-white dark:text-neutral-900 flex items-center justify-center font-black tracking-tighter text-lg shadow-sm group-hover:scale-105 transition-transform">
                <span>K4U</span>
              </div>
              <div>
                <span className="text-xl sm:text-2xl font-extrabold tracking-tight text-neutral-900 dark:text-white block font-serif">
                  KARIMNAGAR<span className="text-neutral-400 font-sans font-light text-base ml-1">4U</span>
                </span>
                <span className="text-[10px] uppercase tracking-widest text-neutral-500 dark:text-neutral-400 block -mt-1 font-mono">
                  Events & Rental Portal
                </span>
              </div>
            </button>
          </div>

          {/* Menu bar on the right with the tabs: Events, Rent / Lease, List Yours + Theme Toggle */}
          <div className="hidden md:flex items-center gap-2 sm:gap-4">
            <nav className="flex items-center gap-1.5" aria-label="Main Navigation">
              {/* Home */}
              <button
                id="nav-tab-home"
                onClick={() => handleNav('home')}
                className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-all ${
                  activePage === 'home'
                    ? 'border-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white bg-neutral-100/80 dark:bg-neutral-800/80'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                Home
              </button>

              {/* Events */}
              <button
                id="nav-tab-events"
                onClick={() => handleNav('events')}
                className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                  activePage === 'events' || activePage === 'event-detail'
                    ? 'border-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white bg-neutral-100/80 dark:bg-neutral-800/80 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Calendar className="w-4 h-4 opacity-70" />
                Events
              </button>

              {/* Rent / Lease */}
              <button
                id="nav-tab-rent-lease"
                onClick={() => handleNav('rent-lease')}
                className={`px-3.5 py-2 text-sm font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                  activePage === 'rent-lease' || activePage === 'rental-detail'
                    ? 'border-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white bg-neutral-100/80 dark:bg-neutral-800/80 shadow-sm'
                    : 'text-neutral-600 dark:text-neutral-300 hover:text-neutral-900 dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800'
                }`}
              >
                <Building2 className="w-4 h-4 opacity-70" />
                Rent / Lease
              </button>

              {/* List Yours */}
              <button
                id="nav-tab-list-yours"
                onClick={() => handleNav('list-yours')}
                className={`px-4 py-2 text-sm font-semibold rounded-md transition-all flex items-center gap-1.5 ${
                  activePage === 'list-yours'
                    ? 'border-2 border-neutral-900 dark:border-white text-neutral-900 dark:text-white bg-neutral-100/80 dark:bg-neutral-800/80 shadow-sm'
                    : 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900 hover:opacity-90'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                List Yours
              </button>
            </nav>

            {/* Markdown Info / Inspect Button */}
            {onOpenMarkdownModal && (
              <button
                id="nav-jekyll-btn"
                onClick={onOpenMarkdownModal}
                className="hidden lg:flex items-center gap-1 px-2.5 py-1.5 text-xs font-mono text-neutral-600 dark:text-neutral-400 hover:text-neutral-900 dark:hover:text-neutral-100 border border-neutral-200 dark:border-neutral-700 rounded-md hover:bg-neutral-50 dark:hover:bg-neutral-800"
                title="View GitHub Pages / Jekyll Markdown File Structure"
              >
                <FileCode2 className="w-3.5 h-3.5 text-amber-600 dark:text-amber-400" />
                <span>_posts/ .md</span>
              </button>
            )}

            {/* Light / Dark Mode Toggle on Top Right */}
            <button
              id="theme-toggle-btn"
              type="button"
              onClick={onToggleTheme}
              className="p-2.5 rounded-lg border border-neutral-200 dark:border-neutral-700 text-neutral-700 dark:text-neutral-200 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none transition-colors"
              aria-label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              title={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
            >
              {isDark ? (
                <Sun className="w-5 h-5 text-amber-400" />
              ) : (
                <Moon className="w-5 h-5 text-neutral-700" />
              )}
            </button>
          </div>

          {/* Mobile hamburger menu & theme toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              id="mobile-theme-toggle-btn"
              type="button"
              onClick={onToggleTheme}
              className="p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Toggle Theme"
            >
              {isDark ? <Sun className="w-5 h-5 text-amber-400" /> : <Moon className="w-5 h-5" />}
            </button>
            <button
              id="mobile-menu-toggle-btn"
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-md text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800"
              aria-label="Open Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {mobileMenuOpen && (
        <div
          id="mobile-navigation-drawer"
          className="md:hidden border-t border-neutral-200 dark:border-neutral-800 bg-white dark:bg-neutral-900 px-4 pt-3 pb-5 space-y-2 shadow-lg"
        >
          <button
            onClick={() => handleNav('home')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
              activePage === 'home'
                ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold border-l-4 border-neutral-900 dark:border-white'
                : 'text-neutral-600 dark:text-neutral-300'
            }`}
          >
            <span>Home</span>
          </button>
          <button
            onClick={() => handleNav('events')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
              activePage === 'events' || activePage === 'event-detail'
                ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold border-l-4 border-neutral-900 dark:border-white'
                : 'text-neutral-600 dark:text-neutral-300'
            }`}
          >
            <span>Events</span>
          </button>
          <button
            onClick={() => handleNav('rent-lease')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
              activePage === 'rent-lease' || activePage === 'rental-detail'
                ? 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white font-bold border-l-4 border-neutral-900 dark:border-white'
                : 'text-neutral-600 dark:text-neutral-300'
            }`}
          >
            <span>Rent / Lease</span>
          </button>
          <button
            onClick={() => handleNav('list-yours')}
            className={`w-full text-left px-4 py-2.5 rounded-lg text-sm font-semibold flex items-center justify-between ${
              activePage === 'list-yours'
                ? 'bg-neutral-900 text-white dark:bg-white dark:text-neutral-900'
                : 'bg-neutral-100 dark:bg-neutral-800 text-neutral-900 dark:text-white'
            }`}
          >
            <span>List Yours (Add .md)</span>
            <Sparkles className="w-4 h-4" />
          </button>
          {onOpenMarkdownModal && (
            <button
              onClick={() => {
                onOpenMarkdownModal();
                setMobileMenuOpen(false);
              }}
              className="w-full text-left px-4 py-2 text-xs font-mono text-neutral-500 dark:text-neutral-400 flex items-center gap-2 pt-2 border-t border-neutral-100 dark:border-neutral-800"
            >
              <FileCode2 className="w-4 h-4 text-amber-500" />
              <span>Jekyll Markdown Structure</span>
            </button>
          )}
        </div>
      )}
    </header>
  );
}
