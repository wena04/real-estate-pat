import {
  Suspense,
  lazy,
  useMemo,
  useRef,
  useState,
} from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { FiChevronLeft, FiChevronRight, FiStar } from 'react-icons/fi';
import listingsData from '../../data/listings.json';
import content from '../../data/siteContent.json';

const ListingsMap = lazy(() => import('../ListingsMap'));

const { listingsSection, agent, reviews, performanceStats, aboutSection } = content;

const PAGE_SIZE = 5;

function formatMoney(n) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(n);
}

function formatTableDate(iso) {
  if (!iso) return '—';
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return iso;
  return d.toLocaleDateString('en-US', {
    month: 'numeric',
    day: 'numeric',
    year: 'numeric',
  });
}

export default function Projects() {
  const { forSale = [], sold = [] } = listingsData;
  const [soldPage, setSoldPage] = useState(1);

  const soldSorted = useMemo(
    () =>
      [...sold].sort((a, b) =>
        String(b.closingDate).localeCompare(String(a.closingDate))
      ),
    [sold]
  );

  const carouselItems = useMemo(() => soldSorted.slice(0, 6), [soldSorted]);

  const mapMarkers = useMemo(() => {
    const m = [];
    forSale.forEach((p) => {
      m.push({
        id: `fs-${p.id}`,
        lat: p.lat,
        lng: p.lng,
        status: 'for_sale',
        title: p.address,
        subtitle: `${formatMoney(p.price)} · For sale`,
      });
    });
    sold.forEach((p) => {
      m.push({
        id: `sd-${p.id}`,
        lat: p.lat,
        lng: p.lng,
        status: 'sold',
        title: p.address,
        subtitle: `${formatMoney(p.price)} · Sold`,
      });
    });
    return m;
  }, [forSale, sold]);

  const totalSoldPages = Math.max(1, Math.ceil(soldSorted.length / PAGE_SIZE));
  const soldSlice = soldSorted.slice(
    (soldPage - 1) * PAGE_SIZE,
    soldPage * PAGE_SIZE
  );

  const trackRef = useRef(null);

  function scrollCarousel(dir) {
    trackRef.current?.scrollBy({ left: dir * 300, behavior: 'smooth' });
  }

  const stats = performanceStats
    ? [
        { value: performanceStats.salesLast12Months, label: 'Sales last 12 months' },
        { value: performanceStats.totalSales, label: 'Total sales' },
        { value: performanceStats.priceRange, label: 'Price range' },
        { value: performanceStats.averagePrice, label: 'Average price' },
      ]
    : [];

  return (
    <section id="listings" className="section-pad section-cream">
      <Container>
        <div className="listings-section-header section-head">
          <div className="d-flex flex-column flex-lg-row align-items-lg-end justify-content-lg-between gap-3">
            <div className="text-center text-lg-start">
              <div className="gold-divider gold-divider--start mx-auto mx-lg-0" />
              <h2 className="section-heading mb-0">
                {listingsSection?.profileLine ?? 'Featured listings & sales'}
              </h2>
            </div>
            {listingsSection?.viewAllHref && (
              <a
                href={listingsSection.viewAllHref}
                target="_blank"
                rel="noopener noreferrer"
                className="listings-view-all fw-semibold text-dark text-decoration-none text-center text-lg-end"
              >
                {listingsSection.viewAllLabel}
              </a>
            )}
          </div>
        </div>

        <div className="listings-zillow-panel mb-4">
          <Row className="g-4 g-lg-5 align-items-start">
            <Col lg={4}>
              <div className="listings-agent-panel text-center text-lg-start">
                <div className="listings-agent-photo-ring mx-auto mx-lg-0">
                  <img
                    src={aboutSection.portraitSrc}
                    alt={aboutSection.portraitAlt || agent.name}
                    className="listings-agent-photo"
                  />
                </div>
                <h3 className="listings-agent-name mt-3 mb-1">{agent.name}</h3>
                {agent.pronouns && (
                  <p className="listings-agent-pronouns small mb-2">
                    ({agent.pronouns})
                  </p>
                )}
                <p className="listings-agent-office text-muted small mb-3">
                  {agent.office}
                </p>
                {reviews?.zillowProfileUrl && (
                  <a
                    href={reviews.zillowProfileUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="listings-agent-rating-link text-decoration-none d-inline-flex align-items-center gap-2 flex-wrap justify-content-center justify-content-lg-start"
                  >
                    <span className="fw-semibold" style={{ color: 'var(--ink)' }}>
                      {reviews?.aggregateRating != null
                        ? Number(reviews.aggregateRating).toFixed(1)
                        : '5.0'}
                    </span>
                    <FiStar className="listings-agent-star" aria-hidden />
                    <span className="small">{reviews.reviewSummary}</span>
                  </a>
                )}
              </div>
            </Col>
            <Col lg={8}>
              <div className="recent-sales-block">
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="recent-sales-heading mb-0">
                    {listingsSection?.recentSalesTitle ?? 'Recent sales'}
                  </h3>
                  <div className="d-flex gap-1">
                    <button
                      type="button"
                      className="carousel-nav-btn"
                      aria-label="Scroll recent sales left"
                      onClick={() => scrollCarousel(-1)}
                    >
                      <FiChevronLeft size={20} />
                    </button>
                    <button
                      type="button"
                      className="carousel-nav-btn"
                      aria-label="Scroll recent sales right"
                      onClick={() => scrollCarousel(1)}
                    >
                      <FiChevronRight size={20} />
                    </button>
                  </div>
                </div>
                <div ref={trackRef} className="recent-sales-track">
                  {carouselItems.map((p) => (
                    <article key={p.id} className="recent-sale-card">
                      <div className="recent-sale-img-wrap">
                        <span className="recent-sale-badge">{p.represented}</span>
                        {p.image ? (
                          <img src={p.image} alt="" className="recent-sale-img" />
                        ) : null}
                      </div>
                      <div className="recent-sale-body">
                        <div className="recent-sale-price">{formatMoney(p.price)}</div>
                        <div className="recent-sale-meta text-muted small">
                          {p.beds} bd | {p.baths} ba
                          {p.sqft ? ` | ${p.sqft.toLocaleString()} sqft` : ''}
                          {' · '}
                          {p.city}, {p.state}
                        </div>
                        <div className="recent-sale-status small mt-2">
                          <span className="recent-sale-dot" aria-hidden />
                          {p.soldCaption}
                        </div>
                      </div>
                    </article>
                  ))}
                </div>
              </div>
            </Col>
          </Row>

          {stats.length > 0 && (
            <Row className="listings-stats-row g-0 mt-4 pt-4">
              {stats.map((s) => (
                <Col xs={6} md={3} key={s.label} className="listings-stat-cell">
                  <div className="listings-stat-value">{s.value}</div>
                  <div className="listings-stat-label">{s.label}</div>
                </Col>
              ))}
            </Row>
          )}
        </div>

        <div className="listings-tables-block mb-4">
          <div className="table-responsive listings-table-responsive mb-4">
            <Table className="listings-table align-middle mb-0">
              <thead>
                <tr>
                  <th colSpan={4} className="listings-table-section-title">
                    For sale ({forSale.length})
                  </th>
                </tr>
                <tr className="listings-table-head-row">
                  <th scope="col" />
                  <th scope="col">Address</th>
                  <th scope="col">Bed / bath</th>
                  <th scope="col" className="text-end">
                    Listing price
                  </th>
                </tr>
              </thead>
              <tbody>
                {forSale.length === 0 ? (
                  <tr>
                    <td colSpan={4} className="text-muted py-4">
                      No active listings featured here right now. Reach out for what is available.
                    </td>
                  </tr>
                ) : (
                  forSale.map((p) => (
                    <tr key={p.id}>
                      <td className="listings-table-thumb">
                        {p.image ? (
                          <img src={p.image} alt="" width={72} height={54} className="rounded-2" />
                        ) : null}
                      </td>
                      <td>
                        <span className="fw-medium">
                          {p.address}, {p.city}, {p.state} {p.zip}
                        </span>
                      </td>
                      <td className="text-muted small">
                        {p.beds} bed, {p.baths} bath
                      </td>
                      <td className="text-end fw-semibold">{formatMoney(p.price)}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          </div>

          <div className="table-responsive listings-table-responsive">
            <Table className="listings-table align-middle mb-0">
              <thead>
                <tr>
                  <th colSpan={5} className="listings-table-section-title">
                    Sold ({sold.length})
                  </th>
                </tr>
                <tr className="listings-table-head-row">
                  <th scope="col" />
                  <th scope="col">Address</th>
                  <th scope="col">Sold date</th>
                  <th scope="col">Closing price</th>
                  <th scope="col">Represented</th>
                </tr>
              </thead>
              <tbody>
                {soldSlice.map((p) => (
                  <tr key={p.id}>
                    <td className="listings-table-thumb">
                      {p.image ? (
                        <img src={p.image} alt="" width={72} height={54} className="rounded-2" />
                      ) : null}
                    </td>
                    <td>
                      <span className="fw-medium">
                        {p.address}
                        <span className="text-muted d-block small">
                          {p.city}, {p.state} {p.zip}
                        </span>
                      </span>
                    </td>
                    <td className="text-muted small">{formatTableDate(p.closingDate)}</td>
                    <td className="fw-semibold">{formatMoney(p.price)}</td>
                    <td>{p.represented}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>

          {totalSoldPages > 1 && (
            <div className="listings-page-nav d-flex flex-wrap justify-content-center align-items-center gap-2 mt-3">
              <button
                type="button"
                className="listings-page-btn"
                disabled={soldPage <= 1}
                aria-label="Previous page"
                onClick={() => setSoldPage((p) => Math.max(1, p - 1))}
              >
                ‹
              </button>
              {Array.from({ length: totalSoldPages }, (_, i) => i + 1).map((n) => (
                <button
                  key={n}
                  type="button"
                  className={`listings-page-btn ${n === soldPage ? 'is-active' : ''}`}
                  onClick={() => setSoldPage(n)}
                >
                  {n}
                </button>
              ))}
              <button
                type="button"
                className="listings-page-btn"
                disabled={soldPage >= totalSoldPages}
                aria-label="Next page"
                onClick={() => setSoldPage((p) => Math.min(totalSoldPages, p + 1))}
              >
                ›
              </button>
            </div>
          )}
        </div>

        <div className="listings-map-block">
          <div className="d-flex flex-wrap justify-content-between align-items-center gap-3 mb-3">
            <h3 className="listings-map-title h6 text-uppercase mb-0" style={{ letterSpacing: '0.1em' }}>
              Activity map
            </h3>
            <ul className="listings-map-legend list-unstyled d-flex flex-wrap gap-3 mb-0 small">
              <li className="d-flex align-items-center gap-2">
                <span className="listings-legend-dot" style={{ background: '#b85c5c' }} />
                For sale
              </li>
              <li className="d-flex align-items-center gap-2">
                <span className="listings-legend-dot" style={{ background: '#c9a227' }} />
                Sold
              </li>
              <li className="d-flex align-items-center gap-2 text-muted">
                <span className="listings-legend-dot" style={{ background: '#7d6b9e' }} />
                For rent (none shown)
              </li>
            </ul>
          </div>
          <Suspense
            fallback={(
              <div className="map-loading-fallback" style={{ height: 420 }}>
                Loading map…
              </div>
            )}
          >
            <ListingsMap markers={mapMarkers} />
          </Suspense>
        </div>
      </Container>
    </section>
  );
}
