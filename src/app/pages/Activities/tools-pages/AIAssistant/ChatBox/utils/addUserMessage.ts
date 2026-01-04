import { saveChat } from "./saveChat";
import { sendMessageToBot } from "./sendMessageToBot"
import { updateConvo } from "./updateConvo";

export async function addUserMessage(args: AddUserMessage) {
    const {
        element, inputRefText, chat, 
        pseudoConvo, send, modifyData, 
        setChat, setIsNewChat
    } = args as AddUserMessage;
    const newMessageAi: MessagesAi = {
        role: "user",
        parts: [
            { text: inputRefText }
        ]
    }
    const newMessage: MessagesUi = {
        role: "user",
        message: inputRefText
    }

    if ((inputRefText.length != 0 && element?.key == "Enter") || (inputRefText.length != 0 && send)) {
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
        await sendMessageToBot({ ...args, messagesAi: findOpenedConvo.messagesAi, modifyData })
    }

}

