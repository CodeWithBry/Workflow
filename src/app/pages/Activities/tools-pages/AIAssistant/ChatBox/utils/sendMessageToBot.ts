import { saveChat } from "./saveChat";
import { updateConvo } from "./updateConvo";

export async function sendMessageToBot({
    setChat, messagesAi, modifyData
}: SendMessageToBot) {
    const apiEndPoint = "/server/ai-chat";
    const response = await fetch(`http://localhost:3000${apiEndPoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messagesAi, modifyData }),
    });
    const getResponse = await response.json();
    const newMessageAi: MessagesAi = {
        role: "model",
        parts: [
            { text: getResponse.reply }
        ]
    }
    const newMessage: MessagesUi = {
        role: "model",
        message: getResponse.reply
    }

    setChat(prev => {
        const updatedConvos: Convo[] = updateConvo({chat: prev, newMessage, newMessageAi});
        saveChat({ ...prev, convos: updatedConvos });
        return {...prev, convos: [...updatedConvos]}
    });
}

