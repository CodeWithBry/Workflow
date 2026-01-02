import { useContext } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../context/AppContext';
import useCountTasks from '../../../../../../hooks/useCountTasks';

export default function ProjectDetails() {
    const { darkMode, selectedTaskClass } = useContext(context) as Context;
    const getTasksCount = useCountTasks(selectedTaskClass);

    return (
        <div
            className={
                !darkMode
                    ? s.projectDetails
                    : `${s.projectDetails} ${s.darkProjectDetails}`
            } >

            <div className={s.statusIcon}>
                <i className={getTasksCount?.finishedTasks != getTasksCount?.tasksCount ? s.icon : `${s.icon} ${s.accomplished}`}></i>
            </div>

            <div className={s.contents}>
                <div className={s.top}>
                    <p className={s.greet}>
                        {selectedTaskClass?.name}
                    </p>
                    <p className={s.completedTasks}>
                        {getTasksCount?.finishedTasks + `/` + getTasksCount?.tasksCount}
                    </p>
                </div>
                <div className={s.bottom}>
                    <p className={getTasksCount?.finishedTasks != getTasksCount?.tasksCount ? s.statusDescription : `${s.statusDescription} ${s.accomplished}`}>
                        {
                            getTasksCount?.finishedTasks == getTasksCount?.tasksCount 
                            ? "Accomplished" : "On Going"
                        }
                    </p>
                    <p className={s.description}>
                        is completed
                    </p>
                </div>
            </div>

        </div>
    )
}