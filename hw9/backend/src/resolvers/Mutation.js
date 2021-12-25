import {checkUser, newUser, makeName, checkChatBox, newChatBox, newMessage} from './utility'
const Mutation = {
  async createChatBox(parent, {name1,name2}, {db}, info) {
    if (!name1 || !name2){
      throw new Error("Missing chatBox name for CreateChatBox");
    }
    if (!(await checkUser(db, name1, "createChatBox"))) {
        console.log("User does not exist for CreateChatBox: " + name1);
        await newUser(db, name1);
    }
    if (!(await checkUser(db, name2, "createChatBox"))) {
        console.log("User does not exist for CreateChatBox: " + name2);
        await newUser(db, name2);
    }

    const chatBoxName = makeName(name1, name2);
    let chatBox = await checkChatBox(db, chatBoxName, "createChatBox");
    if (!chatBox) chatBox = await newChatBox(db, chatBoxName);
    return chatBox;
  },
  async createMessage(parent, {from, to, content}, {db, pubsub}, info) {
    let sender = await checkUser(db, from, "createMessage")
    let receiver = await checkUser(db, from, "createMessage")
    const chatBoxName = makeName(from, to);
    let chatBox = await checkChatBox(db, chatBoxName, "createMessage");
    if (!sender || !receiver) {
      throw new Error("Users do not exist");
    }
    if(!chatBox){
      throw new Error("chatBox does not exist")
    }
    let mes = await newMessage(db, sender._id, content);
    chatBox.messages.push(mes._id);
    await chatBox.save();
    pubsub.publish(`chatBox ${chatBoxName}`, {message : {mutation : "CREATED", message : mes}});
    return mes;
  }
};
export default Mutation;