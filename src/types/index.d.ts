declare global {
    import type { ComponentType, Dispatch, SetStateAction } from "react"

    type Tabs = {
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

    type AppContextType = {
        // BOOLEANS
        darkMode: boolean, setDarkMode: Dispatch<SetStateAction<boolean>>,
        showSideBar: boolean, setShowSideBar: Dispatch<SetStateAction<boolean>>,

        // OBJECTS AND ARRAYS
        tabs: Tabs[], setTabs: Dispatch<SetStateAction<Tabs[]>>,
        projects: Projects[], setProjects: Dispatch<SetStateAction<Projects[]>>,
    };
};

export { };