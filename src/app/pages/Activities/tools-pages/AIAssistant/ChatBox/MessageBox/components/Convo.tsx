import { useEffect, useRef } from "react"
import s from "../styles.module.css"
import { Message } from "./Message";
function Convo(props: ConvoProps) {
    const { selectedConvo } = props as ConvoProps;
    const chatContainerRef = useRef(null)

    useEffect(() => {
        if (chatContainerRef.current) {
            const el: HTMLDivElement = chatContainerRef.current;
            el.scrollTop = el.scrollHeight;
        }
    }, [chatContainerRef.current, selectedConvo])

    return (
        <div className={s.convoContainer}>
            <div className={s.container} ref={chatContainerRef}>
                {selectedConvo?.messagesUi?.map((res) => {
                    return <Message res={res} />
                })}
            </div>
        </div>
    )
}

export default Convo