import { createContext, useState, type JSX } from "react"
import type { Tabs } from "../../types/AppContextType.types";
import Tasks from "../pages/tasks/Tasks";
import RoutesComponent from "../routes/routes";
import SideBar from "../../components/sidebar/SideBar";
import s from "./styles.module.css"
import Analytics from "../pages/analytics/Analytics";
import AIAssintant from "../pages/AIAssistant/AIAssistant";

export const context = createContext<object>({});
function AppContext (): JSX.Element {
    // BOOLEANS
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [showSideBar, setShowSideBar] = useState<boolean>(true)
    // STRINGS

    // NUMBERS

    // OBJECTS AND ARRAYS


    const [tabs, setTabs] = useState<Tabs[]>([
        { tabName: "Tasks", tabPath: "/tasks", tabIcon: "fas fa-tasks", tabElement: Tasks, tabFocused: true },
        { tabName: "Analytics", tabPath: "/analytics", tabIcon: "fas fa-chart-bar", tabElement: AIAssintant, tabFocused: false },
        { tabName: "AI-Assistant", tabPath: "/ai-assistant", tabIcon: "	fas fa-hand-sparkles", tabElement: Analytics, tabFocused: false }
    ])
    
    const value = {
        // BOOLEANS
        darkMode, setDarkMode,
        showSideBar, setShowSideBar,
        // STRINGS
        // NUMBERS
        // OBJECTS AND ARRAYS
        tabs, setTabs
    };

    return (
        <context.Provider value={value}>
            <div className={s.container}>
                <SideBar />

                <RoutesComponent tabs={tabs} />
            </div>
        </context.Provider>
    )
}

export default AppContext;