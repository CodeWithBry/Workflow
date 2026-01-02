export function updateConvo({chat, newMessage, newMessageAi}: UpdateConvo): Convo[] {
    const updatedConvos: Convo[] = chat.convos.map((convo) => {
        if (convo.isOpened) {
            const updateConvo: Convo = {
                ...convo,
                messagesUi: [...convo.messagesUi, newMessage],
                messagesAi: [...convo.messagesAi, newMessageAi]
            }

            return { ...updateConvo }
        }

        return convo
    })

    return updatedConvos
}