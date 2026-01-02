import { useContext, useState } from 'react'
import s from './styles.module.css'
import Tools from './components/Tools/Tools';
import GroupTaskModal from './components/CreateGroupTaskModal/CreateGroupTaskModal';
import { context } from '../../../../../context/AppContext';
import TaskGroup from './components/TasksGroup/TaskGroup';
import CreateAndEditModal from './components/CreateAndEditModal/CreateAndEditModal';

export default function TaskContainer() {
    const { darkMode, selectedTaskClass } = useContext(context) as Context;

    // BOOLEANS
    const [showTools, setShowTools] = useState<boolean>(false);
    const [showGTM, setShowGTM] = useState<boolean>(false);
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
    const [createAndEditModal, setCreateAndEditModal] = useState<boolean>(false);

    // STRINGS
    // NUMBERS

    // OBJECTS AND ARRAYS
    const [pseudoGroup, setPseudoGroup] = useState<PseudoGroup>(null);
    const [pseudoTasks, setPseudoTasks] = useState<PseudoTasks>(null);
    const [propsForCEM, setPropsForCEM] = useState<PropsForCEM>(null);

    const values: TaskContainerValues = {
        // BOOLEANS
        showTools, setShowTools,
        showGTM, setShowGTM,
        showTaskForm, setShowTaskForm,
        createAndEditModal, setCreateAndEditModal,
        // NUMBERS
        // OBJECTS AND ARRAYS
        pseudoGroup, setPseudoGroup,
        pseudoTasks, setPseudoTasks,
        propsForCEM, setPropsForCEM,
    };

    return (
        <div className={
            !darkMode
                ? s.taskContainer
                : `${s.taskContainer} ${s.darkTaskContainer}`
        }>
            {/* Dropdowns and Modals */}
            <Tools {...values} />
            <GroupTaskModal {...values} />
            <CreateAndEditModal {
                ...{ ...values }
            } />

            {/* Main UI */}
            <div className={s.groups}>
                {
                    selectedTaskClass?.taskGroups.map(group => {
                        
                        return <TaskGroup {...{ ...values, group }} />
                    })
                }
            </div>
        </div>
    )
}