import { type JSX } from "react"
import s from "./styles.module.css"
import Greetings from "./Greetings/Greetings"
import ProjectDetails from "./ProjectDetails/ProjectDetails"
import TaskContainer from "./TasksContainer/TasksContainer"
function Tasks(): JSX.Element {

  return (
    <div className={s.tasks}>
      <Greetings />
      <ProjectDetails />
      <TaskContainer />
    </div>
  )
}

export default Tasks