import type { ReactNode } from "react"

export type ButtonType = {
    clickListener: () => void,
    className?: string,
    content?: ReactNode | string,
    iconElement?: ReactNode,
    titleContent?: string | null
}