import { Routes, Route } from "react-router-dom";
import type { JSX } from "react";
import type { Tabs } from "../../types/AppContextType.types"

export type Props = {
    tabs: Tabs[]
}

export default function RoutesComponent({ tabs }: Props): JSX.Element {
    return (
        <Routes>
            {tabs.map(tab =>
                <Route path={tab.tabPath} element={<tab.tabElement />} />
            )}
        </Routes>
    )
}