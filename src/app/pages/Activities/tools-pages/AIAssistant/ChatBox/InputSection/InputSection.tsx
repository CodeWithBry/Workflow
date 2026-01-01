import { useContext } from "react";
import { context } from "../../../../../../context/AppContext";
import s from "./styles.module.css"
import Button from "../../../../../../../components/ui/Button";

function InputSection({ userInput, setUserInput }: ChatBotValues) {
    const { darkMode } = useContext(context) as Context;
    const inputSectionClassName = !darkMode ? s.inputSection : `${s.inputSection} ${s.dark}`

    return (
        <div className={inputSectionClassName}>
            <label htmlFor="inputMessage">
                <input
                    type="text"
                    id="inputMessage"
                    placeholder="Type to text..."
                    value={userInput}
                    onChange={e => setUserInput(e.target.value)}
                />
                <Button
                    className={s.sendButton}
                    clickListener={() => { }}
                    iconElement={(<i className="fa fa-send"></i>)} />
            </label>
        </div>
    )
}

export default InputSection