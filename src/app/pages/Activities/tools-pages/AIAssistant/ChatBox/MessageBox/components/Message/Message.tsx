import { memo, useContext, useMemo, useState } from "react";
import s from "./styles.module.css";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import sanitizeBackticks from "../../../utils/sanitizeBackticks";
import { safeJsonParse } from "../../../utils/safeJsonParse";
import { context } from "../../../../../../../../context/AppContext";
import { CodeBlock } from "../CodeBlock";
import { saveBookMarkedMessages, saveConvoData } from "../../../../../../../../../lib/firebase";

export const Message = memo(function Message({ res, setShowSaveProject, setSaveChangesProps, bookMarkedMess, setBookMarkedMess }: Message) {
    const { darkMode, userInfo, setSelectedConvo, chatLists, selectedTaskClass, selectedConvo } = useContext(context) as Context;
    const [speak, setSpeak] = useState<boolean>(false);
    const [copied, setCopied] = useState<boolean>(false);

    const raw = useMemo(() => (
        res.message
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .replace(/^\s*[\r\n]/gm, "")
            .trim()
    ), [res.message]);

    const message = useMemo(
        () => sanitizeBackticks(res.message, 20),
        [res.message]
    );

    const projectObject = useMemo(
        () => safeJsonParse<TaskClass>(raw),
        [raw]
    );

    const handleBookmark = () => {
        let updatedMessagesUi: MessagesUi[] = [];
        let convo: SelectedConvo = undefined;
        let convoId = "";

        setSelectedConvo(prev => {
            if (!prev) return undefined;
            convoId = prev.convoId;
            const messagesUi = prev.messagesUi.map((mess) => {
                if (mess.role === "model" && mess.message.toLowerCase() === res.message.toLowerCase()) {
                    return { ...mess, bookMarked: !res.bookMarked };
                }
                return mess;
            });
            const updatedConvo = { ...prev, messagesUi };
            convo = updatedConvo;
            updatedMessagesUi = messagesUi;
            return updatedConvo;
        });

        setBookMarkedMess(() => {
            const seen = new Set<string>();
            // const mergeMessages = [...bookMarkedMess, ...updatedMessagesUi.filter(mess => mess.bookMarked)
            //     .filter(mess => {
            //         if (seen.has(mess.message)) return false;
            //         seen.add(mess.message);
            //         return true;
            //     }).map((messUi) => ({ ...messUi, chatId: selectedTaskClass?.id, convoId: selectedConvo?.convoId }))]
            // const updatedBookMarkedMess: MessagesUi[] = mergeMessages
            //     .filter((mes) => mes.messId == res.messId && res.bookMarked)
            //     ;

            // console.log(seen.values(),
            //     ...updatedMessagesUi.filter(mess => mess.bookMarked)
            //         .filter(mess => {
            //             if (seen.has(mess.message)) return false;
            //             seen.add(mess.message);
            //             return true;
            //         }).map((messUi) => ({ ...messUi, chatId: selectedTaskClass?.id, convoId: selectedConvo?.convoId }))
            // )
            const messages = [
                ...bookMarkedMess.map((mes) => {
                    if (mes.messId == res.messId) {
                        return res.bookMarked ? ({ ...mes, bookMarked: false }) : ({ ...mes, bookMarked: true })
                    }
                    return mes
                }).filter(mes => mes.bookMarked),
                ...updatedMessagesUi.filter(mess => mess.bookMarked)
                    .filter(mess => {
                        if (seen.has(mess.message)) return false;
                        seen.add(mess.message);
                        return true;
                    }).map((messUi) => ({ ...messUi, chatId: selectedTaskClass?.id, convoId: selectedConvo?.convoId }))
            ]

            const uniqueMessages = Array.from(
                    new Map(messages.map(m => [`${m.message}-${m.convoId}`, m])).values()
                    );
            )

            if (userInfo && selectedTaskClass) saveBookMarkedMessages(userInfo.userId, selectedTaskClass.id, uniqueMessages);
            return uniqueMessages;
        });

        const findInChatList = chatLists.find(chat => chat.isOpen);
        if (userInfo && findInChatList && convo) {
            saveConvoData(userInfo.userId, findInChatList.id, convoId, convo);
        }
    };

    const handleSpeak = () => {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
            setSpeak(false);
            return;
        }
        window.speechSynthesis.cancel();
        const speech = new SpeechSynthesisUtterance(res.message);
        speech.lang = "fil-PH";
        speech.onstart = () => setSpeak(true);
        speech.onend = () => setSpeak(false);
        speech.onerror = () => setSpeak(false);
        window.speechSynthesis.speak(speech);
    };

    const isUser = res.role === "user";
    const isModel = res.role === "model";

    if (message.length != 0) return (
        <>
            {/* ── Task attachment chip (shown above user bubble) ── */}

            {/* ── Message row ── */}
            <li className={`${s.row} ${isUser ? s.rowUser : s.rowModel} ${darkMode && s.dark} ${message.includes("Error") && s.error}`} id={res.messId}>

                {/* AI avatar — left side */}

                {/* Bubble column */}
                <div className={`${s.bubbleCol} ${isUser ? s.bubbleColUser : s.bubbleColModel}`}>
                    {res.attachments && res.attachments?.length > 0 && (
                        <div className={`${s.attachmentChip} ${darkMode && s.dark}`}>
                            <span className={s.attachmentIcon}>
                                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                    <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                                    <polyline points="14 2 14 8 20 8" />
                                </svg>
                            </span>
                            <span className={s.attachmentLabel}>Task:</span>
                            <span className={s.attachmentText}>
                                {res.attachments && res.attachments[0].kind === "task"
                                    ? res.attachments[0].description
                                    : res.attachments ? res.attachments[0].kind : "Attachment"}
                            </span>
                        </div>
                    )}
                    {/* Bubble */}
                    <div className={`${s.bubble} ${isUser ? s.bubbleUser : s.bubbleModel}`} id={"model" + res.messId}>
                        <ReactMarkdown
                            remarkPlugins={[remarkGfm]}
                            components={{
                                code({ node, children }) {
                                    const className = node?.properties?.className;
                                    const classes: string[] = Array.isArray(className)
                                        ? className.filter((c): c is string => typeof c === "string")
                                        : typeof className === "string"
                                            ? className.split(/\s+/)
                                            : [];
                                    const languageClass = classes.find(c => c.startsWith("language-"));
                                    const lang = languageClass?.replace("language-", "");
                                    const value = String(children).replace(/\n$/, "");
                                    if (lang) return <CodeBlock language={lang} value={value} />;
                                    return <code className={s.inlineCode}>{children}</code>;
                                },
                                p({ children }) {
                                    return <p className={s.paragraph}>{children}</p>;
                                },
                                a({ href, children }) {
                                    return (
                                        <a href={href} rel="noopener noreferrer" className={s.link}>
                                            {children}
                                        </a>
                                    );
                                },
                            }}
                        >
                            {message}
                        </ReactMarkdown>
                    </div>

                    {/* Action bar — model only */}
                    {isModel && (
                        <div className={s.actions}>
                            {/* Copy */}
                            <button
                                className={`${s.actionBtn} ${copied ? s.actionBtnActive : ""}`}
                                onClick={async () => {
                                    await navigator.clipboard.writeText(res.message);
                                    setCopied(true);
                                    setTimeout(() => setCopied(false), 1500);
                                }}
                                title="Copy response"
                            >
                                {copied ? (
                                    <>
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                                            <polyline points="20 6 9 17 4 12" />
                                        </svg>
                                        Copied
                                    </>
                                ) : (
                                    <>
                                        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                            <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                                            <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                                        </svg>
                                        Copy
                                    </>
                                )}
                            </button>

                            {/* Bookmark */}
                            <button
                                className={`${s.actionBtn} ${res.bookMarked ? s.actionBtnBookmarked : ""}`}
                                onClick={handleBookmark}
                                title={res.bookMarked ? "Remove bookmark" : "Bookmark"}
                            >
                                {res.bookMarked ? (
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                                    </svg>
                                ) : (
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                                    </svg>
                                )}
                                {res.bookMarked ? "Saved" : "Save"}
                            </button>

                            {/* Text-to-speech */}
                            <button
                                className={`${s.actionBtn} ${speak ? s.actionBtnSpeaking : ""}`}
                                onClick={handleSpeak}
                                title={speak ? "Stop speaking" : "Read aloud"}
                            >
                                {speak ? (
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <rect x="6" y="4" width="4" height="16" /><rect x="14" y="4" width="4" height="16" />
                                    </svg>
                                ) : (
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
                                        <path d="M19.07 4.93a10 10 0 010 14.14M15.54 8.46a5 5 0 010 7.07" />
                                    </svg>
                                )}
                                {speak ? "Stop" : "Listen"}
                            </button>

                            {/* Save Project — only when Gemini returned a project object */}
                            {projectObject?.id && (
                                <button
                                    className={`${s.actionBtn} ${s.actionBtnProject}`}
                                    onClick={() => {
                                        if (userInfo) {
                                            setShowSaveProject(true);
                                            setSaveChangesProps(prev => ({ ...prev, projectObject }));
                                        }
                                    }}
                                    title="Update this project"
                                >
                                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M19 21H5a2 2 0 01-2-2V5a2 2 0 012-2h11l5 5v14a2 2 0 01-2 2z" />
                                        <polyline points="17 21 17 13 7 13 7 21" />
                                        <polyline points="7 3 7 8 15 8" />
                                    </svg>
                                    Update Project
                                </button>
                            )}
                        </div>
                    )}
                </div>

                {/* User avatar — right side */}
                {isUser && (
                    <div className={`${s.avatar} ${s.avatarUser}`}>
                        U
                    </div>
                )}
            </li>
        </>
    );

}, (prev, next) =>
    prev.res.message === next.res.message &&
    prev.res.role === next.res.role &&
    prev.res.bookMarked === next.res.bookMarked
);