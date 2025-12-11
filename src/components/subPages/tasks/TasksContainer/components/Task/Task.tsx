import { useContext, useState } from "react"
import { DropDown } from "../../../../../dropDown/dropDown"
import Button from "../../../../../ui/Button/Button"
import { deleteTask } from "../../utils/deleteTask"
import s from "./styles.module.css"
import { context } from "../../../../../../app/AppContext/AppContext"

function Task(props: TaskProps) {
    const { task, setTaskGroups, setPseudoTasks, isRealTask, groupId }: TaskProps = props
    const { darkMode } = useContext(context) as AppContextType;

    const [showStatus, setShowStatus] = useState<boolean>(false);

    const [statusLists] = useState<ActionsLists[]>([
        { action: "Pending", functionCall: () => { } },
        { action: "Finished", functionCall: () => { } }
    ])

    return (
        <div className={`${s.task} ${task.status == "pending" ? s.pending : s.finished}`}>
            <div className={s.left}>
                <input
                    type="checkbox"
                    onChange={() => {
                        if (!isRealTask) return setPseudoTasks(prev => prev ? prev.map((t) => {
                            return {
                                ...t, isSelected: t.tid == task.tid ?
                                    true : false
                            }
                        }) : null)

                        setTaskGroups(prev => prev ? prev.map((group) => {
                            if (groupId != group.groupId || group.tasks == null) return { ...group }
                            const updatedTasks = group.tasks.map((t) => ({
                                ...t, isSelected: t.tid == task.tid ?
                                    true : false
                            }))

                            return { ...group, tasks: updatedTasks }
                        }) : null)
                    }} />
                <p>{task.taskDescription}</p>
            </div>
            <div className={s.right}>
                <Button
                    className={`${s.actionButton} ${s.statusButton}`}
                    clickListener={() => { }}
                    content={<span>
                        {task.status}
                        <i className="fas fa-angle-down" />
                        <DropDown {...{ darkMode, showTools: showStatus, setShowTools: setShowStatus, actionLists: statusLists }} />
                    </span>} />
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