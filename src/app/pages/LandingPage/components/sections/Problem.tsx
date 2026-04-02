import { useReveal } from "../../../../../hooks/useReveal";
import styles from "./styles.module.css";

const problems = [
  { icon: "🌀", color: styles.piR, title: "Traditional To-Do List",     desc: "How can the system improve the organization and structure of traditional to-do list applications?" },
  { icon: "🌫️", color: styles.piO, title: "Manual Planning",   desc: "How can the system reduce the excessive time spent on planning and task listing?" },
  { icon: "⏳", color: styles.piY, title: "Guidance",   desc: "How can the system assist users in initiating and structuring project plans effectively?" },
  { icon: "📉", color: styles.piP, title: "Analytics", desc: "How can the system measure and provide insights into user productivity during project execution?" },
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
          Statement Of The Problem
        </div>
        <div className={styles.problemGrid}>
          <div>
            <h2 className={`${styles.sectionTitle} reveal`}>
              You're drowning in tasks,<br />not making progress.
            </h2>
            <p className={`${styles.sectionSub} reveal`} style={{ transitionDelay: ".1s" }}>
              This study aims to design and evaluate the effectiveness of the Workflow AI-Augmented Productivity Framework as a solution to common inefficiencies in modern task management and project planning.
            </p>
            <div className={styles.probCards}>
              {problems.map((p, i) => (
                <div key={p.title} className={`${styles.probCard} reveal`} style={{ transitionDelay: `${0.12 + i * 0.06}s` }}>
                  <div className={`${styles.probIcon} ${p.color}`}>{p.icon}</div>
                  <div>
                    <div className={styles.probTitle}>{i+1 +". "+ p.title}</div>
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
