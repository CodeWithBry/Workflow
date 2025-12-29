import { useContext, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom"
import { context } from "../../context/AppContext";
import ToolsSidebar from "../../../components/navigations/ToolsSidebar/ToolsSidebar";
import s from "./styles.module.css"

function ActivitiesTools() {
    const { taskClass, setTaskClass, selectedTaskClass, navigation, setHistoryChanges, allowChanges, setAllowChanges, isDataLoaded } = useContext(context) as Context;
    const { id } = useParams<{ id: string }>();

    // USEEFFECT RUNS AND CHECKS THE ID PARAMS IF IT MATCHES ONE OF THE PROJECTS IN THE TASKCLASS.
    useEffect(() => {
        if (!id) return;
        if (isDataLoaded) return; // ⬅️ if the data is already loaded, it skips the whole code in use effect

        const defineTaskClass = taskClass.find(
            t => t.id.toLowerCase() === id.toLowerCase()
        );
        // If the user navigates to different project, it rechecks the taskclass if the ID is equal to the ID PARAMS.
        const isAlreadyOpen = taskClass.find(t => (t.id.toLowerCase() === id.toLowerCase() && t.isOpened))

        setAllowChanges(true);

        if (!defineTaskClass) {
            navigation("/activities");
            return;
        }

        if (isAlreadyOpen) {
            return setAllowChanges(false); // It skips the unnecessary update of task class if the project is already open. 
        }

        setTaskClass(prev =>
            prev.map(t => ({
                ...t,
                isOpened: t.id.toLowerCase() === id.toLowerCase()
            }))
        );

        setHistoryChanges({
            currentStateNumber: -1,
            changesInProject: []
        });

    }, [id, isDataLoaded, taskClass]);


    useEffect(() => {
        if(selectedTaskClass) {
            if(allowChanges) {
                setHistoryChanges(prev => ({
                    currentStateNumber: prev.changesInProject.length - 1 == prev.currentStateNumber ? prev.currentStateNumber + 1 : prev.currentStateNumber,
                    changesInProject: [...prev.changesInProject, { ...selectedTaskClass, isSaved: false }]
                }))
            }
        }
    }, [selectedTaskClass])


    return (
        <>
            <div className={s.activitiesContainer}>
                <ToolsSidebar />
                <Outlet />
            </div>
        </>
    )
}

export default ActivitiesTools