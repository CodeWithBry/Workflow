import { useContext, type JSX } from "react"
import s from "./styles.module.css"
import { context } from "../../../../context/AppContext"

function Analytics(): JSX.Element {
    const { darkMode } = useContext(context) as Context

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