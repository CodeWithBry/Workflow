import { useContext, type Dispatch, type SetStateAction } from "react"
import s from "./styles.module.css"
import Button from "../../../../../../../../../components/ui/Button";
import { context } from "../../../../../../../../context/AppContext";
export default function Result({
  mess, setShowSearchBox, setSelectedBookMarkId
}: {
  mess: MessagesUi,
  setShowSearchBox: Dispatch<SetStateAction<boolean>>
  setSelectedBookMarkId: Dispatch<SetStateAction<MessagesUi | null>>
}) {
  const { setConvoLists, setChatLists, setPauseEffect } = useContext(context) as Context;
  const id = mess.messId;

  return (
    <label htmlFor={id} className={s.resultWrapper}>
      <Button
        id={id}
        clickListener={() => {
          setShowSearchBox(false);
          setPauseEffect(false);
          setChatLists(prev => prev.map(chatInfo => {
            if (chatInfo.id == mess.chatId) {
              const updatedConvoLists = chatInfo.convoLists.map(convoInfo => {
                return { ...convoInfo, isOpen: convoInfo.convoId == mess?.convoId };
              });
              return { ...chatInfo, convoLists: updatedConvoLists };
            }
            return chatInfo;
          }));
          setConvoLists(prev => {
            const updatedConvoLists = prev.map((convoInfo) => ({ ...convoInfo, isOpen: convoInfo.convoId == mess?.convoId }));
            return updatedConvoLists
          });
          setSelectedBookMarkId({...mess});
        }}
        className={s.result}
        content={<span>{mess.message}</span>} />
    </label>
  )
}