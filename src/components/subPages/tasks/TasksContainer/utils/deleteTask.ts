export type DeleteTask = TaskProps; 

export function deleteTask({ task, setPseudoTasks, setTaskGroups, isRealTask, groupId }: DeleteTask) {
    if (!isRealTask) return setPseudoTasks(prev => prev ? prev.filter((t) => task.tid != t.tid) : null)

    setTaskGroups(prev => prev ? prev.map((group) => {
        if (groupId != group.groupId || group.tasks == null) return { ...group }
        const updatedTasks = group.tasks.filter((t) => task.tid != t.tid )

        return { ...group, tasks: updatedTasks }
    }) : null)
}