import React from 'react'
import styles from './SharedPage.module.css'

export default function About() {
  return (
    <div className={`${styles.page} ${styles.pageNarrow}`}>
      <h1 className={styles.title}>About Mysa</h1>
      <p className={styles.subtitle}>
        "Mysa" (pronounced mee-sah) is a Swedish concept meaning to engage in an activity that is comfortable, pleasurable, and relaxing. That is exactly what we bring to your wardrobe management.
      </p>

      <div className={styles.textContent}>
        <p>
          Founded in 2023, Mysa was born out of a simple frustration: premium clothing deserves premium care, but local dry cleaners often use harsh chemicals, ruin fabrics, and require tedious drop-offs and pick-ups.
        </p>
        <p>
          We built Mysa to be the modern valet for your wardrobe. By combining state-of-the-art garment care technology—like our flagship tension-equipment steam pressing and PERC-free dry cleaning—with a seamless digital experience, we've removed the friction from laundry.
        </p>
        <p>
          Today, we serve over 50,000 customers across major metropolitan areas. Our team consists of master pressers, textile experts, and dedicated logistics professionals who ensure that every garment is returned to you crisp, clean, and ready to wear.
        </p>
        <blockquote className={styles.blockquote}>
          "Our mission is to give you back your time while extending the life of the clothes you love."
        </blockquote>
      </div>
    </div>
  )
}
