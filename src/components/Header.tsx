import React from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/lib/firebase';

type Props = { title: string; colorRole: 'cliente' | 'admin'; onLogout?: ()=>void };

export default function Header({ title, colorRole, onLogout }: Props) {
  const bg = colorRole === 'admin' ? 'bg-black text-white' : 'bg-blue-600 text-white';
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <header className={`${bg} p-4 flex justify-between items-center`}>
      <h1 className="text-xl font-bold">{title}</h1>
      <div className="flex items-center gap-2">
        <button className="px-3 py-1 rounded bg-white/10" onClick={()=>router.push('/perfil')}>Editar Perfil</button>
        <button className="px-3 py-1 rounded bg-white/10" onClick={handleLogout}>Sair</button>
      </div>
    </header>
  );
}
