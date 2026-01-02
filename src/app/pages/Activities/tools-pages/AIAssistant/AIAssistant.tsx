import { useContext, useEffect, type JSX } from "react"
import s from "./styles.module.css"
import { context } from "../../../../context/AppContext";
import Button from "../../../../../components/ui/Button";
import ChatBox from "./ChatBox/ChatBox";

// IF the props "aside" is true, then it will show up as a sidebar in UI
// IF the user is in /ai-assistant tab then the AI-Assistant in the sidebar will gone.

function AIAssintant(): JSX.Element {
    const { showAssistant, setShowAssistant, darkMode, getUrl, setModifyData, selectedTaskClass } = useContext(context) as Context;
    const assistantClass = !darkMode ? `${s.aiAssistant} ${showAssistant ? s.aside : getUrl[3] == "tasks" && s.hide}` : `${s.aiAssistant} ${showAssistant ? s.aside : getUrl[3] == "tasks" && s.hide} ${s.dark}`

    useEffect(() => {
        if(getUrl[3] == "ai-assistant") {
            setModifyData(prev => ({ ...prev, project: selectedTaskClass, task: null }));
        }
    }, [getUrl[3]])

    return (
        <div className={assistantClass}>
            {getUrl[3] == "tasks" && <div className={s.top}>
                <h1 className={s.title}>
                    <span>AI Assistant</span>
                    <img src="./Ai-Assistant/sparkle-yellow.png" alt="yellow-spark" />
                    <Button
                        className={s.close}
                        iconElement={<i className="fas fa-close"></i>}
                        clickListener={() => { setShowAssistant(false) }} />
                </h1>
                <p>Knowledge, answers and ideas. One click away.</p>
            </div>}
            <ChatBox />
        </div >
    )
}

export default AIAssintant