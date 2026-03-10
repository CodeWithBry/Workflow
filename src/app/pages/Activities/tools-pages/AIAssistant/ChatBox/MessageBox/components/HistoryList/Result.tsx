import { useContext } from "react"
import s from "./styles.module.css"
import Button from "../../../../../../../../../components/ui/Button";
import { context } from "../../../../../../../../context/AppContext";
export default function Result({
  convo, setShowSearchBox, setShowDCB, setSelectedConvoId, setSelectedBookMarkId
}: Results) {
  const { setConvoLists, setChatLists, setPauseEffect } = useContext(context) as Context;
  const id = crypto.randomUUID();

  if(convo.title?.trim()) return (
    <label htmlFor={id+"result"} className={s.resultWrapper}>
      <Button
        id={id+"result"}
        clickListener={() => {
          setShowSearchBox(false);
          setPauseEffect(false);
          setSelectedBookMarkId(null);
          setChatLists(prev => prev.map(chatInfo => {
            if (chatInfo.isOpen) {
              const updatedConvoLists = chatInfo.convoLists.map(convoInfo => {
                return { ...convoInfo, isOpen: convoInfo.convoId == convo.convoId };
              });
              return { ...chatInfo, convoLists: updatedConvoLists };
            }
            return chatInfo;
          }))
          setConvoLists(prev => {
            const updatedConvoLists = prev.map((convoInfo) => ({ ...convoInfo, isOpen: convoInfo.convoId == convo.convoId }));
            return updatedConvoLists
          })
        }}
        className={s.convo}
        content={convo.title} />
      <Button 
        iconElement={<i className="far fa-trash-alt"></i>}
        className={s.deleteBtn}
        clickListener={() => {
          setShowDCB(true);
          setSelectedConvoId(convo.convoId)
        }} /> 
    </label>
  )
}