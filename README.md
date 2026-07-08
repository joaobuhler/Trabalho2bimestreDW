# Brawl Stars API

API RESTful sobre o universo do jogo **Brawl Stars**, desenvolvida como trabalho prático de Arquitetura de Software. O domínio gira em torno da entidade central **Brawler** (personagem jogável), que se relaciona com categorias, raridades, estatísticas e modos de jogo.

## Domínio escolhido

A API modela informações sobre os brawlers do jogo Brawl Stars:

- **Categories**: a classe/função de combate de um brawler (ex: Tanque, Atirador, Suporte, Assassino, Controle, Detonador).
- **Rarities**: a raridade do brawler (ex: Comum, Rara, Super Rara, Épica, Mítica, Lendária, Ultralendária).
- **Brawlers**: entidade central, contém nome, faixa de ataque, vida, e se relaciona com uma categoria e uma raridade.
- **BrawlerStats**: estatísticas detalhadas de um brawler (taxa de vitória, taxa de escolha, quantidade de star powers) — relação **1:1** com `brawlers`.
- **GameModes**: modos de jogo disponíveis (ex: Pique-Gema, Fute-Brawl, Nocaute, Roubo, Combate, Caça-Estrelas, Zona Estratégica).
- **BrawlerGameModes**: tabela associativa que define a força (`tier_rating`) de cada brawler em cada modo de jogo — relação **N:N** entre `brawlers` e `game_modes`.

### Relacionamentos

| Tipo | Entidades |
|------|-----------|
| 1:1  | `brawlers` ↔ `brawler_stats` (FK única em `brawler_stats.brawler_id`) |
| 1:N  | `categories` → `brawlers`, `rarities` → `brawlers` |
| N:N  | `brawlers` ↔ `game_modes` via `brawler_game_modes` |

### Regras de negócio implementadas

1. Não é possível cadastrar um **brawler** com nome já existente.
2. Não é possível deletar uma **categoria** ou **raridade** que ainda possua brawlers vinculados.
3. Não é possível cadastrar duas vezes o mesmo par **brawler/modo de jogo** em `brawler_game_modes`.
4. Um brawler não pode ter mais de um registro em `brawler_stats` (reforça a relação 1:1).

## Arquitetura

O projeto segue **Vertical Slice**: cada funcionalidade vive em sua própria pasta dentro de `src/features`, contendo `repository`, `service`, `controller` e `routes`.

```
src/
├── config/
│   └── db.js                  # Pool de conexão com PostgreSQL (Neon)
├── errors/
│   ├── AppError.js             # Classe de erro customizada
│   └── errorHandler.js         # Error Handler Global (Fastify)
├── features/
│   ├── categorias/
│   ├── raridades/
│   ├── modoDeJogo/
│   ├── brawlers/
│   ├── estatisticasBrawler/
│   └── brawlerGameModes/
└── server.js                   # Bootstrap do Fastify, Swagger e rotas
```

Cada feature segue:
- **Controller**: recebe `req`/`res`, não conhece SQL nem regra de negócio.
- **Service**: contém as regras de negócio, lança `AppError` quando necessário. Não conhece SQL nem `req`/`res`.
- **Repository**: única camada que importa `pg` e executa queries.
- **Routes**: monta a injeção de dependência (`new Repository()` → `new Service()` → `new Controller()`) e define os schemas usados pelo Swagger.

## Pré-requisitos

- Node.js 18 ou superior
- Uma conta no [Neon](https://neon.tech) (PostgreSQL serverless) com um banco criado

## Instalação e execução local

### 1. Clone o repositório

```bash
git clone <url-do-repositorio>
cd brawl-api
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure as variáveis de ambiente

Copie o arquivo de exemplo e preencha com os dados da sua conexão Neon:

```bash
cp .env.example .env
```

Edite o `.env`:

```env
DATABASE_URL=postgresql://usuario:senha@ep-exemplo.neon.tech/nomedobanco?sslmode=require
PORT=3333
```

> A `DATABASE_URL` é fornecida no painel do Neon, na seção de conexão do seu projeto/banco.

### 4. Crie as tabelas no banco

Execute o script `database.sql` diretamente no editor SQL do Neon (aba "SQL Editor" do painel), ou via `psql`:

```bash
psql "SUA_DATABASE_URL_AQUI" -f database.sql
```

Isso cria todas as tabelas (`categories`, `rarities`, `brawlers`, `brawler_stats`, `game_modes`, `brawler_game_modes`) e insere alguns dados iniciais (seeds) para facilitar os testes.

### 5. Inicie o servidor

```bash
npm start
```

Ou, em modo de desenvolvimento (reinicia automaticamente ao salvar arquivos):

```bash
npm run dev
```

O servidor sobe por padrão em `http://localhost:3333`.

### 6. Acesse a documentação Swagger

Com o servidor rodando, abra no navegador:

```
http://localhost:3333/docs
```

Lá você encontra todos os endpoints documentados, com os formatos de request/response e a possibilidade de testar as requisições diretamente pela interface.

## Endpoints principais

| Método | Rota | Descrição |
|--------|------|-----------|
| GET    | `/categories` | Lista categorias |
| GET    | `/categories/:id` | Busca categoria por ID |
| POST   | `/categories` | Cria categoria |
| PATCH  | `/categories/:id` | Atualiza categoria |
| DELETE | `/categories/:id` | Remove categoria |
| GET    | `/rarities` | Lista raridades |
| GET/POST/PATCH/DELETE | `/rarities/:id` | CRUD de raridades |
| GET/POST/PATCH/DELETE | `/game-modes` | CRUD de modos de jogo |
| GET    | `/brawlers/:id` | Busca brawler com dados enriquecidos (categoria, raridade, stats e modos de jogo via JOIN) |
| GET/POST/PATCH/DELETE | `/brawlers` | CRUD de brawlers |
| GET/POST/PATCH/DELETE | `/brawlers/:brawlerId/stats` | Estatísticas do brawler (1:1) |
| GET/POST/PATCH/DELETE | `/brawler-game-modes` | Vínculos brawler ↔ modo de jogo (N:N) |

A lista completa e interativa está sempre disponível em `/docs`.
