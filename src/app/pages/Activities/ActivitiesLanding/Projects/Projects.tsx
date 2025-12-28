import { useContext, useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import s from './styles.module.css'
import { context } from '../../../../context/AppContext'

function Projects() {
  const {taskClass} = useContext(context) as Context;
  const [projectCards, setProjectCards] = useState<ProjectCardProps[]>([]); 

  useEffect(() => {
    if(taskClass.length > 3) {
      const projects: ProjectCardProps[] = []
      taskClass.map(t => {
        if(t.taskType == "projects") {
          const projectCardAttributes = { icon: "fas fa-folder", projectName: t.name, id: t.id }
          projects.push(projectCardAttributes);
        }
      })

      setProjectCards([...projects])
    }
  }, [taskClass])

  return (
    <div className={s.projects}>
      <label className={s.searchWrapper}>
        <i className='fas fa-search'></i>
        <input
          type="text"
          placeholder='Search from projects'
        />
      </label>
      <div className={s.container}>
        {projectCards.map((act) => {
          return <ProjectCard {...act} />
        })}
      </div>
    </div>
  )
}

export default Projects