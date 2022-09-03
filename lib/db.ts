import { MongoClient } from 'mongodb';

const mongoUrl =
  'mongodb+srv://elifipek:588647elka@cluster0.bmoow.mongodb.net/nextAuth?retryWrites=true&w=majority';

export async function getDB() {
  try {
    const client = await MongoClient.connect(mongoUrl);
    return { db: client.db(), client };
  } catch (error) {
    console.log(error);
  }
}
