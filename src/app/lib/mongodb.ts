import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI!;

const globalWithMongo = global as typeof globalThis & {
  _mongoClientPromise: Promise<MongoClient>
}

if (!process.env.MONGODB_URI) {
  throw new Error("⚠️ .env.local의 MONGODB_URI 값을 확인하세요.");
}

if (!globalWithMongo._mongoClientPromise) {
  const client = new MongoClient(uri);
  globalWithMongo._mongoClientPromise = client.connect();
}
const clientPromise: Promise<MongoClient> = globalWithMongo._mongoClientPromise;

export default clientPromise;
