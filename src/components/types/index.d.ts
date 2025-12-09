import type { ReactNode } from "react"

declare global {
    type ButtonType = {
        clickListener: () => void,
        className?: string,
        content?: ReactNode | string,
        iconElement?: ReactNode,
        titleContent?: string | null
    }

    type LinkType = {
        clickListener?: () => void | null,
        className: string | null,
        content?: ReactNode | string,
        to: string,
        iconElement?: ReactNode | null,
        titleContent?: string | null
    }
}

export {};