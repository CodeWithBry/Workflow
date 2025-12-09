import { useContext } from 'react'
import s from './styles.module.css'
import { context } from '../../../AppContext/AppContext'

export default function ProjectDetails() {
    const { darkMode } = useContext(context) as AppContextType;

    return (
        <div
            className={
                !darkMode
                    ? s.projectDetails
                    : `${s.projectDetails} ${s.darkProjectDetails}`
            } >

            <div className={s.statusIcon}>
                <i className={s.icon}></i>
            </div>

            <div className={s.contents}>
                <div className={s.top}>
                    <p className={s.greet}>
                        Task Lists
                    </p>
                    <p className={s.completedTasks}>
                        10/20
                    </p>
                </div>
                <div className={s.bottom}>
                    <p className={s.statusDescription}>
                        Pending
                    </p>
                    <p className={s.description}>
                        is completed
                    </p>
                </div>
            </div>

        </div>
    )
}