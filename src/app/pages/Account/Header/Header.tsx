import { useContext } from "react";
import s from "./styles.module.css";
import { context } from "../../../context/AppContext";

function Header() {
    const { darkMode } = useContext(context) as Context;
    return (
        <div className={`${s.header} ${darkMode && s.dark}`}>
            <h1>Account Settings</h1>
            <p>Manage your personal information and security preferences.</p>
        </div>
    )
}

export default Header