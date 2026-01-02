import { useEffect, useRef, type JSX } from "react"
import s from "./styles.module.css"
import Button from "../ui/Button";

export function DropDown({ darkMode, showTools, setShowTools, actionLists }: DropDownProps): JSX.Element {
    const dropdownRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setShowTools(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [setShowTools]);

    return (<>
        <div
            className={
                !darkMode
                    ? `${s.dropDown} ${!showTools && s.hideDropDown}`
                    : `${s.dropDown} ${s.darkDropDown} ${!showTools && s.hideDropDown}`}
            ref={dropdownRef}>
            {actionLists.map(action => {
                return <Button
                    className={s.actionButton}
                    content={action.action}
                    clickListener={() => {
                        action.functionCall()
                        setShowTools(false)
                    }} />
            })}
        </div>
    </>)
}