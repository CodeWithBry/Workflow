import { Outlet } from 'react-router-dom'
import s from './styles.module.css'
import { useContext, useEffect } from 'react'
import { context } from '../../AppContext/AppContext'

export default function NormalTasks() {
  const {subPath} = useContext(context) as AppContextType;

  useEffect(() => {
    
  }, [subPath])

  return (
    <div className={s.normalTasks}>
        <Outlet />
    </div>
  )
}