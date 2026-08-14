import React, { useEffect, useState } from 'react';

const PARTNER_EMAIL = 'sunsparkmailing@gmail.com';

const EMPTY_FORM = {
  company: '',
  contactName: '',
  email: '',
  phone: '',
  city: '',
  message: '',
};

export default function PartnerModal({ open, onClose }) {
  const [form, setForm] = useState(EMPTY_FORM);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    if (!open) return undefined;
    const onKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setForm(EMPTY_FORM);
      setSubmitted(false);
    }
  }, [open]);

  if (!open) return null;

  const update = (field) => (e) => setForm({ ...form, [field]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = `Sunspark partner application — ${form.company}`;
    const body = [
      `Company: ${form.company}`,
      `Contact person: ${form.contactName}`,
      `Email: ${form.email}`,
      `Phone: ${form.phone}`,
      `City / service area: ${form.city}`,
      '',
      form.message,
    ].join('\n');
    window.location.href = `mailto:${PARTNER_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    setSubmitted(true);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div
        className="modal-card"
        role="dialog"
        aria-modal="true"
        aria-labelledby="partner-modal-title"
        onClick={(e) => e.stopPropagation()}
      >
        <button className="modal-close" aria-label="Close" onClick={onClose}>×</button>

        {submitted ? (
          <div className="modal-success">
            <h2 id="partner-modal-title">Thanks, {form.contactName || 'partner'}!</h2>
            <p>
              Your email app should now be open with the application ready to send. If nothing
              opened, email us directly at <a href={`mailto:${PARTNER_EMAIL}`}>{PARTNER_EMAIL}</a>.
            </p>
            <button className="btn-primary-large" onClick={onClose}>Done</button>
          </div>
        ) : (
          <>
            <h2 id="partner-modal-title">Partner with Sunspark</h2>
            <p className="modal-subtitle">
              Tell us about your solar business and we'll get you set up with qualified,
              high-intent leads in your service area.
            </p>

            <form className="partner-form" onSubmit={handleSubmit}>
              <label>
                Company name
                <input type="text" required value={form.company} onChange={update('company')} />
              </label>
              <label>
                Contact person
                <input type="text" required value={form.contactName} onChange={update('contactName')} />
              </label>
              <label>
                Email
                <input type="email" required value={form.email} onChange={update('email')} />
              </label>
              <label>
                Phone
                <input type="tel" required value={form.phone} onChange={update('phone')} />
              </label>
              <label className="full-width">
                City / service area
                <input type="text" required value={form.city} onChange={update('city')} />
              </label>
              <label className="full-width">
                Anything else? (optional)
                <textarea rows="3" value={form.message} onChange={update('message')} />
              </label>

              <button type="submit" className="btn-primary-large full-width">
                Submit application
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
}
