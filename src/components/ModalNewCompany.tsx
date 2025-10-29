import React, { useState } from 'react';

type Props = { onClose: ()=>void; onSave: (data:any)=>Promise<void> };

export default function ModalNewCompany({ onClose, onSave }: Props) {
  const [razaoSocial, setRazao] = useState('');
  const [cnpj, setCnpj] = useState('');
  const [enableProjectLimit, setEnableProjectLimit] = useState(false);
  const [projectLimit, setProjectLimit] = useState('');
  const [tipoEmpresa, setTipoEmpresa] = useState('');

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    await onSave({
      companyName: razaoSocial,
      taxId: cnpj,
      enableProjectLimit,
      projectLimit: enableProjectLimit ? parseInt(projectLimit) || 0 : 0,
      companyType: tipoEmpresa,
      projectCount: 0,
      status: 'active',
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 z-50">
      <form className="bg-white p-6 rounded w-[500px]" onSubmit={submit}>
        <h2 className="text-lg font-bold mb-4">Cadastrar Empresa</h2>
        
        {/* Razão Social */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Razão Social</label>
          <input 
            className="w-full p-2 border rounded" 
            placeholder="Informe a Razão Social" 
            value={razaoSocial} 
            onChange={e=>setRazao(e.target.value)} 
            required 
          />
        </div>

        {/* CNPJ */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">CNPJ</label>
          <input 
            className="w-full p-2 border rounded" 
            placeholder="Digite o CNPJ da Empresa" 
            value={cnpj} 
            onChange={e=>setCnpj(e.target.value)} 
            required 
          />
        </div>

        {/* Toggle controle de acesso */}
        <div className="mb-4">
          <label className="flex items-center gap-2 cursor-pointer">
            <div className="relative">
              <input
                type="checkbox"
                checked={enableProjectLimit}
                onChange={(e) => setEnableProjectLimit(e.target.checked)}
                className="sr-only"
              />
              <div 
                className="w-11 h-6 rounded-full transition-colors"
                style={{
                  backgroundColor: enableProjectLimit ? '#181C4F' : '#E8E8ED'
                }}
              >
                <div 
                  style={{
                    width: '20px',
                    height: '20px',
                    top: '2px',
                    left: enableProjectLimit ? '22px' : '2px',
                    opacity: 1,
                    background: '#F8F8FA',
                    borderRadius: '50%',
                    position: 'absolute',
                    transition: 'left 0.2s ease-in-out'
                  }}
                />
              </div>
            </div>
            <span className="text-sm font-medium">Habilitar controle de acesso por limite de projetos</span>
          </label>
        </div>

        {/* Limite de projetos */}
        {enableProjectLimit && (
          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Limite de projetos</label>
            <input 
              type="number"
              className="w-full p-2 border rounded" 
              placeholder="Digite apenas números" 
              value={projectLimit} 
              onChange={e=>setProjectLimit(e.target.value)} 
              required={enableProjectLimit}
            />
          </div>
        )}

        {/* Tipo empresa */}
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Tipo empresa</label>
          <select 
            className="w-full p-2 border rounded" 
            value={tipoEmpresa} 
            onChange={e=>setTipoEmpresa(e.target.value)}
            required
          >
            <option value="">Selecione</option>
            <option value="matriz">Matriz</option>
            <option value="filial">Filial</option>
            <option value="holding">Holding</option>
            <option value="mei">MEI</option>
            <option value="startup">Startup</option>
          </select>
        </div>

        <div className="flex gap-2 justify-end mt-6">
          <button type="button" onClick={onClose} className="px-4 py-2 border rounded">Cancelar</button>
          <button type="submit" className="px-4 py-2 bg-blue-600 text-white rounded">Salvar</button>
        </div>
      </form>
    </div>
  );
}
