import clientPromise from "@/app/lib/mongodb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../../auth/[...nextauth]/route";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
  }

  const body = await request.json();
  const { score, category, difficulty } = body;

  const client = await clientPromise;
  const db = client.db('tictic');
  const user = await db.collection('users').findOne({ email: session.user.email });

  if (!user) {
    return new Response(JSON.stringify({ error: "User not found" }), { status: 404 });
  }

  const existing = await db.collection("quizResults").findOne({
    userId: user._id,
    score,
    category,
    difficulty,
  });

  if (existing) {
    return new Response(JSON.stringify({ message: "이미 저장된 결과입니다." }), { status: 409 });
  }

   await db.collection('quizResults').insertOne({
    userId: user._id,
    score,
    category,
    difficulty,
    createdAt: new Date().toISOString(),
  });

  return new Response(JSON.stringify({ message: "저장 완료" }), { status: 200 });
}
