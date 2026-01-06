import { saveChat } from "./saveChat";
import { sendMessageToBot } from "./sendMessageToBot"
import { updateConvo } from "./updateConvo";

export async function addUserMessage(args: AddUserMessage) {
    const {
        element, inputRefText, chats,
        selectedChat,
        pseudoConvo, send, modifyData,
        setChats, setIsNewChat
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
        if (setIsNewChat) setIsNewChat(true);
        console.log(selectedChat)
        const findInChat: Chat | undefined = chats.find(chat => chat.id == selectedChat?.id)
        if (!findInChat) return;

        const updatedChat = { ...findInChat, convos: pseudoConvo ? [...findInChat.convos, pseudoConvo] : [...findInChat.convos] }
        // const updatedChats: Chats = chats.map((chat) => {
        //     return chat.id == selectedChat?.id ? {
        //         ...selectedChat
        //     } : chat
        // })

        const updatedConvos: Convo[] = updateConvo({ chat: updatedChat, newMessage, newMessageAi });
        const findOpenedConvo: Convo | undefined = updatedConvos.find(c => c.isOpened);

        if (!findOpenedConvo) return
        const updatedChats = chats.map((chat) => {
            if (chat.id == selectedChat?.id) {
                return { ...chat, convos: updatedConvos };
            }

            return chat
        })
        const newSelectedChat = updatedChats.find(chat => chat.isOpen)
        setChats(prev => {
            const updatedChats = prev.map((chat) => {
                if (chat.id == selectedChat?.id) {
                    return { ...chat, convos: updatedConvos };
                }

                return chat
            })
            
            saveChat(updatedChats);
            return updatedChats
        })
        await sendMessageToBot({ ...args, selectedChat: newSelectedChat, messagesAi: findOpenedConvo.messagesAi, modifyData })
    }

}

