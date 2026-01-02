import { saveChat } from "./saveChat";
import { sendMessageToBot } from "./sendMessageToBot"
import { updateConvo } from "./updateConvo";

export async function addUserMessage(args: AddUserMessage) {
    const {
        element, userInput, chat, 
        pseudoConvo, send, modifyData,
        setUserInput, setChat,
        setIsNewChat
    } = args as AddUserMessage;
    const newMessageAi: MessagesAi = {
        role: "user",
        parts: [
            { text: userInput }
        ]
    }
    const newMessage: MessagesUi = {
        role: "user",
        message: userInput
    }

    if ((userInput.length != 0 && element.key == "Enter") || (userInput.length != 0 && send)) {
        if(setIsNewChat) setIsNewChat(true);
        const updatedChat: Chat = {
            ...chat,
            convos: pseudoConvo ? [...chat.convos, pseudoConvo] : [...chat.convos]
        }

        const updatedConvos: Convo[] = updateConvo({ chat: updatedChat, newMessage, newMessageAi });
        const findOpenedConvo: Convo | undefined = updatedConvos.find(c => c.isOpened);
        if (!findOpenedConvo) return

        setChat(prev => {
            saveChat({ ...prev, convos: updatedConvos });
            return { ...prev, convos: updatedConvos };
        });
        setUserInput("");
        await sendMessageToBot({ ...args, messagesAi: findOpenedConvo.messagesAi, modifyData })
    }

}

