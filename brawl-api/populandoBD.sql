
-- 1) RARIDADES
INSERT INTO rarities (name, color_hex) VALUES
  ('inicial', '#8B959E'),
  ('raro', '#4EAB2F'),
  ('super-raro', '#1E9BE0'),
  ('épico', '#A337DB'),
  ('mítico', '#F02D6F'),
  ('lendário', '#F9D949'),
  ('ultralendário', '#3FE0D0')
ON CONFLICT (name) DO NOTHING;

-- 2) CATEGORIAS
INSERT INTO categories (name) VALUES
  ('algoz'),
  ('controle'),
  ('destruidor'),
  ('detonador'),
  ('suporte'),
  ('tanque'),
  ('tiro preciso')
ON CONFLICT (name) DO NOTHING;

-- 3) BRAWLERS
INSERT INTO brawlers (name, category_id, rarity_id, attack_range, health) VALUES
  ('Shelly', (SELECT id FROM categories WHERE name = 'destruidor'), (SELECT id FROM rarities WHERE name = 'inicial'), 'longo', 7800),
  ('Nita', (SELECT id FROM categories WHERE name = 'destruidor'), (SELECT id FROM rarities WHERE name = 'raro'), 'normal', 8400),
  ('Colt', (SELECT id FROM categories WHERE name = 'destruidor'), (SELECT id FROM rarities WHERE name = 'raro'), 'longo', 6200),
  ('Bull', (SELECT id FROM categories WHERE name = 'tanque'), (SELECT id FROM rarities WHERE name = 'raro'), 'normal', 10600),
  ('Brock', (SELECT id FROM categories WHERE name = 'tiro preciso'), (SELECT id FROM rarities WHERE name = 'raro'), 'longo', 6000),
  ('El Primo', (SELECT id FROM categories WHERE name = 'tanque'), (SELECT id FROM rarities WHERE name = 'raro'), 'curto', 13000),
  ('Barley', (SELECT id FROM categories WHERE name = 'detonador'), (SELECT id FROM rarities WHERE name = 'raro'), 'longo', 5400),
  ('Poco', (SELECT id FROM categories WHERE name = 'suporte'), (SELECT id FROM rarities WHERE name = 'raro'), 'longo', 8000),
  ('Rosa', (SELECT id FROM categories WHERE name = 'tanque'), (SELECT id FROM rarities WHERE name = 'raro'), 'curto', 10800),
  ('Jessie', (SELECT id FROM categories WHERE name = 'controle'), (SELECT id FROM rarities WHERE name = 'super-raro'), 'longo', 6600),
  ('Dynamike', (SELECT id FROM categories WHERE name = 'detonador'), (SELECT id FROM rarities WHERE name = 'super-raro'), 'longo', 6000),
  ('Tick', (SELECT id FROM categories WHERE name = 'detonador'), (SELECT id FROM rarities WHERE name = 'super-raro'), 'longo', 4800),
  ('8-Bit', (SELECT id FROM categories WHERE name = 'destruidor'), (SELECT id FROM rarities WHERE name = 'super-raro'), 'muito longo', 10400),
  ('Rico', (SELECT id FROM categories WHERE name = 'destruidor'), (SELECT id FROM rarities WHERE name = 'super-raro'), 'muito longo', 6000),
  ('Darryl', (SELECT id FROM categories WHERE name = 'tanque'), (SELECT id FROM rarities WHERE name = 'super-raro'), 'normal', 11000),
  ('Penny', (SELECT id FROM categories WHERE name = 'controle'), (SELECT id FROM rarities WHERE name = 'super-raro'), 'longo', 7000),
  ('Carl', (SELECT id FROM categories WHERE name = 'destruidor'), (SELECT id FROM rarities WHERE name = 'super-raro'), 'longo', 8400),
  ('Jacky', (SELECT id FROM categories WHERE name = 'tanque'), (SELECT id FROM rarities WHERE name = 'super-raro'), 'curto', 10000),
  ('Gus', (SELECT id FROM categories WHERE name = 'suporte'), (SELECT id FROM rarities WHERE name = 'super-raro'), 'muito longo', 6600),
  ('Bo', (SELECT id FROM categories WHERE name = 'controle'), (SELECT id FROM rarities WHERE name = 'épico'), 'longo', 7600),
  ('Emz', (SELECT id FROM categories WHERE name = 'controle'), (SELECT id FROM rarities WHERE name = 'épico'), 'normal', 7800),
  ('Stu', (SELECT id FROM categories WHERE name = 'algoz'), (SELECT id FROM rarities WHERE name = 'épico'), 'longo', 6800),
  ('Piper', (SELECT id FROM categories WHERE name = 'tiro preciso'), (SELECT id FROM rarities WHERE name = 'épico'), 'muito longo', 5000),
  ('Pam', (SELECT id FROM categories WHERE name = 'suporte'), (SELECT id FROM rarities WHERE name = 'épico'), 'longo', 10000),
  ('Frank', (SELECT id FROM categories WHERE name = 'tanque'), (SELECT id FROM rarities WHERE name = 'épico'), 'normal', 14000),
  ('Bibi', (SELECT id FROM categories WHERE name = 'tanque'), (SELECT id FROM rarities WHERE name = 'épico'), 'curto', 10000),
  ('Bea', (SELECT id FROM categories WHERE name = 'tiro preciso'), (SELECT id FROM rarities WHERE name = 'épico'), 'muito longo', 5600),
  ('Nani', (SELECT id FROM categories WHERE name = 'tiro preciso'), (SELECT id FROM rarities WHERE name = 'épico'), 'longo', 5000),
  ('Edgar', (SELECT id FROM categories WHERE name = 'algoz'), (SELECT id FROM rarities WHERE name = 'épico'), 'curto', 7400),
  ('Griff', (SELECT id FROM categories WHERE name = 'controle'), (SELECT id FROM rarities WHERE name = 'épico'), 'longo', 7400),
  ('Grom', (SELECT id FROM categories WHERE name = 'detonador'), (SELECT id FROM rarities WHERE name = 'épico'), 'longo', 6000),
  ('Bonnie', (SELECT id FROM categories WHERE name = 'tiro preciso'), (SELECT id FROM rarities WHERE name = 'épico'), 'longo', 10000),
  ('Gale', (SELECT id FROM categories WHERE name = 'controle'), (SELECT id FROM rarities WHERE name = 'épico'), 'longo', 8000),
  ('Colette', (SELECT id FROM categories WHERE name = 'destruidor'), (SELECT id FROM rarities WHERE name = 'épico'), 'longo', 7200),
  ('Belle', (SELECT id FROM categories WHERE name = 'tiro preciso'), (SELECT id FROM rarities WHERE name = 'épico'), 'muito longo', 5600),
  ('Ash', (SELECT id FROM categories WHERE name = 'tanque'), (SELECT id FROM rarities WHERE name = 'épico'), 'normal', 11800),
  ('Lola', (SELECT id FROM categories WHERE name = 'destruidor'), (SELECT id FROM rarities WHERE name = 'épico'), 'longo', 8000),
  ('Sam', (SELECT id FROM categories WHERE name = 'algoz'), (SELECT id FROM rarities WHERE name = 'épico'), 'curto', 11400),
  ('Mandy', (SELECT id FROM categories WHERE name = 'tiro preciso'), (SELECT id FROM rarities WHERE name = 'épico'), 'longo', 6000),
  ('Maisie', (SELECT id FROM categories WHERE name = 'tiro preciso'), (SELECT id FROM rarities WHERE name = 'épico'), 'longo', 8000),
  ('Hank', (SELECT id FROM categories WHERE name = 'tanque'), (SELECT id FROM rarities WHERE name = 'épico'), 'curto', 10400),
  ('Pearl', (SELECT id FROM categories WHERE name = 'destruidor'), (SELECT id FROM rarities WHERE name = 'épico'), 'longo', 8600),
  ('Larry e Lawrie', (SELECT id FROM categories WHERE name = 'detonador'), (SELECT id FROM rarities WHERE name = 'épico'), 'longo', 6000),
  ('Angelo', (SELECT id FROM categories WHERE name = 'tiro preciso'), (SELECT id FROM rarities WHERE name = 'épico'), 'muito longo', 6200),
  ('Berry', (SELECT id FROM categories WHERE name = 'detonador'), (SELECT id FROM rarities WHERE name = 'épico'), 'normal', 5200),
  ('Shade', (SELECT id FROM categories WHERE name = 'algoz'), (SELECT id FROM rarities WHERE name = 'épico'), 'curto', 7400),
  ('Meeple', (SELECT id FROM categories WHERE name = 'controle'), (SELECT id FROM rarities WHERE name = 'épico'), 'longo', 6600),
  ('Trunk', (SELECT id FROM categories WHERE name = 'tanque'), (SELECT id FROM rarities WHERE name = 'épico'), 'curto', 10400),
  ('Mortis', (SELECT id FROM categories WHERE name = 'algoz'), (SELECT id FROM rarities WHERE name = 'mítico'), 'curto', 8000),
  ('Tara', (SELECT id FROM categories WHERE name = 'destruidor'), (SELECT id FROM rarities WHERE name = 'mítico'), 'longo', 6600),
  ('Eugênio', (SELECT id FROM categories WHERE name = 'controle'), (SELECT id FROM rarities WHERE name = 'mítico'), 'muito longo', 7600),
  ('Max', (SELECT id FROM categories WHERE name = 'suporte'), (SELECT id FROM rarities WHERE name = 'mítico'), 'longo', 7000),
  ('Mister P', (SELECT id FROM categories WHERE name = 'controle'), (SELECT id FROM rarities WHERE name = 'mítico'), 'longo', 7400),
  ('Sprout', (SELECT id FROM categories WHERE name = 'detonador'), (SELECT id FROM rarities WHERE name = 'mítico'), 'normal', 6400),
  ('Byron', (SELECT id FROM categories WHERE name = 'suporte'), (SELECT id FROM rarities WHERE name = 'mítico'), 'muito longo', 5200),
  ('Squeak', (SELECT id FROM categories WHERE name = 'controle'), (SELECT id FROM rarities WHERE name = 'mítico'), 'longo', 7600),
  ('Lou', (SELECT id FROM categories WHERE name = 'controle'), (SELECT id FROM rarities WHERE name = 'mítico'), 'muito longo', 6800),
  ('Ruffs', (SELECT id FROM categories WHERE name = 'suporte'), (SELECT id FROM rarities WHERE name = 'mítico'), 'longo', 6000),
  ('Buzz', (SELECT id FROM categories WHERE name = 'algoz'), (SELECT id FROM rarities WHERE name = 'mítico'), 'curto', 10000),
  ('Fang', (SELECT id FROM categories WHERE name = 'algoz'), (SELECT id FROM rarities WHERE name = 'mítico'), 'muito longo', 9000),
  ('Eve', (SELECT id FROM categories WHERE name = 'destruidor'), (SELECT id FROM rarities WHERE name = 'mítico'), 'muito longo', 6200),
  ('Janet', (SELECT id FROM categories WHERE name = 'tiro preciso'), (SELECT id FROM rarities WHERE name = 'mítico'), 'normal', 6800),

  -- 1) BRAWLER_STATS
INSERT INTO brawler_stats (brawler_id, win_rate, pick_rate, star_power_count) VALUES
  (205, 52.23, 2.4, 2), -- Shelly
  (206, 45.57, 13.78, 2), -- Nita
  (207, 56.27, 3.39, 2), -- Colt
  (208, 42.48, 5.5, 2), -- Bull
  (209, 42.42, 5.18, 2), -- Brock
  (210, 50.72, 5.53, 2), -- El Primo
  (211, 54.95, 2.1, 2), -- Barley
  (212, 53.17, 7.44, 2), -- Poco
  (213, 57.32, 7.39, 2), -- Rosa
  (214, 43.55, 15.56, 2), -- Jessie
  (215, 54.91, 13.68, 2), -- Dynamike
  (216, 57.57, 8.06, 2), -- Tick
  (217, 55.27, 11.9, 3), -- 8-Bit
  (218, 51.24, 13.27, 2), -- Rico
  (219, 45.65, 6.63, 2), -- Darryl
  (220, 45.72, 3.62, 2), -- Penny
  (221, 52.17, 7.84, 2), -- Carl
  (222, 45.35, 6.27, 3), -- Jacky
  (223, 52.37, 11.75, 2), -- Gus
  (224, 53.67, 4.61, 2), -- Bo
  (225, 57.83, 12.24, 2), -- Emz
  (226, 52.95, 15.49, 2), -- Stu
  (227, 45.66, 2.51, 2), -- Piper
  (228, 46.28, 5.38, 3), -- Pam
  (229, 56.02, 7.03, 2), -- Frank
  (230, 48.33, 16.63, 2), -- Bibi
  (231, 46.24, 5.95, 2), -- Bea
  (232, 46.2, 11.35, 3), -- Nani
  (233, 48.39, 5.51, 3), -- Edgar
  (234, 50.15, 3.45, 2), -- Griff
  (235, 43.75, 12.04, 2), -- Grom
  (236, 48.75, 3.02, 2), -- Bonnie
  (237, 57.94, 10.47, 3), -- Gale
  (238, 55.77, 2.18, 2), -- Colette
  (239, 52.91, 10.59, 2), -- Belle
  (240, 52.26, 3.78, 2), -- Ash
  (241, 49.26, 17.26, 3), -- Lola
  (242, 46.21, 10.01, 2), -- Sam
  (243, 56.6, 15.93, 2), -- Mandy
  (244, 52.22, 11.74, 2), -- Maisie
  (245, 54.2, 10.63, 2), -- Hank
  (246, 50.49, 2.01, 2), -- Pearl
  (247, 42.31, 16.87, 3), -- Larry e Lawrie
  (248, 55.31, 6.92, 2), -- Angelo
  (249, 56.05, 17.15, 2), -- Berry
  (250, 49.78, 3.11, 2), -- Shade
  (251, 54.25, 4.05, 2), -- Meeple
  (252, 50.8, 6.24, 3), -- Trunk
  (253, 48.77, 5.39, 2), -- Mortis
  (254, 53.68, 5.22, 2), -- Tara
  (255, 57.92, 12.4, 2), -- Eugênio
  (256, 50.28, 3.94, 2), -- Max
  (257, 47.41, 11.41, 2), -- Mister P
  (258, 45.52, 3.14, 2), -- Sprout
  (259, 45.66, 16.49, 3), -- Byron
  (260, 43.13, 5.81, 2), -- Squeak
  (261, 45.43, 4.12, 3), -- Lou
  (262, 51.14, 9.56, 2), -- Ruffs
  (263, 54.92, 5.05, 2), -- Buzz
  (264, 48.9, 8.78, 2), -- Fang
  (265, 53.67, 12.77, 3), -- Eve
  (266, 43.57, 8.44, 2), -- Janet
  (267, 55.79, 5.98, 2), -- Otis
  (268, 49.18, 8.75, 2), -- Buster
  (269, 46.0, 16.77, 2), -- Gray
  (270, 55.78, 10.81, 2), -- R-T
  (271, 57.99, 15.38, 3), -- Willow
  (272, 56.82, 15.58, 2), -- Doug
  (273, 49.77, 5.42, 2), -- Chuck
  (274, 42.94, 8.06, 3), -- Charlie
  (275, 46.24, 14.55, 2), -- Mico
  (276, 48.77, 17.32, 3), -- Melodie
  (277, 50.89, 13.49, 2), -- Lily
  (278, 46.75, 17.5, 2), -- Clancy
  (279, 50.68, 13.97, 2), -- Moe
  (280, 51.35, 10.05, 3), -- Juju
  (281, 44.52, 17.37, 2), -- Ollie
  (282, 44.97, 11.52, 2), -- Lumi
  (283, 45.76, 3.92, 3), -- Finx
  (284, 45.94, 11.51, 2), -- Jae-Yong
  (285, 48.71, 11.34, 2), -- Alli
  (286, 56.96, 5.27, 2), -- Mina
  (287, 45.82, 8.33, 2), -- Ziggy
  (288, 46.8, 7.06, 2), -- Gigi
  (289, 43.16, 9.33, 3), -- Glowbert
  (290, 57.94, 3.17, 2), -- Spike
  (291, 46.24, 16.93, 3), -- Corvo
  (292, 56.07, 7.91, 2), -- Leon
  (293, 55.34, 13.26, 2), -- Sandy
  (294, 57.8, 12.46, 2), -- Amber
  (295, 55.07, 6.79, 2), -- Meg
  (296, 57.02, 4.15, 2), -- Wattson
  (297, 43.71, 10.85, 2), -- Chester
  (298, 51.68, 13.48, 2), -- Cordelius
  (299, 52.15, 6.22, 2), -- Kit
  (300, 56.49, 15.54, 2), -- Draco
  (301, 48.78, 6.43, 2), -- Kenji
  (302, 54.34, 12.19, 2), -- Pierce
  (303, 53.86, 10.83, 2) -- Kaze
ON CONFLICT (brawler_id) DO NOTHING;

-- 2) BRAWLER_GAME_MODES
INSERT INTO brawler_game_modes (brawler_id, game_mode_id, tier_rating) VALUES
  (205, 1, 'S'),  -- Shelly
  (205, 2, 'A'),
  (205, 3, 'A'),
  (205, 4, 'A'),
  (205, 5, 'D'),
  (205, 6, 'S'),
  (205, 7, 'B'),
  (206, 1, 'D'),  -- Nita
  (206, 2, 'A'),
  (206, 3, 'C'),
  (206, 4, 'A'),
  (206, 5, 'S'),
  (206, 6, 'B'),
  (206, 7, 'B'),
  (207, 1, 'S'),  -- Colt
  (207, 2, 'B'),
  (207, 3, 'B'),
  (207, 4, 'B'),
  (207, 5, 'A'),
  (207, 6, 'B'),
  (207, 7, 'D'),
  (208, 1, 'C'),  -- Bull
  (208, 2, 'A'),
  (208, 3, 'B'),
  (208, 4, 'A'),
  (208, 5, 'A'),
  (208, 6, 'C'),
  (208, 7, 'S'),
  (209, 1, 'A'),  -- Brock
  (209, 2, 'B'),
  (209, 3, 'C'),
  (209, 4, 'B'),
  (209, 5, 'B'),
  (209, 6, 'A'),
  (209, 7, 'A'),
  (210, 1, 'C'),  -- El Primo
  (210, 2, 'S'),
  (210, 3, 'C'),
  (210, 4, 'B'),
  (210, 5, 'B'),
  (210, 6, 'C'),
  (210, 7, 'B'),
  (211, 1, 'B'),  -- Barley
  (211, 2, 'B'),
  (211, 3, 'B'),
  (211, 4, 'S'),
  (211, 5, 'B'),
  (211, 6, 'C'),
  (211, 7, 'B'),
  (212, 1, 'B'),  -- Poco
  (212, 2, 'A'),
  (212, 3, 'B'),
  (212, 4, 'B'),
  (212, 5, 'D'),
  (212, 6, 'C'),
  (212, 7, 'D'),
  (213, 1, 'B'),  -- Rosa
  (213, 2, 'S'),
  (213, 3, 'A'),
  (213, 4, 'B'),
  (213, 5, 'A'),
  (213, 6, 'B'),
  (213, 7, 'S'),
  (214, 1, 'A'),  -- Jessie
  (214, 2, 'C'),
  (214, 3, 'B'),
  (214, 4, 'B'),
  (214, 5, 'C'),
  (214, 6, 'D'),
  (214, 7, 'A'),
  (215, 1, 'C'),  -- Dynamike
  (215, 2, 'B'),
  (215, 3, 'B'),
  (215, 4, 'S'),
  (215, 5, 'C'),
  (215, 6, 'S'),
  (215, 7, 'D'),
  (216, 1, 'D'),  -- Tick
  (216, 2, 'B'),
  (216, 3, 'B'),
  (216, 4, 'C'),
  (216, 5, 'A'),
  (216, 6, 'B'),
  (216, 7, 'B'),
  (217, 1, 'A'),  -- 8-Bit
  (217, 2, 'B'),
  (217, 3, 'D'),
  (217, 4, 'B'),
  (217, 5, 'C'),
  (217, 6, 'B'),
  (217, 7, 'C'),
  (218, 1, 'B'),  -- Rico
  (218, 2, 'D'),
  (218, 3, 'A'),
  (218, 4, 'B'),
  (218, 5, 'C'),
  (218, 6, 'C'),
  (218, 7, 'A'),
  (219, 1, 'B'),  -- Darryl
  (219, 2, 'C'),
  (219, 3, 'D'),
  (219, 4, 'S'),
  (219, 5, 'B'),
  (219, 6, 'B'),
  (219, 7, 'B'),
  (220, 1, 'C'),  -- Penny
  (220, 2, 'B'),
  (220, 3, 'C'),
  (220, 4, 'C'),
  (220, 5, 'C'),
  (220, 6, 'B'),
  (220, 7, 'D'),
  (221, 1, 'C'),  -- Carl
  (221, 2, 'A'),
  (221, 3, 'A'),
  (221, 4, 'B'),
  (221, 5, 'D'),
  (221, 6, 'B'),
  (221, 7, 'A'),
  (222, 1, 'B'),  -- Jacky
  (222, 2, 'B'),
  (222, 3, 'B'),
  (222, 4, 'B'),
  (222, 5, 'A'),
  (222, 6, 'S'),
  (222, 7, 'S'),
  (223, 1, 'B'),  -- Gus
  (223, 2, 'C'),
  (223, 3, 'A'),
  (223, 4, 'C'),
  (223, 5, 'C'),
  (223, 6, 'B'),
  (223, 7, 'C'),
  (224, 1, 'C'),  -- Bo
  (224, 2, 'C'),
  (224, 3, 'B'),
  (224, 4, 'A'),
  (224, 5, 'S'),
  (224, 6, 'A'),
  (224, 7, 'C'),
  (225, 1, 'B'),  -- Emz
  (225, 2, 'A'),
  (225, 3, 'D'),
  (225, 4, 'C'),
  (225, 5, 'S'),
  (225, 6, 'D'),
  (225, 7, 'B'),
  (226, 1, 'A'),  -- Stu
  (226, 2, 'C'),
  (226, 3, 'A'),
  (226, 4, 'C'),
  (226, 5, 'D'),
  (226, 6, 'D'),
  (226, 7, 'B'),
  (227, 1, 'C'),  -- Piper
  (227, 2, 'D'),
  (227, 3, 'C'),
  (227, 4, 'D'),
  (227, 5, 'C'),
  (227, 6, 'A'),
  (227, 7, 'C'),
  (228, 1, 'C'),  -- Pam
  (228, 2, 'B'),
  (228, 3, 'B'),
  (228, 4, 'B'),
  (228, 5, 'D'),
  (228, 6, 'C'),
  (228, 7, 'B'),
  (229, 1, 'B'),  -- Frank
  (229, 2, 'C'),
  (229, 3, 'A'),
  (229, 4, 'B'),
  (229, 5, 'B'),
  (229, 6, 'B'),
  (229, 7, 'B'),
  (230, 1, 'B'),  -- Bibi
  (230, 2, 'D'),
  (230, 3, 'A'),
  (230, 4, 'A'),
  (230, 5, 'A'),
  (230, 6, 'B'),
  (230, 7, 'C'),
  (231, 1, 'A'),  -- Bea
  (231, 2, 'B'),
  (231, 3, 'A'),
  (231, 4, 'C'),
  (231, 5, 'C'),
  (231, 6, 'B'),
  (231, 7, 'D'),
  (232, 1, 'C'),  -- Nani
  (232, 2, 'C'),
  (232, 3, 'S'),
  (232, 4, 'B'),
  (232, 5, 'C'),
  (232, 6, 'C'),
  (232, 7, 'S'),
  (233, 1, 'C'),  -- Edgar
  (233, 2, 'C'),
  (233, 3, 'S'),
  (233, 4, 'B'),
  (233, 5, 'B'),
  (233, 6, 'C'),
  (233, 7, 'C'),
  (234, 1, 'D'),  -- Griff
  (234, 2, 'D'),
  (234, 3, 'B'),
  (234, 4, 'C'),
  (234, 5, 'B'),
  (234, 6, 'B'),
  (234, 7, 'C'),
  (235, 1, 'C'),  -- Grom
  (235, 2, 'S'),
  (235, 3, 'C'),
  (235, 4, 'B'),
  (235, 5, 'C'),
  (235, 6, 'A'),
  (235, 7, 'C'),
  (236, 1, 'A'),  -- Bonnie
  (236, 2, 'D'),
  (236, 3, 'S'),
  (236, 4, 'C'),
  (236, 5, 'S'),
  (236, 6, 'A'),
  (236, 7, 'C'),
  (237, 1, 'A'),  -- Gale
  (237, 2, 'C'),
  (237, 3, 'A'),
  (237, 4, 'S'),
  (237, 5, 'B'),
  (237, 6, 'C'),
  (237, 7, 'B'),
  (238, 1, 'B'),  -- Colette
  (238, 2, 'C'),
  (238, 3, 'B'),
  (238, 4, 'B'),
  (238, 5, 'C'),
  (238, 6, 'B'),
  (238, 7, 'C'),
  (239, 1, 'B'),  -- Belle
  (239, 2, 'A'),
  (239, 3, 'C'),
  (239, 4, 'S'),
  (239, 5, 'D'),
  (239, 6, 'S'),
  (239, 7, 'B'),
  (240, 1, 'B'),  -- Ash
  (240, 2, 'A'),
  (240, 3, 'S'),
  (240, 4, 'S'),
  (240, 5, 'B'),
  (240, 6, 'B'),
  (240, 7, 'S'),
  (241, 1, 'A'),  -- Lola
  (241, 2, 'B'),
  (241, 3, 'A'),
  (241, 4, 'C'),
  (241, 5, 'A'),
  (241, 6, 'B'),
  (241, 7, 'C'),
  (242, 1, 'B'),  -- Sam
  (242, 2, 'B'),
  (242, 3, 'A'),
  (242, 4, 'A'),
  (242, 5, 'A'),
  (242, 6, 'B'),
  (242, 7, 'A'),
  (243, 1, 'S'),  -- Mandy
  (243, 2, 'B'),
  (243, 3, 'C'),
  (243, 4, 'C'),
  (243, 5, 'B'),
  (243, 6, 'B'),
  (243, 7, 'C'),
  (244, 1, 'B'),  -- Maisie
  (244, 2, 'A'),
  (244, 3, 'C'),
  (244, 4, 'B'),
  (244, 5, 'C'),
  (244, 6, 'B'),
  (244, 7, 'C'),
  (245, 1, 'B'),  -- Hank
  (245, 2, 'C'),
  (245, 3, 'A'),
  (245, 4, 'B'),
  (245, 5, 'C'),
  (245, 6, 'B'),
  (245, 7, 'C'),
  (246, 1, 'B'),  -- Pearl
  (246, 2, 'C'),
  (246, 3, 'A'),
  (246, 4, 'B'),
  (246, 5, 'C'),
  (246, 6, 'B'),
  (246, 7, 'C'),
  (247, 1, 'C'),  -- Larry e Lawrie
  (247, 2, 'B'),
  (247, 3, 'A'),
  (247, 4, 'C'),
  (247, 5, 'B'),
  (247, 6, 'B'),
  (247, 7, 'C'),
  (248, 1, 'B'),  -- Angelo
  (248, 2, 'C'),
  (248, 3, 'A'),
  (248, 4, 'B'),
  (248, 5, 'C'),
  (248, 6, 'B'),
  (248, 7, 'C'),
  (249, 1, 'B'),  -- Berry
  (249, 2, 'C'),
  (249, 3, 'A'),
  (249, 4, 'B'),
  (249, 5, 'C'),
  (249, 6, 'B'),
  (249, 7, 'C'),
  (250, 1, 'B'),  -- Shade
  (250, 2, 'C'),
  (250, 3, 'A'),
  (250, 4, 'B'),
  (250, 5, 'C'),
  (250, 6, 'B'),
  (250, 7, 'C'),
  (251, 1, 'B'),  -- Meeple
  (251, 2, 'C'),
  (251, 3, 'A'),
  (251, 4, 'B'),
  (251, 5, 'C'),
  (251, 6, 'B'),
  (251, 7, 'C'),
  (252, 1, 'B'),  -- Trunk
  (252, 2, 'C'),
  (252, 3, 'A'),
  (252, 4, 'B'),
  (252, 5, 'C'),
  (252, 6, 'B'),
  (252, 7, 'C'),
  (253, 1, 'B'),  -- Mortis
  (253, 2, 'C'),
  (253, 3, 'A'),
  (253, 4, 'B'),
  (253, 5, 'C'),
  (253, 6, 'B'),
  (253, 7, 'C'),
  (254, 1, 'B'),  -- Tara
  (254, 2, 'C'),
  (254, 3, 'A'),
  (254, 4, 'B'),
  (254, 5, 'C'),
  (254, 6, 'B'),
  (254, 7, 'C'),
  (255, 1, 'B'),  -- Eugênio
  (255, 2, 'C'),
  (255, 3, 'A'),
  (255, 4, 'B'),
  (255, 5, 'C'),
  (255, 6, 'B'),
  (255, 7, 'C'),
  (256, 1, 'B'),  -- Max
  (256, 2, 'C'),
  (256, 3, 'A'),
  (256, 4, 'B'),
  (256, 5, 'C'),
  (256, 6, 'B'),
  (256, 7, 'C'),
  (257, 1, 'B'),  -- Mister P
  (257, 2, 'C'),
  (257, 3, 'A'),
  (257, 4, 'B'),
  (257, 5, 'C'),
  (257, 6, 'B'),
  (257, 7, 'C'),
  (258, 1, 'B'),  -- Sprout
  (258, 2, 'C'),
  (258, 3, 'A'),
  (258, 4, 'B'),
  (258, 5, 'C'),
  (258, 6, 'B'),
  (258, 7, 'C'),
  (259, 1, 'B'),  -- Byron
  (259, 2, 'C'),
  (259, 3, 'A'),
  (259, 4, 'B'),
  (259, 5, 'C'),
  (259, 6, 'B'),
  (259, 7, 'C'),
  (260, 1, 'B'),  -- Squeak
  (260, 2, 'C'),
  (260, 3, 'A'),
  (260, 4, 'B'),
  (260, 5, 'C'),
  (260, 6, 'B'),
  (260, 7, 'C'),
  (261, 1, 'B'),  -- Lou
  (261, 2, 'C'),
  (261, 3, 'A'),
  (261, 4, 'B'),
  (261, 5, 'C'),
  (261, 6, 'B'),
  (261, 7, 'C'),
  (262, 1, 'B'),  -- Ruffs
  (262, 2, 'C'),
  (262, 3, 'A'),
  (262, 4, 'B'),
  (262, 5, 'C'),
  (262, 6, 'B'),
  (262, 7, 'C'),
  (263, 1, 'B'),  -- Buzz
  (263, 2, 'C'),
  (263, 3, 'A'),
  (263, 4, 'B'),
  (263, 5, 'C'),
  (263, 6, 'B'),
  (263, 7, 'C'),
  (264, 1, 'B'),  -- Fang
  (264, 2, 'C'),
  (264, 3, 'A'),
  (264, 4, 'B'),
  (264, 5, 'C'),
  (264, 6, 'B'),
  (264, 7, 'C'),
  (265, 1, 'B'),  -- Eve
  (265, 2, 'C'),
  (265, 3, 'A'),
  (265, 4, 'B'),
  (265, 5, 'C'),
  (265, 6, 'B'),
  (265, 7, 'C'),
  (266, 1, 'B'),  -- Janet
  (266, 2, 'C'),
  (266, 3, 'A'),
  (266, 4, 'B'),
  (266, 5, 'C'),
  (266, 6, 'B'),
  (266, 7, 'C'),
  (267, 1, 'B'),  -- Otis
  (267, 2, 'C'),
  (267, 3, 'A'),
  (267, 4, 'B'),
  (267, 5, 'C'),
  (267, 6, 'B'),
  (267, 7, 'C'),
  (268, 1, 'B'),  -- Buster
  (268, 2, 'C'),
  (268, 3, 'A'),
  (268, 4, 'B'),
  (268, 5, 'C'),
  (268, 6, 'B'),
  (268, 7, 'C'),
  (269, 1, 'B'),  -- Gray
  (269, 2, 'C'),
  (269, 3, 'A'),
  (269, 4, 'B'),
  (269, 5, 'C'),
  (269, 6, 'B'),
  (269, 7, 'C'),
  (270, 1, 'B'),  -- R-T
  (270, 2, 'C'),
  (270, 3, 'A'),
  (270, 4, 'B'),
  (270, 5, 'C'),
  (270, 6, 'B'),
  (270, 7, 'C'),
  (271, 1, 'B'),  -- Willow
  (271, 2, 'C'),
  (271, 3, 'A'),
  (271, 4, 'B'),
  (271, 5, 'C'),
  (271, 6, 'B'),
  (271, 7, 'C'),
  (272, 1, 'B'),  -- Doug
  (272, 2, 'C'),
  (272, 3, 'A'),
  (272, 4, 'B'),
  (272, 5, 'C'),
  (272, 6, 'B'),
  (272, 7, 'C'),
  (273, 1, 'B'),  -- Chuck
  (273, 2, 'C'),
  (273, 3, 'A'),
  (273, 4, 'B'),
  (273, 5, 'C'),
  (273, 6, 'B'),
  (273, 7, 'C'),
  (274, 1, 'B'),  -- Charlie
  (274, 2, 'C'),
  (274, 3, 'A'),
  (274, 4, 'B'),
  (274, 5, 'C'),
  (274, 6, 'B'),
  (274, 7, 'C'),
  (275, 1, 'B'),  -- Mico
  (275, 2, 'C'),
  (275, 3, 'A'),
  (275, 4, 'B'),
  (275, 5, 'C'),
  (275, 6, 'B'),
  (275, 7, 'C'),
  (276, 1, 'B'),  -- Melodie
  (276, 2, 'C'),
  (276, 3, 'A'),
  (276, 4, 'B'),
  (276, 5, 'C'),
  (276, 6, 'B'),
  (276, 7, 'C'),
  (277, 1, 'B'),  -- Lily
  (277, 2, 'C'),
  (277, 3, 'A'),
  (277, 4, 'B'),
  (277, 5, 'C'),
  (277, 6, 'B'),
  (277, 7, 'C'),