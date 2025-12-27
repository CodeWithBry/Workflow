import { useContext } from "react";
import { context } from "../../../app/context/AppContext";
import s from "./styles.module.css";
import Button from "../../ui/Button";
import LinkTag from "../../ui/LinkTag";


function ToolsSidebar() {
    const { darkMode, setDarkMode,
        showToolBar, setShowToolBar,
        toolsPages, selectedTaskClass,
        taskClass } = useContext(context) as Context;
    const sideBarStyles = !darkMode
        ? `${s.sideBar} ${!showToolBar && s.collapseSideBar}`
        : `${s.sideBar} ${s.darkSideBar} ${!showToolBar && s.collapseSideBar}`;

    return (
        <div className={sideBarStyles}>
            <div className={s.title}>
                <div className={s.left}>
                    <img src="./web-icon.png" className={s.webIcon} />
                    <h2>Workflow</h2>
                </div>
                <Button
                    iconElement={(<i className="fas fa-sign-out-alt"></i>)}
                    className={s.collapse}
                    clickListener={() => { setShowToolBar((prev: boolean) => !prev) }}
                />
            </div>

            <div className={s.sections}>
                {/* Main Menu */}
                <div className={s.sectionTabs}>
                    <p className={s.section}>Main Menu</p>
                    <div className={s.menu}>
                        {toolsPages.map((tab) => {
                            return <LinkTag
                                className={!tab.tabFocused ? s.tab : `${s.tab} ${s.focused}`}
                                iconElement={(<i className={tab.tabIcon}></i>)}
                                to={`/activities/${selectedTaskClass?.id}/${tab.tabPath} `}
                                clickListener={() => { }}
                                key={tab.tabName}
                                titleContent={tab.tabName}
                                content={(<span>{tab.tabName}</span>)} />
                        })}
                    </div>
                </div>

                {/* Project Lists or Normal Tasks */}
                <div className={`${s.sectionTabs}`}>
                    <p className={s.section}>{
                        selectedTaskClass?.taskType == "projects"
                        ? "Project Lists" : "Normal Tasks"
                    }</p>
                    <div className={s.menu}>
                        {taskClass.map((t) => {
                            return <LinkTag
                                className={!t.isOpened ? s.tab : `${s.tab} ${s.focused}`}
                                iconElement={(<i className={t.icon}></i>)}
                                clickListener={() => { }}
                                to={`/activities/${t.id}/tasks`}
                                titleContent={t.name}
                                content={(<span>{t.name}</span>)} />
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

export default ToolsSidebar