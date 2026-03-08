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
import { auth, getDataFromFirestore, saveProjectFromFirestore } from "../../lib/firebase";
import Account from "../pages/Account/Account";
import ForgotPassword from "../pages/auth/ForgotPassword/ForgotPassword";
import ProjectOverview from "../pages/Activities/tools-pages/ProjectOverview/ProjectOverview";
import LandingPage from "../pages/LandingPage/LandingPage";

function AppProvider() {
    // NAVIGATION
    const navigation: NavigateFunction = useNavigate();
    const getUrl: string[] = useGetPath();

    // BOOLEANS
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [showToolBar, setShowToolBar] = useState<boolean>(false);
    const [allowChanges, setAllowChanges] = useState<boolean>(true);
    const [isDataLoaded, setIsDataLoaded] = useState<boolean>(false);
    const [showAssistant, setShowAssistant] = useState<boolean>(false);
    const [pauseEffect, setPauseEffect] = useState<boolean>(false);
    const [showVerifySignOut, setShowVerifySignOut] = useState<boolean>(false);

    // STRINGS
    const [subPath, setSubPath] = useState<string>("");

    // OBJECTS AND ARRAYS
    const [userInfo, setUserInfo] = useState<UserInfo | null>(null);
    const [authCredentials, setAuthCredentials] = useState<User | null>(null);

    const [pages, setPages] = useState<Pages[]>([
        { tabName: "Landing Page", tabPath: "/", tabElement: LandingPage, tabFocused: false },
        { tabName: "Activities", tabPath: "/activities", tabElement: ActivitiesLanding, tabFocused: false },
        { tabName: "Account", tabPath: "/account", tabElement: Account, tabFocused: false },
        { tabName: "Login", tabPath: "/login", tabElement: Login, tabFocused: false },
        { tabName: "Signup", tabPath: "/signup", tabElement: Signup, tabFocused: false },
        { tabName: "Forgot Password", tabPath: "/forgot-password", tabElement: ForgotPassword, tabFocused: false },
        { tabName: "PageNotFound", tabPath: "*", tabElement: PageNotFound, tabFocused: false },
    ]);
    const [toolsPages, setToolsPages] = useState<Pages[]>([
        { tabName: "Tasks", tabPath: "tasks", tabIcon: "fas fa-tasks", tabElement: Tasks, tabFocused: false },
        { tabName: "Analytics", tabPath: "analytics", tabIcon: "fas fa-chart-line", tabElement: Analytics, tabFocused: false },
        { tabName: "AI-Assistant", tabPath: "ai-assistant", tabIcon: "	fas fa-hand-sparkles", tabElement: AIAssintant, tabFocused: false },
        { tabName: "Overview", tabPath: "project-overview", tabIcon: "	fa-solid fa-circle-info", tabElement: ProjectOverview, tabFocused: false }
    ]);

    const [historyChanges, setHistoryChanges] = useState<HistoryChanges>({
        currentStateNumber: 0,
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
    const [analytics, setAnalytics] = useState<Analytics>({
        id: "",
        allTask: [],
        weeks: []
    });
    const [weekData, setWeekData] = useState<AnalyticsWeekData | null>(null);

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
        showVerifySignOut, setShowVerifySignOut,
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
        analytics, setAnalytics,
        weekData, setWeekData,

        modifyData, setModifyData,
        // selectedChat
    };

    if (!userInfo?.userId) {
        onAuthStateChanged(auth, async (user) => {
            if (user?.uid != null && user.uid != userInfo?.userId) {
                const getData = await getDataFromFirestore(user.uid);
                setUserInfo(getData.user);
                setChatLists(getData.chatLists);
                setTaskClass(getData.projectLists.map((project) => ({ ...project, isOpened: false })));
                setAuthCredentials(user);
                if (getData.analytics) setAnalytics({ ...getData.analytics });
                localStorage.setItem("user", JSON.stringify(user));
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

            setPauseEffect(true);
            setChatLists(prev => prev.map(chat => {
                if (chat.id == selectedTaskClass.id) {
                    setConvoLists([...chat.convoLists]);
                }
                return { ...chat, isOpen: chat.id == selectedTaskClass.id }
            }));

            setSelectedTaskClass(prev => {
                if (!prev) return null;
                if (prev.id.toLowerCase() == "daily-routine".toLowerCase() || prev.id.toLowerCase() == "everyday-task".toLowerCase()) {
                    const getDateNow = (new Date()).toLocaleDateString();
                    const getDateUpdated = new Date(Number(prev.dateUpdated)).toLocaleDateString();
                    if (getDateNow != getDateUpdated) {
                        const updatedTaskGroups = prev.taskGroups.map(taskGroup => {
                            const updatedTaskLists: Task[] = taskGroup.tasks.map(task => ({ ...task, status: "pending" }));
                            return { ...taskGroup, tasks: updatedTaskLists };
                        });
                        const updatedProject = { ...prev, taskGroups: updatedTaskGroups, dateUpdated: Date.now() };
                        if (userInfo?.userId) saveProjectFromFirestore(userInfo.userId, updatedProject, undefined, "update");

                        return updatedProject;
                    }

                }

                return prev
            })
        }
    }, [selectedTaskClass])

    useEffect(() => {
        const checkUserOnDevice = localStorage.getItem("user");
        if (!checkUserOnDevice) {
            if (getUrl[1] == "login" || getUrl[1] == "signup" || getUrl[1] == "forgot-password") return;
            navigation("/login");
        } else if ((getUrl[1] == "login" || getUrl[1] == "signup" || getUrl[1] == "forgot-password") && checkUserOnDevice) navigation("/");
    }, [getUrl[1]])

    return (
        <context.Provider value={contextValues}>
            <MainRoutes />
        </context.Provider>
    )
}

export default AppProvider