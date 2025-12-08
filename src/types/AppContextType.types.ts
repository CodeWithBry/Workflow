import type { ComponentType, Dispatch, SetStateAction } from "react"

export type Tabs = {
    tabName: string,
    tabPath: string,
    tabIcon: string,
    tabElement: ComponentType
    tabFocused: boolean,
}

export type AppContextType = {
    // BOOLEANS
    darkMode: boolean, setDarkMode: Dispatch<SetStateAction<boolean>>,
    showSideBar: boolean, setShowSideBar: Dispatch<SetStateAction<boolean>>,

    // OBJECTS AND ARRAYS
    tabs: Tabs[], setTabs: Dispatch<SetStateAction<Tabs[]>>,
}