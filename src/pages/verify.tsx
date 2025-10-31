import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/lib/firebase';

export default function VerifyRedirect() {
  const router = useRouter();

  useEffect(() => {
    // Aguarda autenticação do usuário
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user && user.emailVerified) {
        router.replace('/email-verified');
      }
    });
    return () => unsubscribe();
  }, [router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-blue-700 mb-4">Verificando e-mail...</h1>
        <p className="text-gray-700 mb-6">Aguarde enquanto confirmamos a validação do seu e-mail.</p>
      </div>
    </div>
  );
}
