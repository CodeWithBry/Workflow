import type { Dispatch, SetStateAction } from "react";

declare global {
    // VARIABLES
    type PseudoGroup = TaskGroup | null;
    type PseudoTasks = Task[] | null;

    type ModalAction = "update" | "create";
    type ModalFor = "task" | "group";

    type ActionsLists = {
        action: string,
        functionCall: () => void
    }

    // CreateAndEditModal
    type PropsForCEM = {
        group: TaskGroup,
        task?: Task,
        modalDesc: string,
        modalTitle: string,
        modalAction: ModalAction,
        modalFor: ModalFor,
    } | null
}

// COMPONENTS
declare global {
    type ToolsProps = {
        setShowGTM: Dispatch<SetStateAction<boolean>>
    }

    type TaskGroupProps = {
        group: TaskGroup
    } & TaskContainerValues
    type TaskProps = {
        task: Task,
        group: TaskGroup
        isRealTask: boolean
    } & TaskContainerValues


    // MODALS
    type GTMProps = {
        // INHERITED VARIABLES OF THIS COMPONENT
        showGTM: boolean, setShowGTM: Dispatch<SetStateAction<boolean>>,
        showGTM: boolean, setShowGTM: Dispatch<SetStateAction<boolean>>,
        pseudoTasks: PseudoTasks, setPseudoTasks: Dispatch<SetStateAction<PseudoTasks>>
        pseudoGroup: PseudoGroup, setPseudoGroup: Dispatch<SetStateAction<PseudoGroup>>
    }

    type GTMTopProps = TaskContainerValues & GTMProps & GTMValues

    type GTMFormProps = TaskContainerValues & GTMProps & GTMValues

    type GTMBottomProps = TaskContainerValues & GTMProps & GTMValues

    type CEMProps = TaskContainerValues

    type CEMTopProps = {
        changedValue: string, setChangedValue: Dispatch<SetStateAction<string>>,
    } & CEMProps

    type CEMFormProps = {
        changedValue: string, setChangedValue: Dispatch<SetStateAction<string>>,
    } & CEMProps

    type CEMBottomProps = {
        changedValue: string, setChangedValue: Dispatch<SetStateAction<string>>,
    } & CEMProps
}

// DECLARED VALUES 
declare global {
    type TaskContainerValues = {
        // DECLARED VARIABLES INSIDE THIS COMPONENT
        showTools: boolean, setShowTools: Dispatch<SetStateAction<boolean>>,
        showGTM: boolean, setShowGTM: Dispatch<SetStateAction<boolean>>,
        showTaskForm: boolean, setShowTaskForm: Dispatch<SetStateAction<boolean>>,
        createAndEditModal: boolean, setCreateAndEditModal: Dispatch<SetStateAction<boolean>>,
        // NUMBERS
        // OBJECTS AND ARRAYS
        pseudoGroup: PseudoGroup, setPseudoGroup: Dispatch<SetStateAction<PseudoGroup>>,
        pseudoTasks: PseudoTasks, setPseudoTasks: Dispatch<SetStateAction<PseudoTasks>>,
        propsForCEM: PropsForCEM, setPropsForCEM: Dispatch<SetStateAction<PropsForCEM>>,
    }

    type GTMValues = {
        // DECLARED VARIABLES INSIDE THIS COMPONENT
        groupName: string, setGroupName: Dispatch<SetStateAction<string>>,
        showTaskForm: boolean, setShowTaskForm: Dispatch<SetStateAction<boolean>>,
    }

}

export { };