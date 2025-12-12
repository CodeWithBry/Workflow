
import { type JSX } from "react"
import s from "./styles.module.css"

export default function Form({ selectedGroup, changedValue, setChangedValue }: EditFormModal): JSX.Element {


    return (
        <div className={`${s.form} ${s.formForGroup}`}>
            <div className={s.top}>
                <h2>From</h2>
                <p> &gt; {selectedGroup?.groupName}</p>
            </div>
            <div className={s.bottom}>
                <h2>To:</h2>
                <input
                    type="text"
                    value={changedValue}
                    onChange={(e) => {
                        setChangedValue(e.target.value)
                    }} />
            </div>
        </div>
    )
}