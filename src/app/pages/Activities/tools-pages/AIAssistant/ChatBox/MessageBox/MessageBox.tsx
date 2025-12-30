import { useContext } from 'react';
import { context } from '../../../../../../context/AppContext';
import s from './styles.module.css'
import Suggestion from './Suggestion';

function MessageBox() {
    const { darkMode } = useContext(context) as Context;
    const messageBoxStyles = !darkMode ? s.messageBox : `${s.messageBox} ${s.dark}`
    return (
        <div className={messageBoxStyles}>
            <Suggestion />
        </div>
    )
}

export default MessageBox