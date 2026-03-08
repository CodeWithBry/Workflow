import type { Dispatch, SetStateAction } from "react";
import { saveProjectFromFirestore } from "../../../../../../../lib/firebase";
import { updateAnalyticsData } from "./updateAnalyticsData";
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

export function deleteTask(args: DeleteTask) {
    const { task, setSelectedTaskClass, setPseudoTasks, isRealTask, groupId, setAllowChanges, userId } = args;
    if (!isRealTask && setPseudoTasks) return setPseudoTasks(prev => prev ? prev.filter((t) => task.id != t.id) : null)

    if (setSelectedTaskClass) return setSelectedTaskClass((prev) => {
        if (prev) {
            setAllowChanges(true);
            const dateUpdated = Date.now();
            const updatedGroup = prev.taskGroups.map(group => {
                if (groupId != group.groupId || group.tasks == null) return { ...group }
                const updatedTasks = group.tasks.filter((t) => task.id != t.id)

                return { ...group, tasks: updatedTasks }
            })
            const updatedProject = { ...prev, taskGroups: updatedGroup, dateUpdated };
            // save data to firestore
            if (args.userId) updateAnalyticsData({ ...args, userId: args.userId, updatedGroup, dateUpdated, project: updatedProject });
            if (userId) saveProjectFromFirestore(userId, updatedProject, undefined, "update")
            // saveData({ updatedProject, taskCategory: "Projects" })
            return updatedProject;
        }

        return null
    })
}