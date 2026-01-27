import { useState, type JSX } from "react"
import s from "./styles.module.css"
import Button from "../../../../../../../../components/ui/Button";
import { addTask } from "../../utils/addTask";
import Task from "../Task/Task";

export default function Form(props: GTMFormProps): JSX.Element {
    const { showTaskForm, groupName, pseudoGroup, pseudoTasks }: GTMFormProps = props;
    const { setGroupName, setPseudoTasks }: GTMFormProps = props;
    const [allowAdd, setAllowAdd] = useState<boolean>(false)
    const [taskDescription, setTaskDescription] = useState<string>("");

    return (
        <>
            {!showTaskForm ?
                <div className={`${s.form} ${s.formForGroup}`}>
                    <div className={s.top}>
                        <h2>Group Name</h2>
                        <p> &gt; {groupName}</p>
                    </div>
                    <div className={s.bottom}>
                        <h2>Give Name:</h2>
                        <input
                            type="text"
                            value={groupName}
                            onChange={(e) => {
                                setGroupName(e.target.value)
                            }} />
                    </div>
                </div> :
                <div className={`${s.form} ${s.formForTask}`}>
                    <div className={s.top}>
                        <h2>Group Name</h2>
                        <p> &gt; {groupName}</p>
                    </div>

                    <div className={s.bottom}>
                        <h2>Name a task:</h2>
                        <div className={s.wrapper}>
                            <input
                                type="text"
                                value={taskDescription}
                                onChange={(e) => {
                                    setTaskDescription(e.target.value)
                                    setAllowAdd(e.target.value != "" ? true : false)
                                }}
                                onKeyDown={(e) => {
                                    if (e.key == "Enter" && allowAdd && pseudoGroup) {
                                        addTask({
                                            taskDescription, setPseudoTasks,
                                            groupId: pseudoGroup?.groupId,
                                            pseudoTasks
                                        })
                                        setTaskDescription("")
                                    }
                                }} />
                            <Button
                                className={`${s.addTask} ${!allowAdd && s.dontAllow}`}
                                clickListener={() => {
                                    if (pseudoGroup) {
                                        addTask({
                                            taskDescription, setPseudoTasks,
                                            groupId: pseudoGroup?.groupId,
                                            pseudoTasks
                                        })
                                        setTaskDescription("")
                                    }
                                }}
                                content={"Add Task"} />
                        </div>
                    </div>

                    <div className={s.tasks}>
                        <h2>Tasks</h2>
                        {pseudoTasks?.map(task => {
                            if (pseudoGroup) {
                                const taskProps = {
                                    task,
                                    isRealTask: false,
                                    group: pseudoGroup,
                                    index: 0,
                                    tasksLength: 0
                                }
                                return <Task {...{ ...taskProps, ...props }} />
                            }
                        })}
                    </div>
                </div>}
        </>
    )
}