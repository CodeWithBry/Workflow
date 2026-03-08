import type { Dispatch, SetStateAction } from "react";
import { getConvoData } from "../../../../../../../lib/firebase";

export async function getConvo(
    userId: string,
    chatId: string,
    convoId: string,
    setSelectedConvo: Dispatch<SetStateAction<SelectedConvo>>
) { 
    const getData = (await getConvoData(userId, chatId, convoId)) as Convo;
    setSelectedConvo(getData);  
}