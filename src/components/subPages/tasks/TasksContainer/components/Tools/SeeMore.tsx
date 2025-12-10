import type { JSX } from "react"
import s from "./styles.module.css"
import Button from "../../../../../ui/Button/Button"

export function SeeMore({ darkMode, showTools, actionLists }: SeeMoreProps): JSX.Element {
    return (<>
        <div
            className={
                !darkMode
                    ? `${s.seeMore} ${!showTools && s.hideSeeMore}`
                    : `${s.seeMore} ${s.darkSeeMore} ${!showTools && s.hideSeeMore}`}
        >
            {actionLists.map(action => {
                return <Button
                    className={s.actionButton}
                    content={action.action}
                    clickListener={() => action.functionCall()} />
            })}
        </div>
    </>)
}