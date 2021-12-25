import { useState } from "react"

const useChatBox = ({displayStatus}) => {
    const [chatBoxes, setChatBoxes] = useState([]);
    const createChatBox = (friend) => {
        if (chatBoxes.some((name) => (name === friend) )){
            displayStatus({type: 'error', msg :'This tab is already opened.'});
            return friend;
        }
        setChatBoxes([...chatBoxes, friend]);
        return friend;
    }
    const removeChatBox = (friend, activeKey) => {
        const idx = chatBoxes.indexOf(friend);
        const newls = chatBoxes.filter((name) => (name !== friend));
        setChatBoxes(newls)
        if(activeKey !== friend)
            return activeKey;
        if(newls.length === 0)
            return "";
        if(idx !== 0)
            return chatBoxes[idx - 1]
        else
            return newls[0]
        // return activeKey 
        //     ? activeKey === friend
        //         ? idx === 0
        //             ? ''
        //             : chatBoxes[idx - 1]
        //         : activeKey
        //     : '';
    }
    return {chatBoxes, createChatBox, removeChatBox};
}
export default useChatBox;