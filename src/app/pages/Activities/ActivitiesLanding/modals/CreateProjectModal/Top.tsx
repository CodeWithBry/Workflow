import { type JSX } from "react"
import s from "./styles.module.css"

export default function Top(): JSX.Element {

    return (
        <div className={s.top}>
            <h2>Create A Project</h2>
            <div className={s.pageIndication}>
                <div className={`${s.indication} ${s.activeIndication}`}>
                    <span className={s.number}>1</span>
                    <span className={s.description}>Give a name for a project</span>
                </div>
            </div>
        </div>
    )
}