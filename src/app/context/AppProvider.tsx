import { useEffect, useState } from "react"
import { context } from "./AppContext"

import MainRoutes from "../routes/MainRoutes";
// import Tasks from "../pages/Tools/tools-pages/Tasks/Tasks";
import Analytics from "../pages/Activities/tools-pages/Analytics/Analytics";
import AIAssintant from "../pages/Activities/tools-pages/AIAssistant/AIAssistant";
import ActivitiesLanding from "../pages/Activities/ActivitiesLanding/ActivitiesLanding";
import { useNavigate, type NavigateFunction } from "react-router-dom";
import Tasks from "../pages/Activities/tools-pages/Tasks/Tasks";
import { useGetPath } from "../../hooks/useGetPath";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Login from "../pages/auth/Login/Login";
import Signup from "../pages/auth/Signup/Signup";
import { onAuthStateChanged, type User } from "firebase/auth";
import { auth, getDataFromFirestore } from "../../lib/firebase";

function AppProvider() {
    // NAVIGATION
    const navigation: NavigateFunction = useNavigate();
    const getUrl: string[] = useGetPath();

    // BOOLEANS
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [showToolBar, setShowToolBar] = useState<boolean>(false);
    const [allowChanges, setAllowChanges] = useState<boolean>(false);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [showAssistant, setShowAssistant] = useState<boolean>(false);
    const [pauseEffect, setPauseEffect] = useState<boolean>(false);

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
    const [taskClass, setTaskClass] = useState<TaskClassLists[]>([]);
    const [selectedTaskClass, setSelectedTaskClass] = useState<SelectedTaskClass>(null);
    const [chatLists, setChatLists] = useState<ChatList[]>([]);
    const [convoLists, setConvoLists] = useState<ConvoList[]>([]);
    const [selectedConvo, setSelectedConvo] = useState<SelectedConvo>(undefined);

    const contextValues: Context = {
        // CUSTOM HOOKS
        navigation, getUrl,
        // BOOLEANS
        darkMode, setDarkMode,
        showToolBar, setShowToolBar,
        allowChanges, setAllowChanges,
        isDataLoaded, setIsDataLoaded,
        showAssistant, setShowAssistant,
        pauseEffect, setPauseEffect,
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
        selectedTaskClass, setSelectedTaskClass,
        chatLists, setChatLists,
        convoLists, setConvoLists,
        selectedConvo, setSelectedConvo,

        modifyData, setModifyData,
        // selectedChat
    };

    if (!userInfo?.userId) {
        onAuthStateChanged(auth, async (current) => {
            if (current?.uid != null && current.uid != userInfo?.userId) {
                const getData = await getDataFromFirestore(current.uid);
                setUserInfo(getData.user);
                setChatLists(getData.chatLists);
                setTaskClass(getData.projectLists);
                setAuthCredentials(current);
            }
        })
    }

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
        if (selectedTaskClass) {
            setModifyData(prev => ({
                ...prev,
                project: selectedTaskClass
            }))

            setChatLists(prev => prev.map(chat => {
                if(chat.id == selectedTaskClass.id) {
                    setConvoLists([...chat.convoLists])
                }
                return { ...chat, isOpen: chat.id == selectedTaskClass.id }
            }))
        }
    }, [selectedTaskClass])

    

    return (
        <context.Provider value={contextValues}>
            <MainRoutes />
        </context.Provider>
    )
}

export default AppProvider