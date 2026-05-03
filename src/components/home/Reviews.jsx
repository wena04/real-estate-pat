import { Container, Row, Col } from 'react-bootstrap';
import { FiStar } from 'react-icons/fi';
import content from '../../data/siteContent.json';

function Stars({ count }) {
  const n = Math.max(0, Math.min(5, Math.round(count)));
  return (
    <span className="review-stars d-inline-flex gap-1 align-items-center" aria-hidden>
      {Array.from({ length: n }, (_, i) => (
        <FiStar key={i} className="review-star-icon" />
      ))}
    </span>
  );
}

export default function Reviews() {
  const { reviews } = content;
  if (!reviews) return null;

  const {
    heading,
    subheading,
    aggregateRating,
    reviewSummary,
    zillowProfileUrl,
    zillowLinkLabel,
    footnote,
    items = [],
  } = reviews;

  return (
    <section id="reviews" className="section-pad section-cream">
      <Container>
        <div className="text-center section-head">
          <div className="gold-divider" />
          <h2 className="section-heading">{heading}</h2>
          <p className="section-sub mb-0">{subheading}</p>
        </div>

        {(aggregateRating != null && reviewSummary) && (
          <div className="reviews-aggregate text-center mb-4 pb-1">
            <div className="d-flex justify-content-center align-items-center gap-2 flex-wrap">
              <Stars count={aggregateRating} />
              <span className="reviews-aggregate-text small fw-semibold text-uppercase" style={{ letterSpacing: '0.08em' }}>
                {reviewSummary}
              </span>
            </div>
          </div>
        )}

        {items.length > 0 && (
          <Row className="g-3 g-lg-4 justify-content-center mb-3">
            {items.map((item, idx) => (
              <Col key={idx} xs={12} md={6} lg={4}>
                <blockquote className="review-card tile-card h-100 mb-0">
                  {item.rating != null && (
                    <div className="mb-2">
                      <Stars count={item.rating} />
                    </div>
                  )}
                  <p className="review-quote mb-3">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                  <footer className="review-attribution small mb-0">
                    <span className="fw-semibold" style={{ color: 'var(--ink)' }}>
                      {item.author}
                    </span>
                    {item.context ? (
                      <span className="text-muted"> · {item.context}</span>
                    ) : null}
                  </footer>
                </blockquote>
              </Col>
            ))}
          </Row>
        )}

        {footnote && (
          <p className="text-center small text-muted mx-auto mb-3" style={{ maxWidth: '40rem', lineHeight: 1.6 }}>
            {footnote}
          </p>
        )}

        <p className="text-center mb-0">
          <a
            href={zillowProfileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-outline-dark rounded-pill text-uppercase small fw-semibold px-4"
            style={{ letterSpacing: '0.1em' }}
          >
            {zillowLinkLabel}
          </a>
        </p>
      </Container>
    </section>
  );
}
