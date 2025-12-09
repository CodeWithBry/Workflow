import { useContext, useEffect, useState, type JSX } from "react"
import s from "./styles.module.css"
import { context } from "../../app/AppContext/AppContext"
import { getTabFromUrl } from "../../utils/getTabFromUrl";

function AISidebar(): JSX.Element | undefined {
    const { tabs, darkMode, showAIAssistant, setShowAIAssistant } = useContext(context) as AppContextType;
    const assistantClass = !darkMode ? s.aiSidebar : `${s.aiSidebar} ${s.darkAiSidebar}`;

    const [collapseAi] = useState<boolean>(false);


    useEffect(() => {
        if (tabs != null) {
            return () => {
                const selectedTab: string = getTabFromUrl();
                if (selectedTab == "ai-assistant") {
                    console.log("true")
                    setShowAIAssistant(false);
                } else {
                    console.log("false")
                    setShowAIAssistant(true);
                }
            }
        }
    }, [tabs])

    if (showAIAssistant) return (
        <div className={collapseAi ? `${assistantClass} ${s.collapseAiSidebar}` : assistantClass}>
            Ai Assistant Sidebar
        </div>
    )
}

export default AISidebar