import { Container, Row, Col } from 'react-bootstrap';
import { FiHome, FiMapPin, FiHeart } from 'react-icons/fi';
import content from '../../data/siteContent.json';
import { NAV_SCROLL_OFFSET } from '../../constants';

const PILLAR_ICONS = { FiHome, FiMapPin, FiHeart };

export default function WhoWeAre() {
  const { aboutSection, agent } = content;
  if (!aboutSection) return null;

  const {
    heading,
    subheading,
    portraitSrc,
    portraitAlt,
    bio,
    credentials,
    ctaLabel,
    pillars = [],
  } = aboutSection;

  function scrollTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    const top = el.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET;
    window.scrollTo({ top, behavior: 'smooth' });
  }

  return (
    <section id="about" className="section-pad section-cream">
      <Container>
        <Row className="align-items-center g-5">
          <Col lg={5}>
            <div className="about-portrait-wrap">
              <img
                src={portraitSrc}
                alt={portraitAlt || agent.name}
                className="about-portrait-img w-100"
              />
            </div>
          </Col>
          <Col lg={7}>
            {subheading && (
              <p className="section-eyebrow text-lg-start mb-2">
                {subheading}
              </p>
            )}
            <h2 className="section-heading text-lg-start mb-3">{heading}</h2>
            <p className={`text-muted about-bio ${credentials ? 'mb-3' : 'mb-4'}`}>{bio}</p>
            {credentials && (
              <p className="text-muted mb-4" style={{ fontSize: '0.98rem', lineHeight: 1.75 }}>
                {credentials}
              </p>
            )}
            <Row className="g-3 mb-2">
              {pillars.map((p) => {
                const Icon = PILLAR_ICONS[p.icon] || FiHome;
                return (
                  <Col key={p.label} xs={12} sm={4}>
                    <div className="about-pillar d-flex align-items-center gap-2">
                      <Icon className="about-pillar-icon flex-shrink-0" aria-hidden />
                      <span className="small fw-semibold pillar-label">
                        {p.label}
                      </span>
                    </div>
                  </Col>
                );
              })}
            </Row>
            {ctaLabel && (
              <button
                type="button"
                className="btn-site-outline mt-3"
                onClick={() => scrollTo('contact')}
              >
                {ctaLabel}
              </button>
            )}
          </Col>
        </Row>
      </Container>
    </section>
  );
}
