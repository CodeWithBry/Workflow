import type { Dispatch, ReactNode, SetStateAction } from "react";

// PROPS FOR COMPONENTS
declare global {
    type ConvoProps = ChatBotValues & MessageBoxValues
    type SaveChangesProps = {
        showSaveProject: boolean,
        setShowSaveProject: Dispatch<SetStateAction<boolean>>,
        projectObject: TaskClass | null
    }
    type Results = {
        convo: ConvoList, setShowSearchBox: Dispatch<SetStateAction<boolean>>,
        setShowDCB: Dispatch<SetStateAction<boolean>>,
        setSelectedConvoId: Dispatch<SetStateAction<string>>, 
        setSelectedBookMarkId: Dispatch<SetStateAction<MessagesUi | null>>
    }
    type Message = {
        res: MessagesUi,
        setShowSaveProject: Dispatch<SetStateAction<boolean>>,
        setSaveChangesProps: Dispatch<SetStateAction<SaveChangesProps>>,
        bookMarkedMess: MessagesUi[],
        setBookMarkedMess: Dispatch<SetStateAction<MessagesUi[]>>
    }

    type PropsForDCB = {
        showDCB: boolean,
        setShowDCB: Dispatch<SetStateAction<boolean>>,
        selectedConvoId: string,
        setSelectedConvoId: Dispatch<SetStateAction<string>>,
    }

    type PropsForBookMarkList = {
        showBookMarkLists: boolean,
        setShowBookMarkLists: Dispatch<SetStateAction<boolean>>,
        chatBotValues: ChatBotValues
    }
}


// FUNCTIONS
declare global {
    type AddUserMessage = {
        element?: KeyboardEvent<HTMLInputElement>,
        inputRefText: string
        pseudoConvo?: Convo,
        send?: boolean,
        chatLists: ChatList[],
        modifyData: ModifyData,
        selectedConvo: SelectedConvo,
        userId: string,
        attachment?: string,
        setIsNewChat?: Dispatch<SetStateAction<boolean>>,
        setSelectedConvo: Dispatch<SetStateAction<SelectedConvo>>,
        setConvoLists: Dispatch<SetStateAction<ConvoList[]>>,
        setChatLists: Dispatch<SetStateAction<ChatList[]>>,
        setPauseEffect: Dispatch<SetStateAction<boolean>>,
        setIsFailedToSend: Dispatch<SetStateAction<boolean>>,
        setIsThinking: Dispatch<SetStateAction<boolean>>
    }

    type UpdateConvo = {
        chatInfo: ChatList,
        newMessage: MessagesUi,
        newMessageAi: MessagesAi,
        selectedConvo: SelectedConvo,
        userId: string,
        setSelectedConvo: Dispatch<SetStateAction<SelectedConvo>>,
    }
}

// PROPS VALUES
declare global {
    type ChatBotValues = {

        // BOOLEANS
        isNewChat: boolean, setIsNewChat: Dispatch<SetStateAction<boolean>>
        isConvoLoading: boolean, setIsConvoLoading: Dispatch<SetStateAction<boolean>>,
        isFailedToSend: boolean, setIsFailedToSend: Dispatch<SetStateAction<boolean>>,
        isThinking: boolean, setIsThinking: Dispatch<SetStateAction<boolean>>,
        showSaveProject: boolean, setShowSaveProject: Dispatch<SetStateAction<boolean>>,
        showBookMarkLists: boolean, setShowBookMarkLists: Dispatch<SetStateAction<boolean>>,
        // STRINGS
        // OBJECTS AND ARRAYS
        pseudoConvo: Convo, setPseudoConvo: Dispatch<SetStateAction<Convo>>,
        selectedConvo: SelectedConvo
        saveChangesProps: SaveChangesProps, setSaveChangesProps: Dispatch<SetStateAction<SaveChangesProps>>,
        bookMarkedMess: MessagesUi[], setBookMarkedMess: Dispatch<SetStateAction<MessagesUi[]>>,
        selectedBookMarkId: MessagesUi | null, setSelectedBookMarkId: Dispatch<SetStateAction<MessagesUi | null>>
    }

    type MessageBoxValues = {
        // IMMUTABLE VARIABLES
        actionLists: ActionsLists[],
        showActionLists: boolean, setShowActionLists: Dispatch<SetStateAction<boolean>>,
    }
}

export { };