import type { Dispatch, ReactNode, SetStateAction } from "react";

// PROPS FOR COMPONENTS
declare global {
    type ConvoProps = ChatBotValues & MessageBoxValues
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
        
    }

    type SendMessageToBot = {
        messagesAi: MessagesAi[],
        modifyData: ModifyData,
        chats: ChatList[], setChats: Dispatch<SetStateAction<ChatList[]>>,
        selectedChat: SelectedChat,
        setPauseEffect: Dispatch<SetStateAction<boolean>>,
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
        // STRINGS
        // OBJECTS AND ARRAYS
        pseudoConvo: Convo, setPseudoConvo: Dispatch<SetStateAction<Convo>>,
        selectedConvo: SelectedConvo
    }

    type MessageBoxValues = {
        // IMMUTABLE VARIABLES
        actionLists: ActionsLists[],
        showActionLists: boolean, setShowActionLists: Dispatch<SetStateAction<boolean>>,
    }
}

export { };