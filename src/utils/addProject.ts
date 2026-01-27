import type { Dispatch, SetStateAction } from "react"
import { saveProjectFromFirestore, updateProjectLists } from "../lib/firebase";

type AddProject = {
    setTaskClass: Dispatch<SetStateAction<TaskClassLists[]>>,
    setChatLists: Dispatch<SetStateAction<ChatList[]>>
    projectName: string,
    userId: string
}

export async function addProject({setTaskClass, setChatLists, projectName, userId}: AddProject) {
    const newProject: TaskClass = {
        name: projectName,
        taskType: "projects",
        id: crypto.randomUUID(),
        isOpened: false,
        icon: "fas fa-history",
        taskGroups: [],
        status: "pending"
    };

    const projectInfo: TaskClassLists = {
        name: projectName,
        taskType: "projects",
        id: newProject.id,
        isOpened: false,
        icon: "fas fa-history",
        status: "pending"
    };

    const chatInfo: ChatList = {
        isOpen: false,
        id: projectInfo.id,
        convoLists: []
    }

    await saveProjectFromFirestore(userId, {...newProject}, chatInfo, "create");
    setTaskClass(prev => {
        const getNormalTasks = prev.filter(taskClass => taskClass.taskType == "normal-tasks");
        const getProjects = prev.filter(taskClass => taskClass.taskType == "projects");
        const insertBetween = [...getNormalTasks, newProject, ...getProjects];
        updateProjectLists(userId, insertBetween)
        return [...insertBetween];
    })
    setChatLists(prev => [...prev, chatInfo]);
}