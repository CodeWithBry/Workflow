import type { Dispatch, SetStateAction } from "react";

export type ResetGroupTaskModal = {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    setPseudoGroup: Dispatch<SetStateAction<PseudoGroup | null>>;
    setPseudoTasks: Dispatch<SetStateAction<PseudoTasks | null>>;
    setGroupName: Dispatch<SetStateAction<string>>;
    setShowTaskForm: Dispatch<SetStateAction<boolean>>;
}


export function resetGroupTaskModal({
    setShowModal, setPseudoGroup,
    setPseudoTasks, setGroupName, setShowTaskForm
}: ResetGroupTaskModal) {
    setShowModal(false);
    setPseudoGroup(null);
    setPseudoTasks(null);
    setGroupName("");
    setShowTaskForm(false);
}
