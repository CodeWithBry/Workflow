import { type Dispatch, type SetStateAction } from "react"
import s from "./styles.module.css"
import Button from "../../../../../../../../../components/ui/Button";
export default function Result({
  convo, setShowSearchBox
}: {convo: ConvoList, setShowSearchBox: Dispatch<SetStateAction<boolean>> }) {
  return (
    <Button 
      clickListener={() => {
        setShowSearchBox(false);
      }}
      className={s.convo}
      content={convo.title} />
  )
}