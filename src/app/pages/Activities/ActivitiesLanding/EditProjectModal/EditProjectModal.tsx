import { useContext, useState } from "react";
import Bottom from "./Bottom";
import Form from "./Form";
import s from "./styles.module.css"
import Top from "./Top";
import { context } from "../../../../context/AppContext";
context

function EditProjectModal(props: EPMProps) {
    const {darkMode} = useContext(context) as Context;
    const { editModal } = props as EPMProps;
    const groupTaskClass = !darkMode
        ? `${editModal ? s.editModal : `${s.editModal} ${s.hideModal}`}`
        : `${editModal ? s.editModal : `${s.editModal} ${s.hideModal}`} ${s.darkGroupTaskModal}`
    const [changedValue, setChangedValue] = useState<string>("");
    

    return (
        <div className={groupTaskClass}>
            <div className={s.modalBox}>
                <Top />
                <Form {...{...props, changedValue, setChangedValue}}/>
                <Bottom {...{...props, changedValue, setChangedValue}}/>
            </div>
        </div>
    )
}

export default EditProjectModal