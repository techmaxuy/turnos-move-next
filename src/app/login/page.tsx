import MoveLogo from '@/app/ui/moveLogo';
import LoginForm from '@/app/ui/login-form';
import { Suspense } from 'react';
import { quicksand } from '@/app/ui/fonts';
 
export default function LoginPage() {
  return (
    <main className={`${quicksand.className} flex items-center justify-center`}>
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex h-20 w-full rounded-lg bg-black p-3 border-2 border-solid border-[#01feab] items-center justify-center">
            <MoveLogo />
        </div>
        <Suspense>
          <LoginForm />
        </Suspense>
      </div>
    </main>
  );
}