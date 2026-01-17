import { saveConvoData } from "../../../../../../../lib/firebase"

export function updateConvo({ chatInfo, newMessage, newMessageAi, selectedConvo, userId, setSelectedConvo }: UpdateConvo): Convo | undefined {
    const updatedConvoList: ConvoList | undefined = chatInfo.convoLists.find(convo => convo.convoId == selectedConvo?.convoId);
    if(!updatedConvoList) return undefined;

    if (selectedConvo) {
        const updatedConvo: SelectedConvo = {
            isOpen: false,
            convoId: updatedConvoList.convoId,
            messagesUi: [...selectedConvo.messagesUi, newMessage],
            messagesAi: [...selectedConvo.messagesAi, newMessageAi],
            title: selectedConvo.title
        }
        setSelectedConvo({...updatedConvo});
        // saveConvoData(userId, chatInfo.id, updatedConvoList.convoId, updatedConvo);
        console.log(updatedConvo)
        return updatedConvo;
    } else if (!selectedConvo) {
        const updatedConvo: SelectedConvo = {
            isOpen: true,
            convoId: updatedConvoList.convoId,
            messagesUi: [newMessage],
            messagesAi: [newMessageAi]
        }
        setSelectedConvo({...updatedConvo});
        console.log("NO CONVO!")
        saveConvoData(userId, chatInfo.id, updatedConvoList.convoId, updatedConvo);
        return updatedConvo;
    }

    return undefined;
}