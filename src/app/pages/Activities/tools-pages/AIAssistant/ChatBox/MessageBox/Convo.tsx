import { useContext } from "react"
import s from "./styles.module.css"
import { context } from "../../../../../../context/AppContext"
function Convo() {
    const { darkMode } = useContext(context) as Context;
    const convoClassName = !darkMode ? s.convo : `${s.convo} ${s.dark}`

    return (
        <div className={convoClassName}></div>
    )
}

export default Convo