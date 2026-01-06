import type { Dispatch, SetStateAction } from "react"

type UpdateChat = {
    project: TaskClass,
    setChats: Dispatch<SetStateAction<Chats>>,
    locStor: UseLocaleStorage
}

export function updateChat({ project, setChats, locStor }: UpdateChat) {
    setChats(prev => {
        const updatedChats = prev.filter(chat => chat.id != project.id)
        locStor.saveDataToLocalStorage({
            taskType: "",
            valueFor: "chats",
            chats: updatedChats,
        })
        return updatedChats
    });

}