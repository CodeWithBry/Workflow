import type { Dispatch, SetStateAction } from "react"

export type UpdateTask = {
    setTaskGroups?: Dispatch<SetStateAction<TaskGroup[] | null>>,
    targetAttribute: "status" | "taskDescription" | "isSelected" | "groupId",
    changedValue: string | "true" | "false" | "pending" | "finished",
    taskId: string,
    task?: Tasks,
    groupId: string | undefined,
    setPseudoTasks?: Dispatch<SetStateAction<PseudoTasks>>
}

export function updateTask({ setPseudoTasks, setTaskGroups, targetAttribute, changedValue, taskId, task }: UpdateTask) {
    const ifStatus = targetAttribute == "status" && (changedValue == "pending" || changedValue == "finished");
    const ifTaskDescription = targetAttribute == "taskDescription" && changedValue;
    const ifIsSelected = targetAttribute == "isSelected" && (changedValue == "true" || changedValue == "false");
    const ifGroupId = targetAttribute == "groupId" && changedValue;

    if (setTaskGroups) {
        setTaskGroups(prev => prev ? prev.map(group => {
            if (group.tasks) {
                const updatedTasks: Tasks[] = group.tasks.map(task => {
                    return {
                        ...task,
                        status: (taskId == task.tid) && ifStatus ?
                            changedValue : task.status,
                        taskDescription: (taskId == task.tid) && ifTaskDescription ?
                            changedValue : task.taskDescription,
                        isSelected: (taskId == task.tid) && ifIsSelected ?
                            changedValue : task.isSelected,
                        groupId: (taskId == task.tid) && ifGroupId ?
                            changedValue : task.groupId,
                    }
                })

                return { ...group, tasks: [...updatedTasks] }
            }

            return { ...group }
        }) : null)
    }

    else if (setPseudoTasks && task) {
        console.log(changedValue)
        setPseudoTasks(prev => prev
            ? prev.map(t => {

                return {
                    ...t,
                    status: (t.tid == task.tid) && ifStatus ?
                        changedValue : task.status,
                    taskDescription: (t.tid == task.tid) && ifTaskDescription ?
                        changedValue : task.taskDescription,
                    isSelected: (t.tid == task.tid) && ifIsSelected ?
                        changedValue : task.isSelected,
                    groupId: (t.tid == task.tid) && ifGroupId ?
                        changedValue : task.groupId,
                }
            })
            : null)
    }
}