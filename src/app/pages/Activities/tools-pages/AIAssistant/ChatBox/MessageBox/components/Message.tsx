import { memo, useContext, useMemo } from "react";
import s from "../styles.module.css";

// REMARKS
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

import sanitizeBackticks from "../../utils/sanitizeBackticks";
import { safeJsonParse } from "../../utils/safeJsonParse";
import Button from "../../../../../../../../components/ui/Button";
import { context } from "../../../../../../../context/AppContext";
import { CodeBlock } from "./CodeBlock";

function MessageComponent({ res }: { res: MessagesUi }) {
    const { setTaskClass, locStor, taskClass } = useContext(context) as Context;

    // ⚠️ Heavy string ops → memoized
    const raw = useMemo(() => (
        res.message
            .replace(/```json/gi, "")
            .replace(/```/g, "")
            .replace(/^\s*[\r\n]/gm, "")
            .trim()
    ), [res.message]);

    const message = useMemo(
        () => sanitizeBackticks(res.message, 12),
        [res.message]
    );

    const projectObject = useMemo(
        () => safeJsonParse<TaskClass>(raw),
        [raw]
    );

    return (
        <li
            className={res.role === "user" ? s.user : s.model}
        >
            <div
                className={`${s.wrapper} ${res.role === "user" ? s.userBox : s.modelBox}`}
            >
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

                            const languageClass = classes.find(c =>
                                c.startsWith("language-")
                            );

                            const lang = languageClass?.replace("language-", "");
                            const value = String(children).replace(/\n$/, "");

                            // Fenced code block
                            if (lang) {
                                return (
                                    <CodeBlock
                                        language={lang}
                                        value={value}
                                    />
                                );
                            }

                            // Inline code
                            return (
                                <code className={s.inlineCode}>
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

            {res.role === "model" && (
                <div className={s.actions}>
                    {projectObject?.id && (
                        <Button
                            className={`${s.actionButton} ${s.saveButton}`}
                            clickListener={() => {
                                setTaskClass(prev =>
                                    prev.map(t => {
                                        if (t.id === projectObject.id) {
                                            locStor.saveDataToLocalStorage({
                                                updatedTaskClass: projectObject,
                                                taskType: "projects",
                                                taskClass,
                                                valueFor: "taskClass",
                                            });
                                            return { ...projectObject };
                                        }
                                        return t;
                                    })
                                );
                            }}
                            iconElement={<i className="fas fa-save" />}
                            content="Update This Project"
                        />
                    )}
                </div>
            )}
        </li>
    );
}

/**
 * 🧠 Memoized Message
 * Re-renders ONLY when res changes
 */
export const Message = memo(
    MessageComponent,
    (prev, next) =>
        prev.res.message === next.res.message &&
        prev.res.role === next.res.role
);
