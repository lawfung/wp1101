import bcrypt from "bcrypt"; 
import { v4 as uuidv4 } from 'uuid';

const saltRounds = 10;

const getUsernameFromCookie = async (cookieDatabase, cookie) => {
  const isExist = await cookieDatabase.findOne({cookie});
  if (!isExist) return null;
  else return isExist.user;
};

const Mutation = {
  async Login(parent, {user, hashPasswd}, {userDatabase, cookieDatabase}, info) {
    const isExist = await userDatabase.findOne({user});
    if (!isExist) throw new Error("Login failed: no account existed");

    const res = await bcrypt.compare(hashPasswd, isExist['hashPasswd'])
    console.log({res: res});
    if (!res) throw new Error("Login failed: password wrong"); // password is not correct
    
    const cookie = uuidv4();
    const newCookie = new cookieDatabase({user, cookie});
    newCookie.save();
    return cookie;
  },
  async Logout(parent, {user, cookie}, {cookieDatabase}, info) {
    const isExist = await cookieDatabase.findOne({user, cookie});
    if (!isExist) return false;
    await cookieDatabase.deleteOne(isExist);
    return true;
  },
  async Register(parent, {user, hashPasswd}, {userDatabase}, info) {
    console.log(user, {user})
    const isExist = await userDatabase.findOne({user});
    console.log(isExist)
    if (isExist) return false;
    else {
      const hash = await bcrypt.hash(hashPasswd, saltRounds);
      console.log('hash', hash);
      const newUsers = new userDatabase({user, hashPasswd: hash})
      newUsers.save();
      return true;
    }
  },
  async DeleteStrategy(parent, {id, cookie}, {strategyDatabase, cookieDatabase, pubSub}, info) {
    const username = await getUsernameFromCookie(cookieDatabase, cookie);
    if (username === null) {
      console.log("username is null");
      return false;
    }

    const isExist = await strategyDatabase.findOne({id, username});
    if (!isExist) return false;
    await strategyDatabase.deleteOne(isExist);

    await pubSub.publish("Strategy", {
      updateStrategy: {
        type: "DELETED",
        info: isExist
      }
    });
    return true;
  },
  async RenameStrategy(parent, {id, name, cookie}, {strategyDatabase, cookieDatabase, pubSub}, info) {
    const username = await getUsernameFromCookie(cookieDatabase, cookie);
    if (username === null) {
      console.log("username is null");
      return false;
    }

    const isExist = await strategyDatabase.findOne({id, username});
    if (!isExist) return false;
    await strategyDatabase.deleteOne(isExist);
    const newStrategy = new strategyDatabase({id, name, username});
    newStrategy.save();

    await pubSub.publish("Strategy", {
      updateStrategy: {
        type: "UPDATED",
        info: newStrategy
      }
    });
    return true;
  },
  async CreateRecord(parent, {strategyName, assetType, startTime, endTime, start, end, high, low, cookie}, {recordDatabase, strategyDatabase, cookieDatabase, pubSub}, info) {
    const username = await getUsernameFromCookie(cookieDatabase, cookie);
    if (username === null) {
      console.log("username is null");
      return false;
    }
    console.log("username = " + username);

    const id = uuidv4();
    const strategyExist = await strategyDatabase.findOne({name: strategyName});
    if (strategyExist) {
      try {
        const strategyID = strategyExist.id;
        const newRecord = new recordDatabase({id, strategyID, assetType, startTime, endTime, start, end, high, low, username});

        newRecord.save();

        await pubSub.publish("Record", {
          updateRecord: {
            type: "CREATED",
            info: newRecord
          }
        });
        return true;
      } catch (error) {
        console.log("error: " + error);
        return false;
      }
    } else {
      try {
        const strategyID = uuidv4();
        const newRecord = new recordDatabase({id, strategyID, assetType, startTime, endTime, start, end, high, low, username});
        const newStrategy = new strategyDatabase({id: strategyID, name: strategyName, username: username});

        newRecord.save();
        newStrategy.save();

        await pubSub.publish("Record", {
          updateRecord: {
            type: "CREATED",
            info: newRecord
          }
        });
        await pubSub.publish("Strategy", {
          updateStrategy: {
            type: "CREATED",
            info: newStrategy
          }
        });
        return true;
      } catch (error) {
        console.log("error: " + error);
        return false;
      }
    }
  },
  async DeleteRecord(parent, {id, cookie}, {recordDatabase, cookieDatabase, pubSub}, info) {
    const username = await getUsernameFromCookie(cookieDatabase, cookie);
    if (username === null) {
      console.log("username is null");
      return false;
    }

    const deletedRecord = await recordDatabase.findOne({id, username});
    if (!deletedRecord) return false;
    await recordDatabase.deleteOne(deletedRecord);

    await pubSub.publish("Record", {
      updateRecord: {
        type: "DELETED",
        info: deletedRecord
      }
    });
    return true;
  },
  async ChangePassword(parent, { oldPasswd, newPasswd, cookie }, {userDatabase, cookieDatabase }, info ) {
    const username = await getUsernameFromCookie(cookieDatabase, cookie);
    if (username === null) {
      console.log("username is null");
      return false;
    }

    const userData = await userDatabase.findOne({user: username});
    if (!userData) {
      console.log("do not get userData");
      return false;
    }
    
    const res = await bcrypt.compare(oldPasswd, userData.hashPasswd);
    if (!res) {
      console.log("compare bad");
      return false;
    }

    const newHashPasswd = await bcrypt.hash(newPasswd, saltRounds);
    const oldUserData = await userDatabase.findOneAndUpdate({user: username}, {$set: {hashPasswd: newHashPasswd}});

    if (!oldUserData) return false;
    return true;
  }
};

export default Mutation;
