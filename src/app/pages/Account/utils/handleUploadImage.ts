import type { ChangeEvent, Dispatch, SetStateAction } from "react";
import uploadFile from "../../../../lib/cloudinary";
import type { CloudinaryResponseType } from "../types/cloudinaryResponseType";
import { URL_API } from "../../Activities/tools-pages/AIAssistant/ChatBox/utils/sendMessageToBot";
import { saveUserData } from "../../../../lib/firebase";

export async function handleUploadImage(
    element: ChangeEvent<HTMLInputElement>,
    userInfo: UserInfo | null,
    setUserInfo: Dispatch<SetStateAction<UserInfo | null>>,
    setIsLoading: Dispatch<SetStateAction<boolean>>) {
    if (!element.target.files || !userInfo) return;
    setIsLoading(true);
    if (userInfo.photoData) {
        const photoData = userInfo.photoData;
        try {
            await fetch(
                URL_API + "/deleteImage",
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ folder: photoData.asset_folder, fileName: photoData.display_name }),
                }
            );
        } catch (error) {
            alert(error);
            setIsLoading(false);
        }
    }
    const getFile = element.target.files[0];
    const getUploadedFile = await uploadFile(getFile) as CloudinaryResponseType;
    const updateUserInfo: UserInfo | null = { ...userInfo, photoData: getUploadedFile };
    saveUserData(userInfo.userId, updateUserInfo);
    setUserInfo({ ...updateUserInfo });
    setIsLoading(false);
}