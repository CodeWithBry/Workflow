import type { ReactNode } from "react"

export type LinkType = {
    clickListener: () => void,
    className: string | null,
    content: string | null,
    to: string,
    iconElement: ReactNode | null
}