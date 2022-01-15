const Subscription = {
  updateStrategy: {
    subscribe(parent, args, {pubSub}, info) {
      return pubSub.asyncIterator("Strategy");
    }
  },
  updateRecord: {
    subscribe(parent, args, {pubSub}, info) {
      return pubSub.asyncIterator("Record");
    }
  }
};

export default Subscription;
