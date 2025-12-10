import { useContext, useEffect } from 'react'
import s from './styles.module.css'
import { context } from '../../AppContext/AppContext'
import { Outlet, useParams } from 'react-router-dom';
import { getSelectedProject } from '../../../utils/getSelectedProject';

export default function Projects() {
  const { projects, setSelectedProject } = useContext(context) as AppContextType;
  const { projectId } = useParams<{projectId: string}>();
  
  useEffect(() => {
    if(projectId && projects) {
      const getProject = getSelectedProject(projects)
      if (getProject) return () => {setSelectedProject(getProject)}
    }
  }, [projectId, setSelectedProject, projects])

  return (
    <div className={s.projects}>
      <Outlet />
    </div>
  )
}