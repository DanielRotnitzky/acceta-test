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
      <Header title={`PERFIL - ${perfil.toUpperCase()}`} colorRole={perfil==='Admin' ? 'admin' : 'cliente'} />
      <main className="p-6">
        <div className="max-w-md bg-white p-6 rounded">
          <label className="block">Nome</label>
          <input className="w-full p-2 border mb-2" value={name} onChange={e=>setName(e.target.value)} />
          <label className="block">E-mail</label>
          <input disabled className="w-full p-2 border mb-2 bg-gray-50" value={email} />
          <label className="block">CNPJ</label>
          <input disabled className="w-full p-2 border mb-2 bg-gray-50" value={cnpj} />
          <label className="block">Tipo de perfil</label>
          <input disabled className="w-full p-2 border mb-2 bg-gray-50" value={perfil} />
          <div className="flex gap-2 justify-end">
            <button onClick={save} className="px-3 py-1 bg-blue-600 text-white rounded">Salvar e voltar</button>
          </div>
        </div>
      </main>
    </div>
  );
}
