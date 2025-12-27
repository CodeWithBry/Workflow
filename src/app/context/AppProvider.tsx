import { useEffect, useMemo, useState } from "react"
import { context } from "./AppContext"

import MainRoutes from "../routes/MainRoutes";
// import Tasks from "../pages/Tools/tools-pages/Tasks/Tasks";
import Analytics from "../pages/Activities/tools-pages/Analytics/Analytics";
import AIAssintant from "../pages/Activities/tools-pages/AIAssistant/AIAssistant";
import ActivitiesLanding from "../pages/Activities/ActivitiesLanding";
import Home from "../pages/Home/Home";
import Docs from "../pages/Docs/Docs";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import Tasks from "../pages/Activities/tools-pages/Tasks/Tasks";
import { useGetPath } from "../../hooks/useGetPath";
import { useLocaleStorage } from "../../hooks/useLocaleStorage";

function AppProvider() {
    // NAVIGATION
    const navigation: NavigateFunction = useNavigate();
    const getUrl: string[] = useGetPath();
    const locStor = useLocaleStorage() as UseLocaleStorage;

    // BOOLEANS
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [showToolBar, setShowToolBar] = useState<boolean>(false);
    const [allowChanges, setAllowChanges] = useState<boolean>(false);
    const [showSaveButton, setShowSaveButton] = useState<boolean>(false);
    const [numOfChangeInHistory, setNumOfChangeInHistory] = useState<number>(-1);

    // STRINGS
    const [subPath, setSubPath] = useState<string>("");

    // OBJECTS AND ARRAYS
    const [pages, setPages] = useState<Pages[]>([
        { tabName: "Home", tabPath: "/", tabIcon: "	fas fa-home", tabElement: Home, tabFocused: false },
        { tabName: "Tools", tabPath: "/activities", tabIcon: "fas fa-tools", tabElement: ActivitiesLanding, tabFocused: false },
        { tabName: "Docs", tabPath: "/docs", tabIcon: "fas fa-code", tabElement: Docs, tabFocused: false },
    ]);
    const [toolsPages, setToolsPages] = useState<Pages[]>([
        { tabName: "Tasks", tabPath: "tasks", tabIcon: "fas fa-tasks", tabElement: Tasks, tabFocused: false },
        { tabName: "Analytics", tabPath: "analytics", tabIcon: "fas fa-chart-bar", tabElement: Analytics, tabFocused: false },
        { tabName: "AI-Assistant", tabPath: "ai-assistant", tabIcon: "	fas fa-hand-sparkles", tabElement: AIAssintant, tabFocused: false },
    ]);

    const [historyChanges, setHistoryChanges] = useState<HistoryChanges>({
        currentStateNumber: -1,
        changesInProject: []
    });
    const [taskClass, setTaskClass] = useState<TaskClass[]>([
        // NORMAL TASKS
        { name: "Everyday Tasks", id: "everyday-task", icon: "fas far fa-list-alt", taskType: "normal-tasks", isOpened: false, taskGroups: [] },
        { name: "Daily Routine", id: "daily-routine", icon: "fas fa-calendar-alt", taskType: "normal-tasks", isOpened: false, taskGroups: [] }
        // ALL OF THE ADDED TASK CLASS WILL BE CLASSIFIED AS A PROJECTS
    ]);
    const selectedTaskClass: SelectedTaskClass = useMemo(() => {
        return taskClass.find(t => t.isOpened) ?? null;
    }, [taskClass])

    const contextValues: Context = {
        // CUSTOM HOOKS
        navigation, locStor,
        // BOOLEANS
        darkMode, setDarkMode,
        showToolBar, setShowToolBar,
        allowChanges, setAllowChanges,
        showSaveButton, setShowSaveButton,
        // STRINGS
        // NUMBERICAL VALUES
        numOfChangeInHistory, setNumOfChangeInHistory,

        subPath, setSubPath,
        // OBJECTS AND ARRAYS
        pages, setPages,
        toolsPages, setToolsPages,
        historyChanges, setHistoryChanges,
        taskClass, setTaskClass,
        selectedTaskClass
    };

    useEffect(() => {
        setToolsPages(prev => prev.map(page => ({ ...page, tabFocused: page.tabPath == getUrl[3] })));
    }, [getUrl[3]])

    useEffect(() => {
        const getData: GetDataFromLocalStorage = locStor.getDataFromLocalStorage();
        if (getData) return () => setTaskClass([...getData]);
    }, [])

    return (
        <context.Provider value={contextValues}>
            <MainRoutes />
        </context.Provider>
    )
}

export default AppProvider