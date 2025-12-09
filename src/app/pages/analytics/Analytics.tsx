import { useContext, type JSX } from "react"
import s from "./styles.module.css"
import { context } from "../../AppContext/AppContext"

function Analytics(): JSX.Element {
    const { darkMode } = useContext(context) as AppContextType

    return (
        <div className={
            !darkMode
                ? s.analytics
                : `${s.analytics} ${s.darkAnalytics}`
        }>
            Analytics
        </div>
    )
}

export default Analytics