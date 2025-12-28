import { useContext, type JSX } from "react"
import s from "./styles.module.css"
import Button from "../../../../../components/ui/Button"
import { addProject } from "../../../../../utils/addProject"
import { context } from "../../../../context/AppContext"

export default function Bottom(props: CPMBottomProps): JSX.Element {
    const { projectName, setShowModal } = props as CPMBottomProps
    const {setTaskClass, locStor} = useContext(context) as Context;

    // useEffect(() => { console.log(selectedNormalTask) }, [selectedNormalTask])

    return (
        <div className={s.bottom}>
            <Button
                className={s.actionButton}
                clickListener={() => {setShowModal(false)}}
                content={"Cancel"} />
            <Button
                className={projectName == "" ? s.actionButton : `${s.actionButton} ${s.active}`}
                clickListener={() => {
                    if(projectName == "") return 
                    setShowModal(false)
                    addProject({setTaskClass, projectName, locStor})
                }}
                content={"Submit"} />
        </div>
    )
}