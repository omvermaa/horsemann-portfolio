"use client";

import styles from "./UIOverlay.module.css";
import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useState } from "react";

const servicesData = [
  { id: "01", category: "Web Ecosystem", title: "WebApp Development", desc: "I design and build web applications that are responsive, high-performance, and visually premium. Every system is built for usability, speed, and modern design." },
  { id: "02", category: "Growth & Reach", title: "Digital Marketing", desc: "Data-driven marketing strategies designed to maximize reach, conversions, and measurable ROI. I focus on scope, flows, and aligning features with actual users." },
  { id: "03", category: "Audience Building", title: "Social Media", desc: "Content systems and growth strategies that turn attention into engagement and absolute brand loyalty." },
  { id: "04", category: "Automated Conversion", title: "AI Receptionist Agent", desc: "24/7 intelligent agents built specifically for handling customer queries, lead qualification, and robust sales interactions." },
  { id: "05", category: "Brand Identity", title: "Graphic Designing", desc: "Visual identities and creatives crafted specifically to communicate absolute clarity, trust, and premium impact." },
];

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
      
      {/* Floating Bottom Navigation Pill */}
      <nav className={styles.bottomNav}>
        <div className={styles.navMenu}>
          <a href="#services" className={styles.navLink}>Services</a>
          <a href="#work" className={styles.navLink}>Portfolio</a>
          <a href="#feedbacks" className={styles.navLink}>Reviews</a>
        </div>
        <a href="#contact" className={styles.navContactBtn}>Contact me</a>
      </nav>

      {/* Hero Section Container (Scrollable distance proxy) */}
      <div className={styles.scrollProxy}>
        
        {/* Hero Section Container (Scrollable distance proxy) */}
      <motion.section 
        className={styles.heroSection}
        style={{ opacity: heroOpacity, y: heroY }}
      >
        <div className={styles.heroDarkOverlay} />
        <div className={styles.heroTitleContainer}>
          {/* Left Block */}
          <div className={styles.heroSide}>
            <motion.p 
              className={styles.heroSideLabel}
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              Award Winning Agency
            </motion.p>
            <motion.h1 
              className={styles.heroTitlePart}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              HORSE
            </motion.h1>
          </div>

          {/* Center 3D Card Spacer */}
          <div className={styles.heroCardSpacer}></div>

          {/* Right Block */}
          <div className={styles.heroSide}>
            <motion.p 
              className={styles.heroSideLabel}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.1 }}
            >
              Digital Intelligence
            </motion.p>
            <motion.h1 
              className={styles.heroTitlePart}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              MANN
            </motion.h1>
          </div>
        </div>

        <motion.button 
            className={styles.ctaButton}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.2 }}
            onClick={() => window.scrollTo({ top: window.innerHeight * 1.2, behavior: 'smooth'})}
          >
            → View Services
          </motion.button>
        </motion.section>

        {/* --- New Stacked Sticky Services Section --- */}
        <section id="services" className={styles.servicesStack}>
          <div className={styles.cardsList}>
            {servicesData.map((svc, index) => (
              <div 
                key={svc.id} 
                className={styles.serviceCardStack}
                style={{ top: `calc(15vh + ${index * 2}0px)` }} // Stacks exactly like reference
              >
                <span className={styles.serviceCategory}>{svc.category}</span>
                <h2 className={styles.serviceTitleStack}>{svc.id}. {svc.title}</h2>
                <p className={styles.serviceDescStack}>{svc.desc}</p>
              </div>
            ))}
          </div>
        </section>

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
                <div className={styles.projectImage}>
                  <img src={`https://picsum.photos/seed/portfolio${item}/800/600`} alt={`Selected Work ${item}`} />
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>Alpha Protocol v{item}.0</h3>
                  <p className={styles.projectDesc}>Engineered a scalable digital infrastructure combining cutting-edge design with measurable performance metrics.</p>
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
        <section id="contact" className={styles.contactSection} style={{ background: 'var(--bg-secondary)', paddingBottom: '10rem' }}>
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
