import { useContext, useEffect, useRef } from "react"
import s from "./styles.module.css"
import { context } from "../../../../../../context/AppContext"
import Button from "../../../../../../../components/ui/Button";

// REMARKS
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";
import sanitizeBackticks from "../utils/sanitizeBackticks";
import { DropDown } from "../../../../../../../components/DropDown/DropDown";
function Convo(props: ConvoProps) {
    const { selectedConvo, showActionLists, setShowActionLists, actionLists } = props as ConvoProps;
    const { darkMode } = useContext(context) as Context;
    const chatContainerRef = useRef(null)
    const convoClassName = !darkMode ? s.convo : `${s.convo} ${s.dark}`
    const dropDownVariables: DropDownProps = { darkMode, showTools: showActionLists, setShowTools: setShowActionLists, actionLists}

    useEffect(() => {
        if(chatContainerRef.current) {
            const el: HTMLDivElement = chatContainerRef.current;
            el.scrollTop = el.scrollHeight;
        }
    }, [chatContainerRef.current, selectedConvo])

    return (
        <div className={convoClassName}>
            <div className={s.heading}>
                <h2>
                    <span className={s.titleWrapper}>s
                        <span>Auto-Increment Generation Function</span>
                    </span>
                    <Button
                        iconElement={<i className="fa fa-bars"></i>}
                        className={s.hamburger}
                        clickListener={() => { setShowActionLists(true) }} />
                </h2>

                <DropDown {...dropDownVariables}/>
            </div>

            <div className={s.convoContainer}>
                <div className={s.container} ref={chatContainerRef}>
                    {selectedConvo?.messagesUi?.map((res, i) => {
                        const message = sanitizeBackticks(res.message, 12); // tweak threshold if needed
                        return (
                            <motion.li
                                key={i}
                                className={res.role === "user" ? s.user : s.model}
                                initial={{ opacity: 0, y: 8 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.22 }}
                            >
                                <div className={`${s.wrapper} ${res.role === "user" ? s.userBox : s.modelBox}`} >
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

                                                const languageClass = classes.find((c) =>
                                                    c.startsWith("language-")
                                                );

                                                const lang = languageClass?.replace("language-", "");

                                                // Block code (fenced)
                                                if (lang) {
                                                    return (
                                                        <SyntaxHighlighter
                                                            style={oneDark}
                                                            language={lang}
                                                            PreTag="div"
                                                            wrapLongLines
                                                            customStyle={{
                                                                borderRadius: "0.7rem",
                                                                fontSize: "0.9rem",
                                                            }}
                                                        >
                                                            {String(children).replace(/\n$/, "")}
                                                        </SyntaxHighlighter>
                                                    );
                                                }

                                                // Inline code
                                                return (
                                                    <code className={s.inlineCode} aria-label="inline-code">
                                                        {children}
                                                    </code>
                                                );
                                            },

                                            p({ children }) {
                                                return <p className={s.paragraph}>{children}</p>;
                                            },

                                            a({ href, children }) {
                                                return (
                                                    <a
                                                        href={href}
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className={s.link}
                                                    >
                                                        {children}
                                                    </a>
                                                );
                                            },
                                        }}
                                    >
                                        {message}
                                    </ReactMarkdown>

                                </div>
                            </motion.li>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Convo