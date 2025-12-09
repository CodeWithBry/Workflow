import type { ButtonType } from "../../types/button.types"

function Button({
    clickListener,
    className,
    content,
    iconElement,
    titleContent
}: ButtonType) {

    return (
        <button
            title={titleContent ? titleContent : ""}
            onClick={() => {clickListener()}} 
            className={`${className}`}>
            {iconElement}
            {content}
        </button>
    )
}

export default Button