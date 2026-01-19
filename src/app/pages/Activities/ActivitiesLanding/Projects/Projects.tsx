import { useContext, useMemo, useState, type Dispatch, type SetStateAction } from 'react'
import ProjectCard from './ProjectCard'
import s from './styles.module.css'
import { context } from '../../../../context/AppContext'

function Projects(props: {
  dataToModify: DataToModify, setDataToModify: Dispatch<SetStateAction<DataToModify>>,
  editModal: boolean, setEditModal: Dispatch<SetStateAction<boolean>>,
}) {
  const { taskClass, darkMode } = useContext(context) as Context;
  const projectCards: TaskClassLists[] | undefined = useMemo(() => {
    if (taskClass.length > 3) {
      const projects: TaskClassLists[] = []
      taskClass.map(t => {
        if (t.taskType == "projects") {
          const projectCardAttributes = { ...t, icon: "fas fa-folder" }
          projects.push(projectCardAttributes);
        }
      })

      return projects
    }
  }, [taskClass])
  const [searchResult, setSearchResult] = useState<ProjectCard>([]);
  const [searchInput, setSearchInput] = useState<string>("");



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
            if(projectCards)
            setSearchResult(projectCards.filter(t => t.name.includes(e.target.value) || t.id.includes(e.target.value)))
          }}
        />
      </label>
      <div className={s.container}>
        {searchResult.length == 0 && projectCards
          ? projectCards.map((act) => {
            return <ProjectCard {...{ project: act, ...props }} />
          })
          : searchResult.map((act) => {
            return <ProjectCard {...{ project: act, ...props }} />
          })}
      </div>
    </div>
  )
}

export default Projects