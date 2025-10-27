import { useState } from 'react';

interface LogoProps {
  className?: string;
}

export default function Logo({ className = '' }: LogoProps) {
  const [imgFailed, setImgFailed] = useState(false);

  // external svg path (copy your local file here)
  const svgPath = '/images/Esquerda.svg';

  return (
    <div className={`relative ${className}`}>
      <div className="flex items-center gap-3">
        {!imgFailed ? (
          <img
            src={svgPath}
            alt="ScoreGov"
            className="w-20 h-20 object-contain"
            onError={() => setImgFailed(true)}
          />
        ) : (
          <div className="w-20 h-20 flex items-center justify-center">
            <svg width="80" height="80" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M8 24L8 16" stroke="#149E4B" strokeWidth="2"/>
              <path d="M13 24V12" stroke="#181C4F" strokeWidth="2"/>
              <path d="M18 24V8" stroke="#181C4F" strokeWidth="2"/>
              <path d="M23 24V4" stroke="#FFC906" strokeWidth="2"/>
              <path d="M8 16L4 20" stroke="#FFC906" strokeWidth="2"/>
            </svg>
          </div>
        )}

        <div>
          <h1 className="text-3xl font-bold leading-none">
            <span className="text-[#181C4F]">Score</span>
            <span className="text-[#095EAD] ml-1">Gov</span>
          </h1>
          <div className="text-[#7B7B7B] text-sm">By Acceta Analytics</div>
        </div>
      </div>
    </div>
  );
}