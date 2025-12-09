import type { ReactNode } from "react"

export type LinkType = {
    clickListener?: () => void | null,
    className: string | null,
    content?: ReactNode | string,
    to: string,
    iconElement?: ReactNode | null,
    titleContent?: string | null
}