import { type JSX } from "react"
import s from "./styles.module.css"
import Button from "../../../../../ui/Button/Button";

export default function Bottom({ setShowModal, groupName, setShowTaskForm, showTaskForm }: BottomModalProps): JSX.Element {

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
                    }
                    setShowTaskForm(true)
                }}
                content={"Next"} />
        </div>
    )
}