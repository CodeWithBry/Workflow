export type GetSelectedProject = (projects: Projects[]) => Projects | undefined;

export const getSelectedProject: GetSelectedProject = (projects) => {
    return projects.find((proj) => proj.tabFocused)
}