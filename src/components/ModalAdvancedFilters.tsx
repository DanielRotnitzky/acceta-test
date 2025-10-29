import React, { useState } from 'react';

type Props = {
  onClose: () => void;
  onApply: (filters: any) => void;
};

export default function ModalAdvancedFilters({ onClose, onApply }: Props) {
  const [projectsMin, setProjectsMin] = useState('0');
  const [projectsMax, setProjectsMax] = useState('0');
  const [usersMin, setUsersMin] = useState('0');
  const [usersMax, setUsersMax] = useState('0');
  const [companyType, setCompanyType] = useState('');

  const handleClear = () => {
    setProjectsMin('0');
    setProjectsMax('0');
    setUsersMin('0');
    setUsersMax('0');
    setCompanyType('');
  };

  const handleApply = () => {
    onApply({
      projectsMin: parseInt(projectsMin) || 0,
      projectsMax: parseInt(projectsMax) || 0,
      usersMin: parseInt(usersMin) || 0,
      usersMax: parseInt(usersMax) || 0,
      companyType
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
            fontFamily: 'Inter',
            fontWeight: 600,
            fontSize: '18px',
            lineHeight: '150%',
            display: 'flex',
            alignItems: 'center',
            color: '#181C4F',
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
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#181C4F'
                }}
              >
                Projetos (mínimo)
              </label>
              <input
                type="number"
                value={projectsMin}
                onChange={(e) => setProjectsMin(e.target.value)}
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
                placeholder="máximo"
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
                  fontFamily: 'Inter',
                  fontWeight: 500,
                  fontSize: '14px',
                  lineHeight: '16px',
                  color: '#181C4F'
                }}
              >
                Usuários (mínimo)
              </label>
              <input
                type="number"
                value={usersMin}
                onChange={(e) => setUsersMin(e.target.value)}
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
                placeholder="máximo"
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

          {/* Tipo de Empresa */}
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
                fontFamily: 'Inter',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '16px',
                color: '#000000'
              }}
            >
              Tipo de Empresa
            </label>
            <select
              value={companyType}
              onChange={(e) => setCompanyType(e.target.value)}
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                padding: '12px 8px',
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
                color: companyType ? '#181C4F' : '#A3A4B9'
              }}
            >
              <option value="">Selecione</option>
              <option value="matriz">Matriz</option>
              <option value="filial">Filial</option>
              <option value="holding">Holding</option>
              <option value="mei">MEI</option>
              <option value="startup">Startup</option>
            </select>
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

          {/* Filtrar */}
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
            Filtrar
          </button>
        </div>
      </div>
    </div>
  );
}
