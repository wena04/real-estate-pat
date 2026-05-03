import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FiBarChart2, FiShield, FiRefreshCw } from 'react-icons/fi';
import content from '../../data/siteContent.json';
import { sendInquiry } from '../../api/inquiry';

const ICON_MAP = { FiBarChart2, FiShield, FiRefreshCw };

const INIT = {
  name: '', email: '', phone: '',
  accredited: '', checkSize: '', timeline: '', preference: '', message: '',
};

export default function Investors() {
  const { investorTiles } = content;
  const [form, setForm] = useState(INIT);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      await sendInquiry({ source: 'Investor Inquiry', ...form });
      setStatus('success');
      setForm(INIT);
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  }

  return (
    <section id="investors" className="section-pad">
      <Container>
        {/* Heading */}
        <div className="text-center mb-5">
          <div className="gold-divider" />
          <h2 className="section-heading">For Investors</h2>
          <p className="section-sub">
            Partner with an experienced operator who puts your capital to work in Seattle&apos;s
            most resilient infill markets.
          </p>
        </div>

        {/* Tiles */}
        <Row className="g-4 mb-5">
          {investorTiles.map((tile) => {
            const Icon = ICON_MAP[tile.icon] || FiBarChart2;
            return (
              <Col key={tile.title} xs={12} md={4}>
                <div className="tile-card text-center h-100">
                  <div className="tile-icon"><Icon /></div>
                  <h5 className="fw-bold mb-2" style={{ color: 'var(--brand-navy)' }}>
                    {tile.title}
                  </h5>
                  <p className="text-muted" style={{ fontSize: '0.93rem' }}>
                    {tile.body}
                  </p>
                </div>
              </Col>
            );
          })}
        </Row>

        {/* Investor Form */}
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <div className="inquiry-form">
              <h4 className="fw-bold mb-1" style={{ color: 'var(--brand-navy)' }}>
                Investor Inquiry
              </h4>
              <p className="text-muted mb-4" style={{ fontSize: '0.92rem' }}>
                Tell us about your investment goals and we&apos;ll reach out to discuss current opportunities.
              </p>

              {status === 'success' && (
                <Alert variant="success">
                  Thank you! We&apos;ll be in touch shortly about current opportunities.
                </Alert>
              )}
              {status === 'error' && (
                <Alert variant="danger">{errorMsg || 'Something went wrong. Please try again.'}</Alert>
              )}

              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col sm={6}>
                    <Form.Label>Full Name *</Form.Label>
                    <Form.Control
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="John Smith"
                    />
                  </Col>
                  <Col sm={6}>
                    <Form.Label>Email *</Form.Label>
                    <Form.Control
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      placeholder="john@example.com"
                    />
                  </Col>
                  <Col sm={6}>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(206) 555-0000"
                    />
                  </Col>
                  <Col sm={6}>
                    <Form.Label>Accredited Investor?</Form.Label>
                    <Form.Select name="accredited" value={form.accredited} onChange={handleChange}>
                      <option value="">Select one</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                      <option value="Not sure">Not sure</option>
                    </Form.Select>
                  </Col>
                  <Col sm={6}>
                    <Form.Label>Target Check Size</Form.Label>
                    <Form.Select name="checkSize" value={form.checkSize} onChange={handleChange}>
                      <option value="">Select one</option>
                      <option value="Under $100K">Under $100K</option>
                      <option value="$100K – $250K">$100K – $250K</option>
                      <option value="$250K – $500K">$250K – $500K</option>
                      <option value="$500K+">$500K+</option>
                    </Form.Select>
                  </Col>
                  <Col sm={6}>
                    <Form.Label>Investment Timeline</Form.Label>
                    <Form.Select name="timeline" value={form.timeline} onChange={handleChange}>
                      <option value="">Select one</option>
                      <option value="Ready now">Ready now</option>
                      <option value="3–6 months">3–6 months</option>
                      <option value="6–12 months">6–12 months</option>
                      <option value="Exploring">Exploring</option>
                    </Form.Select>
                  </Col>
                  <Col xs={12}>
                    <Form.Label>Preference</Form.Label>
                    <Form.Select name="preference" value={form.preference} onChange={handleChange}>
                      <option value="">Select one</option>
                      <option value="Equity">Equity (own a share)</option>
                      <option value="Debt">Debt (hard money / preferred return)</option>
                      <option value="Either">Either</option>
                    </Form.Select>
                  </Col>
                  <Col xs={12}>
                    <Form.Label>Tell us more</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Any specific locations, project types, or return targets you have in mind…"
                    />
                  </Col>
                  <Col xs={12}>
                    <Button
                      type="submit"
                      className="btn-brand"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Sending…' : 'Submit Investor Inquiry'}
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
}
