import { useContext } from "react";
import { updateProject } from "../../../../../../utils/updateProject";
import s from "./style.module.css"
import { context } from "../../../../../context/AppContext";

function DeleteProjectBox(props: PropsForDPB) {
  const { setChatLists, setTaskClass, userInfo } = useContext(context) as Context;
  if (!props?.showDPB) return null;

  return (
    <div className={s.overlay} onClick={() => props.setShowDPB(false)}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.iconContainer}>
          <i className="fas fa-trash-alt"></i>
        </div>
        <h2 className={s.title}>Delete This Project</h2>
        <p className={s.message}>
          Are you sure you want to delete this data? This action cannot be undone and all your data will be permanently deleted.
        </p>
        <div className={s.buttons}>
          <button className={s.cancelButton} onClick={() => props.setShowDPB(false)}>
            Cancel
          </button>
          <button className={s.deleteButton} onClick={async () => {
            if (userInfo && props.selectedProject) {
              await updateProject({
                setChatLists,
                setTaskClass,
                projectId: props.selectedProject.id,
                value: "",
                action: "delete",
                projectName: props.selectedProject.name,
                project: props.selectedProject
              }, userInfo);
              props.setShowDPB(false);
            }
          }}>
            <i className="fas fa-trash-alt"></i> Delete Project
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteProjectBox