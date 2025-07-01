'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') return null;

  return session ? (
    <>
      <p className="text-sm text-gray-400 mt-6">
        점수를 저장해보세요! 📝 <br />
      </p>
      <div className="flex items-center gap-2">
        <span>{session.user?.name}</span>
        <button onClick={() => signOut()} className="text-sm text-blue-500 hover:underline cursor-pointer">
          로그아웃
        </button>
      </div>
    </>

  ) : (
    <>
      <p className="text-sm text-gray-400 mt-6">
        로그인하면 점수가 저장돼요 📝
      </p>
      <button onClick={() => signIn('google')} className="text-sm text-blue-500 hover:underline cursor-pointer">
        로그인
      </button>
    </>
  );
}
