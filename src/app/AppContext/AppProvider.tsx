import Tasks from "../pages/tasks/Tasks";
import Analytics from "../pages/analytics/Analytics";
import AIAssintant from "../pages/AIAssistant/AIAssistant";
import SideBar from "../../components/sidebar/SideBar";
import RoutesComponent from "../routes/routes";

import { useState, type JSX } from "react";
import { context } from "./AppContext"
import s from "./styles.module.css"

export function AppProvider(): JSX.Element {

    // BOOLEANS
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [showSideBar, setShowSideBar] = useState<boolean>(true)
    // STRINGS

    // NUMBERS

    // OBJECTS AND ARRAYS
    const [tabs, setTabs] = useState<Tabs[]>([
        { tabName: "Tasks", tabPath: "/tasks", tabIcon: "fas fa-tasks", tabElement: Tasks, tabFocused: true },
        { tabName: "Projects", tabPath: "/projects", tabIcon: "	fas fa-boxes", tabElement: Tasks, tabFocused: false },
        { tabName: "Analytics", tabPath: "/analytics", tabIcon: "fas fa-chart-bar", tabElement: AIAssintant, tabFocused: false },
        { tabName: "AI-Assistant", tabPath: "/ai-assistant", tabIcon: "	fas fa-hand-sparkles", tabElement: Analytics, tabFocused: false },
        { tabName: "Everyday Tasks", tabPath: "/everyday-task", tabIcon: "fas far fa-list-alt", tabElement: Analytics, tabFocused: false },
        { tabName: "Daily Routine", tabPath: "/daily-routine", tabIcon: "fas fa-calendar-alt", tabElement: Analytics, tabFocused: false }
    ])
    const [projects, setProjects] = useState<Projects[]>([
        { projectName: "Task Manager", pid: crypto.randomUUID(), tabFocused: true },
        { projectName: "BINHI", pid: crypto.randomUUID(), tabFocused: true },
        { projectName: "News APP", pid: crypto.randomUUID(), tabFocused: true },
        { projectName: "React + TS", pid: crypto.randomUUID(), tabFocused: true },
        { projectName: "BryTech", pid: crypto.randomUUID(), tabFocused: true },
        { projectName: "Tasks", pid: crypto.randomUUID(), tabFocused: true },
    ])

    const value = {
        // BOOLEANS
        darkMode, setDarkMode,
        showSideBar, setShowSideBar,
        // STRINGS
        // NUMBERS
        // OBJECTS AND ARRAYS
        tabs, setTabs,
        projects, setProjects
    };


    return (
        <context.Provider value={value}>
            <div className={s.container}>
                <SideBar />
                <RoutesComponent tabs={tabs} />
                <AIAssintant />
            </div>
        </context.Provider>
    )
}