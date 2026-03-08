import type { Dispatch, SetStateAction } from "react";

export function searchMess(
    bookMarkMess: MessagesUi[],
    searchInput: string,
    setSearchInput: Dispatch<SetStateAction<string>>,
    setResults: Dispatch<SetStateAction<MessagesUi[]>>
) {
    if (searchInput == "") {
        setSearchInput('');
        setResults([...bookMarkMess]);
        return [];
    };

    if (!bookMarkMess) return [];
    const filterConvoList = bookMarkMess.filter(t => t.message?.includes(searchInput));
    setResults([...filterConvoList]);
}