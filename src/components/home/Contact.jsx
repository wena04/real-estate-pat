import { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import { FiPhone, FiMail, FiMapPin, FiMessageSquare } from 'react-icons/fi';
import content from '../../data/siteContent.json';
import { sendInquiry } from '../../api/inquiry';

const { agent, contactSection } = content;

const INIT = { name: '', email: '', phone: '', message: '' };

export default function Contact() {
  const [form, setForm] = useState(INIT);
  const [status, setStatus] = useState('idle');
  const [errorMsg, setErrorMsg] = useState('');

  const heading = contactSection?.heading ?? 'Get in touch';
  const subheading = contactSection?.subheading ?? "Questions? Ready to start? We'll respond within one business day.";
  const wechatQrSrc = contactSection?.wechatQrSrc;
  const wechatQrCaption = contactSection?.wechatQrCaption;

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
        <div className="text-center section-head">
          <div className="gold-divider" />
          <h2 className="section-heading">{heading}</h2>
          <p className="section-sub mb-0">{subheading}</p>
        </div>

        <Row className="g-4 g-xl-5 justify-content-center align-items-start">
          <Col lg={5} xl={4}>
            {wechatQrSrc && (
              <div className="wechat-primary-card text-center mx-auto mx-lg-0">
                <p className="wechat-primary-eyebrow font-body mb-2">Fastest reply</p>
                <h3 className="wechat-primary-title mb-3">WeChat</h3>
                <div className="wechat-qr-frame mx-auto">
                  <img
                    src={wechatQrSrc}
                    alt="WeChat QR code to add Patricia Wen"
                    className="wechat-qr-img wechat-qr-img--hero"
                  />
                </div>
                {wechatQrCaption && (
                  <p className="wechat-primary-caption text-muted mt-3 mb-2">
                    {wechatQrCaption}
                  </p>
                )}
                <p className="small text-muted mb-0">
                  <FiMessageSquare className="contact-icon me-1" size={14} aria-hidden />
                  ID: <span className="fw-semibold" style={{ color: 'var(--ink)' }}>{agent.wechat}</span>
                </p>
              </div>
            )}
          </Col>

          <Col lg={7} xl={8}>
            <h5 className="fw-bold mb-4 font-body" style={{ color: 'var(--ink)' }}>
              Phone, email &amp; office
            </h5>
            <ul className="list-unstyled mb-4" style={{ lineHeight: 2 }}>
              <li className="d-flex align-items-start gap-3">
                <FiMapPin size={18} className="contact-icon mt-1 flex-shrink-0" />
                <span className="text-muted">
                  {agent.office}<br />
                  {agent.address}
                </span>
              </li>
              <li className="d-flex align-items-center gap-3">
                <FiPhone size={18} className="contact-icon flex-shrink-0" />
                <a href={`tel:${agent.phone.replace(/\D/g, '')}`} className="text-dark text-decoration-none">
                  {agent.phone}
                </a>
              </li>
              <li className="d-flex align-items-center gap-3">
                <FiMail size={18} className="contact-icon flex-shrink-0" />
                <a href={`mailto:${agent.email}`} className="text-dark text-decoration-none">
                  {agent.email}
                </a>
              </li>
            </ul>

            <div className="inquiry-form">
              {status === 'success' && (
                <Alert variant="success">
                  Message received! We&apos;ll get back to you soon.
                </Alert>
              )}
              {status === 'error' && (
                <Alert variant="danger">{errorMsg || 'Something went wrong. Please try again.'}</Alert>
              )}
              <p className="small fw-semibold text-uppercase mb-3" style={{ letterSpacing: '0.08em', color: 'var(--muted)' }}>
                Or send a message
              </p>
              <Form onSubmit={handleSubmit}>
                <Row className="g-3">
                  <Col sm={6}>
                    <Form.Label className="small fw-semibold">Name *</Form.Label>
                    <Form.Control
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      required
                      placeholder="Your name"
                    />
                  </Col>
                  <Col sm={6}>
                    <Form.Label className="small fw-semibold">Email *</Form.Label>
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
                    <Form.Label className="small fw-semibold">Phone</Form.Label>
                    <Form.Control
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="(206) 555-0000"
                    />
                  </Col>
                  <Col xs={12}>
                    <Form.Label className="small fw-semibold">Message *</Form.Label>
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
                      {status === 'loading' ? 'Sending…' : 'Contact me'}
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
