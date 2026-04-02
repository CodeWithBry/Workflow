import type { Dispatch, SetStateAction } from "react";
import { saveWeeksData } from "../lib/firebase";

export async function updateWeekData(userId: string, id: string, finishedTasks: Task[], setWeekData: Dispatch<SetStateAction<AnalyticsWeekData | null>>) {
    setWeekData(prev => {
        if (!prev) return prev;
        //get the day today
        const dayToday = new Date();
        // update the data on the day that is based on the current day.
        const updatedDays = prev.days?.map((day) => {
            if (day.label == dayToday.getDay()) {
                return { ...day, finishedTasks };
            }

            return day
        });
        // update the data sets from indexes 0 - 6(Sunday - Saturday)
        const updatedDataSets = prev.dataSets.map((num, idx) => {
            const getDay = updatedDays.find(day => day.label == idx);

            return idx == dayToday.getDay() && getDay
                ? getDay.finishedTasks.length
                : num;
        });

        // updated Week Data in one variable
        const updatedWeekData = { ...prev, days: updatedDays, dataSets: updatedDataSets };

        if (userId) saveWeeksData(userId, id, updatedWeekData);
        return updatedWeekData;
    })
}