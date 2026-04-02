import {
    useContext,
    useState,
    useRef,
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
        isConvoLoading,
        setIsConvoLoading
    } = props as ChatBotValues;

    const { darkMode, selectedTaskClass, setSelectedConvo, setConvoLists } = useContext(context) as Context;
    const messageBoxStyles = `${s.messageBox} ${darkMode && s.dark}`;
    const [showActionLists, setShowActionLists] = useState<boolean>(false);
    const [showConvoLists, setShowConvoLists] = useState<boolean>(false);
    const [showBookMarkLists, setShowBookMarkLists] = useState<boolean>(false);

    // ✅ Track the last rendered convo ID — when it changes, treat as loading
    const prevConvoIdRef = useRef<string | undefined>(undefined);
    const [isConvoSwitching, setIsConvoSwitching] = useState<boolean>(false);

    useEffect(() => {
        const incomingId = selectedConvo?.convoId;

        // If the convo ID changed and we're not in a new chat, flag as switching
        if (prevConvoIdRef.current !== incomingId) {
            if (prevConvoIdRef.current !== undefined) {
                setIsConvoSwitching(true);
            }
            prevConvoIdRef.current = incomingId;
        }

        // Once the convo is fully loaded, clear the switching flag
        if (!isConvoLoading) {
            setIsConvoSwitching(false);
        }
    }, [selectedConvo?.convoId, isConvoLoading]);

    const actionLists: ActionsLists[] = [
        {
            icon: "fas fa-edit",
            action: "New chat",
            functionCall() {
                setIsNewChat(false);
                setSelectedConvo(undefined);
                setConvoLists(prev => prev.map((convo) => ({ ...convo, isOpen: false })));
            },
        },
        {
            icon: "fas fa-history",
            action: "History",
            functionCall() { setShowConvoLists(true); },
        },
        {
            icon: "fa-solid fa-bookmark",
            action: "Bookmark",
            functionCall() { setShowBookMarkLists(true); },
        },
    ];

    const isLoading = isConvoLoading || isConvoSwitching;
    const showConvo = !isLoading && !!selectedConvo && !isNewChat;

    return (
        <div className={messageBoxStyles}>
            <ConvoList showConvoLists={showConvoLists} setShowConvoLists={setShowConvoLists} setIsConvoLoading={setIsConvoLoading} chatBotValues={props} />
            <BookMarkList showBookMarkLists={showBookMarkLists} setShowBookMarkLists={setShowBookMarkLists} chatBotValues={props} />

            <div className={s.heading}>
                <h2>
                    <span className={s.titleWrapper}>
                        <span>{selectedTaskClass?.name}</span>
                    </span>
                    <Button
                        iconElement={<i className="fa fa-bars" />}
                        className={s.hamburger}
                        clickListener={() => setShowActionLists(true)}
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

            {isLoading ? (
                <LoadingPage />
            ) : showConvo ? (
                <Convo {...{ actionLists, showActionLists, setShowActionLists, ...props }} />
            ) : (
                <Suggestion {...props} />
            )}
        </div>
    );
}

export default MessageBox;