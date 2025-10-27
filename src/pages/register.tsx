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
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={submit} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Cadastrar</h2>
        {error && <div className="bg-red-100 text-red-700 p-2 mb-2 rounded">{error}</div>}
        <input 
          className="w-full p-2 border mb-2" 
          placeholder="Nome" 
          value={nome} 
          onChange={e=>setNome(e.target.value)} 
          required 
          minLength={3}
          autoComplete="name"
        />
        <input 
          className="w-full p-2 border mb-2" 
          type="email"
          placeholder="Email" 
          value={email} 
          onChange={e=>setEmail(e.target.value)} 
          required 
          autoComplete="username"
        />
        <input 
          className="w-full p-2 border mb-2" 
          placeholder="CNPJ" 
          value={cnpj} 
          onChange={e=>setCnpj(e.target.value)} 
          required 
          autoComplete="off"
          pattern="\d{14}"
          maxLength={14}
        />
        <select 
          className="w-full p-2 border mb-2" 
          value={perfil} 
          onChange={e=>setPerfil(e.target.value as any)}
        >
          <option>Cliente</option>
          <option>Admin</option>
        </select>
        <input 
          type="password" 
          className="w-full p-2 border mb-2" 
          placeholder="Senha" 
          value={senha} 
          onChange={e=>setSenha(e.target.value)} 
          required 
          autoComplete="new-password"
          minLength={6}
        />
        <input 
          type="password" 
          className="w-full p-2 border mb-4" 
          placeholder="Confirmar Senha" 
          value={senha2} 
          onChange={e=>setSenha2(e.target.value)} 
          required 
          autoComplete="new-password"
          minLength={6}
        />
        <button className="w-full py-2 bg-blue-600 text-white rounded">Criar conta</button>
      </form>
    </div>
  );
}
