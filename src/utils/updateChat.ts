import type { Dispatch, SetStateAction } from "react"

type UpdateChat = {
    project: TaskClass,
    setChats: Dispatch<SetStateAction<ChatList[]>>,
}

export function updateChat({ project, setChats }: UpdateChat) {
    setChats(prev => {
        const updatedChats = prev.filter(chat => chat.id != project.id)
        return updatedChats
    });
}