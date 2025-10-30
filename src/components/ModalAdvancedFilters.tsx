import React, { useState } from 'react';

type Props = {
  onClose: () => void;
  onApply: (filters: any) => void;
};

export default function ModalAdvancedFilters({ onClose, onApply }: Props) {
  const [projectsMin, setProjectsMin] = useState('');
  const [projectsMax, setProjectsMax] = useState('');
  const [usersMin, setUsersMin] = useState('');
  const [usersMax, setUsersMax] = useState('');
  const [updateDate, setUpdateDate] = useState('');

  const handleClear = () => {
    setProjectsMin('');
    setProjectsMax('');
    setUsersMin('');
    setUsersMax('');
    setUpdateDate('');
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
      className="fixed inset-0 bg-black/40 z-50"
      onClick={onClose}
    >
      <div 
        onClick={(e) => e.stopPropagation()}
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          padding: '16px',
          gap: '16px',
          position: 'absolute',
          width: '420px',
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: '#FFFFFF',
          boxShadow: '1px 1px 8px rgba(0, 0, 0, 0.16)',
          borderRadius: '8px'
        }}
      >
        {/* Título */}
        <h2
          style={{
            width: '388px',
            height: '27px',
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
            alignSelf: 'stretch'
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
            width: '388px'
          }}
        >
          {/* Projetos */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              padding: '0px',
              gap: '8px',
              width: '388px',
              height: '64px',
              alignSelf: 'stretch'
            }}
          >
            {/* Min */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '8px',
                width: '144px',
                height: '64px'
              }}
            >
              <label
                style={{
                  width: '158px',
                  height: '16px',
                  opacity: 1,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontStyle: 'normal',
                  fontSize: '14px',
                  lineHeight: '16px',
                  letterSpacing: '0%',
                  color: 'var(--Count-Default-Label, #181C4F)'
                }}
              >
                Quantidade de Projetos
              </label>
              <input
                type="number"
                value={projectsMin}
                onChange={(e) => setProjectsMin(e.target.value)}
                placeholder="Min"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '8px',
                  gap: '8px',
                  width: '144px',
                  height: '40px',
                  background: '#F8F8FA',
                  border: '1px solid #E8E8ED',
                  borderRadius: '8px',
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#181C4F'
                }}
              />
            </div>

            {/* Max */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '8px',
                width: '144px',
                height: '40px'
              }}
            >
              <input
                type="number"
                value={projectsMax}
                onChange={(e) => setProjectsMax(e.target.value)}
                placeholder="Max"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '8px',
                  gap: '8px',
                  width: '144px',
                  height: '40px',
                  background: '#F8F8FA',
                  border: '1px solid #E8E8ED',
                  borderRadius: '8px',
                  alignSelf: 'stretch',
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#181C4F'
                }}
              />
            </div>
          </div>

          {/* Usuários */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              alignItems: 'flex-end',
              padding: '0px',
              gap: '8px',
              width: '388px',
              height: '64px',
              alignSelf: 'stretch'
            }}
          >
            {/* Min */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '8px',
                width: '144px',
                height: '64px'
              }}
            >
              <label
                style={{
                  width: '158px',
                  height: '16px',
                  opacity: 1,
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 500,
                  fontStyle: 'normal',
                  fontSize: '14px',
                  lineHeight: '16px',
                  letterSpacing: '0%',
                  color: 'var(--Count-Default-Label, #181C4F)'
                }}
              >
                Quantidade de Usuários
              </label>
              <input
                type="number"
                value={usersMin}
                onChange={(e) => setUsersMin(e.target.value)}
                placeholder="Min"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '8px',
                  gap: '8px',
                  width: '144px',
                  height: '40px',
                  background: '#F8F8FA',
                  border: '1px solid #E8E8ED',
                  borderRadius: '8px',
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#181C4F'
                }}
              />
            </div>

            {/* Max */}
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '0px',
                gap: '8px',
                width: '144px',
                height: '40px'
              }}
            >
              <input
                type="number"
                value={usersMax}
                onChange={(e) => setUsersMax(e.target.value)}
                placeholder="Max"
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  alignItems: 'center',
                  padding: '8px',
                  gap: '8px',
                  width: '144px',
                  height: '40px',
                  background: '#F8F8FA',
                  border: '1px solid #E8E8ED',
                  borderRadius: '8px',
                  alignSelf: 'stretch',
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '16px',
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
              width: '388px',
              height: '64px',
              alignSelf: 'stretch'
            }}
          >
            <label
              style={{
                width: '158px',
                height: '16px',
                opacity: 1,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '16px',
                letterSpacing: '0%',
                color: 'var(--Count-Default-Label, #181C4F)'
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
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '8px',
                gap: '8px',
                width: '388px',
                height: '40px',
                background: '#F8F8FA',
                border: '1px solid #E8E8ED',
                borderRadius: '8px',
                alignSelf: 'stretch',
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '16px',
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
            height: '40px'
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
              width: '103px',
              height: '40px',
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
              width: '80px',
              height: '40px',
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
