import { useContext, type Dispatch, type SetStateAction } from "react"
import s from "./styles.module.css"
import Button from "../../../../../../../../../components/ui/Button";
import { context } from "../../../../../../../../context/AppContext";
export default function Result({
  mess, setShowSearchBox
}: {mess: MessagesUi, setShowSearchBox: Dispatch<SetStateAction<boolean>> }) {
  const { setConvoLists, setChatLists } = useContext(context) as Context;

  return (
    <Button 
      clickListener={() => {
        setShowSearchBox(false);
        setChatLists(prev => prev.map(chatInfo => {
          if(chatInfo.isOpen) {
            const updatedConvoLists = chatInfo.convoLists.map(convoInfo => {
              return {...convoInfo, isOpen: convoInfo.convoId == mess?.convoId};
            });
            return {...chatInfo, convoLists: updatedConvoLists};
          }
          return chatInfo;
        }))
        setConvoLists(prev => {
          const updatedConvoLists = prev.map((convoInfo) => ({...convoInfo, isOpen: convoInfo.convoId == mess?.convoId}));
          return updatedConvoLists
        })
      }}
      className={s.result}
      content={<span>{mess.message}</span>} />
  )
}