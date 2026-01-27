import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import s from './styles.module.css'
import { DropDown } from '../../../../../../../../components/drop-down/DropDown';
import { context } from '../../../../../../../context/AppContext';
import Button from '../../../../../../../../components/ui/Button';
import Task from '../Task/Task';
import { updateTask } from '../../utils/updateTask';
import { updateGroup } from '../../utils/updateGroup';

const TaskGroup = memo(function TaskGroup(props: TaskGroupProps) {
  // CONTEXT & PROPS
  const { darkMode, setSelectedTaskClass, setAllowChanges, userInfo, selectedTaskClass } = useContext(context) as Context;
  const { group, setCreateAndEditModal, setPropsForCEM, index } = props as TaskGroupProps
  const taskGroupsLength = selectedTaskClass?.taskGroups.length;

  // BOOLEAN
  const [showTools, setShowTools] = useState<boolean>(false)
  const [hideTasks, setHideTasks] = useState<boolean>(false);

  // Memoize action lists to prevent recreating on every render
  const actionLists: ActionsLists[] = useMemo(() => [
    {
      action: "Edit", functionCall: () => {
        const newProps: PropsForCEM = {
          modalTitle: "Group Task", modalDesc: "Edit Group Task Name",
          modalFor: "group", modalAction: "update",
          group,
        }
        setCreateAndEditModal(true)
        setPropsForCEM({ ...newProps })
      }
    },
    {
      action: "Delete", functionCall: () => {
        updateGroup({
          groupId: group.groupId, changedValue: null, action: "delete", setSelectedTaskClass, setAllowChanges
        })
      }
    },
    {
      action: "Pending Selected", functionCall: () => {
        setAllowChanges(true)
        group.tasks.forEach((task) => updateTask({
          setSelectedTaskClass, targetAttribute: "status", changedValue: "pending",
          task, groupId: group.groupId, userId: userInfo?.userId,
          isMultipleTarget: true
        }))
      }
    },
    {
      action: "Finish Selected", functionCall: () => {
        setAllowChanges(true)
        group.tasks.forEach((task) => updateTask({
          setSelectedTaskClass, targetAttribute: "status", changedValue: "finished",
          task, groupId: group.groupId, userId: userInfo?.userId,
          isMultipleTarget: true
        }))
      }
    },
  ], [group, setCreateAndEditModal, setPropsForCEM, setSelectedTaskClass, setAllowChanges, userInfo?.userId]);

  // Memoize callback functions
  const handleCreateTask = useCallback(() => {
    const newProps: PropsForCEM = {
      modalTitle: "Create New Task", modalDesc: "Give a task description",
      modalFor: "task", modalAction: "create",
      group,
    }
    setCreateAndEditModal(true)
    setPropsForCEM({ ...newProps })
  }, [group, setCreateAndEditModal, setPropsForCEM]);

  const handleToggleTools = useCallback(() => {
    setShowTools(prev => !prev)
  }, []);

  const handleHideTasksChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setHideTasks(e.target.checked)
  }, []);

  useEffect(() => {
    setHideTasks(false);
  }, [group.groupId]); // Only reset when group ID changes, not the entire group object

  return (
    <div className={
      !darkMode
        ? s.taskGroup
        : `${s.taskGroup} ${s.dark}`
    }
      style={{ zIndex: `${(taskGroupsLength && index) || (taskGroupsLength && index == 0) ? taskGroupsLength - index : 0}` }}
    >
      <label htmlFor={group.groupId} className={s.top}>
        <h2 className={s.groupName}>
          <i className={hideTasks ? "fas fa-angle-down" : "fas fa-angle-up"}></i>
          <input
            type="checkbox"
            id={group.groupId}
            className={s.hide}
            onChange={handleHideTasksChange}
            checked={hideTasks}
          />
          {group.groupName}
        </h2>
        <Button
          className={s.actionButton}
          clickListener={handleCreateTask}
          iconElement={<i className="fas fa-plus"></i>}
        />
        <Button
          className={s.actionButton}
          clickListener={handleToggleTools}
          iconElement={<i className="fas fa-ellipsis-v"></i>}
        />
        <DropDown {...{ darkMode, showTools, actionLists, setShowTools }} />
      </label>
      <div className={hideTasks ? s.hideTasks : s.tasks} id={`${group.groupId}`}>
        {group.tasks.map((t, index) => {
          return <Task
            {...props}
            key={t.id}
            task={t}
            isRealTask={true}
            group={group}
            index={index}
            tasksLength={group.tasks.length}
            setCreateAndEditModal={setCreateAndEditModal}
            setPropsForCEM={setPropsForCEM}
          />
        })}
      </div>
    </div>
  )
}, (prevProps, nextProps) => {
  // Check group properties
  if (prevProps.group.groupId !== nextProps.group.groupId) return false;
  if (prevProps.group.groupName !== nextProps.group.groupName) return false;
  if (prevProps.index !== nextProps.index) return false;
  if (prevProps.group.tasks.length !== nextProps.group.tasks.length) return false;

  // Deep compare each task
  const tasksAreEqual = prevProps.group.tasks.every((task, idx) => {
    const nextTask = nextProps.group.tasks[idx];
    if (!nextTask) return false;

    return (
      task.id === nextTask.id &&
      task.description === nextTask.description &&  // ✅ Check description
      task.status === nextTask.status &&            // ✅ Check status
      task.isSelected === nextTask.isSelected       // ✅ Check selection
    );
  });

  return tasksAreEqual;
});

export default TaskGroup;