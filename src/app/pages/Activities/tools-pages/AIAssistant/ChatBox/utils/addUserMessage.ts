import { sendMessageToBot } from "./sendMessageToBot"
import { updateConvo } from "./updateConvo";

export async function addUserMessage(args: AddUserMessage) {
    const {
        element, inputRefText, chatLists,
        pseudoConvo, send, modifyData,
        selectedConvo, userId, setSelectedConvo, setIsNewChat,
        setConvoLists, setPauseEffect, setChatLists
    } = args as AddUserMessage;
    const dummyConvo: ConvoList = {
        isOpen: true,
        convoId: pseudoConvo ? pseudoConvo?.convoId : "",
        title: ""
    }

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
        setPauseEffect(true);
        const findInChat: ChatList | undefined = chatLists.find(chat => chat.isOpen);
        if (findInChat) {
            const findInConvo: ConvoList | undefined = findInChat.convoLists.find(convo => convo.convoId == selectedConvo?.convoId);
            
            if (!findInConvo) { //checks if it is a new chat or not
                const updatedChat: ChatList = { //updated the opened chat list and add the first convo if there is no convo.
                    ...findInChat,
                    convoLists: [dummyConvo, ...findInChat.convoLists]
                }
                const updatedChatLists: ChatList[] = chatLists.map((chat) => {
                    if(chat.id == updatedChat.id) return {...updatedChat, isOpen: true};
                    return chat
                })
                const getUpdatedConvo = updateConvo({ chatInfo: updatedChat, newMessage, newMessageAi, selectedConvo: pseudoConvo, userId, setSelectedConvo });
                setConvoLists([...updatedChat.convoLists]);
                if(getUpdatedConvo) await sendMessageToBot(userId, updatedChat, getUpdatedConvo, setSelectedConvo, getUpdatedConvo.messagesAi, modifyData, setPauseEffect, setConvoLists, true, setChatLists, updatedChatLists);
            } 
            else {
                const getUpdatedConvo = updateConvo({ chatInfo: findInChat, newMessage, newMessageAi, selectedConvo, userId, setSelectedConvo });
                console.log(getUpdatedConvo)
                if(getUpdatedConvo) await sendMessageToBot(userId, findInChat, getUpdatedConvo, setSelectedConvo, getUpdatedConvo.messagesAi, modifyData, setPauseEffect, setConvoLists, false, setChatLists, chatLists);
            }
        }
    }
}