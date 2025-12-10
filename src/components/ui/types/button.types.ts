import type { ReactNode } from "react"

export type ButtonType = {
    clickListener?: () => void,
    className?: string,
    content?: string,
    iconElement?: ReactNode
}