import { type JSX } from "react"
import s from "./styles.module.css"
import Greetings from "./Greetings/Greetings"
import ProjectDetails from "./ProjectDetails/ProjectDetails"
function Tasks(): JSX.Element {

  return (
    <div className={s.tasks}>
      <Greetings />
      <ProjectDetails />
    </div>
  )
}

export default Tasks