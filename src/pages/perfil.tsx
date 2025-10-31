import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { useRouter } from 'next/router';

export default function Perfil() {
  const [name,setName]=useState('');
  const [email,setEmail]=useState('');
  const [cnpj,setCnpj]=useState('');
  const [perfil,setPerfil]=useState('');
  const router = useRouter();

  useEffect(()=>{
    const unsub = onAuthStateChanged(auth, async (u) => {
      if (!u) { router.push('/'); return; }
      const snap = await getDoc(doc(db, 'users', u.uid));
      const data = snap.data() as any;
      setName(data?.nome || '');
      setEmail(data?.email || '');
      setCnpj(data?.cnpj || '');
      setPerfil(data?.perfil || 'Cliente');
    });
    return ()=>unsub();
  }, []);

  const save = async () => {
    const uid = auth.currentUser!.uid;
    await updateDoc(doc(db, 'users', uid), { nome: name });
    router.push('/empresas');
  };

  return (
    <div>
      <Header title={`Perfil - ${perfil}`} colorRole={perfil==='Admin' ? 'admin' : 'cliente'} />
      <main className="p-4 md:p-6">
        <div className="max-w-md mx-auto bg-white p-4 md:p-6 rounded shadow-sm">
          <label className="block text-sm font-medium mb-1">Nome</label>
          <input 
            className="w-full p-2 md:p-3 border rounded mb-3 text-base" 
            value={name} 
            onChange={e=>setName(e.target.value)} 
          />
          <label className="block text-sm font-medium mb-1">E-mail</label>
          <input 
            disabled 
            className="w-full p-2 md:p-3 border rounded mb-3 bg-gray-50 text-base" 
            value={email} 
          />
          <label className="block text-sm font-medium mb-1">CNPJ</label>
          <input 
            disabled 
            className="w-full p-2 md:p-3 border rounded mb-3 bg-gray-50 text-base" 
            value={cnpj} 
          />
          <label className="block text-sm font-medium mb-1">Tipo de perfil</label>
          <input 
            disabled 
            className="w-full p-2 md:p-3 border rounded mb-4 bg-gray-50 text-base" 
            value={perfil} 
          />
          <div className="flex gap-2 justify-end">
            <button 
              onClick={save} 
              className="w-full md:w-auto px-4 py-3 bg-blue-600 text-white rounded font-medium hover:bg-blue-700 transition-colors"
            >
              Salvar e voltar
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
