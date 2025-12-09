import { useContext, useState } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../AppContext/AppContext'
import Button from '../../../../../../components/ui/Button/Button';
import { SeeMore } from './SeeMore';

export default function Tools({ showTools, setShowTools }: ToolsProps) {
  const { darkMode } = useContext(context) as AppContextType;

  // ARRAYS AND OBJECTS
  const [actionLists] = useState<ActionsLists[]>([
    { action: "Edit Group Name", functionCall: () => console.log("hello") },
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
        <SeeMore {...{ darkMode, showTools, actionLists }} />
      </div>
    </div>
  )
}