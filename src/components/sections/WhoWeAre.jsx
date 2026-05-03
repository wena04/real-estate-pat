import { Container, Row, Col } from 'react-bootstrap';
import content from '../../data/siteContent.json';

export default function WhoWeAre() {
  const { about } = content;

  return (
    <section className="section-pad" style={{ background: '#f8f9fa' }}>
      <Container>
        <div className="text-center mb-5">
          <div className="gold-divider" />
          <h2 className="section-heading">Who We Are</h2>
        </div>
        <Row className="g-4 justify-content-center">
          {about.map((tile) => (
            <Col key={tile.title} xs={12} md={4}>
              <div className="tile-card h-100">
                <h5 className="fw-bold mb-3" style={{ color: 'var(--brand-navy)' }}>
                  {tile.title}
                </h5>
                <p className="text-muted" style={{ lineHeight: 1.7 }}>
                  {tile.body}
                </p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
