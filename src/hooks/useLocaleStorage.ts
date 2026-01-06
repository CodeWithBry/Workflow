export function useLocaleStorage(): UseLocaleStorage {
    function saveDataToLocalStorage({ updatedTaskClass, taskType, taskClass, valueFor, chats }: SaveDataToLocalStorage) {
        const getStorage = localStorage.getItem(valueFor == "taskClass" ?  taskType : valueFor);
        
        function saveTaskClass() {
            if(!taskClass) return;
            
            if (getStorage && updatedTaskClass) {
                const convertData: TaskClass[] = JSON.parse(getStorage);
                const notBelongToTaskClass = taskClass?.filter(t => {
                    if (t.taskType == taskType) return !convertData.some(ta => t.id == ta.id)
                })

                if (notBelongToTaskClass.length != 0) {
                    const updatedArray = [...convertData, ...notBelongToTaskClass];
                    console.log(updatedArray)
                    return localStorage.setItem(taskType, JSON.stringify(updatedArray));
                } else {
                    console.log(updatedTaskClass)
                    const setUpdatedProject: TaskClass[] = convertData.map(t => {
                        if (t.id == updatedTaskClass.id) {
                            return { ...updatedTaskClass }
                        }
                        return t
                    }).filter(t => t.taskType == taskType);
                    localStorage.setItem(taskType, JSON.stringify(setUpdatedProject));
                }
            } else {
                const getSpecificTaskClass = taskClass.filter(t => t.taskType == taskType);
                localStorage.setItem(taskType, JSON.stringify(getSpecificTaskClass));
            }
        }

        function saveChats() {
            localStorage.setItem("chats", JSON.stringify(chats));
        }

        if(valueFor == "taskClass" && taskClass) {
            saveTaskClass()
        } else if (chats) {
            saveChats()
        }

    }

    function saveChats(updatedChats: Chats) {
        localStorage.setItem("chats", JSON.stringify(updatedChats))
    }

    function getDataFromLocalStorage(valueToGet: "taskClass" | "chat"): GetDataFromLocalStorage {
        if (valueToGet == "taskClass") {
            const getNormalTasks = localStorage.getItem("normal-tasks");
            const getProjects = localStorage.getItem("projects");
            const parseNormalTasksData = getNormalTasks ? JSON.parse(getNormalTasks) as TaskClass[] : []
            const parseProjectsData = getProjects ? JSON.parse(getProjects) as TaskClass[] : []

            const mergeTasksClass = [...parseNormalTasksData.map(t => ({ ...t, isOpened: false })), ...parseProjectsData.map(t => ({ ...t, isOpened: false }))];
            return {
                taskClass: mergeTasksClass,
                chats: [],
                valueFor: "taskClass"
            };
        } else if (valueToGet == "chat") {
            const getChats = localStorage.getItem("chats");
            const parseChats = getChats ? JSON.parse(getChats) as Chats : []

            const updateChats = [...parseChats.map(t => ({ ...t, isOpened: false }))];
            return {
                taskClass: [],
                chats: updateChats,
                valueFor: "chats"
            };
        }
    }

    return {
        saveDataToLocalStorage,
        getDataFromLocalStorage,
        saveChats
    }
}