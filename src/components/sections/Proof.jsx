import { Container, Row, Col } from 'react-bootstrap';
import content from '../../data/siteContent.json';

export default function Proof() {
  const { proof } = content;

  return (
    <section className="proof-section section-pad-sm">
      <Container>
        <Row className="g-0">
          {proof.map((p) => (
            <Col key={p.label} xs={12} md={4}>
              <div className="stat-tile">
                <div className="stat-number">{p.stat}</div>
                <div className="stat-label">{p.label}</div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
}
