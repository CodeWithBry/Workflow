import { useContext, useState } from 'react';
import s from './styles.module.css';
import { context } from '../../../../app/context/AppContext';
import LinkTag from '../../../ui/LinkTag';
import Button from '../../../ui/Button';

function Menu() {
    const { authCredentials, userInfo, setShowVerifySignOut } = useContext(context) as Context;
    const [showMenu, setShowMenu] = useState<boolean>(false);
    const actionLists: ActionsLists[] = [
        {
            action: "Light Mode", functionCall: () => setShowMenu(prev => !prev)
        },
        {
            action: "Manage Account", functionCall: () => {
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

            {
                authCredentials && <>
                    <button className={s.accountWrapper} onClick={() => setShowMenu(prev => !prev)}>
                        {authCredentials.photoURL
                            ? <img src={authCredentials.photoURL} />
                            : <div className={s.userIcon}>
                                <span className={s.firstLetter}>{userInfo?.fullName[0]}</span>
                            </div>
                        }
                        <p className={s.fullName}>{userInfo?.fullName}</p>
                        <i className="fas fa-angle-down"></i>
                    </button>
                </>
            }

            <div className={`${s.dropDown} ${!showMenu && s.hide}`}>
                {actionLists.map((action) => {
                    if (action.action != "Light Mode") return <Button
                        iconElement={<i className={action.icon}></i>}
                        className={s.actionButton}
                        clickListener={() => action.functionCall()}
                        content={action.action}
                    />
                })}
            </div>
        </div>
    )
}

export default Menu