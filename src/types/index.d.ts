import type { Dispatch, SetStateAction } from "react";
import type { NavigateFunction } from "react-router-dom";

// COMPONENTS
declare global {
    type Button = {
        clickListener: () => void,
        className: string | null,
        content?: string | ReactNode,
        iconElement?: ReactNode | null,
        titleContent?: string | null
    }

    type LinkType = {
        clickListener: () => void,
        className: string | null,
        content?: string | ReactNode,
        to: string,
        iconElement: ReactNode | null,
        titleContent?: string | null
    }

    type DropDownProps = {
        showTools: boolean,
        darkMode: boolean,
        setShowTools: Dispatch<SetStateAction<boolean>>,
        actionLists: ActionsLists[],
    }

    type QuickActionsProps = { showModal: boolean, setShowModal: Dispatch<SetStateAction<boolean>> }

    type ActionCardProps = {
        title: string,
        subtitle: string,
        icon: string,
        path?: string,
        setShowModal?: Dispatch<SetStateAction<boolean>>,
        showModal: boolean
    }

    type ProjectCardProps = {
        projectName: string,
        id: string,
        icon: string
    }

    // MODAL 
    type CPMProps = {
        showModal: boolean, setShowModal: Dispatch<SetStateAction<boolean>>
    }

    type CPMValues = {
        projectName: string, setProjectName: Dispatch<SetStateAction<string>>
    }
    type CPMFormProps = CPMProps & CPMValues
    type CPMBottomProps = CPMProps & CPMValues
}

// CUSTOM HOOKS 
declare global {
    type UseGetPath = string[];
    type UseCountTasks = string[];
    type UseLocaleStorage = {
        saveDataToLocalStorage: (args: SaveDataToLocalStorage) => void
        getDataFromLocalStorage: () => GetDataFromLocalStorage
    }

    type SaveDataToLocalStorage = {
        updatedTaskClass?: SelectedTaskClass,
        taskClass: TaskClass[]
        taskType: "projects" | "normal-tasks"
    }

    type GetDataFromLocalStorage = TaskClass[] | null
}

// VARIABLES 
declare global {
    // PAGES
    type Pages = {
        tabName: string,
        tabPath: string,
        tabIcon: string,
        tabElement: ComponentType
        tabFocused: boolean,
    };

    type ToolsPages = Pages;

    // USER
    type User = {
        userName: string,
        userPass: string,
        projects: Projects[],
        normalTasks: NormalTasks[]
    };

    // PROJECTS/NORMAL-TASKS
    type TaskClass = {
        name: string,
        taskType: "projects" | "normal-tasks"
        id: string,
        isOpened: boolean,
        icon: string,
        taskGroups: TaskGroup[],
        status?: "finished" | "pending"
    };

    type SelectedTaskClass = TaskClass | null;

    // TASK GROUP
    type TaskGroup = {
        groupName: string,
        groupId: string,
        tasks: Task[]
    };

    type SelectedGroup = TaskGroup | null;

    // TASKS
    type Task = {
        id: string,
        description: string,
        dateCreated: string,
        status: "pending" | "finished",
        isSelected: "true" | "false",
        groupId: string
    };

    type ChangesInProject = {
        name: string,
        taskType: "projects" | "normal-tasks"
        id: string,
        dateCreated?: Date,
        isOpened: boolean,
        icon: string,
        taskGroups: TaskGroup[],
        isSaved?: boolean,
        status?: "finished" | "pending"
    }

    type HistoryChanges = {
        currentStateNumber: number,
        changesInProject: ChangesInProject[]
    };
}

// CONTEXT VARIABLE
declare global {
    type Context = {
        // NAVIGATION
        navigation: NavigateFunction, locStor: UseLocaleStorage
        // BOOLEANS
        darkMode: boolean, setDarkMode: Dispatch<SetStateAction<boolean>>,
        showToolBar: boolean, setShowToolBar: Dispatch<SetStateAction<boolean>>,
        allowChanges: boolean, setAllowChanges: Dispatch<SetStateAction<boolean>>,
        // STRINGS
        subPath: string, setSubPath: Dispatch<SetStateAction<string>>,
        // NUMERICAL VALUES
        // OBJECTS AND ARRAYS
        pages: Pages[], setPages: Dispatch<SetStateAction<Pages[]>>,
        toolsPages: ToolsPages[], setToolsPages: Dispatch<SetStateAction<ToolsPages[]>>,
        historyChanges: HistoryChanges, setHistoryChanges: Dispatch<SetStateAction<HistoryChanges>>
        taskClass: TaskClass[], setTaskClass: Dispatch<SetStateAction<TaskClass[]>>,
        selectedTaskClass: SelectedTaskClass;
    }
}

export { };