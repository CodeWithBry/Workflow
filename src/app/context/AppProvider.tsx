import { useEffect, useMemo, useState } from "react"
import { context } from "./AppContext"

import MainRoutes from "../routes/MainRoutes";
// import Tasks from "../pages/Tools/tools-pages/Tasks/Tasks";
import Analytics from "../pages/Activities/tools-pages/Analytics/Analytics";
import AIAssintant from "../pages/Activities/tools-pages/AIAssistant/AIAssistant";
import ActivitiesLanding from "../pages/Activities/ActivitiesLanding/ActivitiesLanding";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import Tasks from "../pages/Activities/tools-pages/Tasks/Tasks";
import { useGetPath } from "../../hooks/useGetPath";
import { useLocaleStorage } from "../../hooks/useLocaleStorage";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Login from "../pages/auth/Login/Login";
import Signup from "../pages/auth/Signup/Signup";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, getDataFromFirestore } from "../../lib/firebase";

function AppProvider() {
    // NAVIGATION
    const navigation: NavigateFunction = useNavigate();
    const getUrl: string[] = useGetPath();
    const locStor = useLocaleStorage() as UseLocaleStorage;

    // BOOLEANS
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [showToolBar, setShowToolBar] = useState<boolean>(false);
    const [allowChanges, setAllowChanges] = useState<boolean>(false);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(true);
    const [showAssistant, setShowAssistant] = useState<boolean>(false);

    // STRINGS
    const [subPath, setSubPath] = useState<string>("");

    // OBJECTS AND ARRAYS
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [authCredentials, setAuthCredentials] = useState<User | null>(null);

    const [pages, setPages] = useState<Pages[]>([
        { tabName: "Activities", tabPath: "/", tabIcon: "fas fa-tools", tabElement: ActivitiesLanding, tabFocused: false },
        { tabName: "Login", tabPath: "/login", tabIcon: "fas fa-tools", tabElement: Login, tabFocused: false },
        { tabName: "Signup", tabPath: "/signup", tabIcon: "fas fa-tools", tabElement: Signup, tabFocused: false },
        { tabName: "PageNotFound", tabPath: "*", tabIcon: "fas fa-tools", tabElement: PageNotFound, tabFocused: false },
    ]);
    const [toolsPages, setToolsPages] = useState<Pages[]>([
        { tabName: "Tasks", tabPath: "tasks", tabIcon: "fas fa-tasks", tabElement: Tasks, tabFocused: false },
        { tabName: "Analytics", tabPath: "analytics", tabIcon: "fas fa-chart-bar", tabElement: Analytics, tabFocused: false },
        { tabName: "AI-Assistant", tabPath: "ai-assistant", tabIcon: "	fas fa-hand-sparkles", tabElement: AIAssintant, tabFocused: false }
    ]);

    const [historyChanges, setHistoryChanges] = useState<HistoryChanges>({
        currentStateNumber: -1,
        changesInProject: []
    });
    const [modifyData, setModifyData] = useState<ModifyData>({
        task: null,
        project: null
    });
    const [taskClass, setTaskClass] = useState<TaskClass[]>([
        // NORMAL TASKS
        { name: "Everyday Tasks", id: "everyday-task", icon: "fas far fa-list-alt", taskType: "normal-tasks", isOpened: false, taskGroups: [], status: "pending" },
        { name: "Daily Routine", id: "daily-routine", icon: "fas fa-calendar-alt", taskType: "normal-tasks", isOpened: false, taskGroups: [], status: "pending" },
        { name: "Occasional", id: "occasional", icon: "	fas fa-calendar-day", taskType: "normal-tasks", isOpened: false, taskGroups: [], status: "pending" },
        // ALL OF THE ADDED TASK CLASS WILL BE CLASSIFIED AS A PROJECTS
    ]);
    const [chats, setChats] = useState<Chats>([]);
    const selectedChat: SelectedChat = useMemo(() => {
        return chats.find(chat => chat.isOpen);
    }, [chats])
    const selectedTaskClass: SelectedTaskClass = useMemo(() => {
        return taskClass.find(t => t.isOpened) ?? null;
    }, [taskClass])


    const contextValues: Context = {
        // CUSTOM HOOKS
        navigation, locStor, getUrl,
        // BOOLEANS
        darkMode, setDarkMode,
        showToolBar, setShowToolBar,
        allowChanges, setAllowChanges,
        isDataLoaded, setIsDataLoaded,
        showAssistant, setShowAssistant,
        // STRINGS
        // NUMBERICAL VALUES

        subPath, setSubPath,
        // OBJECTS AND ARRAYS
        userInfo, setUserInfo,
        authCredentials, setAuthCredentials,
        pages, setPages,
        toolsPages, setToolsPages,
        historyChanges, setHistoryChanges,
        taskClass, setTaskClass,
        chats, setChats,
        modifyData, setModifyData,
        selectedTaskClass, selectedChat
    };



    if (!userInfo?.userId) {
        onAuthStateChanged(auth, async (current) => {
            if (current?.uid != null) {
                setAuthCredentials(current)
                const getData = await getDataFromFirestore(current.uid);
                console.log(getData);
            }
        })
    }

    useEffect(() => {
        console.log(authCredentials)
    }, [authCredentials])

    useEffect(() => {
        setToolsPages(prev => prev.map(page => ({ ...page, tabFocused: page.tabPath == getUrl[3] })));
        setShowAssistant(false);

        if (getUrl[3] == null) {
            setHistoryChanges(prev => ({
                ...prev,
                currentStateNumber: -1,
                changesInProject: []
            }))
        }
    }, [getUrl[3]])

    useEffect(() => {
        const getData: GetDataFromLocalStorage = locStor.getDataFromLocalStorage("taskClass");
        if (getData?.taskClass && taskClass) {
            const notBelongToTaskClass = getData.taskClass.filter(t => !taskClass.some(ta => t.id == ta.id))
            if (notBelongToTaskClass) {
                const updateNormalTasks: TaskClass[] = taskClass.map((taskClass, index) => {
                    return getData.taskClass[index]?.id == taskClass.id ?
                        { ...getData.taskClass[index] } : taskClass
                })
                const mergeWithTaskClass = [...updateNormalTasks, ...notBelongToTaskClass]
                setTaskClass([...mergeWithTaskClass])
            } else {
                setTaskClass(prev => prev.map((taskClass, index) => {
                    return getData.taskClass[index]?.id == taskClass.id ?
                        { ...getData.taskClass[index] } : taskClass
                }))
            }
        }
    }, [])

    useEffect(() => {
        if (selectedTaskClass) {
            setModifyData(prev => ({
                ...prev,
                project: selectedTaskClass
            }))

            setChats(prev => prev.map(chat => {
                return { ...chat, isOpen: chat.id == selectedTaskClass.id }
            }))
        }
    }, [selectedTaskClass])

    useEffect(() => {
        const getData: GetDataFromLocalStorage = locStor.getDataFromLocalStorage("chat");
        if (getData && taskClass) {
            let newChats: Chats = [];

            for (let i in taskClass) {
                const newChat: Chat = {
                    isOpen: false,
                    id: taskClass[i].id,
                    convos: []
                }
                newChats.push(newChat)
            }

            if (getData.chats.length != 0) {
                const notBelongToChats = getData.chats.filter(t => !newChats.some(ta => t.id == ta.id));
                console.log(notBelongToChats)
                if (notBelongToChats.length != 0) {
                    const updateChats: Chats = chats.map((chat, index) => {
                        return getData.chats[index]?.id == chat.id
                            ? { ...getData.chats[index] } : chat
                    })
                    setChats([...updateChats])
                } else {
                    const updateChats = newChats.map((chat, index) => {
                        console.log(getData.chats[index]?.id == chat.id)
                        return getData.chats[index]?.id == chat.id
                            ? { ...getData.chats[index] } : chat
                    })
                    setChats([...updateChats])
                }
            } else {
                setChats([...newChats])
            }

            setIsDataLoaded(false);
        } else {
            setIsDataLoaded(false);
        }
    }, [taskClass])

    useEffect(() => {
        setChats(prev => prev.map(chat => {
            if (selectedTaskClass?.id == chat.id) {
                return { ...chat, isOpen: true }
            }

            return { ...chat, isOpen: false }
        }))
    }, [selectedTaskClass])

    return (
        <context.Provider value={contextValues}>
            <MainRoutes />
        </context.Provider>
    )
}

export default AppProvider