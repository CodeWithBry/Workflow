import type { Dispatch, SetStateAction } from "react";

export function searchConvo(
    convoLists: ConvoList[],
    searchInput: string,
    setSearchInput: Dispatch<SetStateAction<string>>,
    setResults: Dispatch<SetStateAction<ConvoList[]>>
) {
    if (searchInput == "") {
        setSearchInput('');
        console.log(convoLists)
        setResults([...convoLists]);
        return [];
    };

    if (!convoLists) return [];
    const filterConvoList = convoLists.filter(t => t.title?.includes(searchInput));
    console.log(filterConvoList)
    setResults([...filterConvoList]);
}