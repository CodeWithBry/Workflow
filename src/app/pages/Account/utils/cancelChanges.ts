import type { Dispatch, SetStateAction } from "react";
import { getDataFromFirestore } from "../../../../lib/firebase";

export default async function cancelChanges(userId: string, setUserInfo: Dispatch<SetStateAction<UserInfo | null>>) {
    try {
        const getUserData = await getDataFromFirestore(userId);
        const userData = getUserData.user;
        setUserInfo({...userData});
    } catch (error) {
        console.log(error)
    }
}