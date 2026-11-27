# Microsserviço de Clientes

Cadastro, login (JWT), perfil e endereços. Node.js + Express + MySQL. Porta padrão: **3001**.
O contrato completo da API está em [API.md](API.md).

## Estrutura

```
clientes/
├── server.js              ← inicia o servidor
├── src/
│   ├── app.js             ← Express, CORS e rotas
│   ├── config/db.js       ← pool de conexões MySQL
│   ├── routes/            ← URLs
│   ├── controllers/       ← recebe a requisição e responde
│   ├── services/          ← regras de negócio (hash, JWT, validações)
│   ├── repositories/      ← queries SQL
│   ├── middlewares/       ← JWT, chave de serviço, erros
│   └── utils/
├── sql/schema.sql
├── clientes.http          ← requisições de teste
├── .env.example
├── Dockerfile
└── docker-compose.yml     ← MySQL local
```

## Como rodar

1. Node 18.11 ou superior (`node -v`).
2. Dentro da pasta `clientes/`:
   ```powershell
   npm install
   ```
   (use `npm.cmd install` se o PowerShell bloquear scripts)
3. **Banco MySQL**, escolha uma opção:
   - **Docker:** `docker compose up -d` (já cria o banco, o usuário e as tabelas).
   - **MySQL instalado (XAMPP, Workbench...):** execute `sql/schema.sql` e crie o usuário:
     ```sql
     CREATE USER 'clientes_user'@'%' IDENTIFIED BY 'clientes_pass';
     GRANT ALL ON clientes_db.* TO 'clientes_user'@'%';
     ```
4. Configure o ambiente:
   ```powershell
   Copy-Item .env.example .env
   ```
   Edite o `.env` e troque o `JWT_SECRET` (comando para gerar está no próprio arquivo).
5. Inicie:
   ```powershell
   npm run dev
   ```
   Deve aparecer `Serviço de Clientes rodando na porta 3001` e `Conexão com o MySQL OK`.
6. Teste abrindo `http://localhost:3001/health` e depois o arquivo `clientes.http`
   (extensão **REST Client** do VS Code) ou importe as rotas no Postman/Insomnia.

## Decisões

- **Senha:** `bcryptjs` (JavaScript puro, instala sem compilar em qualquer Windows).
- **JWT:** HS256, expira em 2h (`JWT_EXPIRES_IN`), o id do cliente vai no campo `sub`.
- **Autorização:** o cliente só acessa o próprio `:id`; outro id retorna 403.
- **Login:** erro genérico para e-mail ou senha inválidos (não revela quais e-mails existem).
- **Banco próprio:** nenhum outro serviço acessa `clientes_db`; falam com este só por HTTP.
- **CORS:** só as origens de `FRONTEND_URL` (separadas por vírgula).

## Deploy

Todas as configurações vêm de variáveis de ambiente (veja `.env.example`). No Render ou no
Railway: Root Directory `clientes`, comando de build `npm install`, comando de start
`node server.js`. Em banco hospedado, use `DB_SSL=true` e rode só os `CREATE TABLE` do schema.

## Próximas melhorias

Limite de tentativas de login (rate limit), troca de senha, troca de e-mail e testes automatizados.
