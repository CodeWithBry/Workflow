import { useContext, useEffect, useState } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../context/AppContext'
import MessageBox from './MessageBox/MessageBox';
import InputSection from './InputSection/InputSection';
import { getConvo } from './utils/getConvo';

function ChatBox() {
  const { darkMode, convoLists, userInfo, chatLists, selectedConvo, setSelectedConvo, pauseEffect } = useContext(context) as Context;
  const chatBoxClassName = !darkMode ? s.chatBox : `${s.chatBox} ${s.dark}`
  // BOOLEANS
  const [isNewChat, setIsNewChat] = useState<boolean>(true);
  const [isConvoLoading, setIsConvoLoading] = useState<boolean>(true);
  // STRINGS
  // ARRAYS AND OBJECTS
  const [pseudoConvo, setPseudoConvo] = useState<Convo>({
    convoId: crypto.randomUUID(),
    isOpen: false,
    messagesAi: [],
    messagesUi: []
  })
  const [isFailedToSend, setIsFailedToSend] = useState<boolean>(false);

  const values = {
    // BOOLEANS
    isNewChat, setIsNewChat,
    isConvoLoading, setIsConvoLoading,
    isFailedToSend, setIsFailedToSend,
    // ARRAYS AND OBJECTS
    pseudoConvo, setPseudoConvo,
    selectedConvo
  }

  useEffect(() => {
    if(selectedConvo) setIsConvoLoading(false);
  }, [selectedConvo])
  
  useEffect(() => {
    if(pauseEffect) return;
    if(convoLists.length > 0 && chatLists.length > 0 && userInfo) {
      const getOpenedConvo: ConvoList | undefined= convoLists.find(convo => convo?.isOpen);
      const getOpenedChat: ChatList | undefined = chatLists.find(chat => chat.isOpen);
      if(getOpenedConvo && getOpenedChat) {
        getConvo(userInfo?.userId, getOpenedChat.id, getOpenedConvo.convoId, setSelectedConvo);
      } 
    }
  }, [convoLists, chatLists, userInfo?.userId])

  return (
    <div className={chatBoxClassName}>
      <MessageBox {...values} />
      <InputSection {...values} />
    </div>
  )
}

export default ChatBox