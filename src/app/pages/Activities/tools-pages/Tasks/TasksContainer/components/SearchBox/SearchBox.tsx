import { useContext, useEffect, useState } from 'react';
import useDebounce from '../../../../../../../../hooks/useDebounce';
import s from "./styles.module.css";
import Result from './Result';
import Button from '../../../../../../../../components/ui/Button';
import { context } from '../../../../../../../context/AppContext';
import searchTask from '../../utils/searchTask';

function SearchBox({ showSearchBox, setShowSearchBox }: TaskContainerValues) {
    const { darkMode, selectedTaskClass } = useContext(context) as Context;
    const [searchInput, setSearchInput] = useState<string>("");
    const [results, setResults] = useState<Task[]>([]);
    const debounceValue = useDebounce(searchInput, 500);

    useEffect(() => {
        if (!debounceValue.trim()) {
            setResults([]);
            return;
        }

        searchTask(debounceValue, setSearchInput, setResults, selectedTaskClass);
    }, [debounceValue]);

    return (
        <div className={!darkMode ? `${s.searchContainer} ${!showSearchBox && s.hideSearch}` : `${s.searchContainer} ${s.dark} ${!showSearchBox && s.hideSearch}`}>
            <div className={s.searchBox}>
                <h2>
                    Search
                    <Button
                        className={s.closeButton}
                        iconElement={<i className='fa fa-close'></i>}
                        clickListener={() => { setSearchInput(""), setShowSearchBox(false) }} />
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
                            ? results.map(task =>
                                <Result task={task}
                                    setShowSearchBox={setShowSearchBox} />
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

export default SearchBox