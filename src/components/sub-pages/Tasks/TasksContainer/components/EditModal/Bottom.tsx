import { type JSX } from "react"
import s from "./styles.module.css"
import Button from "../../../../../ui/Button/Button";
import { editTaskGroupName } from "../../utils/actions";

export default function Bottom(props: EditBottomModal): JSX.Element {
    const { setShowEditModal, changedValue, setTaskGroups, selectedGroup }: EditBottomModal = props;


    return (
        <div className={s.bottom}>
            <Button
                className={s.actionButton}
                clickListener={() => {
                    setShowEditModal(false)
                }}
                content={"Cancel"} />
            <Button
                className={changedValue == "" ? s.actionButton : `${s.actionButton} ${s.active}`}
                clickListener={() => {
                    if (changedValue != "" && selectedGroup) {
                        editTaskGroupName(selectedGroup?.groupId, setTaskGroups, changedValue);
                        setShowEditModal(false)
                    }
                }}
                content={"Next"} />
        </div>
    )
}