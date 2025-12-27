import { useContext, useState, type JSX } from "react"
import s from "./styles.module.css"
import Top from "./Top";
import Form from "./Form";
import Bottom from "./Bottom";
import { context } from "../../../../../../../context/AppContext";

export default function GroupTaskModal(props: GTMProps): JSX.Element {
    const { showGTM }: GTMProps = props;
    const { darkMode } = useContext(context) as Context;
    const groupTaskClass = !darkMode
        ? `${showGTM ? s.groupTaskModal : `${s.groupTaskModal} ${s.hideModal}`}`
        : `${showGTM ? s.groupTaskModal : `${s.groupTaskModal} ${s.hideModal}`} ${s.darkGroupTaskModal}`
    const [groupName, setGroupName] = useState<string>("")
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

    const values = {
        groupName, setGroupName,
        showTaskForm, setShowTaskForm,
    }

    return (
        <div className={groupTaskClass}>
            <div className={s.modalBox}>
                <Top {...values} />
                <Form {...{ ...props, ...values }} />
                <Bottom {...{...props, ...values}} />
            </div>
        </div>
    )
}