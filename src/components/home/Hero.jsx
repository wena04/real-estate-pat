import content from '../../data/siteContent.json';
import { NAV_SCROLL_OFFSET } from '../../constants';

const { hero, brand } = content;

const DEFAULT_HERO_IMG = '/assets/hero-seattle-skyline.png';

export default function Hero() {
  function scrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  const src = hero.imageSrc || DEFAULT_HERO_IMG;
  const alt =
    hero.imageAlt ||
    'Seattle skyline with the Space Needle and Puget Sound';

  return (
    <section id="home" className="hero-section">
      <img
        className="hero-video"
        src={src}
        alt={alt}
        width={1920}
        height={1080}
        decoding="async"
        fetchPriority="high"
      />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-eyebrow font-body">
          {hero.eyebrow || brand?.tagline}
        </p>
        <h1>{hero.headline}</h1>
        <p className="hero-sub font-body">{hero.subheadline}</p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <button
            type="button"
            className="btn-hero-primary"
            onClick={() => scrollTo('listings')}
          >
            {hero.ctaPrimary}
          </button>
          <button
            type="button"
            className="btn-hero-outline"
            onClick={() => scrollTo('contact')}
          >
            {hero.ctaSecondary}
          </button>
        </div>
      </div>
    </section>
  );
}
