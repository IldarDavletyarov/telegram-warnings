import { MongoClient } from 'mongodb';
 
export const mongoClient = new MongoClient("mongodb://localhost:27017/");

mongoClient.connect().then(() => {
  console.log('✔️ MongoDB connected 🥭');
 })
 .catch((error) => {
   console.error('❌ MongoDB failed 🥭', error);
 });

const DB_NAME = 'telegram-warnings';

export const db = mongoClient.db(DB_NAME);
