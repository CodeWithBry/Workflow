import { useContext, useEffect, useMemo, useState } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../context/AppContext'
import MessageBox from './MessageBox/MessageBox';
import InputSection from './InputSection/InputSection';

function ChatBox() {
  const { darkMode, selectedChat } = useContext(context) as Context;
  const chatBoxClassName = !darkMode ? s.chatBox : `${s.chatBox} ${s.dark}`
  // BOOLEANS
  const [isNewChat, setIsNewChat] = useState<boolean>(true);
  const [isConvoLoading, setIsConvoLoading] = useState<boolean>(true);
  // STRINGS
  // ARRAYS AND OBJECTS
  const [pseudoConvo, setPseudoConvo] = useState<Convo>({
    convoId: crypto.randomUUID(),
    isOpened: true,
    messagesAi: [],
    messagesUi: []
  })
  const selectedConvo: SelectedConvo = useMemo(() => selectedChat?.convos.find(convo => convo.isOpened), [selectedChat?.convos])

  const values = {
    // BOOLEANS
    isNewChat, setIsNewChat,
    isConvoLoading, setIsConvoLoading,
    // ARRAYS AND OBJECTS
    pseudoConvo, setPseudoConvo,
    selectedConvo
  }

  useEffect(() => {
    setIsConvoLoading(false);
  }, [selectedChat])

  return (
    <div className={chatBoxClassName}>
      <MessageBox {...values} />
      <InputSection {...values} />
    </div>
  )
}

export default ChatBox