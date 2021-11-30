import { useState, useEffect, useRef } from 'react'
import { message } from 'antd';
import useChat from '../Hooks/useChat';
import styled from 'styled-components';
import Chatroom from './ChatRoom';
import SignIn from './signIn';

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  width: 500px;
  margin: auto;
`;

const LOCALSTORAGE_KEY = "save-me";
function App() {
  const savedMe = localStorage.getItem(LOCALSTORAGE_KEY);
  const { status, messages, sendMessage, clearMessages } = useChat()
  const [username, setUsername] = useState('')
  const [body, setBody] = useState('')  // textBody
  const bodyRef = useRef(null)
  const [me, setMe] = useState(savedMe || "");
  const [signedIn, setSignedIn] = useState(false);
  const displayStatus = (payload) => {
    if (payload.msg) {
      const { type, msg } = payload
      const content = { content: msg, duration: 0.5 }
      switch (type) {
        case 'success':
          message.success(content)
          break
        case 'error':
        default:
          message.error(content)
          break
      }
    }
  };
  useEffect(() => { displayStatus(status) }, [status]);
  useEffect(() => {
    if (signedIn) {
      localStorage.setItem(LOCALSTORAGE_KEY, me);
    }
  }, [signedIn, me]);

  return (
    <Wrapper>
      { signedIn ? 
        <Chatroom
          messages={messages}
          sendMessage={sendMessage}
          clearMessages={clearMessages}
          username={username}
          setUsername={setUsername}
          body={body}
          setBody={setBody}
          bodyRef={bodyRef}
          displayStatus={displayStatus}
          me={me}
        /> :
        <SignIn
          me={me}
          setMe={setMe}
          setSignedIn={setSignedIn}
          displayStatus={displayStatus}
        />
      }
    </Wrapper>
  )
}

export default App
