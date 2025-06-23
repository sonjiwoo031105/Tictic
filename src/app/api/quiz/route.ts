import { NextResponse } from 'next/server';

let cachedToken: string | null = null;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category');
  const difficulty = searchParams.get('difficulty');

  if (!cachedToken) {
    const tokenRes = await fetch('https://opentdb.com/api_token.php?command=request');
    const tokenData = await tokenRes.json();
    cachedToken = tokenData.token;
  }

  const url = `https://opentdb.com/api.php?amount=10&category=${category}&difficulty=${difficulty}&type=multiple&token=${cachedToken}`;
  const res = await fetch(url);
  const data = await res.json();

  // 토큰 만료 or 중복 문제 없음 → 리셋
  if (data.response_code === 4 || data.response_code === 5) {
    await fetch(`https://opentdb.com/api_token.php?command=reset&token=${cachedToken}`);
  }

  return NextResponse.json(data);
}
