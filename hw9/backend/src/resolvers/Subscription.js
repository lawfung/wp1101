import { makeName } from './utility'
const Subscription = {
  message: {
    subscribe(parent, { from, to }, { db, pubsub }, info) {
      const chatBoxName = makeName(from, to);
      return pubsub.asyncIterator(`chatBox ${chatBoxName}`);
    },
  },
};

export default Subscription;
