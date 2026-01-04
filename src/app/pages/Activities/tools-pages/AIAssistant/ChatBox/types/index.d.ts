import type { Dispatch, ReactNode, SetStateAction } from "react";

// PROPS FOR COMPONENTS
declare global {
    type ConvoProps = ChatBotValues & MessageBoxValues
}

// VARIABLES
declare global {
    type Chat = {
        userId: string,
        convos: Convo[]
    }

    type Convo = {
        isOpened: boolean,
        convoId: string,
        messagesAi: MessagesAi[],
        messagesUi: MessagesUi[]
    }

    type SelectedConvo = Convo | null

    type MessagesAi = {
        role: "user" | "model",
        parts: TextForMessage[]
    }

    type TextForMessage = {
        text: string
    }

    type MessagesUi = {
        role: "user" | "model",
        message: string
    }
}

// FUNCTIONS
declare global {
    type HandleInput = {
        element: KeyboardEvent<HTMLInputElement>,
        chat: Chat, setChat: Dispatch<SetStateAction<Chat>>
    }

    type AddUserMessage = {
        element?: KeyboardEvent<HTMLInputElement>,
        inputRefText: string 
        pseudoConvo?: Convo,
        send?: boolean,
        setIsNewChat?: Dispatch<SetStateAction<boolean>>,
        chat: Chat, setChat: Dispatch<SetStateAction<Chat>>,
        modifyData: ModifyData
    }

    type SendMessageToBot = {
        messagesAi: MessagesAi[],
        modifyData: ModifyData,
        chat: Chat, setChat: Dispatch<SetStateAction<Chat>>
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
        chat: Chat, setChat: Dispatch<SetStateAction<Chat>>,
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