export function saveChat(chat: Chat) {
    const stringifyChat = JSON.stringify(chat);
    localStorage.setItem("chat", stringifyChat);
}