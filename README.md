# Teste Técnico Desenvolvedor de Software | Acceta

Este repositório contém a implementação completa do teste técnico solicitado pela Acceta, utilizando **Next.js**, **TypeScript**, **TailwindCSS**, e **Firebase (Auth + Firestore)**.

## Funcionalidades implementadas
- Login / Registro / Logout
- Verificação de e-mail e Redefinição de senha
- CRUD de empresas atreladas ao usuário
- Diferenciação visual Cliente/Admin
- Paginação de 6 por página
- Filtros avançados (Quantidade de Projetos, Quantidade de Usuários, Data de Atualização)
- Responsividade e UX alinhadas ao Figma

## Pré-requisitos

- Node.js 18+ instalado
- Conta no Firebase (Console)
- Git

## Configuração do Firebase

### 1. Criar projeto no Firebase Console

1. Acesse [Firebase Console](https://console.firebase.google.com/)
2. Clique em "Adicionar projeto"
3. Dê um nome ao projeto (ex: "acceta-test")
4. Configure o Google Analytics (opcional)
5. Clique em "Criar projeto"

### 2. Configurar Authentication

1. No menu lateral, vá em **Authentication**
2. Clique em "Começar"
3. Ative o provedor **E-mail/senha**:
   - Clique em "E-mail/senha"
   - Ative a primeira opção (E-mail/senha)
   - Clique em "Salvar"

### 3. Configurar Firestore Database

1. No menu lateral, vá em **Firestore Database**
2. Clique em "Criar banco de dados"
3. Escolha modo de produção ou teste (recomendado: **teste** para desenvolvimento)
4. Selecione uma localização (ex: `southamerica-east1` para São Paulo)
5. Clique em "Ativar"

### 4. Configurar Regras de Segurança do Firestore

1. Na aba "Regras", substitua o conteúdo por:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    match /companies/{companyId} {
      allow read, write: if request.auth != null && 
        (request.auth.uid == resource.data.userId || 
         get(/databases/$(database)/documents/users/$(request.auth.uid)).data.perfil == 'Admin');
    }
  }
}
```

2. Clique em "Publicar"

### 5. Obter credenciais do Firebase

1. No menu lateral, clique no ícone de engrenagem ⚙️ > **Configurações do projeto**
2. Na seção "Seus aplicativos", clique no ícone **</>** (Web)
3. Registre o app (dê um apelido, ex: "acceta-web")
4. Copie as credenciais do `firebaseConfig`

## Instalação e Execução

### 1. Clone o repositório

```bash
git clone https://github.com/DanielRotnitzky/acceta-test.git
cd acceta-test
```

### 2. Configure as variáveis de ambiente

1. Copie o arquivo de exemplo:
```bash
cp .env.example .env.local
```

2. Edite `.env.local` e preencha com as credenciais do Firebase:

```env
NEXT_PUBLIC_FIREBASE_API_KEY=sua_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=seu_project_id.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=seu_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=seu_project_id.appspot.com
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=seu_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=seu_app_id
```

### 3. Instale as dependências

```bash
npm install
```

### 4. Execute o servidor de desenvolvimento

```bash
npm run dev
```

O sistema estará disponível em: **http://localhost:3000**

## Scripts disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria build de produção
- `npm start` - Inicia o servidor de produção (após build)
- `npm run lint` - Executa verificação de código

## Estrutura do Banco de Dados (Firestore)

### Coleção: `users`
```typescript
{
  uid: string,            // ID do usuário (gerado pelo Auth)
  nome: string,           // Nome completo
  email: string,          // E-mail
  cnpj: string,           // CNPJ (apenas números)
  perfil: 'Cliente' | 'Admin',
  createdAt: string       // ISO Date
}
```

### Coleção: `companies`
```typescript
{
  id: string,             // ID da empresa (auto-gerado)
  userId: string,         // ID do usuário proprietário
  companyName: string,    // Nome da empresa
  projectCount: number,   // Quantidade de projetos
  userCount: number,      // Quantidade de usuários
  status: 'Ativa' | 'Inativa',
  createdAt: string,      // ISO Date
  updatedAt: string       // ISO Date
}
```

## Usuário de Teste

Após configurar, crie um usuário através da tela de registro em `/register`.

## Tecnologias utilizadas

- **Next.js 14** - Framework React
- **TypeScript** - Tipagem estática
- **Firebase Auth** - Autenticação
- **Firestore** - Banco de dados NoSQL
- **Tailwind CSS** - Estilização
- **React Hooks** - Gerenciamento de estado

## Deploy (Opcional)

O projeto está configurado para deploy na Vercel:

1. Importe o repositório no [Vercel](https://vercel.com)
2. Configure as variáveis de ambiente no dashboard
3. Deploy automático ao fazer push na branch main

## Suporte

Para dúvidas ou problemas, entre em contato através do repositório.
