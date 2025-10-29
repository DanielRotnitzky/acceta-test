import React from 'react';

type Props = {
  company: {
    id: string;
    companyName?: string;
    razaoSocial?: string;
    taxId?: string;
    cnpj?: string;
    projectCount?: number;
    numProjects?: number;
    updatedAt: string;
  };
  role: 'cliente' | 'admin';
};

export default function CompanyCard({ company, role }: Props) {
  const displayName = company.companyName || company.razaoSocial || '';
  const displayTaxId = company.taxId || company.cnpj || '';
  const displayProjectCount = company.projectCount ?? company.numProjects ?? 0;
  
  // Cor primária dinâmica baseada no role
  const primaryColor = role === 'admin' ? '#000000' : '#181C4F';

  return (
    <div className="bg-white rounded-lg border overflow-hidden hover:shadow-md transition-shadow" style={{ borderColor: '#D1D2DC' }}>
      {/* Header do card com fundo escuro */}
      <div className="px-6 py-4" style={{ backgroundColor: primaryColor }}>
        <h3 className="text-lg font-semibold text-white">{displayName}</h3>
        <p className="text-sm mt-1" style={{ color: '#E8E8ED' }}>
          Score Gov LT DA
        </p>
      </div>
      
      {/* Conteúdo do card */}
      <div className="px-6 py-5">
        <div className="grid grid-cols-4 gap-6">
          {/* CNPJ */}
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: '#A3A4B9' }}>
              CNPJ
            </p>
            <p className="text-sm font-medium" style={{ color: primaryColor }}>
              {displayTaxId}
            </p>
          </div>

          {/* Número de projetos */}
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: '#A3A4B9' }}>
              Buscar por nome
            </p>
            <p className="text-sm font-medium" style={{ color: primaryColor }}>
              {displayProjectCount} projeto{displayProjectCount !== 1 ? 's' : ''}
            </p>
          </div>

          {/* Verificações */}
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: '#A3A4B9' }}>
              Verificações ativas/satistativas
            </p>
            <p className="text-sm font-medium" style={{ color: primaryColor }}>
              -
            </p>
          </div>

          {/* Data de atualização */}
          <div>
            <p className="text-xs font-medium mb-1" style={{ color: '#A3A4B9' }}>
              Cadastrar nova empresa
            </p>
            <p className="text-sm font-medium" style={{ color: '#0E112F' }}>
              {new Date(company.updatedAt).toLocaleDateString('pt-BR')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
