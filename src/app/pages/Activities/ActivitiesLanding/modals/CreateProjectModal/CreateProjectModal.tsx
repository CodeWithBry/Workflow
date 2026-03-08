import { useContext, useState, type JSX } from "react"
import s from "./styles.module.css"
import Top from "./Top";
import Form from "./Form";
import Bottom from "./Bottom";
import { context } from "../../../../../context/AppContext";

export default function CreateProjectModal(props: CPMProps): JSX.Element {
    const { showModal } = props as CPMProps;
    const [projectName, setProjectName] = useState<string>("");
    const { darkMode } = useContext(context) as Context;
    const projectClass = !darkMode
        ? `${showModal ? s.groupTaskModal : `${s.groupTaskModal} ${s.hideModal}`}`
        : `${showModal ? s.groupTaskModal : `${s.groupTaskModal} ${s.hideModal}`} ${s.darkGroupTaskModal}`
    const [loading, setLoading] = useState<boolean>(false);
    const values = {
        loading, setLoading,
        projectName, setProjectName
    }


    return (
        <div className={projectClass}>
            <div className={`${s.modalBox} ${darkMode && s.dark}`}>
                <div className={`${s.loading} ${!loading && s.hideLoading}`}>
                    <div className={s.spinner}></div>
                    <span className={s.loadingText}>Creating Your Project. Please Wait...</span>
                </div>
                <Top />
                <Form {...{ ...props, ...values }} />
                <Bottom {...{ ...props, ...values }} />
            </div>
        </div>
    )
}