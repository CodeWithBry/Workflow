import type { Dispatch, SetStateAction } from "react";
import { URL_API } from "./sendMessageToBot";
import { updateChatList } from "../../../../../../../lib/firebase";

export async function generateTitleForConvo(
    setChatLists: Dispatch<SetStateAction<ChatList[]>>,
    setConvoLists: Dispatch<SetStateAction<ConvoList[]>>,
    convoLists: ConvoList[],
    updatedConvo: Convo,
    userId: string,
    updatedChatLists: ChatList[]
): Promise<string> {
    const response = await fetch(`${URL_API}/generate-title`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messagesAi: updatedConvo.messagesUi }),
    });
    const generatedTitle: string = (await response.json()).title;
    const updatePrevConvoLists: ConvoList[] = convoLists.map((convo) => {
        if(convo.isOpen) return {...convo, title: generatedTitle};
        return convo
    }) 
    const updatePrevChatLists: ChatList[] = updatedChatLists.map((chat) => {
        if(chat.isOpen) return {...chat, isOpen: true, convoLists: [...updatePrevConvoLists]}
        return chat;
    })
    // const findOpenedChat = updatePrevChatLists.find(chat => chat.isOpen);

    // Update convo lists and chat lists
    setConvoLists([...updatePrevConvoLists]);
    setChatLists([...updatePrevChatLists]);

    // Update Chat List from the firestore
    await updateChatList(userId, updatePrevChatLists);
    
    // RETURN the generated title
    return generatedTitle;
}