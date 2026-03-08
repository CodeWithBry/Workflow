import { useContext, useState, useMemo, useEffect } from 'react'
import s from './styles.module.css'
import Tools from './components/Tools/Tools';
import GroupTaskModal from './components/modals/CreateGroupTaskModal/CreateGroupTaskModal';
import { context } from '../../../../../context/AppContext';
import CreateAndEditModal from './components/modals/CreateAndEditModal/CreateAndEditModal';
import SearchBox from './components/modals/SearchBox/SearchBox';
import SkeletonGroup from './components/skeletons/SkeletonGroup';
import TaskGroup from './components/TasksGroup/TaskGroup';
import DeleteTaskGroupBox from './components/modals/DeleteTaskGroupBox/DeleteTaskGroupBox';

export default function TaskContainer() {
    const { darkMode, selectedTaskClass, isDataLoaded } = useContext(context) as Context;

    // BOOLEANS
    const [showTools, setShowTools] = useState<boolean>(false);
    const [showGTM, setShowGTM] = useState<boolean>(false);
    const [showTaskForm, setShowTaskForm] = useState<boolean>(false);
    const [showSearchBox, setShowSearchBox] = useState<boolean>(false);
    const [createAndEditModal, setCreateAndEditModal] = useState<boolean>(false);
    const [showDTGB, setShowDTGB] = useState<boolean>(false); //DeleteTaskGroupBox(DTGB)

    // STRINGS
    // NUMBERS

    // OBJECTS AND ARRAYS
    const [pseudoGroup, setPseudoGroup] = useState<PseudoGroup>(null);
    const [pseudoTasks, setPseudoTasks] = useState<PseudoTasks>(null);
    const [propsForCEM, setPropsForCEM] = useState<PropsForCEM>(null);
    const [propsForDTGB, setPropsForDTGB] = useState<PropsForDTGB>({ ...{ showDTGB, setShowDTGB } });

    const values: TaskContainerValues = useMemo(() => ({
        // BOOLEANS
        showTools, setShowTools,
        showGTM, setShowGTM,
        showTaskForm, setShowTaskForm,
        showSearchBox, setShowSearchBox,
        createAndEditModal, setCreateAndEditModal,
        showDTGB, setShowDTGB,
        // NUMBERS
        // OBJECTS AND ARRAYS
        pseudoGroup, setPseudoGroup,
        pseudoTasks, setPseudoTasks,
        propsForCEM, setPropsForCEM,
        propsForDTGB, setPropsForDTGB
    }), [
        showTools, showGTM, showTaskForm, showSearchBox, createAndEditModal,
        pseudoGroup, pseudoTasks, propsForCEM, showDTGB, propsForDTGB
    ]);

    useEffect(() => {
        setPropsForDTGB(prev => ({ ...prev, showDTGB, setShowDTGB }))
    }, [showDTGB])

    return (
        <>
            <GroupTaskModal {...values} />
            <CreateAndEditModal {...values} />
            <SearchBox {...values} />
            <DeleteTaskGroupBox {...propsForDTGB} />


            <div className={s.wrapper}>
                <div className={
                    !darkMode
                        ? s.taskContainer
                        : `${s.taskContainer} ${s.dark}`
                }>
                    {/* Dropdowns and Modals */}
                    <Tools {...values} />

                    {/* Main UI */}
                    <div className={s.groups} id='groupsContainer'>
                        {
                            isDataLoaded && selectedTaskClass
                                ? selectedTaskClass?.taskGroups?.length > 0
                                    ? selectedTaskClass?.taskGroups?.map((group, index) => {
                                        return <TaskGroup
                                            key={group.groupId}
                                            {...{ ...values, group, index, showDTGB, setShowDTGB, setPropsForDTGB }}
                                        />
                                    })
                                    : isDataLoaded && <h1>There is no task groups.</h1>
                                : <SkeletonGroup style={s.skeletonGroup} />
                        }
                    </div>
                </div>
            </div>
        </>
    )
}