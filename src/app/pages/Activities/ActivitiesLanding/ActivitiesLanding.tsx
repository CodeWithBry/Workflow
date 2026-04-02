import { useContext, useState } from "react"
import s from "./styles.module.css"
import { context } from "../../../context/AppContext"
import QuickActions from "./QuickActions/QuickActions";
import Projects from "./Projects/Projects";
import CreateProjectModal from "./modals/CreateProjectModal/CreateProjectModal";
import EditProjectModal from "./modals/EditProjectModal/EditProjectModal";
import DeleteProjectBox from "./modals/DeleteTaskGroupBox/DeleteProjectBox";

function ActivitiesLanding() {
  const { darkMode } = useContext(context) as Context;
  const [showModal, setShowModal] = useState<boolean>(false);
  const [editModal, setEditModal] = useState<boolean>(false);
  const [dataToModify, setDataToModify] = useState<DataToModify>(null);
  const [showDPB, setShowDPB] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<SelectedTaskClass>(null);

  return (
    <div className={!darkMode ? s.activitiesLanding : `${s.activitiesLanding} ${s.dark}`}>
      <CreateProjectModal {...{showModal, setShowModal}}/>
      <EditProjectModal {...{editModal, setEditModal, dataToModify, setDataToModify}}/>
      <DeleteProjectBox  
        showDPB={showDPB}
        setShowDPB={setShowDPB}
        selectedProject={selectedProject}
        setSelectedProject={setSelectedProject} />
      <div className={s.container}>
        <div className={s.greetings}>
          <h1>Hello, Bryan A.</h1>
          <h3>Welcome back to Workflow!</h3>
        </div>
        <div className={s.bottom}>
          <QuickActions {...{showModal, setShowModal}} />
          <Projects {...{editModal, setEditModal, dataToModify, setDataToModify, showDPB, setShowDPB, setSelectedProject}} />
        </div>
      </div>
    </div>
  )
}

export default ActivitiesLanding