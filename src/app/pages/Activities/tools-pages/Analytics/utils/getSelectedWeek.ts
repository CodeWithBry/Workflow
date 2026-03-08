import type { Dispatch, SetStateAction } from "react";
import { getWeekData } from "../../../../../../lib/firebase";

export async function getSelectedWeek(userId: string, analyticsId: string, date: string, setWeekData: Dispatch<SetStateAction<AnalyticsWeekData | null>>) {
    try {
        const getData = await getWeekData(userId, analyticsId, date);
        setWeekData(prev => {
            return {
                ...prev,
                dataSets: getData.dataSets,
                date: getData.date,
                days: getData.days 
            }
        });
    } catch (error) {
        console.log(error);
    }
}