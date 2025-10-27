import { auth } from './firebase';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendEmailVerification,
  sendPasswordResetEmail,
  updateProfile
} from 'firebase/auth';

export async function registerWithEmail(name: string, email: string, password: string) {
  const userCred = await createUserWithEmailAndPassword(auth, email, password);
  if (auth.currentUser) {
    await updateProfile(auth.currentUser, { displayName: name });
    await sendEmailVerification(auth.currentUser);
  }
  return userCred;
}

export const loginWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    // Se o email não estiver verificado e a verificação for obrigatória, você pode adicionar uma verificação aqui
    // if (!result.user.emailVerified) {
    //   throw new Error('Por favor, verifique seu email antes de fazer login');
    // }
    return result;
  } catch (error: any) {
    switch (error.code) {
      case 'auth/invalid-email':
        throw new Error('Email inválido');
      case 'auth/user-disabled':
        throw new Error('Esta conta foi desativada');
      case 'auth/user-not-found':
        throw new Error('Usuário não encontrado');
      case 'auth/wrong-password':
        throw new Error('Senha incorreta');
      case 'auth/too-many-requests':
        throw new Error('Muitas tentativas de login. Tente novamente mais tarde');
      default:
        console.error('Erro de autenticação:', error);
        throw new Error('Erro ao fazer login. Tente novamente.');
    }
  }
};

export const logout = async () => {
  await signOut(auth);
};

export const sendReset = (email: string) => sendPasswordResetEmail(auth, email);
