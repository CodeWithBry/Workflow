import styles from "./styles.module.css";

const features = [
  { icon: "📁", title: "Smart Project Organization", desc: "Create structured projects with grouped tasks. Organize and prioritize in a clean, distraction-free interface." },
  { icon: "✦",  title: "AI Assist Per Task",          desc: "Every task gets its own AI assistant. Get code, explanations, or writing help directly inside the task context." },
  { icon: "📊", title: "Real-Time Analytics",         desc: "Track daily and weekly task averages. Visual charts reveal patterns so you can optimize how you work." },
  { icon: "🔒", title: "Secure Authentication",       desc: "Firebase-powered auth keeps your projects private. Sign up, log in, and manage your account with confidence." },
  { icon: "🎨", title: "Markdown Rendering",          desc: "AI responses render with full Markdown support — code blocks, syntax highlighting, and rich formatting." },
  { icon: "☁️", title: "Cloud Profile & Media",       desc: "Personalize your account with a profile photo stored securely on Cloudinary. Your identity in one place." },
];

function Solution() {
  return (
    <section id="solution" className={styles.solution}>
      <div className="container">
        <div className={`${styles.solHd} reveal`}>
          <div className={`${styles.eyebrow} ${styles.eyebrowCenter}`}>The Solution</div>
          <h2 className={styles.sectionTitle}>Everything you need.<br />Nothing you don't.</h2>
          <p className={`${styles.sectionSub} ${styles.subCenter}`}>
            Workflow replaces scattered notes, endless spreadsheets, and guesswork
            with one intelligent workspace — built for modern builders.
          </p>
        </div>
        <div className={styles.featGrid}>
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`${styles.featCard} reveal`}
              style={{ transitionDelay: `${(i % 3) * 0.08}s` }}
            >
              <div className={styles.featIcon}>{f.icon}</div>
              <div className={styles.featTitle}>{f.title}</div>
              <p className={styles.featDesc}>{f.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Solution;
