import React, { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { sendPasswordResetEmail } from 'firebase/auth';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

type Props = { 
  onClose: () => void;
};

export default function ModalEditProfile({ onClose }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [perfil, setPerfil] = useState('Cliente');
  const [loading, setLoading] = useState(true);
  const [sendingReset, setSendingReset] = useState(false);

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      if (!auth.currentUser) return;
      
      setEmail(auth.currentUser.email || '');
      
      const userDoc = await getDoc(doc(db, 'users', auth.currentUser.uid));
      if (userDoc.exists()) {
        const data = userDoc.data();
        setNome(data.nome || '');
        setCnpj(data.cnpj || '');
        setPerfil(data.perfil || 'Cliente');
      }
    } catch (error) {
      console.error('Erro ao carregar perfil:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      if (!auth.currentUser) return;
      
      await updateDoc(doc(db, 'users', auth.currentUser.uid), {
        nome,
        perfil,
        updatedAt: new Date().toISOString()
      });
      
      onClose();
      window.location.reload(); // Recarrega para atualizar o título
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil. Tente novamente.');
    }
  };

  const handlePasswordReset = async () => {
    if (!email) {
      alert('E-mail não encontrado para este usuário.');
      return;
    }
    try {
      setSendingReset(true);
      // Define idioma PT para o e-mail do Firebase
      try { (auth as any).languageCode = 'pt'; } catch (_) {}
      await sendPasswordResetEmail(auth, email);
    } catch (error: any) {
      console.error('Erro ao enviar e-mail de redefinição:', error);
      let message = 'Erro ao enviar e-mail de redefinição. Tente novamente.';
      if (error?.code === 'auth/invalid-email') message = 'E-mail inválido.';
      else if (error?.code === 'auth/user-not-found') message = 'Usuário não encontrado para este e-mail.';
      else if (error?.code === 'auth/too-many-requests') message = 'Muitas tentativas. Tente novamente mais tarde.';
      alert(message);
    } finally {
      setSendingReset(false);
    }
  };

  if (loading) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
        <div className="bg-white p-6 rounded-lg">
          <p>Carregando...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <style>
        {`
          .modal-edit-profile input::placeholder {
            width: 440px;
            height: 24px;
            font-family: Inter, sans-serif;
            font-weight: 400;
            font-size: 14px;
            line-height: 24px;
            color: #A3A4B9;
          }
          .modal-edit-profile select option[value=""] {
            width: 424px;
            height: 16px;
            font-family: Inter, sans-serif;
            font-weight: 500;
            font-size: 14px;
            line-height: 16px;
            color: #A3A4B9;
          }
        `}
      </style>
      <form 
        onSubmit={handleSubmit}
        className="modal-edit-profile"
        style={{
          width: '100%',
          maxWidth: '590px',
          height: 'auto',
          background: '#FFFFFF',
          borderRadius: '8px',
          border: '1px solid #D1D2DC',
          display: 'flex',
          flexDirection: 'column',
          gap: '32px',
          padding: '32px',
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)',
          maxHeight: '90vh',
          overflowY: 'auto'
        }}
      >
        {/* Top Section */}
        <div style={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <h2 style={{
            width: '515px',
            height: '32px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '24px',
            lineHeight: '132%',
            letterSpacing: '0%',
            color: '#181C4F',
            margin: 0,
            display: 'flex',
            alignItems: 'center'
          }}>
            Informações do Perfil
          </h2>
          <p style={{
            width: '515px',
            height: '27px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 400,
            fontSize: '18px',
            lineHeight: '150%',
            letterSpacing: '0%',
            color: '#747795',
            margin: 0,
            display: 'flex',
            alignItems: 'center'
          }}>
            Gerencie suas informações pessoais e configurações de conta.
          </p>
        </div>

        {/* Frame - Form Fields */}
        <div style={{
          width: '100%',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          gap: '22.4px'
        }}>
          {/* Nome */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px'
          }}>
            <label style={{
              width: '43px',
              height: '16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '16px',
              letterSpacing: '0%',
            }}>
              Nome
            </label>
            <input 
              type="text"
              placeholder="Digite seu nome"
              value={nome} 
              onChange={e => setNome(e.target.value)} 
              required
              style={{
                width: '100%',
                height: '40px',
                padding: '8px 12px',
                borderRadius: '6px',
                background: '#F8F8FA',
                border: '1px solid #D1D2DC',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '24px',
                color: '#181C4F',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Email (readonly) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <label style={{
              width: '43px',
              height: '16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '16px',
              letterSpacing: '0%',
              color: 'var(--Input-Disabled-Label, #7C7F78)'
            }}>
              E-mail
            </label>
            <input 
              type="email"
              value={email}
              readOnly
              style={{
                width: '100%',
                height: '40px',
                padding: '8px 12px',
                borderRadius: '6px',
                background: '#F8F8FA',
                border: '1px solid #D1D2DC',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '24px',
                color: '#A3A4B9',
                cursor: 'not-allowed',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* CNPJ (readonly) */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '4px'
          }}>
            <label style={{
              width: '43px',
              height: '16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '16px',
              letterSpacing: '0%',
              color: 'var(--Input-Disabled-Label, #7C7F78)'
            }}>
              CNPJ
            </label>
            <input
              type="text"
              value={cnpj}
              readOnly
              style={{
                width: '100%',
                height: '40px',
                padding: '8px 12px',
                borderRadius: '6px',
                background: '#F8F8FA',
                border: '1px solid #D1D2DC',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '24px',
                color: '#A3A4B9',
                cursor: 'not-allowed',
                boxSizing: 'border-box'
              }}
            />
          </div>

          {/* Perfil */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            position: 'relative'
          }}>
            <label style={{
              width: '100%',
              height: '16px',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 500,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '16px',
              letterSpacing: '0%',
              color: 'var(--Input-Disabled-Label, #7C7F78)'
            }}>
              Tipo de perfil
            </label>
            <select 
              value={perfil} 
              onChange={e => setPerfil(e.target.value)}
              disabled
              style={{
                 width: '100%',
                height: '40px',
                padding: '8px 12px',
                borderRadius: '6px',
                background: '#F8F8FA',
                border: '1px solid #D1D2DC',
                outline: 'none',
                fontFamily: 'Inter, sans-serif',
                fontWeight: 400,
                fontSize: '14px',
                lineHeight: '24px',
                color: '#181C4F',
                cursor: 'not-allowed',
                boxSizing: 'border-box'
              }}
            >
              <option value="Cliente" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '16px',
                color: '#181C4F'
              }}>Cliente</option>
              <option value="Admin" style={{
                fontFamily: 'Inter, sans-serif',
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '16px',
                color: '#181C4F'
              }}>Admin</option>
            </select>
            <svg 
              style={{
                position: 'absolute',
                right: '12px',
                bottom: '12px',
                pointerEvents: 'none',
                width: '16px',
                height: '16px'
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

        {/* Divisor */}
        <div style={{
          width: '100%',
          height: '1px',
          background: '#E8E8ED',
          flexShrink: 0
        }}></div>

        {/* Segurança Label */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '8px'
        }}>
          <div style={{
            width: '100%',
            height: '21px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 600,
            fontSize: '14px',
            lineHeight: '150%',
            letterSpacing: '0%',
            color: '#0E112F',
            display: 'flex',
            alignItems: 'center'
          }}>
            Segurança
          </div>
          <div style={{
            width: '100%',
            height: '17px',
            fontFamily: 'Inter, sans-serif',
            fontWeight: 500,
            fontSize: '12px',
            lineHeight: '140%',
            letterSpacing: '0%',
            color: '#747795',
            display: 'flex',
            alignItems: 'center'
          }}>
            Um e-mail com instruções será enviado para seu endereço cadastrado.
          </div>
        </div>

        {/* Botão Redefinir senha */}
        <div style={{
          width: '100%',
          display: 'flex',
          alignItems: 'center',
          marginTop: '-16px'
        }}>
          <button
            type="button"
            onClick={handlePasswordReset}
            style={{
              width: '162px',
              height: '40px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
              paddingTop: '8px',
              paddingRight: '16px',
              paddingBottom: '8px',
              paddingLeft: '16px',
              borderRadius: '6px',
              background: '#F8F8FA',
              border: '1px solid #E8E8ED',
              cursor: sendingReset || !email ? 'not-allowed' : 'pointer',
              opacity: sendingReset || !email ? 0.6 : 1
            }}
            disabled={sendingReset || !email}
          >
            <img src="/images/Icon.svg" alt="" width={16} height={16} />
            <span style={{
              width: '106px',
              height: '24px',
              fontFamily: 'Inter, sans-serif',
              fontStyle: 'normal',
              fontWeight: 600,
              fontSize: '12px',
              lineHeight: '24px',
              letterSpacing: '0px',
              color: '#181C4F'
            }}>
              Redefinir senha
            </span>
          </button>
        </div>

        {/* Divisor */}
        <div style={{
          width: '100%',
          height: '1px',
          background: '#E8E8ED',
          flexShrink: 0
        }}></div>

        {/* Primary Save button – full width */}
        <div style={{
          width: '100%',
          height: '40px',
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <button
            type="submit"
            style={{
              width: '100%',
              height: '40px',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              paddingTop: '8px',
              paddingRight: '16px',
              paddingBottom: '8px',
              paddingLeft: '16px',
              borderRadius: '6px',
              background: 'var(--Button-Primary-Default-Background, #181C4F)',
              border: 'none',
              cursor: 'pointer'
            }}
          >
            <img
              src="/images/Icon.svg"
              alt=""
              width={16}
              height={16}
              style={{ filter: 'invert(1) brightness(2)' }}
            />
            <span style={{
              fontFamily: 'Inter, sans-serif',
              fontWeight: 600,
              fontStyle: 'normal',
              fontSize: '14px',
              lineHeight: '24px',
              letterSpacing: '0px',
              color: '#FFFFFF'
            }}>
              Salvar e voltar
            </span>
          </button>
        </div>
      </form>
    </div>
  );
}
