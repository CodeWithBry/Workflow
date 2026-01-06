import { useContext, useMemo } from "react";
import s from "../styles.module.css"

// REMARKS
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { motion } from "framer-motion";
import sanitizeBackticks from "../../utils/sanitizeBackticks";
import { safeJsonParse } from "../../utils/safeJsonParse";
import Button from "../../../../../../../../components/ui/Button";
import { context } from "../../../../../../../context/AppContext";
export function Message ({ res }: { res: MessagesUi }) {
    const { setTaskClass, locStor, taskClass } = useContext(context) as Context
    const raw = res.message
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .replace(/^\s*[\r\n]/gm, "")
        .trim();
    const message = useMemo(() => sanitizeBackticks(res.message, 12), [res.message]);
    const projectObject = safeJsonParse<TaskClass>(raw);


    return (
        <motion.li
            key={res.message}
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

            {res.role === "model" && <div className={s.actions}>
                {projectObject?.id && <Button
                    className={`${s.actionButton} ${s.saveButton}`}
                    clickListener={() => {
                        setTaskClass((prev) => prev.map(t => {
                            if (t.id == projectObject.id) {
                                locStor.saveDataToLocalStorage({
                                    updatedTaskClass: projectObject, taskType: "projects", taskClass, valueFor: "taskClass"
                                })
                                return { ...projectObject }
                            }

                            return t
                        }))
                    }}
                    iconElement={<i className="fas fa-save"></i>}
                    content={"Update This Project"} />}
            </div>}
        </motion.li>
    );
}