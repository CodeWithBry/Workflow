import { useContext, type JSX } from "react"
import s from "./styles.module.css"
import Button from "../../../../../components/ui/Button"
import { context } from "../../../../context/AppContext"
import { updateProject } from "../../../../../utils/updateProject";

export default function Bottom(props: EPMBottomProps): JSX.Element {
    const {setTaskClass, userInfo} = useContext(context) as Context;

    return (
        <div className={s.bottom}>
            <Button
                className={s.actionButton}
                clickListener={() => { props.setEditModal(false) }}
                content={"Cancel"} />
            <Button
                className={false ? s.actionButton : `${s.actionButton} ${s.active}`}
                clickListener={() => {
                    if(props.changedValue.length != 0 && props.dataToModify && userInfo) {
                        updateProject({
                            setTaskClass,
                            projectName: props.dataToModify?.name,
                            projectId: props.dataToModify?.id,
                            value: props.changedValue,
                            action: "update"
                        }, userInfo)
                        props.setEditModal(false);

                    } 
                }}
                content={"Next"} />
        </div>
    )
}