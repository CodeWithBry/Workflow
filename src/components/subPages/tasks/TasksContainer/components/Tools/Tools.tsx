import { useContext, useState } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../../app/AppContext/AppContext'
import Button from '../../../../../ui/Button/Button';
import { DropDown } from '../../../../../dropDown/dropDown';

export default function Tools({ showTools, setShowTools, setShowModal }: ToolsProps) {
  const { darkMode } = useContext(context) as AppContextType;

  // ARRAYS AND OBJECTS
  const [actionLists] = useState<ActionsLists[]>([
    { action: "Edit Group Name", functionCall: () => setShowModal(true) },
    { action: "Edit Group Name", functionCall: () => console.log("hello") },
    { action: "Edit Group Name", functionCall: () => console.log("hello") },
    { action: "Edit Group Name", functionCall: () => console.log("hello") }
  ])

  return (
    <div className={
      !darkMode
        ? s.tools
        : `${s.tools} ${s.darkTools}`
    }>
      <h2 className={s.title}>Main Tools</h2>
      <div className={s.right}>
        <Button
          className={s.actionButton}
          clickListener={() => { }}
          iconElement={<i className="	fas fa-search"></i>} />
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
    </div>
  )
}