import type { Dispatch, SetStateAction } from "react"

export type DefineTabType = {
    setTabs: Dispatch<SetStateAction<SubPages[]>>,
    tabName: string
}

export function defineTab({ setTabs, tabName }: DefineTabType) {
    setTabs(prev => prev.map((tab) => {
        if(tab.tabName == tabName) return {...tab, tabFocused: true}

        return {...tab, tabFocused: false}
    }))
}