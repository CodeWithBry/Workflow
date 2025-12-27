import { useContext, useEffect } from "react";
import { context } from "../context/AppContext";
import { Route } from "react-router-dom";
import Tools from "../pages/Activities/ActivitiesTools";


function ToolsRoutes() {
  const { taskClass, toolsPages } = useContext(context) as Context;

  useEffect(() => { console.log("LOADED") }, [])

  return (
    <>
      {taskClass.map((_) => {
        return (
          <Route
            path={`/tools/:taskType`}
            element={<Tools />}
          >
            {/* MAP THE SUBPAGES(Tasks, Ai-Assistant, Analytics) */}
            {toolsPages.map((tab) => (
              <Route
                key={tab.tabPath}
                path={tab.tabPath}
                element={<tab.tabElement />}
              />
            ))}
          </Route>
        );
      })}
    </>
  )
}
export default ToolsRoutes