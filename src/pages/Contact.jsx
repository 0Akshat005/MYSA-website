import { useState } from 'react'
import styles from './Contact.module.css'

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', phone: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [focused, setFocused] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    const msg = [
      `Hi Mysa! I'd like to get in touch.`,
      ``,
      `*Name:* ${formData.name}`,
      `*Email:* ${formData.email}`,
      formData.phone ? `*Phone:* ${formData.phone}` : '',
      formData.subject ? `*Subject:* ${formData.subject}` : '',
      ``,
      `*Message:*`,
      formData.message
    ].filter(Boolean).join('\n')
    
    window.open(`https://wa.me/917387517557?text=${encodeURIComponent(msg)}`, '_blank')
    setSubmitted(true)
  }

  const handleChange = (field) => (e) => setFormData({ ...formData, [field]: e.target.value })

  if (submitted) {
    return (
      <div className={styles.successPage}>
        <div className={styles.successCard}>
          <div className={styles.successIcon}>✓</div>
          <h2>Message Sent!</h2>
          <p>Thank you for reaching out. Our team will get back to you within 24 hours.</p>
          <button className={styles.backBtn} onClick={() => setSubmitted(false)}>Send Another Message</button>
        </div>
      </div>
    )
  }

  return (
    <div className={styles.page}>

      {/* HERO */}
      <div className={styles.hero}>
        <div className={styles.heroInner}>
          <span className={styles.eyebrow}>Get In Touch</span>
          <h1 className={styles.heroTitle}>Contact Us</h1>
          <p className={styles.heroSub}>Have a question about a garment? Need help with an order?<br />We're here for you — every day, every step.</p>
        </div>
        <div className={styles.heroBg} />
      </div>

      {/* INFO CARDS */}
      <div className={styles.infoSection}>
        <div className={styles.infoGrid}>
          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 13.5a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.6 2.69h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 10a16 16 0 0 0 6.09 6.09l1.87-1.87a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
              </svg>
            </div>
            <h3>Call Us</h3>
            <p>Available 7 days a week<br />8am – 8pm IST</p>
            <a href="tel:+917387517557" className={styles.infoLink}>+91 73875 17557</a>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect width="20" height="16" x="2" y="4" rx="2"/>
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
              </svg>
            </div>
            <h3>Email Us</h3>
            <p>We reply within 24 hours<br />for all enquiries</p>
            <a href="mailto:mysadigital.com@gmail.com" className={styles.infoLink}>mysadigital.com@gmail.com</a>
          </div>

          <div className={styles.infoCard}>
            <div className={styles.infoIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10"/>
                <polyline points="12 6 12 12 16 14"/>
              </svg>
            </div>
            <h3>Working Hours</h3>
            <p>Mon – Sun<br />8:00 AM – 8:00 PM</p>
            <span className={styles.openBadge}>● Open Now</span>
          </div>
        </div>
      </div>

      {/* CONTACT FORM */}
      <div className={styles.formSection}>
        <div className={styles.formWrapper}>
          <div className={styles.formLeft}>
            <span className={styles.eyebrow}>Send a Message</span>
            <h2 className={styles.formTitle}>We'd love to<br /><em>hear from you.</em></h2>
            <p className={styles.formDesc}>Whether it's about a specific garment, a delivery query, or a bulk business partnership — drop us a message and we'll be in touch.</p>
            <div className={styles.formFeatures}>
              {['Fast 24-hour response', 'Dedicated support team', 'Business & bulk enquiries welcome'].map(f => (
                <div key={f} className={styles.feature}>
                  <span className={styles.featureDot}>✦</span>
                  <span>{f}</span>
                </div>
              ))}
            </div>
          </div>

          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.formRow}>
              <div className={`${styles.inputWrap} ${focused === 'name' ? styles.active : ''}`}>
                <label>Full Name</label>
                <input
                  type="text" placeholder="Priya Sharma" required
                  value={formData.name}
                  onChange={handleChange('name')}
                  onFocus={() => setFocused('name')}
                  onBlur={() => setFocused('')}
                />
              </div>
              <div className={`${styles.inputWrap} ${focused === 'email' ? styles.active : ''}`}>
                <label>Email Address</label>
                <input
                  type="email" placeholder="priya@example.com" required
                  value={formData.email}
                  onChange={handleChange('email')}
                  onFocus={() => setFocused('email')}
                  onBlur={() => setFocused('')}
                />
              </div>
            </div>

            <div className={styles.formRow}>
              <div className={`${styles.inputWrap} ${focused === 'phone' ? styles.active : ''}`}>
                <label>Phone Number</label>
                <input
                  type="tel" placeholder="+91 98765 43210"
                  value={formData.phone}
                  onChange={handleChange('phone')}
                  onFocus={() => setFocused('phone')}
                  onBlur={() => setFocused('')}
                />
              </div>
              <div className={`${styles.inputWrap} ${focused === 'subject' ? styles.active : ''}`}>
                <label>Subject</label>
                <select
                  value={formData.subject}
                  onChange={handleChange('subject')}
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused('')}
                >
                  <option value="">Select a topic...</option>
                  <option>Order Enquiry</option>
                  <option>Garment Question</option>
                  <option>Business Partnership</option>
                  <option>Feedback</option>
                  <option>Other</option>
                </select>
              </div>
            </div>

            <div className={`${styles.inputWrap} ${focused === 'message' ? styles.active : ''}`}>
              <label>Your Message</label>
              <textarea
                placeholder="Tell us how we can help you..."
                rows="5" required
                value={formData.message}
                onChange={handleChange('message')}
                onFocus={() => setFocused('message')}
                onBlur={() => setFocused('')}
              />
            </div>

            <button type="submit" className={styles.submitBtn}>
              Send on WhatsApp
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </button>
          </form>
        </div>
      </div>

    </div>
  )
}
