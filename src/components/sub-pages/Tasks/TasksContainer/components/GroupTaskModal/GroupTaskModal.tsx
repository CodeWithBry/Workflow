import { useContext, type JSX } from "react"
import s from "./styles.module.css"
import { context } from "../../../../../../app/AppContext/AppContext"
import Top from "./Top";
import Form from "./Form";
import Bottom from "./Bottom";

export default function GroupTaskModal(props: GroupTaskModalProps): JSX.Element {
    const {showModal}: GroupTaskModalProps = props;
    const { darkMode } = useContext(context) as AppContextType;
    const groupTaskClass = !darkMode
            ? `${showModal ? s.groupTaskModal : `${s.groupTaskModal} ${s.hideModal}`}`
            : `${showModal ? s.groupTaskModal : `${s.groupTaskModal} ${s.hideModal}`} ${s.darkGroupTaskModal}`

    return (
        <div className={groupTaskClass}>
            <div className={s.modalBox}>
                <Top {...props}/>
                <Form {...props}/>
                <Bottom {...props}/>
            </div>
        </div>
    )
}