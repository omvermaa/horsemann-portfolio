"use client";

import styles from "./UIOverlay.module.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

export default function UIOverlay() {
  const { scrollYProgress } = useScroll();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Fade out hero text as we scroll down
  const heroOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);
  const heroY = useTransform(scrollYProgress, [0, 0.1], [0, -50]);

  if (!mounted) return null;

  return (
    <div className={styles.overlayContainer}>
      
      {/* Floating Header / Navigation System */}
      <nav className={styles.nav}>
        <div className={styles.logo}>The Horsemann</div>
        <div className={styles.menuItems}>
          <a href="#services" className={styles.navLink}>Services</a>
          <a href="#work" className={styles.navLink}>Work</a>
          <a href="#contact" className={styles.navLink}>Contact</a>
        </div>
      </nav>

      {/* Hero Section Container (Scrollable distance proxy) */}
      <div className={styles.scrollProxy}>
        
        {/* Hero Section */}
        <motion.section 
          className={styles.heroSection}
          style={{ opacity: heroOpacity, y: heroY }}
        >
          <motion.h1 
            className={styles.heroTitle}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
          >
            The Horsemann
          </motion.h1>
          <motion.p 
            className={styles.heroSubtitle}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.8 }}
          >
            Powering Digital Growth with Precision
          </motion.p>
          
          <motion.button 
            className={styles.ctaButton}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            onClick={() => window.scrollTo({ top: window.innerHeight * 1.2, behavior: 'smooth'})}
          >
            → Enter Experience
          </motion.button>
        </motion.section>

        {/* --- Spacer for spatial 3D scroll (e.g. 600vh total) --- */}
        <div style={{ height: '600vh' }}></div>

        {/* Selected Works Section */}
        <section id="work" className={styles.workSection}>
          <motion.h2 className={styles.sectionTitle} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Selected Works
          </motion.h2>
          <div className={styles.projectsGrid}>
            {[1, 2, 3].map((item) => (
              <motion.div 
                key={item} 
                className={styles.projectCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item * 0.1 }}
                viewport={{ once: true }}
              >
                <div className={styles.projectImage}>[ 3D / Video Placeholder ]</div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>Project {item}</h3>
                  <p className={styles.projectDesc}>High-performance digital solution delivering measurable results and premium branding.</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Client Feedbacks Section */}
        <section id="feedbacks" className={styles.feedbackSection}>
          <motion.h2 className={styles.sectionTitle} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            Client Intelligence
          </motion.h2>
          <div className={styles.feedbackGrid}>
            {[1, 2].map((item) => (
              <motion.div 
                key={item} 
                className={styles.feedbackCard}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: item * 0.1 }}
                viewport={{ once: true }}
              >
                <p className={styles.feedbackText}>"The Horsemann transformed our digital presence into a precision-engineered machine. Their AI solutions gave us an unfair advantage."</p>
                <p className={styles.feedbackAuthor}>— Executive Director, Partner Co.</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Contact Section at the bottom */}
        <section id="contact" className={styles.contactSection} style={{ background: '#0B0B0D' }}>
          <div className={styles.contactPanel}>
            <h2 className={styles.contactTitle}>Start Your Project</h2>
            <p className={styles.contactDesc}>Secure continuous intelligence for your business.</p>
            <form className={styles.contactForm}>
              <input type="text" placeholder="Name" className={styles.input} />
              <input type="email" placeholder="Email" className={styles.input} />
              <textarea placeholder="Message" className={styles.textarea} rows={4}></textarea>
              <button type="submit" className={styles.submitBtn}>Submit Request</button>
            </form>
          </div>
        </section>

      </div>

    </div>
  );
}
