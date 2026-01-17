import { useContext, useState } from 'react'
import s from './styles.module.css'
import Tools from './components/Tools/Tools';
import GroupTaskModal from './components/CreateGroupTaskModal/CreateGroupTaskModal';
import { context } from '../../../../../context/AppContext';
import TaskGroup from './components/TasksGroup/TaskGroup';
import CreateAndEditModal from './components/CreateAndEditModal/CreateAndEditModal';
import SearchBox from './components/SearchBox/SearchBox';
import SkeletonGroup from './components/skeletons/SkeletonGroup';

export default function TaskContainer() {
    const { darkMode, selectedTaskClass, isDataLoaded } = useContext(context) as Context;

    // BOOLEANS
    const [showTools, setShowTools] = useState<boolean>(false);
    const [showGTM, setShowGTM] = useState<boolean>(false);
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
    const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
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
        showSearchBox, setShowSearchBox,
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
            <SearchBox {...values} />

            {/* Main UI */}
            <div className={s.groups} id='groupsContainer'>
                {
                    isDataLoaded && selectedTaskClass
                        ? selectedTaskClass?.taskGroups?.length > 0
                            ? selectedTaskClass?.taskGroups?.map(group => {
                                return <TaskGroup {...{ ...values, group }} />
                            })
                            : isDataLoaded && <h1>There is no task groups.</h1>
                        : <SkeletonGroup style={s.skeletonGroup}/>
                }
            </div>
        </div>
    )
}