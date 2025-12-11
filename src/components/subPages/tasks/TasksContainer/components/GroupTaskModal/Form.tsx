import { useState, type JSX } from "react"
import s from "./styles.module.css"
import Button from "../../../../../ui/Button/Button";
import { addTask } from "../../utils/addTask";
import Task from "../Task/Task"

export default function Form(props: FormProps): JSX.Element {
    const { showTaskForm, setTaskGroups,
        groupName, setGroupName,
        pseudoTasks, setPseudoTasks,
        pseudoGroup }: FormProps = props;
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
                                }} />
                            <Button
                                className={s.addTask}
                                clickListener={() => {
                                    if(pseudoGroup) addTask({ taskDescription, setPseudoTasks, pseudoTasks, groupId: pseudoGroup?.groupId })
                                }}
                                content={"Add Task"} />
                        </div>
                    </div>

                    <div className={s.tasks}>
                        <h2>Tasks</h2>
                        {pseudoTasks?.map(task => {
                            const taskProps: TaskProps = {
                                task,
                                setPseudoTasks,
                                setTaskGroups,
                                isRealTask: false,
                                groupId: pseudoGroup?.groupId
                            }
                            return <Task {...taskProps} />
                        })}
                    </div>
                </div>}
        </>
    )
}