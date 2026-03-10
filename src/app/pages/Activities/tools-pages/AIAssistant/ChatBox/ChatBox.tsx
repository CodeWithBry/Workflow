import { useContext, useEffect, useState } from 'react'
import s from './styles.module.css'
import { context } from '../../../../../context/AppContext'
import MessageBox from './MessageBox/MessageBox';
import InputSection from './InputSection/InputSection';
import { getConvo } from './utils/getConvo';
import SaveChangesBox from './SaveChangesBox/SaveChangesBox';
import { getBookMarkedMessages } from '../../../../../../lib/firebase';

function ChatBox() {
  const { darkMode, convoLists, userInfo, chatLists, selectedConvo, setSelectedConvo, pauseEffect, setPauseEffect } = useContext(context) as Context;
  const chatBoxClassName = `${s.chatBox} ${darkMode && s.dark}`;
  // BOOLEANS
  const [isNewChat, setIsNewChat] = useState<boolean>(true);
  const [isConvoLoading, setIsConvoLoading] = useState<boolean>(true);
  const [isThinking, setIsThinking] = useState<boolean>(false);
  const [isFailedToSend, setIsFailedToSend] = useState<boolean>(false);
  const [showSaveProject, setShowSaveProject] = useState<boolean>(false);
  const [showBookMarkLists, setShowBookMarkLists] = useState<boolean>(false);
  // STRINGS
  // ARRAYS AND OBJECTS
  const [pseudoConvo, setPseudoConvo] = useState<Convo>({
    convoId: crypto.randomUUID(),
    isOpen: false,
    messagesAi: [],
    messagesUi: []
  })
  const [saveChangesProps, setSaveChangesProps] = useState<SaveChangesProps>({
    showSaveProject,
    setShowSaveProject,
    projectObject: null
  });
  const [bookMarkedMess, setBookMarkedMess] = useState<MessagesUi[]>([]);
  const [selectedBookMarkId, setSelectedBookMarkId] = useState<MessagesUi | null>(null);

  const values = {
    // BOOLEANS
    isNewChat, setIsNewChat,
    isConvoLoading, setIsConvoLoading,
    isFailedToSend, setIsFailedToSend,
    isThinking, setIsThinking,
    showSaveProject, setShowSaveProject,
    showBookMarkLists, setShowBookMarkLists,
    // ARRAYS AND OBJECTS
    pseudoConvo, setPseudoConvo,
    selectedConvo,
    saveChangesProps, setSaveChangesProps,
    bookMarkedMess, setBookMarkedMess,
    selectedBookMarkId, setSelectedBookMarkId
  }

  useEffect(() => {
    if (pauseEffect) {
      setPauseEffect(false);
      setIsConvoLoading(false);
      setIsNewChat(false);
      return;
    };
    if (chatLists.length > 0 && userInfo) {
      setIsConvoLoading(true)
      const getOpenedConvo: ConvoList | undefined = convoLists.find(convo => convo?.isOpen);
      const getOpenedChat: ChatList | undefined = chatLists.find(chat => chat.isOpen);
      if (getOpenedChat) getBookMarkedMessages(userInfo.userId, getOpenedChat.id)
        .then(async (data) => {
          if (data) {
            setBookMarkedMess([...data])
            if (getOpenedConvo && getOpenedChat) {
              await getConvo(userInfo?.userId, getOpenedChat.id, getOpenedConvo.convoId, setSelectedConvo);
              setIsConvoLoading(false);
              setIsNewChat(false);
              setIsThinking(false);
            }
          }
        })
        .catch(err => { throw new Error(err) });
    }

    setIsConvoLoading(false);
  }, [chatLists, userInfo?.userId]);

  useEffect(() => {
    setSaveChangesProps(prev => {
      return {
        ...prev, showSaveProject
      };
    });
  }, [showSaveProject])

  return (
    <div className={chatBoxClassName}>
      {showSaveProject && <SaveChangesBox {...saveChangesProps} />}
      <MessageBox {...values} />
      <InputSection {...values} />
    </div>
  )
}

export default ChatBox