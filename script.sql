-- SQL script para criar as tabelas do app de ballet no PostgreSQL

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT NOT NULL UNIQUE,
    phone TEXT,
    username TEXT NOT NULL UNIQUE,
    password_hash TEXT NOT NULL,
    teacher_code TEXT,
    user_type varchar(100)
);

CREATE TABLE steps (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    image_url TEXT,
    description TEXT NOT NULL,
    video_url TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE historias (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    image_url TEXT,
    description TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE circuits (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    description TEXT,
    image_url text,
    duration REAL NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE circuit_steps (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    circuit_id TEXT NOT NULL,
    name text NOT NULL,
    "order" INTEGER NOT NULL,
    duration REAL NOT NULL,
    rest_time REAL NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    CONSTRAINT fk_circuit FOREIGN KEY (circuit_id) REFERENCES circuits (id) ON DELETE CASCADE
);


-- Inserção de 7 passos de ballet na tabela steps
INSERT INTO steps (id, name, image_url, description, video_url, created_at, updated_at) VALUES
    (gen_random_uuid(), 'Plié', 'https://drive.google.com/file/d/1MHDEn43JPdpEMSOOLC7O-cZHtmL5vKTA/view?usp=sharing', 'O Plié é um dos movimentos fundamentais do ballet. Consiste em dobrar os joelhos mantendo os pés alinhados e a postura ereta. Pode ser realizado em todas as posições do ballet e serve como base para muitos outros passos, ajudando na flexibilidade e força das pernas. Dica: mantenha o core engajado para melhor equilíbrio.', 'https://www.youtube.com/watch?v=A4bnF_CypNk&ab_channel=TutudaJu', now(), now()),
    (gen_random_uuid(), 'Tendu', 'https://drive.google.com/file/d/15w_CAovH-r9mkayy55O8qSO_gdL23O45/view?usp=drive_link', 'O Tendu é um movimento no qual o pé desliza pelo chão, estendendo-se para frente, para o lado ou para trás. Ele é essencial para o desenvolvimento da técnica do bailarino, ajudando no fortalecimento dos músculos dos pés e pernas. Dica: mantenha os dedos apontados e evite levantar o calcanhar.', 'https://www.youtube.com/watch?v=sjzOgT4xutU&ab_channel=FernandaRuschel%7CBalletonline', now(), now()),
    (gen_random_uuid(), 'Jeté', 'https://drive.google.com/file/d/1H8VNVZMOIIAdLDhQmCrylZmqyClOvJ5g/view?usp=sharing', 'O Jeté é um passo de salto no qual o bailarino impulsiona uma perna à frente enquanto a outra é empurrada para trás. Esse movimento exige grande controle e força para garantir um pouso suave e elegante. Dica: use a força dos braços para ajudar na impulsão.', 'https://www.youtube.com/watch?v=X9zdAmuS2ao&ab_channel=BalletBeautiful', now(), now()),
    (gen_random_uuid(), 'Pirouette', 'https://drive.google.com/file/d/14wTSUjt7Iultn5zVOBj4bgzwuWvGBptN/view?usp=drive_link', 'A Pirouette é um giro completo sobre um pé, geralmente com a outra perna dobrada na posição passé. É um dos movimentos mais icônicos do ballet e requer equilíbrio, força e controle preciso. Dica: fixe um ponto para ajudar no equilíbrio ao girar.', 'https://www.youtube.com/watch?v=B5bltdykcs8&ab_channel=BalletOnLine-Mari', now(), now()),
    (gen_random_uuid(), 'Arabesque', 'https://drive.google.com/file/d/1vF_yHqxkiy3RBwpLwhDxPGLN8oCZQfAQ/view?usp=drive_link', 'O Arabesque é uma posição clássica onde uma perna está estendida para trás enquanto os braços formam uma linha harmônica com o corpo. Esse passo destaca a graça e a força do bailarino. Dica: mantenha o peito aberto e o olhar direcionado para frente.', 'https://www.youtube.com/watch?v=SmRrfm1ihGg&ab_channel=RoyalBalletandOpera', now(), now()),
    (gen_random_uuid(), 'Grand Battement', 'https://drive.google.com/file/d/1fg_wuhsk_PZJqyBO5C6ZEG0QFK6K3bYV/view?usp=drive_link', 'O Grand Battement é um movimento em que a perna é elevada rapidamente para o alto e depois retorna à posição inicial. Ele fortalece os músculos das pernas e melhora a flexibilidade. Dica: controle a descida da perna para evitar impactos bruscos.', 'https://www.youtube.com/watch?v=BVM8AP3luyI&ab_channel=RoyalBalletandOpera', now(), now()),
    (gen_random_uuid(), 'Fouetté', 'https://drive.google.com/file/d/1eUCgK8FMjtJh4vilhF01bhpF0R1upZWN/view?usp=drive_link', 'O Fouetté é um giro onde o bailarino gira sobre um pé enquanto a outra perna é lançada para o lado e retorna rapidamente. Esse passo é frequentemente utilizado em sequências de giros virtuosos. Dica: mantenha os braços firmes para garantir a estabilidade.', 'https://www.youtube.com/watch?v=Fo250jmBl6I&ab_channel=RoyalBalletandOpera', now(), now());


-- Inserção de 7 histórias do ballet na tabela historias
INSERT INTO historias (id, name, image_url, description, created_at, updated_at) VALUES
    (gen_random_uuid(), 'A História do Ballet', 'https://drive.google.com/file/d/1ybBEmIv67HNCAPmy3CWD_pPea1K62ujl/view?usp=drive_link', 'O ballet surgiu no século XV nas cortes italianas e foi popularizado na França durante o reinado de Luís XIV. Inicialmente, era uma forma de entretenimento aristocrático, evoluindo para um espetáculo altamente técnico e artístico. Com o tempo, diferentes estilos foram desenvolvidos, incluindo o ballet clássico, romântico e moderno. Hoje, o ballet é praticado e apreciado globalmente, com companhias renomadas e produções icônicas que continuam a encantar audiências ao redor do mundo.', now(), now()),
    (gen_random_uuid(), 'O Lago dos Cisnes e o Cisne Negro', 'https://drive.google.com/file/d/1dgzJA_uZECx9njXf0DLku1dnL1F-SFfl/view?usp=drive_link', 'O Lago dos Cisnes, composto por Tchaikovsky em 1875, é uma das obras mais famosas do ballet. A história gira em torno da princesa Odette, transformada em cisne por um feitiço. Sua contraparte, Odile, conhecida como o Cisne Negro, representa um lado sombrio e sedutor. O papel do Cisne Negro exige uma técnica impecável, com os icônicos 32 fouettés desafiando até mesmo os bailarinos mais experientes. A dualidade entre Odette e Odile tornou-se um dos aspectos mais desafiadores e fascinantes do ballet clássico.', now(), now()),
    (gen_random_uuid(), 'O Ballet Bolshoi', 'https://drive.google.com/file/d/1K2j628wo4FHw4L1zaME0-uDwJvuF2Ztj/view?usp=drive_link', 'O Ballet Bolshoi, fundado em 1776 em Moscou, é uma das companhias de ballet mais prestigiadas do mundo. Conhecido por seu estilo expressivo e técnica impecável, o Bolshoi produziu algumas das maiores estrelas da dança. Seu repertório inclui produções icônicas como "O Lago dos Cisnes", "Giselle" e "Don Quixote". A companhia é um símbolo da cultura russa e continua a influenciar o cenário mundial do ballet com suas performances impressionantes e grandiosas.', now(), now()),
    (gen_random_uuid(), 'Giselle', 'https://drive.google.com/file/d/1AboCSSIbuHSfGNnEjT3k_0n-S93q8Uj2/view?usp=drive_link', 'Giselle é um dos ballets românticos mais conhecidos, estreado em 1841. Conta a trágica história de uma jovem camponesa que morre de coração partido ao descobrir que seu amado, Albrecht, a enganou. Após sua morte, Giselle se junta às Willis, espíritos de noivas traídas, mas decide perdoá-lo, impedindo que ele seja condenado à morte. O ballet é um marco do repertório clássico, com uma performance exigente e emocionante.', now(), now()),
    (gen_random_uuid(), 'O Quebra-Nozes', 'https://drive.google.com/file/d/1zkp4z-vwkSxLxVj_LmdtR4bS2gm8Nwfg/view?usp=drive_link', 'O Quebra-Nozes, composto por Tchaikovsky em 1892, é um dos ballets mais populares do mundo, especialmente durante a época natalina. A história segue Clara, uma jovem que recebe um boneco Quebra-Nozes e embarca em uma aventura mágica pelo Reino dos Doces. Suas músicas icônicas e coreografias encantadoras fazem desta uma das produções mais assistidas e celebradas do ballet.', now(), now()),
    (gen_random_uuid(), 'Romeu e Julieta', 'https://drive.google.com/file/d/1XffQoM3xmXCInT0LhRV_mNOx0zO5O2JI/view?usp=drive_link', 'O ballet Romeu e Julieta, baseado na peça de Shakespeare e coreografado por Prokofiev em 1938, é uma adaptação emocionante da clássica história de amor proibido. Com uma música poderosa e sequências de dança que capturam a intensidade do romance e tragédia, é uma das produções mais dramáticas e belas do repertório clássico.', now(), now()),
    (gen_random_uuid(), 'Dom Quixote', 'https://drive.google.com/file/d/1l5NWeP1EuTRepNlBOTtkOlNPtTsQKp2n/view?usp=drive_link', 'Inspirado no romance de Miguel de Cervantes, o ballet Dom Quixote é uma celebração vibrante da cultura espanhola. Criado por Marius Petipa em 1869, a história segue as aventuras de Kitri e Basílio, um casal apaixonado que enfrenta desafios antes de conquistar sua felicidade. Com movimentos dinâmicos e exigência técnica alta, é um dos ballets mais energéticos e vibrantes.', now(), now());

--Circuito de alongamento
INSERT INTO circuits (id, name, description, image_url, duration, created_at, updated_at) VALUES
    (gen_random_uuid(), 'Circuito de Alongamento para Ballet', 'Este circuito melhora a flexibilidade e previne lesões, essencial para bailarinos.','https://drive.google.com/file/d/1jOga3ipaFwKd7uawpjHmXTYNAmFYxqKn/view?usp=drive_link', 10, now(), now());

INSERT INTO circuit_steps (id, circuit_id, name, "order", duration, rest_time, image_url, created_at, updated_at) VALUES
(gen_random_uuid(), (SELECT id FROM circuits WHERE name = 'Circuito de Alongamento para Ballet'), 'Alongamento de Costas e Posterior', 1, 60, 30, 'https://drive.google.com/file/d/1PLHmZuGFFO_FiD7Nhm2G-lomX9mB4IR-/view?usp=drive_link', now(), now()),
(gen_random_uuid(), (SELECT id FROM circuits WHERE name = 'Circuito de Alongamento para Ballet'), 'Flexão de Tronco para Frente', 2, 60, 30, 'https://drive.google.com/file/d/1VR1DXFUOS2AqZMtyEVGeIEvfVWMlAa6A/view?usp=drive_link', now(), now()),
(gen_random_uuid(), (SELECT id FROM circuits WHERE name = 'Circuito de Alongamento para Ballet'), 'Afundo com Alongamento de Quadríceps', 3, 60, 30, 'https://drive.google.com/file/d/1AhzZKbdCWkm0JNCvGmqSShgwrGvTDvk4/view?usp=drive_link', now(), now()),
(gen_random_uuid(), (SELECT id FROM circuits WHERE name = 'Circuito de Alongamento para Ballet'), 'Elevação de Pernas na Parede', 4, 60, 30, 'https://drive.google.com/file/d/136oznwtEB4vbkiXyu3aHXsvZp3jMHKGp/view?usp=drive_link', now(), now()),
(gen_random_uuid(), (SELECT id FROM circuits WHERE name = 'Circuito de Alongamento para Ballet'), 'Prancha com Alongamento de Pernas', 5, 60, 30, 'https://drive.google.com/file/d/1nUYAdlv1KFKWGOE-gOCIeh_01gkQpQFt/view?usp=drive_link', now(), now()),
(gen_random_uuid(), (SELECT id FROM circuits WHERE name = 'Circuito de Alongamento para Ballet'), 'Cachorrinho Olhando para Baixo', 6, 60, 30, 'https://drive.google.com/file/d/1dNL9376hRdNABFxWKIE4NqGoyShATBqx/view?usp=drive_link', now(), now()),
(gen_random_uuid(), (SELECT id FROM circuits WHERE name = 'Circuito de Alongamento para Ballet'), 'Alongamento de Perna Estendida Sentado', 7, 60, 30, 'https://drive.google.com/file/d/12UYVgBCYAZ5-m9mnkfqkAmGUCuiWWvCC/view?usp=drive_link', now(), now());