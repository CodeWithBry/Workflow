import { useContext, useMemo, useState } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../context/AppContext'
import MessageBox from './MessageBox/MessageBox';
import InputSection from './InputSection/InputSection';

function ChatBox() {
  const { darkMode } = useContext(context) as Context;
  const chatBoxClassName = !darkMode ? s.chatBox : `${s.chatBox} ${s.dark}`
  // BOOLEANS
  // STRINGS
  const [userInput, setUserInput] = useState<string>("");
  // ARRAYS AND OBJECTS
  const [chat, setChat] = useState<Chat>({
    userId: crypto.randomUUID(),
    convos: []
  });

  const selectedConvo: SelectedConvo = useMemo(() => {
    return chat.convos.find(convo => convo.isOpened) ?? null
  }, [chat])

  const values = {
    // BOOLEANS
    // STRINGS
    userInput, setUserInput,
    // ARRAYS AND OBJECTS
    chat, setChat,
    selectedConvo
  }

  return (
    <div className={chatBoxClassName}>
      <MessageBox {...values} />
      <InputSection {...values} />
    </div>
  )
}

export default ChatBox