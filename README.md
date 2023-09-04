# Projetão

> Uma plataforma web, que define propostas com valores e prazos justos para casos de inadimplência, através de uma inteligência artificial.

## Tecnologias

- [Next.js](https://nextjs.org/)
- [FastAPI](https://fastapi.tiangolo.com/)
- [MongoDB](https://www.mongodb.com/)

## Como rodar o projeto

Clone ou faça o download do repositório, e siga os passos abaixo:

### Variáveis de ambiente

#### Frontend
- NEXT_PUBLIC_API_URL: URL da API (usualmente, https://localhost:3000)
- MONGODB_URI: URI de conexão com o MongoDB
- GOOGLE_ID: ID do Google Cloud, para autenticação
- GOOGLE_SECRET: Secret do Google Cloud, para autenticação
- NEXTAUTH_SECRET: Secret do NextAuth, hash de 32 dígitos, para uso da biblioteca "next-auth"
- NEXTAUTH_URL: URL do NextAuth (usualmente, https://localhost:3000/api/auth)

#### Backend
- MONGODB_URI: URI de conexão com o MongoDB

#### Bot do Telegram
- TELEGRAM_BOT_TOKEN: Token do bot do Telegram, para envio de mensagens
- SERVER_URL: URL do servidor (usualmente, https://localhost:8000)
- SITE_URL: URL do site (usualmente, https://localhost:3000)

#### As adicionando ao projeto:

```bash
# Crie um arquivo .env.local na pasta nextjs_frontend
$ touch nextjs_frontend/.env.local
# Copie o conteúdo do arquivo .env.example para o .env
$ cp nextjs_frontend/.env.example nextjs_frontend/.env
# Modifique as variáveis de ambiente
```

### Frontend

```bash
# Instala o yarn
$ npm install --global yarn
# Acesse a pasta do frontend
$ cd nextjs_frontend
# Instale as dependências
$ yarn install
# Rode o projeto
$ yarn dev
```

### Backend

```bash
# Acesse a pasta do backend
$ cd fastapi_backend
# Instale as dependências
$ pip install -r requirements.txt
# Rode o projeto
$ uvicorn main:app --reload
```

### Bot do Telegram

```bash
# Acesse a pasta do bot
$ cd telegram_bot
# Instale as dependências
$ pip install -r requirements.txt
# Rode o projeto
$ uvicorn main:bot --reload --port=5000
```
