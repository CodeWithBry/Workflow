import { useContext, type JSX } from "react"
import s from "./styles.module.css"
import { context } from "../../../../context/AppContext";

export default function Form(props: CPMBottomProps): JSX.Element {
    const { projectName, setProjectName }: CPMBottomProps = props;
    const { darkMode } = useContext(context) as Context;

    return (
        <>
            <div className={`${s.form} ${s.formForGroup}${darkMode && s.dark}`}>
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