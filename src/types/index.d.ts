import type { ComponentType, Dispatch, SetStateAction } from "react"

declare global {
    type AIAssistantProps = {
        aside?: boolean
    }

    type SubPages = {
        tabName: string,
        tabPath: string,
        tabIcon: string,
        tabElement: ComponentType
        tabFocused: boolean,
    }

    type Projects = {
        projectName: string,
        pid: string,
        tabFocused: boolean
    }

    type Tasks = {
        tid: string,
        taskDescription: string,
        dateCreated: string,
        status: "pending" | "finished",
        isSelected: boolean
    }

    type TaskGroup = {
        groupName: string,
        gid: string,
        tasks: Tasks[]
    }

    type AppContextType = {
        // BOOLEANS
        darkMode: boolean, setDarkMode: Dispatch<SetStateAction<boolean>>,
        showSideBar: boolean, setShowSideBar: Dispatch<SetStateAction<boolean>>,
        showAIAssistant: boolean, setShowAIAssistant: Dispatch<SetStateAction<boolean>>,
        // STRINGS
        subPath: string, setSubPath: Dispatch<SetStateAction<string>>,

        // OBJECTS AND ARRAYS
        pages: SubPages[], setPages: Dispatch<SetStateAction<SubPages[]>>,
        subPages: SubPages[], setSubPages: Dispatch<SetStateAction<SubPages[]>>,
        subPagesForNormalTasks: SubPages[], setSubPagesForNormalTasks: Dispatch<SetStateAction<SubPages[]>>,
        projects: Projects[], setProjects: Dispatch<SetStateAction<Projects[]>>,
        selectedProject: Projects | null, setSelectedProject: Dispatch<SetStateAction<Projects | null>>,
        taskGroup: TaskGroup[] | null, setTaskGroup: Dispatch<SetStateAction<TaskGroup[] | null>>,
    };
};

export { };