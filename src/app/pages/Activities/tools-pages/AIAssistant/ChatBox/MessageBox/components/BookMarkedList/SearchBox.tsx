import { useContext, useEffect, useState } from 'react';
import s from "./styles.module.css";
import Result from './Result';
import useDebounce from '../../../../../../../../../hooks/useDebounce';
import { context } from '../../../../../../../../context/AppContext';
import Button from '../../../../../../../../../components/ui/Button';
import { searchMess } from '../../../utils/searchMess';

function BookMarkList({ showBookMarkLists, setShowBookMarkLists, chatBotValues }: PropsForBookMarkList) {
    const { darkMode } = useContext(context) as Context;
    const [searchInput, setSearchInput] = useState<string>("");
    const [results, setResults] = useState<MessagesUi[]>([]);
    const debounceValue = useDebounce(searchInput, 500);

    useEffect(() => {
        if (!debounceValue.trim()) {
            setResults(chatBotValues.bookMarkedMess);
            return;
        }

        searchMess(chatBotValues.bookMarkedMess, debounceValue, setSearchInput, setResults);
    }, [debounceValue]);

    useEffect(() => {
        setResults([...chatBotValues.bookMarkedMess]);
    }, [showBookMarkLists])

    return (
        <div className={!darkMode ? `${s.searchContainer} ${!showBookMarkLists && s.hideSearch}` : `${s.searchContainer} ${s.dark} ${!showBookMarkLists && s.hideSearch}`}>
            <div className={s.searchBox}>
                <h2>
                    Book Mark List
                    <Button
                        className={s.closeButton}
                        iconElement={<i className='fa fa-close'></i>}
                        clickListener={() => { setSearchInput(""), setShowBookMarkLists(false) }} />
                </h2>
                <label className={s.searchWrapper}>
                    <i className='fas fa-search'></i>
                    <input
                        type="text"
                        placeholder='Search from projects'
                        value={searchInput}
                        onChange={e => {
                            setSearchInput(e.target.value)
                        }}
                    />
                </label>
                <div className={s.resultsContainer}>
                    {
                        results.length != 0
                            ? results.map(mess =>
                                <Result mess={mess}
                                    setShowSearchBox={setShowBookMarkLists}
                                    setSelectedBookMarkId={chatBotValues.setSelectedBookMarkId} />
                            )
                            : <div className={s.noResults}>
                                <h3>No Results Founded!</h3>
                            </div>
                    }
                </div>
            </div>
        </div>
    )
}

export default BookMarkList