import type { Dispatch, SetStateAction } from "react"
import { updateTask } from "./updateTask";
import { saveProjectFromFirestore } from "../../../../../../../lib/firebase";
import { updateAnalyticsData } from "./updateAnalyticsData";
// import { saveData } from "../../../../../utils/saveData";

export type UpdateGroup = {
    groupId: string,
    changedValue: string | null,
    action: "delete" | "update",
    task?: Task,
    setSelectedTaskClass?: Dispatch<SetStateAction<SelectedTaskClass>>,
    setAllowChanges: Dispatch<SetStateAction<boolean>>,
    userId?: string,
    setAnalytics?: Dispatch<SetStateAction<Analytics>>,
    setWeekData: Dispatch<SetStateAction<AnalyticsWeekData | null>>
} 

export function updateGroup(args: UpdateGroup) {
    const { groupId, changedValue, action, setSelectedTaskClass, task, setAllowChanges, userId } = args;
    const dateUpdated = Date.now();
    const ifUpdate = action == "update";
    const ifDelete = action == "delete";

    // setPseudoTasks, setProjects, targetAttribute, changedValue, taskId, task
    if (ifUpdate && changedValue && task) {
        setAllowChanges(true)
        return updateTask({ targetAttribute: "taskDescription", changedValue, task, groupId: groupId, setSelectedTaskClass, userId: userId });
    }

    if (setSelectedTaskClass) {
        setAllowChanges(true)
        setSelectedTaskClass((prev) => {
            if (prev) {
                if (ifUpdate && prev.taskGroups) {
                    const updatedGroup = prev.taskGroups.map(group => {
                        if (groupId == group?.groupId && changedValue) return { ...group, groupName: changedValue };
                        return { ...group };
                    })
                    const updatedProject = { ...prev, taskGroups: [...updatedGroup], dateUpdated };
                    
                    if(args.userId) updateAnalyticsData({...args, userId: args.userId, project: updatedProject, dateUpdated, updatedGroup});
                    return updatedProject;
                }

                else if (ifDelete && prev.taskGroups) {
                    const updatedGroup = prev.taskGroups.filter(gr => gr.groupId != groupId);
                    const updatedProject = { ...prev, taskGroups: [...updatedGroup], dateUpdated };
                    
                    if(args.userId) updateAnalyticsData({...args, userId: args.userId, project: updatedProject, dateUpdated, updatedGroup});
                    if (userId) saveProjectFromFirestore(userId, updatedProject, undefined, "update");
                    return updatedProject;
                }
            }

            return prev
        })
    }
}