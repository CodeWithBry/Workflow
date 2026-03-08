import { useContext } from "react";
import s from "./styles.module.css";
import { context } from "../../../../../../context/AppContext";

function Progress() {
  const {analytics, weekData, darkMode} = useContext(context) as Context;
  const finishedTaskLength = analytics.allTask.filter(task => task.status == "finished").length;
  const progress = (finishedTaskLength/analytics.allTask.length) * 100; // Current progress percentage
  const targetTasks = analytics.allTask.length;

  return (
    <div className={`${s.container} ${darkMode && s.dark}`}>
      <div className={s.header}>
        <div>
          <h2 className={s.title}>Current Goal Progress</h2>
          <p className={s.subtitle}>Completed Tasks in Percentage.</p>
        </div>
        <div className={s.percentage}>{weekData ? progress.toFixed(2) : 0}%</div>
      </div>
      
      <div className={s.progressBarContainer}>
        <div 
          className={s.progressBarFill} 
          style={{ width: `${progress}%` }}
        ></div>
      </div>
      
      <div className={s.footer}>
        <span className={s.minLabel}>0%</span>
        <span className={s.targetLabel}>Tasks: {targetTasks} Tasks</span>
      </div>
    </div>
  )
}

export default Progress