import type { Dispatch, SetStateAction } from "react";
import { getProjectsData } from "../lib/firebase";

export async function getSelectedTaskClass(id: string, userId: string, setSelectedTaskClass: Dispatch<SetStateAction<SelectedTaskClass>>) {
    try {
        const getProject = await getProjectsData(userId, id);
        setSelectedTaskClass(getProject);
    } catch (error) {
        console.log(error)
    }
} 