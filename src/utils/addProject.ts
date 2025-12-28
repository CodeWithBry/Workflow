import type { Dispatch, SetStateAction } from "react"

type AddProject = {
    setTaskClass: Dispatch<SetStateAction<TaskClass[]>>,
    projectName: string,
    locStor: UseLocaleStorage
}

export function addProject({setTaskClass, projectName, locStor}: AddProject) {
    const newProject: TaskClass = {
        name: projectName,
        taskType: "projects",
        id: crypto.randomUUID(),
        isOpened: false,
        icon: "fas fa-history",
        taskGroups: [],
        status: "pending"
    };

    setTaskClass(prev => {
        locStor.saveDataToLocalStorage({ taskClass: [...prev, newProject], taskType: "projects" });
        return [...prev, newProject]
    })
}