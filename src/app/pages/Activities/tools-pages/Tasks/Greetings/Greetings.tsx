import { useContext } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../context/AppContext'

export default function Greetings() {
    const { darkMode } = useContext(context) as Context

    return (
        <div
            className={!darkMode
                ? s.greetings
                : `${s.greetings} ${s.darkGreetings}`
            }>
            <div className={s.userIcon}>
                <span className={s.firstLetter}>P</span>
            </div>
            <div className={s.contents}>
                <p className={s.greet}>
                    Bryan A. Pajarillaga
                </p>
                <p className={s.description}>
                    Monitor your projects and tasks efficiently!.
                </p>
            </div>
        </div>
    )
}