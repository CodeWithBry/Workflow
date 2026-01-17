import { useContext, useEffect, useState, type Dispatch, type SetStateAction } from 'react';
import s from "./styles.module.css";
import Result from './Result';
import useDebounce from '../../../../../../../../../hooks/useDebounce';
import { searchConvo } from '../../../utils/searchConvo';
import { context } from '../../../../../../../../context/AppContext';
import Button from '../../../../../../../../../components/ui/Button';

function ConvoList({ showConvoLists, setShowConvoLists }: {showConvoLists: boolean, setShowConvoLists: Dispatch<SetStateAction<boolean>>}) {
    const { darkMode, convoLists } = useContext(context) as Context;
    const [searchInput, setSearchInput] = useState<string>("");
    const [results, setResults] = useState<ConvoList[]>([]);
    const debounceValue = useDebounce(searchInput, 500);

    useEffect(() => {
        if (!debounceValue.trim()) {
            setResults(convoLists);
            return;
        }

        searchConvo(convoLists, debounceValue, setSearchInput, setResults);
    }, [debounceValue]);

    useEffect(() => {
        setResults([...convoLists]);
    }, [showConvoLists])

    return (
        <div className={!darkMode ? `${s.searchContainer} ${!showConvoLists && s.hideSearch}` : `${s.searchContainer} ${s.dark} ${!showConvoLists && s.hideSearch}`}>
            <div className={s.searchBox}>
                <h2>
                    History
                    <Button
                        className={s.closeButton}
                        iconElement={<i className='fa fa-close'></i>}
                        clickListener={() => { setSearchInput(""), setShowConvoLists(false) }} />
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
                            ? results.map(convo =>
                                <Result convo={convo}
                                    setShowSearchBox={setShowConvoLists} />
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

export default ConvoList