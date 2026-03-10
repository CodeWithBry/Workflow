import { memo, useEffect, useRef } from "react"
import s from "../styles.module.css"
import { Message } from "./Message/Message";
import Thinking from "./Thinking";
const Convo = memo(function Convo(props: ConvoProps) {
    const { selectedConvo, isThinking, setShowSaveProject, setSaveChangesProps, selectedBookMarkId, setSelectedBookMarkId } = props as ConvoProps;
    const chatContainerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!selectedBookMarkId || !chatContainerRef.current) return;
        
        const container = chatContainerRef.current;
        
        requestAnimationFrame(() => {
            const childEl: HTMLLabelElement | null = container.querySelector(
                `#${selectedBookMarkId.messId}`
            );
            const id = selectedBookMarkId.messId

            if (childEl) {
                childEl.scrollIntoView({
                    behavior: "instant",
                    block: "center"
                });
                const modelbox: HTMLDivElement | null = childEl.querySelector(`#model${id}`);
                if(!modelbox) return;
                    modelbox.style.backgroundColor = "#9b97ff";        
                setTimeout(() => {
                    modelbox.style.backgroundColor = "var(--model-bubble)";                    
                }, 3000);
            }
        });

    }, [selectedBookMarkId]);
    
    useEffect(() => {
        if (chatContainerRef.current && !selectedBookMarkId) {
            const el = chatContainerRef.current;
            el.scrollTop = el.scrollHeight;
            setSelectedBookMarkId(null);
        }
    }, [selectedConvo?.messagesUi[selectedConvo?.messagesUi.length - 1]]);
    
    return (
        <div className={s.convoContainer}>
            <div className={s.container} ref={chatContainerRef}>
                {selectedConvo?.messagesUi?.map((res) => {
                    return <Message res={res} setShowSaveProject={setShowSaveProject} setSaveChangesProps={setSaveChangesProps} bookMarkedMess={props.bookMarkedMess} setBookMarkedMess={props.setBookMarkedMess} />
                })}

                <Thinking isThinking={isThinking} />
            </div>

        </div>
    )
})

export default Convo