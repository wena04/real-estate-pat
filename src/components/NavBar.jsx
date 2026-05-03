import { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';

const NAV_OFFSET = 72;

const links = [
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

export default function NavBar() {
  const [expanded, setExpanded] = useState(false);

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
      <Container>
        <Navbar.Brand href="#home" onClick={(e) => handleNavClick(e, '#home')}>
          Patricia Wen · Keller Williams
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="main-nav" />
        <Navbar.Collapse id="main-nav">
          <Nav className="ms-auto">
            {links.map(({ label, href }) => (
              <Nav.Link
                key={href}
                href={href}
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
