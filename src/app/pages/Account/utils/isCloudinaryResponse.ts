import type { CloudinaryResponseType } from "../types/cloudinaryResponseType";

export function isCloudinaryResponse(obj: any): obj is CloudinaryResponseType {
    return obj && typeof obj.secure_url === "string";
}