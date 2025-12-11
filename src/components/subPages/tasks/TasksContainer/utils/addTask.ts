import type { Dispatch, SetStateAction } from "react"

export type AddTask = {
    taskDescription: string,
    setPseudoTasks: Dispatch<SetStateAction<PseudoTasks>>
}

export function addTask ({taskDescription, setPseudoTasks}: AddTask) {
    const task: Tasks = {
        tid: crypto.randomUUID(),
        taskDescription: taskDescription,
        dateCreated: (new Date).toISOString(),
        status: "pending",
        isSelected: false
    }

    setPseudoTasks(prev => prev ? [...prev, task] : null)
}