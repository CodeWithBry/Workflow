import type { Dispatch, SetStateAction } from "react"
import type { Tabs } from "../types/AppContextType.types"

export type DefineTagType = {
    setTabs: Dispatch<SetStateAction<Tabs[]>>,
    tabName: string
}

export function defineTab({ setTabs, tabName }: DefineTagType) {
    setTabs(prev => prev.map((tab) => {
        if(tab.tabName == tabName) return {...tab, tabFocused: true}

        return {...tab, tabFocused: false}
    }))
}