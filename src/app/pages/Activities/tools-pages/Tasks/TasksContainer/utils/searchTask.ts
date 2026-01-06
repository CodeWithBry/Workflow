import { type Dispatch, type SetStateAction } from "react";

function searchTask(searchInput: string, setSearchInput: Dispatch<SetStateAction<string>>, setResults: Dispatch<SetStateAction<Task[]>>, selectedTaskClass: SelectedTaskClass) {
    if (searchInput == "") {
        setSearchInput('');
        return [];
    };

    if (!selectedTaskClass) return [];
    let listsOfTasks: Task[] = [];
    for (let i in selectedTaskClass.taskGroups) {
        for (let j in selectedTaskClass.taskGroups[i].tasks) {
            listsOfTasks.push(selectedTaskClass.taskGroups[i].tasks[j])
        }
    }
    const filterTask = listsOfTasks.filter(t => t.description.includes(searchInput));
    console.log(filterTask)
    setResults([...filterTask]);
}

export default searchTask;