import { useContext, useState } from "react"
import s from "./styles.module.css"
import { context } from "../../../app/context/AppContext"
import Button from "../../ui/Button";
import LinkTag from "../../ui/LinkTag";
import { logOut } from "../../../lib/firebase";

function Navbar() {
  const { darkMode, setDarkMode, authCredentials, navigation, setAuthCredentials, setUserInfo } = useContext(context) as Context;
  const [dropDown, setDropDown] = useState<boolean>(false);
  return (
    <div className={!darkMode ? s.navBar : `${s.navBar} ${s.dark}`}>
      <div className={s.left}>
        <img src="./web-icon.png" className={s.webIcon} />
        <h2>Workflow</h2>
      </div>
      <div className={!dropDown ? s.right : `${s.right} ${s.dropDown}`}>
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
        {
          !authCredentials ? <>
            <LinkTag
              className={s.authButton}
              to="/login"
              content={"Login"} />
            <LinkTag
              className={s.authButton}
              to="/signup"
              content={"Signup"} />
          </> :
            <Button
              className={s.authButton}
              clickListener={async () => {
                const getMessage = await logOut();
                if(getMessage) {
                  navigation("/login");
                  setAuthCredentials(null);
                  setUserInfo(null);
                }
              }}
              content={"Log Out"} />
        }
        {/* <div className={s.userIcon}>
          <span className={s.firstLetter}>P</span>
        </div> */}

      </div>
      <Button
        className={s.hamburger}
        clickListener={() => setDropDown(prev => !prev)}
        iconElement={(<i className="fas fa-bars"></i>)} />
    </div>
  )
}

export default Navbar