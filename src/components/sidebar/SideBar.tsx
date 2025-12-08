import { useContext } from "react"
import { context } from "../../app/AppContext/AppContext"
import type { AppContextType } from "../../types/AppContextType.types"
import s from "./styles.module.css"
import Button from "../ui/Button/Button";
import { defineTab } from "../../utils/defineTab";

export default function SideBar() {
    const { tabs, setTabs, showSideBar, setShowSideBar, darkMode } = useContext(context) as AppContextType;

    return (
        <div
            className={
                darkMode
                    ? `${showSideBar ? s.sideBar : s.collapseSideBar}`
                    : `${showSideBar ? s.sideBar : s.collapseSideBar} ${s.darkSideBar}`}>
            <div className={s.title}>
                <div className={s.left}>
                    <img src="./web-icon.png" className={s.webIcon} />
                    <h2>Workflow</h2>
                </div>
                <Button
                    iconElement={(<i className="fas fa-sign-out-alt"></i>)}
                    className={s.collapse}
                    clickListener={() => { setShowSideBar(false) }}
                />
            </div>

            {/* Main Menu */}
            <div className={s.sectionTabs}>
                <p className={s.section}>Main Menu</p>
                <div className={s.menu}>
                    {tabs.map(tab => 
                        <Button
                            className={!tab.tabFocused ? s.tab : `${s.tab} ${s.focused}`}
                            iconElement={(<i className={tab.tabIcon}></i>)}
                            clickListener={() => {
                                defineTab({setTabs, tabName: tab.tabName})
                            }}
                            content={tab.tabName} />
                    )}
                </div>
            </div>

            {/* Normal Tasks */}
            <div className={s.sectionTabs}>
                <p className={s.section}>Normal Tasks</p>
                <div className={s.menu}>
                    <Button
                        className={s.tab}
                        iconElement={(<i className="far fa-list-alt"></i>)}
                        clickListener={() => {

                        }}
                        content={"Everyday Tasks"} />
                    <Button
                        className={s.tab}
                        iconElement={(<i className="far fa-list-alt"></i>)}
                        clickListener={() => {

                        }}
                        content={"Daily Routine"} />
                </div>
            </div>

            {/* Project Lists */}
            <div className={s.sectionTabs}>
                <p className={s.section}>Project Lists</p>
                <div className={s.menu}>
                    <Button
                        className={s.tab}
                        iconElement={(<i className="far fa-list-alt"></i>)}
                        clickListener={() => {

                        }}
                        content={"Task Manager"} />
                    <Button
                        className={s.tab}
                        iconElement={(<i className="far fa-list-alt"></i>)}
                        clickListener={() => {

                        }}
                        content={"News App"} />
                    <Button
                        className={s.tab}
                        iconElement={(<i className="far fa-list-alt"></i>)}
                        clickListener={() => {

                        }}
                        content={"BINHI"} />
                </div>
            </div>

            <div className={s.bottom}>
                <div className={s.colorTheme}>
                    <Button
                        className={s.themeButton}
                        iconElement={(<i className="far fa-sun"></i>)}
                        content="Light Mode" />
                    <Button
                        className={s.themeButton}
                        iconElement={(<i className="fas fa-moon"></i>)}
                        content="Dark Mode" />
                </div>
                <div className={s.userBox}>
                    <div className={s.userIcon}>

                    </div>
                    <div className={s.contents}>
                        <p className={s.userName}></p>
                        <Button 
                            className={s.logOut}
                            clickListener={() => {}}
                            content="Log Out" />
                    </div>
                </div>
            </div>
        </div>
    )
}