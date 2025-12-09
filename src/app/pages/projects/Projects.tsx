import { useContext } from 'react'
import s from './styles.module.css'
import { context } from '../../AppContext/AppContext'

export default function Projects() {
    const { darkMode } = useContext(context) as AppContextType;

    return (
        <div className={ !darkMode
            ? s.projects
            : `${s.projects} ${s.darkProjects}`
         }>

        </div>
    )
}