import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import content from '../data/siteContent.json';
import { NAV_SCROLL_OFFSET } from '../constants';
import { publicUrl } from '../utils/publicUrl';

const links = [
  { label: 'Home', href: '#home' },
  { label: 'Listings', href: '#listings' },
  { label: 'About', href: '#about' },
  { label: 'Reviews', href: '#reviews' },
  { label: 'Contact', href: '#contact' },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - NAV_SCROLL_OFFSET;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const { agent, brand } = content;
  const logoSrc = brand?.logoSrc;
  const logoAlt = brand?.logoAlt || `${agent.name} — ${brand?.tagline || 'real estate'}`;

  function handleNavClick(e, href) {
    e.preventDefault();
    setExpanded(false);
    const id = href.replace('#', '');
    scrollTo(id);
  }

  return (
    <Navbar
      fixed="top"
      expand="lg"
      expanded={expanded}
      onToggle={setExpanded}
      className="site-navbar"
    >
      <Container fluid="xxl" className="px-3 px-lg-4">
        <Navbar.Brand
          href="#home"
          onClick={(e) => handleNavClick(e, '#home')}
          className="navbar-brand-lockup d-flex align-items-center me-0 me-lg-4 py-2 py-lg-3"
        >
          {logoSrc ? (
            <img
              src={publicUrl(logoSrc)}
              alt={logoAlt}
              className="navbar-brand-logo"
              width={640}
              height={160}
              decoding="async"
            />
          ) : (
            <>
              <span className="navbar-brand-name">{agent.name}</span>
              {brand?.tagline && (
                <span className="navbar-brand-tagline d-none d-md-block">
                  {brand.tagline}
                </span>
              )}
            </>
          )}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" className="navbar-dark border-0 shadow-none my-2" />
        <Navbar.Collapse id="main-nav">
          <Nav className="mx-lg-auto my-3 my-lg-0 align-items-lg-center navbar-nav-main">
            {links.map(({ label, href }) => (
              <Nav.Link
                key={href}
                href={href}
                className="navbar-link-item"
                onClick={(e) => handleNavClick(e, href)}
              >
                {label}
              </Nav.Link>
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}
