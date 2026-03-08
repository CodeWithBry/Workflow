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
    selectedConvo: SelectedConvo,           // snapshot at call-time (user message already appended)
    setSelectedConvo: Dispatch<SetStateAction<SelectedConvo>>,
    messagesAi: MessagesAi[],
    modifyData: ModifyData,
    setPauseEffect: Dispatch<SetStateAction<boolean>>,
    setConvoLists: Dispatch<SetStateAction<ConvoList[]>>,
    allowGenerateTitle: boolean,
    setChatLists: Dispatch<SetStateAction<ChatList[]>>,
    updatedChatLists: ChatList[],
    setIsThinking: Dispatch<SetStateAction<boolean>>,
) {
    if (!setSelectedConvo || !selectedConvo) return (selectedConvo);

    try {
        const response = await fetch(`${URL_API}/ai-chat`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ messagesAi, modifyData }),
        })

        if (!response.status) {
            setSelectedConvo(prev => {
                if (!prev) return undefined;

                return {
                    ...prev,
                    messagesUi: [
                        ...prev.messagesUi,
                        { role: "model", message: `Error Occured: Quota Limit Reached!` }
                    ]
                };
            });
        }

        if (!response.body) return console.log("RETURNED!");

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let streamedText = "";

        // ── 1. Insert an empty placeholder at the end of the live state ───────
        // Use a functional updater so we always append to whatever React currently
        // holds — not to the stale `selectedConvo` snapshot argument.
        setSelectedConvo(prev => {
            if (!prev) return undefined;
            return {
                ...prev,
                messagesAi: [...prev.messagesAi, { role: "model", parts: [{ text: "" }] }],
                messagesUi: [...prev.messagesUi, { role: "model", message: "" }],
            };
        });

        // ── 2. Stream: patch only the last message in live state ─────────────
        while (true) {
            const { done, value } = await reader.read();
            setIsThinking(false);
            if (done) break;

            streamedText += decoder.decode(value, { stream: true });

            // ✅ FIX: functional updater — always reads current state, never stale
            setSelectedConvo(prev => {
                if (!prev) return undefined;
                const messagesUi = prev.messagesUi.map((msg, i) =>
                    i === prev.messagesUi.length - 1
                        ? { ...msg, message: streamedText }
                        : msg
                );
                return { ...prev, messagesUi };
            });
        }

        // ── 3. Final commit ───────────────────────────────────────────────────
        // Build the canonical final convo from the call-time snapshot
        // (which already has the user message) + the completed AI reply.
        // Then apply it via a functional updater so we don't race with the
        // last streaming setter.
        const finalAi: MessagesAi = { role: "model", parts: [{ text: streamedText }] };
        const finalUi: MessagesUi = { role: "model", message: streamedText };

        // Reconstruct from the snapshot so messagesAi stays consistent
        // (streaming only updated messagesUi, not messagesAi).
        const committedConvo: Convo = {
            ...selectedConvo,
            messagesAi: [...selectedConvo.messagesAi, finalAi],
            messagesUi: [...selectedConvo.messagesUi, finalUi],
        };

        const generatedTitle = allowGenerateTitle
            ? await generateTitleForConvo(
                setChatLists, setConvoLists,
                chatList.convoLists, committedConvo,
                userId, updatedChatLists,
            )
            : null;

        const finalConvo: Convo = {
            ...committedConvo,
            title: generatedTitle ?? committedConvo.title,
        };

        // ✅ FIX: functional updater — guaranteed to apply on top of the last
        // streaming update rather than overwriting it with a stale snapshot.
        setSelectedConvo(prev => {
            if (!prev) return undefined;
            // Preserve anything the streaming loop wrote (e.g. partial renders),
            // but replace the last message with the fully committed text.
            const messagesUi = prev.messagesUi.map((msg, i) =>
                i === prev.messagesUi.length - 1 ? finalUi : msg
            );
            return { ...finalConvo, messagesUi };
        });

        await saveConvoData(userId, chatList.id, finalConvo.convoId, finalConvo);

        setPauseEffect(false);
    } catch (error) {
        const message =
            error instanceof Error ? error.message : "Unknown error occurred";

        setSelectedConvo(prev => {
            if (!prev) return undefined;

            return {
                ...prev,
                messagesUi: [
                    ...prev.messagesUi,
                    { role: "model", message: `Error Occured: Server error, ${message}` }
                ]
            };
        });

    } finally {
        setIsThinking(false);
        setPauseEffect(false);
    }
}