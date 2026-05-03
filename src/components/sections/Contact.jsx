import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FiPhone, FiMail, FiMapPin, FiMessageSquare } from 'react-icons/fi';
import content from '../../data/siteContent.json';
import { sendInquiry } from '../../api/inquiry';

const { agent } = content;

const INIT = { name: '', email: '', phone: '', message: '' };

export default function Contact() {
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
      await sendInquiry({ source: 'General Contact', ...form });
      setStatus('success');
      setForm(INIT);
    } catch (err) {
      setErrorMsg(err.message);
      setStatus('error');
    }
  }

  return (
    <section id="contact" className="contact-section section-pad">
      <Container>
        <div className="text-center mb-5">
          <div className="gold-divider" />
          <h2 className="section-heading">Get in Touch</h2>
          <p className="section-sub">
            Questions? Ready to start? Reach out and we&apos;ll respond within 1 business day.
          </p>
        </div>

        <Row className="g-5 justify-content-center">
          {/* Contact details */}
          <Col lg={4}>
            <h5 className="fw-bold mb-4" style={{ color: 'var(--brand-navy)' }}>
              {agent.name}
            </h5>
            <ul className="list-unstyled" style={{ lineHeight: 2 }}>
              <li className="d-flex align-items-start gap-3">
                <FiMapPin size={18} style={{ color: 'var(--brand-gold)', marginTop: 4, flexShrink: 0 }} />
                <span>
                  {agent.office}<br />
                  {agent.address}
                </span>
              </li>
              <li className="d-flex align-items-center gap-3">
                <FiPhone size={18} style={{ color: 'var(--brand-gold)', flexShrink: 0 }} />
                <a href={`tel:${agent.phone.replace(/\D/g, '')}`} className="text-dark text-decoration-none">
                  {agent.phone}
                </a>
              </li>
              <li className="d-flex align-items-center gap-3">
                <FiMail size={18} style={{ color: 'var(--brand-gold)', flexShrink: 0 }} />
                <a href={`mailto:${agent.email}`} className="text-dark text-decoration-none">
                  {agent.email}
                </a>
              </li>
              <li className="d-flex align-items-center gap-3">
                <FiMessageSquare size={18} style={{ color: 'var(--brand-gold)', flexShrink: 0 }} />
                <span>WeChat: {agent.wechat}</span>
              </li>
            </ul>
          </Col>

          {/* Contact form */}
          <Col lg={6}>
            <div className="inquiry-form">
              {status === 'success' && (
                <Alert variant="success">
                  Message received! We&apos;ll get back to you soon.
                </Alert>
              )}
              {status === 'error' && (
                <Alert variant="danger">{errorMsg || 'Something went wrong. Please try again.'}</Alert>
              )}
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col sm={6}>
                    <Form.Label>Name *</Form.Label>
                    <Form.Control
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
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
                      placeholder="you@example.com"
                    />
                  </Col>
                  <Col xs={12}>
                    <Form.Label>Phone</Form.Label>
                    <Form.Control
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(206) 555-0000"
                    />
                  </Col>
                  <Col xs={12}>
                    <Form.Label>Message *</Form.Label>
                    <Form.Control
                      as="textarea"
                      rows={4}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      placeholder="How can Patricia help you?"
                    />
                  </Col>
                  <Col xs={12}>
                    <Button
                      type="submit"
                      className="btn-brand"
                      disabled={status === 'loading'}
                    >
                      {status === 'loading' ? 'Sending…' : 'Send Message'}
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
