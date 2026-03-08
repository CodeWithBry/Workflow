import type { Dispatch, SetStateAction } from "react";
import { getAnalyticsData, setAnalyticsData } from "../lib/firebase";
import { getWeekRange } from "./getWeekRange";

export async function getAnalytics(id: string, userId: string, setAnalytics: Dispatch<SetStateAction<Analytics>>, setSelectedTaskClass: Dispatch<SetStateAction<SelectedTaskClass>>): Promise<null | {
    analyticsData: Analytics,
    date: string
} | undefined> {
    try {
        // Get the analytics data of the selected project
        const getAnalytics = await getAnalyticsData(userId, id);

        if (getAnalytics) {
            const finishedTasks: Task[] = getAnalytics.allTask.filter(task => task.status == "finished");
            if (getAnalytics.weeks[getAnalytics.weeks?.length - 1] != getWeekRange()
                && finishedTasks.length != getAnalytics.allTask.length) {

                const updatedAnalytics: Analytics = ({ ...getAnalytics, weeks: [...getAnalytics.weeks, getWeekRange()] });
                setAnalytics({ ...updatedAnalytics });
                return { analyticsData: updatedAnalytics, date: updatedAnalytics.weeks[updatedAnalytics.weeks.length - 1] };
            }
            setAnalytics({ ...getAnalytics });
            return { analyticsData: getAnalytics, date: getAnalytics.weeks[getAnalytics.weeks.length - 1] };
        }

        // if there is no existing data, make a variable, update the current analytics state and save to database.
        else if (!getAnalytics && setSelectedTaskClass) {
            setSelectedTaskClass(prev => {
                if (!prev) return null;
                const getAllTask: Task[] = [];
                prev.taskGroups.forEach(group => {
                    group.tasks.forEach(task => {
                        getAllTask.push(task);
                    });
                });

                setAnalytics(prev => {
                    const updatedAnalytics: Analytics = ({ ...prev, id, allTask: [...getAllTask], weeks: [getWeekRange()] });

                    setAnalyticsData(userId, id, updatedAnalytics);
                    return updatedAnalytics;
                });

                return prev;
            })

            return null;
        }
    } catch (error) {
        console.log(error)
    }
} 1
