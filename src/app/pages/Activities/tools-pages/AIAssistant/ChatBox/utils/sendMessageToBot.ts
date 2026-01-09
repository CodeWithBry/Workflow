import { saveChat } from "./saveChat";
import { updateConvo } from "./updateConvo";

export const URL_API =
    import.meta.env.MODE === "development"
        ? "http://localhost:3000/server"
        : "https://spread-m5ja.onrender.com/server";

export async function sendMessageToBot({
    setChats,
    messagesAi,
    modifyData,
    selectedChat,
}: SendMessageToBot) {
    if (!selectedChat) return;

    const response = await fetch(`${URL_API}/ai-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messagesAi, modifyData }),
    });

    if (!response.body) return;

    const reader = response.body.getReader();
    const decoder = new TextDecoder();

    let streamedText = "";

    // 🔹 placeholder messages (TYPE SAFE)
    const placeholderUi: MessagesUi = {
        role: "model",
        message: "",
    };

    const placeholderAi: MessagesAi = {
        role: "model",
        parts: [{ text: "" }],
    };

    // 1️⃣ Insert placeholder into the ACTIVE convo using updateConvo
    setChats(prev =>
        prev.map(chat => {
            if (chat.id !== selectedChat.id) return chat;

            const updatedConvos = updateConvo({
                chat: selectedChat,
                newMessage: placeholderUi,
                newMessageAi: placeholderAi,
            });

            return {
                ...chat,
                convos: updatedConvos,
            };
        })
    );

    // 2️⃣ Streaming UI updates (only messagesUi)
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        streamedText += chunk;

        setChats(prev =>
            prev.map(chat => {
                if (chat.id !== selectedChat.id) return chat;

                const updatedConvos = chat.convos.map((convo) => {
                    if (!convo.isOpened) return convo;

                    const messagesUi = convo.messagesUi.map((msg, i) =>
                        i === convo.messagesUi.length - 1
                            ? { ...msg, message: streamedText }
                            : msg
                    );

                    return { ...convo, messagesUi };
                });

                return { ...chat, convos: updatedConvos };
            })
        );
    }

    // 3️⃣ FINAL COMMIT → update BOTH Ui + Ai using updateConvo + save
    setChats(prev =>
        prev.map(chat => {
            if (chat.id !== selectedChat.id) return chat;

            const finalUi: MessagesUi = { role: "model", message: streamedText };
            const finalAi: MessagesAi = { role: "model", parts: [{ text: streamedText }] };

            const updatedConvos = updateConvo({
                chat: selectedChat,
                newMessage: finalUi,
                newMessageAi: finalAi,
            });

            const updatedChat = { ...chat, convos: updatedConvos };

            saveChat(
                prev.map(c => (c.id === updatedChat.id ? updatedChat : c))
            );

            return updatedChat;
        })
    );
}
