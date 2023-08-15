/*
This middleware is used to connect to MongoDB database.
It's not a NextJS middleware, but a custom middleware.
You need to call it every time you want to connect to MongoDB.
*/

import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please add your MONGODB_URI to .env.local')
}

export async function connectToDatabase() {
  if (mongoose.connections &&
      mongoose.connections.length > 0 &&
      mongoose.connections[0].readyState) {
    return;
  }

  await mongoose.connect(MONGODB_URI as string, {
    dbName: 'reco'
  });
};
