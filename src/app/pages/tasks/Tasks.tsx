import { useContext, type JSX } from "react"
import s from "./styles.module.css"
import { context } from "../../AppContext/AppContext"
import type { AppContextType } from "../../../types/AppContextType.types"

function Tasks(): JSX.Element {
  const {darkMode} = useContext(context) as AppContextType

  return (
    <div className={
      !darkMode 
      ? s.tasks
      : `${s.tasks} ${s.darkTasks}`
    }>
      Tasks
    </div>
  )
}

export default Tasks