import { useContext, type JSX } from "react"
import s from "./styles.module.css"
import { context } from "../../../../context/AppContext"
import Title from "./components/Title/Title"
import Graphs from "./components/Graphs/Graphs"
import Cards from "./components/Cards/Cards"
import Progress from "./components/Progress/Progress"
import DataInterpretation from "./components/DataInterpretation/DataInterpretation"

function Analytics(): JSX.Element {
    const { darkMode } = useContext(context) as Context;
    return (
        <div className={
            !darkMode
                ? s.analytics
                : `${s.analytics} ${s.dark}`
        }>
            <Title />
            <Progress />
            <Cards />
            <Graphs />
            <DataInterpretation />
        </div>
    )
}

export default Analytics