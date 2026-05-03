import content from '../../data/siteContent.json';

const { hero, agent } = content;

export default function Hero() {
  function scrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  return (
    <section id="home" className="hero-section">
      {/* Video background */}
      <video
        className="hero-video"
        autoPlay
        muted
        loop
        playsInline
        poster="/assets/video/hero-poster.jpg"
      >
        <source src="/assets/video/hero.mp4" type="video/mp4" />
      </video>

      {/* Gradient overlay */}
      <div className="hero-overlay" />

      {/* Content */}
      <div className="hero-content">
        <p className="text-uppercase mb-2" style={{ letterSpacing: '0.15em', fontSize: '0.85rem', opacity: 0.85 }}>
          {agent.office} &bull; Seattle, WA
        </p>
        <h1>{hero.headline}</h1>
        <p>{hero.subheadline}</p>
        <div className="d-flex gap-3 justify-content-center flex-wrap">
          <button
            className="btn-gold"
            onClick={() => scrollTo('homeowners')}
          >
            {hero.ctaHomeowners}
          </button>
          <button
            className="btn-brand-outline"
            style={{ color: '#fff', borderColor: 'rgba(255,255,255,0.75)' }}
            onClick={() => scrollTo('investors')}
          >
            {hero.ctaInvestors}
          </button>
        </div>
      </div>
    </section>
  );
}
