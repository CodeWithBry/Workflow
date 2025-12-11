import { useContext, useEffect, useState } from 'react'
import s from './styles.module.css'
import { context } from '../../../../app/AppContext/AppContext';
import Tools from './components/Tools/Tools';
import GroupTaskModal from './components/GroupTaskModal/GroupTaskModal';
import TaskGroup from './components/TasksGroup/TaskGroup';

export default function TaskContainer() {
    const { darkMode } = useContext(context) as AppContextType;

    // BOOLEANS
    const [showTools, setShowTools] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
    // STRINGS
    const [groupName, setGroupName] = useState<string>("");

    // NUMBERS

    // OBJECTS AND ARRAYS
    const [taskGroups, setTaskGroups] = useState<TaskGroup[] | null>(null);
    const [pseudoGroup, setPseudoGroup] = useState<PseudoGroup>(null)
    const [pseudoTasks, setPseudoTasks] = useState<PseudoTasks>(null)

    const value = {
        // BOOLEANS
        showTools, setShowTools,
        showModal, setShowModal,
        showTaskForm, setShowTaskForm,
        // STRINGS
        groupName, setGroupName,
        // NUMBERS
        // OBJECTS AND ARRAYS
        taskGroups, setTaskGroups,
        pseudoGroup, setPseudoGroup,
        pseudoTasks, setPseudoTasks
    };

    useEffect(() => {
        console.log(pseudoGroup, taskGroups)
    }, [pseudoGroup, taskGroups])

    return (
        <div className={
            !darkMode
                ? s.taskContainer
                : `${s.taskContainer} ${s.darkTaskContainer}`
        }>
            {/* Dropdowns and Modals */}
            <Tools {...value} />
            <GroupTaskModal {...value} />

            {/* Main UI */}
            <div className={s.groups}>
                {taskGroups?.map((taskGroup) => {
                    const taskGroupProps = {
                        setTaskGroups,
                        setPseudoTasks,
                        taskGroup

                    }
                    return <TaskGroup {...taskGroupProps} />
                })}
            </div>
        </div>
    )
}