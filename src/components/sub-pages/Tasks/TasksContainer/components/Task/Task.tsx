import { useContext, useState } from "react"
import { DropDown } from "../../../../../DropDown/DropDown"
import Button from "../../../../../ui/Button/Button"
import { deleteTask } from "../../utils/deleteTask"
import s from "./styles.module.css"
import { context } from "../../../../../../app/AppContext/AppContext"
import { updateTask } from "../../utils/updateTask"

function Task(props: TaskProps) {
    const { task, setTaskGroups, setPseudoTasks, isRealTask, groupId }: TaskProps = props
    const { darkMode } = useContext(context) as AppContextType;

    const [showStatus, setShowStatus] = useState<boolean>(false);

    const [statusLists] = useState<ActionsLists[]>([
        {
            action: "Pending", functionCall: () => {
                if (isRealTask) return updateTask({
                    setTaskGroups,
                    targetAttribute: "status",
                    changedValue: "pending",
                    taskId: task.tid,
                    groupId
                })

                updateTask({
                    targetAttribute: "status",
                    changedValue: "pending",
                    taskId: task.tid,
                    groupId,
                    setPseudoTasks,
                    task
                })
            }
        },
        {
            action: "Finished", functionCall: () => {
                if(isRealTask) return updateTask({
                    setTaskGroups,
                    targetAttribute: "status",
                    changedValue: "finished",
                    taskId: task.tid,
                    groupId
                })

                updateTask({
                    targetAttribute: "status",
                    changedValue: "finished",
                    taskId: task.tid,
                    groupId,
                    setPseudoTasks,
                    task
                })
            }
        }
    ])

    return (
        <div className={`${s.task} ${task.status == "pending" ? s.pending : s.finished}`}>
            <div className={s.left}>
                <input
                    type="checkbox"
                    onChange={(e) => {
                        if (isRealTask) return updateTask({
                            setTaskGroups,
                            targetAttribute: "isSelected",
                            changedValue: e.target.checked ? "true" : "false",
                            taskId: task.tid,
                            groupId
                        })

                        updateTask({
                            targetAttribute: "isSelected",
                            changedValue: e.target.checked ? "true" : "false",
                            taskId: task.tid,
                            groupId,
                            task,
                            setPseudoTasks
                        })
                    }} />
                <p>{task.taskDescription}</p>
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
                    clickListener={() => { deleteTask({ ...props }) }}
                    iconElement={<i className="fas fa-hand-sparkles" />} />}
                <Button
                    className={s.actionButton}
                    clickListener={() => {
                        deleteTask({
                            task,
                            setPseudoTasks,
                            setTaskGroups,
                            isRealTask: false
                        })
                    }}
                    iconElement={<i className="far fa-trash-alt" />} />
            </div>
        </div>
    )
}

export default Task