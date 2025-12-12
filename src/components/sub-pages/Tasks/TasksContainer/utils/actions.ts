export const editTaskGroupName: EditTaskGroupName = (groupId, setTaskGroups, changedValue) => {
    setTaskGroups(prev => prev ? prev.map(group => {
        if(groupId == group.groupId) return {...group, groupName: changedValue }

        else return {...group}
    }) : null)
}