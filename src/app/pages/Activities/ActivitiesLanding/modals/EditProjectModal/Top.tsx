import { type JSX } from "react"
import s from "./styles.module.css"

export default function Top(): JSX.Element {

    return (
        <div className={s.top}>
            <h2>Edit Project Name</h2>
            <div className={s.pageIndication}>
                <div className={`${s.indication} ${s.activeIndication}`}>
                    <span className={s.number}>1</span>
                    <span className={s.description}>
                        Edit Project Name
                    </span>
                </div>
            </div>
        </div>
    )
}