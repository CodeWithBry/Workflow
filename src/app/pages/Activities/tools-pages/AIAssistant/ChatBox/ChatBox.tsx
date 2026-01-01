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
    convos: [{
      convoId: "",
      isOpened: true,
      dataForServer: [
        { role: "model", parts: [{text: "Hello"}] }
      ],
      messagesUi: [
        {role: "user", message: "Hello world"},
        {role: 'model', message: "Alright, let's whip up a super simple HTML code for you! This is like the \"hello world\" of web pages – just the basics to get you started.\n\nHere you go, check this out:\n\n```html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>My First BryTech Page</title>\n</head>\n<body>\n\n    <h1>Welcome to My Awesome Page!</h1>\n    <p>This is a super basic paragraph. Isn't it neat?</p>\n    <p>We're just getting started with HTML, and it's pretty fun!</p>\n\n</body>\n</html>\n```\n\n### Let me quickly break down what's happening there:\n\n*   `<!DOCTYPE html>`: This just tells the browser, \"Hey, this is an HTML5 document!\"\n*   `<html lang=\"en\">`: This is the root of your page. `lang=\"en\"` just says the content is in English.\n*   `<head>`: This is where all the behind-the-scenes stuff goes. Users won't see this directly on the page, but it's important for browsers and search engines.\n    *   `<meta charset=\"UTF-8\">`: Helps with character encoding, so all sorts of text characters display correctly.\n    *   `<meta name=\"viewport\" ...>`: Super important for making your page look good on different devices (like phones and tablets).\n    *   `<title>`: This is the text that shows up in the browser tab or window title.\n*   `<body>`: This is where all the actual content that users see goes!\n    *   `<h1>`: A \"heading 1\". It's the biggest, most important heading on the page. You can go all the way down to `<h6>`.\n    *   `<p>`: This stands for \"paragraph.\" It's perfect for regular text.\n\nTo see this in action, you can copy that code, paste it into a simple text file, save it with a `.html` extension (like `my_first_page.html`), and then just open that file in your web browser!\n\nBoom! You've got your first web page. Pretty cool, right? Let me know if you want to spice it up with some CSS or JavaScript!"},
        {role: 'user', message: "Alright, let's whip up a super simple HTML code for you! This is like the \"hello world\" of web pages – just the basics to get you started.\n\nHere you go, check this out:\n\n```html\n<!DOCTYPE html>\n<html lang=\"en\">\n<head>\n    <meta charset=\"UTF-8\">\n    <meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\">\n    <title>My First BryTech Page</title>\n</head>\n<body>\n\n    <h1>Welcome to My Awesome Page!</h1>\n    <p>This is a super basic paragraph. Isn't it neat?</p>\n    <p>We're just getting started with HTML, and it's pretty fun!</p>\n\n</body>\n</html>\n```\n\n### Let me quickly break down what's happening there:\n\n*   `<!DOCTYPE html>`: This just tells the browser, \"Hey, this is an HTML5 document!\"\n*   `<html lang=\"en\">`: This is the root of your page. `lang=\"en\"` just says the content is in English.\n*   `<head>`: This is where all the behind-the-scenes stuff goes. Users won't see this directly on the page, but it's important for browsers and search engines.\n    *   `<meta charset=\"UTF-8\">`: Helps with character encoding, so all sorts of text characters display correctly.\n    *   `<meta name=\"viewport\" ...>`: Super important for making your page look good on different devices (like phones and tablets).\n    *   `<title>`: This is the text that shows up in the browser tab or window title.\n*   `<body>`: This is where all the actual content that users see goes!\n    *   `<h1>`: A \"heading 1\". It's the biggest, most important heading on the page. You can go all the way down to `<h6>`.\n    *   `<p>`: This stands for \"paragraph.\" It's perfect for regular text.\n\nTo see this in action, you can copy that code, paste it into a simple text file, save it with a `.html` extension (like `my_first_page.html`), and then just open that file in your web browser!\n\nBoom! You've got your first web page. Pretty cool, right? Let me know if you want to spice it up with some CSS or JavaScript!"},
      ]
    }]
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