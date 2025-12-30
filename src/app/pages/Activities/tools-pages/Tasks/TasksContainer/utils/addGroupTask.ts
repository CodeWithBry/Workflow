import { type Dispatch, type SetStateAction } from "react"

export type AddGroupTask = {
    pseudoGroup: PseudoGroup,
    pseudoTasks: PseudoTasks,
    setPseudoGroup: Dispatch<SetStateAction<PseudoGroup>>,
    groupName: string,
    taskClassId?: string,
    taskClass?: TaskClass[],
    setTaskClass?: Dispatch<SetStateAction<TaskClass[]>>,
    setAllowChanges: Dispatch<SetStateAction<boolean>>
}

export function addGroupTask({ pseudoGroup, pseudoTasks, setPseudoGroup, groupName, taskClassId, taskClass, setTaskClass, setAllowChanges }: AddGroupTask) {
    const groupTask: PseudoGroup = {
        groupId: crypto.randomUUID(),
        groupName,
        tasks: []
    }
    const findTaskClass: TaskClass | undefined = taskClass?.find(t => t.id == taskClassId);
    if (pseudoGroup) {
        setAllowChanges(true)
        const psuedoGroupWithTask: PseudoGroup = {
            ...pseudoGroup,
            tasks: pseudoTasks ? [...pseudoTasks] : []
        }

        if (findTaskClass && setTaskClass) {
            return setTaskClass(prev => prev.map(taskClass => {
                if (taskClass.id == taskClassId) {
                    return {...taskClass, taskGroups: [...taskClass.taskGroups, psuedoGroupWithTask] }
                }
                return taskClass
            }))
        }
    }

    
    setPseudoGroup(groupTask);
}