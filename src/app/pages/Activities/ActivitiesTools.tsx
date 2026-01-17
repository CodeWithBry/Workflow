import { useContext, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom"
import { context } from "../../context/AppContext";
import ToolsSidebar from "../../../components/navigations/ToolsSidebar/ToolsSidebar";
import s from "./styles.module.css"
import AIAssintant from "./tools-pages/AIAssistant/AIAssistant";
import { getSelectedTaskClass } from "../../../utils/getSelectedTaskClass";

function ActivitiesTools() {
    const { taskClass, setTaskClass, selectedTaskClass, navigation, setHistoryChanges, allowChanges, setAllowChanges, isDataLoaded, getUrl, showAssistant, userInfo, setSelectedTaskClass, setIsDataLoaded, setChatLists, chatLists } = useContext(context) as Context;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id || !userInfo) return;
        if (isDataLoaded && taskClass.length == 0) return; // ⬅️ if the data is already loaded, it skips the whole code in use effect
        const defineTaskClass = taskClass.find(t => t.id.toLowerCase() === id.toLowerCase());
        const isAlreadyOpen = taskClass.find(t => (t.id.toLowerCase() === id.toLowerCase() && t.isOpened))
        if (!defineTaskClass) {
            navigation("/");
            return;
        }
        if (isAlreadyOpen) {
            setAllowChanges(false)
            return; // It skips the unnecessary update of task class if the project is already open. 
        }
        setTaskClass(prev => prev.map((taskClass) => {
            return { ...taskClass, isOpened: taskClass.id == id };
        }))
        setChatLists(prev => prev.map((chat) => {
            return { ...chat, isOpen: chat.id == id };
        }))
        setHistoryChanges({
            currentStateNumber: -1,
            changesInProject: []
        });
        setChatLists(prev => prev.map(chat => ({...chat, isOpen: id == chat.id})));
        getSelectedTaskClass(defineTaskClass.id, userInfo.userId, setSelectedTaskClass);
        setIsDataLoaded(true);
    }, [id, isDataLoaded, taskClass, userInfo, chatLists])

    useEffect(() => {
        if (selectedTaskClass) {
            if (allowChanges) {
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
                {getUrl[3] == 'tasks' && showAssistant && <AIAssintant />}
            </div>
        </>
    )
}

export default ActivitiesTools