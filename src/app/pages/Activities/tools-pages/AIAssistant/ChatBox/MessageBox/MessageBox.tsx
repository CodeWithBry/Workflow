import { useContext, useState } from 'react';
import { context } from '../../../../../../context/AppContext';
import s from './styles.module.css'
import Suggestion from './components/Suggestion';
import Convo from './components/Convo';
import { DropDown } from '../../../../../../../components/DropDown/DropDown';
import Button from '../../../../../../../components/ui/Button';
import LoadingPage from './components/Loading';

function MessageBox(props: ChatBotValues) {
    const { selectedConvo, isNewChat, setIsNewChat, isConvoLoading } = props as ChatBotValues;
    const { darkMode, selectedTaskClass } = useContext(context) as Context;
    const messageBoxStyles = !darkMode ? s.messageBox : `${s.messageBox} ${s.dark}`;
    const [showActionLists, setShowActionLists] = useState<boolean>(false);

    // ARRAYS AND OBJECTS
    const actionLists: ActionsLists[] = [
        {
            icon: "far fa-edit",
            action: "New chat",
            functionCall() {
                setIsNewChat(false);
                // setChat(prev => {
                //     const updatedConvos = prev.convos.map(convo => ({ ...convo, isOpened: false }));
                //     return { ...prev, convos: updatedConvos };
                // })
            }
        },
        {
            icon: "far fa-edit",
            action: "History",
            functionCall() {

            }
        },
        {
            icon: "far fa-edit",
            action: "Search",
            functionCall() { }
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

    return (
        <div className={messageBoxStyles}>
            <div className={s.heading}>
                <h2>
                    <span className={s.titleWrapper}>
                        <span>{selectedTaskClass?.name}</span>
                    </span>
                    <Button
                        iconElement={<i className="fa fa-bars"></i>}
                        className={s.hamburger}
                        clickListener={() => { setShowActionLists(true) }} />
                </h2>

                <DropDown {...{ darkMode, showTools: showActionLists, setShowTools: setShowActionLists, actionLists }} />
            </div>

            {
                isConvoLoading
                    ? <LoadingPage />
                    : selectedConvo == null || !isNewChat
                        ? <Suggestion />
                        : <Convo {...{ ...values, ...props }} />
            }
        </div>
    )
}

export default MessageBox