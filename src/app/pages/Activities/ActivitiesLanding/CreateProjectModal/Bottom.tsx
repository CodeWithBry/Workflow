import { useContext, type JSX } from "react"
import s from "./styles.module.css"
import Button from "../../../../../components/ui/Button"
import { addProject } from "../../../../../utils/addProject"
import { context } from "../../../../context/AppContext"

export default function Bottom(props: CPMBottomProps): JSX.Element {
    const { projectName, setShowModal } = props as CPMBottomProps
    const {setTaskClass, setChatLists, userInfo} = useContext(context) as Context;

    return (
        <div className={s.bottom}>
            <Button
                className={s.actionButton}
                clickListener={() => {setShowModal(false)}}
                content={"Cancel"} />
            <Button
                className={projectName == "" ? s.actionButton : `${s.actionButton} ${s.active}`}
                clickListener={() => {
                    console.log(projectName, userInfo)
                    if(projectName == "" || !userInfo) return 
                    setShowModal(false)
                    addProject({setTaskClass, setChatLists, projectName, userId: userInfo.userId})
                }}
                content={"Submit"} />
        </div>
    )
}