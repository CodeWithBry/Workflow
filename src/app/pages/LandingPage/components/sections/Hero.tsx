import LinkTag from "../ui/LinkTag";
import styles from "./styles.module.css";

function Hero() {
  return (
    <section id="hero" className={styles.hero}>
      <div className={styles.orb1} />
      <div className={styles.orb2} />
      <div className="container">
        <div className={styles.heroInner}>

          {/* ── Left copy ── */}
          <div className={styles.heroCopy}>
            <div className={styles.heroBadge}>
              <div className={styles.badgeDot}>✦</div>
              AI-Powered Project Management
            </div>

            <h1 className={styles.heroTitle}>
              Work smarter.<br />
              Ship <span className="gradientText">faster.</span><br />
              Think clearer.
            </h1>

            <p className={styles.heroSub}>
              Workflow combines intelligent project organization with a built-in
              AI assistant — so tasks stay structured, teams stay focused, and
              progress stays visible.
            </p>

            <div className={styles.heroCtas}>
              <LinkTag to={"/activities"} variant="primary" content="Get Started Free →" />
              <LinkTag to={"/activities"} variant="outline" content="▶ View Demo" />
            </div>

            <div className={styles.heroStats}>
              <div><div className={styles.statVal}>40%</div><div className={styles.statLbl}>Task clarity boost</div></div>
              <div><div className={styles.statVal}>3×</div><div className={styles.statLbl}>Faster planning</div></div>
              <div><div className={styles.statVal}>100%</div><div className={styles.statLbl}>AI-native</div></div>
            </div>
          </div>

          {/* ── Right mockup ── */}
          <div className={styles.mockupWrap}>
            <div className={styles.mockupWin}>
              <div className={styles.winBar}>
                <div className={`${styles.dot} ${styles.dotR}`} />
                <div className={`${styles.dot} ${styles.dotY}`} />
                <div className={`${styles.dot} ${styles.dotG}`} />
                <span className={styles.winTtl}>Workflow — My Projects</span>
              </div>
              <div className={styles.winBody}>
                {/* Sidebar */}
                <div className={styles.winSb}>
                  <div className={styles.sbSec}>Navigation</div>
                  {["📁 Projects", "✅ Tasks", "📊 Analytics", "✦ AI Assist", "⚙️ Settings"].map((item, i) => (
                    <div key={item} className={`${styles.sbItem}${i === 0 ? ` ${styles.sbActive}` : ""}`}>{item}</div>
                  ))}
                </div>
                {/* Main content */}
                <div className={styles.winMain}>
                  <div className={styles.projCard}>
                    <div className={styles.projHead}>
                      <span className={styles.projName}>🚀 Portfolio Website</span>
                      <span className={`${styles.projBadge} ${styles.badgeActive}`}>In Progress</span>
                    </div>
                    <div className={styles.taskList}>
                      {[
                        { label: "Design hero section", done: true },
                        { label: "Set up routing", done: true },
                        { label: "Build contact form", done: false },
                      ].map((t) => (
                        <div key={t.label} className={styles.taskRow}>
                          <div className={`${styles.tChk}${t.done ? ` ${styles.tChkDone}` : ""}`}>{t.done ? "✓" : ""}</div>
                          <span className={`${styles.tTxt}${t.done ? ` ${styles.tTxtDone}` : ""}`}>{t.label}</span>
                          <div className={styles.aiTag}>✦ AI</div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Analytics row */}
                  <div className={styles.aRow}>
                    <div className={styles.aCard}><div className={styles.aLbl}>Daily avg</div><div className={styles.aVal}>8.3</div><div className={styles.aSub}>▲ +12%</div></div>
                    <div className={styles.aCard}><div className={styles.aLbl}>Weekly avg</div><div className={`${styles.aVal} ${styles.aValCyan}`}>41</div><div className={styles.aSub}>▲ +8%</div></div>
                    <div className={styles.aCard}><div className={styles.aLbl}>Total done</div><div className={`${styles.aVal} ${styles.aValGreen}`}>127</div><div className={styles.aSub}>this month</div></div>
                  </div>
                  {/* Mini bars */}
                  <div className={styles.miniBars}>
                    {[40, 62, 50, 80, 70, 92, 100].map((h, i) => (
                      <div key={i} className={styles.mb} style={{ height: `${h}%`, opacity: h >= 92 ? 1 : 0.65 }} />
                    ))}
                  </div>
                </div>
              </div>
            </div>
            {/* Floating badge */}
            <div className={styles.floatBadge}>
              <span className={styles.floatIcon}>✦</span>
              <div>
                <div className={styles.floatTitle}>AI Generated Solution</div>
                <div className={styles.floatSub}>Just now · Build contact form</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default Hero;
