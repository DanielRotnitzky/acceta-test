import React from 'react';

export default function EmailVerified() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white rounded-lg shadow-md p-8 max-w-md w-full text-center">
        <h1 className="text-2xl font-bold text-green-700 mb-4">E-mail verificado com sucesso!</h1>
        <p className="text-gray-700 mb-6">Seu e-mail foi validado. Agora você pode acessar sua conta normalmente.</p>
        <a
          href="https://acceta-test-sooty.vercel.app/"
          className="inline-block px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 font-semibold transition"
        >Ir para tela de login</a>
      </div>
    </div>
  );
}
