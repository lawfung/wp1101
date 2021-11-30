import Title from '../Components/Title';
import Message from '../Components/Message';
import { Button, Input, Tag } from 'antd';


const Chatroom = ({messages, sendMessage, clearMessages, username, setUsername, body, setBody, bodyRef, displayStatus, me} ) => {
  return (
    <>
      <Title>
        <h1>Simple Chat</h1>
        <Button type="primary" danger onClick={clearMessages}>
          Clear
        </Button>
      </Title>
      <Message>
        {messages.length === 0 ? (
          <p style={{ color: '#ccc' }}> No messages... </p>
        ) : (
          messages.map(({ name, body }, i) => (
            <p className="App-message" key={i}>
              <Tag color="blue">{name}</Tag> {body}
            </p>
          ))
        )}
      </Message>
      {/* <Input
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        style={{ marginBottom: 10 }}
        onKeyDown={(e) => { if (e.key === 'Enter') { bodyRef.current.focus() }}}  
      ></Input> */}
      <Input.Search
        value={body}
        ref={bodyRef}
        onChange={(e) => setBody(e.target.value)}
        enterButton="Send"
        placeholder="Type a message here..."
        onSearch={(msg) => {
          if(!msg || !me){
            displayStatus({type: 'error', msg :'Please enter a username and a message body.'})
            return
          }
          sendMessage({ name: me, body: msg })
          setBody('')
        }}
      ></Input.Search>
    </>
  )
}
export default Chatroom;