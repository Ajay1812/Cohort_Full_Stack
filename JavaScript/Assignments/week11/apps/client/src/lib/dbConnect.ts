import mongoose from 'mongoose'
require("dotenv").config();

let alreadyDone = false

export async function ensureDBConnected() {
  const mongoUser = process.env.MONGO_USER;
  const mongoPassword = process.env.MONGO_PASSWORD;
  if (alreadyDone){
    return
  }
  alreadyDone = true
  await mongoose.connect(`mongodb+srv://${mongoUser}:${mongoPassword}@cluster0.ytrig.mongodb.net/courses`);
}


