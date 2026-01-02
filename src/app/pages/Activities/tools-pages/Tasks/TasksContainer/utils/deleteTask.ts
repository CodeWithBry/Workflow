import type { Dispatch, SetStateAction } from "react";
// import { saveData } from "../../../../../utils/saveData";

export type DeleteTask = {
    task: Task,
    setPseudoTasks?: Dispatch<SetStateAction<PseudoTasks>>,
    isRealTask: boolean,
    groupId?: string,
    taskClassId?: string,
    setTaskClass?: Dispatch<SetStateAction<TaskClass[]>>,
    setAllowChanges: Dispatch<SetStateAction<boolean>>
};

export function deleteTask({ task, setTaskClass, setPseudoTasks, isRealTask, groupId, taskClassId, setAllowChanges }: DeleteTask) {
    if (!isRealTask && setPseudoTasks) return setPseudoTasks(prev => prev ? prev.filter((t) => task.id != t.id) : null)

    if (setTaskClass) return setTaskClass(prev => prev.map((proj) => {
        if (proj.id == taskClassId) {
            setAllowChanges(true)
            const updatedGroup = proj.taskGroups.map(group => {
                if (groupId != group.groupId || group.tasks == null) return { ...group }
                const updatedTasks = group.tasks.filter((t) => task.id != t.id)

                return { ...group, tasks: updatedTasks }
            })
            const updatedProject = { ...proj, taskGroups: updatedGroup };
            // saveData({ updatedProject, taskCategory: "Projects" })
            return updatedProject;
        }

        return { ...proj }
    }))

    // if (setNormalTasks) {
    //     setNormalTasks(prev => prev.map(cat => {
    //         if (cat.tabFocused) {
    //             const updatedGroup = cat.taskGroups.map(group => {
    //                 if (groupId != group.groupId) return { ...group }
    //                 const updatedTasks = group.tasks.filter((t) => task.tid != t.tid)

    //                 return { ...group, tasks: updatedTasks }
    //             })

    //             const updatedNormalTasks = { ...cat, taskGroups: updatedGroup };
    //             saveData({ updatedNormalTasks, taskCategory: "NormalTasks" })
    //             return updatedNormalTasks;
    //         }

    //         return cat
    //     }))
    // }

}