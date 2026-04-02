import { useContext } from "react";
import { updateGroup } from "../../../utils/updateGroup";
import s from "./style.module.css"
import { context } from "../../../../../../../../context/AppContext";

function DeleteTaskGroupBox(props: PropsForDTGB) {
  const { setSelectedTaskClass, setAllowChanges, setAnalytics, setWeekData } = useContext(context) as Context;

  if (!props.showDTGB) return null;

  return (
    <div className={s.overlay} onClick={() => props.setShowDTGB(false)}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.iconContainer}>
          <i className="fas fa-trash-alt"></i>
        </div>
        <h2 className={s.title}>Delete Task Group</h2>
        <p className={s.message}>
          Are you sure you want to delete this data? This action cannot be undone and all your data will be permanently deleted.
        </p>
        <div className={s.buttons}>
          <button className={s.cancelButton} onClick={() => props.setShowDTGB(false)}>
            Cancel
          </button>
          <button className={s.deleteButton} onClick={() => {
            console.log(props)
            if (props.group) updateGroup({
              groupId: props?.group.groupId, changedValue: null, action: "delete", setSelectedTaskClass, setAllowChanges, setAnalytics, setWeekData
            })
            props.setShowDTGB(false);
          }}>
            <i className="fas fa-trash-alt"></i> Delete Task Group
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteTaskGroupBox