import { useContext, type JSX } from "react"
import s from "./styles.module.css"
import { context } from "../../AppContext/AppContext"
import type { AppContextType } from "../../../types/AppContextType.types"

function AIAssintant(): JSX.Element {
    const { darkMode } = useContext(context) as AppContextType

    return (
        <div className={
            !darkMode
                ? s.assistant
                : `${s.assistant} ${s.darkAssistant}`
        }>
            AIAssintant
        </div>
    )
}

export default AIAssintant