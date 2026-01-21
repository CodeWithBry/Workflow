import { useContext, useMemo, useRef, useState } from "react";
import { context } from "../../../../../../context/AppContext";
import s from "./styles.module.css"
import Button from "../../../../../../../components/ui/Button";
import { addUserMessage } from "../utils/addUserMessage";

function InputSection({ setIsNewChat, pseudoConvo, selectedConvo, setIsFailedToSend }: ChatBotValues) {

    const { darkMode, modifyData, setModifyData, chatLists, userInfo, setSelectedConvo, setConvoLists, setPauseEffect, setChatLists } = useContext(context) as Context;
    const inputSectionClassName = !darkMode ? s.inputSection : `${s.inputSection} ${s.dark}`
    const inputRef = useRef<HTMLDivElement>(null);
    const [isEmpty, setIsEmpty] = useState(true);
    const attachTask = useMemo<boolean>(() => {
        return modifyData.task ? true : false
    }, [modifyData]);
    // useEffect(() => console.log(userInput == " " || userInput == "" ? userInput.length : userInput.length), [userInput])

    return (
        <div className={inputSectionClassName}>
            <label htmlFor="inputMessage">
                <div className={s.attachment}></div>
                {attachTask && <div className={s.attachmentTask}>
                    <i className="far fa-file-alt"></i>
                    <div className={s.contents}>
                        <h4>Task:</h4>
                        <p>{modifyData.task?.description}</p>
                    </div>
                    <Button
                        className={s.close}
                        iconElement={<i className="fa fa-close"></i>}
                        clickListener={() => {
                            setModifyData(prev => ({ ...prev, task: null }))
                        }} />
                </div>}
                <div
                    ref={inputRef}
                    className={`${s.inputContainer} ${isEmpty ? s.placeholder : ""}`}
                    contentEditable
                    suppressContentEditableWarning
                    data-placeholder="type anything..."
                    onInput={(e: React.InputEvent<HTMLDivElement>) => {
                        const text = inputRef.current?.innerText ?? "";
                        setIsEmpty(!text.trim());
                        e.currentTarget.scrollTop = e.currentTarget.scrollHeight;
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
                            if (userInfo) addUserMessage({
                                element: e, inputRefText: text,
                                chatLists, setSelectedConvo,
                                pseudoConvo: selectedConvo ? undefined : pseudoConvo,
                                modifyData, setIsNewChat,
                                selectedConvo, userId: userInfo?.userId,
                                setConvoLists, setPauseEffect, setChatLists,
                                setIsFailedToSend
                            });

                            // Clear input
                            if (inputRef.current) {
                                inputRef.current.innerText = "";
                                setIsEmpty(true);
                            }

                            setModifyData(prev => ({...prev, task: null}))
                        }
                    }}
                />

                <Button
                    className={s.sendButton}
                    clickListener={() => {
                        if (userInfo && inputRef.current) addUserMessage({
                            inputRefText: inputRef.current?.innerText,
                            chatLists, setSelectedConvo,
                            pseudoConvo: selectedConvo ? undefined : pseudoConvo,
                            modifyData, setIsNewChat,
                            selectedConvo, userId: userInfo?.userId,
                            setConvoLists, setPauseEffect, setChatLists,
                            setIsFailedToSend
                        });
                        if (inputRef.current) inputRef.current.innerText = "";
                    }}
                    iconElement={(<i className="fa fa-send"></i>)} />
            </label>
        </div>
    )
}

export default InputSection