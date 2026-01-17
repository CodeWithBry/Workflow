import type { Dispatch, SetStateAction } from "react";
import { saveConvoData } from "../../../../../../../lib/firebase";
import { generateTitleForConvo } from "./generateTitleForConvo";

export const URL_API =
    import.meta.env.MODE === "development"
        ? "http://localhost:3000/server"
        : "https://workflow-cqg2.onrender.com/server";

export async function sendMessageToBot(
    userId: string,
    chatList: ChatList,
    selectedConvo: SelectedConvo,
    setSelectedConvo: Dispatch<SetStateAction<SelectedConvo>>,
    messagesAi: MessagesAi[],
    modifyData: ModifyData,
    setPauseEffect: Dispatch<SetStateAction<boolean>>,
    setConvoLists: Dispatch<SetStateAction<ConvoList[]>>,
    allowGenerateTitle: boolean,
    setChatLists: Dispatch<SetStateAction<ChatList[]>>,
    updatedChatLists: ChatList[]
) {
    if (!setSelectedConvo || !selectedConvo) return;

    const response = await fetch(`${URL_API}/ai-chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messagesAi, modifyData }),
    });

    if (!response.body) return console.log("RETURNED!");

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

    console.log(selectedConvo)
    // 1️⃣ Insert placeholder into the ACTIVE convo using updateConvo
    setSelectedConvo(prev => {
        if (!prev) return undefined
        const updatedConvo: Convo = {
            ...prev,
            messagesAi: [...selectedConvo.messagesAi, placeholderAi],
            messagesUi: [...selectedConvo.messagesUi, placeholderUi]
        }

        if (updatedConvo) return updatedConvo
    })


    // 2️⃣ Streaming UI updates (only messagesUi)
    while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const chunk = decoder.decode(value, { stream: true });
        streamedText += chunk;

        setSelectedConvo(prev => {
            if (!prev) return undefined;
            const messagesUi = prev.messagesUi.map((msg, i) =>
                i === prev.messagesUi.length - 1
                    ? { ...msg, message: streamedText }
                    : msg
            )

            return { ...prev, messagesUi };
        })
    }

    const finalUi: MessagesUi = { role: "model", message: streamedText };
    const finalAi: MessagesAi = { role: "model", parts: [{ text: streamedText }] };
    const updatedConvo: Convo = {
        ...selectedConvo,
        messagesAi: [...selectedConvo.messagesAi, finalAi],
        messagesUi: [...selectedConvo.messagesUi, finalUi]
    }
    const generateTitle = allowGenerateTitle ? await generateTitleForConvo(setChatLists, setConvoLists, chatList.convoLists, updatedConvo, userId, updatedChatLists) : null;
    const updateSelectedConvo = { ...updatedConvo, title: generateTitle ? generateTitle : updatedConvo.title};
    await saveConvoData(userId, chatList.id, updateSelectedConvo.convoId, updateSelectedConvo);
    // 3️⃣ FINAL COMMIT → update BOTH Ui + Ai using updateConvo with title + save
    setSelectedConvo(prev => {
        if (!prev) return undefined;
        return updateSelectedConvo
    });

    setPauseEffect(false);
}
