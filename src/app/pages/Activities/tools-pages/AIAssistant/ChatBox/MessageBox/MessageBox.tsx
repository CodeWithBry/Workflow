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
import BookMarkList from "./components/BookMarkedList/SearchBox";

function MessageBox(props: ChatBotValues) {
    const {
        selectedConvo,
        isNewChat,
        setIsNewChat,
        isConvoLoading
    } = props as ChatBotValues;

    const { darkMode, selectedTaskClass, setSelectedConvo, setConvoLists } = useContext(context) as Context;
    const messageBoxStyles = `${s.messageBox} ${darkMode && s.dark}`;
    const [showActionLists, setShowActionLists] = useState<boolean>(false);

    /** 🧠 NEW: controls heavy UI mounting */
    const [showConvo, setShowConvo] = useState(false);
    const [showConvoLists, setShowConvoLists] = useState(false);
    const [showBookMarkLists, setShowBookMarkLists] = useState(false);
    const [isPending, startTransition] = useTransition();
    // ARRAYS AND OBJECTS
    const actionLists: ActionsLists[] = [
        {
            icon: "	fas fa-edit",
            action: "New chat",
            functionCall() {
                setIsNewChat(false);
                setSelectedConvo(undefined);
                setConvoLists(prev => prev.map((convo) => ({ ...convo, isOpen: false })))
            },
        },
        {
            icon: "fas fa-history",
            action: "History",
            functionCall() { setShowConvoLists(true) },
        },
        {
            icon: "fa-solid fa-bookmark",
            action: "Bookmark",
            functionCall() { setShowBookMarkLists(true) },
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

    }, [isConvoLoading, selectedConvo, isNewChat, isPending]);

    

    return (
        <div className={messageBoxStyles}>
            {/* HEADER */}
            <ConvoList showConvoLists={showConvoLists} setShowConvoLists={setShowConvoLists} chatBotValues={props} />
            <BookMarkList showBookMarkLists={showBookMarkLists} setShowBookMarkLists={setShowBookMarkLists} chatBotValues={props} />
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
            {isConvoLoading ? (
                <LoadingPage />
            ) : selectedConvo == null || isNewChat ? (
                <Suggestion {...props} />
            ) : showConvo ? (
                <Convo {...{ ...values, ...props }} />
            ) : (
                <LoadingPage />
            )}
        </div>
    );
}

export default MessageBox;
