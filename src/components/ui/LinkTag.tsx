import { Link } from "react-router-dom" 

function LinkTag({
    clickListener,
    className,
    content,
    titleContent,
    to,
    iconElement
}: LinkType) {

    return (
        <Link
            to={to}
            onClick={() => {if(clickListener) clickListener()}} 
            className={`${className}`}
            title={titleContent ? titleContent : ""} >
            {iconElement}
            {content}
        </Link>
    )
}

export default LinkTag