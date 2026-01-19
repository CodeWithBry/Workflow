import type { Dispatch, SetStateAction } from "react"
import { saveProjectFromFirestore } from "../../../../../../../lib/firebase";
// import { saveData } from "../../../../../utils/saveData";

export type UpdateTask = {
    targetAttribute: "status" | "taskDescription" | "isSelected" | "groupId",
    changedValue: string | "true" | "false" | "pending" | "finished",
    task?: Task,
    groupId?: string,
    userId?: string,
    setPseudoTasks?: Dispatch<SetStateAction<PseudoTasks>>,
    isMultipleTarget?: boolean,
    setSelectedTaskClass?: Dispatch<SetStateAction<SelectedTaskClass>>,
    setAllowChanges?: Dispatch<SetStateAction<boolean>>,
}

export function updateTask({ setPseudoTasks, targetAttribute, changedValue, task, userId, groupId, isMultipleTarget, setSelectedTaskClass, setAllowChanges, }: UpdateTask) {
    const ifStatus = targetAttribute == "status" && (changedValue == "pending" || changedValue == "finished");
    const ifTaskDescription = targetAttribute == "taskDescription" && changedValue;
    const ifIsSelected = targetAttribute == "isSelected" && (changedValue == "true" || changedValue == "false");
    const ifGroupId = targetAttribute == "groupId" && changedValue;

    if (setSelectedTaskClass) {
        setSelectedTaskClass((prev => {
            if (prev) {
                // MAP THE TASK GROUPS
                const updatedGroup = prev.taskGroups.map(group => {
                    // CHECK IF THE TARGET TASKGROUP USING ITS ID
                    if (group.groupId == groupId) {
                        // MAP THE TASKS

                        const updatedTasks: Task[] = group.tasks.map(t => {
                            if (((task?.id == t.id && !isMultipleTarget) || (t.isSelected == "true" && task?.id == t.id)) && ifStatus) {
                                console.log(task, changedValue)
                                return { ...t, status: changedValue }
                            }
                            return {
                                ...t,
                                status: ((task?.id == t.id && !isMultipleTarget) || (t.isSelected == "true" && task?.id == t.id)) && ifStatus ?
                                    changedValue : t.status,
                                description: (task?.id == t.id) && ifTaskDescription ?
                                    changedValue : t.description,
                                isSelected: (task?.id == t.id) && ifIsSelected ?
                                    changedValue : t.isSelected,
                                groupId: (task?.id == t.id) && ifGroupId ?
                                    changedValue : t.groupId,
                            }
                        })
                        if (setAllowChanges && ifStatus) { setAllowChanges(true) }
                        else if (setAllowChanges && !ifStatus) { setAllowChanges(false) }
                        return { ...group, tasks: [...updatedTasks] }
                    }

                    return { ...group }
                });
                const updatedProject = { ...prev, taskGroups: updatedGroup };
                // save data to firestore
                if(userId)saveProjectFromFirestore(userId, updatedProject, null, undefined, "update");
                // saveData({ updatedProject, taskCategory: "Projects" })
                return updatedProject
            }

            return prev
        }));

    } else if (setPseudoTasks && task) {
        console.log(ifStatus, ifTaskDescription, ifIsSelected, ifGroupId)
        {
            setPseudoTasks(prev => prev
                ? prev.map(t => {
                    console.log()
                    return {
                        ...t,
                        status: (t.id === task.id) && ifStatus ?
                            changedValue : t.status,
                        description: (t.id === task.id) && ifTaskDescription ?
                            changedValue : t.description,
                        isSelected: (t.id === task.id) && ifIsSelected ?
                            changedValue : t.isSelected,
                        groupId: (t.id === task.id) && ifGroupId ?
                            changedValue : t.groupId,
                    }
                })
                : null)
        }
    }
}