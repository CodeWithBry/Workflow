import styles from "./styles.module.css";

const steps = [
  {
    num: "1",
    numStyle: {},
    title: "Create Your Project",
    desc: "Name it, describe it, and start adding task groups. Organize work the way your brain actually thinks.",
  },
  {
    num: "2",
    numStyle: { background: "linear-gradient(135deg,var(--accent-cyan),var(--secondary-color))" },
    title: "Use AI Assist",
    desc: "Open any task and ask the AI anything. Get code, plans, or copy — rendered in Markdown, ready to use.",
  },
  {
    num: "3",
    numStyle: { background: "linear-gradient(135deg,#10b981,#059669)" },
    title: "Track Progress",
    desc: "Check your analytics dashboard. See daily averages, weekly trends, and completion rates. Ship more.",
  },
];

function HowItWorks() {
  return (
    <section id="how" className={styles.how}>
      <div className="container">
        <div className={`${styles.howHd} reveal`}>
          <div className={`${styles.eyebrow} ${styles.eyebrowCenter}`}>How It Works</div>
          <h2 className={styles.sectionTitle}>From idea to done —<br />in three steps.</h2>
          <p className={`${styles.sectionSub} ${styles.subCenter}`}>
            Intuitive by design. Powerful by nature. No manual required.
          </p>
        </div>
        <div className={styles.steps}>
          {steps.map((s, i) => (
            <div key={s.num} className={`${styles.step} reveal`} style={{ transitionDelay: `${i * 0.15}s` }}>
              <div className={styles.stepNum} style={s.numStyle}>{s.num}</div>
              <div className={styles.stepTitle}>{s.title}</div>
              <p className={styles.stepDesc}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default HowItWorks;
