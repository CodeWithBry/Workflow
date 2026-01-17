import { useContext, type JSX } from "react"
import s from "./styles.module.css"
import { context } from "../../../../../../../context/AppContext";
import Button from "../../../../../../../../components/ui/Button";
import { addGroupTask } from "../../utils/addGroupTask";

export default function Bottom(props: GTMBottomProps & GTMProps): JSX.Element {
    const { showTaskForm, groupName, pseudoTasks, pseudoGroup } = props as GTMBottomProps & GTMProps
    const { setShowGTM, setGroupName,
        setShowTaskForm, setPseudoGroup,
        setPseudoTasks }: GTMBottomProps & GTMProps = props
    const { taskClass, setSelectedTaskClass, selectedTaskClass, setAllowChanges, userInfo } = useContext(context) as Context;

    // useEffect(() => { console.log(selectedNormalTask) }, [selectedNormalTask])

    return (
        <div className={s.bottom}>
            <Button
                className={s.actionButton}
                clickListener={() => {
                    if (showTaskForm) {
                        return setShowTaskForm(false)
                    }
                    setGroupName("")
                    setShowGTM(false)
                }}
                content={showTaskForm ? "Back" : "Cancel"} />
            <Button
                className={groupName == "" ? s.actionButton : `${s.actionButton} ${s.active}`}
                clickListener={() => {
                    if (showTaskForm) {
                        addGroupTask({ pseudoGroup, setPseudoGroup, pseudoTasks, groupName, setSelectedTaskClass, taskClass, taskClassId: selectedTaskClass?.id, setAllowChanges, userId: userInfo?.userId });
                        setShowTaskForm(false);
                        setPseudoGroup(null);
                        setPseudoTasks(null);
                        setGroupName("")
                        return setShowGTM(false);
                    }

                    addGroupTask({pseudoGroup, setPseudoGroup, pseudoTasks, groupName, setAllowChanges})
                    setShowTaskForm(true)
                }}
                content={showTaskForm ? "Submit" : "Next"} />
        </div>
    )
}