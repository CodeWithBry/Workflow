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


// export async function sendMessageToBot({
//     setChat,
//     messagesAi,
//     modifyData
// }: SendMessageToBot) {

//     const response = await fetch("http://localhost:3000/server/ai-chat-stream", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ messagesAi, modifyData })
//     });

//     if (!response.body) return;

//     const reader = response.body.getReader();
//     const decoder = new TextDecoder();

//     // 1️⃣ Create an EMPTY model message first
//     let streamedText = "";

//     const tempMessage: MessagesUi = {
//         role: "model",
//         message: ""
//     };

//     const tempMessageAi: MessagesAi = {
//         role: "model",
//         parts: [{ text: "" }]
//     };

//     // Add placeholder message immediately
//     setChat(prev => {
//         const updatedConvos = updateConvo({
//             chat: prev,
//             newMessage: tempMessage,
//             newMessageAi: tempMessageAi
//         });
//         return { ...prev, convos: updatedConvos };
//     });

//     // 2️⃣ Stream loop
//     while (true) {
//         const { value, done } = await reader.read();
//         if (done) break;

//         const chunk = decoder.decode(value);
//         const lines = chunk.split("\n\n");

//         for (const line of lines) {
//             if (!line.startsWith("data: ")) continue;

//             const data = line.replace("data: ", "").trim();

//             streamedText += JSON.parse(data);

//             // 3️⃣ Update the LAST message only
//             setChat(prev => {
//                 const convos = [...prev.convos];
//                 const last = convos[convos.length - 1];

//                 last.messagesUi[last.messagesUi.length - 1] = {
//                     role: "model",
//                     message: streamedText
//                 };

//                 last.messagesAi[last.messagesAi.length - 1] = {
//                     role: "model",
//                     parts: [{ text: streamedText }]
//                 };

//                 if (data === "[DONE]") {
//                     // final save
//                     saveChat({ ...prev, convos });
//                 }

//                 return { ...prev, convos };
//             });
//         }
//     }
// }