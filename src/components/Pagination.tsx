import React from 'react';

interface PaginationProps {
  page: number;
  totalPages: number;
  totalItems: number;
  itemsPerPage: number;
  onPrev: () => void;
  onNext: () => void;
  onFirst: () => void;
  onLast: () => void;
}

export default function Pagination({ page, totalPages, totalItems, itemsPerPage, onPrev, onNext, onFirst, onLast }: PaginationProps) {
  const startItem = (page - 1) * itemsPerPage + 1;
  const endItem = Math.min(page * itemsPerPage, totalItems);
  
  return (
    <div className="flex flex-col md:flex-row items-center justify-between mt-4 gap-4">
      <span style={{
        fontWeight: 500,
        fontSize: '14px',
        lineHeight: '140%',
        color: '#181C4F'
      }}>{startItem} - {endItem} de {totalItems}</span>
      <div className="flex items-center gap-2 md:gap-3">
        <button 
          disabled={page<=1} 
          onClick={onFirst} 
          className="disabled:opacity-50 flex items-center gap-1 p-2 min-w-[44px] min-h-[44px] justify-center"
          style={{ 
            background: 'transparent', 
            border: 'none',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '140%',
            color: '#181C4F',
            cursor: page<=1 ? 'default' : 'pointer'
          }}
          title="Primeira página"
          aria-label="Primeira página"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M11.3335 12L7.3335 8L11.3335 4" stroke="#181C4F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M4.6665 4V12" stroke="#181C4F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button 
          disabled={page<=1} 
          onClick={onPrev} 
          className="disabled:opacity-50 flex items-center gap-2 p-2 min-w-[44px] min-h-[44px] justify-center"
          style={{ 
            background: 'transparent', 
            border: 'none',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '140%',
            color: '#181C4F',
            cursor: page<=1 ? 'default' : 'pointer'
          }}
          title="Página anterior"
          aria-label="Página anterior"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M10 12L6 8L10 4" stroke="#181C4F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span className="hidden sm:inline">Anterior</span>
        </button>
        <button 
          disabled={page>=totalPages} 
          onClick={onNext} 
          className="disabled:opacity-50 flex items-center gap-2 p-2 min-w-[44px] min-h-[44px] justify-center"
          style={{ 
            background: 'transparent', 
            border: 'none',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '140%',
            color: '#181C4F',
            cursor: page>=totalPages ? 'default' : 'pointer'
          }}
          title="Próxima página"
          aria-label="Próxima página"
        >
          <span className="hidden sm:inline">Próxima</span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M6 12L10 8L6 4" stroke="#181C4F" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <button 
          disabled={page>=totalPages} 
          onClick={onLast} 
          className="disabled:opacity-50 flex items-center gap-1 p-2 min-w-[44px] min-h-[44px] justify-center"
          style={{ 
            background: 'transparent', 
            border: 'none',
            fontWeight: 500,
            fontSize: '14px',
            lineHeight: '140%',
            color: '#181C4F',
            cursor: page>=totalPages ? 'default' : 'pointer'
          }}
          title="Última página"
          aria-label="Última página"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4.667 12L8.667 8L4.667 4" stroke="#181C4F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M11.333 4V12" stroke="#181C4F" strokeWidth="0.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
