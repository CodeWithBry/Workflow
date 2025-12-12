import type { Dispatch, SetStateAction } from "react";

declare global {
    // VARIABLES
    type PseudoGroup = TaskGroup | null;

    type PseudoTasks = Tasks[] | null

    type ActionsLists = {
        action: string,
        functionCall: () => void
    }
    
    type SelectedGroup = TaskGroup | null

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
        setPseudoTasks: Dispatch<SetStateAction<PseudoTasks>>,
        showEditModal: boolean,
        setShowEditModal: Dispatch<SetStateAction<boolean>>,
        description: string,
        setDescription: Dispatch<SetStateAction<string>>,
        modalName: string,
        setModalName: Dispatch<SetStateAction<string>>,
        changeValueFor: string,
        setChangeValueFor: Dispatch<SetStateAction<string>>,
        selectedGroup: SelectedGroup,
        setSelectedGroup: Dispatch<SetStateAction<SelectedGroup>>,
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

    type BottomProps = {
        setShowModal: Dispatch<SetStateAction<boolean>>,
        showTaskForm: boolean,
        setShowTaskForm: Dispatch<SetStateAction<boolean>>,
        groupName: string,
        setPseudoGroup: Dispatch<SetStateAction<PseudoGroup>>,
        pseudoGroup: PseudoGroup,
        setTaskGroups: Dispatch<SetStateAction<TaskGroup[] | null>>,
        pseudoTasks: PseudoTasks,
        setPseudoTasks: Dispatch<SetStateAction<PseudoTasks>>,
        setGroupName: Dispatch<SetStateAction<string>>,
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
        showEditModal: boolean,
        setShowEditModal: Dispatch<SetStateAction<boolean>>,
        setDescription: Dispatch<SetStateAction<string>>,
        setModalName: Dispatch<SetStateAction<string>>,
        setSelectedGroup: Dispatch<SetStateAction<SelectedGroup>>,
    }

    // EDIT MODAL
    type EditModal = {
        modalName: string,
        setModalName: Dispatch<SetStateAction<string>>,
        description: string,
        setDescription: Dispatch<SetStateAction<string>>,
        changeValueFor: string,
        showEditModal: boolean,
        setShowEditModal: Dispatch<SetStateAction<boolean>>,
        selectedGroup: SelectedGroup,
        setSelectedGroup: Dispatch<SetStateAction<SelectedGroup>>,
        setTaskGroups: Dispatch<SetStateAction<TaskGroup[] | null>>,
    }

    type EditTopModal = {
        modalName: string,
        description: string,
    }

    type EditFormModal = {
        changedValue: string,
        setChangedValue: Dispatch<SetStateAction<string>>,
        setDescription: Dispatch<SetStateAction<string>>,
        setModalName: Dispatch<SetStateAction<string>>,
        selectedGroup: SelectedGroup,
    }

    type EditBottomModal = {
        changedValue: string,
        setShowEditModal: Dispatch<SetStateAction<boolean>>,
        setTaskGroups: Dispatch<SetStateAction<TaskGroup[] | null>>,
        selectedGroup: SelectedGroup,
        setSelectedGroup: Dispatch<SetStateAction<SelectedGroup>>,
    }

    type EditTaskGroupName = (groupId: string, setTaskGroups: Dispatch<SetStateAction<TaskGroup[] | null>>, changedValue: string) => void
}

export { };