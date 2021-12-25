import { checkChatBox, makeName } from "./utility";
const Query = {
  async chatBox(parent, { name1, name2}, { db }, info) {
    const chatBoxName = makeName(name1, name2);
    let x = await checkChatBox(db, chatBoxName, "chatBox");
    return x;
  },
};

export default Query;
