import type { Dispatch, SetStateAction } from "react"
import { updateTask } from "./updateTask";
import { saveProjectFromFirestore } from "../../../../../../../lib/firebase";
// import { saveData } from "../../../../../utils/saveData";

export type UpdateGroup = {
    groupId: string,
    changedValue: string | null,
    action: "delete" | "update",
    task?: Task,
    setSelectedTaskClass?: Dispatch<SetStateAction<SelectedTaskClass>>,
    setAllowChanges: Dispatch<SetStateAction<boolean>>,
    userId?: string
}
export function updateGroup({ groupId, changedValue, action, setSelectedTaskClass, task, setAllowChanges, userId }: UpdateGroup) {
    const ifUpdate = action == "update";
    const ifDelete = action == "delete";

    console.log(ifUpdate)
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
                    const updatedProject = { ...prev, taskGroups: [...updatedGroup] };
                    // saveData({ updatedProject, taskCategory: "Projects" });
                    return updatedProject;
                }

                else if (ifDelete && prev.taskGroups) {
                    const updatedGroup = prev.taskGroups.filter(gr => gr.groupId != groupId);
                    const updatedProject = { ...prev, taskGroups: [...updatedGroup] };
                    if(userId)saveProjectFromFirestore(userId, updatedProject, null, undefined, "update");
                    // saveData({ updatedProject, taskCategory: "Projects" });
                    return updatedProject;
                }
            }

            return prev
        })
    }
}