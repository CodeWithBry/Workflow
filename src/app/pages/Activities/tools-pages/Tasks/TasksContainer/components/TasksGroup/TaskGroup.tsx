import { useContext, useState } from 'react'
import s from './styles.module.css'
import { DropDown } from '../../../../../../../../components/drop-down/DropDown';
import { context } from '../../../../../../../context/AppContext';
import Button from '../../../../../../../../components/ui/Button';
import Task from '../Task/Task';
import { updateTask } from '../../utils/updateTask';
import { updateGroup } from '../../utils/updateGroup';
// import { updateGroup } from '../../utils/updateGroup';

export default function TaskGroup(props: TaskGroupProps) {
  // CONTEXT & PROPS
  const { darkMode, setSelectedTaskClass, setAllowChanges, userInfo } = useContext(context) as Context;
  const { group, setCreateAndEditModal, setPropsForCEM } = props as TaskGroupProps
  // BOOLEAN
  const [showTools, setShowTools] = useState<boolean>(false)
  const [hideTasks, setHideTasks] = useState<boolean>(false);
  // ARRAYS AND OBJECTS
  const actionLists: ActionsLists[] = [
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
  ]

  return (
    <div className={
      !darkMode
        ? s.taskGroup
        : `${s.taskGroup} ${s.darkTaskGroup}`
    }>
      <label htmlFor={group.groupId} className={s.top}>
        <h2 className={s.groupName}>
          <i className={hideTasks ? "fas fa-angle-down" : "fas fa-angle-up"}></i>
          <input type="checkbox" id={group.groupId} className={s.hide} onChange={(e) => setHideTasks(e.target.checked)} />
          {group.groupName}
        </h2>
        <Button
          className={s.actionButton}
          clickListener={() => {
            const newProps: PropsForCEM = {
              modalTitle: "Create New Task", modalDesc: "Give a task description",
              modalFor: "task", modalAction: "create",
              group,
            }
            setCreateAndEditModal(true)
            setPropsForCEM({ ...newProps })
          }}
          iconElement={<i className="	fas fa-plus"></i>} />
        <Button
          className={s.actionButton}
          clickListener={() => { setShowTools(prev => !prev) }}
          iconElement={<i className={"	fas fa-ellipsis-v"}></i>} />
        <DropDown {...{ darkMode, showTools, actionLists, setShowTools }} />
      </label>
      <div className={hideTasks ? s.hideTasks : s.tasks} id={`${group.groupId}`}>
        {group.tasks.map(t => {
          const taskProps = { isRealTask: true, task: t }
          return <Task {...{ ...taskProps, ...props, groupId: group.groupId }} />
        })}
      </div>
    </div>
  )
}