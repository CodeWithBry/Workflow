import { type JSX } from "react"
import s from "./styles.module.css"

export default function Form(props: CPMBottomProps): JSX.Element {
    const { projectName, setProjectName }: CPMBottomProps = props;

    return (
        <>
            <div className={`${s.form} ${s.formForGroup}`}>
                <div className={s.top}>
                    <h2>Project Name</h2>
                    <p> &gt; {projectName}</p>
                </div>
                <div className={s.bottom}>
                    <h2>Give Name:</h2>
                    <input
                        type="text"
                        value={projectName}
                        onChange={(e) => {
                            setProjectName(e.target.value)
                        }} />
                </div>
            </div>
        </>
    )
}