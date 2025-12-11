
import SideBar from "../../components/sidebar/SideBar";
import RoutesComponent from "../routes/routes";

import { useState, type JSX } from "react";
import { context } from "./AppContext"
import s from "./styles.module.css"
import AISidebar from "../../components/aiSidebar/AISidebar";
import Tasks from "../../components/subPages/tasks/Tasks";
import Analytics from "../../components/subPages/analytics/Analytics";
import AIAssintant from "../../components/subPages/AIAssistant/AIAssistant";
import Projects from "../pages/projects/Projects";
import NormalTasks from "../pages/normal-tasks/NormalTasks";

export function AppProvider(): JSX.Element {

    // BOOLEANS
    const [darkMode, setDarkMode] = useState<boolean>(false);
    const [showSideBar, setShowSideBar] = useState<boolean>(true);
    const [showAIAssistant, setShowAIAssistant] = useState<boolean>(true);
    // STRINGS
    const [subPath, setSubPath] = useState<string>("");
    // NUMBERS

    // OBJECTS AND ARRAYS
    const [pages, setPages] = useState<SubPages[]>([
        { tabName: "Projects", tabPath: "/projects", tabIcon: "	fas fa-boxes", tabElement: Projects, tabFocused: true },
        { tabName: "Normal Tasks", tabPath: "/normal-tasks", tabIcon: "fas fa-chart-bar", tabElement: NormalTasks, tabFocused: false },
    ]);
    const [subPages, setSubPages] = useState<SubPages[]>([
        { tabName: "Tasks", tabPath: "tasks", tabIcon: "fas fa-tasks", tabElement: Tasks, tabFocused: true },
        { tabName: "Analytics", tabPath: "analytics", tabIcon: "fas fa-chart-bar", tabElement: Analytics, tabFocused: false },
        { tabName: "AI-Assistant", tabPath: "ai-assistant", tabIcon: "	fas fa-hand-sparkles", tabElement: AIAssintant, tabFocused: false },
    ]);
    const [subPagesForNormalTasks, setSubPagesForNormalTasks] = useState<SubPages[]>([
        { tabName: "Everyday Tasks", tabPath: "everyday-task", tabIcon: "fas far fa-list-alt", tabElement: Analytics, tabFocused: false },
        { tabName: "Daily Routine", tabPath: "daily-routine", tabIcon: "fas fa-calendar-alt", tabElement: Analytics, tabFocused: false }
    ]);
    const [projects, setProjects] = useState<Projects[]>([
        { projectName: "Task Manager", pid: crypto.randomUUID(), tabFocused: true },
        { projectName: "BINHI", pid: crypto.randomUUID(), tabFocused: false },
        { projectName: "News APP", pid: crypto.randomUUID(), tabFocused: false },
        { projectName: "React + TS", pid: crypto.randomUUID(), tabFocused: false },
        { projectName: "BryTech", pid: crypto.randomUUID(), tabFocused: false },
        { projectName: "Tasks", pid: crypto.randomUUID(), tabFocused: false },
    ]);
    const [selectedProject, setSelectedProject] = useState<Projects | null>(null);
    const [taskGroup, setTaskGroup] = useState<TaskGroup[] | null>(null);

    const value: AppContextType = {
        // BOOLEANS
        darkMode, setDarkMode,
        showSideBar, setShowSideBar,
        showAIAssistant, setShowAIAssistant,
        // STRINGS
        subPath, setSubPath,
        // NUMBERS
        // OBJECTS AND ARRAYS
        pages, setPages,
        subPages, setSubPages,
        subPagesForNormalTasks, setSubPagesForNormalTasks,
        projects, setProjects,
        selectedProject, setSelectedProject,
        taskGroup, setTaskGroup
    };

    return (
        <context.Provider value={value}>
            <div className={s.container}>
                <SideBar />
                <RoutesComponent />
                <AISidebar />
            </div>
        </context.Provider>
    )
}