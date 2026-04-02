function useCountTasks(selectedTaskClass: SelectedTaskClass) {
    if (selectedTaskClass) {
        let tasksCount: number = 0;
        let finishedTasks: number = 0;

        if (selectedTaskClass.taskGroups instanceof Array) {
            selectedTaskClass.taskGroups?.forEach(g => {
                tasksCount += g.tasks.length;
                g.tasks.forEach(t => {
                    if (t.status == "finished") finishedTasks++;
                })
            })
        }

        return { tasksCount, finishedTasks }
    }
}

export default useCountTasks;