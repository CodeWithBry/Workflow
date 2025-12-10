import { Outlet, useParams } from 'react-router-dom'
import s from './styles.module.css'
import { useContext, useEffect } from 'react'
import { context } from '../../AppContext/AppContext'

export default function NormalTasks() {
  const { setSubPath, setProjects, setSubPagesForNormalTasks } = useContext(context) as AppContextType;
  const { taskType } = useParams<{ taskType: string }>();

  useEffect(() => {
    if (taskType) {
      setSubPath(taskType);
      setSubPagesForNormalTasks(prev => prev.map(tab => ({ ...tab, tabFocused: tab.tabPath == taskType })))
      setProjects(prev => prev.map(proj => ({...proj, tabFocused: false})))
    }
  }, [taskType])

  return (
    <div className={s.normalTasks}>

      <Outlet />
    </div>
  )
}