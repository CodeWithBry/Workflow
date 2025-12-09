import { useContext } from "react"
import { context } from "../../app/AppContext/AppContext";
import type { AppContextType } from "../../types/AppContextType.types"
import s from "./styles.module.css"
import Button from "../ui/Button/Button";
import { defineTab } from "../../utils/defineTab";
import LinkTag from "../ui/LinkTag/LinkTag";

export default function SideBar() {
    const { tabs, setTabs, projects, showSideBar, setShowSideBar, darkMode, setDarkMode } = useContext(context) as AppContextType;

    return (
        <div
            className={
                !darkMode
                    ? `${s.sideBar} ${!showSideBar && s.collapseSideBar}`
                    : `${s.sideBar} ${s.darkSideBar} ${!showSideBar && s.collapseSideBar}`}>
            <div className={s.title}>
                <div className={s.left}>
                    <img src="./web-icon.png" className={s.webIcon} />
                    <h2>Workflow</h2>
                </div>
                <Button
                    iconElement={(<i className="fas fa-sign-out-alt"></i>)}
                    className={s.collapse}
                    clickListener={() => { setShowSideBar(prev => !prev) }}
                />
            </div>

            <div className={s.sections}>
                {/* Main Menu */}
                <div className={s.sectionTabs}>
                    <p className={s.section}>Main Menu</p>
                    <div className={s.menu}>
                        {tabs.map((tab, index) => {
                            if (index < 4 && index >= 0) return <LinkTag
                                className={!tab.tabFocused ? s.tab : `${s.tab} ${s.focused}`}
                                iconElement={(<i className={tab.tabIcon}></i>)}
                                to={tab.tabPath}
                                clickListener={() => {
                                    defineTab({ setTabs, tabName: tab.tabName })
                                }}
                                key={tab.tabName}
                                titleContent={tab.tabName}
                                content={(<span>{tab.tabName}</span>)} />
                        })}
                    </div>
                </div>

                {/* Normal Tasks */}
                <div className={s.sectionTabs}>
                    <p className={s.section}>Normal Tasks</p>
                    <div className={s.menu}>
                        {tabs.map((tab, index) => {
                            if (index < 6 && index >= 4) return <LinkTag
                                className={!tab.tabFocused ? s.tab : `${s.tab} ${s.focused}`}
                                iconElement={(<i className={tab.tabIcon}></i>)}
                                to={tab.tabPath}
                                clickListener={() => {
                                    defineTab({ setTabs, tabName: tab.tabName })
                                }}
                                key={tab.tabName}
                                titleContent={tab.tabName}
                                content={(<span>{tab.tabName}</span>)} />
                        })}
                    </div>
                </div>

                {/* Project Lists */}
                <div className={s.sectionTabs}>
                    <p className={s.section}>Project Lists</p>
                    <div className={s.menu}>
                        {projects.map((proj) => {
                            return <LinkTag
                                className={s.tab}
                                iconElement={(<i className="far fa-check-circle"></i>)}
                                to={`projects/${proj.pid}`}
                                titleContent={proj.projectName}
                                content={(<span>{proj.projectName}</span>)} />
                        })}

                    </div>
                </div>
            </div>

            <div className={s.bottom}>
                <div className={s.colorTheme}>
                    <Button
                        className={`${s.themeButton} ${!darkMode && s.focused}`}
                        iconElement={(<i className="far fa-sun"></i>)}
                        content={<span>Light Mode</span>}
                        clickListener={() => setDarkMode(false)} />
                    <Button
                        className={`${s.themeButton} ${darkMode && s.focused}`}
                        iconElement={(<i className="fas fa-moon"></i>)}
                        content={<span>Dark Mode</span>}
                        clickListener={() => setDarkMode(true)} />
                </div>
                <div className={s.userBox}>
                    <div className={s.userIcon}>
                        <span className={s.firstLetter}>P</span>
                    </div>
                    <div className={s.contents}>
                        <p className={s.userName}>
                            Bryan A. Pajarillaga
                        </p>
                        <Button
                            className={s.logOut}
                            clickListener={() => { }}
                            content="Log Out" />
                    </div>
                </div>
            </div>
        </div>
    )
}