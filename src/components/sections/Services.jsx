import { Container, Row, Col } from 'react-bootstrap';
import { FiTool, FiBook, FiClipboard } from 'react-icons/fi';
import content from '../../data/siteContent.json';

const ICON_MAP = { FiTool, FiBook, FiClipboard };

export default function Services() {
  const { services } = content;

  return (
    <section id="services" className="section-pad" style={{ background: '#f8f9fa' }}>
      <Container>
        <div className="text-center mb-5">
          <div className="gold-divider" />
          <h2 className="section-heading">Our Services</h2>
          <p className="section-sub">
            Full-spectrum real estate services for homeowners and developers in the Seattle metro.
          </p>
        </div>
        <Row className="g-4 justify-content-center">
          {services.map((s) => {
            const Icon = ICON_MAP[s.icon] || FiTool;
            return (
              <Col key={s.title} xs={12} md={4}>
                <div className="tile-card text-center h-100">
                  <div className="tile-icon"><Icon /></div>
                  <h5 className="fw-bold mb-2" style={{ color: 'var(--brand-navy)' }}>
                    {s.title}
                  </h5>
                  <p className="text-muted" style={{ fontSize: '0.93rem', lineHeight: 1.65 }}>
                    {s.body}
                  </p>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}
