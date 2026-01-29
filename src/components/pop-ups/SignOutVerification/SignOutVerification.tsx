import { useContext } from "react";
import s from "./styles.module.css";
import { context } from "../../../app/context/AppContext";
import Button from "../../ui/Button";
import { logOut } from "../../../lib/firebase";

function SignOutVerification() {
    const { darkMode, showVerifySignOut, setShowVerifySignOut, navigation, setAuthCredentials, setUserInfo } = useContext(context) as Context;
    return (
        <div className={`${s.verifySigningOut} ${!showVerifySignOut && s.hide} ${darkMode && s.dark}`}>
            <div className={s.form}>
                <Button
                    iconElement={<i className="fa fa-close"></i>}
                    className={s.cancel}
                    clickListener={() => setShowVerifySignOut(false)} />
                <h1>Are You Signing Out?</h1>
                <p>You are about to sign out of your account. This will end your current session, and you will need to sign in again to access your account.</p>
                <Button
                    className={`${s.actionButton} ${s.staySignedIn}`}
                    clickListener={() => setShowVerifySignOut(false)}
                    content={"Stay Signed In"} />
                <Button
                    className={`${s.actionButton} ${s.signOut}`}
                    clickListener={async () => {
                        const getMessage = await logOut();
                        if (getMessage) {
                            localStorage.removeItem("user");
                            navigation("/login");
                            setAuthCredentials(null);
                            setUserInfo(null);
                        }
                        setShowVerifySignOut(false);
                    }}
                    content={"Sign Out"} />
            </div>
        </div>
    )
}

export default SignOutVerification