import React, { useState, useRef, useEffect } from 'react';
import { useRouter } from 'next/router';
import { auth } from '@/lib/firebase';
import ModalEditProfile from './ModalEditProfile';

type Props = { title: string; colorRole: 'cliente' | 'admin'; onLogout?: ()=>void };

export default function Header({ title, colorRole, onLogout }: Props) {
  const router = useRouter();
  const [showMenu, setShowMenu] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [menuPosition, setMenuPosition] = useState({ top: 0, right: 0 });
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Atualiza posição do menu
  useEffect(() => {
    if (showMenu && buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setMenuPosition({
        top: rect.bottom + 8,
        right: window.innerWidth - rect.right
      });
    }
  }, [showMenu]);

  // Fecha o menu quando clicar fora
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node) &&
          buttonRef.current && !buttonRef.current.contains(event.target as Node)) {
        setShowMenu(false);
      }
    };

    if (showMenu) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showMenu]);

  const handleLogout = async () => {
    try {
      await auth.signOut();
      router.push('/');
    } catch (e) {
      console.error(e);
    }
  };

  const handleEditProfile = () => {
    setShowMenu(false);
    setShowEditModal(true);
  };
  
  return (
    <>
      {showEditModal && <ModalEditProfile onClose={() => setShowEditModal(false)} />}
      
      <header className="text-white border-b" style={{ backgroundColor: '#F8F8FA', borderColor: '#D1D2DC' }}>
      <div 
        style={{ 
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          alignItems: 'center',
          backgroundColor: '#F8F8FA',
          maxWidth: '1920px',
          margin: '0 auto',
          paddingTop: '16px',
          paddingRight: '128px',
          paddingBottom: '16px',
          paddingLeft: '128px',
          opacity: 1
        }}
      >
        {/* Logo - Coluna 1 (esquerda) */}
        <div style={{ transform: 'translate(10px, -20%)' }}>
          <svg width="27.73" height="32" viewBox="0 0 28 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5.56135 25.414H0V32H5.56135V25.414Z" fill="#149E4B"/>
            <path d="M12.953 20.2199H7.3916V32H12.953V20.2199Z" fill="#181C4F"/>
            <path d="M20.3382 16.7788H14.7769V31.9941H20.3382V16.7788Z" fill="#181C4F"/>
            <path d="M27.7298 10.3409H22.1685V31.9941H27.7298V10.3409Z" fill="#FFC906"/>
            <path d="M26.9008 0L19.9121 1.87155L22.4648 4.42421L25.0293 6.98278L26.9008 0Z" fill="#FFC906"/>
            <path d="M0 21.8723V18.9584L10.104 11.6498L12.4968 13.0535L21.6176 3.6069L23.3174 5.24747L12.9054 16.0326L10.2343 14.4631L0 21.8723Z" fill="#FFC906"/>
          </svg>
        </div>
        
        {/* Título - Coluna 2 (centro) */}
        <h1 
          style={{ 
            color: '#181C4F',
            height: '32px',
            opacity: 1,
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '132%',
            letterSpacing: '0%',
            textAlign: 'center',
            whiteSpace: 'nowrap'
          }}
        >
          {title}
        </h1>
        
        {/* Ícone de configurações - Coluna 3 (direita) */}
        <div style={{ display: 'flex', justifyContent: 'flex-end', paddingRight: '20px' }}>
          <button 
            ref={buttonRef}
            className="p-2 hover:bg-gray-100 rounded-full"
            onClick={() => setShowMenu(!showMenu)}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M6.45 2.757C6.48 2.371 6.66 2.012 6.95 1.751C7.24 1.49 7.61 1.345 8 1.345C8.39 1.345 8.76 1.49 9.05 1.751C9.34 2.012 9.52 2.371 9.55 2.757C9.58 3.007 9.66 3.248 9.79 3.459C9.93 3.67 10.11 3.846 10.33 3.971C10.54 4.096 10.79 4.168 11.04 4.178C11.29 4.189 11.54 4.14 11.77 4.034C12.12 3.874 12.52 3.851 12.89 3.969C13.26 4.087 13.57 4.339 13.76 4.674C13.96 5.01 14.02 5.405 13.94 5.784C13.85 6.162 13.63 6.497 13.32 6.723C13.11 6.867 12.95 7.058 12.83 7.28C12.72 7.502 12.66 7.749 12.66 8C12.66 8.25 12.72 8.497 12.83 8.719C12.95 8.942 13.11 9.133 13.32 9.277C13.63 9.502 13.85 9.837 13.94 10.216C14.02 10.594 13.96 10.99 13.76 11.325C13.57 11.661 13.26 11.912 12.89 12.03C12.52 12.149 12.12 12.126 11.77 11.965C11.54 11.86 11.29 11.81 11.04 11.821C10.79 11.832 10.54 11.903 10.33 12.028C10.11 12.154 9.93 12.329 9.79 12.54C9.66 12.752 9.58 12.992 9.55 13.242C9.52 13.629 9.34 13.987 9.05 14.249C8.76 14.51 8.39 14.654 8 14.654C7.61 14.654 7.24 14.51 6.95 14.249C6.66 13.987 6.48 13.629 6.45 13.242C6.43 12.992 6.34 12.752 6.21 12.54C6.07 12.329 5.89 12.153 5.67 12.028C5.46 11.903 5.21 11.832 4.96 11.821C4.71 11.81 4.46 11.859 4.23 11.965C3.88 12.126 3.48 12.149 3.11 12.03C2.74 11.912 2.43 11.661 2.24 11.325C2.04 10.99 1.98 10.594 2.06 10.216C2.15 9.837 2.37 9.502 2.68 9.277C2.89 9.133 3.05 8.942 3.17 8.719C3.28 8.497 3.34 8.25 3.34 8C3.34 7.749 3.28 7.502 3.17 7.28C3.05 7.058 2.89 6.867 2.68 6.723C2.37 6.497 2.15 6.162 2.07 5.784C1.98 5.406 2.05 5.01 2.24 4.675C2.43 4.34 2.74 4.089 3.11 3.97C3.48 3.852 3.88 3.874 4.23 4.034C4.46 4.14 4.71 4.189 4.96 4.178C5.21 4.168 5.45 4.096 5.67 3.971C5.89 3.846 6.07 3.67 6.21 3.459C6.34 3.248 6.42 3.007 6.45 2.757" stroke="#181C4F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 10C9.1 10 10 9.105 10 8C10 6.895 9.1 6 8 6C6.9 6 6 6.895 6 8C6 9.105 6.9 10 8 10Z" stroke="#181C4F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
        </div>
      </div>
    </header>

    {/* Menu dropdown com position fixed - fora do header */}
    {showMenu && (
      <div 
        ref={menuRef}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '4px',
          gap: '4px',
          position: 'fixed',
          width: '248px',
          top: `${menuPosition.top}px`,
          right: `${menuPosition.right}px`,
          background: '#FFFFFF',
          boxShadow: '1px 1px 8px rgba(0, 0, 0, 0.16)',
          borderRadius: '8px',
          zIndex: 9999
        }}
      >
              {/* Editar Perfil */}
              <button
                onClick={handleEditProfile}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '8px',
                  gap: '8px',
                  width: '240px',
                  height: '32px',
                  borderRadius: '4px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  alignSelf: 'stretch'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#F8F8FA'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask_user" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                    <rect width="16" height="16" fill="#0E112F"/>
                  </mask>
                  <g mask="url(#mask_user)">
                    <path d="M8 8C9.657 8 11 6.657 11 5C11 3.343 9.657 2 8 2C6.343 2 5 3.343 5 5C5 6.657 6.343 8 8 8Z" stroke="#0E112F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 14C14 11.791 11.314 10 8 10C4.686 10 2 11.791 2 14" stroke="#0E112F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '16px',
                    color: '#0E112F',
                    flex: 1,
                    textAlign: 'left'
                  }}
                >
                  Editar Perfil
                </span>
              </button>

              {/* Política de privacidade */}
              <button
                onClick={() => {
                  setShowMenu(false);
                  // Adicionar navegação quando a página existir
                  console.log('Navegar para Política de privacidade');
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '8px',
                  gap: '8px',
                  width: '240px',
                  height: '32px',
                  borderRadius: '4px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  alignSelf: 'stretch'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#F8F8FA'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask_shield" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                    <rect width="16" height="16" fill="#0E112F"/>
                  </mask>
                  <g mask="url(#mask_shield)">
                    <path d="M8 1.33333L2.66667 3.33333V7.33333C2.66667 10.6667 5.33333 13.6667 8 14.6667C10.6667 13.6667 13.3333 10.6667 13.3333 7.33333V3.33333L8 1.33333Z" stroke="#0E112F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '16px',
                    color: '#0E112F',
                    flex: 1,
                    textAlign: 'left'
                  }}
                >
                  Política de privacidade
                </span>
              </button>

              {/* Sobre */}
              <button
                onClick={() => {
                  setShowMenu(false);
                  // Adicionar navegação quando a página existir
                  console.log('Navegar para Sobre');
                }}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '8px',
                  gap: '8px',
                  width: '240px',
                  height: '32px',
                  borderRadius: '4px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  alignSelf: 'stretch'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#F8F8FA'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask_info" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                    <rect width="16" height="16" fill="#0E112F"/>
                  </mask>
                  <g mask="url(#mask_info)">
                    <circle cx="8" cy="8" r="6" stroke="#0E112F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 8V11.3333" stroke="#0E112F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M8 5.33333V5.34" stroke="#0E112F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '16px',
                    color: '#0E112F',
                    flex: 1,
                    textAlign: 'left'
                  }}
                >
                  Sobre
                </span>
              </button>

              {/* Divisor */}
              <div
                style={{
                  width: '240px',
                  height: '1px',
                  background: '#E8E8ED',
                  alignSelf: 'stretch'
                }}
              />

              {/* Sair */}
              <button
                onClick={handleLogout}
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '8px',
                  gap: '8px',
                  width: '240px',
                  height: '32px',
                  borderRadius: '4px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  alignSelf: 'stretch'
                }}
                onMouseEnter={(e) => e.currentTarget.style.background = '#F8F8FA'}
                onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <mask id="mask_logout" style={{ maskType: 'alpha' }} maskUnits="userSpaceOnUse" x="0" y="0" width="16" height="16">
                    <rect width="16" height="16" fill="#B3261E"/>
                  </mask>
                  <g mask="url(#mask_logout)">
                    <path d="M6 14H3C2.73478 14 2.48043 13.8946 2.29289 13.7071C2.10536 13.5196 2 13.2652 2 13V3C2 2.73478 2.10536 2.48043 2.29289 2.29289C2.48043 2.10536 2.73478 2 3 2H6" stroke="#B3261E" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M11 11L14 8L11 5" stroke="#B3261E" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M14 8H6" stroke="#B3261E" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                  </g>
                </svg>
                <span
                  style={{
                    fontFamily: 'Inter',
                    fontWeight: 500,
                    fontSize: '14px',
                    lineHeight: '16px',
                    color: '#B3261E',
                    flex: 1,
                    textAlign: 'left'
                  }}
                >
                  Sair
                </span>
              </button>
      </div>
    )}
    </>
  );
}
