import { useState } from 'react';
import { isValidCNPJ } from '@/lib/utils';
import { useRouter } from 'next/router';
import { auth, db } from '@/lib/firebase';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

export default function Register() {
  const [nome,setNome]=useState(''); const [email,setEmail]=useState(''); const [cnpj,setCnpj]=useState('');
  const [perfil,setPerfil]=useState<'Cliente'|'Admin'>('Cliente');
  const [senha,setSenha]=useState(''); const [senha2,setSenha2]=useState('');
  const [error,setError]=useState('');
  const router = useRouter();

  const submit = async (e:any) => {
    e.preventDefault();
    setError('');
    if (!isValidCNPJ(cnpj)) { setError('CNPJ inválido'); return; }
    if (senha !== senha2) { setError('Senhas não conferem'); return; }
    if (senha.length < 6) { setError('A senha deve ter no mínimo 6 caracteres'); return; }
    if (!email.includes('@')) { setError('Email inválido'); return; }
    try {
      const res = await createUserWithEmailAndPassword(auth, email, senha);
      const uid = res.user.uid;
      await setDoc(doc(db, 'users', uid), {
        nome,
        email,
        cnpj,
        perfil,
        createdAt: new Date().toISOString()
      });
      try {
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
        <div className="relative max-w-lg w-full">
          <img src="/images/CardLogin.svg" alt="Card" className="w-full h-auto block" />

          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="w-full max-w-md">
              <div className="mb-4">
                <button className="text-primary font-semibold flex items-center gap-2">
                  <span className="inline-block w-4 h-4">←</span>
                  Voltar
                </button>
                <h2 className="auth-title mt-4">Criar conta</h2>
                <p className="auth-subtitle">Preencha os dados abaixo para criar sua conta.</p>
              </div>

              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={submit} className="space-y-4">
                <div className="form-group">
                  <label className="input-label">Nome</label>
                  <input
                    className="input-field"
                    placeholder="Digite seu nome completo"
                    value={nome}
                    onChange={e => setNome(e.target.value)}
                    required
                    minLength={3}
                    autoComplete="name"
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">E-mail</label>
                  <input
                    className="input-field"
                    type="email"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">CNPJ</label>
                  <input
                    className="input-field"
                    placeholder="Digite o CNPJ"
                    value={cnpj}
                    onChange={e => setCnpj(e.target.value)}
                    required
                    autoComplete="off"
                    pattern="\d{14}"
                    maxLength={14}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Perfil</label>
                  <select
                    className="input-field"
                    value={perfil}
                    onChange={e => setPerfil(e.target.value as any)}
                  >
                    <option>Cliente</option>
                    <option>Admin</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="input-label">Senha</label>
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Digite sua senha"
                    value={senha}
                    onChange={e => setSenha(e.target.value)}
                    required
                    autoComplete="new-password"
                    minLength={6}
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Confirmar Senha</label>
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Digite sua senha novamente"
                    value={senha2}
                    onChange={e => setSenha2(e.target.value)}
                    required
                    autoComplete="new-password"
                    minLength={6}
                  />
                </div>

                <button type="submit" className="btn-primary w-full">
                  Criar conta
                </button>

                <div className="flex justify-center items-center gap-2 mt-4">
                  <span className="text-text-muted">Já tem uma conta?</span>
                  <a href="/" className="text-primary font-semibold hover:opacity-80">
                    Fazer login
                  </a>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
