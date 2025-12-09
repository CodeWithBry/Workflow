import type { Dispatch, SetStateAction } from "react";

declare global {
    type TaskGroups = {
        groupName: string,
        groupId: string
    }

    type ActionsLists = {
        action: string,
        functionCall: () => void
    }

    type ToolsProps = {
        showTools: boolean,
        setShowTools: Dispatch<SetStateAction<boolean>>
    }

    type SeeMoreProps = {
        showTools: boolean,
        darkMode: boolean,
        actionLists: ActionsLists[]
    }

    type EditTaskGroupName = (groupId: string, setTaskGroups: Dispatch<SetStateAction<TaskGroups[]>>, changedValue: string) => void
}

export { };