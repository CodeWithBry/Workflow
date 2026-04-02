import type { Dispatch, SetStateAction } from "react"

declare global {
    type CardComponent = {
        icon: string,
        number?: number,
        title: string,
        getValue?: () => string
    }
}

export {};