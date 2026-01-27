import { useContext, useState } from "react"
import s from "./styles.module.css"
import Button from "../../../../../../../../components/ui/Button"
import { DropDown } from "../../../../../../../../components/drop-down/DropDown"
import { context } from "../../../../../../../context/AppContext"
import { deleteTask } from "../../utils/deleteTask"
import { updateTask } from "../../utils/updateTask"

function Task(props: TaskProps) {
    const { task, isRealTask, setPseudoTasks, group, setPropsForCEM, setCreateAndEditModal, tasksLength, index }: TaskProps = props;
    const { darkMode, setSelectedTaskClass, setAllowChanges, setShowAssistant, setModifyData, userInfo } = useContext(context) as Context;

    const [showStatus, setShowStatus] = useState<boolean>(false);
    const [showActions, setShowActions] = useState<boolean>(false);

    const statusLists: ActionsLists[] = [
        {
            action: "Pending", functionCall: () => {
                if (isRealTask) {
                    return updateTask({
                        setSelectedTaskClass, targetAttribute: "status", changedValue: "pending",
                        task, groupId: group.groupId, userId: userInfo?.userId,
                        setAllowChanges
                    })
                }
                updateTask({ setPseudoTasks, targetAttribute: "status", changedValue: "pending", task })
            }
        },
        {
            action: "Finished", functionCall: () => {
                if (isRealTask) {
                    return updateTask({
                        setSelectedTaskClass, targetAttribute: "status", changedValue: "finished",
                        task, groupId: group.groupId, userId: userInfo?.userId,
                        setAllowChanges
                    })
                }
                updateTask({ setPseudoTasks, targetAttribute: "status", changedValue: "finished", task })
            }
        }
    ]
    const actionLists: ActionsLists[] = [
        {
            action: "Edit Task",
            functionCall: () => {
                const newProps: PropsForCEM = {
                    modalTitle: "Edit Task", modalDesc: "Edit Task Description",
                    modalFor: "task", modalAction: "update",
                    group, task
                } 
                setCreateAndEditModal(true)
                setPropsForCEM({...newProps})
            }
        },
        {
            action: "Delete",
            functionCall: () => { deleteTask({task, setSelectedTaskClass, isRealTask: true, groupId: group.groupId, userId: userInfo?.userId, setAllowChanges}) }
        }
    ]

    return (
        <label 
            className={`${s.task} ${darkMode && s.dark} ${task.status == "pending" ? s.pending : s.finished}`}
            style={{zIndex: `${tasksLength - index}`}}
            id={`${task.id}`} 
            htmlFor={`${task.id}_input`}>
            <div className={s.left}>
                <input
                    id={`${task.id}_input`}
                    type="checkbox"
                    checked={task.isSelected == "true" ? true : false}
                    onChange={(e) => {
                        // MAKE AN UDPATE TASK THAT WILL CHECK THE TASK.
                        if (isRealTask) {
                            setAllowChanges(false)
                            return updateTask({
                                setSelectedTaskClass, targetAttribute: "isSelected",
                                changedValue: e.target.checked ? "true" : "false",
                                task, groupId: group.groupId, userId: userInfo?.userId})
                        }
                        updateTask({ setPseudoTasks, targetAttribute: "isSelected", changedValue: e.target.checked ? "true" : "false", task })
                    }} />
                <p>{task.description}</p>
            </div>
            <div className={s.right}>
                <div className={s.statusWrapper}>
                    <Button
                        className={`${s.actionButton} ${s.statusButton}`}
                        clickListener={() => {
                            setShowStatus(showStatus ? false : true)
                        }}
                        content={<span>
                            {task.status}
                            <i className="fas fa-angle-down" />
                        </span>} />
                    <DropDown {...{ darkMode, showTools: showStatus, setShowTools: setShowStatus, actionLists: statusLists }} />
                </div>
                {isRealTask && <Button
                    className={s.actionButton}
                    clickListener={() => { setShowAssistant(true), setModifyData(prev => ({
                        ...prev, task
                    })) }}
                    iconElement={<i className="fas fa-hand-sparkles" />} />}
                {
                    isRealTask
                        ? <Button
                            className={s.actionButton}
                            clickListener={() => {
                                setShowActions(true);
                            }}
                            iconElement={<i className="fas fa-ellipsis-v" />} />
                        : <Button
                            className={s.actionButton}
                            clickListener={() => { deleteTask({ task, setPseudoTasks, isRealTask: false, setSelectedTaskClass, setAllowChanges }) }}
                            iconElement={<i className="far fa-trash-alt" />} />
                }
                <DropDown {...{ darkMode, showTools: showActions, setShowTools: setShowActions, actionLists }} />
            </div>
        </label>
    )
}

export default Task