import LinkTag from "../ui/LinkTag";
import styles from "./styles.module.css";

const APP_URL = "https://tinyurl.com/Codewithbry-Workflow";

function CallToAction() {
  return (
    <section id="cta" className={styles.cta}>
      <div className="container">
        <div className={`${styles.ctaBox} reveal`}>
          <h2 className={styles.ctaTitle}>
            Stop managing tasks.<br />
            Start <span className="gradientText">finishing</span> them.
          </h2>
          <p className={styles.ctaSub}>
            Join thousands of students, developers, and founders who use Workflow
            to think clearer, build faster, and ship more.
          </p>
          <div className={styles.ctaBtns}>
            <LinkTag
              to={APP_URL}
              variant="primary"
              content="Get Started Free — No credit card required →"
              className={styles.ctaLinkLg}
            />
          </div>
          <p className={styles.ctaNote}>
            Free to start · AI included · Takes 30 seconds to set up
          </p>
        </div>
      </div>
    </section>
  );
}

export default CallToAction;
