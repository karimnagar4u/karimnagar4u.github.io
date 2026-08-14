import { useState, useEffect } from 'react';
import { BannerSlide } from '../types';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles } from 'lucide-react';

interface BannerProps {
  slides: BannerSlide[];
  onSelectSlide: (slide: BannerSlide) => void;
}

export function Banner({ slides, onSelectSlide }: BannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused || slides.length <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % slides.length);
    }, 5500);
    return () => clearInterval(interval);
  }, [isPaused, slides.length]);

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % slides.length);
  };

  if (!slides || slides.length === 0) return null;

  const current = slides[currentIndex];

  return (
    <section
      id="homepage-hero-banner"
      className="w-full relative"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {/* Banner Container matching Wireframe */}
      <div className="relative w-full rounded-2xl overflow-hidden border-2 border-neutral-900 dark:border-neutral-700 bg-neutral-950 shadow-xl group aspect-[21/9] min-h-[260px] sm:min-h-[340px] md:min-h-[400px]">
        {/* Background image with gradient overlay */}
        <div className="absolute inset-0">
          <img
            src={current.imageUrl}
            alt={current.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover object-center transition-all duration-700 transform scale-105 group-hover:scale-100 opacity-65"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-neutral-950 via-neutral-950/60 to-neutral-950/20" />
        </div>

        {/* Content Box */}
        <div className="absolute inset-0 flex flex-col justify-end p-6 sm:p-10 md:p-14 max-w-4xl text-white z-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-1.5 self-start px-3 py-1 rounded-full bg-white/20 backdrop-blur-md border border-white/30 text-white text-xs font-semibold uppercase tracking-wider mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{current.categoryBadge}</span>
          </div>

          <h1 className="text-2xl sm:text-4xl md:text-5xl font-black font-serif tracking-tight text-white leading-tight drop-shadow-md">
            {current.title}
          </h1>

          <p className="mt-2 text-sm sm:text-base md:text-lg text-neutral-200 font-normal line-clamp-2 max-w-2xl drop-shadow">
            {current.tagline}
          </p>

          <div className="mt-5 flex items-center gap-3">
            <button
              id="banner-cta-btn"
              onClick={() => onSelectSlide(current)}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg bg-white text-neutral-900 text-sm font-bold shadow-lg hover:bg-neutral-100 transition-all hover:translate-x-1"
            >
              <span>Explore Details</span>
              <ArrowRight className="w-4 h-4" />
            </button>
            <span className="text-xs text-neutral-300 font-mono hidden sm:inline">
              Slide {currentIndex + 1} of {slides.length}
            </span>
          </div>
        </div>

        {/* Left / Right Carousel Controls */}
        <button
          id="banner-prev-btn"
          onClick={prevSlide}
          className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-neutral-900/60 text-white hover:bg-neutral-900/90 backdrop-blur-sm border border-white/10 transition-all opacity-0 group-hover:opacity-100 z-20"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          id="banner-next-btn"
          onClick={nextSlide}
          className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-neutral-900/60 text-white hover:bg-neutral-900/90 backdrop-blur-sm border border-white/10 transition-all opacity-0 group-hover:opacity-100 z-20"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      {/* Indicator dots "..." below the banner matching Wireframe 1 */}
      <div className="flex items-center justify-center gap-2 mt-4" aria-label="Banner pagination">
        {slides.map((s, idx) => (
          <button
            key={s.id}
            id={`banner-dot-${idx}`}
            onClick={() => setCurrentIndex(idx)}
            className={`transition-all rounded-full ${
              currentIndex === idx
                ? 'w-8 h-2.5 bg-neutral-900 dark:bg-white'
                : 'w-2.5 h-2.5 bg-neutral-300 dark:bg-neutral-700 hover:bg-neutral-400 dark:hover:bg-neutral-500'
            }`}
            aria-label={`Go to slide ${idx + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
