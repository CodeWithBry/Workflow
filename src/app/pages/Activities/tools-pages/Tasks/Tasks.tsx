import { useContext, useEffect, type JSX } from "react"
import s from "./styles.module.css"
import Greetings from "./Greetings/Greetings"
import ProjectDetails from "./ProjectDetails/ProjectDetails"
import { context } from "../../../../context/AppContext"
import TaskContainer from "./TasksContainer/TasksContainer"
import { getWeek } from "../../../../../utils/getWeek"
import { getWeekRange } from "../../../../../utils/getWeekRange"
function Tasks(): JSX.Element {
  const { getUrl, setWeekData, userInfo } = useContext(context) as Context;

  useEffect(() => {
    if (getUrl[3] == "tasks" && userInfo) {
      getWeek(userInfo?.userId, getUrl[2], getWeekRange(), setWeekData);
    }
  }, [getUrl[3]])

  return (
    <div className={s.tasks}>
      <Greetings />
      <ProjectDetails />
      <TaskContainer />
    </div>
  )
}

export default Tasks