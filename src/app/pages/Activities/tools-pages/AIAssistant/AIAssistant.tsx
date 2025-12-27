import { useContext, type JSX } from "react"
import s from "./styles.module.css"
import { context } from "../../../../context/AppContext";

// IF the props "aside" is true, then it will show up as a sidebar in UI
// IF the user is in /ai-assistant tab then the AI-Assistant in the sidebar will gone.

function AIAssintant(): JSX.Element {
    const { darkMode } = useContext(context) as Context;
    const assistantClass = !darkMode ? s.assistant : `${s.assistant} ${s.darkAssistant}`

    return (
        <div className={assistantClass}>
        </div >
    )
}

export default AIAssintant