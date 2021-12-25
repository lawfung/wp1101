import { Button, Modal, Form, Input } from "antd";
import { useState, useRef, useEffect } from "react";
const ChatModal = ({visible, onCreate, onCancel, displayStatus}) => {
    const [friend, setFriend] = useState("")
    const bodyRef = useRef(null);
    useEffect(
        () => {
            if(visible){
                setTimeout(() => {
                    bodyRef.current.focus();
                }, 1);
            }
        },[visible]
    );
    return (
        <Modal 
            title="Create a new chat box"
            visible={visible}
            onCancel={()=>{setFriend(""); onCancel();}}
            footer={[
                <Button form="inputname" key="whatever" htmlType="submit" onClick={ async ()=>{
                        if(friend){
                            await onCreate(friend);
                            setFriend("");
                        }
                        else {
                            displayStatus({type: 'error', msg :'Missing username.'});
                        }
                    }}
                >
                    Create
                </Button>
            ]}
        >
            <Form id="inputname">
                <Form.Item label="Username">
                    <Input onChange={(e) => setFriend(e.target.value)} value={friend} ref={bodyRef}/>
                </Form.Item>
            </Form>
        </Modal>
    )
}
export default ChatModal;