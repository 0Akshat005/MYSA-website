import { BrowserRouter, Routes, Route, useNavigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Loader from './components/Loader'
import BookingModal from './components/BookingModal'
import { useState, useEffect } from 'react'

// Pages
import Home from './pages/Home'
import Services from './pages/Services'
import HowItWorks from './pages/HowItWorks'
import Contact from './pages/Contact'
import About from './pages/About'

function AppInner() {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(true)
  const [modalOpen, setModalOpen] = useState(false)
  const [modalType, setModalType] = useState('learn')
  const [learnData, setLearnData] = useState({ title: '', desc: '' })

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1400)
    return () => clearTimeout(timer)
  }, [])

  const openModal = (type, data = {}) => {
    setModalType(type)
    if (data.title) setLearnData(data)
    setModalOpen(true)
    document.body.classList.add('modal-open')
  }

  const closeModal = () => {
    setModalOpen(false)
    document.body.classList.remove('modal-open')
  }

  return (
    <>
      <Loader visible={loading} />
      <Navbar openModal={openModal} />
      <main>
        <Routes>
          <Route path="/" element={<Home openModal={openModal} />} />
          <Route path="/services" element={<Services openModal={openModal} />} />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <Footer openModal={openModal} />
      <BookingModal
        open={modalOpen}
        onClose={closeModal}
        type={modalType}
        learnData={learnData}
        onSwitchToBooking={() => navigate('/contact')}
      />

      {/* Floating WhatsApp Button */}
      <a
        href="https://wa.me/917387517557?text=Hi%20Mysa!%20I%27d%20like%20to%20know%20more%20about%20your%20premium%20steam%20ironing%20service."
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-fab"
        aria-label="Chat on WhatsApp"
      >
        <svg viewBox="0 0 32 32" width="28" height="28" fill="#fff">
          <path d="M16.004 0h-.008C7.174 0 0 7.176 0 16.004c0 3.5 1.132 6.744 3.056 9.376L1.056 31.2l6.06-1.94A15.91 15.91 0 0 0 16.004 32C24.826 32 32 24.826 32 16.004 32 7.176 24.826 0 16.004 0zm9.31 22.612c-.39 1.1-1.932 2.012-3.164 2.278-.844.18-1.944.322-5.652-1.216-4.748-1.966-7.802-6.782-8.036-7.098-.226-.316-1.886-2.512-1.886-4.792s1.188-3.398 1.618-3.866c.39-.424.918-.618 1.22-.618.148 0 .282.008.402.014.43.018.646.044.93.722.354.846 1.216 2.96 1.322 3.176.108.218.21.508.066.796-.136.296-.254.478-.472.734-.218.254-.424.45-.642.726-.196.24-.418.496-.172.926.246.424 1.094 1.802 2.35 2.92 1.616 1.438 2.928 1.904 3.396 2.1.35.148.766.11 1.022-.168.326-.354.728-.94 1.138-1.518.292-.414.662-.466 1.048-.316.39.144 2.496 1.178 2.924 1.392.43.218.714.322.82.502.104.18.104 1.044-.286 2.146z"/>
        </svg>
      </a>
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <AppInner />
    </BrowserRouter>
  )
}
