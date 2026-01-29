import { Link } from 'react-router-dom'
import s from './styles.module.css'
import { DropDown } from '../../../../../components/drop-down/DropDown'
import Button from '../../../../../components/ui/Button'
import { useContext, useState } from 'react'
import { context } from '../../../../context/AppContext'
import { updateProject } from '../../../../../utils/updateProject'

function ProjectCard({ project, setDataToModify, setEditModal, projectLength, index }: ProjectCardProps) {
    const { darkMode, setTaskClass, userInfo, setChatLists } = useContext(context) as Context;
    const [showActions, setShowActions] = useState<boolean>(false);
    const actionLists: ActionsLists[] = [
        {
            action: "Edit Project",
            functionCall: () => {
                setDataToModify(project);
                setEditModal(true)
            },
            icon: "far fa-edit"
        },
        {
            action: "Delete Project",
            functionCall: () => {
                if(userInfo) updateProject({
                    setTaskClass,
                    setChatLists,
                    projectName: project.name,
                    projectId: project.id,
                    value: "",
                    action: "delete",
                    project
                }, userInfo)
            },
            icon: "far fa-trash-alt"
        }
    ]

    return (
        <label
            htmlFor={`#${project.id}`}
            style={{zIndex: `${projectLength - index}`}}>
            <Link
                to={`/activities/${project.id}/tasks`}
                className={s.projectCard}
                id={`${project.id}`} >
                <i className={project.icon}></i>
                <div className={s.right}>
                    <h2>{project.name}</h2>
                    <span>{project.id}</span>
                </div>
            </Link>
            <Button
                className={s.actionToolButton}
                clickListener={() => {
                    setShowActions(true);
                }}
                iconElement={<i className="fas fa-ellipsis-v" />} />
            <DropDown {...{ darkMode, showTools: showActions, setShowTools: setShowActions, actionLists }} />
        </label>
    )
}

export default ProjectCard