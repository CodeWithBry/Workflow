import { useContext, useState, type ChangeEvent, type Dispatch, type FocusEvent, type SetStateAction } from "react";
import s from "./styles.module.css";
import Button from "../../../../../components/ui/Button";
import { context } from "../../../../context/AppContext";
import { changePasswordWithReauth } from "../../utils/changePassword";
import Loading from "../Uploading/Uploading";
// import { changePassword } from "../utils/changePassword";

function ChangePassword({ showChangePass, setShowChangePass }: { showChangePass: boolean, setShowChangePass: Dispatch<SetStateAction<boolean>> }) {
    const { darkMode } = useContext(context) as Context;
    const [currentPass, setCurrentPass] = useState<string>("");
    const [newPassword, setNewPassword] = useState<string>("");
    const [showCurrentPass, setShowCurrentPass] = useState<boolean>(false);
    const [showNewPass, setShowNewPass] = useState<boolean>(false);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    return (
        <div className={`${s.bgWrapper} ${!showChangePass && s.hide}`}>
            <Loading isLoading={isLoading} desc={"Loading..."}/>
            <div className={`${s.changePassword} ${darkMode && s.dark}`}>
                <h3 className={s.title}>
                    <i className="	fas fa-user-shield"></i>
                    <span>Change Password</span>
                    <Button
                        className={s.close}
                        clickListener={() => setShowChangePass(false)}
                        iconElement={<i className="fa fa-close"></i>} />
                </h3>

                <div className={s.newPassword}>
                    <span>Current Password</span>
                    <label htmlFor="currentPassword" className={s.inputWrapper}>
                        <Button
                            className={s.showCurrentPass}
                            clickListener={() => setShowCurrentPass(prev => !prev)}
                            iconElement={<i className={showCurrentPass ? "far fa-eye" : "far fa-eye-slash"}></i>} />
                        <input
                            type={showCurrentPass ? "text" : "password"}
                            value={currentPass}
                            placeholder="New Password"
                            id="currentPassword"
                            onFocus={(e: FocusEvent<HTMLInputElement>) => {
                                const parentElement = e.target.parentElement;
                                parentElement?.classList.add(`${s.focused}`);
                            }}
                            onBlur={(e: FocusEvent<HTMLInputElement>) => {
                                const parentElement = e.target.parentElement;
                                parentElement?.classList.remove(s.focused);
                            }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setCurrentPass(e.target.value)} />
                    </label>
                </div>

                <div className={s.newPassword}>
                    <span>New Password</span>
                    <label htmlFor="newPassword" className={s.inputWrapper}>
                        <Button
                            className={s.showPassword}
                            clickListener={() => setShowNewPass(prev => !prev)}
                            iconElement={<i className={showNewPass ? "far fa-eye" : "far fa-eye-slash"}></i>} />
                        <input
                            type={showNewPass ? "text" : "password"}
                            value={newPassword}
                            placeholder="New Password"
                            id="newPassword"
                            onFocus={(e: FocusEvent<HTMLInputElement>) => {
                                const parentElement = e.target.parentElement;
                                parentElement?.classList.add(`${s.focused}`);
                            }}
                            onBlur={(e: FocusEvent<HTMLInputElement>) => {
                                const parentElement = e.target.parentElement;
                                parentElement?.classList.remove(s.focused);
                            }}
                            onChange={(e: ChangeEvent<HTMLInputElement>) => setNewPassword(e.target.value)} />
                    </label>
                </div>

                <Button
                    className={s.submitButton}
                    clickListener={async () => {
                        await changePasswordWithReauth(currentPass, newPassword, setIsLoading);
                        setCurrentPass("");
                        setNewPassword("");
                        setTimeout(() => {
                            setShowChangePass(false);/*  */
                        }, 500); 
                    }}
                    content={"Submit"} />
            </div>
        </div>
    )
}

export default ChangePassword