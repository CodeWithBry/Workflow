import { useContext, useState } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../../app/AppContext/AppContext'
import Task from '../Task/Task';
import Button from '../../../../../ui/Button/Button';
import { DropDown } from '../../../../../DropDown/DropDown';

export default function TaskGroup(props: TaskGroupProps) {
  const { setShowEditModal, taskGroup, setPseudoTasks, setTaskGroups, setDescription, setModalName, setSelectedGroup }: TaskGroupProps = props;
  const { darkMode } = useContext(context) as AppContextType;

  // BOOLEAN
  const [showTools, setShowTools] = useState<boolean>(false)

  // ARRAYS AND OBJECTS

  const actionLists: ActionsLists[] = [
    {
      action: "Edit",
      functionCall: () => {
        setShowEditModal(true);
        setDescription("Give a new name");
        setModalName("Edit Group Name");
        setSelectedGroup(taskGroup);
      }
    },
    { action: "Delete", functionCall: () => console.log("hello") },
    { action: "Edit Group Name", functionCall: () => console.log("hello") },
    { action: "Edit Group Name", functionCall: () => console.log("hello") }
  ];

  return (
    <div className={
      !darkMode
        ? s.taskGroup
        : `${s.taskGroup} ${s.darkTaskGroup}`
    }>
      <div className={s.top}>
        <h2 className={s.groupName}>{taskGroup.groupName}</h2>
        <Button
          className={s.actionButton}
          clickListener={() => { }}
          iconElement={<i className="	fas fa-plus"></i>} />
        <Button
          className={s.actionButton}
          clickListener={() => { setShowTools(prev => !prev) }}
          iconElement={<i className={showTools ? "fa fa-close" : "	fas fa-ellipsis-v"}></i>} />
        <DropDown {...{ darkMode, showTools, actionLists, setShowTools }} />
      </div>
      <div className={s.tasks}>
        {taskGroup?.tasks?.map(task => {
          const taskProps = {
            task,
            setTaskGroups,
            setPseudoTasks,
            isRealTask: true,
            groupId: task.groupId
          }

          return <Task {...taskProps} />
        })}
      </div>
    </div>
  )
}