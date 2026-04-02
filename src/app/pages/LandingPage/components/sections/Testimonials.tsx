import styles from "./styles.module.css";

const metrics = [
  { val: "40%", lbl: "Task clarity improvement" },
  { val: "3×",  lbl: "Faster project planning"  },
  { val: "87%", lbl: "Avg. completion rate"      },
  { val: "∞",   lbl: "AI assists available"      },
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
      </div>
    </section>
  );
}

export default Testimonials;
