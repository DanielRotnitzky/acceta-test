import { useState, FormEvent } from 'react';
import { loginWithEmail, sendReset, logout } from '@/lib/auth';
import { sendEmailVerification } from 'firebase/auth';
import { useRouter } from 'next/router';
// Left-side will show only the uploaded SVG (public/images/Esquerda.svg)

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

    const onSubmit = async (e: FormEvent) => {
    e.preventDefault()
    try {
      if (!email || !password) {
        setError('Por favor, preencha todos os campos')
        return
      }

      // Validação básica de e-mail
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
      if (!emailRegex.test(email)) {
        setError('Email inválido')
        return
      }

      setError('')
      setLoading(true)
      const cred = await loginWithEmail(email, password)
      
      // Exigir e-mail verificado antes de continuar
      if (!cred.user.emailVerified) {
        try {
          await sendEmailVerification(cred.user)
        } catch (err) {
          console.warn('Falha ao reenviar verificação:', err)
        }
        await logout()
        setError('Seu e-mail ainda não foi verificado. Reenviamos a verificação. Confira sua caixa de entrada e a pasta de spam.')
        return
      }
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
      } else if (typeof error?.message === 'string' && error.message) {
        message = error.message
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

      <div className="auth-right">
        <div className="auth-card">
          <div className="mb-6">
            <h2 className="text-[24px] font-semibold leading-[132%] text-[#0E112F] w-[400px]">Acesse sua conta</h2>
            <p className="text-[#464972] font-medium text-[14px] leading-[140%] w-[400px]">Entrar com e-mail e senha.</p>
          </div>

          {error && (
            <div className="bg-red-100 text-red-700 p-3 rounded-md mb-4">
              {error}
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <div className="form-group">
              <label className="font-bold text-[14px] leading-[16px] text-[#181C4F]">E-mail</label>
              <input 
                type="email"
                className="input-field"
                placeholder="exemplo@email.com"
                value={email}
                onChange={e => setEmail(e.target.value)}
                required
                autoComplete="username"
              />
            </div>

            <div className="form-group">
              <label className="font-bold text-[14px] leading-[16px] text-[#181C4F]">Senha</label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"}
                  className="input-field pr-10"
                  placeholder="Digite a senha"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  autoComplete="current-password"
                  minLength={6}
                />
                <button
                  type="button"
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-2 text-gray-500 hover:text-gray-700"
                  onClick={() => setShowPassword(!showPassword)}
                  tabIndex={-1}
                >
                  {showPassword ? (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-end mb-4">
              <button 
                type="button"
                onClick={handleReset}
                className="text-black font-medium text-[14px] leading-[140%] hover:opacity-80 transition-opacity w-[400px] text-right"
              >
                Esqueci minha senha
              </button>
            </div>

            <button 
              type="submit"
              className="btn-primary w-full mt-2 disabled:opacity-50 text-[#E8E8ED] text-[14px] font-semibold leading-[24px]"
              disabled={loading}
            >
              {loading ? 'Entrando...' : 'Entrar'}
            </button>

            <div className="mt-4 flex items-baseline justify-center gap-0.5">
              <span className="text-[#747795] text-[14px] leading-[150%] font-normal w-[137px]">Não tem uma conta?</span>
              <a href="/register" className="text-[#181C4F] font-semibold text-[14px] leading-[24px] hover:opacity-80 w-[86px]">
                Inscrever-se
              </a>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
