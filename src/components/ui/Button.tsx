function Button({
    clickListener,
    className,
    content,
    iconElement,
    titleContent,
    id
}: Button) {

    return (
        <button
            id={id}
            title={titleContent ? titleContent : ""}
            onClick={() => {clickListener()}} 
            className={`${className}`}>
            {iconElement}
            {content}
        </button>
    )
}

export default Button