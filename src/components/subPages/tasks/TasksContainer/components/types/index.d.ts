import type { Dispatch, SetStateAction } from "react";

declare global {
    // VARIABLES
    type PseudoGroup = TaskGroup | null;
    
    type PseudoTasks = Tasks[] | null

    type ActionsLists = {
        action: string,
        functionCall: () => void
    }

    // PROPS

    type ToolsProps = {
        showTools: boolean,
        setShowTools: Dispatch<SetStateAction<boolean>>,
        setShowModal: Dispatch<SetStateAction<boolean>>,
    }

    type GroupTaskModalProps = {
        taskGroups: TaskGroup[] | null,
        setTaskGroups: Dispatch<SetStateAction<TaskGroup[] | null>>
        showModal: boolean,
        setShowModal: Dispatch<SetStateAction<boolean>>,
        groupName: string,
        setGroupName: Dispatch<SetStateAction<string>>,
        showTaskForm: boolean,
        setShowTaskForm: Dispatch<SetStateAction<boolean>>,
        pseudoGroup: PseudoGroup, 
        setPseudoGroup: Dispatch<SetStateAction<PseudoGroup>>,
        pseudoTasks: PseudoTasks, 
        setPseudoTasks: Dispatch<SetStateAction<PseudoTasks>>
    }

    type TopProps = {
        showTaskForm: boolean
    }

    type FormProps = {
        showTaskForm: boolean,
        setTaskGroups: Dispatch<SetStateAction<TaskGroup[] | null>>,
        groupName: string,
        setGroupName: Dispatch<SetStateAction<string>>,
        pseudoTasks: PseudoTasks,
        setPseudoTasks: Dispatch<SetStateAction<PseudoTasks>>,
        pseudoGroup: PseudoGroup, 
    }

    type BottomModalProps = {
        setShowModal: Dispatch<SetStateAction<boolean>>,
        showTaskForm: boolean,
        setShowTaskForm: Dispatch<SetStateAction<boolean>>,
        groupName: string,
        setPseudoGroup: Dispatch<SetStateAction<PseudoGroup>>,
        pseudoGroup: PseudoGroup, 
        setTaskGroups: Dispatch<SetStateAction<TaskGroup[] | null>>,
        pseudoTasks: PseudoTasks, 
    } 

    type TaskProps = {
        task: Tasks,
        setTaskGroups: Dispatch<SetStateAction<TaskGroup[] | null>>,
        setPseudoTasks: Dispatch<SetStateAction<PseudoTasks>>,
        isRealTask: boolean,
        groupId?: string
    }

    type TaskGroupProps = {
        taskGroup: TaskGroup,
        setTaskGroups: Dispatch<SetStateAction<TaskGroup[] | null>>,
        setPseudoTasks: Dispatch<SetStateAction<PseudoTasks>>,
    }

    type EditTaskGroupName = (groupId: string, setTaskGroups: Dispatch<SetStateAction<TaskGroup[]>>, changedValue: string) => void
}

export { };