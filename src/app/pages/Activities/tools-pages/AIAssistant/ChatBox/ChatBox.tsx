import { useContext, useEffect, useMemo, useState } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../context/AppContext'
import MessageBox from './MessageBox/MessageBox';
import InputSection from './InputSection/InputSection';

function ChatBox() {
  const { darkMode } = useContext(context) as Context;
  const chatBoxClassName = !darkMode ? s.chatBox : `${s.chatBox} ${s.dark}`
  // BOOLEANS
  const [isNewChat, setIsNewChat] = useState<boolean>(false);
  // STRINGS
  const [userInput, setUserInput] = useState<string>("");
  // ARRAYS AND OBJECTS
  const [chat, setChat] = useState<Chat>({
    userId: crypto.randomUUID(),
    convos: []
  });
  const [pseudoConvo, setPseudoConvo] = useState<Convo>({
    convoId: crypto.randomUUID(),
    isOpened: true,
    messagesAi: [],
    messagesUi: []
  })

  const selectedConvo: SelectedConvo = useMemo(() => {
    return chat.convos.find(convo => convo.isOpened) ?? null
  }, [chat])

  const values = {
    // BOOLEANS
    isNewChat, setIsNewChat,
    // STRINGS
    userInput, setUserInput,
    // ARRAYS AND OBJECTS
    chat, setChat,
    pseudoConvo, setPseudoConvo,
    selectedConvo
  }

  useEffect(() => {
    const getChats = localStorage.getItem("chat");
    if(getChats) {
      const parseChats = JSON.parse(getChats) as Chat;
      const updatedConvos: Convo[] = parseChats.convos.map((c, i) => {
        if(i == parseChats.convos.length - 1) setIsNewChat(true)
        return {...c, isOpened: i == parseChats.convos.length - 1}
      });

      // console.log(updatedConvos)
      setChat(prev => ({
        ...prev,
        convos: [...updatedConvos]
      }))
    }
  }, [])

  return (
    <div className={chatBoxClassName}>
      <MessageBox {...values} />
      <InputSection {...values} />
    </div>
  )
}

export default ChatBox