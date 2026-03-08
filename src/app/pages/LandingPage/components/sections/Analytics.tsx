import { useEffect, useRef } from "react";
import styles from "./styles.module.css";

const analyticsPoints = [
  { icon: "📅", title: "Daily Average",          desc: "See how many tasks you complete each day and spot when your energy peaks." },
  { icon: "📈", title: "Weekly Trends",           desc: "Zoom out to understand weekly momentum — are you accelerating or burning out?" },
  { icon: "🎯", title: "Progress Visualization",  desc: "Interactive charts built with Chart.js give you an instant read on output and focus." },
];

const bars = [
  { day: "Mon", h: 40, hi: false },
  { day: "Tue", h: 65, hi: false },
  { day: "Wed", h: 50, hi: false },
  { day: "Thu", h: 100, hi: true },
  { day: "Fri", h: 78, hi: false },
  { day: "Sat", h: 55, hi: false },
  { day: "Sun", h: 35, hi: false },
];

function Analytics() {
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const chart = chartRef.current;
    if (!chart) return;
    const barsEls = chart.querySelectorAll<HTMLElement>("[data-bar]");
    const heights = Array.from(barsEls).map((b) => b.style.height);

    const obs = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      barsEls.forEach((bar, i) => {
        bar.style.height = "0";
        setTimeout(() => {
          bar.style.transition = `height .5s cubic-bezier(.34,1.56,.64,1) ${i * 70}ms`;
          bar.style.height = heights[i];
        }, 150);
      });
      obs.disconnect();
    }, { threshold: 0.3 });

    obs.observe(chart);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="analytics" className={styles.analytics}>
      <div className="container">
        <div className={`${styles.analyticsHeader} reveal`}>
          <div className={`${styles.eyebrow} ${styles.eyebrowCenter}`}>Analytics</div>
          <h2 className={styles.sectionTitle}>
            Data-driven productivity,<br />finally visible.
          </h2>
        </div>
        <div className={styles.analyticsLayout}>
          {/* Left text */}
          <div>
            <p className={`${styles.sectionSub} reveal`}>
              Workflow tracks every task completion so you can see exactly how
              productive you are — day by day and week by week.
            </p>
            <div className={styles.aPts}>
              {analyticsPoints.map((pt, i) => (
                <div key={pt.title} className={`${styles.aPt} reveal`} style={{ transitionDelay: `${0.1 + i * 0.08}s` }}>
                  <div className={styles.aPtIcon}>{pt.icon}</div>
                  <div>
                    <div className={styles.aPtTtl}>{pt.title}</div>
                    <p className={styles.aPtDsc}>{pt.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Dashboard mockup */}
          <div className={`${styles.dashWin} reveal`} style={{ transitionDelay: ".12s" }}>
            <div className={styles.dashHd}>
              📊 Productivity Analytics
              <span className={styles.dashPeriod}>Last 7 days</span>
            </div>
            <div className={styles.dashBody}>
              <div className={styles.dashMetrics}>
                {[
                  { lbl: "Daily Average",   val: "8.3", chg: "▲ +12% vs last week", cls: "" },
                  { lbl: "Weekly Average",  val: "41",  chg: "▲ +8% vs prev",       cls: styles.dmValCyan },
                  { lbl: "Best Day",        val: "14",  chg: "Thursday",             cls: styles.dmValPurple },
                  { lbl: "Completion Rate", val: "87%", chg: "▲ on track",           cls: styles.dmValGreen },
                ].map((m) => (
                  <div key={m.lbl} className={styles.dm}>
                    <div className={styles.dmLbl}>{m.lbl}</div>
                    <div className={`${styles.dmVal} ${m.cls}`}>{m.val}</div>
                    <div className={styles.dmChg}>{m.chg}</div>
                  </div>
                ))}
              </div>
              <div className={styles.chartZone} ref={chartRef}>
                <div className={styles.chartLbl}>Tasks completed per day (this week)</div>
                <div className={styles.barChart}>
                  {bars.map((b) => (
                    <div key={b.day} className={styles.bg}>
                      <div
                        data-bar
                        className={`${styles.bf}${b.hi ? ` ${styles.bfHi}` : ""}`}
                        style={{ height: `${b.h}%` }}
                      />
                      <div className={styles.bday}>{b.day}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Analytics;
