
import RegisterForm from '@/app/ui/register-form';
import { Suspense } from 'react';
import { quicksand } from '@/app/ui/fonts';
import Image from "next/image";
import Link from 'next/link';
 
export default function RegisterPage() {
  return (
    <main className={`${quicksand.className} flex items-center justify-center`}>
      <div className="relative mx-auto flex w-full max-w-[400px] flex-col space-y-2.5 p-4">
        <div className="flex items-center justify-center">
          <Link href="/" >
            <Image
                      src="/logonuevo.svg"
                      alt="Move logo"
                      width={200}
                      height={200}
                      priority
                    />
          </Link>
        </div>
        <Suspense>
          <RegisterForm />
        </Suspense>
      </div>
    </main>
  );
}