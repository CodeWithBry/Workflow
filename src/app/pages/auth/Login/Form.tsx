import { useContext, useState } from "react";
import s from "./styles.module.css"
import Button from "../../../../components/ui/Button";
import LinkTag from "../../../../components/ui/LinkTag";
import { context } from "../../../context/AppContext";
import { signInWithEmail, signInWithFacebook, signInWithGoogle } from "../../../../lib/firebase";
import type { User } from "firebase/auth";
function Form() {
    const { darkMode, navigation, setAuthCredentials } = useContext(context) as Context;
    const [showPass, setShowPass] = useState<boolean>(false);
    const [rememberMe, setRememberMe] = useState<boolean>(false);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    return (
        <div className={!darkMode ? s.form : `${s.form} ${s.darkForm}`}>
            <div className={s.greetings}>
                <h1>Welcome Back To Workflow!</h1>
                <span>Sign in you account</span>
            </div>

            <div className={s.inputs}>
                <label className={`${s.inputWrapper} ${s.email}`}>
                    <span>Email</span>
                    <input type="text" value={email} placeholder="email@example.com" onChange={e => setEmail(e.currentTarget.value)} />
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
                <div className={s.bottom}>
                    <input id="remember" type="checkbox" checked={rememberMe} onChange={e => setRememberMe(e.currentTarget.checked)} />
                    <label htmlFor="remember">Remember Me</label>
                    <LinkTag
                        to="/signup"
                        className={s.forgotPassword}
                        content={"Forgot Password"} />
                </div>
            </div>

            <Button
                className={s.submit}
                content={"Login"}
                clickListener={async () => {
                    if (rememberMe) {
                        localStorage.setItem('rememberedAccount', JSON.stringify({ email, password }));
                    }
                    const getResponse: User = await signInWithEmail(email, password);
                    if (getResponse) {
                        setAuthCredentials(getResponse);
                        navigation("/")
                    };
                    setEmail("");
                    setPassword("");

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
                            if(getResponse){
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
                            if(getResponse){
                                navigation("/");
                                setAuthCredentials(getResponse);
                            }
                        }} />
                </div>

                <span id={s.toRegister}>
                    Doesn't have any account?
                    <LinkTag
                        className={s.signup}
                        to="/signup"
                        content={"Create Account"} />
                </span>
            </div>
        </div>
    )
}

export default Form