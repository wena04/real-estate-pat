import { Container, Row, Col } from 'react-bootstrap';
import { FiHome, FiUsers, FiKey } from 'react-icons/fi';
import { TbDiamond } from 'react-icons/tb';
import content from '../../data/siteContent.json';

const ICON_MAP = {
  FiHome,
  FiUsers,
  FiKey,
  TbDiamond,
};

export default function OurValue() {
  const { values } = content;

  return (
    <section className="hero-features section-pad-sm">
      <Container fluid="xxl" className="px-3 px-lg-4">
        <Row className="g-0 justify-content-center hero-feature-row">
          {values.map((v) => {
            const Icon = ICON_MAP[v.icon] || FiHome;
            return (
              <Col key={v.title} xs={12} sm={6} lg={3}>
                <div className="hero-feature-col h-100 text-center">
                  <div className="hero-feature-inner">
                    <div className="tile-icon hero-feature-icon">
                      <Icon aria-hidden />
                    </div>
                    <h3 className="hero-feature-title text-uppercase small mb-2">
                      {v.title}
                    </h3>
                    <p className="hero-feature-body text-muted mb-0">{v.body}</p>
                  </div>
                </div>
              </Col>
            );
          })}
        </Row>
      </Container>
    </section>
  );
}
