import { Link } from 'react-router-dom'
import s from './styles.module.css'

function ProjectCard({ icon, projectName, id }: ProjectCardProps) {
    return (
        <Link to={`/activities/${id}/tasks`} className={s.projectCard}>
            <i className={icon}></i>
            <div className={s.right}>
                <h2>{projectName}</h2>
                <span>{id}</span>
            </div>
        </Link>
    )
}

export default ProjectCard