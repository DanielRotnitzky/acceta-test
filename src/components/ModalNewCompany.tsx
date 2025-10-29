import React, { useState } from 'react';

type Props = { onClose: ()=>void; onSave: (data:any)=>Promise<void> };

export default function ModalNewCompany({ onClose, onSave }: Props) {
  const [razaoSocial, setRazao] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [enableProjectLimit, setEnableProjectLimit] = useState(false);
  const [projectLimit, setProjectLimit] = useState('');
  const [tipoEmpresa, setTipoEmpresa] = useState('');

  const formatCNPJ = (value: string) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 14) {
      return numbers
        .replace(/(\d{2})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1.$2')
        .replace(/(\d{3})(\d)/, '$1/$2')
        .replace(/(\d{4})(\d)/, '$1-$2');
    }
    return cnpj;
  };

  const validateCNPJ = (cnpj: string) => {
    const numbers = cnpj.replace(/\D/g, '');
    if (numbers.length !== 14) return false;
    
    // Rejeita CNPJs com todos os dígitos iguais
    if (/^(\d)\1+$/.test(numbers)) return false;

    // Validação dos dígitos verificadores
    let length = numbers.length - 2;
    let nums = numbers.substring(0, length);
    const digits = numbers.substring(length);
    let sum = 0;
    let pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += parseInt(nums.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    let result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    if (result !== parseInt(digits.charAt(0))) return false;

    length = length + 1;
    nums = numbers.substring(0, length);
    sum = 0;
    pos = length - 7;

    for (let i = length; i >= 1; i--) {
      sum += parseInt(nums.charAt(length - i)) * pos--;
      if (pos < 2) pos = 9;
    }

    result = sum % 11 < 2 ? 0 : 11 - (sum % 11);
    return result === parseInt(digits.charAt(1));
  };

  const handleCNPJChange = (value: string) => {
    const formatted = formatCNPJ(value);
    setCnpj(formatted);
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateCNPJ(cnpj)) {
      alert('CNPJ inválido. Por favor, verifique o número digitado.');
      return;
    }

    await onSave({
      companyName: razaoSocial,
      taxId: cnpj,
      enableProjectLimit,
      projectLimit: enableProjectLimit ? parseInt(projectLimit) || 0 : 0,
      companyType: tipoEmpresa,
      projectCount: 0,
      status: 'active',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <style>{`
        input::placeholder {
          width: 440px;
          height: 24px;
          opacity: 1;
          font-family: Inter, sans-serif;
          font-weight: 400;
          font-style: normal;
          font-size: 14px;
          line-height: 24px;
          letter-spacing: 0%;
          color: #A3A4B9;
        }
        select option[value=""] {
          width: 424px;
          height: 16px;
          opacity: 1;
          font-family: Inter, sans-serif;
          font-weight: 500;
          font-style: normal;
          font-size: 14px;
          line-height: 16px;
          letter-spacing: 0%;
          color: #A3A4B9;
        }
      `}</style>
      <form 
        onSubmit={submit}
        style={{
          width: '512px',
          height: '544px',
          gap: '24px',
          opacity: 1,
          padding: '24px',
          borderRadius: '16px',
          background: '#FFFFFF',
          border: '1px solid #D1D2DC',
          boxShadow: '1px 1px 8px 0px #00000029',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <div style={{
          width: '464px',
          height: '32px',
          gap: '8px',
          opacity: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          <h2 className="text-lg font-bold">Cadastrar Empresa</h2>
          <button 
            type="button" 
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              background: 'transparent',
              border: 'none',
              cursor: 'pointer',
              padding: 0
            }}
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M4 4L12 12M12 4L4 12" stroke="#000000" strokeWidth="0.8" strokeLinecap="round"/>
            </svg>
          </button>
        </div>
        
        {/* Frame - Conteúdo */}
        <div style={{
          width: '464px',
          height: '376px',
          gap: '20px',
          opacity: 1,
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Razão Social */}
          <div>
            <label style={{
              width: '86px',
              height: '16px',
              opacity: 1,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '16px',
              letterSpacing: '0%',
              color: '#181C4F',
              display: 'block',
              marginBottom: '4px'
            }}>
              Razão Social
            </label>
            <input 
              type="text"
              placeholder="Informe a Razão Social" 
              value={razaoSocial} 
              onChange={e=>setRazao(e.target.value)} 
              required
              style={{
                width: '464px',
                height: '40px',
                gap: '8px',
                opacity: 1,
                paddingTop: '8px',
                paddingRight: '12px',
                paddingBottom: '8px',
                paddingLeft: '12px',
                borderRadius: '6px',
                background: '#F8F8FA',
                border: '1px solid #D1D2DC',
                outline: 'none'
              }}
            />
          </div>

          {/* CNPJ */}
          <div>
            <label style={{
              width: '86px',
              height: '16px',
              opacity: 1,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '16px',
              letterSpacing: '0%',
              color: '#181C4F',
              display: 'block',
              marginBottom: '4px'
            }}>
              CNPJ
            </label>
            <input 
              type="text"
              placeholder="Digite o CNPJ da Empresa" 
              value={cnpj} 
              onChange={e=>handleCNPJChange(e.target.value)} 
              required
              maxLength={18}
              style={{
                width: '464px',
                height: '40px',
                gap: '8px',
                opacity: 1,
                paddingTop: '8px',
                paddingRight: '12px',
                paddingBottom: '8px',
                paddingLeft: '12px',
                borderRadius: '6px',
                background: '#F8F8FA',
                border: '1px solid #D1D2DC',
                outline: 'none'
              }}
            />
          </div>

          {/* Toggle controle de acesso */}
          <div>
            <label className="flex items-center gap-2 cursor-pointer">
              <div className="relative">
                <input
                  type="checkbox"
                  checked={enableProjectLimit}
                  onChange={(e) => setEnableProjectLimit(e.target.checked)}
                  className="sr-only"
                />
                <div 
                  className="w-11 h-6 rounded-full transition-colors"
                  style={{
                    backgroundColor: enableProjectLimit ? '#181C4F' : '#E8E8ED'
                  }}
                >
                  <div 
                    style={{
                      width: '20px',
                      height: '20px',
                      top: '2px',
                      left: enableProjectLimit ? '22px' : '2px',
                      opacity: 1,
                      background: '#F8F8FA',
                      borderRadius: '50%',
                      position: 'absolute',
                      transition: 'left 0.2s ease-in-out'
                    }}
                  />
                </div>
              </div>
              <span className="text-sm font-medium">Habilitar controle de acesso por limite de projetos</span>
            </label>
          </div>

          {/* Limite de projetos */}
          {enableProjectLimit && (
            <div>
              <label style={{
                width: '121px',
                height: '16px',
                opacity: 1,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '16px',
                letterSpacing: '0%',
                color: '#181C4F',
                display: 'block',
                marginBottom: '4px'
              }}>
                Limite de projetos
              </label>
              <input 
                type="number"
                placeholder="Digite apenas números" 
                value={projectLimit} 
                onChange={e=>setProjectLimit(e.target.value)} 
                required={enableProjectLimit}
                min="0"
                step="1"
                onKeyPress={(e) => {
                  if (!/[0-9]/.test(e.key)) {
                    e.preventDefault();
                  }
                }}
                style={{
                  width: '464px',
                  height: '40px',
                  gap: '8px',
                  opacity: 1,
                  paddingTop: '8px',
                  paddingRight: '12px',
                  paddingBottom: '8px',
                  paddingLeft: '12px',
                  borderRadius: '6px',
                  background: '#F8F8FA',
                  border: '1px solid #D1D2DC',
                  outline: 'none'
                }}
              />
            </div>
          )}

          {/* Tipo empresa */}
          <div style={{ position: 'relative' }}>
            <label style={{
              width: '113px',
              height: '16px',
              opacity: 1,
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '16px',
              letterSpacing: '0%',
              color: '#181C4F',
              display: 'block',
              marginBottom: '4px'
            }}>
              Tipo da Empresa
            </label>
            <select 
              value={tipoEmpresa} 
              onChange={e=>setTipoEmpresa(e.target.value)}
              required
              style={{
                width: '464px',
                height: '40px',
                gap: '8px',
                opacity: 1,
                paddingTop: '10px',
                paddingRight: '32px',
                paddingBottom: '10px',
                paddingLeft: '8px',
                borderRadius: '8px',
                background: '#F8F8FA',
                border: '1px solid #E8E8ED',
                outline: 'none',
                appearance: 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '20px',
                letterSpacing: '0%',
                color: '#A3A4B9'
              }}
            >
              <option value="" style={{
                width: '424px',
                height: '16px',
                opacity: 1,
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '16px',
                letterSpacing: '0%',
                color: '#A3A4B9'
              }}>Selecione</option>
              <option value="matriz" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '16px',
                letterSpacing: '0%',
                color: '#A3A4B9'
              }}>Matriz</option>
              <option value="filial" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '16px',
                letterSpacing: '0%',
                color: '#A3A4B9'
              }}>Filial</option>
              <option value="holding" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '16px',
                letterSpacing: '0%',
                color: '#A3A4B9'
              }}>Holding</option>
              <option value="mei" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '16px',
                letterSpacing: '0%',
                color: '#A3A4B9'
              }}>MEI</option>
              <option value="startup" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontStyle: 'normal',
                fontSize: '14px',
                lineHeight: '16px',
                letterSpacing: '0%',
                color: '#A3A4B9'
              }}>Startup</option>
            </select>
            {/* Chevron down icon */}
            <svg 
              style={{
                position: 'absolute',
                right: '12px',
                top: '50%',
                transform: 'translateY(-50%)',
                marginTop: '10px',
                pointerEvents: 'none',
                width: '16px',
                height: '16px',
                opacity: 1
              }}
              viewBox="0 0 16 16" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M4 6L8 10L12 6" 
                stroke="#A3A4B9" 
                strokeWidth="1.2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
          </div>
        </div>

        {/* Buttons */}
        <div style={{
          width: '464px',
          height: '40px',
          gap: '16px',
          opacity: 1,
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'flex-end',
          alignItems: 'center'
        }}>
          <button 
            type="button" 
            onClick={onClose}
            style={{
              width: '93px',
              height: '40px',
              gap: '8px',
              opacity: 1,
              paddingTop: '8px',
              paddingRight: '16px',
              paddingBottom: '8px',
              paddingLeft: '16px',
              borderRadius: '6px',
              background: '#F8F8FA',
              border: '1px solid #E8E8ED',
              cursor: 'pointer',
              color: '#181C4F',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '24px',
              letterSpacing: '0%'
            }}
          >
            Cancelar
          </button>
          <button 
            type="submit"
            style={{
              width: '100px',
              height: '40px',
              gap: '8px',
              opacity: 1,
              paddingTop: '8px',
              paddingRight: '16px',
              paddingBottom: '8px',
              paddingLeft: '16px',
              borderRadius: '6px',
              background: '#181C4F',
              border: 'none',
              cursor: 'pointer',
              color: '#FFFFFF',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '24px',
              letterSpacing: '0%'
            }}
          >
            Cadastrar
          </button>
        </div>
      </form>
    </div>
  );
}
