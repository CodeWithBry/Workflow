import type { Dispatch, SetStateAction } from "react";
import { getWeekData, saveWeeksData } from "../lib/firebase";
import { getWeekRange } from "./getWeekRange";

export async function getWeek(userId: string, id: string, date: string, setWeekData: Dispatch<SetStateAction<AnalyticsWeekData | null>>) {
    try {
        const weekData = await getWeekData(userId, id, date);
        if (weekData) {
            setWeekData(weekData);
        }
        else {
            const weekData = {
                "dataSets": [0, 0, 0, 0, 0, 0, 0],
                "date": getWeekRange(),
                "days": [
                    {
                        "finishedTasks": [],
                        "label": 0,
                    },
                    {
                        "finishedTasks": [],
                        "label": 1,
                    },
                    {
                        "finishedTasks": [],
                        "label": 2,
                    },
                    {
                        "finishedTasks": [],
                        "label": 3,
                    },
                    {
                        "finishedTasks": [],
                        "label": 4,
                    },
                    {
                        "finishedTasks": [],
                        "label": 5,
                    },
                    {
                        "finishedTasks": [],
                        "label": 6,
                    },
                ]
            }
            console.log(weekData);
            setWeekData(prev => {
                if(!prev) return null;
                return {...weekData}
            });
            await saveWeeksData(userId, id, weekData);
        }
    } catch (error) {
        console.log(error)
    }
} 