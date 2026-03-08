import { sendMessageToBot } from "./sendMessageToBot"
import { updateConvo } from "./updateConvo";

export async function addUserMessage(args: AddUserMessage) {
    const {
        element, inputRefText, chatLists,
        pseudoConvo, send, modifyData,
        selectedConvo, userId, setSelectedConvo, setIsNewChat,
        setConvoLists, setPauseEffect, setChatLists,
        setIsFailedToSend, setIsThinking
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
        message: inputRefText,
        attachments: modifyData.task ? [{ ...modifyData.task, kind: "task" }] : []
    }
    if ((inputRefText.length != 0 && element?.key == "Enter") || (inputRefText.length != 0 && send)) {
        setPauseEffect(true);
        const findInChat: ChatList | undefined = chatLists.find(chat => chat.isOpen);
        if (findInChat) {
            const findInConvo: ConvoList | undefined = findInChat.convoLists.find(convo => convo.convoId == selectedConvo?.convoId);
            console.log(selectedConvo, findInChat.convoLists)
            if (!findInConvo) { //checks if it is a new chat or not
                if (setIsNewChat) setIsNewChat(false);
                const updatedChat: ChatList = { //updated the opened chat list and add the first convo if there is no convo.
                    ...findInChat,
                    convoLists: [dummyConvo, ...findInChat.convoLists]
                }
                const updatedChatLists: ChatList[] = chatLists.map((chat) => {
                    if (chat.id == updatedChat.id) return { ...updatedChat, isOpen: true };
                    return chat
                })
                const getUpdatedConvo = updateConvo({ chatInfo: updatedChat, newMessage, newMessageAi, selectedConvo: pseudoConvo, userId, setSelectedConvo });
                setConvoLists([...updatedChat.convoLists]);
                setChatLists(prev => prev.map((chatInfo) => {
                    if(chatInfo.id == findInChat.id) {
                        return updatedChat;
                    }

                    return chatInfo;
                }))
                if (getUpdatedConvo) {
                    try {
                        await sendMessageToBot(userId, updatedChat, getUpdatedConvo, setSelectedConvo, getUpdatedConvo.messagesAi, modifyData, setPauseEffect, setConvoLists, true, setChatLists, updatedChatLists, setIsThinking);
                    } catch (error) {
                        if (error instanceof Error) setIsFailedToSend(true);
                    }
                }
            }

            // If there is already an existing convo -> continue this convo
            else {
                const getUpdatedConvo = updateConvo({ chatInfo: findInChat, newMessage, newMessageAi, selectedConvo, userId, setSelectedConvo });
                if (getUpdatedConvo) {
                    setSelectedConvo({ ...getUpdatedConvo });
                    try {
                        await sendMessageToBot(userId, findInChat, getUpdatedConvo, setSelectedConvo, getUpdatedConvo.messagesAi, modifyData, setPauseEffect, setConvoLists, true, setChatLists, chatLists, setIsThinking);
                    } catch (error) {
                        const message =
                            error instanceof Error ? error.message : "Unknown error occurred";

                        setSelectedConvo(prev => {
                            if (!prev) return undefined;

                            return {
                                ...prev,
                                messagesUi: [
                                    ...prev.messagesUi,
                                    { role: "model", message: `Error Occured: ${message}` }
                                ]
                            };
                        });

                    } finally {
                        setIsThinking(false);
                        setPauseEffect(false);
                    }
                }
            }
        }
    }
}