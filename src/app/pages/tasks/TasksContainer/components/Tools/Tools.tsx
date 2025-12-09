import { useContext, useState, type JSX } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../AppContext/AppContext'
import Button from '../../../../../../components/ui/Button/Button';

function SeeMore({ darkMode, showTools, actionLists }: SeeMoreProps): JSX.Element {
  return (<>
    <div
      className={
        !darkMode
          ? `${s.seeMore} ${!showTools && s.hideSeeMore}`
          : `${s.seeMore} ${s.darkSeeMore} ${!showTools && s.hideSeeMore}`}
    >
      {actionLists.map(action => {
        return <Button
          className={s.actionButton}
          content={action.action}
          clickListener={() => action.functionCall()} />
      })}
    </div>
  </>)
}

export default function Tools({ showTools, setShowTools }: ToolsProps) {
  const { darkMode } = useContext(context) as AppContextType;

  // ARRAYS AND OBJECTS
  const [actionLists] = useState<ActionsLists[]>([
    { action: "Edit Group", functionCall: () => console.log("hello") },
  ])

  // PROPS DECLARATIONS
  const seeMoreProps: SeeMoreProps = { darkMode, showTools, actionLists }

  return (
    <div className={
      !darkMode
        ? s.tools
        : `${s.tools} ${s.darkTools}`
    }>
      <h2 className={s.title}></h2>
      <div className={s.right}>
        <Button
          className={s.buttons}
          clickListener={() => { }}
          iconElement={<i className="	fas fa-search"></i>} />
        <Button
          className={s.buttons}
          clickListener={() => { }}
          iconElement={<i className="	fas fa-plus"></i>} />
        <Button
          className={s.buttons}
          clickListener={() => { setShowTools(prev => !prev) }}
          iconElement={<i className="	fas fa-ellipsis-v"></i>} />
        <SeeMore {...seeMoreProps} />
      </div>
    </div>
  )
}