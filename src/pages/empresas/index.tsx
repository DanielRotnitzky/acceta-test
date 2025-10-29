import React, { useEffect, useState } from 'react';
import Header from '@/components/Header';
import CompanyCard from '@/components/CompanyCard';
import ModalNewCompany from '@/components/ModalNewCompany';
import ModalAdvancedFilters from '@/components/ModalAdvancedFilters';
import Pagination from '@/components/Pagination';
import { auth } from '@/lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { listCompanies, createCompany } from '@/services/companyService';
import { useRouter } from 'next/router';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';

export default function EmpresasPage() {
  const [user, setUser] = useState<any>(null);
  const [role, setRole] = useState<'cliente'|'admin'>('cliente');
  const [title, setTitle] = useState('Empresas - Cliente');
  const [companies, setCompanies] = useState<any[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showActiveOnly, setShowActiveOnly] = useState(true);
  const [advancedFilters, setAdvancedFilters] = useState<any>(null);
  const [page,setPage]=useState(1);
  const perPage = 6;
  const router = useRouter();

  // Cor primária dinâmica baseada no role
  const primaryColor = role === 'admin' ? '#000000' : '#181C4F';

  useEffect(()=> {
    const unsub = onAuthStateChanged(auth, async (u) => {
      try {
        if (!u) { 
          router.push('/'); 
          return; 
        }
        setUser(u);
        
        const snap = await getDoc(doc(db, 'users', u.uid));
        
        if (!snap.exists()) {
          // Criar documento padrão se não existir
          const defaultData = {
            nome: u.displayName || u.email?.split('@')[0] || 'Usuário',
            email: u.email || '',
            perfil: 'Cliente',
            createdAt: new Date().toISOString()
          };
          
          await setDoc(doc(db, 'users', u.uid), defaultData);
          
          setRole('cliente');
          setTitle('Empresas - Cliente');
        } else {
          const data = snap.data() as any;
          const perfil = data?.perfil || 'Cliente';
          setRole(perfil === 'Admin' ? 'admin' : 'cliente');
          setTitle(`Empresas - ${perfil}`);
        }
        
        await load();
      } catch (error: any) {
        console.error('Erro ao carregar perfil:', error);
        
        if (error.code === 'failed-precondition' || error.code === 'unavailable') {
          alert('Erro de conexão com o servidor. Verifique sua internet e recarregue a página.');
        } else if (error.code === 'permission-denied') {
          alert('Sem permissão para acessar os dados. Entre em contato com o suporte.');
        }
      }
    });
    return ()=>unsub();
  }, [router]);

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

  const filteredCompanies = companies.filter(c => {
    const matchesSearch = c.companyName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.taxId?.includes(searchTerm) ||
      c.razaoSocial?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.cnpj?.includes(searchTerm);
    const matchesStatus = showActiveOnly 
      ? (c.status === 'active' || c.status === 'ativo')
      : (c.status === 'inactive' || c.status === 'inativo');
    
    let matchesAdvanced = true;
    if (advancedFilters) {
      const projectCount = c.projectCount ?? c.numProjects ?? 0;
      const userCount = c.userCount ?? c.numUsuarios ?? 0;
      
      if (advancedFilters.projectsMin && projectCount < advancedFilters.projectsMin) {
        matchesAdvanced = false;
      }
      if (advancedFilters.projectsMax && projectCount > advancedFilters.projectsMax) {
        matchesAdvanced = false;
      }
      if (advancedFilters.usersMin && userCount < advancedFilters.usersMin) {
        matchesAdvanced = false;
      }
      if (advancedFilters.usersMax && userCount > advancedFilters.usersMax) {
        matchesAdvanced = false;
      }
      if (advancedFilters.companyType && advancedFilters.companyType !== 'todas') {
        const type = c.companyType ?? c.tipoEmpresa ?? '';
        if (type !== advancedFilters.companyType) {
          matchesAdvanced = false;
        }
      }
    }
    
    return matchesSearch && matchesStatus && matchesAdvanced;
  });

  const totalPages = Math.max(1, Math.ceil(filteredCompanies.length / perPage));
  const pageCompanies = filteredCompanies.slice((page-1)*perPage, page*perPage);

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F8F8FA' }}>
      <Header title={title} colorRole={role} />
      
      {/* Barra de navegação com abas */}
      <div 
        className="mx-auto" 
        style={{ 
          maxWidth: '1920px',
          height: '56px',
          opacity: 1,
          paddingRight: '128px',
          paddingLeft: '128px',
          borderBottom: '1px solid #D1D2DC',
          backgroundColor: '#FFFFFF'
        }}
      >
        <nav className="flex items-center h-full gap-6">
          <button 
            className="h-full px-4 border-b-2 transition-colors"
            style={{ 
              borderColor: primaryColor
            }}
          >
            <span
              style={{
                width: '66px',
                height: '16px',
                opacity: 1,
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '16px',
                letterSpacing: '0%',
                color: primaryColor,
                display: 'inline-block'
              }}
            >
              Empresas
            </span>
          </button>
        </nav>
      </div>

      <main 
        className="mx-auto"
        style={{ 
          maxWidth: '1920px',
          minHeight: '1042px',
          paddingTop: '32px',
          paddingRight: '128px',
          paddingBottom: '64px',
          paddingLeft: '128px',
          gap: '32px',
          display: 'flex',
          flexDirection: 'column',
          opacity: 1
        }}
      >
        {/* Barra de busca e ações */}
        <div 
          className="bg-white rounded-lg border"
          style={{ 
            minHeight: '72px',
            gap: '16px',
            opacity: 1,
            paddingTop: '16px',
            paddingRight: '24px',
            paddingBottom: '16px',
            paddingLeft: '24px',
            borderRadius: '8px',
            borderWidth: '1px',
            background: '#FFFFFF',
            borderColor: '#D1D2DC',
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'center'
          }}
        >
          <div className="flex items-center gap-4" style={{ flexWrap: 'wrap', flex: 1 }}>
            {/* Campo de busca */}
            <div className="relative">
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 12L9.106 9.107" stroke="#747795" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M5.333 10.667C8.279 10.667 10.667 8.279 10.667 5.333C10.667 2.388 8.279 0 5.333 0C2.388 0 0 2.388 0 5.333C0 8.279 2.388 10.667 5.333 10.667Z" stroke="#747795" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <input
                type="text"
                placeholder="Buscar por nome ou CNPJ..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                style={{ 
                  width: '100%',
                  maxWidth: '384px',
                  height: '40px',
                  gap: '8px',
                  opacity: 1,
                  paddingLeft: '40px',
                  paddingRight: '16px',
                  backgroundColor: '#F8F8FA',
                  borderColor: '#D1D2DC',
                  color: primaryColor
                }}
              />
            </div>

            {/* Botão de filtros */}
            <button 
              onClick={() => setShowAdvancedFilters(true)}
              className="flex items-center gap-2 hover:bg-gray-50"
              style={{ 
                width: '99px',
                height: '40px',
                gap: '8px',
                opacity: 1,
                paddingTop: '8px',
                paddingRight: '16px',
                paddingBottom: '8px',
                paddingLeft: '16px',
                borderRadius: '6px',
                borderWidth: '1px',
                background: '#F8F8FA',
                borderColor: '#E8E8ED'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <mask id="mask0_1_6845" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                  <path d="M6.66659 13.3333C6.66653 13.4572 6.701 13.5787 6.76612 13.6841C6.83124 13.7895 6.92443 13.8746 7.03526 13.93L8.36859 14.5967C8.47025 14.6475 8.58322 14.6714 8.69675 14.6663C8.81029 14.6612 8.92062 14.6271 9.01728 14.5673C9.11393 14.5075 9.1937 14.424 9.249 14.3247C9.30431 14.2254 9.33331 14.1137 9.33326 14V9.33333C9.33341 9.00292 9.45623 8.68433 9.67792 8.43933L14.4933 3.11333C14.5796 3.01771 14.6363 2.89912 14.6567 2.77192C14.677 2.64472 14.66 2.51435 14.6079 2.39658C14.5557 2.27881 14.4705 2.17868 14.3626 2.1083C14.2547 2.03792 14.1287 2.0003 13.9999 2H1.99992C1.87099 2.00005 1.74484 2.03748 1.63676 2.10776C1.52867 2.17804 1.44328 2.27815 1.39093 2.39598C1.33858 2.5138 1.32151 2.64427 1.34181 2.77159C1.3621 2.89892 1.41887 3.01762 1.50526 3.11333L6.32192 8.43933C6.54361 8.68433 6.66644 9.00292 6.66659 9.33333V13.3333Z" stroke="black" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                </mask>
                <g mask="url(#mask0_1_6845)">
                  <rect width="16" height="16" fill={primaryColor}/>
                </g>
              </svg>
              <span
                style={{
                  width: '43px',
                  height: '24px',
                  opacity: 1,
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '24px',
                  letterSpacing: '0%',
                  color: primaryColor,
                  display: 'inline-block'
                }}
              >
                Filtros
              </span>
            </button>

            {/* Toggle Ver empresas ativas */}
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={showActiveOnly}
                  onChange={(e) => setShowActiveOnly(e.target.checked)}
                  className="sr-only"
                />
                <div 
                  className="w-11 h-6 rounded-full transition-colors"
                  style={{
                    backgroundColor: showActiveOnly ? primaryColor : '#E8E8ED'
                  }}
                >
                  <div 
                    style={{
                      width: '20px',
                      height: '20px',
                      top: '2px',
                      left: showActiveOnly ? '22px' : '2px',
                      opacity: 1,
                      background: '#F8F8FA',
                      borderRadius: '50%',
                      position: 'absolute',
                      transition: 'left 0.2s ease-in-out'
                    }}
                  />
                </div>
              </div>
              <span
                style={{
                  width: '136px',
                  height: '16px',
                  opacity: 1,
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '16px',
                  letterSpacing: '0%',
                  verticalAlign: 'middle',
                  color: '#0E112F',
                  display: 'inline-block'
                }}
              >
                Ver empresas ativas
              </span>
            </label>

            {/* Botão cadastrar empresa */}
            <button 
              onClick={() => setOpenModal(true)} 
              className="flex items-center text-white font-medium hover:opacity-90"
              style={{ 
                width: '186px',
                height: '40px',
                gap: '8px',
                opacity: 1,
                paddingTop: '8px',
                paddingRight: '16px',
                paddingBottom: '8px',
                paddingLeft: '16px',
                borderRadius: '6px',
                background: primaryColor,
                flexShrink: 0,
                marginLeft: 'auto'
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ opacity: 1 }}>
                <path d="M5.333 8H10.667" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
                <path d="M8 5.333V10.667" stroke="white" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              <span
                style={{
                  width: '130px',
                  height: '24px',
                  opacity: 1,
                  fontWeight: 600,
                  fontSize: '14px',
                  lineHeight: '24px',
                  letterSpacing: '0%',
                  color: '#E8E8ED',
                  display: 'inline-block'
                }}
              >
                Cadastrar Empresa
              </span>
            </button>
          </div>
        </div>

        {/* Lista de empresas */}
        {filteredCompanies.length === 0 ? (
          <div className="bg-white rounded-lg border p-12 text-center" style={{ borderColor: '#D1D2DC' }}>
            <p style={{ color: '#A3A4B9' }}>
              {searchTerm ? 'Nenhuma empresa encontrada com os critérios de busca.' : 'Sem empresa cadastrada'}
            </p>
          </div>
        ) : (
          <>
            <div 
              style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(533px, 1fr))',
                gap: '24px',
                justifyItems: 'center'
              }}
            >
              {pageCompanies.map(c => <CompanyCard key={c.id} company={c} role={role} />)}
            </div>
            <div>
              <Pagination page={page} totalPages={totalPages} onPrev={() => setPage(p=>Math.max(1,p-1))} onNext={() => setPage(p=>Math.min(totalPages,p+1))} />
            </div>
          </>
        )}

        {openModal && <ModalNewCompany onClose={()=>setOpenModal(false)} onSave={handleSave} />}
        {showAdvancedFilters && (
          <ModalAdvancedFilters 
            onClose={() => setShowAdvancedFilters(false)} 
            onApply={(filters) => {
              setAdvancedFilters(filters);
              setShowAdvancedFilters(false);
              setPage(1);
            }} 
          />
        )}
      </main>
    </div>
  );
}
