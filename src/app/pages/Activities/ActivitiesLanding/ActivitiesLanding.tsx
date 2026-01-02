import { useContext, useState } from "react"
import s from "./styles.module.css"
import { context } from "../../../context/AppContext"
import QuickActions from "./QuickActions/QuickActions";
import Projects from "./Projects/Projects";
import Navbar from "../../../../components/navigations/Navbar/Navbar";
import CreateProjectModal from "./CreateProjectModal/CreateProjectModal";

function ActivitiesLanding() {
  const { darkMode } = useContext(context) as Context;
  const [showModal, setShowModal] = useState<boolean>(false);

  return (
    <div className={!darkMode ? s.activitiesLanding : `${s.activitiesLanding} ${s.dark}`}>
      <CreateProjectModal {...{showModal, setShowModal}}/>
      <Navbar />
      <div className={s.container}>
        <div className={s.greetings}>
          <h1>Hello, Bryan A.</h1>
          <h3>Welcome back to Workflow!</h3>
        </div>
        <div className={s.bottom}>
          <QuickActions {...{showModal, setShowModal}} />
          <Projects />
        </div>
      </div>
    </div>
  )
}

export default ActivitiesLanding