import s from '../styles.module.css'
import Button from '../../../../../../../../components/ui/Button';
import { useContext } from 'react';
import { context } from '../../../../../../../context/AppContext';
import { addUserMessage } from '../../utils/addUserMessage';

function Suggestion({ setIsThinking, pseudoConvo, setIsNewChat, setIsFailedToSend }: ChatBotValues) {
    const { userInfo, setModifyData, chatLists, setSelectedConvo, selectedConvo, modifyData, setPauseEffect, setChatLists, setConvoLists } = useContext(context) as Context;
    return (
        <div className={s.suggestionsContainer}>
            <div className={s.greetings}>
                <span>Hello, Bryan</span>
                <h2>How can I help you?</h2>
            </div>
            <img src="./Ai-Assistant/sparkle-blue.png" alt="blue-sparkle" />
            <Button
                className={s.suggestionButton}
                clickListener={() => {
                    if (userInfo) {
                        setIsThinking(true);
                        setModifyData(prev => ({ ...prev, task: null }));
                        addUserMessage({
                            inputRefText: "Can you help me with this project?",
                            chatLists, setSelectedConvo,
                            pseudoConvo: selectedConvo ? undefined : pseudoConvo,
                            modifyData, setIsNewChat,
                            selectedConvo, userId: userInfo?.userId,
                            setConvoLists, setPauseEffect, setChatLists,
                            setIsFailedToSend, send: true, setIsThinking
                        });
                    }
                }}
                content={"Can you help me with this project?"} />
            <Button
                className={s.suggestionButton}
                clickListener={() => {
                    if (userInfo) {
                        setIsThinking(true);
                        setModifyData(prev => ({ ...prev, task: null }));
                        addUserMessage({
                            inputRefText: "Create a project plan for this project.",
                            chatLists, setSelectedConvo,
                            pseudoConvo: selectedConvo ? undefined : pseudoConvo,
                            modifyData, setIsNewChat,
                            selectedConvo, userId: userInfo?.userId,
                            setConvoLists, setPauseEffect, setChatLists,
                            setIsFailedToSend, send: true, setIsThinking
                        })
                    }
                }}
                content={"Create a project plan for this project."} />
            <Button
                className={s.suggestionButton}
                clickListener={() => {
                    if (userInfo) {
                        setIsThinking(true);
                        setModifyData(prev => ({ ...prev, task: null }));
                        addUserMessage({
                            inputRefText: "Give me the progress of this project.",
                            chatLists, setSelectedConvo,
                            pseudoConvo: selectedConvo ? undefined : pseudoConvo,
                            modifyData, setIsNewChat,
                            selectedConvo, userId: userInfo?.userId,
                            setConvoLists, setPauseEffect, setChatLists,
                            setIsFailedToSend, send: true, setIsThinking
                        });
                    }
                }}
                content={"Give me the progress of this project."} />
        </div>
    )
}

export default Suggestion