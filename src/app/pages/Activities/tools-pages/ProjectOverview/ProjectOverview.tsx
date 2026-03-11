import { useContext, useRef, useState } from "react"
import s from "./styles.module.css"
import { context } from "../../../../context/AppContext"
import Button from "../../../../../components/ui/Button";
import { saveProjectFromFirestore } from "../../../../../lib/firebase";

function ProjectOverview() {
    const { darkMode, userInfo, setSelectedConvo, setSelectedTaskClass, selectedTaskClass } = useContext(context) as Context;
    const inputRef = useRef<HTMLDivElement>(null);
    const [isEditing, setIsEditing] = useState<boolean>(false);
    const [isEmpty, setIsEmpty] = useState(true);

    return (
        <div className={`${s.projectOverview} ${darkMode && s.dark}`}>
            <div className={s.title}>
                <h3>Project Description</h3>
                {
                    isEditing ?
                        (
                            <>
                                <Button
                                    content={"Cancel"}
                                    className={`${s.actionBtn} ${s.cancelBtn}`}
                                    clickListener={() => setIsEditing(false)} />
                                <Button
                                    content={"Save"}
                                    className={`${s.actionBtn} ${s.editBtn}`}
                                    clickListener={async () => {
                                        if (!selectedTaskClass || !inputRef.current) return;
                                        const html = inputRef.current.innerHTML;
                                        const description = html
                                            .replace(/<br\s*\/?>/gi, "\n")
                                            .replace(/<div>/gi, "\n")
                                            .replace(/<\/div>/gi, "")
                                            .replace(/&nbsp;/gi, " ")
                                            .replace(/<[^>]+>/g, "");
                                        const updatedProject: TaskClass = { ...selectedTaskClass, description };
                                        if (userInfo && selectedTaskClass) await saveProjectFromFirestore(userInfo.userId, updatedProject, undefined, 'update');
                                        setSelectedTaskClass({ ...updatedProject });
                                        setIsEditing(false);
                                    }} />
                            </>
                        ) :
                        <Button
                            content={"Edit"}
                            className={`${s.actionBtn} ${s.editBtn}`}
                            clickListener={() => {
                                setIsEditing(true);
                            }} />
                }
            </div>
            <div className={s.wrapper}>
                <div
                    className={`${s.editor} ${isEmpty && selectedTaskClass?.description?.trim() ? s.empty : ""}`}
                    contentEditable={isEditing}
                    ref={inputRef}
                    suppressContentEditableWarning
                    role="textbox"
                    aria-label="Message input"
                    aria-multiline="true"
                    data-placeholder={selectedTaskClass?.description?.trim() != "" ? "" : "Write your project description..."}
                    dangerouslySetInnerHTML={{
                        __html: (selectedTaskClass?.description ?? "").replace(/\n/g, "<br>")
                    }}
                    onInput={() => {
                        const text = inputRef.current?.innerText ?? "";
                        setIsEmpty(!text.trim());
                        if (!text.trim() || !userInfo) return;
                        setSelectedConvo(prev => prev ? ({ ...prev, description: text }) : prev)
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
                        // Enter → prevent default
                        if (e.key === "Enter") {
                            e.preventDefault();
                        }
                    }}
                />
            </div>
        </div>
    )
}

export default ProjectOverview