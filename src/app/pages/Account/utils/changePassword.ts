import {
    EmailAuthProvider,
    reauthenticateWithCredential,
    updatePassword
} from "firebase/auth";
import { auth } from "../../../../lib/firebase";
import type { Dispatch, SetStateAction } from "react";

export async function changePasswordWithReauth(
    currentPassword: string,
    newPassword: string,
    setIsLoading: Dispatch<SetStateAction<boolean>>
): Promise<void> {
    const user = auth.currentUser;
    setIsLoading(true);
    if (!user || !user.email) {
        setIsLoading(false);
        throw new Error("No authenticated user found.");
    }

    try {
        // Create credential
        const credential = EmailAuthProvider.credential(
            user.email,
            currentPassword
        );

        // Reauthenticate user
        await reauthenticateWithCredential(user, credential);

        // Update password
        await updatePassword(user, newPassword);

        setIsLoading(false);
        alert("Change Password Successfully");
    } catch (error: any) {
        setIsLoading(false);
        console.error("Error updating password:", error.message);
        throw error;
    }
}