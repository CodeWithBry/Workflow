import { type Dispatch, type SetStateAction } from "react"
import { saveProjectFromFirestore } from "../../../../../../../lib/firebase";

export type AddGroupTask = {
    pseudoGroup: PseudoGroup,
    pseudoTasks: PseudoTasks,
    setPseudoGroup: Dispatch<SetStateAction<PseudoGroup>>,
    groupName: string,
    taskClassId?: string,
    taskClass?: TaskClassLists[],
    setSelectedTaskClass?: Dispatch<SetStateAction<SelectedTaskClass>>,
    setAllowChanges: Dispatch<SetStateAction<boolean>>,
    userId?: string
}

export function addGroupTask({ pseudoGroup, pseudoTasks, setPseudoGroup, groupName, taskClassId, taskClass, setSelectedTaskClass, setAllowChanges, userId }: AddGroupTask) {
    const groupTask: PseudoGroup = {
        groupId: crypto.randomUUID(),
        groupName,
        tasks: []
    }
    const findTaskClass: TaskClassLists | undefined = taskClass?.find(t => t.id == taskClassId);
    if (pseudoGroup) {
        setAllowChanges(true)
        const psuedoGroupWithTask: PseudoGroup = {
            ...pseudoGroup,
            tasks: pseudoTasks ? [...pseudoTasks] : []
        }

        if (findTaskClass && setSelectedTaskClass) {
            return setSelectedTaskClass(prev => {
                if (prev) {
                    const updatedProject = { ...prev, taskGroups: [...prev.taskGroups, psuedoGroupWithTask] }
                    if(userId) saveProjectFromFirestore(userId, updatedProject, undefined, "update");
                    return updatedProject;
                }

                return null
            })
        }
    }


    setPseudoGroup(groupTask);
}