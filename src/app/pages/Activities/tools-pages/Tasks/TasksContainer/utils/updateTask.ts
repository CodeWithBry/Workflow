import type { Dispatch, SetStateAction } from "react"
import { saveProjectFromFirestore } from "../../../../../../../lib/firebase";
import { updateAnalyticsData } from "./updateAnalyticsData";
// import { saveData } from "../../../../../utils/saveData";

export type UpdateTask = {
    targetAttribute: "status" | "taskDescription" | "isSelected" | "groupId",
    changedValue: string | "true" | "false" | "pending" | "finished",
    task?: Task,
    groupId?: string,
    userId?: string,
    setPseudoTasks?: Dispatch<SetStateAction<PseudoTasks>>,
    isMultipleTarget?: boolean,
    setSelectedTaskClass?: Dispatch<SetStateAction<SelectedTaskClass>>,
    setWeekData?: Dispatch<SetStateAction<AnalyticsWeekData | null>>
    setAnalytics?: Dispatch<SetStateAction<Analytics>>
}

export function updateTask(args: UpdateTask) {
    const { setPseudoTasks, targetAttribute, changedValue, task, userId, groupId, isMultipleTarget, setSelectedTaskClass } = args;
    const ifStatus = targetAttribute == "status" && (changedValue == "pending" || changedValue == "finished");
    const ifTaskDescription = targetAttribute == "taskDescription" && changedValue;
    const ifIsSelected = targetAttribute == "isSelected" && (changedValue == "true" || changedValue == "false");
    const ifGroupId = targetAttribute == "groupId" && changedValue;

    if (setSelectedTaskClass) {
        setSelectedTaskClass((prev => {
            if (prev) {
                const dateUpdated = Date.now();
                // MAP THE TASK GROUPS
                const updatedGroup = prev.taskGroups.map(group => {
                    // CHECK IF THE TARGET TASKGROUP USING ITS ID
                    if (group.groupId == groupId) {
                        // MAP THE TASKS

                        const updatedTasks: Task[] = group.tasks.map(t => {
                            if (((task?.id == t.id && !isMultipleTarget) || (t.isSelected == "true" && task?.id == t.id)) && ifStatus) {
                                if (changedValue == "finished") {
                                    return { ...t, status: changedValue, dateFinished: new Date().toLocaleDateString() };
                                }
                                return { ...t, status: changedValue }
                            }
                            return {
                                ...t,
                                status: t.status,
                                description: (task?.id == t.id) && ifTaskDescription ?
                                    changedValue : t.description,
                                isSelected: (task?.id == t.id) && ifIsSelected ?
                                    changedValue : t.isSelected,
                                groupId: (task?.id == t.id) && ifGroupId ?
                                    changedValue : t.groupId,
                            }
                        });
                        return { ...group, tasks: [...updatedTasks] }
                    }

                    return { ...group }
                });
                const updatedProject = { ...prev, taskGroups: updatedGroup, dateUpdated };
                if(args.userId) updateAnalyticsData({...args, userId: args.userId, updatedGroup, dateUpdated, project: updatedProject });
                // save data to firestore
                if (userId) saveProjectFromFirestore(userId, updatedProject, undefined, "update");
                // saveData({ updatedProject, taskCategory: "Projects" })
                return updatedProject
            }



            return prev
        }));

    } else if (setPseudoTasks && task) {
        {
            setPseudoTasks(prev => prev
                ? prev.map(t => {
                    return {
                        ...t,
                        status: (t.id === task.id) && ifStatus ?
                            changedValue : t.status,
                        description: (t.id === task.id) && ifTaskDescription ?
                            changedValue : t.description,
                        isSelected: (t.id === task.id) && ifIsSelected ?
                            changedValue : t.isSelected,
                        groupId: (t.id === task.id) && ifGroupId ?
                            changedValue : t.groupId,
                    }
                })
                : null)
        }
    }
}