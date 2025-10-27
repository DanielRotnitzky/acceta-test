import React, { useState } from 'react';

type Props = { onClose: ()=>void; onSave: (data:any)=>Promise<void> };

export default function ModalNewCompany({ onClose, onSave }: Props) {
  const [razaoSocial, setRazao] = useState('');
  const [cnpj, setCnpj] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      razaoSocial, cnpj,
      numProjects: Math.floor(Math.random()*10)+1,
      updatedAt: new Date().toISOString()
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <form className="bg-white p-6 rounded w-96" onSubmit={submit}>
        <h2 className="text-lg font-bold mb-4">Cadastrar Empresa</h2>
        <input className="w-full p-2 border mb-2" placeholder="Razão Social" value={razaoSocial} onChange={e=>setRazao(e.target.value)} required />
        <input className="w-full p-2 border mb-2" placeholder="CNPJ" value={cnpj} onChange={e=>setCnpj(e.target.value)} required />
        <div className="flex gap-2 justify-end mt-4">
          <button type="button" onClick={onClose} className="px-3 py-1">Cancelar</button>
          <button type="submit" className="px-3 py-1 bg-blue-600 text-white rounded">Salvar</button>
        </div>
      </form>
    </div>
  );
}
