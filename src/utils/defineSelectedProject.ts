import type { Dispatch, SetStateAction } from "react";

export type GetSelectedProject = { 
    setProjects: Dispatch<SetStateAction<Projects[]>>, 
    projectName: string | null
}

export function defineSelectedProject({ setProjects, projectName }: GetSelectedProject) {
    setProjects(prev => prev.map((proj) => {
        if (proj.projectName == projectName) return { ...proj, tabFocused: true };

        return { ...proj, tabFocused: false };
    }))
}