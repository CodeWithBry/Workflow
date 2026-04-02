import { type Dispatch, type SetStateAction } from "react"
import { saveProjectFromFirestore } from "../../../../../../../lib/firebase";
import { updateAnalyticsData } from "./updateAnalyticsData";

export type AddTask = {
    taskDescription: string,
    groupId: string,
    setPseudoTasks?: Dispatch<SetStateAction<PseudoTasks>>,
    pseudoTasks?: PseudoTasks,

    setSelectedTaskClass?: Dispatch<SetStateAction<SelectedTaskClass>>
    setAllowChanges?: Dispatch<SetStateAction<boolean>>,
    userId?: string
    setAnalytics: Dispatch<SetStateAction<Analytics>>
}

export function addTask(args: AddTask) {
    const {
        taskDescription,
        groupId,
        setPseudoTasks,
        pseudoTasks,
        userId,
        setSelectedTaskClass,
        setAllowChanges,
        setAnalytics
    } = args;
    if (!groupId) return;

    const task: Task = {
        id: crypto.randomUUID(),
        description: taskDescription,
        dateCreated: (new Date).toISOString(),
        status: "pending",
        isSelected: "false",
        groupId: groupId
    }
    if (setSelectedTaskClass && setAllowChanges) {
        setAllowChanges(true)
        return setSelectedTaskClass(prev => {
            if (prev) {
                let finishedTask = 0;
                let pendingTask = 0;
                const dateUpdated = Date.now();
                const updatedGroups = prev.taskGroups.map((group) => {
                    if (group.groupId == groupId) {
                        return { ...group, tasks: [task, ...group.tasks] }
                    }

                    finishedTask = finishedTask + group.tasks.filter(task => task.status == "finished").length;
                    pendingTask = pendingTask + group.tasks.filter(task => task.status == "pending").length;
                    return group
                })
                const updatedTaskClass = { ...prev, taskGroups: [...updatedGroups] }
                setAnalytics(prev => {
                    return { ...prev, numOfFinishedTasks: finishedTask, numOfPendingTasks: pendingTask }
                })
                // save to firestore
                if (args.userId) updateAnalyticsData({ ...args, userId: args.userId, updatedGroup: updatedGroups, dateUpdated, project: updatedTaskClass });
                if (userId) saveProjectFromFirestore(userId, updatedTaskClass, undefined, "update");
                return updatedTaskClass
            }

            return prev
        })
    }

    if (setPseudoTasks) {
        if (!pseudoTasks) return setPseudoTasks([task]);
        setPseudoTasks(prev => prev ? [...prev, task] : prev);
    }
}