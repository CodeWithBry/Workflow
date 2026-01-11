// PROJECTS/NORMAL-TASKS
export type TaskClass = {
    name: string,
    taskType: "projects" | "normal-tasks"
    id: string,
    isOpened: boolean,
    icon: string,
    taskGroups: TaskGroup[],
    status?: "finished" | "pending"
};

export type SelectedTaskClass = TaskClass | null;

// TASK GROUP
export type TaskGroup = {
    groupName: string,
    groupId: string,
    tasks: Task[]
};

export type SelectedGroup = TaskGroup | null;

// TASKS
export type Task = {
    id: string,
    description: string,
    dateCreated: string,
    status: "pending" | "finished",
    isSelected: "true" | "false",
    groupId: string
};