import React, { useEffect, useState } from 'react';

type Props = {
  onClose: () => void;
  onApply: (filters: any) => void;
};

export default function ModalAdvancedFilters({ onClose, onApply }: Props) {
  const [projectsMin, setProjectsMin] = useState('');
  const [projectsMax, setProjectsMax] = useState('');
  const [isMobile, setIsMobile] = useState(false);
  const [usersMin, setUsersMin] = useState('');
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(max-width: 767px)');
    const apply = () => setIsMobile(mq.matches);
    apply();
    mq.addEventListener('change', apply);
    return () => mq.removeEventListener('change', apply);
  }, []);
  const [usersMax, setUsersMax] = useState('');
  const [updateDate, setUpdateDate] = useState('');
  

  const handleClear = () => {
    setProjectsMin('');
    setProjectsMax('');
    setUsersMin('');
    setUsersMax('');
  };

  const handleApply = () => {
    onApply({
      projectsMin: parseInt(projectsMin) || 0,
      projectsMax: parseInt(projectsMax) || 0,
      usersMin: parseInt(usersMin) || 0,
      usersMax: parseInt(usersMax) || 0,
      updateDate
    });
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '16px' ,
          gap: '16px',
          width: '100%',
          maxWidth: '400px',
          maxHeight: 'calc(100vh - 32px)',
          overflowY: 'auto',
          background: '#FFFFFF',
          boxShadow: '1px 1px 8px rgba(0, 0, 0, 0.16)',
          borderRadius: '8px'
        }}
      >
        {/* Título */}
        <h2
          style={{
            width: '100%',
            opacity: 1,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '18px',
            lineHeight: '150%',
            letterSpacing: '0%',
            display: 'flex',
            alignItems: 'center',
            color: 'var(--Base-brand-primary, #181C4F)',
            flex: 'none',
            alignSelf: 'stretch',
            marginLeft: isMobile ? '10px' : 0,
            marginRight: isMobile ? '10px' : 0
          }}
        >
          Filtros Avançados
        </h2>

        {/* Content */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'flex-start',
            padding: '0px',
            gap: '16px',
            width: '100%'
          }}
        >
          {/* Projetos */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '8px',
              width: '100%',
              alignSelf: 'stretch',
              marginLeft: isMobile ? '10px' : 0,
            
            }}
          >
            <label
              style={{
                opacity: 1,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '16px',
                letterSpacing: '0%',
                color: 'var(--Count-Default-Label, #181C4F)',
                width: '100%',
                alignSelf: 'stretch'
              }}
            >
              Quantidade de Projetos
            </label>
            <div style={{ display: 'flex', gap: '8px', width: '80%' }}>
              <input
                type="number"
                value={projectsMin}
                onChange={(e) => setProjectsMin(e.target.value)}
                placeholder="Min"
                style={{
                  flex: 1,
                  width: '100%',
                  padding: '8px',
                  height: '44px',
                  background: '#F8F8FA',
                  border: '1px solid #E8E8ED',
                  borderRadius: '8px',
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: '16px',
                  color: '#181C4F'
                }}
              />
              <input
                type="number"
                value={projectsMax}
                onChange={(e) => setProjectsMax(e.target.value)}
                placeholder="Max"
                style={{
                  flex: 1,
                  width: '100%',
                  padding: '8px',
                  height: '44px',
                  background: '#F8F8FA',
                  border: '1px solid #E8E8ED',
                  borderRadius: '8px',
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: '16px',
                  color: '#181C4F'
                }}
              />
            </div>
          </div>

          {/* Usuários */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '8px',
              width: '100%',
              alignSelf: 'stretch',
              marginLeft: isMobile ? '10px' : 0,
            
            }}
          >
            <label
              style={{
                opacity: 1,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '16px',
                letterSpacing: '0%',
                color: 'var(--Count-Default-Label, #181C4F)',
                width: '100%'
              }}
            >
              Quantidade de Usuários
            </label>
            <div style={{ display: 'flex', gap: '8px', width: '80%' }}>
              <input
                type="number"
                value={usersMin}
                onChange={(e) => setUsersMin(e.target.value)}
                placeholder="Min"
                style={{
                  flex: 1,
                  width: '100%',
                  padding: '8px',
                  height: '44px',
                  background: '#F8F8FA',
                  border: '1px solid #E8E8ED',
                  borderRadius: '8px',
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: '16px',
                  color: '#181C4F'
                }}
              />
              <input
                type="number"
                value={usersMax}
                onChange={(e) => setUsersMax(e.target.value)}
                placeholder="Max"
                style={{
                  flex: 1,
                  padding: '8px',
                  height: '44px',
                  background: '#F8F8FA',
                  border: '1px solid #E8E8ED',
                  borderRadius: '8px',
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: '16px',
                  width: '80%',
                  color: '#181C4F'
                }}
              />
            </div>
          </div>

          {/* Data de Atualização */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              padding: '0px',
              gap: '8px',
              width: '100%',
              alignSelf: 'stretch',
              marginLeft: isMobile ? '10px' : 0,
              
            }}
          >
            <label
              style={{
                opacity: 1,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '16px',
                letterSpacing: '0%',
                color: 'var(--Count-Default-Label, #181C4F)',
                width: '100%'
              }}
            >
              Data de Atualização
            </label>
            <input
              type="date"
              value={updateDate}
              onChange={(e) => setUpdateDate(e.target.value)}
              placeholder="Selecionar Período"
              style={{
                width: '80%',
                padding: '8px',
                height: '44px',
                background: '#F8F8FA',
                border: '1px solid #E8E8ED',
                borderRadius: '8px',
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '16px',
                color: updateDate ? '#181C4F' : '#A3A4B9'
              }}
            />
          </div>
        </div>

        {/* Buttons */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            padding: '0px',
            gap: '8px',
            width: '100%',
            flexWrap: 'wrap',
            marginLeft: isMobile ? '10px' : 0,
          }}
        >
          {/* Limpar */}
          <button
            onClick={handleClear}
            style={{
              boxSizing: 'border-box',
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '8px 16px',
              gap: '8px',
              flex: '0 0 auto',
              width: '100px',
              height: '44px',
              border: '1px solid #181C4F',
              borderRadius: '6px',
              background: 'transparent',
              cursor: 'pointer',
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '24px',
              color: '#181C4F'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4L12 12M4 12L12 4" stroke="#181C4F" strokeWidth="0.8" strokeLinecap="round"/>
            </svg>
            Limpar
          </button>

          {/* Aplicar */}
          <button
            onClick={handleApply}
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
              padding: '8px 16px',
              gap: '8px',
              flex: '0 0 auto',
              width: '100px',
              height: '44px',
              background: '#181C4F',
              borderRadius: '6px',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'Inter',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '24px',
              color: '#E8E8ED'
            }}
          >
            Aplicar
          </button>
        </div>
      </div>
    </div>
  );
}
