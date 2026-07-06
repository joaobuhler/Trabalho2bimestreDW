-- =========================================================
-- Brawl Stars API - Script de criação do banco de dados
-- =========================================================

-- Tabela: categories (classes do brawler - ex: Tanque, Atirador, Suporte)
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- Tabela: rarities (raridades - ex: Comum, Rara, Super Rara, Épica, Mítica, Lendária)
CREATE TABLE rarities (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    color_hex VARCHAR(7)
);

-- Tabela: brawlers (entidade central)
CREATE TABLE brawlers (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL UNIQUE,
    category_id INTEGER NOT NULL REFERENCES categories(id),
    rarity_id INTEGER NOT NULL REFERENCES rarities(id),
    attack_range VARCHAR(20) NOT NULL, -- ex: 'curto', 'medio', 'longo'
    health INTEGER NOT NULL,
    created_at TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Tabela: brawler_stats (1:1 com brawlers)
CREATE TABLE brawler_stats (
    id SERIAL PRIMARY KEY,
    brawler_id INTEGER NOT NULL UNIQUE REFERENCES brawlers(id) ON DELETE CASCADE,
    win_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
    pick_rate NUMERIC(5,2) NOT NULL DEFAULT 0,
    star_power_count INTEGER NOT NULL DEFAULT 2
);

-- Tabela: game_modes (modos de jogo - ex: Coleta de Gemas, Bola de Brawl, Nocaute)
CREATE TABLE game_modes (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL UNIQUE,
    description TEXT
);

-- Tabela associativa: brawler_game_modes (N:N entre brawlers e game_modes)
CREATE TABLE brawler_game_modes (
    id SERIAL PRIMARY KEY,
    brawler_id INTEGER NOT NULL REFERENCES brawlers(id) ON DELETE CASCADE,
    game_mode_id INTEGER NOT NULL REFERENCES game_modes(id) ON DELETE CASCADE,
    tier_rating CHAR(1) NOT NULL, -- ex: 'S', 'A', 'B', 'C'
    UNIQUE (brawler_id, game_mode_id)
);

-- =========================================================
-- Seeds (dados de exemplo em português, para testar a API)
-- =========================================================

-- Categorias (classes de combate reais do jogo)
INSERT INTO categories (name, description) VALUES
('Tanque', 'Alta quantidade de vida e curto alcance de ataque'),
('Atirador', 'Dano à distância, porém com vida baixa'),
('Suporte', 'Cura ou fortalece os aliados durante a partida'),
('Assassino', 'Alta mobilidade e dano alto em curta distância'),
('Controle', 'Habilidades que dificultam o movimento dos inimigos'),
('Detonador', 'Ataques de longo alcance em área, porém lentos');

-- Raridades (na ordem oficial do jogo, da mais comum à mais rara)
INSERT INTO rarities (name, color_hex) VALUES
('Comum', '#8D8D8D'),
('Rara', '#4CAF50'),
('Super Rara', '#2196F3'),
('Épica', '#9C27B0'),
('Mítica', '#F44336'),
('Lendária', '#FFC107'),
('Ultralendária', '#00E5FF');

-- Modos de jogo (nomes localizados em português)
INSERT INTO game_modes (name, description) VALUES
('Pique-Gema', 'Duas equipes disputam o controle de gemas que caem no centro do mapa'),
('Fute-Brawl', 'Modo estilo futebol: leve a bola até o gol adversário'),
('Nocaute', 'Battle royale: sobreviva e elimine os oponentes, sem respawn'),
('Roubo', 'Destrua cofres para conseguir gemas extras enquanto batalha'),
('Combate', 'Elimine o máximo de oponentes possível dentro do tempo da partida'),
('Caça-Estrelas', 'Colete estrelas caídas dos inimigos derrotados e não deixe cair as suas'),
('Zona Estratégica', 'Controle zonas do mapa por mais tempo que a equipe adversária');

-- Brawlers (personagens reais do jogo, com categoria e raridade correspondentes)
INSERT INTO brawlers (name, category_id, rarity_id, attack_range, health) VALUES
('Shelly',    (SELECT id FROM categories WHERE name = 'Tanque'),    (SELECT id FROM rarities WHERE name = 'Comum'),      'curto', 3600),
('Colt',      (SELECT id FROM categories WHERE name = 'Atirador'),  (SELECT id FROM rarities WHERE name = 'Comum'),      'longo', 2800),
('Poco',      (SELECT id FROM categories WHERE name = 'Suporte'),   (SELECT id FROM rarities WHERE name = 'Rara'),       'medio', 3400),
('Mortis',    (SELECT id FROM categories WHERE name = 'Assassino'), (SELECT id FROM rarities WHERE name = 'Mítica'),     'curto', 3400),
('Emz',       (SELECT id FROM categories WHERE name = 'Controle'),  (SELECT id FROM rarities WHERE name = 'Épica'),      'medio', 3200),
('Barley',    (SELECT id FROM categories WHERE name = 'Detonador'),(SELECT id FROM rarities WHERE name = 'Rara'),       'longo', 2800);

-- Estatísticas (relação 1:1 - um registro por brawler)
INSERT INTO brawler_stats (brawler_id, win_rate, pick_rate, star_power_count) VALUES
((SELECT id FROM brawlers WHERE name = 'Shelly'), 52.30, 12.40, 2),
((SELECT id FROM brawlers WHERE name = 'Colt'),   48.10, 8.90,  2),
((SELECT id FROM brawlers WHERE name = 'Poco'),   54.70, 6.30,  2),
((SELECT id FROM brawlers WHERE name = 'Mortis'), 50.20, 15.60, 2),
((SELECT id FROM brawlers WHERE name = 'Emz'),    53.80, 10.10, 2),
((SELECT id FROM brawlers WHERE name = 'Barley'), 51.40, 7.20,  2);

-- Vínculos brawler <-> modo de jogo (relação N:N com tier de avaliação)
INSERT INTO brawler_game_modes (brawler_id, game_mode_id, tier_rating) VALUES
((SELECT id FROM brawlers WHERE name = 'Shelly'), (SELECT id FROM game_modes WHERE name = 'Pique-Gema'),      'A'),
((SELECT id FROM brawlers WHERE name = 'Shelly'), (SELECT id FROM game_modes WHERE name = 'Nocaute'),         'B'),
((SELECT id FROM brawlers WHERE name = 'Colt'),   (SELECT id FROM game_modes WHERE name = 'Roubo'),           'S'),
((SELECT id FROM brawlers WHERE name = 'Poco'),   (SELECT id FROM game_modes WHERE name = 'Fute-Brawl'),      'A'),
((SELECT id FROM brawlers WHERE name = 'Mortis'), (SELECT id FROM game_modes WHERE name = 'Caça-Estrelas'),   'S'),
((SELECT id FROM brawlers WHERE name = 'Emz'),    (SELECT id FROM game_modes WHERE name = 'Pique-Gema'),      'A'),
((SELECT id FROM brawlers WHERE name = 'Emz'),    (SELECT id FROM game_modes WHERE name = 'Zona Estratégica'),'A'),
((SELECT id FROM brawlers WHERE name = 'Barley'), (SELECT id FROM game_modes WHERE name = 'Roubo'),           'B'),
((SELECT id FROM brawlers WHERE name = 'Barley'), (SELECT id FROM game_modes WHERE name = 'Combate'),         'A');
