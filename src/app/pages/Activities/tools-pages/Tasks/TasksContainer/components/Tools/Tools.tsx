import { useContext, useMemo, useState } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../../../context/AppContext';
import Button from '../../../../../../../../components/ui/Button';
import { DropDown } from '../../../../../../../../components/drop-down/DropDown';
import handleHistory from '../../utils/handleHistory';
import { saveProjectFromFirestore } from '../../../../../../../../lib/firebase';
import { updateAnalyticsData } from '../../utils/updateAnalyticsData';

export default function Tools({ setShowGTM, setShowSearchBox }: TaskContainerValues) {
  const { darkMode, setSelectedTaskClass, selectedTaskClass, historyChanges, setHistoryChanges, setAllowChanges, taskClass, userInfo, setWeekData, setAnalytics } = useContext(context) as Context;
  const [showTools, setShowTools] = useState<boolean>(false);
  const selectedHistory = useMemo(() => {
    return historyChanges.changesInProject[historyChanges.currentStateNumber]
  }, [historyChanges.currentStateNumber])

  // ARRAYS AND OBJECTS
  const actionLists: ActionsLists[] = [
    { action: "Add Group Task", functionCall: () => setShowGTM(true), icon: 'fas fa-plus' },
    {
      action: "Finish All Task", functionCall: () => {
        const dateUpdated = Date.now();
        setAllowChanges(true)
        setSelectedTaskClass(prev => {
          if (!prev || !prev.taskGroups) return prev;
          const updatedGroup = prev.taskGroups.map((taskGroup) => {
            const updatedTasks: Task[] = taskGroup.tasks.map((task) => ({ ...task, status: "finished", dateFinished: new Date().toLocaleDateString() }));
            return { ...taskGroup, tasks: updatedTasks };
          });
          const updatedProject = { ...prev, taskGroups: updatedGroup }


          if (userInfo) updateAnalyticsData({ setAnalytics, setWeekData, userId: userInfo.userId, updatedGroup, dateUpdated, project: updatedProject });
          return updatedProject;
        });
      }, icon: "far fa-check-circle"
    },
    {
      action: "Reset All Task", functionCall: () => {
        const dateUpdated = Date.now();
        setAllowChanges(true)
        setSelectedTaskClass(prev => {
          if (!prev || !prev.taskGroups) return prev;
          const updatedGroup = prev.taskGroups.map((taskGroup) => {
            const updatedTasks: Task[] = taskGroup.tasks.map((task) => ({ ...task, status: "pending" }));
            return { ...taskGroup, tasks: updatedTasks };
          });
          const updatedProject = { ...prev, taskGroups: updatedGroup }


          if (userInfo) updateAnalyticsData({ setAnalytics, setWeekData, userId: userInfo.userId, updatedGroup, dateUpdated, project: updatedProject });
          return updatedProject;
        });
      }, icon: "fas fa-hourglass-half"
    }
  ]

  return (
    <div className={
      !darkMode
        ? s.tools
        : `${s.tools} ${s.dark}`
    }>
      <h2 className={s.title}>Main Tools</h2>
      <div className={s.right}>
        {
          (!selectedHistory?.isSaved && historyChanges.changesInProject.length >= 2) &&
          <Button
            className={`${s.actionButton} ${s.saveButton}`}
            clickListener={() => {
              if (selectedTaskClass && userInfo) {
                saveProjectFromFirestore(userInfo.userId, selectedTaskClass, undefined, "update")
                setHistoryChanges(prev => {
                  const findSelectedHistory = prev.changesInProject.map((t, i) => {
                    if (i == historyChanges.currentStateNumber) {
                      return { ...t, isSaved: true }
                    }
                    return { ...t, isSaved: false }
                  })

                  return { ...prev, changesInProject: findSelectedHistory }
                })
              }
            }}
            iconElement={<i className="fas fa-save"></i>}
            content={"Save"} />}
        <Button
          className={historyChanges.currentStateNumber > 0 ? s.actionButton : `${s.actionButton} ${s.disabled}`}
          clickListener={() => {
            handleHistory({ action: "undo", setSelectedTaskClass, taskClassId: selectedTaskClass?.id, historyChanges, setHistoryChanges, setAllowChanges, taskClass });
          }}
          iconElement={<i className="fa fa-chevron-left"></i>} />
        <Button
          className={historyChanges.currentStateNumber + 1 < historyChanges.changesInProject.length ? s.actionButton : `${s.actionButton} ${s.disabled}`}
          clickListener={() => {
            handleHistory({ action: "redo", setSelectedTaskClass, taskClassId: selectedTaskClass?.id, historyChanges, setHistoryChanges, setAllowChanges });
          }}
          iconElement={<i className="fa fa-chevron-right"></i>} />
        <Button
          className={s.actionButton}
          clickListener={() => setShowSearchBox(true)}
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