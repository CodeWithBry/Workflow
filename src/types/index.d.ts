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
        clickListener?: () => void,
        className: string | null,
        content?: string | ReactNode,
        to: string,
        iconElement?: ReactNode | null,
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
        project: TaskClass
        dataToModify: DataToModify, setDataToModify: Dispatch<SetStateAction<DataToModify>>,
        editModal: boolean, setEditModal: Dispatch<SetStateAction<boolean>>,
    }

    // Create MODAL 
    type CPMProps = {
        showModal: boolean, setShowModal: Dispatch<SetStateAction<boolean>>
    }

    type CPMValues = {
        projectName: string, setProjectName: Dispatch<SetStateAction<string>>
    }
    type CPMFormProps = CPMProps & CPMValues
    type CPMBottomProps = CPMProps & CPMValues

    // Edit MODAL 
    type EPMProps = {
        editModal: boolean, setEditModal: Dispatch<SetStateAction<boolean>>
        dataToModify: DataToModify, setDataToModify: Dispatch<SetStateAction<DataToModify>>
    }

    type EPMValues = {
        changedValue: string, setChangedValue: Dispatch<SetStateAction<string>>
    }
    type EPMFormProps = EPMProps & EPMValues
    type EPMBottomProps = EPMProps & EPMValues
}

// CUSTOM HOOKS 
declare global {
    type UseGetPath = string[];
    type UseCountTasks = string[];
    type UseLocaleStorage = {
        saveDataToLocalStorage: (args: SaveDataToLocalStorage) => void
        getDataFromLocalStorage: (valueToGet: "taskClass" | "chat") => GetDataFromLocalStorage,
        saveChats: SaveChats
    }

    type SaveDataToLocalStorage = {
        updatedTaskClass?: SelectedTaskClass,
        taskClass?: TaskClass[]
        taskType: "projects" | "normal-tasks" | "",
        valueFor: "taskClass" | "chats",
        chats?: Chats
    }

    type GetDataFromLocalStorage = ValueToReturn | undefined

    type ValueToReturn = {
        taskClass: TaskClass[],
        chats: Chats,
        valueFor: "taskClass" | "chats"
    }
    type SaveChats = (chats) => void
}

// VARIABLES 
declare global {
    // GLOBAL REUSABLE VARIABLES
    type ActionsLists = {
        action: string,
        functionCall: () => void
        icon?: string,
    }

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

    // MODIFY DATA
    type ModifyData = {
        task: Task | null,
        project: TaskClass | null
    }

    type ProjectCard = TaskClass[]

    type DataToModify = TaskClass | null

    // CHATS

    type Chats = Chat[];

    type Chat = {
        isOpen: boolean,
        id: string,
        convos: Convo[]
    }

    type SelectedChat = Chat | undefined

    type Convo = {
        isOpened: boolean,
        convoId: string,
        messagesAi: MessagesAi[],
        messagesUi: MessagesUi[]
    }

    type SelectedConvo = Convo | undefined

    type MessagesAi = {
        role: "user" | "model",
        parts: TextForMessage[]
    }

    type TextForMessage = {
        text: string
    }

    type MessagesUi = {
        role: "user" | "model",
        message: string
    }
}

// CONTEXT VARIABLE
declare global {
    type Context = {
        // NAVIGATION
        navigation: NavigateFunction, locStor: UseLocaleStorage, getUrl: string[]
        // BOOLEANS
        darkMode: boolean, setDarkMode: Dispatch<SetStateAction<boolean>>,
        showToolBar: boolean, setShowToolBar: Dispatch<SetStateAction<boolean>>,
        allowChanges: boolean, setAllowChanges: Dispatch<SetStateAction<boolean>>,
        isDataLoaded: boolean, setIsDataLoaded: Dispatch<SetStateAction<boolean>>,
        showAssistant: boolean, setShowAssistant: Dispatch<SetStateAction<boolean>>,
        // STRINGS
        subPath: string, setSubPath: Dispatch<SetStateAction<string>>,
        // NUMERICAL VALUES
        // OBJECTS AND ARRAYS
        pages: Pages[], setPages: Dispatch<SetStateAction<Pages[]>>,
        toolsPages: ToolsPages[], setToolsPages: Dispatch<SetStateAction<ToolsPages[]>>,
        historyChanges: HistoryChanges, setHistoryChanges: Dispatch<SetStateAction<HistoryChanges>>
        taskClass: TaskClass[], setTaskClass: Dispatch<SetStateAction<TaskClass[]>>,
        chats: Chats, setChats: Dispatch<SetStateAction<Chats>>,
        modifyData: ModifyData, setModifyData: Dispatch<SetStateAction<ModifyData>>,
        selectedTaskClass: SelectedTaskClass, selectedChat: SelectedChat
    }
}

export { };