import type { Dispatch, SetStateAction } from "react";
import { getConvoData } from "../../../../../../../lib/firebase";

export async function getConvo(
    userId: string,
    chatId: string,
    convoId: string,
    setSelectedConvo: Dispatch<SetStateAction<SelectedConvo>>
) {
    const getData = (await getConvoData(userId, chatId, convoId)) as Convo;
    console.log("sa")
    const updateMessagesUi = getData.messagesUi.map((mess) => {
        return mess.messId ? mess : { ...mess, messId: "c" + crypto.randomUUID() }
    })
    setSelectedConvo({ ...getData, messagesUi: updateMessagesUi });
}