import type { Dispatch, SetStateAction } from "react"

type UpdateProject = {
    setTaskClass: Dispatch<SetStateAction<TaskClass[]>>,
    projectName: string,
    projectId: string,
    value: string,
    action: "delete" | "update" ,
    locStor: UseLocaleStorage
}

export function updateProject({
    setTaskClass,
    projectName,
    projectId,
    value,
    action,
    locStor
}: UpdateProject) {
    if(action == "delete") {
        setTaskClass(prev => {
            const filterProjects = prev.filter(taskClass => taskClass.id != projectId)
            locStor.saveDataToLocalStorage({
                taskType: "projects",
                taskClass: filterProjects,
                valueFor: "taskClass"
            })
            return [...filterProjects]
        });
        return;
    }
    setTaskClass(prev => prev.map(taskClass => {
        if(taskClass.id == projectId) {
            locStor.saveDataToLocalStorage({
                updatedTaskClass: {...taskClass, name: projectName},
                taskType: "projects",
                taskClass: prev,
                valueFor: "taskClass"
            })
            return {...taskClass, name: value}
        }

        return taskClass
    }))
}   