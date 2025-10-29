import React, { useState, useEffect } from 'react';
import { auth, db } from '@/lib/firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

type Props = { 
  onClose: () => void;
};

export default function ModalEditProfile({ onClose }: Props) {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [perfil, setPerfil] = useState('Cliente');
  const [loading, setLoading] = useState(true);

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
      
      alert('Perfil atualizado com sucesso!');
      onClose();
      window.location.reload(); // Recarrega para atualizar o título
    } catch (error) {
      console.error('Erro ao atualizar perfil:', error);
      alert('Erro ao atualizar perfil. Tente novamente.');
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
      <form 
        className="bg-white rounded-lg"
        style={{ width: '500px', maxHeight: '90vh', overflow: 'auto' }}
        onSubmit={handleSubmit}
      >
        {/* Header do modal */}
        <div 
          className="px-6 py-4 border-b"
          style={{ borderColor: '#D1D2DC' }}
        >
          <h2 
            style={{ 
              fontWeight: 600,
              fontSize: '20px',
              lineHeight: '24px',
              color: '#181C4F'
            }}
          >
            Editar Perfil
          </h2>
        </div>

        {/* Conteúdo do modal */}
        <div className="px-6 py-4">
          {/* Nome */}
          <div className="mb-4">
            <label 
              className="block mb-1"
              style={{
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '16px',
                color: '#0E112F'
              }}
            >
              Nome
            </label>
            <input 
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                borderColor: '#D1D2DC',
                fontSize: '14px',
                color: '#181C4F'
              }}
              placeholder="Digite seu nome"
              value={nome} 
              onChange={e => setNome(e.target.value)} 
              required 
            />
          </div>

          {/* Email (readonly) */}
          <div className="mb-4">
            <label 
              className="block mb-1"
              style={{
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '16px',
                color: '#0E112F'
              }}
            >
              Email
            </label>
            <input 
              type="email"
              className="w-full px-3 py-2 border rounded-lg"
              style={{ 
                borderColor: '#D1D2DC',
                fontSize: '14px',
                color: '#A3A4B9',
                backgroundColor: '#F8F8FA'
              }}
              value={email}
              readOnly
            />
          </div>

          {/* Perfil */}
          <div className="mb-4">
            <label 
              className="block mb-1"
              style={{
                fontWeight: 500,
                fontSize: '14px',
                lineHeight: '16px',
                color: '#0E112F'
              }}
            >
              Perfil
            </label>
            <select 
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2"
              style={{ 
                borderColor: '#D1D2DC',
                fontSize: '14px',
                color: '#181C4F'
              }}
              value={perfil} 
              onChange={e => setPerfil(e.target.value)}
            >
              <option value="Cliente">Cliente</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        {/* Footer do modal */}
        <div 
          className="px-6 py-4 border-t flex justify-end gap-3"
          style={{ borderColor: '#D1D2DC' }}
        >
          <button 
            type="button" 
            onClick={onClose}
            className="px-4 py-2 rounded-lg border"
            style={{
              borderColor: '#D1D2DC',
              color: '#181C4F',
              fontWeight: 500,
              fontSize: '14px'
            }}
          >
            Cancelar
          </button>
          <button 
            type="submit"
            className="px-4 py-2 rounded-lg text-white"
            style={{
              backgroundColor: '#181C4F',
              fontWeight: 500,
              fontSize: '14px'
            }}
          >
            Salvar
          </button>
        </div>
      </form>
    </div>
  );
}
