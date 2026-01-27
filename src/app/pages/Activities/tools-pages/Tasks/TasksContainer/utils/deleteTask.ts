import type { Dispatch, SetStateAction } from "react";
import { saveProjectFromFirestore } from "../../../../../../../lib/firebase";
// import { saveData } from "../../../../../utils/saveData";

export type DeleteTask = {
    task: Task,
    setPseudoTasks?: Dispatch<SetStateAction<PseudoTasks>>,
    isRealTask: boolean,
    groupId?: string,
    userId?: string,
    setSelectedTaskClass?: Dispatch<SetStateAction<SelectedTaskClass>>,
    setAllowChanges: Dispatch<SetStateAction<boolean>>
};

export function deleteTask({ task, setSelectedTaskClass, setPseudoTasks, isRealTask, groupId, setAllowChanges, userId }: DeleteTask) {
    if (!isRealTask && setPseudoTasks) return setPseudoTasks(prev => prev ? prev.filter((t) => task.id != t.id) : null)

    if (setSelectedTaskClass) return setSelectedTaskClass((prev) => {
        if (prev) {
            setAllowChanges(true)
            const updatedGroup = prev.taskGroups.map(group => {
                if (groupId != group.groupId || group.tasks == null) return { ...group }
                const updatedTasks = group.tasks.filter((t) => task.id != t.id)

                return { ...group, tasks: updatedTasks }
            })
            const updatedProject = { ...prev, taskGroups: updatedGroup };
            // save data to firestore
            if(userId) saveProjectFromFirestore(userId, updatedProject, undefined, "update")
            // saveData({ updatedProject, taskCategory: "Projects" })
            return updatedProject;
        }

        return null
    })

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