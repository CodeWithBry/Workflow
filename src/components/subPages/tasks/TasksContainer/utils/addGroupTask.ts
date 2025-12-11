import type { Dispatch, SetStateAction } from "react"

export type AddGroupTask = {
    groupName: string,
    setTaskGroups?: Dispatch<SetStateAction<TaskGroup[] | null>>,
    pseudoGroup: PseudoGroup,
    setPseudoGroup: Dispatch<SetStateAction<PseudoGroup>>,
    pseudoTasks?: PseudoTasks
} 

export function addGroupTask({groupName, setPseudoGroup, pseudoGroup, setTaskGroups, pseudoTasks}: AddGroupTask) {
    if(pseudoGroup && setTaskGroups && pseudoTasks) {
        const psuedoGroupWithTask: PseudoGroup = {
            ...pseudoGroup,
            tasks: [...pseudoTasks]
        }

        return setTaskGroups(prev => prev ? [...prev, psuedoGroupWithTask] : [psuedoGroupWithTask])
    }

    const groupTask:PseudoGroup = {
        groupId: crypto.randomUUID(),
        groupName,
        tasks: null
    }

    setPseudoGroup(groupTask)
}