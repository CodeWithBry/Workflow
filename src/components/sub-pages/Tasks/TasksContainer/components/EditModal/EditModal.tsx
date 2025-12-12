import { useContext, useState } from "react";
import Bottom from "./Bottom";
import Form from "./Form";
import s from "./styles.module.css"
import Top from "./Top";
import { context } from "../../../../../../app/AppContext/AppContext";

function EditModal(props: EditModal) {
    const { showEditModal }: EditModal = props;
    const { darkMode } = useContext(context) as AppContextType;
    const groupTaskClass = !darkMode
        ? `${showEditModal ? s.editModal : `${s.editModal} ${s.hideModal}`}`
        : `${showEditModal ? s.editModal : `${s.editModal} ${s.hideModal}`} ${s.darkGroupTaskModal}`
    const [changedValue, setChangedValue] = useState<string>("");


    return (
        <div className={groupTaskClass}>
            <div className={s.modalBox}>
                <Top {...props} />
                <Form {...{ ...props, changedValue, setChangedValue }} />
                <Bottom {...{
                    changedValue,
                    ...props
                }} />
            </div>
        </div>
    )
}

export default EditModal