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
    duration REAL NOT NULL,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now()
);

CREATE TABLE circuit_steps (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid(),
    circuit_id TEXT NOT NULL,
    "order" INTEGER NOT NULL,
    duration REAL NOT NULL,
    rest_time REAL NOT NULL,
    image_url TEXT,
    created_at TIMESTAMP DEFAULT now(),
    updated_at TIMESTAMP DEFAULT now(),
    CONSTRAINT fk_circuit FOREIGN KEY (circuit_id) REFERENCES circuits (id) ON DELETE CASCADE
);
