import { useEffect, useState } from "react";

function useDebounce(searchInput: string, delay: number): string {
    const [debouncedValue, setDebouncedValue] = useState(searchInput)

    useEffect(() => {
        const handleTimeOut = setTimeout(() => {
            setDebouncedValue(searchInput)
        }, delay);

        return () => clearTimeout(handleTimeOut)
    }, [searchInput, delay])

    return debouncedValue
}

export default useDebounce;