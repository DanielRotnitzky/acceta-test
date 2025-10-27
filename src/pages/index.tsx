import { useState, FormEvent } from 'react';
import { loginWithEmail, sendReset } from '@/lib/auth';
import { useRouter } from 'next/router';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

    const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (!email || !password) {
        setError('Por favor, preencha todos os campos')
        return
      }

      setError('')
      setLoading(true)
      await loginWithEmail(email, password)
      router.push('/empresas')
    } catch (error: any) {
      let message = 'Erro ao fazer login'
      
      if (error.code === 'auth/invalid-email') {
        message = 'Email inválido'
      } else if (error.code === 'auth/user-not-found') {
        message = 'Usuário não encontrado'
      } else if (error.code === 'auth/wrong-password') {
        message = 'Senha incorreta'
      } else if (error.code === 'auth/too-many-requests') {
        message = 'Muitas tentativas de login. Tente novamente mais tarde.'
      }
      
      setError(message)
    } finally {
      setLoading(false)
    }
  }

  const handleReset = async () => {
    if (!email) return alert('Informe o e-mail para enviar redefinição');
    try {
      await sendReset(email);
      alert('E-mail de redefinição enviado');
    } catch (err:any) {
      alert(err.message || 'Erro');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <form onSubmit={onSubmit} className="bg-white p-8 rounded shadow w-full max-w-md">
        <h2 className="text-2xl font-bold mb-4">Login</h2>
        {error && <div className="bg-red-100 text-red-700 p-2 mb-2 rounded">{error}</div>}
        <input 
          type="email"
          className="w-full p-2 border mb-2" 
          placeholder="Email" 
          value={email} 
          onChange={e=>setEmail(e.target.value)}
          required
          autoComplete="username"
        />
        <input 
          type="password" 
          className="w-full p-2 border mb-2" 
          placeholder="Senha" 
          value={password} 
          onChange={e=>setPassword(e.target.value)}
          required
          autoComplete="current-password"
          minLength={6}
        />
        <button 
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded mb-2 disabled:opacity-50" 
          disabled={loading}
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        <div className="flex justify-between items-center">
          <a className="text-sm text-blue-600" href="/register">Cadastrar-se</a>
          <button type="button" className="text-sm text-gray-600" onClick={handleReset}>Redefinir senha</button>
        </div>
      </form>
    </div>
  );
}
