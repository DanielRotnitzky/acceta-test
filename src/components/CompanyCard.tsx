import React from 'react';

type Props = {
  company: {
    id: string;
    companyName?: string;
    razaoSocial?: string;
    taxId?: string;
    cnpj?: string;
    projectCount?: number;
    numProjects?: number;
    userCount?: number;
    numUsuarios?: number;
    updatedAt: string;
  };
  role: 'cliente' | 'admin';
};

export default function CompanyCard({ company, role }: Props) {
  const displayName = company.companyName || company.razaoSocial || '';
  const displayTaxId = company.taxId || company.cnpj || '';
  const displayProjectCount = company.projectCount ?? company.numProjects ?? 0;
  const displayUserCount = company.userCount ?? company.numUsuarios ?? 0;
  
  // Cor primária dinâmica baseada no role
  const primaryColor = role === 'admin' ? '#000000' : '#181C4F';

  return (
    <div 
      style={{
        width: '100%',
        maxWidth: '533px',
        height: 'auto',
        minHeight: '350px',
        opacity: 1,
        borderRadius: '8px',
        background: 'var(--Surface-Base-surface-01, #FFFFFF)',
        boxShadow: '1px 1px 8px 0px #00000029',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden'
      }}
    >
      {/* Header azul */}
      <div 
        style={{
          width: '100%',
          minHeight: '67px',
          gap: '8px',
          opacity: 1,
          paddingTop: '12px',
          paddingRight: '16px',
          paddingBottom: '12px',
          paddingLeft: '16px',
          borderTopLeftRadius: '8px',
          borderTopRightRadius: '8px',
          background: `var(--Brand-Primary-brand-primary-500, ${primaryColor})`,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <h3 
          style={{
            width: '100%',
            opacity: 1,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontStyle: 'normal',
            fontSize: '18px',
            lineHeight: '150%',
            letterSpacing: '0%',
            textAlign: 'center',
            color: 'var(--Brand-Primary-brand-primary-050, #E8E8ED)',
            margin: 0,
            padding: '0 8px',
            wordBreak: 'break-word'
          }}
        >
          {displayName}
        </h3>
        <p 
          style={{
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '14px',
            lineHeight: '140%',
            color: '#E8E8ED',
            margin: 0,
            textAlign: 'center',
            padding: '0 8px'
          }}
        >
          {displayTaxId}
        </p>
      </div>

      {/* Conteúdo */}
      <div 
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          padding: '24px',
          gap: '11px',
          alignItems: 'center'
        }}
      >
        {/* Número grande de projetos */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', alignItems: 'center' }}>
          <div 
            style={{
              width: '56px',
              height: '42px',
              opacity: 1,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontStyle: 'normal',
              fontSize: '32px',
              lineHeight: '130%',
              letterSpacing: '0%',
              textAlign: 'center',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            {displayProjectCount}
          </div>
          <div 
            style={{
              width: '56px',
              height: '20px',
              opacity: 1,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '140%',
              letterSpacing: '0%',
              textAlign: 'center',
              color: '#000000',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center'
            }}
          >
            Projetos
          </div>
        </div>

        {/* Data de atualização */}
        <div 
          style={{
            width: '100%',
            opacity: 1,
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontStyle: 'normal',
            fontSize: '14px',
            lineHeight: '140%',
            letterSpacing: '0%',
            textAlign: 'center',
            color: '#000000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '0 8px'
          }}
        >
          Atualizado em: {new Date(company.updatedAt).toLocaleDateString('pt-BR')}
        </div>

        {/* Botões */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: 'auto', width: '100%' }} className="company-card-buttons">
          {/* Botão Ver projetos */}
          <button
            style={{
              width: '100%',
              height: '40px',
              borderRadius: '6px',
              background: '#F8F8FA',
              border: '1px solid #E8E8ED',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '8px 16px',
              gap: '8px',
              cursor: 'pointer',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontSize: '14px',
              lineHeight: '24px',
              color: primaryColor
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.375 8.232C1.319 8.082 1.319 7.918 1.375 7.768C1.916 6.456 2.834 5.334 4.014 4.545C5.193 3.755 6.581 3.334 8 3.334C9.419 3.334 10.807 3.755 11.986 4.545C13.166 5.334 14.084 6.456 14.625 7.768C14.681 7.918 14.681 8.082 14.625 8.232C14.084 9.544 13.166 10.666 11.986 11.455C10.807 12.245 9.419 12.666 8 12.666C6.581 12.666 5.193 12.245 4.014 11.455C2.834 10.666 1.916 9.544 1.375 8.232Z" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
              <path d="M8 10C9.105 10 10 9.105 10 8C10 6.895 9.105 6 8 6C6.895 6 6 6.895 6 8C6 9.105 6.895 10 8 10Z" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Ver projetos
          </button>

          {/* Botões Usuários e Editar */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              style={{
                flex: 1,
                height: '40px',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 16px',
                gap: '8px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '24px',
                color: primaryColor
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.667 14V12.667C10.667 11.959 10.386 11.281 9.886 10.781C9.386 10.281 8.708 10 8.001 10H4.001C3.293 10 2.615 10.281 2.115 10.781C1.615 11.281 1.334 11.959 1.334 12.667V14" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M10.667 2.085C11.239 2.234 11.745 2.568 12.107 3.035C12.468 3.502 12.664 4.076 12.664 4.667C12.664 5.257 12.468 5.831 12.107 6.299C11.745 6.766 11.239 7.1 10.667 7.248" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M14.667 14V12.667C14.667 12.076 14.47 11.502 14.108 11.035C13.746 10.568 13.239 10.234 12.667 10.087" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6.001 7.333C7.473 7.333 8.667 6.139 8.667 4.667C8.667 3.194 7.473 2 6.001 2C4.528 2 3.334 3.194 3.334 4.667C3.334 6.139 4.528 7.333 6.001 7.333Z" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Usuários
            </button>

            <button
              style={{
                flex: 1,
                height: '40px',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 16px',
                gap: '8px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '24px',
                color: primaryColor
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.375 8.232C1.319 8.082 1.319 7.918 1.375 7.768C1.916 6.456 2.834 5.334 4.014 4.545C5.193 3.755 6.581 3.334 8 3.334C9.419 3.334 10.807 3.755 11.986 4.545C13.166 5.334 14.084 6.456 14.625 7.768C14.681 7.918 14.681 8.082 14.625 8.232C14.084 9.544 13.166 10.666 11.986 11.455C10.807 12.245 9.419 12.666 8 12.666C6.581 12.666 5.193 12.245 4.014 11.455C2.834 10.666 1.916 9.544 1.375 8.232Z" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M8 10C9.105 10 10 9.105 10 8C10 6.895 9.105 6 8 6C6.895 6 6 6.895 6 8C6 9.105 6.895 10 8 10Z" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Editar
            </button>
          </div>

          {/* Botões Modelos e Arquivar */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <button
              style={{
                flex: 1,
                height: '40px',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 16px',
                gap: '8px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '24px',
                color: primaryColor
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M10.5 1H4.5C4.147 1 3.808 1.141 3.558 1.391C3.308 1.641 3.167 1.98 3.167 2.333V13.667C3.167 14.02 3.308 14.359 3.558 14.609C3.808 14.859 4.147 15 4.5 15H12.5C12.853 15 13.192 14.859 13.442 14.609C13.692 14.359 13.833 14.02 13.833 13.667V4.667L10.5 1Z" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M9.833 1V4C9.833 4.354 9.974 4.693 10.224 4.943C10.474 5.193 10.813 5.333 11.167 5.333H13.833" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.167 6H5.833" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.167 8.667H5.833" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M11.167 11.333H5.833" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Modelos
            </button>

            <button
              style={{
                flex: 1,
                height: '40px',
                background: 'transparent',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '8px 16px',
                gap: '8px',
                cursor: 'pointer',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 600,
                fontSize: '14px',
                lineHeight: '24px',
                color: primaryColor
              }}
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M15 2H1C0.632 2 0.333 2.298 0.333 2.667V4.667C0.333 5.035 0.632 5.333 1 5.333H15C15.368 5.333 15.667 5.035 15.667 4.667V2.667C15.667 2.298 15.368 2 15 2Z" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M1.667 5.333V12.667C1.667 13.02 1.807 13.359 2.057 13.609C2.307 13.86 2.646 14 3 14H13C13.353 14 13.693 13.86 13.943 13.609C14.193 13.359 14.333 13.02 14.333 12.667V5.333" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M7.667 8H10.333" stroke={primaryColor} strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Arquivar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
