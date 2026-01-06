import type { Dispatch, ReactNode, SetStateAction } from "react";

// PROPS FOR COMPONENTS
declare global {
    type ConvoProps = ChatBotValues & MessageBoxValues
}


// FUNCTIONS
declare global {
    type HandleInput = {
        element: KeyboardEvent<HTMLInputElement>,
        chats: Chats, setChats: Dispatch<SetStateAction<Chats>>,
    }

    type AddUserMessage = {
        element?: KeyboardEvent<HTMLInputElement>,
        inputRefText: string 
        pseudoConvo?: Convo,
        send?: boolean,
        setIsNewChat?: Dispatch<SetStateAction<boolean>>,
        chats: Chats, setChats: Dispatch<SetStateAction<Chats>>,
        modifyData: ModifyData,
        selectedChat: SelectedChat
    }

    type SendMessageToBot = {
        messagesAi: MessagesAi[],
        modifyData: ModifyData,
        chats: Chats, setChats: Dispatch<SetStateAction<Chats>>,
        selectedChat: SelectedChat
    }

    type UpdateConvo = {
        chat: Chat,
        newMessage: MessagesUi,
        newMessageAi: MessagesAi
    }
}

// PROPS VALUES
declare global {
    type ChatBotValues = {

        // BOOLEANS
        isNewChat: boolean, setIsNewChat: Dispatch<SetStateAction<boolean>>
        isConvoLoading: boolean, setIsConvoLoading: Dispatch<SetStateAction<boolean>>,
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