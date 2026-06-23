import { useEffect, useRef, useState } from 'react'
import { Link } from 'react-router-dom'
import heroImg from '../../assets/hero_ironing.jpg'

import styles from './Home.module.css'

const PHRASES = [
  'Picked up from your door.',
  'Expertly steam ironed.',
  'Handled with care.',
  'Returned perfectly crisp.',
]

const SERVICES = [
  {
    icon: '✨',
    title: 'Premium Steam Ironing',
    desc: 'Crisp lines, zero effort. Our flagship service.',
    detailTitle: 'Premium Steam Ironing',
    detailDesc: 'Steam ironing is not just a chore; it\'s an art. Our master pressers use state-of-the-art industrial tension equipment and temperature-controlled steam to ensure your shirts, trousers, and delicate linens have razor-sharp creases and are completely wrinkle-free. We treat each fabric type—from heavy cottons to delicate silks—with the exact temperature and steam pressure it requires, extending the life of your garments and keeping you looking impeccably sharp.',
  },

]

const TESTIMONIALS = [
  { name: 'Priya S.', city: 'Delhi', service: 'Specialist Care', quote: 'Mysa turned a chaotic laundry pile into a non-problem. The valet shows up exactly when promised. Incredible.' },
  { name: 'Ananya K.', city: 'Bangalore', service: 'Wedding & Couture', quote: 'My wedding lehenga was returned in perfect condition. I was honestly nervous, but Mysa handled it flawlessly.' },
  { name: 'Arjun M.', city: 'Mumbai', service: 'Dry Cleaning', quote: 'The dry cleaning is better than anything I found locally. Worth every rupee.' },
  { name: 'Deepak R.', city: 'Pune', service: 'Bulk Linen', quote: 'As a hotel owner, Mysa\'s bulk linen service has cut our turnaround time in half.' },
  { name: 'Meera T.', city: 'Chennai', service: 'Steam & Press', quote: 'Shirts come back perfectly pressed every time. I won\'t use anyone else.' },
  { name: 'Rahul V.', city: 'Hyderabad', service: 'Dry Cleaning', quote: 'Exceptional service. My suits look brand new after every clean.' },
]

function useTypingEffect() {
  const [text, setText] = useState('')
  const [phraseIdx, setPhraseIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const phrase = PHRASES[phraseIdx]
    let timeout

    if (!deleting && charIdx === phrase.length) {
      timeout = setTimeout(() => setDeleting(true), 2000)
    } else if (deleting && charIdx === 0) {
      setDeleting(false)
      setPhraseIdx(i => (i + 1) % PHRASES.length)
    } else {
      const speed = deleting ? 40 : 90
      timeout = setTimeout(() => {
        setCharIdx(i => deleting ? i - 1 : i + 1)
        setText(phrase.substring(0, deleting ? charIdx - 1 : charIdx + 1))
      }, speed)
    }

    return () => clearTimeout(timeout)
  }, [charIdx, deleting, phraseIdx])

  return text
}

function RevealSection({ children, className = '', delay = '' }) {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const ob = new IntersectionObserver(([e]) => { if (e.isIntersecting) el.classList.add('visible') }, { threshold: 0.1 })
    ob.observe(el)
    return () => ob.disconnect()
  }, [])
  return <div ref={ref} className={`reveal ${delay} ${className}`}>{children}</div>
}

export default function Home({ openModal }) {
  const typedText = useTypingEffect()
  const heroRef = useRef(null)
  const heroImgRef = useRef(null)
  const appMockupRef = useRef(null)
  const [postcode, setPostcode] = useState('')
  const [serviceStatus, setServiceStatus] = useState(null) // null | 'serviceable' | 'not-serviceable'

  const NAGPUR_PINCODES_MIN = 440001
  const NAGPUR_PINCODES_MAX = 440037

  const checkServiceability = (code) => {
    setPostcode(code)
    if (code.length === 6 && /^\d{6}$/.test(code)) {
      const pin = parseInt(code, 10)
      if (pin >= NAGPUR_PINCODES_MIN && pin <= NAGPUR_PINCODES_MAX) {
        setServiceStatus('serviceable')
      } else {
        setServiceStatus('not-serviceable')
      }
    } else {
      setServiceStatus(null)
    }
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY
      if (heroImgRef.current && scrollY < window.innerHeight) {
        const isTouch = window.matchMedia('(pointer: coarse)').matches
        if (!isTouch) heroImgRef.current.style.transform = `translateY(${scrollY * 0.12}px)`
      }
      if (appMockupRef.current) {
        const rect = appMockupRef.current.getBoundingClientRect()
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          const progress = 1 - rect.top / window.innerHeight
          appMockupRef.current.style.transform = `rotateY(${-15 + progress * 10}deg) rotateX(${5 - progress * 5}deg)`
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div className={styles.page}>

      {/* HERO */}
      <section className={styles.hero} ref={heroRef}>
        <div className={styles.heroContent}>
          <RevealSection className={styles.eyebrowWrap}>
            <div className="eyebrow">Steam-perfect. Time-perfect.</div>
          </RevealSection>
          <RevealSection delay="delay-1">
            <h1 className={styles.heroTitle}>Premium<br /><em>Steam Ironing Service.</em></h1>
          </RevealSection>
          <RevealSection delay="delay-2">
            <p className={styles.heroSub}>
              <span>{typedText}</span>
              <span className="type-cursor" />
            </p>
          </RevealSection>
          <RevealSection delay="delay-3" className={styles.heroCta}>
            <button className="btn-primary" onClick={() => window.open('https://wa.me/917387517557?text=Hi%20Mysa!%20I%27d%20like%20to%20book%20a%20pickup%20for%20your%20premium%20steam%20ironing%20service.', '_blank')}>
              Book on WhatsApp
            </button>
            <a href="#how" className={styles.linkArrow}>
              See how it works <span>→</span>
            </a>
          </RevealSection>
          <RevealSection delay="delay-4" className={styles.socialProof}>
            <div>
              <div className="stars">★★★★★</div>
              <div className={styles.spText}>4.9 from 12,000+ reviews</div>
            </div>
            <div className={styles.divider} />
            <div className={styles.avatars}>
              {['#C8C0B4', '#E8E4DC', '#7A9E87'].map((c, i) => (
                <div key={i} className={styles.avatar} style={{ background: c }} />
              ))}
            </div>
            <div className={styles.spText}>50k+ happy customers</div>
          </RevealSection>
        </div>
        <div className={styles.heroVisual}>
          <div className={styles.heroGlow} />
          <img src={heroImg} alt="Crisp white shirts on wooden hangers" ref={heroImgRef} className={styles.heroImg} />
          <div className={styles.floatingCard}>
            <span className="pulse-dot" />
            <div>
              <strong>Order #MY-4821</strong><br />
              <span style={{ fontSize: 11, opacity: 0.6 }}>Out for Delivery</span>
            </div>
          </div>
        </div>
      </section>

      {/* TRUST BAR */}
      <div className={styles.trustBar}>
        <div className={styles.marquee}>
          {Array(2).fill(['Free Pickup & Delivery', 'Same-Day Service Available', 'Eco-Certified Cleaning', '50,000+ Orders Delivered', 'Specialist Garment Care', 'No Subscription Required', '4.9★ Customer Rating', '100% Satisfaction Guarantee']).flat().map((item, i) => (
            <span key={i} className={styles.marqueeItem}>
              {item} <span className={styles.diamond}>◆</span>
            </span>
          ))}
        </div>
      </div>

      {/* SERVICES */}
      <section className={`section-padding ${styles.servicesSection}`} id="services">
        <RevealSection className={styles.sectionHeader}>
          <div className="eyebrow">What We Care For</div>
          <h2>Every garment. Every fabric. Every time.</h2>
        </RevealSection>
        <RevealSection delay="delay-1" className={styles.servicesGrid}>
          {SERVICES.map((svc) => (
            <div key={svc.title} className={styles.serviceCard}>
              <div className={styles.serviceIcon}>{svc.icon}</div>
              <h3>{svc.title}</h3>
              <p>{svc.desc}</p>
              <div className={styles.cardBottom}>
                <button
                  className={styles.cardLink}
                  onClick={() => openModal('learn', { title: svc.detailTitle, desc: svc.detailDesc })}
                >
                  Learn more →
                </button>
              </div>
            </div>
          ))}
        </RevealSection>
      </section>

      {/* HOW IT WORKS */}
      <section className={`section-padding ${styles.howSection}`} id="how">
        <RevealSection className={styles.sectionHeader}>
          <div className="eyebrow" style={{ color: 'var(--brand-sage)' }}>The Mysa Process</div>
          <h2 style={{ color: '#fff', fontStyle: 'italic', fontWeight: 400, fontSize: 52 }}>Effortless from door to door.</h2>
        </RevealSection>
        <RevealSection delay="delay-1" className={styles.timeline}>
          {[
            { step: 'A', icon: '📅', title: 'Schedule', desc: 'Pick your time slot through the Mysa app or website. Available 7 days a week.' },
            { step: 'B', icon: '🚗', title: 'We Collect', desc: 'Your dedicated Mysa Valet arrives on time. No waiting. Leave your bag at the door.' },
            { step: 'C', icon: '🔬', title: 'Expert Care', desc: 'Each item is inspected and cleaned by specialists using eco-certified processes.' },
            { step: 'D', icon: '📦', title: 'Delivered Fresh', desc: 'Returned to your door on wooden hangers, in protective garment bags.' },
          ].map((s) => (
            <div key={s.step} className={styles.step}>
              <div className={styles.stepIcon}>{s.icon}</div>
              <span className={styles.stepLabel}>Step {s.step}</span>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </RevealSection>
        <RevealSection delay="delay-3" className={styles.testimonialFloat}>
          <div className="stars">★★★★★</div>
          <p style={{ fontStyle: 'italic', fontSize: 13, marginTop: 8 }}>
            "Honestly the best service I've ever used. My suits come back looking brand new."<br /><br />
            — Rohan M., Mumbai
          </p>
        </RevealSection>
      </section>

      {/* BOOKING WIDGET */}
      <section className={styles.bookingWidget}>
        <RevealSection>
          <h2>Ready in 60 seconds.</h2>
          <p>Enter your postcode and book your first pickup free.</p>
          <div className={styles.bookingForm}>
            <input
              type="text"
              placeholder="Enter your postcode..."
              value={postcode}
              onChange={e => checkServiceability(e.target.value.slice(0, 6))}
              maxLength={6}
            />
            {!serviceStatus && (
              <button disabled style={{ opacity: 0.5, cursor: 'default' }}>Check Availability</button>
            )}
            {serviceStatus === 'serviceable' && (
              <button onClick={() => window.open(`https://wa.me/917387517557?text=Hi%20Mysa!%20I%27d%20like%20to%20book%20a%20pickup%20for%20your%20premium%20steam%20ironing%20service.%20My%20postcode%20is%20${postcode}.`, '_blank')}>Book on WhatsApp →</button>
            )}
            {serviceStatus === 'not-serviceable' && (
              <button disabled style={{ background: '#ccc', cursor: 'default', color: '#666' }}>Not Available</button>
            )}
          </div>
          {serviceStatus && (
            <div className={styles.serviceStatusMsg} style={{ color: serviceStatus === 'serviceable' ? '#4ADE80' : '#F87171' }}>
              {serviceStatus === 'serviceable' ? (
                <><span style={{ fontSize: 18 }}>✓</span> Great news! We service your area in Nagpur.</>
              ) : (
                <><span style={{ fontSize: 18 }}>✗</span> Sorry, we don't service this area yet. We're expanding soon!</>
              )}
            </div>
          )}
        </RevealSection>
      </section>

      {/* TESTIMONIAL VIDEO */}
      <section className={styles.testimonialVideoSection}>
        <div className={styles.testVideoContent}>
          <RevealSection>
            <div className="eyebrow" style={{ color: 'var(--brand-sage)' }}>CUSTOMER STORIES</div>
          </RevealSection>
          <RevealSection delay="delay-1">
            <h2 className={styles.testVideoTitle}>"Mysa completely changed how I manage my wardrobe."</h2>
          </RevealSection>
          <RevealSection delay="delay-2">
            <p className={styles.testVideoDesc}>
              "The premium steam ironing is absolutely flawless. My clothes have never looked this crisp, and the door-to-door service saves me so much time every week. I highly recommend it!"
            </p>
          </RevealSection>
          <RevealSection delay="delay-3" className={styles.testAuthor}>
            <div className={styles.testAuthorAvatar}>R</div>
            <div>
              <div className={styles.testAuthorName}>Rahul Desai</div>
              <div className={styles.testAuthorRole}>Regular Customer</div>
            </div>
          </RevealSection>
        </div>
        <RevealSection delay="delay-2" className={styles.testVideoWrapper}>
          <video 
            src="/mysa-testimonial.mp4" 
            className={styles.testVideo} 
            autoPlay 
            muted 
            loop 
            controls
            playsInline 
          />
        </RevealSection>
      </section>

      {/* FINAL CTA */}
      <section className={styles.finalCta}>
        <RevealSection>
          <h2>Your first pickup is on us.</h2>
          <p>No commitment. No signup fee. Just clean clothes.</p>
          <button className="btn-white" onClick={() => window.open('https://wa.me/917387517557?text=Hi%20Mysa!%20I%27d%20like%20to%20book%20a%20pickup%20for%20your%20premium%20steam%20ironing%20service.', '_blank')}>Book on WhatsApp</button>
        </RevealSection>
      </section>

    </div>
  )
}
