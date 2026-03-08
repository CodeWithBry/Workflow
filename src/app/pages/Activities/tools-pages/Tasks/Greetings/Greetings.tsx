import { useContext } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../context/AppContext'

export default function Greetings() {
    const { darkMode, userInfo, authCredentials } = useContext(context) as Context

    return (
        <div
            className={!darkMode
                ? s.greetings
                : `${s.greetings} ${s.darkGreetings}`
            }>
            <div className={s.userIcon} style={{
                backgroundImage: `url(${userInfo?.photoData ?
                    userInfo.photoData.secure_url
                    : authCredentials?.photoURL
                        ? authCredentials.photoURL : "./blank_profile.png"})`
            }}></div>
            <div className={s.contents}>
                <p className={s.greet}>
                    {userInfo ? userInfo?.fullName : "Username"}
                </p>
                <p className={s.description}>
                    Monitor your projects and tasks efficiently!.
                </p>
            </div>
        </div>
    )
}