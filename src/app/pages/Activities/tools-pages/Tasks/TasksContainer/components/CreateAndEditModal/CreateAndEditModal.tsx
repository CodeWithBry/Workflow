import { useContext, useState } from "react";
import Bottom from "./Bottom";
import Form from "./Form";
import s from "./styles.module.css"
import Top from "./Top";
import { context } from "../../../../../../../context/AppContext";

function CreateAndEditModal(props: CEMProps) {
    const {darkMode} = useContext(context) as Context;
    const { createAndEditModal } = props as CEMProps;
    const groupTaskClass = !darkMode
        ? `${createAndEditModal ? s.createAndEditModal : `${s.createAndEditModal} ${s.hideModal}`}`
        : `${createAndEditModal ? s.createAndEditModal : `${s.createAndEditModal} ${s.hideModal}`} ${s.darkGroupTaskModal}`
    const [changedValue, setChangedValue] = useState<string>("");
    

    return (
        <div className={groupTaskClass}>
            <div className={s.modalBox}>
                <Top {...{...props, changedValue, setChangedValue}}/>
                <Form {...{...props, changedValue, setChangedValue}}/>
                <Bottom {...{...props, changedValue, setChangedValue}}/>
            </div>
        </div>
    )
}

export default CreateAndEditModal