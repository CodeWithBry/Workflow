import { useContext } from "react"
import { context } from "../context/AppContext"
import { Route, Routes } from "react-router-dom";
import ActivitiesTools from "../pages/Activities/ActivitiesTools";
import PageNotFound from "../pages/PageNotFound/PageNotFound";
import Navbar from "../../components/navigations/Navbar/Navbar";
import SignOutVerification from "../../components/pop-ups/SignOutVerification/SignOutVerification";
// import Tools from "../pages/Tools/Tools";


function MainRoutes() {
    const { pages, toolsPages, taskClass, isDataLoaded } = useContext(context) as Context;
    return (
        <div>
            <Navbar />
            <SignOutVerification />
            <Routes>
                {pages.map((page) => {
                    return <Route element={(<page.tabElement />)} path={`${page.tabPath}`} />
                })}

                {/* TOOLS (LAYOUT ROUTE) */}
                {taskClass.length != 0 || !isDataLoaded
                    ? <Route path="activities/:id" element={<ActivitiesTools />}>
                        {toolsPages.map((tab) => {
                            return <>
                                <Route
                                    key={tab.tabPath}
                                    path={tab.tabPath}
                                    element={<tab.tabElement />}
                                />
                                {tab.tabPath == "ai-assistant" && <Route
                                    key={tab.tabPath}
                                    path={`${tab.tabPath}/:convoId`}
                                    element={<tab.tabElement />}
                                />}
                            </>
                        })}
                    </Route>
                    : <Route path="/activities/:id/*" element={<PageNotFound />} />
                }
            </Routes>
        </div>
    )
}

export default MainRoutes
