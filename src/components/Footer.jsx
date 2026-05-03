import { Container, Row, Col } from 'react-bootstrap';
import { FiPhone, FiMail, FiMapPin, FiMessageSquare } from 'react-icons/fi';
import content from '../data/siteContent.json';

const { agent, footer } = content;

const NAV_OFFSET = 72;

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'Homeowners', href: '#homeowners' },
  { label: 'Services', href: '#services' },
  { label: 'Investors', href: '#investors' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact', href: '#contact' },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Footer() {
  function handleClick(e, href) {
    e.preventDefault();
    scrollTo(href.replace('#', ''));
  }

  return (
    <footer className="site-footer">
      <Container>
        <Row className="mb-5">
          {/* Brand blurb */}
          <Col lg={4} className="mb-4 mb-lg-0">
            <h5 className="text-white fw-bold mb-3">
              {agent.name} &mdash; {agent.office}
            </h5>
            <p style={{ fontSize: '0.92rem', lineHeight: 1.7 }}>
              {footer.blurb}
            </p>
          </Col>

          {/* Nav links */}
          <Col lg={2} md={4} className="mb-4 mb-lg-0 offset-lg-1">
            <h6 className="text-white fw-bold mb-3 text-uppercase" style={{ letterSpacing: '0.08em', fontSize: '0.8rem' }}>
              Navigation
            </h6>
            <ul className="list-unstyled mb-0">
              {navLinks.map(({ label, href }) => (
                <li key={href} className="mb-2">
                  <a href={href} onClick={(e) => handleClick(e, href)}>
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact info */}
          <Col lg={4} md={8} className="offset-lg-1">
            <h6 className="text-white fw-bold mb-3 text-uppercase" style={{ letterSpacing: '0.08em', fontSize: '0.8rem' }}>
              Contact
            </h6>
            <ul className="list-unstyled mb-0" style={{ fontSize: '0.92rem' }}>
              <li className="mb-2 d-flex align-items-start gap-2">
                <FiMapPin className="mt-1 flex-shrink-0" />
                <span>{agent.address}</span>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <FiPhone className="flex-shrink-0" />
                <a href={`tel:${agent.phone.replace(/\D/g, '')}`}>{agent.phone}</a>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <FiMail className="flex-shrink-0" />
                <a href={`mailto:${agent.email}`}>{agent.email}</a>
              </li>
              <li className="mb-2 d-flex align-items-center gap-2">
                <FiMessageSquare className="flex-shrink-0" />
                <span>WeChat: {agent.wechat}</span>
              </li>
            </ul>
          </Col>
        </Row>

        <hr style={{ borderColor: 'rgba(255,255,255,0.12)' }} />
        <p className="text-center mb-0" style={{ fontSize: '0.82rem', opacity: 0.55 }}>
          &copy; {new Date().getFullYear()} {agent.name} &bull; Keller Williams North Seattle &bull; All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
