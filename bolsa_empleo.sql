DROP DATABASE IF EXISTS bolsa_empleo;
CREATE DATABASE bolsa_empleo CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE bolsa_empleo;

CREATE TABLE administrador (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    identificacion VARCHAR(50) NOT NULL,
    clave VARCHAR(255) NOT NULL
);

CREATE TABLE empresa (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    localizacion VARCHAR(150),
    correo VARCHAR(150) UNIQUE NOT NULL,
    telefono VARCHAR(50),
    descripcion TEXT,
    clave VARCHAR(255),
    aprobada BOOLEAN DEFAULT FALSE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE oferente (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    identificacion VARCHAR(50) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    nacionalidad VARCHAR(100),
    telefono VARCHAR(50),
    correo VARCHAR(150) UNIQUE NOT NULL,
    residencia VARCHAR(150),
    clave VARCHAR(255),
    aprobado BOOLEAN DEFAULT FALSE,
    fecha_registro TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE curriculum (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    archivo VARCHAR(255) NOT NULL,
    oferente_id BIGINT UNIQUE,
    FOREIGN KEY (oferente_id)
    REFERENCES oferente(id)
    ON DELETE CASCADE
);

CREATE TABLE caracteristica (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    nombre VARCHAR(150) NOT NULL,
    padre_id BIGINT,
    FOREIGN KEY (padre_id)
    REFERENCES caracteristica(id)
    ON DELETE SET NULL
);

CREATE TABLE puesto (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    titulo VARCHAR(150) NOT NULL DEFAULT 'Sin título',
    empresa_id BIGINT NOT NULL,
    descripcion TEXT NOT NULL,
    salario DECIMAL(10,2),
    tipo_publicacion ENUM('PUBLICO','PRIVADO') DEFAULT 'PUBLICO',
    activo BOOLEAN DEFAULT TRUE,
    fecha TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (empresa_id)
    REFERENCES empresa(id)
    ON DELETE CASCADE
);

CREATE TABLE puesto_caracteristica (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    puesto_id BIGINT NOT NULL,
    caracteristica_id BIGINT NOT NULL,
    nivel INT CHECK (nivel BETWEEN 1 AND 5),
    UNIQUE (puesto_id, caracteristica_id),
    FOREIGN KEY (puesto_id)
    REFERENCES puesto(id)
    ON DELETE CASCADE,
    FOREIGN KEY (caracteristica_id)
    REFERENCES caracteristica(id)
);

CREATE TABLE oferente_caracteristica (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    oferente_id BIGINT NOT NULL,
    caracteristica_id BIGINT NOT NULL,
    nivel INT CHECK (nivel BETWEEN 1 AND 5),
    UNIQUE (oferente_id, caracteristica_id),
    FOREIGN KEY (oferente_id)
    REFERENCES oferente(id)
    ON DELETE CASCADE,
    FOREIGN KEY (caracteristica_id)
    REFERENCES caracteristica(id)
);

CREATE INDEX idx_empresa_correo ON empresa(correo);
CREATE INDEX idx_oferente_correo ON oferente(correo);
CREATE INDEX idx_puesto_empresa ON puesto(empresa_id);
CREATE INDEX idx_puesto_fecha ON puesto(fecha);

-- Administrador
INSERT INTO administrador (id, identificacion, clave)
VALUES (1, 'admin', '$2a$10$xjj0gWjpmt7qEVQhvXNGj.vrRafBxK3QwNt2OFABama0iKZpU41l.');

-- Características
INSERT INTO caracteristica (id, nombre, padre_id) VALUES
                                                      (1, 'Programación', NULL),
                                                      (2, 'Java', 1),
                                                      (3, 'Python', 1),
                                                      (4, 'JavaScript', 1),
                                                      (5, 'Bases de Datos', NULL),
                                                      (6, 'MySQL', 5),
                                                      (7, 'PostgreSQL', 5),
                                                      (8, 'Tecnologías Web', NULL),
                                                      (9, 'React', 8),
                                                      (10, 'Spring Boot', 8),
                                                      (11, 'HTML/CSS', 8),
                                                      (12, 'DevOps', NULL),
                                                      (13, 'Docker', 12),
                                                      (14, 'AWS', 12),
                                                      (15, 'Git', 12);

-- Empresas (clave: "1234" hasheada)
INSERT INTO empresa (id, nombre, localizacion, correo, telefono, descripcion, clave, aprobada) VALUES
                                                                                                   (1, 'TechCorp', 'San José', 'tech@cr.com', '88001100', 'Empresa de software', '$2a$10$xjj0gWjpmt7qEVQhvXNGj.vrRafBxK3QwNt2OFABama0iKZpU41l.', true),
                                                                                                   (2, 'WebSoft', 'Heredia', 'info@websoft.com', '88002200', 'Desarrollo web', '$2a$10$xjj0gWjpmt7qEVQhvXNGj.vrRafBxK3QwNt2OFABama0iKZpU41l.', true),
                                                                                                   (3, 'DataLab', 'Cartago', 'contact@datalab.com', '88003300', 'Ciencia de datos', '$2a$10$xjj0gWjpmt7qEVQhvXNGj.vrRafBxK3QwNt2OFABama0iKZpU41l.', true),
                                                                                                   (4, 'CloudSys', 'Alajuela', 'hello@cloudsys.com', '88004400', 'Infraestructura cloud', '$2a$10$xjj0gWjpmt7qEVQhvXNGj.vrRafBxK3QwNt2OFABama0iKZpU41l.', false);

-- Oferentes (clave: "1234" hasheada)
INSERT INTO oferente (id, identificacion, nombre, apellido, nacionalidad, telefono, correo, residencia, clave, aprobado) VALUES
                                                                                                                             (1, '101110111', 'Juan', 'Pérez', 'Costarricense', '77001100', 'juan@correo.com', 'San José', '$2a$10$xjj0gWjpmt7qEVQhvXNGj.vrRafBxK3QwNt2OFABama0iKZpU41l.', true),
                                                                                                                             (2, '202220222', 'María', 'González', 'Costarricense', '77002200', 'maria@correo.com', 'Heredia', '$2a$10$xjj0gWjpmt7qEVQhvXNGj.vrRafBxK3QwNt2OFABama0iKZpU41l.', true),
                                                                                                                             (3, '303330333', 'Carlos', 'Mora', 'Costarricense', '77003300', 'carlos@correo.com', 'Cartago', '$2a$10$xjj0gWjpmt7qEVQhvXNGj.vrRafBxK3QwNt2OFABama0iKZpU41l.', false);

-- Puestos
INSERT INTO puesto (id, titulo, empresa_id, descripcion, salario, tipo_publicacion, activo) VALUES
                                                                                                (1, 'Backend Java Developer', 1, 'Desarrollador Java con Spring Boot', 1200000, 'PUBLICO', true),
                                                                                                (2, 'Frontend React Developer', 2, 'Desarrollador React con experiencia en SPAs', 1100000, 'PUBLICO', true),
                                                                                                (3, 'Data Scientist', 3, 'Científico de datos con Python y SQL', 1500000, 'PUBLICO', true),
                                                                                                (4, 'DevOps Engineer', 1, 'Ingeniero DevOps con Docker y AWS', 1800000, 'PUBLICO', true),
                                                                                                (5, 'Full Stack Developer', 2, 'Desarrollador full stack Java + React', 1400000, 'PUBLICO', true),
                                                                                                (6, 'Puesto Privado', 3, 'Solo para oferentes registrados', 900000, 'PRIVADO', true),
                                                                                                (7, 'DB Administrator', 3, 'Administrador de bases de datos MySQL', 1300000, 'PUBLICO', true);

-- Requisitos de puestos
INSERT INTO puesto_caracteristica (puesto_id, caracteristica_id, nivel) VALUES
                                                                            (1, 2, 4), (1, 10, 3), (1, 6, 2),
                                                                            (2, 4, 4), (2, 9, 4), (2, 11, 3),
                                                                            (3, 3, 4), (3, 6, 3), (3, 7, 2),
                                                                            (4, 13, 4), (4, 14, 3), (4, 15, 3),
                                                                            (5, 2, 3), (5, 4, 3), (5, 9, 3), (5, 10, 3),
                                                                            (6, 2, 2), (6, 6, 2),
                                                                            (7, 6, 4), (7, 7, 3);

-- Habilidades de oferentes
INSERT INTO oferente_caracteristica (oferente_id, caracteristica_id, nivel) VALUES
                                                                                (1, 2, 4), (1, 10, 3), (1, 6, 3), (1, 15, 2),
                                                                                (2, 4, 4), (2, 9, 4), (2, 11, 3), (2, 3, 2),
                                                                                (3, 3, 3), (3, 6, 2), (3, 13, 2);