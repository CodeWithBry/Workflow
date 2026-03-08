
import { type JSX } from "react"
import s from "./styles.module.css"

export default function Form(props: EPMFormProps): JSX.Element {
    const {changedValue, setChangedValue } = props as EPMFormProps;

    return (
        <div className={`${s.form} ${s.formForGroup}`}>
            <div className={s.top}>
                <h2>Project Name:</h2>
                <p> {props.dataToModify?.name} </p>
            </div>
            <div className={s.bottom}>
                <h2>Change Project Name To:</h2>
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

// IF EDIT TASK
// >  
// 
