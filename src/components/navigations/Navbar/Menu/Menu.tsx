import { useContext, useEffect, useState } from 'react';
import s from './styles.module.css';
import { context } from '../../../../app/context/AppContext';
import LinkTag from '../../../ui/LinkTag';
import Button from '../../../ui/Button';
import cancelChanges from '../../../../app/pages/Account/utils/cancelChanges';

function Menu() {
    const { authCredentials, userInfo, setShowVerifySignOut, navigation, getUrl, setDarkMode, setUserInfo } = useContext(context) as Context;
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const [showThemes, setShowThemes] = useState<boolean>(false);
    const actionLists: ActionsLists[] = [
        {
            action: "Light Mode", functionCall: () => setShowMenu(prev => !prev)
        },
        {
            action: "Manage Account", functionCall: () => {
                navigation("/account");
                setShowMenu(false);
            }, icon: "fa fa-gear", type: "account"
        },
        {
            action: "Log out", functionCall: () => {
                setShowVerifySignOut(true);
                setShowMenu(false);
            }, icon: "fa fa-sign-out-alt", type: "account"
        }
    ];

    const themePreferenceList: ActionsLists[] = [
        {
            action: "Light Mode", functionCall: () => {
                setDarkMode(false);
                setShowThemes(false);
            }, icon: "far fa-sun"
        },
        {
            action: "Dark Mode", functionCall: () => {
                setDarkMode(true);
                setShowThemes(false);
            }, icon: "far fa-moon"
        }
    ];

    const [selectedTheme, setSelectedTheme] = useState<"light" | "dark">("light");

    useEffect(() => {
        if (getUrl[1] == "account") {
            setShowMenu(false);
            setShowThemes(false);
        }
    }, [getUrl[1]])

    return (
        <div className={s.menu}>
            {
                !authCredentials && <>
                    <LinkTag
                        className={s.authButton}
                        to="/login"
                        content={"Login"} />
                    <LinkTag
                        className={`${s.authButton} ${s.singup}`}
                        to="/signup"
                        content={"Signup"} />
                </>
            }

            {getUrl[1] != "account"
                ? authCredentials && <>
                    <button className={s.accountWrapper} onClick={() => setShowMenu(prev => !prev)}>
                        <div className={s.userIcon} style={{
                            backgroundImage: `url(${userInfo?.photoData ?
                                userInfo.photoData.secure_url
                                : authCredentials?.photoURL
                                    ? authCredentials.photoURL : "./blank_profile.png"})`
                        }}></div>
                    </button>
                </>
                : <Button
                    className={s.back}
                    clickListener={async () => {
                        if (userInfo) await cancelChanges(userInfo.userId, setUserInfo);
                        navigation("/activities")
                    }}
                    content={"Back"} />
            }

            {<div className={`${s.dropDown} ${!showMenu && s.hide}`}>
                <div className={s.themePreference}>
                    <Button
                        className={s.actionButton}
                        clickListener={() => setShowThemes(prev => !prev)}
                        iconElement={<i className={selectedTheme == "light" ? "far fa-sun" : "far fa-moon"}></i>}
                        content={"Theme Preference"} />
                    <div className={showThemes ? s.dropDownThemes : `${s.dropDownThemes} ${s.hide}`}>
                        {themePreferenceList.map((action) => {
                            return <Button
                                iconElement={<i className={action.icon}></i>}
                                className={s.actionButton}
                                clickListener={() => {
                                    action.functionCall()
                                    setSelectedTheme(action.action == "Light Mode" ? "light" : "dark")
                                }}
                                content={action.action}
                            />
                        })}
                    </div>
                </div>
                {actionLists.map((action) => {
                    if (action.action != "Light Mode") return <Button
                        iconElement={<i className={action.icon}></i>}
                        className={s.actionButton}
                        clickListener={() => action.functionCall()}
                        content={action.action}
                    />
                })}
            </div>}
        </div>
    )
}

export default Menu