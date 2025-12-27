import type { Dispatch, SetStateAction } from "react"
// import { saveData } from "../../../../../utils/saveData";

export type UpdateTask = {
    targetAttribute: "status" | "taskDescription" | "isSelected" | "groupId",
    changedValue: string | "true" | "false" | "pending" | "finished",
    task?: Task,
    groupId?: string,
    taskClassId?: string,
    setPseudoTasks?: Dispatch<SetStateAction<PseudoTasks>>,
    isMultipleTarget?: boolean,
    setTaskClass?: Dispatch<SetStateAction<TaskClass[]>>,
    setAllowChanges?: Dispatch<SetStateAction<boolean>>,
}

export function updateTask({ setPseudoTasks, targetAttribute, changedValue, task, taskClassId, groupId, isMultipleTarget, setTaskClass, setAllowChanges,  }: UpdateTask) {
    const ifStatus = targetAttribute == "status" && (changedValue == "pending" || changedValue == "finished");
    const ifTaskDescription = targetAttribute == "taskDescription" && changedValue;
    const ifIsSelected = targetAttribute == "isSelected" && (changedValue == "true" || changedValue == "false");
    const ifGroupId = targetAttribute == "groupId" && changedValue;

    if (setTaskClass) {
        setTaskClass(prev => prev.map(taskClass => {
            if (taskClass.id == taskClassId) {
                // MAP THE TASK GROUPS
                const updatedGroup = taskClass.taskGroups.map(group => {
                    // CHECK IF THE TARGET TASKGROUP USING ITS ID
                    if (group.groupId == groupId) {
                        // MAP THE TASKS
                        
                        const updatedTasks: Task[] = group.tasks.map(t => {
                            if (((task?.id == t.id && !isMultipleTarget) || (t.isSelected == "true" && task?.id == t.id)) && ifStatus) {
                                console.log(task, changedValue)
                                return {...t, status: changedValue}
                            }
                            return {
                                ...t,
                                status: ((task?.id == t.id && !isMultipleTarget) || (t.isSelected == "true" && task?.id == t.id)) && ifStatus ?
                                    changedValue : t.status,
                                description: (task?.id == t.id) && ifTaskDescription ?
                                    changedValue : t.description,
                                isSelected: (task?.id == t.id) && ifIsSelected ?
                                    changedValue : t.isSelected,
                                groupId: (task?.id == t.id) && ifGroupId ?
                                    changedValue : t.groupId,
                            }
                        })
                        if(setAllowChanges && ifStatus) {setAllowChanges(true)}
                        else if (setAllowChanges && !ifStatus) {setAllowChanges(false)}
                        return { ...group, tasks: [...updatedTasks] }
                    }

                    return { ...group }
                });
                const updatedProject = { ...taskClass, taskGroups: updatedGroup };

                // saveData({ updatedProject, taskCategory: "Projects" })
                return updatedProject
            }

            return { ...taskClass }
        }));

    } else if (setPseudoTasks && task) {
        console.log(ifStatus, ifTaskDescription, ifIsSelected, ifGroupId)
        {
            setPseudoTasks(prev => prev
                ? prev.map(t => {
                    console.log()
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