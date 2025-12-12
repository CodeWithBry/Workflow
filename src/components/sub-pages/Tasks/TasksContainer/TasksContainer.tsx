import { useContext, useEffect, useState } from 'react'
import s from './styles.module.css'
import { context } from '../../../../app/AppContext/AppContext';
import Tools from './components/Tools/Tools';
import GroupTaskModal from './components/GroupTaskModal/GroupTaskModal';
import TaskGroup from './components/TasksGroup/TaskGroup';
import EditModal from './components/EditModal/EditModal';

export default function TaskContainer() {
    const { darkMode } = useContext(context) as AppContextType;

    // BOOLEANS
    const [showTools, setShowTools] = useState<boolean>(false);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    // STRINGS
    const [groupName, setGroupName] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [modalName, setModalName] = useState<string>("");
    const [changeValueFor, setChangeValueFor] = useState<string>("");
    // NUMBERS
    
    // OBJECTS AND ARRAYS
    const [selectedGroup, setSelectedGroup] = useState<SelectedGroup>(null);
    const [taskGroups, setTaskGroups] = useState<TaskGroup[] | null>(null);
    const [pseudoGroup, setPseudoGroup] = useState<PseudoGroup>(null);
    const [pseudoTasks, setPseudoTasks] = useState<PseudoTasks>(null);

    const values = {
        // BOOLEANS
        showTools, setShowTools,
        showModal, setShowModal,
        showTaskForm, setShowTaskForm,
        showEditModal, setShowEditModal,
        // STRINGS
        groupName, setGroupName,
        description, setDescription,
        modalName, setModalName,
        changeValueFor, setChangeValueFor,
        selectedGroup, setSelectedGroup,
        // NUMBERS
        // OBJECTS AND ARRAYS
        taskGroups, setTaskGroups,
        pseudoGroup, setPseudoGroup,
        pseudoTasks, setPseudoTasks
    };

    useEffect(() => {
        console.log(taskGroups)
    }, [taskGroups])

    return (
        <div className={
            !darkMode
                ? s.taskContainer
                : `${s.taskContainer} ${s.darkTaskContainer}`
        }>
            {/* Dropdowns and Modals */}
            <Tools {...values} />
            <GroupTaskModal {...values} />
            <EditModal {
                ...{...values, groupId: ""}
            } />

            {/* Main UI */}
            <div className={s.groups}>
                {taskGroups?.map((taskGroup) => {
                    const taskGroupProps = {
                        setTaskGroups,
                        setPseudoTasks,
                        taskGroup,
                        showEditModal,
                        setShowEditModal,
                        setDescription,
                        setModalName,
                        setSelectedGroup
                    }
                    return <TaskGroup {...taskGroupProps} />
                })}
            </div>
        </div>
    )
}