import type { Dispatch, SetStateAction } from "react"

export type AddTask = {
    taskDescription: string,
    setPseudoTasks: Dispatch<SetStateAction<PseudoTasks>>,
    pseudoTasks: PseudoTasks,
    groupId: string
}

export function addTask ({taskDescription, setPseudoTasks, pseudoTasks, groupId}: AddTask) {
    const task: Tasks = {
        tid: crypto.randomUUID(),
        taskDescription: taskDescription,
        dateCreated: (new Date).toISOString(),
        status: "pending",
        isSelected: false,
        groupId: groupId
    }

    if(!pseudoTasks) return setPseudoTasks([task])
    setPseudoTasks(prev => prev ? [...prev, task] : prev)
    console.log(task)
}