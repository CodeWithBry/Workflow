import type { Dispatch, SetStateAction } from "react";

declare global {
    type PropsForDPB = {
        showDPB: boolean,
        setShowDPB: Dispatch<SetStateAction<boolean>>,
        selectedProject: SelectedTaskClass,
        setSelectedProject: Dispatch<SetStateAction<SelectedTaskClass>>
    } | null
}

export { };