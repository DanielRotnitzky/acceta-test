import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/lib/firebase';

export default function App({ Component, pageProps }: AppProps) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, () => {
      setLoading(false);
    });
    return () => unsub();
  }, []);
  if (loading) return <div className="min-h-screen flex items-center justify-center">Carregando...</div>;
  return <Component {...pageProps} />;
}
