import styles from "./styles.module.css";

const metrics = [
  { val: "40%", lbl: "Task clarity improvement" },
  { val: "3×",  lbl: "Faster project planning"  },
  { val: "87%", lbl: "Avg. completion rate"      },
  { val: "∞",   lbl: "AI assists available"      },
];

const testimonials = [
  {
    text: "\"I used to spend the first hour of every workday figuring out what to do. Workflow changed that completely. The AI assist is genuinely useful — not a gimmick.\"",
    name: "Alex M.",
    role: "Freelance Developer",
    initials: "AM",
    avatarCls: styles.av1,
  },
  {
    text: "\"As a student juggling three projects, Workflow is the one tool I keep open. The task groups keep me organized and asking AI to break down a hard task has saved me so many hours.\"",
    name: "Sofia C.",
    role: "Computer Science Student",
    initials: "SC",
    avatarCls: styles.av2,
  },
  {
    text: "\"We used Workflow for our MVP sprint. The analytics showed us when the team was most productive. We restructured our standups based on that data and shipped 2 weeks early.\"",
    name: "James R.",
    role: "Startup Founder",
    initials: "JR",
    avatarCls: styles.av3,
  },
];

function Testimonials() {
  return (
    <section id="testimonials" className={styles.testimonials}>
      <div className="container">
        <div className={`${styles.testHd} reveal`}>
          <div className={`${styles.eyebrow} ${styles.eyebrowCenter}`}>Social Proof</div>
          <h2 className={styles.sectionTitle}>Built for people who actually ship.</h2>
          <p className={`${styles.sectionSub} ${styles.subCenter}`}>
            Students, developers, freelancers, and founders — all getting more done with Workflow.
          </p>
        </div>

        <div className={`${styles.metricsBar} reveal`}>
          {metrics.map((m) => (
            <div key={m.lbl} className={styles.mCell}>
              <div className={styles.mVal}>{m.val}</div>
              <div className={styles.mLbl}>{m.lbl}</div>
            </div>
          ))}
        </div>

        <div className={styles.testGrid}>
          {testimonials.map((t, i) => (
            <div key={t.name} className={`${styles.testCard} reveal`} style={{ transitionDelay: `${i * 0.1}s` }}>
              <div className={styles.stars}>★★★★★</div>
              <p className={styles.testTxt}>{t.text}</p>
              <div className={styles.testAuth}>
                <div className={`${styles.tAv} ${t.avatarCls}`}>{t.initials}</div>
                <div>
                  <div className={styles.tName}>{t.name}</div>
                  <div className={styles.tRole}>{t.role}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Testimonials;
