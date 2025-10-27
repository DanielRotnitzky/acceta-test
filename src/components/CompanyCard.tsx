import React from 'react';

type Props = {
  company: {
    id: string;
    razaoSocial: string;
    cnpj: string;
    numProjects: number;
    updatedAt: string;
  };
};

export default function CompanyCard({ company }: Props) {
  return (
    <div className="border rounded p-4 shadow-sm bg-white">
      <h3 className="font-semibold">{company.razaoSocial}</h3>
      <p className="text-sm">CNPJ: {company.cnpj}</p>
      <p className="text-sm">Projetos: {company.numProjects}</p>
      <p className="text-xs text-gray-500">Atualizado: {new Date(company.updatedAt).toLocaleString()}</p>
    </div>
  );
}
