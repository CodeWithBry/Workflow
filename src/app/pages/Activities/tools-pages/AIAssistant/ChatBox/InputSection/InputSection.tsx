import { useContext, useMemo, useRef, useState } from "react";
import { context } from "../../../../../../context/AppContext";
import s from "./styles.module.css";
import { addUserMessage } from "../utils/addUserMessage";

function InputSection({ setIsNewChat, pseudoConvo, selectedConvo, setIsFailedToSend, setIsThinking }: ChatBotValues) {

    const {
        darkMode, modifyData, setModifyData,
        chatLists, userInfo, setSelectedConvo,
        setConvoLists, setPauseEffect, setChatLists
    } = useContext(context) as Context;

    const inputRef = useRef<HTMLDivElement>(null);
    const [isEmpty, setIsEmpty] = useState(true);

    const attachTask = useMemo<boolean>(
        () => Boolean(modifyData.task),
        [modifyData]
    );

    const handleSend = () => {
        const text = inputRef.current?.innerText ?? "";
        if (!text.trim() || !userInfo) return;

        setIsThinking(true);
        setModifyData(prev => ({ ...prev, task: null }));

        addUserMessage({
            inputRefText: text,
            chatLists, setSelectedConvo,
            pseudoConvo: selectedConvo ? undefined : pseudoConvo,
            modifyData, setIsNewChat,
            selectedConvo, userId: userInfo.userId,
            setConvoLists, setPauseEffect, setChatLists,
            setIsFailedToSend, send: true, setIsThinking
        });

        if (inputRef.current) {
            inputRef.current.innerText = "";
            setIsEmpty(true);
        }
    };

    return (
        <div className={`${s.inputSection} ${darkMode ? s.dark : s.light}`}>

            {/* ── Task attachment chip ── */}
            {attachTask && (
                <div className={s.attachmentChip}>
                    <span className={s.attachmentIcon}>
                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.5">
                            <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                            <polyline points="14 2 14 8 20 8" />
                        </svg>
                    </span>
                    <span className={s.attachmentLabel}>Task</span>
                    <span className={s.attachmentText}>
                        {modifyData.task?.description}
                    </span>
                    <button
                        className={s.attachmentClose}
                        onClick={() => setModifyData(prev => ({ ...prev, task: null }))}
                        title="Remove task"
                        type="button"
                    >
                        <svg width="11" height="11" viewBox="0 0 24 24" fill="none"
                            stroke="currentColor" strokeWidth="2.8">
                            <path d="M18 6L6 18M6 6l12 12" />
                        </svg>
                    </button>
                </div>
            )}

            {/* ── Input bar ── */}
            <div className={`${s.inputBar} ${attachTask ? s.inputBarAttached : ""}`}>

                {/* Editable text area */}
                <div
                    ref={inputRef}
                    className={`${s.inputField} ${isEmpty ? s.empty : ""}`}
                    contentEditable
                    suppressContentEditableWarning
                    role="textbox"
                    aria-label="Message input"
                    aria-multiline="true"
                    data-placeholder="Message GemChat AI…"
                    onInput={() => {
                        const text = inputRef.current?.innerText ?? "";
                        setIsEmpty(!text.trim());
                        if (inputRef.current)
                            inputRef.current.scrollTop = inputRef.current.scrollHeight;
                    }}
                    onKeyDown={(e: React.KeyboardEvent<HTMLDivElement>) => {
                        // Shift+Enter → newline
                        if (e.key === "Enter" && e.shiftKey) {
                            e.preventDefault();
                            document.execCommand("insertLineBreak");
                            return;
                        }
                        // Enter → send
                        if (e.key === "Enter") {
                            e.preventDefault();
                            handleSend();
                        }
                    }}
                />

                {/* Send button */}
                <button
                    className={`${s.sendBtn} ${!isEmpty ? s.sendBtnReady : ""}`}
                    onClick={handleSend}
                    disabled={isEmpty}
                    title="Send message"
                    type="button"
                >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none"
                        stroke="currentColor" strokeWidth="2.5"
                        strokeLinecap="round" strokeLinejoin="round">
                        <line x1="22" y1="2" x2="11" y2="13" />
                        <polygon points="22 2 15 22 11 13 2 9 22 2" />
                    </svg>
                </button>
            </div>

            {/* ── Hint ── */}
            <p className={s.hint}>
                Enter to send · Shift+Enter for new line
            </p>
        </div>
    );
}

export default InputSection;