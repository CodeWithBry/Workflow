import { useContext, useEffect, useMemo, useState } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../../../context/AppContext';
import Button from '../../../../../../../../components/ui/Button';
import { DropDown } from '../../../../../../../../components/DropDown/DropDown';
import handleHistory from '../../utils/handleHistory';

export default function Tools({ setShowGTM }: ToolsProps) {
  const { darkMode, setTaskClass, selectedTaskClass, historyChanges, setHistoryChanges, setAllowChanges, taskClass, locStor } = useContext(context) as Context;
  const [showTools, setShowTools] = useState<boolean>(false);
  const selectedHistory = useMemo(() => {
    return historyChanges.changesInProject[historyChanges.currentStateNumber]
  }, [historyChanges.currentStateNumber])

  // ARRAYS AND OBJECTS
  const [actionLists] = useState<ActionsLists[]>([
    { action: "Add Group Task", functionCall: () => setShowGTM(true) },
    { action: "Delete Group", functionCall: () => setShowGTM(true) },
  ])

  useEffect(() => { console.log(selectedHistory) }, [selectedHistory])

  return (
    <div className={
      !darkMode
        ? s.tools
        : `${s.tools} ${s.darkTools}`
    }>
      <h2 className={s.title}>Main Tools</h2>
      <div className={s.right}>
        {
          (!selectedHistory?.isSaved && historyChanges.changesInProject.length >= 2) &&
          <Button
            className={`${s.actionButton} ${s.saveButton}`}
            clickListener={() => {
              if (selectedTaskClass) {
                locStor.saveDataToLocalStorage({ updatedTaskClass: selectedTaskClass, taskType: selectedTaskClass.taskType, taskClass })
                setHistoryChanges(prev => {
                  const findSelectedHistory = prev.changesInProject.map((t, i) => {
                    if (i == historyChanges.currentStateNumber) {
                      return { ...t, isSaved: true }
                    }
                    return { ...t, isSaved: false }
                  })
                  
                  return {...prev, changesInProject: findSelectedHistory}
                })
              }
            }}
            iconElement={<i className="fas fa-save"></i>}
            content={"Save"} />}
        <Button
          className={historyChanges.currentStateNumber > 0 ? s.actionButton : `${s.actionButton} ${s.disabled}`}
          clickListener={() => {
            handleHistory({ action: "undo", setTaskClass, taskClassId: selectedTaskClass?.id, historyChanges, setHistoryChanges, setAllowChanges, taskClass });
          }}
          iconElement={<i className="fa fa-chevron-left"></i>} />
        <Button
          className={historyChanges.currentStateNumber < historyChanges.changesInProject.length - 1 ? s.actionButton : `${s.actionButton} ${s.disabled}`}
          clickListener={() => {
            handleHistory({ action: "redo", setTaskClass, taskClassId: selectedTaskClass?.id, historyChanges, setHistoryChanges, setAllowChanges });
          }}
          iconElement={<i className="fa fa-chevron-right"></i>} />
        <Button
          className={s.actionButton}
          clickListener={() => { }}
          iconElement={<i className="	fas fa-search"></i>} />
        <Button
          className={s.actionButton}
          clickListener={() => { setShowTools(!showTools) }}
          iconElement={<i className={"fas fa-ellipsis-v"}></i>} />
        <DropDown {...{ darkMode, showTools, actionLists, setShowTools }} />
      </div>
    </div>
  )
}