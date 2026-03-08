import { useContext } from "react"
import s from "./styles.module.css"
import { context } from "../../../app/context/AppContext"
import Menu from "./Menu/Menu";

function Navbar() {
  const { darkMode } = useContext(context) as Context;
  return (
    <div className={!darkMode ? s.navBar : `${s.navBar} ${s.dark}`}>
      <div className={s.left}>
        <img src="./web-icon.png" className={s.webIcon} />
        <h2>Workflow</h2>
      </div>
      <Menu />
    </div>
  )
}

export default Navbar