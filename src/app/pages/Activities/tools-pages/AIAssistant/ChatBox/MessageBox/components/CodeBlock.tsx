import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import s from "../styles.module.css"

export function CodeBlock({
    language,
    value,
}: {
    language?: string;
    value: string;
}) {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        await navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 1500);
    };

    return (
        <div className={s.codeBlockWrapper}>
            {/* Header */}
            <div className={s.codeBlockHeader}>
                <span className={s.language}>
                    {language ?? "code"}
                </span>
                <button
                    onClick={handleCopy}
                    className={s.copyBtn}
                    aria-label="Copy code"
                >
                    {copied ? "Copied!" : "Copy"}
                </button>
            </div>

            {/* Code */}
            <SyntaxHighlighter
                style={oneDark}
                language={language}
                PreTag="div"
                wrapLongLines
                customStyle={{
                    margin: 0,
                    borderRadius: "0 0 0.7rem 0.7rem",
                    fontSize: "0.9rem",
                }}
            >
                {value}
            </SyntaxHighlighter>
        </div>
    );
}
