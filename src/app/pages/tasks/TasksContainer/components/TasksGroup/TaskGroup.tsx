import { useContext } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../AppContext/AppContext'
import type { AppContextType } from '../../../../../../types/AppContextType.types'

export default function TaskGroup() {
  const { darkMode } = useContext(context) as AppContextType;

  return (
    <div className={
      !darkMode
      ? s.taskGroup
      : `${s.taskGroup} ${s.darkTaskGroup}`
    }>
      
    </div>
  )
}