'use client';

import { signIn, signOut, useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

export default function LoginButton() {
  const { data: session, status } = useSession();
  const router = useRouter();

  if (status === 'loading') return null;

   const handleMypage = () => {
    router.push('/mypage');
  };

  return session ? (
    <>
      <p className="text-sm text-gray-400 mt-6">
        점수를 저장해보세요! 📝 <br />
      </p>
      <div className="flex items-center gap-2">
        <span>{session.user?.name}</span>
        <button onClick={() => signOut({ callbackUrl: '/' })} className="text-sm text-blue-500 hover:underline cursor-pointer">
          로그아웃
        </button>
      </div>

      <button
        onClick={handleMypage}
        className="mt-4 bg-yellow-300 text-white font-semibold p-2 rounded-xl cursor-pointer hover:bg-yellow-500"
      >
        나의 점수 기록 보기
      </button>
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
