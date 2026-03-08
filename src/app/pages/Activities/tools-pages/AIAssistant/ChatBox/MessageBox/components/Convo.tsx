import { memo, useEffect, useRef } from "react"
import s from "../styles.module.css"
import { Message } from "./Message/Message";
import Thinking from "./Thinking";
const Convo = memo(function Convo(props: ConvoProps) {
    const { selectedConvo, isThinking, setShowSaveProject, setSaveChangesProps, setBookMarkedMess } = props as ConvoProps;
    const chatContainerRef = useRef(null);

    useEffect(() => {
        if (chatContainerRef.current) {
            const el: HTMLDivElement = chatContainerRef.current;
            el.scrollTop = el.scrollHeight;
        }
    }, [selectedConvo?.messagesUi[selectedConvo?.messagesUi.length - 1]]);

    useEffect(() => {
        const getAllBookMarkedMess = selectedConvo?.messagesUi.filter(mess => mess.bookMarked);
        if (getAllBookMarkedMess) setBookMarkedMess([...getAllBookMarkedMess]);
    }, [selectedConvo?.messagesUi.filter(mess => mess.bookMarked).length]);

    return (
        <div className={s.convoContainer}>
            <div className={s.container} ref={chatContainerRef}>
                {selectedConvo?.messagesUi?.map((res) => {
                    return <Message res={res} setShowSaveProject={setShowSaveProject} setSaveChangesProps={setSaveChangesProps} setBookMarkedMess={props.setBookMarkedMess} />
                })}

                <Thinking isThinking={isThinking} />
            </div>

        </div>
    )
})

export default Convo