import styles from "./styles.module.css";

const aiFeatures = [
  { icon: "💻", title: "Code Generation",    desc: "Describe what you need. Get production-ready code with syntax highlighting — instantly." },
  { icon: "✍️", title: "Writing Assistance", desc: "Emails, docs, commit messages, PRDs — AI writes alongside you." },
  { icon: "🧩", title: "Task Breakdown",     desc: "Turn vague goals into clear, actionable subtasks. AI structures your thinking." },
];

function AiHighlight() {
  return (
    <section id="ai-section" className={styles.aiSection}>
      <div className="container">
        <div className={styles.aiInner}>

          {/* Left */}
          <div>
            <div className={`${styles.eyebrow} reveal`}>AI Assistant</div>
            <h2 className={`${styles.sectionTitle} reveal`}>
              Your smartest teammate —<br />built into every task.
            </h2>
            <p className={`${styles.sectionSub} reveal`} style={{ transitionDelay: ".1s" }}>
              Stop context-switching. Stop Googling mid-task. Workflow's AI lives
              inside each task — ready to write code, break down complexity, or
              draft your next move.
            </p>
            <div className={styles.aiFeats}>
              {aiFeatures.map((f, i) => (
                <div key={f.title} className={`${styles.aiFeat} reveal`} style={{ transitionDelay: `${0.12 + i * 0.06}s` }}>
                  <div className={styles.aiFeatIcon}>{f.icon}</div>
                  <div>
                    <div className={styles.aiFeatTtl}>{f.title}</div>
                    <p className={styles.aiFeatDsc}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right — Chat mockup */}
          <div className={`${styles.chatWin} reveal`} style={{ transitionDelay: ".1s" }}>
            <div className={styles.chatHd}>
              <div className={styles.aiAv}>✦</div>
              <div>
                <div className={styles.chatNm}>Workflow AI</div>
                <div className={styles.chatSt}><div className={styles.stDot} />Online</div>
              </div>
            </div>
            <div className={styles.chatBody}>
              <div className={styles.chatCtx}>
                📌 Task: <strong style={{ marginLeft: 4 }}>Build contact form with email validation</strong>
              </div>
              <div className={`${styles.bubble} ${styles.bubbleUser}`}>
                How do I validate email on submit without a library?
              </div>
              <div className={`${styles.bubble} ${styles.bubbleAi}`}>
                Here's a clean regex approach that covers most valid formats:
                <div className={styles.codeBlk}>
                  <span className={styles.cc}>{"// Email validation"}</span><br />
                  <span className={styles.ck}>const </span>
                  <span className={styles.cf}>validateEmail</span>
                  {" = (email) => {"}<br />
                  &nbsp;&nbsp;<span className={styles.ck}>const </span>
                  {"regex = "}
                  <span className={styles.cs}>/^[^\s@]+@[^\s@]+\.[^\s@]+$/</span>{";"}<br />
                  &nbsp;&nbsp;<span className={styles.ck}>return </span>
                  {"regex."}
                  <span className={styles.cf}>test</span>
                  {"(email);"}<br />
                  {"};"}<br /><br />
                  <span className={styles.ck}>if </span>
                  {"(!"}
                  <span className={styles.cf}>validateEmail</span>
                  {"(form.email)) {"}<br />
                  &nbsp;&nbsp;
                  <span className={styles.cf}>setError</span>
                  {"("}
                  <span className={styles.cs}>"Invalid email"</span>
                  {");"}<br />
                  {"}"}
                </div>
              </div>
              <div className={styles.typing}>
                <div className={styles.tdot} />
                <div className={styles.tdot} />
                <div className={styles.tdot} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default AiHighlight;
