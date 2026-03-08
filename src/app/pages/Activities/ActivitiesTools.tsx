import { useContext, useEffect } from "react";
import { Outlet, useParams } from "react-router-dom"
import { context } from "../../context/AppContext";
import ToolsSidebar from "../../../components/navigations/ToolsSidebar/ToolsSidebar";
import s from "./styles.module.css"
import AIAssintant from "./tools-pages/AIAssistant/AIAssistant";
import { getSelectedTaskClass } from "../../../utils/getSelectedTaskClass";
import { getAnalytics } from "../../../utils/getAnalytics";
import { getWeek } from "../../../utils/getWeek";

function ActivitiesTools() {
    const { darkMode, taskClass, setTaskClass, selectedTaskClass, navigation, setHistoryChanges, allowChanges, setAllowChanges, isDataLoaded, getUrl, showAssistant, userInfo, setSelectedTaskClass, setIsDataLoaded, setChatLists, chatLists, setSelectedConvo, setAnalytics, setWeekData } = useContext(context) as Context;
    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        if (!id || !userInfo) return;
        if (isDataLoaded && taskClass.length == 0) return; // ⬅️ if the data is already loaded, it skips the whole code in use effect
        const defineTaskClass = taskClass.find(t => t.id.toLowerCase() === id.toLowerCase());
        const isAlreadyOpen = taskClass.find(t => (t.id.toLowerCase() === id.toLowerCase() && t.isOpened));
        const findInChats = chatLists.find(chatInfo => chatInfo.id == id);
        if (!defineTaskClass) {
            navigation("/");
            return;
        }
        if (isAlreadyOpen) {
            setAllowChanges(false);
            return; // It skips the unnecessary update of task class if the project is already open. 
        }
        if (findInChats == undefined) {
            setChatLists(prev => [...prev, {
                convoLists: [],
                isOpen: true,
                id: id
            }])
        }

        setTaskClass(prev => prev.map((taskClass) => {
            return { ...taskClass, isOpened: taskClass.id == id };
        }))
        setChatLists(prev => {
            return prev.map((chat) => {
                return { ...chat, isOpen: chat.id == id };
            })
        })
        setSelectedConvo(undefined);
        setHistoryChanges({
            currentStateNumber: -1,
            changesInProject: []
        });
        setChatLists(prev => prev.map(chat => ({ ...chat, isOpen: id == chat.id })));
        getSelectedTaskClass(defineTaskClass.id, userInfo.userId, setSelectedTaskClass);
        getAnalytics(id, userInfo.userId, setAnalytics, setSelectedTaskClass)
            .then(async (res) => {
                if (res?.date) {
                    const getWeekResult = await getWeek(userInfo.userId, id, res.date, setWeekData);
                    setIsDataLoaded(true);
                    return getWeekResult;
                }
            })
            .catch((error) => console.log(error));
    }, [id, isDataLoaded, taskClass, userInfo, chatLists])

    useEffect(() => {
        if (selectedTaskClass) {
            if (allowChanges) {
                setHistoryChanges(prev => {
                    const newChanges = {
                        currentStateNumber: prev.changesInProject.length - 1 == prev.currentStateNumber ? prev.currentStateNumber + 1 : prev.currentStateNumber,
                        changesInProject: [...prev.changesInProject, { ...selectedTaskClass, isSaved: false }]
                    }

                    setAllowChanges(false);
                    return newChanges;
                })
            }

            setHistoryChanges(prev => {
                if (prev.changesInProject.length == 0) {
                    return {
                        ...prev,
                        currentStateNumber: 0,
                        changesInProject: [...prev.changesInProject, { ...selectedTaskClass, isSaved: false }]
                    }
                }

                return prev
            })
        }
    }, [selectedTaskClass])

    return (
        <>
            <div className={`${s.activitiesContainer} ${darkMode && s.dark}`}>
                <ToolsSidebar />
                <Outlet />
                {getUrl[3] == 'tasks' && showAssistant && <AIAssintant />}
            </div>
        </>
    )
}

export default ActivitiesTools