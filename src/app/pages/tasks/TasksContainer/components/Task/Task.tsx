import { useContext } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../AppContext/AppContext'

export default function Task() {
  const { darkMode } = useContext(context) as AppContextType;

  return (
    <div className={
      !darkMode
      ? s.task
      : `${s.task} ${s.darkTask}`
    }>

    </div>
  )
}