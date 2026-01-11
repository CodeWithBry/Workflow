import { useContext, useState } from "react";
import s from "./styles.module.css"
import Button from "../../../../components/ui/Button";
import LinkTag from "../../../../components/ui/LinkTag";
import { context } from "../../../context/AppContext";
import { createUserWithEmail, signInWithFacebook, signInWithGoogle } from "../../../../lib/firebase";
import type { User } from "firebase/auth";
function Form() {
    const { darkMode, navigation, setAuthCredentials } = useContext(context) as Context;

    const [showPass, setShowPass] = useState<boolean>(false);
    const [showConfirmPass, setShowConfirmPass] = useState<boolean>(false);
    const [fullName, setFullName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [confirmPass, setConfirmPass] = useState<string>("");

    return (
        <div className={!darkMode ? s.form : `${s.form} ${s.darkForm}`}>
            <div className={s.greetings}>
                <h1>Sign Up To Workflow!</h1>
                <span>Sign in you account</span>
            </div>

            <div className={s.inputs}>
                <label className={`${s.inputWrapper} ${s.fullName}`}>
                    <span>Full Name</span>
                    <input type="text" value={fullName} placeholder="e.g. Bryan A. Pajarillaga" onChange={e => setFullName(e.currentTarget.value)} />
                </label>
                <label className={`${s.inputWrapper} ${s.email}`}>
                    <span>Email</span>
                    <input type="text" value={email} placeholder="e.g. email@example.com" onChange={e => setEmail(e.currentTarget.value)} />
                </label>
                <label className={`${s.inputWrapper} ${s.password}`}>
                    <span>Password</span>
                    <div className={s.wrapper}>
                        <input type={showPass ? "input" : "password"} placeholder="xxxxxxxxx" value={password} onChange={e => setPassword(e.currentTarget.value)} />
                        <Button
                            className={s.showPassBtn}
                            iconElement={<i className={showPass ? "fas fa-eye" : "fas fa-eye-slash"}></i>}
                            clickListener={() => setShowPass(prev => !prev)} />
                    </div>
                </label>
                <label className={`${s.inputWrapper} ${s.password}`}>
                    <span>Confirm Password</span>
                    <div className={s.wrapper}>
                        <input type={showConfirmPass ? "input" : "password"} placeholder="xxxxxxxxx" value={confirmPass} onChange={e => setConfirmPass(e.currentTarget.value)} />
                        <Button
                            className={s.showPassBtn}
                            iconElement={<i className={showConfirmPass ? "fas fa-eye" : "fas fa-eye-slash"}></i>}
                            clickListener={() => setShowConfirmPass(prev => !prev)} />
                    </div>
                </label>
            </div>

            <Button
                className={s.submit}
                content={"Submit"}
                clickListener={async () => {
                    const getResponse: string = await createUserWithEmail(email, password, fullName);
                    if (getResponse.includes("added")) {
                        navigation("/");
                        setEmail("");
                        setPassword("");
                        setFullName("");
                        setConfirmPass("");
                    }
                }} />

            <div className={s.bottom}>
                <span id={s.instantText}></span>
                <div className={s.options}>
                    <Button
                        iconElement={<i className="fab fa-google"></i>}
                        content={"Continue with Google"}
                        className={`${s.signInMethod} ${s.google}`}
                        clickListener={async () => {
                            const getResponse: User = await signInWithGoogle();
                            if (getResponse) {
                                navigation("/");
                                setAuthCredentials(getResponse);
                            }
                        }} />
                    <Button
                        iconElement={<i className="	fab fa-facebook"></i>}
                        content={"Continue with Facebook"}
                        className={`${s.signInMethod} ${s.facebook}`}
                        clickListener={async () => {
                            const getResponse: User = await signInWithFacebook();
                            if (getResponse) {
                                navigation("/");
                                setAuthCredentials(getResponse);
                            }
                        }} />
                </div>

                <span id={s.toRegister}>
                    Already have any account?
                    <LinkTag
                        className={s.login}
                        to="/login"
                        content={"Log in"} />
                </span>
            </div>
        </div>
    )
}

export default Form