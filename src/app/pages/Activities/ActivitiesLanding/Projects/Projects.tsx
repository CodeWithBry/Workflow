import { useContext, useEffect, useState } from 'react'
import ProjectCard from './ProjectCard'
import s from './styles.module.css'
import { context } from '../../../../context/AppContext'

function Projects() {
  const { taskClass, darkMode } = useContext(context) as Context;
  const [projectCards, setProjectCards] = useState<ProjectCardProps[]>([]);
  const [searchResult, setSearchResult] = useState<ProjectCardProps[]>([]);
  const [searchInput, setSearchInput] = useState<string>("");

  useEffect(() => {
    if (taskClass.length > 3) {
      const projects: ProjectCardProps[] = []
      taskClass.map(t => {
        if (t.taskType == "projects") {
          const projectCardAttributes = { icon: "fas fa-folder", projectName: t.name, id: t.id }
          projects.push(projectCardAttributes);
        }
      })

      setProjectCards([...projects])
    }
  }, [taskClass])

  return (
    <div className={!darkMode ? s.projects : `${s.projects} ${s.dark}`}>
      <label className={s.searchWrapper}>
        <i className='fas fa-search'></i>
        <input
          type="text"
          placeholder='Search from projects'
          value={searchInput}
          onChange={e => {
            setSearchInput(e.target.value)
            setSearchResult(projectCards.filter(t => t.projectName.includes(e.target.value) || t.id.includes(e.target.value)))
          }}
        />
      </label>
      <div className={s.container}>
        {searchResult.length == 0
          ? projectCards.map((act) => {
            return <ProjectCard {...act} />
          })
          : searchResult.map((act) => {
            return <ProjectCard {...act} />
          })}
      </div>
    </div>
  )
}

export default Projects