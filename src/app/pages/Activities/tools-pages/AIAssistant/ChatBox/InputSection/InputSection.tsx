import { useContext, useRef, useState } from "react";
import { context } from "../../../../../../context/AppContext";
import s from "./styles.module.css"
import Button from "../../../../../../../components/ui/Button";
import { addUserMessage } from "../utils/addUserMessage";

function InputSection({ userInput, setUserInput, chat, setChat, setIsNewChat, pseudoConvo, selectedConvo }: ChatBotValues) {

    const { darkMode, modifyData } = useContext(context) as Context;
    const inputSectionClassName = !darkMode ? s.inputSection : `${s.inputSection} ${s.dark}`
    const inputRef = useRef<HTMLDivElement>(null);
    const [isEmpty, setIsEmpty] = useState(true);


    // useEffect(() => console.log(userInput == " " || userInput == "" ? userInput.length : userInput.length), [userInput])

    return (
        <div className={inputSectionClassName}>
            <label htmlFor="inputMessage">
                <div
                    ref={inputRef}
                    className={`${s.inputContainer} ${isEmpty ? s.placeholder : ""}`}
                    contentEditable
                    suppressContentEditableWarning
                    data-placeholder="type anything..."
                    onInput={() => {
                        const text = inputRef.current?.innerText ?? "";
                        setIsEmpty(!text.trim());
                    }}
                    onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                        // SHIFT + ENTER → new line
                        if (e.key === "Enter" && e.shiftKey) {
                            e.preventDefault();
                            document.execCommand("insertLineBreak");
                            return;
                        }

                        // ENTER → send message
                        if (e.key === "Enter") {
                            e.preventDefault();

                            const text = inputRef.current?.innerText ?? "";
                            if (!text.trim()) return;

                            addUserMessage({
                                element: e,
                                userInput: text,
                                setUserInput,
                                chat,
                                setChat,
                                setIsNewChat,
                                pseudoConvo: selectedConvo ? undefined : pseudoConvo,
                                modifyData
                            });

                            // Clear input
                            if (inputRef.current) {
                                inputRef.current.innerText = "";
                                setIsEmpty(true);
                            }
                        }
                    }}
                />

                <Button
                    className={s.sendButton}
                    clickListener={() => addUserMessage({ send: true, userInput, setUserInput, chat, setChat, setIsNewChat, pseudoConvo: selectedConvo ? undefined : pseudoConvo, modifyData })}
                    iconElement={(<i className="fa fa-send"></i>)} />
            </label>
        </div>
    )
}

export default InputSection