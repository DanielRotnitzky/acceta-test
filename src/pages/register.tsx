import { useState } from 'react';
import { useRouter } from 'next/router';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { isValidCNPJ, onlyDigits } from '@/lib/utils';

export default function Register() {
  const [nome,setNome]=useState('');
  const [email,setEmail]=useState('');
  const [cnpj,setCnpj]=useState('');
  const [perfil,setPerfil]=useState<'Cliente'|'Admin'>('Cliente');
  const [senha,setSenha]=useState(''); 
  const [senha2,setSenha2]=useState('');
  const [error,setError]=useState('');
  const router = useRouter();

  const submit = async (e:any) => {
    e.preventDefault();
    setError('');
    if (!nome.trim()) { setError('Informe o nome'); return; }
    if (senha !== senha2) { setError('Senhas não conferem'); return; }
    if (senha.length < 6) { setError('A senha deve ter no mínimo 6 caracteres'); return; }
    if (!email.includes('@')) { setError('Email inválido'); return; }
    if (!isValidCNPJ(cnpj)) { setError('CNPJ inválido'); return; }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, senha);
      const uid = res.user.uid;
      await setDoc(doc(db, 'users', uid), {
        nome: nome.trim(),
        email,
        cnpj: onlyDigits(cnpj),
        perfil,
        createdAt: new Date().toISOString()
      });
      try {
        (auth as any).languageCode = 'pt';
        await sendEmailVerification(res.user);
      } catch (err) {
        console.warn('Não foi possível enviar email de verificação:', err);
      }
      alert('Conta criada com sucesso!');
      router.push('/');
    } catch (err:any) {
      const errorCode = err?.code;
      switch (errorCode) {
        case 'auth/email-already-in-use':
          setError('Este email já está sendo usado');
          break;
        case 'auth/invalid-email':
          setError('Email inválido');
          break;
        case 'auth/operation-not-allowed':
          setError('O cadastro com email/senha não está habilitado');
          break;
        case 'auth/weak-password':
          setError('A senha é muito fraca. Use pelo menos 6 caracteres');
          break;
        default:
          console.error('Erro de autenticação:', err);
          setError('Erro ao criar conta. Tente novamente.');
      }
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-left flex items-center justify-center">
        <img src="/images/Esquerda.svg" alt="Ilustração esquerda" className="max-w-full h-auto" />
      </div>

      <div className="auth-right flex items-center justify-center">
        <div className="auth-card max-w-lg w-full p-8">
          <div className="mb-6">
            <button 
              type="button"
              onClick={() => router.push('/')}
              className="text-[#181C4F] font-semibold text-[14px] leading-[24px] flex items-center gap-2 hover:opacity-80"
            >
              <img src="/images/Icon.svg" alt="Voltar" className="w-4 h-4" />
              Voltar
            </button>
            <h2 className="text-[24px] font-semibold leading-[132%] text-[#0E112F] w-[400px] mt-4">Criar conta</h2>
            <p className="text-[#464972] font-medium text-[14px] leading-[140%] w-[400px]">Preencha os dados abaixo para criar sua conta.</p>
          </div>

              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={submit} className="space-y-[24px]">
                <div className="form-group">
                  <label className="font-bold text-[14px] leading-[16px] text-[#181C4F]">Nome</label>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="Seu nome completo"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="form-group">
                  <label className="font-bold text-[14px] leading-[16px] text-[#181C4F]">E-mail</label>
                  <input
                    className="input-field"
                    type="email"
                    placeholder="exemplo@email.com"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>

                <div className="form-group">
                  <label className="font-bold text-[14px] leading-[16px] text-[#181C4F]">CNPJ</label>
                  <input
                    className="input-field"
                    type="text"
                    placeholder="00.000.000/0000-00"
                    value={cnpj}
                    onChange={e => setCnpj(e.target.value)}
                    required
                    inputMode="numeric"
                  />
                </div>

                <div className="form-group">
                  <label className="font-bold text-[14px] leading-[16px] text-[#181C4F]">Tipo de perfil</label>
                  <select
                    className="input-field"
                    value={perfil}
                    onChange={e => setPerfil(e.target.value as 'Cliente'|'Admin')}
                  >
                    <option value="Cliente">Cliente</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="font-bold text-[14px] leading-[16px] text-[#181C4F]">Senha</label>
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Digite a senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    required
                    autoComplete="new-password"
                    minLength={6}
                  />
                </div>

                <div className="form-group">
                  <label className="font-bold text-[14px] leading-[16px] text-[#181C4F]">Confirmar Senha</label>
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Digite a senha novamente"
                    value={senha2}
                    onChange={e => setSenha2(e.target.value)}
                    required
                    autoComplete="new-password"
                    minLength={6}
                  />
                </div>

                <button type="submit" className="btn-primary w-full mt-2 text-[#E8E8ED] text-[14px] font-semibold leading-[24px]">
                  Criar conta
                </button>

                <div className="flex justify-center items-center gap-2 mt-4">
                  <span className="text-[#747795] text-[14px] leading-[150%] font-normal">Já tem uma conta?</span>
                  <a href="/" className="text-[#181C4F] font-semibold text-[14px] leading-[24px] hover:opacity-80">
                    Voltar ao login
                  </a>
                </div>
              </form>
        </div>
      </div>
    </div>
  );
}
