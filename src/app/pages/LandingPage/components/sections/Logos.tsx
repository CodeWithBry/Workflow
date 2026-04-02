import styles from "./styles.module.css";

const pills = ["Students", "Freelancers", "Developers", "Startups", "Creators", "Founders"];

function Logos() {
  return (
    <section id="logos" className={styles.logos}>
      <div className="container">
        <p className={styles.logosLbl}>Trusted by builders worldwide</p>
        <div className={styles.logosRow}>
          {pills.map((p) => (
            <div key={p} className={styles.logoPill}>{p}</div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Logos;
