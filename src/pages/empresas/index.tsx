import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import CompanyCard from '@/components/CompanyCard';
import ModalNewCompany from '@/components/ModalNewCompany';
import Pagination from '@/components/Pagination';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { listCompanies, createCompany } from '@/services/companyService';
import { useRouter } from 'next/router';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function EmpresasPage() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<'cliente'|'admin'>('cliente');
  const [title, setTitle] = useState('EMPRESAS - CLIENTE');
  const [companies, setCompanies] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [page,setPage]=useState(1);
  const perPage = 6;
  const router = useRouter();

  useEffect(()=> {
    const unsub = onAuthStateChanged(auth, async (u) => {
      try {
        if (!u) { router.push('/'); return; }
        setUser(u);
        const snap = await getDoc(doc(db, 'users', u.uid));
        if (!snap.exists()) {
          console.error('Usuário não encontrado no Firestore');
          router.push('/');
          return;
        }
        const data = snap.data() as any;
        const perfil = data?.perfil || 'Cliente';
        setRole(perfil === 'Admin' ? 'admin' : 'cliente');
        setTitle(`EMPRESAS - ${perfil.toUpperCase()}`);
        await load();
      } catch (error: any) {
        console.error('Erro ao carregar perfil:', error);
        if (error.code === 'failed-precondition' || error.code === 'unavailable') {
          alert('Erro de conexão com o servidor. Verifique sua internet.');
        }
      }
    });
    return ()=>unsub();
  }, []);

  const load = async () => {
    try {
      if (!auth.currentUser) return;
      const list = await listCompanies(auth.currentUser.uid);
      setCompanies(list);
    } catch (error: any) {
      console.error('Erro ao carregar empresas:', error);
      if (error.code === 'failed-precondition' || error.code === 'unavailable') {
        alert('Erro de conexão com o servidor. Verifique sua internet.');
      }
      setCompanies([]);
    }
  };

  const handleSave = async (data:any) => {
    await createCompany(auth.currentUser!.uid, data);
    await load();
  };

  const totalPages = Math.max(1, Math.ceil(companies.length / perPage));
  const pageCompanies = companies.slice((page-1)*perPage, page*perPage);

  return (
    <div className="min-h-screen bg-gray-100">
      <Header title={title} colorRole={role} />
      <main className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-bold">Minhas empresas</h2>
          <div>
            <button onClick={()=> setOpenModal(true)} className="px-3 py-1 bg-blue-600 text-white rounded">Cadastrar Empresa</button>
          </div>
        </div>

        {companies.length===0 ? (
          <div className="p-8 bg-white rounded text-center">Sem empresa cadastrada</div>
        ) : (
          <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pageCompanies.map(c => <CompanyCard key={c.id} company={c} />)}
            </div>
            <Pagination page={page} totalPages={totalPages} onPrev={() => setPage(p=>Math.max(1,p-1))} onNext={() => setPage(p=>Math.min(totalPages,p+1))} />
          </>
        )}

        {openModal && <ModalNewCompany onClose={()=>setOpenModal(false)} onSave={handleSave} />}
      </main>
    </div>
  );
}
