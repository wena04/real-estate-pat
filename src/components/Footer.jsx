import { Container, Row, Col } from 'react-bootstrap';
import { FiPhone, FiMail, FiMapPin, FiMessageSquare } from 'react-icons/fi';
import content from '../data/siteContent.json';
import { NAV_SCROLL_OFFSET } from '../constants';

const { agent, footer, brand } = content;

function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function Footer() {
  const navLinks = footer?.navLinks ?? [];
  const extraLinks = footer?.extraLinks ?? [];

  function handleNavClick(e, href) {
    e.preventDefault();
    if (href.startsWith('#')) {
      scrollTo(href.replace('#', ''));
    }
  }

  return (
    <footer className="site-footer">
      <Container>
        <Row className="mb-4">
          <Col lg={4} className="mb-4 mb-lg-0">
            <h5 className="footer-brand-name mb-1 font-display">
              {agent.name}
            </h5>
            {agent.pronouns && (
              <p className="small mb-2" style={{ opacity: 0.65 }}>
                ({agent.pronouns})
              </p>
            )}
            {brand?.tagline && (
              <p className="footer-tagline small text-uppercase mb-3">
                {brand.tagline}
              </p>
            )}
            <p className="footer-blurb">
              {footer.blurb}
            </p>
          </Col>

          <Col lg={3} md={6} className="mb-4 mb-lg-0 offset-lg-1">
            <h6 className="footer-col-title">Navigation</h6>
            <ul className="list-unstyled mb-4 mb-md-0 small footer-link-list">
              {navLinks.map(({ label, href }) => (
                <li key={href + label} className="mb-2">
                  {href.startsWith('#') ? (
                    <a href={href} onClick={(e) => handleNavClick(e, href)}>
                      {label}
                    </a>
                  ) : (
                    <a href={href}>{label}</a>
                  )}
                </li>
              ))}
            </ul>
            {extraLinks.length > 0 && (
              <>
                <h6 className="footer-col-title mt-4">Links</h6>
                <ul className="list-unstyled mb-0 small footer-link-list">
                  {extraLinks.map(({ label, href }) => (
                    <li key={href} className="mb-2">
                      <a href={href} target="_blank" rel="noopener noreferrer">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </>
            )}
          </Col>

          <Col lg={3} md={6}>
            <h6 className="footer-col-title">Let&apos;s connect</h6>
            <ul className="list-unstyled mb-0 footer-contact-list">
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

        <hr className="footer-rule" />
        <p className="text-center mb-0 footer-copyright">
          &copy; {new Date().getFullYear()} {agent.name} &bull; Keller Williams North Seattle &bull; All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
