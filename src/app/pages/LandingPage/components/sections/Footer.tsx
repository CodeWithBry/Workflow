import LinkTag from "../ui/LinkTag";
import styles from "./styles.module.css";

const APP_URL = "https://tinyurl.com/Codewithbry-Workflow";

const footLinks = [
  { label: "Features",    to: "#solution"   },
  { label: "AI Assist",   to: "#ai-section" },
  { label: "Analytics",   to: "#analytics"  },
  { label: "Get Started", to: APP_URL       },
];

function Footer() {
  const scrollTo = (href: string) => {
    if (href.startsWith("#")) {
      document.querySelector(href)?.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.footInner}>
          <a className={styles.footLogo} href="#">⚡ Workflow</a>
          <div className={styles.footLinks}>
            {footLinks.map((l) =>
              l.to.startsWith("http") ? (
                <LinkTag
                  key={l.label}
                  to={l.to}
                  variant="ghost"
                  content={l.label}
                  className={styles.footLink}
                />
              ) : (
                <a
                  key={l.label}
                  href={l.to}
                  className={styles.footLink}
                  onClick={(e) => { e.preventDefault(); scrollTo(l.to); }}
                >
                  {l.label}
                </a>
              )
            )}
          </div>
          <div className={styles.footCopy}>© 2025 Workflow. Built for builders.</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
