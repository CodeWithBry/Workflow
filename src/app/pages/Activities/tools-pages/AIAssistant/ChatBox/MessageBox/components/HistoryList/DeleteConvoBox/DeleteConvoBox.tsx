import { useContext } from "react";
import s from "./style.module.css"
import { context } from "../../../../../../../../../context/AppContext";
import { deleteConvoData, updateChatList } from "../../../../../../../../../../lib/firebase";

function DeleteConvoBox(props: PropsForDCB) {
  const { setChatLists, setConvoLists, convoLists, selectedTaskClass, userInfo, chatLists } = useContext(context) as Context;
  if (!props.showDCB) return null;

  return (
    <div className={s.overlay} onClick={() => props.setShowDCB(false)}>
      <div className={s.modal} onClick={(e) => e.stopPropagation()}>
        <div className={s.iconContainer}>
          <i className="fas fa-trash-alt"></i>
        </div>
        <h2 className={s.title}>Delete Conversation</h2>
        <p className={s.message}>
          Are you sure you want to delete this data? This action cannot be undone and all your data will be permanently deleted.
        </p>
        <div className={s.buttons}>
          <button className={s.cancelButton} onClick={() => props.setShowDCB(false)}>
            Cancel
          </button>
          <button className={s.deleteButton} onClick={async () => {
            if (!userInfo || !selectedTaskClass) return;
            const updatedConvoLists = convoLists.filter(convo => convo.convoId != props.selectedConvoId);
            const updatedChatLists = chatLists.map(chat => {
              if (selectedTaskClass?.id == chat.id) {
                const chatLists = { ...chat, convoLists: updatedConvoLists };
                return chatLists
              }

              return chat
            })
            Promise.all([
              deleteConvoData(userInfo.userId, selectedTaskClass.id, props.selectedConvoId),
              updateChatList(userInfo.userId, updatedChatLists)
            ])
            setConvoLists(prev => prev.filter(convo => convo.convoId != props.selectedConvoId));
            setChatLists([...updatedChatLists]);
            props.setShowDCB(false);
          }}>
            <i className="fas fa-trash-alt"></i> Delete Conversation
          </button>
        </div>
      </div>
    </div >
  );
}

export default DeleteConvoBox