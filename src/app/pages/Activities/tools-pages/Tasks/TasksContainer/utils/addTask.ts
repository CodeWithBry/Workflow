import { type Dispatch, type SetStateAction } from "react"

export type AddTask = {
    taskDescription: string,
    groupId: string,
    setPseudoTasks?: Dispatch<SetStateAction<PseudoTasks>>,
    pseudoTasks?: PseudoTasks,

    setTaskClass?: Dispatch<SetStateAction<TaskClass[]>>
    taskClassId?: string,
    setAllowChanges?: Dispatch<SetStateAction<boolean>>
}

export function addTask({
    taskDescription,
    groupId,
    setPseudoTasks,
    pseudoTasks,
    taskClassId,
    setTaskClass,
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
    if (setTaskClass && setAllowChanges) {
        setAllowChanges(true)
        return setTaskClass(prev => prev.map(taskClass => {
            if (taskClass.id == taskClassId) {
                const updatedGroups = taskClass.taskGroups.map((group) => {
                    if(group.groupId == groupId) {
                        return {...group, tasks: [...group.tasks, task]}
                    }

                    return group
                })
                return { ...taskClass, taskGroups: [...updatedGroups] }
            }

            return taskClass
        }))
    }

    if (setPseudoTasks) {
        if (!pseudoTasks) return setPseudoTasks([task]);
        setPseudoTasks(prev => prev ? [...prev, task] : prev);
    }
}