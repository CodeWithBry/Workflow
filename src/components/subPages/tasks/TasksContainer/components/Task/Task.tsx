import Button from "../../../../../ui/Button/Button"
import { deleteTask } from "../../utils/deleteTask"
import s from "./styles.module.css"

function Task({ task, setTaskGroups, setPseudoTasks, isRealTask, groupId }: TaskProps) {
    return (
        <div className={s.task}>
            <div className={s.left}>
                <input
                    type="checkbox"
                    checked={task.isSelected}
                    onChange={() => {
                        if (!isRealTask && groupId) setPseudoTasks(prev => prev ? prev.map((t) => {
                            return {
                                ...t, isSelected: t.tid == task.tid ?
                                    true : false
                            }
                        }) : null)

                        setTaskGroups(prev => prev.map((group) => {
                            if (groupId != group.groupId || group.tasks == null) return { ...group }
                            const updatedTasks = group.tasks.map((t) => ({
                                ...t, isSelected: t.tid == task.tid ?
                                    true : false
                            }))

                            return { ...group, tasks: updatedTasks }
                        }))
                    }} />
                <p>{task.taskDescription}</p>
            </div>
            <div className={s.right}>
                <Button
                    clickListener={() => {}}
                    content={<span>{task.status} <i className="far fa-trash-alt" /></span>} />
                <Button
                    clickListener={() => {}}
                    iconElement={<i className="far fa-trash-alt" />} />
                <Button
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