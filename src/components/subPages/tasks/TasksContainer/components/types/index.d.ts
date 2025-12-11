import type { Dispatch, SetStateAction } from "react";

declare global {
    // VARIABLES

    type TaskGroups = {
        groupName: string,
        groupId: string,
        tasks: Tasks[] | null
    }

    type PseudoGroup = TaskGroups | null;
    
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

    type SeeMoreProps = {
        showTools: boolean,
        darkMode: boolean,
        actionLists: ActionsLists[],
    }

    type GroupTaskModalProps = {
        setTaskGroups: Dispatch<SetStateAction<TaskGroups[]>>,
        showModal: boolean,
        setShowModal: Dispatch<SetStateAction<boolean>>,
        groupName: string,
        setGroupName: Dispatch<SetStateAction<string>>,
        showTaskForm: boolean,
        setShowTaskForm: Dispatch<SetStateAction<boolean>>,
        pseudoTasks: PseudoTasks, 
        setPseudoTasks: Dispatch<SetStateAction<PseudoTasks>>
    }

    type TopProps = {
        showTaskForm: boolean
    }

    type FormProps = {
        setTaskGroups: Dispatch<SetStateAction<TaskGroups[]>>,
        groupName: string,
        showTaskForm: boolean,
        setGroupName: Dispatch<SetStateAction<string>>,
        pseudoTasks: PseudoTasks,
        setPseudoTasks: Dispatch<SetStateAction<PseudoTasks>>
    }

    type BottomModalProps = {
        setShowModal: Dispatch<SetStateAction<boolean>>,
        showTaskForm: boolean,
        setShowTaskForm: Dispatch<SetStateAction<boolean>>,
        groupName: string
    } 

    type TaskProps = {
        task: Tasks,
        setTaskGroups: Dispatch<SetStateAction<TaskGroups[]>>,
        setPseudoTasks: Dispatch<SetStateAction<PseudoTasks>>,
        isRealTask: boolean,
        groupId?: string
    }

    type EditTaskGroupName = (groupId: string, setTaskGroups: Dispatch<SetStateAction<TaskGroups[]>>, changedValue: string) => void
}

export { };