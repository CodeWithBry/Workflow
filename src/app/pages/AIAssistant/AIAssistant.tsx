import { useContext, type JSX } from "react"
import s from "./styles.module.css"
import type { AppContextType } from "../../../types/AppContextType.types"
import { context } from "../../AppContext/AppContext"

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