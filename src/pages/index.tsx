import { useState, FormEvent } from 'react';
import { loginWithEmail, sendReset } from '@/lib/auth';
import { useRouter } from 'next/router';
// Left-side will show only the uploaded SVG (public/images/Esquerda.svg)

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
    <div className="auth-layout">
      <div className="auth-left flex items-center justify-center">
        <img src="/images/Esquerda.svg" alt="Ilustração esquerda" className="max-w-full h-auto" />
      </div>

      <div className="auth-right flex items-center justify-center">
        <div className="relative max-w-md w-full">
          {/* Card background SVG placed from public/images/CardLogin.svg */}
          <img src="/images/CardLogin.svg" alt="Card Login" className="w-full h-auto block" />

          {/* Overlay form centered on top of the SVG card */}
          <div className="absolute inset-0 flex items-center justify-center p-6">
            <div className="w-full max-w-sm">
              <div className="mb-4">
                <h2 className="auth-title">Login</h2>
                <p className="auth-subtitle">Digite suas credenciais para acessar a plataforma.</p>
              </div>

              {error && (
                <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
                  {error}
                </div>
              )}

              <form onSubmit={onSubmit} className="space-y-4">
                <div className="form-group">
                  <label className="input-label">E-mail</label>
                  <input
                    type="email"
                    className="input-field"
                    placeholder="Digite seu e-mail"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    required
                    autoComplete="username"
                  />
                </div>

                <div className="form-group">
                  <label className="input-label">Senha</label>
                  <input
                    type="password"
                    className="input-field"
                    placeholder="Digite sua senha"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                    minLength={6}
                  />
                </div>

                <button
                  type="submit"
                  className="btn-primary w-full mt-2 disabled:opacity-50"
                  disabled={loading}
                >
                  {loading ? 'Entrando...' : 'Entrar'}
                </button>

                <div className="flex justify-between items-center mt-4">
                  <a href="/register" className="text-primary font-semibold hover:opacity-80">
                    Criar conta
                  </a>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-text-secondary hover:text-primary transition-colors"
                  >
                    Esqueci minha senha
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
