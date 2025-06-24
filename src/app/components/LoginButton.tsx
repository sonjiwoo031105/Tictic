'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginButton() {
  const { data: session, status } = useSession();

  if (status === 'loading') return null;

  return session ? (
    <div className="flex items-center gap-2">
      <span>{session.user?.name}</span>
      <button onClick={() => signOut()} className="text-sm text-blue-500 hover:underline cursor-pointer">
        로그아웃
      </button>
    </div>
  ) : (
    <button onClick={() => signIn('google')} className="text-sm text-blue-500 hover:underline cursor-pointer">
      로그인
    </button>
  );
}
