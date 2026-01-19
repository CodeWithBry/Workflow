import type { Dispatch, SetStateAction } from "react"
import { getProjectsData, saveProjectFromFirestore, updateProjectLists } from "../lib/firebase";

type UpdateProject = {
    setTaskClass: Dispatch<SetStateAction<TaskClassLists[]>>,
    projectName: string,
    projectId: string,
    value: string,
    action: "delete" | "update",
    project?: TaskClass
}

export async function updateProject({
    setTaskClass,
    projectId,
    value,
    action,
    project,
}: UpdateProject, userInfo: UserInfo) {
    if (action == "delete") {
        setTaskClass(prev => {
            const filterProjects = prev.filter(taskClass => taskClass.id != projectId);
            updateProjectLists(userInfo, filterProjects);
            if(project) saveProjectFromFirestore(userInfo.userId, {...project}, null, undefined, "delete");
            return [...filterProjects]
        });
        return;
    }

    const getSelectedProject = await getProjectsData(userInfo.userId, projectId);
    await saveProjectFromFirestore(userInfo.userId, {...getSelectedProject, name: value}, null, undefined, "update");
    setTaskClass((prev) => {
        const updatedProject = prev.map(taskClass => {
            if (taskClass.id == projectId) {
                return { ...taskClass, name: value };
            }

            return taskClass;
        })
        updateProjectLists(userInfo, updatedProject)
        return updatedProject;
    })
}   