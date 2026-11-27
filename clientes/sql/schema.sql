-- Banco do microsserviço de Clientes.
-- Em banco hospedado (Railway, etc.), onde você não cria databases, apague as 2 linhas abaixo
-- e rode só os CREATE TABLE no database que o provedor já criou.
CREATE DATABASE IF NOT EXISTS clientes_db CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE clientes_db;

CREATE TABLE IF NOT EXISTS clientes (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  nome        VARCHAR(120) NOT NULL,
  email       VARCHAR(120) NOT NULL UNIQUE,
  senha_hash  VARCHAR(255) NOT NULL,
  telefone    VARCHAR(20),
  criado_em   TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

CREATE TABLE IF NOT EXISTS enderecos (
  id           INT AUTO_INCREMENT PRIMARY KEY,
  cliente_id   INT NOT NULL,
  cep          VARCHAR(9)   NOT NULL,
  rua          VARCHAR(150) NOT NULL,
  numero       VARCHAR(10)  NOT NULL,
  complemento  VARCHAR(80),
  bairro       VARCHAR(80)  NOT NULL,
  cidade       VARCHAR(80)  NOT NULL,
  uf           CHAR(2)      NOT NULL,
  principal    BOOLEAN NOT NULL DEFAULT FALSE,
  CONSTRAINT fk_enderecos_cliente
    FOREIGN KEY (cliente_id) REFERENCES clientes(id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
