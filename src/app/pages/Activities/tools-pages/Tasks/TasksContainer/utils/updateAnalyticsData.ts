import { updateAnalytics } from "../../../../../../../lib/firebase";
import { updateWeekData } from "../../../../../../../utils/updateWeekData";

export type UpdatedAnalyticsData = {
    updatedGroup: TaskGroup[],
    project: TaskClass,
    dateUpdated: number,
    userId: string;
    setAnalytics?: React.Dispatch<React.SetStateAction<Analytics>>;
    setWeekData?: React.Dispatch<React.SetStateAction<AnalyticsWeekData | null>>;
}

export async function updateAnalyticsData(args: UpdatedAnalyticsData) {
    const { setAnalytics, updatedGroup, userId, setWeekData, project, dateUpdated } = args;
    const date = new Date();
    let finishedTasks: Task[] = [];
    let allTask: Task[] = []

    if (setAnalytics) {
        updatedGroup.forEach(group => {
            group.tasks.forEach(task => {
                if (task.status == "finished" && date.toLocaleDateString() == task.dateFinished) finishedTasks.push(task)
                allTask.push(task);
            })
        });

        setAnalytics(prev => {
            if (prev.dateUpdated != dateUpdated) {
                const updatedAnalytics = { ...prev, dateUpdated, allTask };
                updateAnalytics(userId, updatedAnalytics);
                return updatedAnalytics;
            }
            return prev
        })

        if (setWeekData && userId) {
            await updateWeekData(userId, project.id, finishedTasks, setWeekData);
        }
    }
}