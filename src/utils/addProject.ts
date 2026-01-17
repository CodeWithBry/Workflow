import type { Dispatch, SetStateAction } from "react"
import { saveProjectFromFirestore } from "../lib/firebase";

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

    await saveProjectFromFirestore(userId, {...newProject}, projectInfo, chatInfo, "create");
    setTaskClass(prev => [newProject, ...prev])
    setChatLists(prev => [...prev, chatInfo]);
}