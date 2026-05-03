import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FiHome, FiLayers, FiDollarSign } from 'react-icons/fi';
import content from '../../data/siteContent.json';
import { sendInquiry } from '../../api/inquiry';

const ICON_MAP = { FiHome, FiLayers, FiDollarSign };

const INIT = {
  name: '', email: '', phone: '', address: '', goal: '', timing: '', message: '',
};

export default function Homeowners() {
  const { homeownerCards } = content;
  const [form, setForm] = useState(INIT);
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState('');

  function handleChange(e) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus('loading');
    try {
      await sendInquiry({ source: 'Homeowner Inquiry', ...form });
      setStatus('success');
      setForm(INIT);
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  }

  return (
    <section id="homeowners" className="section-pad">
      <Container>
        {/* Heading */}
        <div className="text-center mb-5">
          <div className="gold-divider" />
          <h2 className="section-heading">For Homeowners</h2>
          <p className="section-sub">
            Unlock the hidden value in your property. We handle everything from feasibility to closing.
          </p>
        </div>

        {/* Cards */}
        <Row className="g-4 mb-5">
          {homeownerCards.map((card) => {
            const Icon = ICON_MAP[card.icon] || FiHome;
            return (
              <Col key={card.title} xs={12} md={4}>
                <div className="tile-card text-center h-100">
                  <div className="tile-icon"><Icon /></div>
                  <h5 className="fw-bold mb-2" style={{ color: 'var(--brand-navy)' }}>
                    {card.title}
                  </h5>
                  <p className="text-muted" style={{ fontSize: '0.93rem' }}>
                    {card.body}
                  </p>
                </div>
              </Col>
            );
          })}
        </Row>

        {/* Feasibility Form */}
        <Row className="justify-content-center">
          <Col lg={10} xl={8}>
            <div className="inquiry-form">
              <h4 className="fw-bold mb-1" style={{ color: 'var(--brand-navy)' }}>
                Free Feasibility Check
              </h4>
              <p className="text-muted mb-4" style={{ fontSize: '0.92rem' }}>
                Tell us about your property and we&apos;ll get back to you within 1 business day.
              </p>

              {status === 'success' && (
                <Alert variant="success">
                  Thank you! We&apos;ll be in touch within 1 business day.
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
                      placeholder="Jane Smith"
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
                      placeholder="jane@example.com"
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
                    <Form.Label>Property Address *</Form.Label>
                    <Form.Control
                      name="address"
                      value={form.address}
                      onChange={handleChange}
                      required
                      placeholder="123 Main St, Seattle, WA"
                    />
                  </Col>
                  <Col sm={6}>
                    <Form.Label>What&apos;s your goal?</Form.Label>
                    <Form.Select name="goal" value={form.goal} onChange={handleChange}>
                      <option value="">Select one</option>
                      <option value="Add ADU/DADU">Add ADU / DADU</option>
                      <option value="Lot split / townhomes">Lot split / townhomes</option>
                      <option value="Sell as-is">Sell as-is</option>
                      <option value="Compare options">Compare options</option>
                      <option value="Other">Other</option>
                    </Form.Select>
                  </Col>
                  <Col sm={6}>
                    <Form.Label>Timing</Form.Label>
                    <Form.Select name="timing" value={form.timing} onChange={handleChange}>
                      <option value="">Select one</option>
                      <option value="ASAP">ASAP</option>
                      <option value="3–6 months">3–6 months</option>
                      <option value="6–12 months">6–12 months</option>
                      <option value="Just exploring">Just exploring</option>
                    </Form.Select>
                  </Col>
                  <Col xs={12}>
                    <Form.Label>Additional notes</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={3}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Anything else we should know about the property or your situation…"
                    />
                  </Col>
                  <Col xs={12}>
                    <Button
                      type="submit"
                      className="btn-brand"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Sending…' : 'Request Free Feasibility Check'}
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
