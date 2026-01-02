import { type JSX } from "react"
import s from "./styles.module.css"

export default function Top(props: GTMTopProps): JSX.Element {
    const { showTaskForm }: GTMTopProps = props;

    return (
        <div className={s.top}>
            <h2>Create A Group Task</h2>
            <div className={s.pageIndication}>
                <div className={`${s.indication} ${s.activeIndication}`}>
                    <span className={s.number}>1</span>
                    <span className={s.description}>Give a name for group task</span>
                </div>
                <div className={`${s.line} ${showTaskForm && s.activeLine}`}></div>
                <div className={`${s.indication} ${showTaskForm && s.activeIndication}`}>
                    <span className={s.number}>2</span>
                    <span className={s.description}>Add Task</span>
                </div>
            </div>
        </div>
    )
}