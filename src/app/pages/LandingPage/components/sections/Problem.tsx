import { useReveal } from "../../../../../hooks/useReveal";
import styles from "./styles.module.css";

const problems = [
  { icon: "🌀", color: styles.piR, title: "Task Overload",     desc: "Endless to-do lists with no structure. Everything feels urgent — nothing gets done." },
  { icon: "🌫️", color: styles.piO, title: "Lack of Clarity",   desc: "Vague tasks with no breakdown. You know what to build, but not how to start." },
  { icon: "⏳", color: styles.piY, title: "Manual Planning",   desc: "Hours organizing instead of building. Your planner becomes your bottleneck." },
  { icon: "📉", color: styles.piP, title: "No Smart Insights", desc: "Without data, productivity plateaus and motivation fades." },
];

const chaosTasks = [
  { num: "01", label: "Design landing page",    tag: "Overdue",    cls: styles.ctOverdue },
  { num: "02", label: "Write API docs",          tag: "Blocked",    cls: styles.ctBlocked },
  { num: "03", label: "Fix auth bug",            tag: "No context", cls: styles.ctNoctx  },
  { num: "04", label: "Deploy to production",    tag: "Waiting",    cls: styles.ctWait   },
  { num: "05", label: "Client feedback review",  tag: "Lost",       cls: styles.ctLost   },
];

function Problem() {
  const ref = useReveal();

  return (
    <section id="problem" className={styles.problem}>
      <div className="container">
        <div className={`${styles.eyebrow} reveal`} ref={ref as React.RefObject<HTMLDivElement>}>
          The Problem
        </div>
        <div className={styles.problemGrid}>
          <div>
            <h2 className={`${styles.sectionTitle} reveal`}>
              You're drowning in tasks,<br />not making progress.
            </h2>
            <p className={`${styles.sectionSub} reveal`} style={{ transitionDelay: ".1s" }}>
              Most tools show what's pending — but don't help you think, plan,
              or understand what's actually getting done.
            </p>
            <div className={styles.probCards}>
              {problems.map((p, i) => (
                <div key={p.title} className={`${styles.probCard} reveal`} style={{ transitionDelay: `${0.12 + i * 0.06}s` }}>
                  <div className={`${styles.probIcon} ${p.color}`}>{p.icon}</div>
                  <div>
                    <div className={styles.probTitle}>{p.title}</div>
                    <p className={styles.probDesc}>{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className={`${styles.chaosBox} reveal`} style={{ transitionDelay: ".1s" }}>
            <div className={styles.chaosTop}>Without Workflow</div>
            {chaosTasks.map((t) => (
              <div key={t.num} className={styles.chaosTask}>
                <span className={styles.chaosNum}>{t.num}</span>
                {t.label}
                <span className={`${styles.ctag} ${t.cls}`}>{t.tag}</span>
              </div>
            ))}
            <div className={styles.chaosFoot}>Zero visibility. Zero momentum.</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Problem;
