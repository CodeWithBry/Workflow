import { useContext, useEffect, useState } from "react";
import s from "./styles.module.css";
import { context } from "../../../../../../context/AppContext";

function TasksContainer() {
    const { weekData } = useContext(context) as Context;
    const [allFinishedTask, setAllFinishedTask] = useState<Task[]>([]);

    useEffect(() => {
        if(weekData) {
            let finishedTask: Task[] = [];
            weekData.days.forEach((day) => {
                day.finishedTasks.forEach(task => finishedTask.push(task));
            })
            setAllFinishedTask([...finishedTask]);
        } else {
            setAllFinishedTask([])
        }
    }, [weekData])
    return (
        <ul className={s.tasksContainer}>
            {allFinishedTask.map((task) => {
                return <li className={s.task} key={task.id}>
                    <i className="	far fa-check-circle"></i>
                    <span>{task.description}</span>
                </li>
            })}
        </ul>
    )
}

export default TasksContainer