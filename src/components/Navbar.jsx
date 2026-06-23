import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import logo from '../../assets/logo.png'
import styles from './Navbar.module.css'

export default function Navbar({ openModal }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
    document.body.classList.remove('modal-open')
  }, [location])

  const toggleMobile = () => {
    setMobileOpen(prev => {
      const next = !prev
      document.body.classList.toggle('modal-open', next)
      return next
    })
  }

  const navLinks = [
    { label: 'Home', to: '/' },
    { label: 'Services', to: '/services' },
    { label: 'How It Works', to: '/how-it-works' },
    { label: 'Sustainability', to: '/sustainability' },
    { label: 'About', to: '/about' },
    { label: 'Contact', to: '/contact' },
  ]

  return (
    <>
      <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
        <Link to="/" className={styles.logo}>
          <img src={logo} alt="Mysa Logo" className={styles.logoImg} />
        </Link>

        <div className={styles.navLinks}>
          {navLinks.map(l => (
            <Link
              key={l.to}
              to={l.to}
              className={`${styles.navLink} ${location.pathname === l.to ? styles.active : ''}`}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className={styles.navActions}>
          <button className="btn-primary" onClick={() => window.open('https://wa.me/917387517557?text=Hi%20Mysa!%20I%27d%20like%20to%20book%20a%20pickup%20for%20your%20premium%20steam%20ironing%20service.', '_blank')}>
            Book on WhatsApp
          </button>
        </div>

        <button
          className={`${styles.hamburger} ${mobileOpen ? styles.active : ''}`}
          onClick={toggleMobile}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile Menu */}
      <div className={`${styles.mobileMenu} ${mobileOpen ? styles.open : ''}`}>
        {navLinks.map((l, i) => (
          <Link key={l.to} to={l.to} className={styles.mobileLink} style={{ transitionDelay: `${(i + 1) * 0.08}s` }}>
            {l.label}
          </Link>
        ))}
        <button
          className={`btn-primary ${styles.mobileCta}`}
          style={{ transitionDelay: '0.56s' }}
          onClick={() => { window.open('https://wa.me/917387517557?text=Hi%20Mysa!%20I%27d%20like%20to%20book%20a%20pickup%20for%20your%20premium%20steam%20ironing%20service.', '_blank'); toggleMobile() }}
        >
          Book on WhatsApp
        </button>
      </div>
    </>
  )
}
