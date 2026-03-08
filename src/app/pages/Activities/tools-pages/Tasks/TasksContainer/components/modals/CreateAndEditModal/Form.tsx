
import { type JSX } from "react"
import s from "./styles.module.css"

export default function Form(props: CEMFormProps): JSX.Element {
    const { propsForCEM, changedValue, setChangedValue } = props as CEMTopProps;
    const ifEditTask = propsForCEM?.modalAction == "update" && propsForCEM.modalFor == "task";

    return (
        <div className={`${s.form} ${s.formForGroup}`}>
            <div className={s.top}>
                <h2>{
                    ifEditTask
                        ? "Task Description"
                        : propsForCEM?.modalAction == "create" ? "Create Task:" : "Group Name:"
                }</h2>
                <p> &gt; {
                    ifEditTask
                        ? propsForCEM.task?.description
                        : propsForCEM?.modalAction == "create" ? changedValue : propsForCEM?.group?.groupName
                } </p>
            </div>
            <div className={s.bottom}>
                <h2>{
                    ifEditTask
                        ? "Change Description:"
                        : propsForCEM?.modalAction == "create" ? "Create Task in this Group" : "Edit Group Name:"
                }</h2>
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
