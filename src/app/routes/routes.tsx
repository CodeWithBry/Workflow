import { Routes, Route } from "react-router-dom";
import { useContext, type JSX } from "react";
import { context } from "../AppContext/AppContext";
export default function RoutesComponent(): JSX.Element {
    const { subPages, subPagesForNormalTasks, pages } = useContext(context) as AppContextType;

    return (
        <Routes>
            {pages.map((page) => {
                // PROJECTS ROUTES
                if (page.tabName === "Projects") {
                    return (
                        <Route
                            key="projects"
                            path="projects/:projectId"
                            element={<page.tabElement />}
                        >
                            {subPages.map((tab) => (
                                <Route
                                    key={tab.tabPath}
                                    path={tab.tabPath}
                                    element={<tab.tabElement />}
                                />
                            ))}
                        </Route>
                    );
                }

                // NORMAL TASKS ROUTES
                if (page.tabName === "Normal Tasks") {
                    return (
                        <Route
                            key="normal-tasks"
                            path="normal-tasks"
                            element={<page.tabElement />}
                        >
                            {subPagesForNormalTasks.map((normalTab) => (
                                <Route
                                    key={normalTab.tabPath}
                                    path={normalTab.tabPath}
                                    element={<normalTab.tabElement />}
                                >
                                    {subPages.map((subTab) => (
                                        <Route
                                            key={subTab.tabPath}
                                            path={subTab.tabPath}
                                            element={<subTab.tabElement />}
                                        />
                                    ))}
                                </Route>
                            ))}
                        </Route>
                    );
                }

            })}
        </Routes>
    );


}