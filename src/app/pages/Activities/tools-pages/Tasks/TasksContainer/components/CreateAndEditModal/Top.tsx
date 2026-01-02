import { type JSX } from "react"
import s from "./styles.module.css"

export default function Top(props: CEMTopProps): JSX.Element {
    const {propsForCEM} = props as CEMTopProps;

    return (
        <div className={s.top}>
            <h2>{propsForCEM?.modalTitle}</h2>
            <div className={s.pageIndication}>
                <div className={`${s.indication} ${s.activeIndication}`}>
                    <span className={s.number}>1</span>
                    <span className={s.description}>{propsForCEM?.modalDesc}</span>
                </div>
            </div>
        </div>
    )
}