import styles from './BookingModal.module.css'

export default function BookingModal({ open, onClose, type, learnData, onSwitchToBooking }) {
  return (
    <div className={`${styles.overlay} ${open ? styles.open : ''}`} onClick={e => e.target === e.currentTarget && onClose()}>
      <div className={styles.box}>
        <button className={styles.close} onClick={onClose}>✕</button>

        {type === 'learn' && (
          <div>
            <h2 className={styles.title}>{learnData.title}</h2>
            <p className={styles.desc}>{learnData.desc}</p>
            <button className={styles.submitBtn} onClick={onSwitchToBooking}>Book This Service →</button>
          </div>
        )}

        {type === 'booking' && (
          <div>
            <h2 className={styles.title}>Book a Pickup</h2>
            <p className={styles.sub}>Your wardrobe deserves better. Schedule a pickup in under a minute.</p>
            <form onSubmit={(e) => { e.preventDefault(); onClose(); }}>
              <div className={styles.inputGroup}>
                <label>Full Name</label>
                <input type="text" placeholder="e.g. Akshat Sharma" required />
              </div>
              <div className={styles.inputGroup}>
                <label>Address</label>
                <input type="text" placeholder="e.g. 123, MG Road, Mumbai" required />
              </div>
              <div className={styles.inputGroup}>
                <label>Postcode</label>
                <input type="text" placeholder="e.g. 400050" required />
              </div>
              <div className={styles.inputGroup}>
                <label>Service Type</label>
                <select required defaultValue="Wash & Fold">
                  <option value="Wash & Fold">Wash & Fold</option>
                  <option value="Premium Steam Ironing">Premium Steam Ironing</option>
                  <option value="Specialist Care">Specialist Care</option>
                </select>
              </div>
              <div className={styles.inputGroup}>
                <label>Preferred Date</label>
                <input type="date" required defaultValue="2026-06-23" />
              </div>
              <button type="submit" className={styles.submitBtn}>Confirm Booking</button>
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
