import Message from '../Components/Message';
import { useEffect, useRef } from 'react';
import { useQuery } from "@apollo/client";
import styled from 'styled-components';
import {CHATBOX_QUERY, MESSAGE_SUBSCRIPTION} from '../graphql'

const Messages = styled.div`
    height: calc(240px - 36px);
    display: flex;
    flex-direction: column;
    overflow: auto;
`

const ChatBox = ({me, friend, activeKey}) => {
    const mesFooter = useRef(null);
    const {data, loading, subscribeToMore} = useQuery(CHATBOX_QUERY, {variables: {name1: me, name2: friend}});
    const scrollDown = () => {
        mesFooter.current?.scrollIntoView({ behavior: "smooth" });
    }
    useEffect(
        () => {
            if(activeKey === friend) {
                setTimeout(() => {
                    scrollDown();
                }, 10);
            }
        },
        [data, activeKey, friend]
    )

    useEffect(
        () => {
            try {
                subscribeToMore({
                    document: MESSAGE_SUBSCRIPTION,
                    variables: {
                        from: me,
                        to: friend
                    },
                    updateQuery: (prev, { subscriptionData }) => {
                        if (!subscriptionData.data) return prev;
                        const newmes = subscriptionData.data.message.message;
                        return {
                            chatBox: {
                                ...prev.chatBox,
                                messages: [...prev.chatBox.messages, newmes]
                            }
                        }
                    }
                })
            } catch(e){}
        },
        [subscribeToMore, me, friend]
    )
    if (loading) return <p>loading</p>;
    return(
        <Messages>
            {
                data.chatBox.messages.length === 0 ? ( <p style={{ color: '#ccc' }}> No messages... </p> ) : 
                data.chatBox.messages.map(
                    ({sender: { name }, body}, i) => (
                        <Message me={me} name={name} body={body} key={i}/>
                    )
                )
            }
            <div ref={mesFooter}/>
        </Messages>
    )
}
export default ChatBox;