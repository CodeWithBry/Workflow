import type { Dispatch, SetStateAction } from "react";

// PROPS FOR COMPONENTS
declare global {
    type ConvoProps = ChatBotValues
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
        dataForServer: MessageForServer[],
        messagesUi: MessageForUi[]
    }

    type SelectedConvo = Convo | null
    
    type MessageForServer = {
        role: "user" | "model",
        parts: TextForMessage[]
    }

    type TextForMessage = {
        text: string
    }

    type MessageForUi = {
        role: "user" | "model",
        message: string 
    }
}

// PROPS VALUES
declare global {
    type ChatBotValues = {

        // BOOLEANS
        // STRINGS
        userInput: string, setUserInput: Dispatch<SetStateAction<string>>,
        // OBJECTS AND ARRAYS
        chat: Chat, setChat: Dispatch<SetStateAction<Chat>>,
        selectedConvo: SelectedConvo
    }
}

export { };