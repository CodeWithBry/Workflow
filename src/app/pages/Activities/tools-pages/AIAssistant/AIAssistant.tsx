import { useContext, useEffect, useRef, type JSX } from "react"
import s from "./styles.module.css"
import { context } from "../../../../context/AppContext";
import Button from "../../../../../components/ui/Button";
import ChatBox from "./ChatBox/ChatBox";

// IF the props "aside" is true, then it will show up as a sidebar in UI
// IF the user is in /ai-assistant tab then the AI-Assistant in the sidebar will gone.

function AIAssistant(): JSX.Element {
    const { showAssistant, setShowAssistant, darkMode, getUrl, setModifyData, selectedTaskClass } = useContext(context) as Context;
    const assistantClass = `${s.aiAssistant} ${darkMode && s.dark} ${showAssistant ? s.aside : getUrl[3] == "tasks" && s.hide}`;
    const resizerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (getUrl[3] == "ai-assistant") {
            setModifyData(prev => ({ ...prev, project: selectedTaskClass, task: null }));
        }
    }, [getUrl[3]])

    useEffect(() => {
        const resizer = resizerRef.current;
        if (!resizer) return;

        let isResizing = false;

        const handleMouseDown = (): void => {
            console.log("down!")
            isResizing = true;
            document.body.style.cursor = 'ew-resize';
            document.body.style.userSelect = 'none';
        };

        const handleMouseMove = (e: MouseEvent): void => {
            if (!isResizing || !resizer.parentElement) return;
            // screen == 1000;
            // assistant-screen == 100px to right;

            const containerWidth = window.innerWidth;

            const offsetRight = containerWidth - e.clientX;
            const minWidth = 300;
            const maxWidth = 800;

            let newWidth = offsetRight;

            if (newWidth < minWidth) {
                newWidth = minWidth;
            } else if (newWidth > maxWidth) {
                newWidth = maxWidth;
            }

            resizer.parentElement.style.width = `${newWidth}px`;
        };

        const handleMouseUp = (): void => {
            isResizing = false;
            document.body.style.cursor = '';
            document.body.style.userSelect = '';
        };

        resizer.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('mouseup', handleMouseUp);

        return () => {
            resizer.removeEventListener('mousedown', handleMouseDown);
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, []);

    return (
        <div className={assistantClass}>
            <div ref={resizerRef} className={s.resizer}></div>
            {getUrl[3] == "tasks" && <div className={s.top}>
                <h1 className={s.title}>
                    <span>AI Assistant</span>
                    <img src="./Ai-Assistant/sparkle-yellow.png" alt="yellow-spark" />
                    <Button
                        className={s.close}
                        iconElement={<i className="fas fa-close"></i>}
                        clickListener={() => { setShowAssistant(false) }} />
                </h1>
                <p>Knowledge, answers and ideas. One click away.</p>
            </div>}
            <ChatBox />
        </div >
    )
}

export default AIAssistant