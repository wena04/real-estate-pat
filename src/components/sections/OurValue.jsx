import { Container, Row, Col } from 'react-bootstrap';
import {
  FiHome,
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
  FiMessageCircle,
} from 'react-icons/fi';
import content from '../../data/siteContent.json';

const ICON_MAP = {
  FiHome,
  FiTrendingUp,
  FiUsers,
  FiCheckCircle,
  FiMessageCircle,
};

export default function OurValue() {
  const { values } = content;

  return (
    <section className="section-pad">
      <Container>
        <div className="text-center mb-5">
          <div className="gold-divider" />
          <h2 className="section-heading">Why Work With Patricia</h2>
          <p className="section-sub">
            Trusted guidance for homeowners and investors across the Puget Sound.
          </p>
        </div>
        <Row className="g-4">
          {values.map((v) => {
            const Icon = ICON_MAP[v.icon] || FiHome;
            return (
              <Col key={v.title} xs={12} sm={6} lg={4} xl="auto" className="flex-xl-fill">
                <div className="tile-card text-center">
                  <div className="tile-icon">
                    <Icon />
                  </div>
                  <h5 className="fw-bold mb-2" style={{ color: 'var(--brand-navy)' }}>
                    {v.title}
                  </h5>
                  <p className="text-muted" style={{ fontSize: '0.93rem' }}>
                    {v.body}
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
