import { useContext } from "react"
import { context } from "../context/AppContext"
import { Route, Routes } from "react-router-dom";
import ActivitiesTools from "../pages/Activities/ActivitiesTools";
// import Tools from "../pages/Tools/Tools";


function MainRoutes() {
    const { pages, toolsPages } = useContext(context) as Context;
    return (

        <div>
            <Routes>
                {pages.map((page) => {
                    return <Route element={(<page.tabElement />)} path={`${page.tabPath}`} />
                })}

                {/* TOOLS (LAYOUT ROUTE) */}
                <Route path="activities/:id" element={<ActivitiesTools />}>
                    {toolsPages.map((tab) => (
                        <Route
                            key={tab.tabPath}
                            path={tab.tabPath}
                            element={<tab.tabElement />}
                        />))}
                </Route>
            </Routes>
        </div>
    )
}

export default MainRoutes
