import { type Dispatch, type SetStateAction } from "react"
import { saveProjectFromFirestore } from "../../../../../../../lib/firebase";

export type AddTask = {
    taskDescription: string,
    groupId: string,
    setPseudoTasks?: Dispatch<SetStateAction<PseudoTasks>>,
    pseudoTasks?: PseudoTasks,

    setSelectedTaskClass?: Dispatch<SetStateAction<SelectedTaskClass>>
    setAllowChanges?: Dispatch<SetStateAction<boolean>>,
    userId?: string
}

export function addTask({
    taskDescription,
    groupId,
    setPseudoTasks,
    pseudoTasks,
    userId,
    setSelectedTaskClass,
    setAllowChanges
}: AddTask) {
    if (!groupId) return;

    const task: Task = {
        id: crypto.randomUUID(),
        description: taskDescription,
        dateCreated: (new Date).toISOString(),
        status: "pending",
        isSelected: "false",
        groupId: groupId
    }
    if (setSelectedTaskClass && setAllowChanges) {
        setAllowChanges(true)
        return setSelectedTaskClass(prev => {
            if (prev) {
                const updatedGroups = prev.taskGroups.map((group) => {
                    if (group.groupId == groupId) {
                        return { ...group, tasks: [task, ...group.tasks] }
                    }

                    return group
                })
                const updatedTaskClass = { ...prev, taskGroups: [...updatedGroups] }
                // save to firestore
                if(userId)saveProjectFromFirestore(userId, updatedTaskClass, undefined, "update")
                return updatedTaskClass
            }

            return prev
        })
    }

    if (setPseudoTasks) {
        if (!pseudoTasks) return setPseudoTasks([task]);
        setPseudoTasks(prev => prev ? [...prev, task] : prev);
    }
}