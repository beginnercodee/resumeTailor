import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;
const client = new MongoClient(uri);

export async function saveResume(userId: string, payload: any) {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB_NAME);
  const res = await db
    .collection('resumes')
    .insertOne({ userId, ...payload, createdAt: new Date() });
  await client.close();
  return res;
}

export async function getResumes(userId: string) {
  await client.connect();
  const db = client.db(process.env.MONGODB_DB_NAME);
  const docs = await db
    .collection('resumes')
    .find({ userId })
    .sort({ createdAt: -1 })
    .toArray();
  await client.close();
  return docs;
}