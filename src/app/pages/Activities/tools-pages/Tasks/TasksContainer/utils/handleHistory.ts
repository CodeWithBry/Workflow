import type { Dispatch, SetStateAction } from "react";

type HandleHistory = {
    action: "undo" | "redo",
    setSelectedTaskClass: Dispatch<SetStateAction<SelectedTaskClass>>,
    taskClassId: string | undefined,
    historyChanges: HistoryChanges,
    setHistoryChanges: Dispatch<SetStateAction<HistoryChanges>>,
    setAllowChanges: Dispatch<SetStateAction<boolean>>,
    taskClass?: TaskClassLists[]
}

function handleHistory({ action, setSelectedTaskClass, taskClassId, historyChanges, setHistoryChanges, setAllowChanges }: HandleHistory) {
    if (!taskClassId) return

    setAllowChanges(false)
    if (action == "undo" && (historyChanges.currentStateNumber - 1) > -1) {
        setSelectedTaskClass((prev) => {
            if (prev) return { ...historyChanges.changesInProject[historyChanges.currentStateNumber - 1] }
            return prev
        })
        setHistoryChanges(prev => ({ ...prev, currentStateNumber: prev.currentStateNumber - 1 }))
    } else if (action == "redo" && (historyChanges.currentStateNumber + 1) < historyChanges.changesInProject.length) {
        setSelectedTaskClass((prev) => {
            if (prev) return { ...historyChanges.changesInProject[historyChanges.currentStateNumber + 1] }
            return prev
        })
        setHistoryChanges(prev => ({ ...prev, currentStateNumber: prev.currentStateNumber + 1 }))
    }
}

export default handleHistory; 