import { useContext } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../context/AppContext'
import MessageBox from './MessageBox/MessageBox';
import InputSection from './InputSection/InputSection';

function ChatBox() {
  const { darkMode } = useContext(context) as Context;
  const chatBoxClassName = !darkMode ? s.chatBox : `${s.chatBox} ${s.dark}`
  return (
    <div className={chatBoxClassName}>
      <MessageBox />
      <InputSection />
    </div>
  )
}

export default ChatBox