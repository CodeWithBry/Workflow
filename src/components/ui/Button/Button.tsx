import type { ButtonType } from "../types/button.types"

function Button({
    clickListener,
    className,
    content,
    iconElement
}: ButtonType) {

    return (
        <button
            onClick={() => {clickListener()}} 
            className={`${className}`}>
            {iconElement}
            {content}
        </button>
    )
}

export default Button