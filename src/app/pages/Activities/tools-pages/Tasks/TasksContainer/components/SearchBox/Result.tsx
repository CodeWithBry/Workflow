import { type Dispatch, type SetStateAction } from "react"
import Button from "../../../../../../../../components/ui/Button"
import s from "./styles.module.css"
import { showTaskToScreen } from "../../utils/showTaskToScreen";
export default function Result({
  task, setShowSearchBox
}: {task: Task, setShowSearchBox: Dispatch<SetStateAction<boolean>> }) {
  return (
    <Button 
      clickListener={() => {
        setShowSearchBox(false);
        showTaskToScreen(task.id)
      }}
      className={s.task}
      content={task.description} />
  )
}