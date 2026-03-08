import { useState, useEffect } from "react";
import LinkTag from "../ui/LinkTag";
import styles from "./styles.module.css";

const APP_URL = "https://tinyurl.com/Codewithbry-Workflow";

const navLinks = [
  { label: "Why Workflow", href: "#problem" },
  { label: "Features",     href: "#solution" },
  { label: "AI Assist",    href: "#ai-section" },
  { label: "Analytics",    href: "#analytics" },
  { label: "Reviews",      href: "#testimonials" },
];

function Navbar() {
  const [scrolled, setScrolled]   = useState(false);
  const [menuOpen, setMenuOpen]   = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  const scrollToSection = (href: string) => {
    close();
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      <nav className={`${styles.nav}${scrolled ? ` ${styles.scrolled}` : ""}`}>
        {/* Logo */}
        <a className={styles.navLogo} href="#">
          <div className={styles.logoMark}>⚡</div>
          Workflow
        </a>

        {/* Desktop links */}
        <ul className={styles.navLinks}>
          {navLinks.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={styles.navAnchor}
                onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* Desktop CTAs */}
        <div className={styles.navActions}>
          <LinkTag to={APP_URL} variant="ghost" content="Sign In" />
          <LinkTag to={APP_URL} variant="primary" content="Get Started →" />
        </div>

        {/* Hamburger */}
        <button
          className={`${styles.hamburger}${menuOpen ? ` ${styles.open}` : ""}`}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
        >
          <span /><span /><span />
        </button>
      </nav>

      {/* Mobile drawer */}
      <div
        className={`${styles.mobileMenu}${menuOpen ? ` ${styles.mobileMenuOpen}` : ""}`}
        role="dialog"
        aria-label="Mobile navigation"
      >
        {navLinks.map((link) => (
          <a
            key={link.href}
            href={link.href}
            className={styles.mobileLink}
            onClick={(e) => { e.preventDefault(); scrollToSection(link.href); }}
          >
            {link.label}
          </a>
        ))}
        <div className={styles.mobileDivider} />
        <div className={styles.mobileCtas}>
          <LinkTag to={APP_URL} variant="outline" content="Sign In" clickListener={close} />
          <LinkTag to={APP_URL} variant="primary" content="Get Started →" clickListener={close} />
        </div>
      </div>
    </>
  );
}

export default Navbar;
