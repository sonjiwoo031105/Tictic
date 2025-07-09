import { ObjectId } from 'mongodb';
import { getServerSession } from 'next-auth';
import clientPromise from './mongodb';
import { authOptions } from '../api/auth/[...nextauth]/route';

export async function getUserQuizResults() {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    throw new Error('Unauthorized');
  }

  try {
    const client = await clientPromise;
    const db = client.db('tictic');

    const user = await db.collection('users').findOne({ email: session.user.email });
    if (!user) throw new Error('User not found');

    const results = await db
      .collection('quizResults')
      .find({ userId: new ObjectId(user._id) })
      .sort({ createdAt: -1 })
      .toArray();

    return results;
  } catch (e) {
    console.error('DB fetch error', e);
    return [];
  }
}

