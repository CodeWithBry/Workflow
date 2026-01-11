import { useContext } from "react"
import HeroSection from "../components/HeroSection"
import Form from "./Form"
import s from "./styles.module.css"
import { context } from "../../../context/AppContext"
function Signup() {
    const {darkMode} = useContext(context) as Context; 

    return (
        <div className={!darkMode ? s.signup : `${s.signup} ${s.dark}`}>
            <HeroSection />
            <Form />
        </div>
    )
}

export default Signup