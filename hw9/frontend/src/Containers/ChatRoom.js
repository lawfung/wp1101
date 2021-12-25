import ChatBox from './ChatBox';
import ChatModal from './ChatModal';
import Title from '../Components/Title';
import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import useChatBox from '../Hooks/useChatBox'
import { Input, Tabs } from 'antd';
import { useMutation } from '@apollo/client';
import { CREATE_CHATBOX_MUTATION, CREATE_MESSAGE_MUTATION } from '../graphql'

const Wrapper = styled(Tabs)`
  width: 100%;
  height: 300px;
  background: #eeeeee52;
  border-radius: 10px;
  margin: 20px;
  padding: 20px;
  display: flex;
`

const Chatroom = ({displayStatus, me} ) => {
  const [messageInput, setMessageInput] = useState("");
  const [activeKey, setActiveKey] = useState("");
  const { chatBoxes, createChatBox, removeChatBox } = useChatBox({displayStatus});
  const [modalVisible, setModalVisible] = useState(false);
  const [startChat] = useMutation(CREATE_CHATBOX_MUTATION);
  const [sendMessage] = useMutation(CREATE_MESSAGE_MUTATION);
  const addChatBox = () => {
    setModalVisible(true);
  }
  const bodyRef = useRef(null);
  useEffect(
    () => {
        if(!modalVisible && activeKey !== ""){
            setTimeout(() => {
                bodyRef.current.focus();
            }, 1);
        }
    },[modalVisible, activeKey]
  );

  return (
    <>
      <Title>
        <h1>{me}'s Chat</h1>
        {/* <Button type="primary" danger 
          onClick={clearMessages}
        >
          Clear
        </Button> */}
      </Title>
      <Wrapper
        tabBarStyle={{ height: "36px" }}
        type="editable-card"
        activeKey={activeKey}
        onChange={(key) => {setActiveKey(key);}}
        onEdit={(target, action) => {
          if (action === "add") addChatBox();
          else if (action === "remove"){
            setActiveKey(removeChatBox(target, activeKey));
          }
        }}
      >
        {chatBoxes.map(
          (friend) => (
            <Tabs.TabPane tab={friend} closable={true} key={friend}>
              <ChatBox me={me} friend={friend} activeKey={activeKey}/>
            </Tabs.TabPane>
          )
        )}
      </Wrapper>
      <ChatModal
        visible={modalVisible}
        displayStatus={displayStatus}
        onCreate={ async (name) => {
            await startChat({
              variables: {
                name1: me, name2: name
              }
            });
            setActiveKey(createChatBox(name));
            setModalVisible(false);
          }
        }
        onCancel={() => {setModalVisible(false);}}
      />
      <Input.Search
        value={messageInput}
        onChange={(e) => setMessageInput(e.target.value)}
        ref={bodyRef}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if(!activeKey){
            displayStatus({type: 'error', msg :'Please create a chatbox first.'});
            return;
          }
          if(!msg){
            displayStatus({type: 'error', msg :'Please enter a message body.'});
            return;
          }
          sendMessage({ variables: {from: me, to: activeKey, message: msg} });
          setMessageInput('')
        }}
      ></Input.Search>
    </>
  )
}
export default Chatroom;