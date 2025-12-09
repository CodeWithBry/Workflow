import { useContext, useState } from 'react'
import s from './styles.module.css'
import { context } from '../../../AppContext/AppContext';
import Tools from './components/Tools/Tools';

export default function TaskContainer() {
    const { darkMode } = useContext(context) as AppContextType;

    // BOOLEANS
    const [showTools, setShowTools] = useState<boolean>(false);
    // STRINGS

    // NUMBERS

    // OBJECTS AND ARRAYS
    const [taskGroups, setTaskGroups] = useState<TaskGroups[]>([
        {groupName: "Create Sidebar Component", groupId: crypto.randomUUID()},
        {groupName: "Create Dropdown Function", groupId: crypto.randomUUID()},
        {groupName: "Modify Layout", groupId: crypto.randomUUID()}
    ]);

    const value = {
        // BOOLEANS
        showTools, setShowTools,
        // STRINGS
        // NUMBERS
        // OBJECTS AND ARRAYS
        taskGroups, setTaskGroups
    };

    return (
        <div className={
            !darkMode
                ? s.taskContainer
                : `${s.taskContainer} ${s.darkTaskContainer}`
        }>
            <Tools {...value} />
        </div>
    )
}