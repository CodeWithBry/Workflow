import type { Dispatch, SetStateAction } from "react";

export function getData (
    setProjects: Dispatch<SetStateAction<Projects[]>>,
    setNormalTasks: Dispatch<SetStateAction<NormalTasks[]>>
) { 
    const getProjects: string | null = localStorage.getItem("Projects");
    const getNormalTasks: string | null = localStorage.getItem("NormalTasks");

    if (getProjects) {
        const serializeData = JSON.parse(getProjects) as Projects[];
        setProjects([...serializeData])
    }

    if (getNormalTasks) {
        const serializeData = JSON.parse(getNormalTasks) as NormalTasks[];
        setNormalTasks([...serializeData])
    }
}