import { useContext, useEffect, type JSX } from "react"
import s from "./styles.module.css"
import Greetings from "./Greetings/Greetings"
import ProjectDetails from "./ProjectDetails/ProjectDetails"
import TaskContainer from "./TasksContainer/TasksContainer"
import { getTabFromUrl } from "../../../utils/getTabFromUrl"
import { context } from "../../../app/AppContext/AppContext"
function Tasks(): JSX.Element {
  const { setSubPages, projects } = useContext(context) as AppContextType;
  useEffect(() => {
    const getTabs = getTabFromUrl();
    console.log(getTabs)
    if(setSubPages != null) {
      setSubPages(prev => prev.map((page) => ({...page, tabFocused: page.tabPath == getTabs[3]})))
    }
  }, [setSubPages, projects])

  return (
    <div className={s.tasks}>
      <Greetings />
      <ProjectDetails />
      <TaskContainer />
    </div>
  )
}

export default Tasks