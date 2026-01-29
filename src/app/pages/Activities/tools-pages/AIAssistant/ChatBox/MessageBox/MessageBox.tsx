import {
    useContext,
    useState,
    useTransition,
    useEffect,
} from "react";
import { context } from "../../../../../../context/AppContext";
import s from "./styles.module.css";

import Suggestion from "./components/Suggestion";
import Convo from "./components/Convo";
import { DropDown } from "../../../../../../../components/drop-down/DropDown";
import Button from "../../../../../../../components/ui/Button";
import LoadingPage from "./components/Loading";
import ConvoList from "./components/HistoryList/SearchBox";

function MessageBox(props: ChatBotValues) {
    const {
        selectedConvo,
        isNewChat,
        setIsNewChat,
        isConvoLoading,
    } = props as ChatBotValues;

    const { darkMode, selectedTaskClass, setSelectedConvo, setConvoLists } = useContext(context) as Context;
    const messageBoxStyles = `${s.messageBox} ${darkMode && s.dark}`;
    const [showActionLists, setShowActionLists] = useState<boolean>(false);

    /** 🧠 NEW: controls heavy UI mounting */
    const [showConvo, setShowConvo] = useState(false);
    const [showConvoLists, setShowConvoLists] = useState(false);
    const [isPending, startTransition] = useTransition();
    // ARRAYS AND OBJECTS
    const actionLists: ActionsLists[] = [
        {
            icon: "	fas fa-edit",
            action: "New chat",
            functionCall() {
                setIsNewChat(false);
                setSelectedConvo(undefined);
                setConvoLists(prev => prev.map((convo) => ({...convo, isOpen: false})))
            },
        },
        {
            icon: "fas fa-history",
            action: "History",
            functionCall() {setShowConvoLists(true)},
        },
        {
            icon: "fas fa-search",
            action: "Search",
            functionCall() { },
        },
    ];
    
    const values = {
        actionLists,
        showActionLists,
        setShowActionLists,
    };

    /** 🔁 Transition when convo is ready */
    useEffect(() => {
        if (!isConvoLoading) {
            startTransition(() => setShowConvo(true));
        } else {
            setShowConvo(false);
        }

    }, [isConvoLoading, selectedConvo, isNewChat]);

    return (
        <div className={messageBoxStyles}>
            {/* HEADER */}
            <ConvoList showConvoLists={showConvoLists} setShowConvoLists={setShowConvoLists} />
            <div className={s.heading}>
                <h2>
                    <span className={s.titleWrapper}>
                        <span>{selectedTaskClass?.name}</span>
                    </span>
                    <Button
                        iconElement={<i className="fa fa-bars" />}
                        className={s.hamburger}
                        clickListener={() =>
                            setShowActionLists(true)
                        }
                    />
                </h2>

                <DropDown
                    {...{
                        darkMode,
                        showTools: showActionLists,
                        setShowTools: setShowActionLists,
                        actionLists,
                    }}
                />
            </div>

            {/* BODY */}
            {isConvoLoading || isPending ? (
                <LoadingPage />
            ) : selectedConvo == null || isNewChat ? (
                <Suggestion />
            ) : showConvo ? (
                <Convo {...{ ...values, ...props }} />
            ) : (
                <LoadingPage />
            )}
        </div>
    );
}

export default MessageBox;
