import type { Dispatch, SetStateAction } from "react"
import { getProjectsData, saveProjectFromFirestore, updateChatList, updateProjectLists } from "../lib/firebase";

type UpdateProject = {
    setChatLists?: Dispatch<SetStateAction<ChatList[]>>,
    setTaskClass: Dispatch<SetStateAction<TaskClassLists[]>>,
    projectName: string,
    projectId: string,
    value: string,
    action: "delete" | "update",
    project?: TaskClass
}

export async function updateProject({
    setChatLists,
    setTaskClass,
    projectId,
    value,
    action,
    project,
}: UpdateProject, userInfo: UserInfo) {
    if (action == "delete" && setChatLists) {
        setTaskClass(prev => {
            const filterProjects = prev.filter(taskClass => taskClass.id != projectId);
            updateProjectLists(userInfo.userId, filterProjects);
            if (project) saveProjectFromFirestore(userInfo.userId, { ...project }, undefined, "delete");
            return [...filterProjects];
        });
        setChatLists(prev => {
            const filterChatLists = prev.filter(chatInfo => chatInfo.id != projectId);
            updateChatList(userInfo.userId, filterChatLists);
            if (project) saveProjectFromFirestore(userInfo.userId, { ...project }, undefined, "delete");
            return [...filterChatLists];
        })
        return;
    }

    const getSelectedProject = await getProjectsData(userInfo.userId, projectId);
    await saveProjectFromFirestore(userInfo.userId, { ...getSelectedProject, name: value }, undefined, action);
    setTaskClass((prev) => {
        const updatedProject = prev.map(taskClass => {
            if (taskClass.id == projectId) {
                return { ...taskClass, name: value };
            }

            return taskClass;
        })
        updateProjectLists(userInfo.userId, updatedProject)
        return updatedProject;
    })
}   