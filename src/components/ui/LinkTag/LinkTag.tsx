import type { LinkType } from "../types/link.types"
import { Link } from "react-router-dom" 

function LinkTag({
    clickListener,
    className,
    content,
    to,
    iconElement
}: LinkType) {

    return (
        <Link
            to={to}
            onClick={() => {clickListener()}} 
            className={`${className}`}>
            {iconElement}
            {content}
        </Link>
    )
}

export default LinkTag