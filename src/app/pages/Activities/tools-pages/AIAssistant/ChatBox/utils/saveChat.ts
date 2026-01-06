export function saveChat(chats: Chats) {
    const stringifyChat = JSON.stringify(chats);
    localStorage.setItem("chats", stringifyChat);
}