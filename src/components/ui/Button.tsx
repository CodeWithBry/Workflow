function Button({
    clickListener,
    className,
    content,
    iconElement,
    titleContent
}: Button) {

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