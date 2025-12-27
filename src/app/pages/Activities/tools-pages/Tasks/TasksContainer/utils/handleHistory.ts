import type { Dispatch, SetStateAction } from "react";

type HandleHistory = {
    action: "undo" | "redo",
    setTaskClass: Dispatch<SetStateAction<TaskClass[]>>,
    taskClassId: string | undefined,
    historyChanges: HistoryChanges,
    setHistoryChanges: Dispatch<SetStateAction<HistoryChanges>>,
    setAllowChanges: Dispatch<SetStateAction<boolean>>,
    taskClass?: TaskClass[]
}

function handleHistory({ action, setTaskClass, taskClassId, historyChanges, setHistoryChanges, setAllowChanges }: HandleHistory) {
    if(!taskClassId) return

    setAllowChanges(false)
    if (action == "undo" && (historyChanges.currentStateNumber - 1) > -1) {
        setTaskClass(prev => prev.map((taskClass) => {
            if (taskClassId == taskClass.id) return { ...historyChanges.changesInProject[historyChanges.currentStateNumber - 1] }
            return taskClass
        }))
        setHistoryChanges(prev => ({...prev, currentStateNumber: prev.currentStateNumber - 1}))
    } else if (action == "redo" && ( historyChanges.currentStateNumber + 1) < historyChanges.changesInProject.length) {
        setTaskClass(prev => prev.map((taskClass) => {
            if (taskClassId == taskClass.id) return { ...historyChanges.changesInProject[historyChanges.currentStateNumber + 1] }
            return taskClass
        }))
        setHistoryChanges(prev => ({ ...prev, currentStateNumber: prev.currentStateNumber + 1 }))
    }
}

export default handleHistory; 