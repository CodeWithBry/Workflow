import { useContext } from 'react';
import { context } from '../../../../../../context/AppContext';
import s from './styles.module.css'
import Suggestion from './Suggestion';
import Convo from './Convo';

function MessageBox(props: ChatBotValues) {
    const { userInput } = props as ChatBotValues;
    const { darkMode } = useContext(context) as Context;
    const messageBoxStyles = !darkMode ? s.messageBox : `${s.messageBox} ${s.dark}`

    if (userInput.length == 0) {
        return (
            <div className={messageBoxStyles}>
                <Suggestion />
            </div>
        )
    }

    return (
        <div className={messageBoxStyles}>
            <Convo {...props} />
        </div>
    )
}

export default MessageBox