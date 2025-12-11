import { type JSX } from "react"
import s from "./styles.module.css"
import Button from "../../../../../ui/Button/Button";
import { addGroupTask } from "../../utils/addGroupTask";

export default function Bottom(props: BottomModalProps): JSX.Element {
    const { setShowModal, groupName, 
        setShowTaskForm, showTaskForm, 
        setPseudoGroup, pseudoGroup, 
        pseudoTasks, setTaskGroups }: BottomModalProps = props;


    return (
        <div className={s.bottom}>
            <Button
                className={s.actionButton}
                clickListener={() => {
                    if(showTaskForm) return setShowTaskForm(false);
                    setShowModal(false)
                }}
                content={showTaskForm ? "Back" : "Cancel"} />
            <Button
                className={groupName == "" ? s.actionButton : `${s.actionButton} ${s.active}`}
                clickListener={() => {
                    if(showTaskForm) {
                        setShowModal(false);
                        return addGroupTask({ groupName, setPseudoGroup, setTaskGroups, pseudoGroup, pseudoTasks })
                    }
                    setShowTaskForm(true)
                    addGroupTask({ groupName, setPseudoGroup, setTaskGroups, pseudoGroup })
                }}
                content={showTaskForm ? "Submit" : "Next"} />
        </div>
    )
}