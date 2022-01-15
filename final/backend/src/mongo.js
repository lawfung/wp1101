import mongoose from "mongoose";

import "dotenv-defaults/config.js";

async function connect() {
  mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((res) => console.log("mongo db connection created"));
}

export default { connect };