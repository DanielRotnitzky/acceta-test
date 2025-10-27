import React from 'react';
export default function Pagination({ page, totalPages, onPrev, onNext }:{page:number,totalPages:number,onPrev:()=>void,onNext:()=>void}) {
  return (
    <div className="flex items-center gap-2 justify-center mt-4">
      <button disabled={page<=1} onClick={onPrev} className="px-3 py-1 rounded border disabled:opacity-50">Anterior</button>
      <span>{page} / {totalPages}</span>
      <button disabled={page>=totalPages} onClick={onNext} className="px-3 py-1 rounded border disabled:opacity-50">Próxima</button>
    </div>
  );
}
