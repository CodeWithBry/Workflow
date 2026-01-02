import type { Dispatch, SetStateAction } from "react"
import { updateTask } from "./updateTask";
// import { saveData } from "../../../../../utils/saveData";

export type UpdateGroup = {
    groupId: string,
    changedValue: string | null,
    action: "delete" | "update",
    task?: Task,
    setTaskClass?: Dispatch<SetStateAction<TaskClass[]>>, 
    selectedTaskClass: SelectedTaskClass,
    setAllowChanges: Dispatch<SetStateAction<boolean>>
}
export function updateGroup({ groupId, changedValue, action, setTaskClass, selectedTaskClass, task, setAllowChanges }: UpdateGroup) {
    const ifUpdate = action == "update";
    const ifDelete = action == "delete";

    console.log(ifUpdate)
    // setPseudoTasks, setProjects, targetAttribute, changedValue, taskId, task
    if (ifUpdate && changedValue && task){
        setAllowChanges(true)
        return updateTask({ targetAttribute: "taskDescription", changedValue, task, groupId: groupId, setTaskClass, taskClassId: selectedTaskClass?.id });
    }

    if (setTaskClass) {
        setAllowChanges(true)
        setTaskClass(prev => {
            return prev.map((taskClass) => {
                if (taskClass.id == selectedTaskClass?.id) {

                    if (ifUpdate && taskClass.taskGroups) {
                        const updatedGroup = taskClass.taskGroups.map(group => {
                            if (groupId == group?.groupId && changedValue) return { ...group, groupName: changedValue };
                            return { ...group };
                        })
                        const updatedProject = { ...taskClass, taskGroups: [...updatedGroup] };
                        // saveData({ updatedProject, taskCategory: "Projects" });
                        return updatedProject;
                    }

                    else if (ifDelete && taskClass.taskGroups) {
                        const updatedGroup = taskClass.taskGroups.filter(gr => gr.groupId != groupId);
                        const updatedProject = { ...taskClass, taskGroups: [...updatedGroup] };
                        console.log(updatedProject)
                        // saveData({ updatedProject, taskCategory: "Projects" });
                        return updatedProject;
                    }
                }

                return taskClass
            });
        })
    }
}