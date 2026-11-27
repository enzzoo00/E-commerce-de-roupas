# Contrato da API: serviço de Clientes

Base local: `http://localhost:3001` · Formato: JSON · Erros: `{ "mensagem": "...", "erros": [...] }`

Rotas autenticadas exigem o header `Authorization: Bearer <token>` e só aceitam o `:id` do próprio cliente (outro id → 403).

## Rotas

| Método | Rota | Auth | Função |
|---|---|---|---|
| GET | `/health` | não | Saúde do serviço |
| POST | `/clientes/cadastro` | não | Cria conta |
| POST | `/clientes/login` | não | Retorna token JWT |
| GET | `/clientes/:id` | JWT | Perfil |
| PUT | `/clientes/:id` | JWT | Atualiza nome e telefone |
| GET | `/clientes/:id/enderecos` | JWT | Lista endereços (principal primeiro) |
| POST | `/clientes/:id/enderecos` | JWT | Adiciona endereço |
| PUT | `/clientes/:id/enderecos/:eid` | JWT | Edita endereço |
| DELETE | `/clientes/:id/enderecos/:eid` | JWT | Remove endereço |
| GET | `/clientes/:id/validar` | chave de serviço* | Usada pelo serviço de Pedidos |

\* Só exige o header `X-Service-Key` se a variável `SERVICE_KEY` estiver definida no serviço.

## Exemplos

### POST /clientes/cadastro
```json
// requisição
{ "nome": "Ana Teste", "email": "ana@teste.com", "senha": "123456", "telefone": "(85) 99999-0000" }

// 201
{ "id": 1, "nome": "Ana Teste", "email": "ana@teste.com" }
```
Erros: `400` dados inválidos · `409` e-mail já cadastrado.

### POST /clientes/login
```json
// requisição
{ "email": "ana@teste.com", "senha": "123456" }

// 200
{ "token": "eyJhbGciOi...", "cliente": { "id": 1, "nome": "Ana Teste", "email": "ana@teste.com" } }
```
Erros: `400` campos vazios · `401` e-mail ou senha inválidos.

### GET /clientes/:id
```json
// 200
{ "id": 1, "nome": "Ana Teste", "email": "ana@teste.com", "telefone": "(85) 99999-0000", "criadoEm": "2026-11-26T12:00:00.000Z" }
```

### PUT /clientes/:id
```json
// requisição (nome obrigatório; e-mail não pode ser alterado)
{ "nome": "Ana Teste Silva", "telefone": "(85) 98888-7777" }
// 200: mesmo formato do GET /clientes/:id
```

### Endereço (POST e PUT usam o mesmo corpo)
```json
// requisição
{ "cep": "61600-000", "rua": "Rua das Flores", "numero": "123", "complemento": "Apto 4",
  "bairro": "Centro", "cidade": "Caucaia", "uf": "CE", "principal": false }

// 201 (POST) ou 200 (PUT)
{ "id": 1, "cep": "61600-000", "rua": "Rua das Flores", "numero": "123", "complemento": "Apto 4",
  "bairro": "Centro", "cidade": "Caucaia", "uf": "CE", "principal": true }
```
- O primeiro endereço vira principal automaticamente.
- `"principal": true` torna este o principal e desmarca os outros.
- Ao remover o principal, o endereço mais antigo que sobrar assume.
- DELETE responde `204` sem corpo. Erros: `400` dados inválidos · `404` não encontrado.

### GET /clientes/:id/validar (para o serviço de Pedidos)
```json
// 200
{ "valido": true, "id": 1, "nome": "Ana Teste", "email": "ana@teste.com" }
// 404
{ "valido": false }
```
Se `SERVICE_KEY` estiver definida: enviar o header `X-Service-Key: <valor>`; sem ele, `401`.

Para buscar o endereço de entrega, o Pedidos pode repassar o header `Authorization` que o frontend enviou e chamar `GET /clientes/:id/enderecos`.

## Convenções

- Campos em `camelCase` (`criadoEm`).
- CEP sempre devolvido como `00000-000`; UF em maiúsculas.
- Datas em ISO 8601 (UTC).
