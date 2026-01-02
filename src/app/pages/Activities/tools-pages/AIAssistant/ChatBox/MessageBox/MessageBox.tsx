import { useContext, useState } from 'react';
import { context } from '../../../../../../context/AppContext';
import s from './styles.module.css'
import Suggestion from './Suggestion';
import Convo from './Convo';

function MessageBox(props: ChatBotValues) {
    const { userInput, selectedConvo, isNewChat, setIsNewChat, setChat } = props as ChatBotValues;
    const { darkMode } = useContext(context) as Context;
    const messageBoxStyles = !darkMode ? s.messageBox : `${s.messageBox} ${s.dark}`;
    const [showActionLists, setShowActionLists] = useState<boolean>(false);

    // ARRAYS AND OBJECTS
    const actionLists: ActionsLists[] = [
        {
            icon: "far fa-edit",
            action: "New chat",
            functionCall() {
                setIsNewChat(false);
                setChat(prev => {
                    const updatedConvos = prev.convos.map(convo => ({...convo, isOpened: false}));
                    return {...prev, convos: updatedConvos};
                })
            }
        },
        {
            icon: "far fa-edit",
            action: "History",
            functionCall() {}
        },
        {
            icon: "far fa-edit",
            action: "New chat",
            functionCall() {}
        }
    ]

    const values = {
        // IMMUTABLE VARIABLES
        actionLists,
        // BOOLEAN
        showActionLists, setShowActionLists,
        // STRINGS
        // NUMBERS
    }

    if ((userInput.length == 0 && selectedConvo == null) || !isNewChat) {
        return (
            <div className={messageBoxStyles}>
                <Suggestion {...{...values, ...props}}/>
            </div>
        )
    }

    return (
        <div className={messageBoxStyles}>
            <Convo {...{...props, ...values}} />
        </div>
    )
}

export default MessageBox