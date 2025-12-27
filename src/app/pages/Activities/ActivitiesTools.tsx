import { useContext, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom"
import { context } from "../../context/AppContext";
import ToolsSidebar from "../../../components/navigations/ToolsSidebar/ToolsSidebar";
import s from "./styles.module.css"

function ActivitiesTools() {
    const { taskClass, setTaskClass, selectedTaskClass, navigation, setHistoryChanges, allowChanges, setAllowChanges, setShowSaveButton } = useContext(context) as Context;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if(id) {
            const defineProject = taskClass.find(t => t.id.toLowerCase() == id?.toLowerCase());
            if (defineProject == null) {
                navigation("/activities");
            }
            
            setTaskClass(prev => prev.map((t) => {
                return { ...t, isOpened: t.id.toLowerCase() == id.toLowerCase() };
            }))
            setHistoryChanges({
                currentStateNumber: -1,
                changesInProject: []
            });

            return () => {
                setAllowChanges(true);
            }
        }
    }, [id])

    useEffect(() => {
        if(selectedTaskClass) {
            if(allowChanges) {
                setHistoryChanges(prev => ({
                    currentStateNumber: prev.changesInProject.length - 1 == prev.currentStateNumber ? prev.currentStateNumber + 1 : prev.currentStateNumber,
                    changesInProject: [...prev.changesInProject, {...selectedTaskClass, isSaved: false}]
                }))
            } else setShowSaveButton(false)
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