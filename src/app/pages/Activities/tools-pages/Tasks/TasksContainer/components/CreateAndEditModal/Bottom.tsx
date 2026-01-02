import { useContext, type JSX } from "react"
import s from "./styles.module.css"
import { context } from "../../../../../../../context/AppContext";
import Button from "../../../../../../../../components/ui/Button";
import { updateGroup } from "../../utils/updateGroup";
import { addTask } from "../../utils/addTask";

export default function Bottom(props: CEMBottomProps): JSX.Element {
    const { setCreateAndEditModal, propsForCEM, changedValue, setChangedValue, setPropsForCEM } = props as CEMBottomProps
    const { selectedTaskClass, setTaskClass, setAllowChanges } = useContext(context) as Context;
    const ifEditTask = propsForCEM?.modalAction == "update" && propsForCEM?.modalFor == "task";

    return (
        <div className={s.bottom}>
            <Button
                className={s.actionButton}
                clickListener={() => { setCreateAndEditModal(false) }}
                content={"Cancel"} />
            <Button
                className={false ? s.actionButton : `${s.actionButton} ${s.active}`}
                clickListener={() => {
                    if (changedValue.length == 0 || !propsForCEM) return;
                    if (propsForCEM.modalFor == "group") {
                        updateGroup({
                            groupId: propsForCEM.group.groupId,
                            changedValue, action: "update",
                            selectedTaskClass, setTaskClass, setAllowChanges
                        })
                        setChangedValue("");
                        setCreateAndEditModal(false);
                        return setPropsForCEM(null);
                    }

                    else if (ifEditTask) {
                        updateGroup({
                            groupId: propsForCEM.group.groupId,
                            changedValue, action: "update",
                            selectedTaskClass, setTaskClass,
                            task: propsForCEM.task, setAllowChanges
                        })
                        setChangedValue("");
                        setCreateAndEditModal(false);
                        return setPropsForCEM(null);
                    } else {
                        addTask({
                            taskDescription: changedValue, groupId: propsForCEM.group.groupId,
                            taskClassId: selectedTaskClass?.id, setTaskClass, setAllowChanges
                        })
                        setChangedValue("");
                        setCreateAndEditModal(false);
                        return setPropsForCEM(null);
                    }

                }}
                content={"Next"} />
        </div>
    )
}